import { useState, useCallback, useRef, useEffect } from 'react';
import { assetRegistry, TOTAL_ASSETS } from '../utils/assetRegistry';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-de62407f`;
const CONCURRENCY = 5;

// ── types ─────────────────────────────────────────────────────────────────────

type OverallStatus = 'idle' | 'running' | 'done' | 'error';

type LogLevel = 'info' | 'ok' | 'warn' | 'err' | 'debug' | 'step' | 'head';

interface LogEntry {
  id: number;
  time: string;
  level: LogLevel;
  msg: string;
}

interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string | null;
  html_url: string;
  created_at: string;
  head_sha?: string;
  name?: string;
}

// ── log colors ─────────────────────────────────────────────────────────────────

const LC: Record<LogLevel, string> = {
  head:  '#c4b5fd',
  step:  '#93c5fd',
  ok:    '#4ade80',
  warn:  '#fbbf24',
  err:   '#f87171',
  info:  '#a3a3a3',
  debug: '#525252',
};

// ── helpers ───────────────────────────────────────────────────────────────────

async function apiPost(path: string, body: object) {
  const res = await fetch(`${SERVER}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${publicAnonKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function apiGet(path: string) {
  const res = await fetch(`${SERVER}${path}`, {
    headers: { Authorization: `Bearer ${publicAnonKey}` },
  });
  if (!res.ok) throw new Error(`GET ${path} → HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function blobUrlToBase64(url: string): Promise<{ data: string; mimeType: string }> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch(${url.slice(0, 60)}) → HTTP ${response.status}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const comma = dataUrl.indexOf(',');
      if (comma === -1) { reject(new Error('Invalid data URL')); return; }
      resolve({ data: dataUrl.slice(comma + 1), mimeType: dataUrl.slice(5, comma).split(';')[0] || 'image/png' });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  return btoa(binary);
}

function ghHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function ghGetFileSha(owner: string, repo: string, path: string, token: string): Promise<string | null> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: ghHeaders(token),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(`GitHub GET ${path}: ${e.message || res.status}`);
  }
  return (await res.json()).sha as string;
}

async function ghPutFile(
  owner: string, repo: string, branch: string, token: string,
  path: string, content: string, message: string, sha?: string | null,
): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: ghHeaders(token),
    body: JSON.stringify({ message, content, branch, ...(sha ? { sha } : {}) }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(`GitHub PUT ${path}: ${e.message || res.status}`);
  }
  const data = await res.json();
  return data.commit?.sha ?? '';
}

// ── workflow YAML (embedded so we can auto-commit it) ─────────────────────────

const DEPLOY_YML = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: latest
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm build
        env:
          VITE_BASE: \${{ vars.VITE_BASE || '/' }}
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
`;

// ── vite.config.ts (embedded so CI always has the correct plugin) ─────────────
// Uses __figma__ prefix instead of \0 to avoid null-byte escaping issues.
// In Figma Make the platform plugin runs first so our resolveId/load never fire.
const VITE_CONFIG_TS = `import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * figmaAssetFallback
 * Resolves figma:asset/hash.png imports using src/asset-map.json.
 * In Figma Make the platform plugin handles these first; this plugin
 * is a no-op there and only activates in plain vite build (CI / local).
 */
function figmaAssetFallback() {
  let assetMap = {}
  return {
    name: 'figma-asset-fallback',
    enforce: 'pre',
    buildStart() {
      const mapPath = path.resolve(__dirname, 'src/asset-map.json')
      if (fs.existsSync(mapPath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(mapPath, 'utf-8'))
          assetMap = Object.fromEntries(
            Object.entries(raw).filter(([k]) => /^[0-9a-f]{40}\\.png$/i.test(k))
          )
          console.log('[figma-asset-fallback] loaded ' + Object.keys(assetMap).length + ' assets from asset-map.json')
        } catch (e) {
          console.warn('[figma-asset-fallback] failed to parse asset-map.json:', e)
        }
      } else {
        console.warn('[figma-asset-fallback] src/asset-map.json not found — figma:asset/ imports will be empty strings')
      }
    },
    resolveId(id) {
      if (id.startsWith('figma:asset/')) return '__figma_asset__:' + id
      return null
    },
    load(id) {
      if (!id.startsWith('__figma_asset__:figma:asset/')) return null
      const filename = id.slice('__figma_asset__:figma:asset/'.length)
      const url = assetMap[filename] || ''
      if (!url) console.warn('[figma-asset-fallback] no URL for ' + filename)
      return 'export default ' + JSON.stringify(url)
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [
    figmaAssetFallback(),
    react({ exclude: [/\\/src\\/imports\\//] }),
    tailwindcss(),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
`

// ── component ─────────────────────────────────────────────────────────────────

let logIdCounter = 0;

export default function MigratePage() {
  // settings
  const [ghOpen,   setGhOpen]   = useState(() => !!localStorage.getItem('gh_owner'));
  const [ghOwner,  setGhOwner]  = useState(() => localStorage.getItem('gh_owner')  || '');
  const [ghRepo,   setGhRepo]   = useState(() => localStorage.getItem('gh_repo')   || '');
  const [ghBranch, setGhBranch] = useState(() => localStorage.getItem('gh_branch') || 'main');
  const [ghBase,   setGhBase]   = useState(() => localStorage.getItem('gh_base')   || '/');
  const [ghToken,  setGhToken]  = useState(() => localStorage.getItem('gh_token')  || '');

  // state
  const [overall,    setOverall]    = useState<OverallStatus>('idle');
  const [logs,       setLogs]       = useState<LogEntry[]>([]);
  const [assetsTotal,  setAssetsTotal]  = useState(TOTAL_ASSETS);
  const [assetsDone,   setAssetsDone]   = useState(0);
  const [assetsOk,     setAssetsOk]     = useState(0);
  const [assetsSkip,   setAssetsSkip]   = useState(0);
  const [assetsErr,    setAssetsErr]    = useState(0);
  const [phase, setPhase] = useState<'idle' | 'upload' | 'commit' | 'deploy' | 'done'>('idle');
  const [actionsUrl, setActionsUrl] = useState('');
  const [runUrl,     setRunUrl]     = useState('');
  const [deployDone, setDeployDone] = useState<'none' | 'success' | 'failure'>('none');
  const [showDebug,  setShowDebug]  = useState(true);

  const logRef   = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);
  const pollRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { localStorage.setItem('gh_owner',  ghOwner);  }, [ghOwner]);
  useEffect(() => { localStorage.setItem('gh_repo',   ghRepo);   }, [ghRepo]);
  useEffect(() => { localStorage.setItem('gh_branch', ghBranch); }, [ghBranch]);
  useEffect(() => { localStorage.setItem('gh_base',   ghBase);   }, [ghBase]);
  useEffect(() => { localStorage.setItem('gh_token',  ghToken);  }, [ghToken]);
  useEffect(() => () => { if (pollRef.current) clearTimeout(pollRef.current); }, []);

  // ── log helper ─────────────────────────────────────────────────────────────

  const log = useCallback((level: LogLevel, msg: string) => {
    const entry: LogEntry = {
      id: ++logIdCounter,
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level,
      msg,
    };
    setLogs((prev) => {
      const next = [...prev, entry];
      setTimeout(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      }, 30);
      return next;
    });
  }, []);

  // ── main one-button flow ───────────────────────────────────────────────────

  const runAll = useCallback(async () => {
    if (!ghOwner || !ghRepo || !ghToken) { setGhOpen(true); return; }
    abortRef.current = false;
    setOverall('running');
    setLogs([]);
    setAssetsDone(0); setAssetsOk(0); setAssetsSkip(0); setAssetsErr(0);
    setActionsUrl(''); setRunUrl(''); setDeployDone('none');

    // ─────────────────────────────────────────────────────────────────────────
    // PHASE 1 — Upload assets to Supabase Storage
    // ─────────────────────────────────────────────────────────────────────────
    setPhase('upload');
    log('head', '═══ PHASE 1 / 3 — Загрузка ассетов в Supabase Storage ═══');

    let uploadedSet = new Set<string>();
    try {
      log('info', 'Проверяю уже загруженные файлы в Storage...');
      const d = await apiGet('/assets/uploaded');
      uploadedSet = new Set<string>(d.files ?? []);
      log('debug', `Storage уже содержит ${uploadedSet.size} файлов`);
    } catch (e) {
      log('warn', `Не удалось получить список Storage: ${e} — продолжаю без проверки`);
    }

    const entries = Object.entries(assetRegistry);
    setAssetsTotal(entries.length);
    const toUpload = entries.filter(([f]) => !uploadedSet.has(f));
    const toSkip   = entries.filter(([f]) =>  uploadedSet.has(f));

    log('info', `Всего ассетов: ${entries.length}  |  пропускаем: ${toSkip.length}  |  к загрузке: ${toUpload.length}`);

    // Save skip URLs to KV
    for (const [filename] of toSkip) {
      const url = `https://${projectId}.supabase.co/storage/v1/object/public/make-de62407f-assets/${filename}`;
      try { await apiPost('/assets/save-url', { filename, publicUrl: url }); }
      catch (e) { log('warn', `save-url skip ${filename.slice(0, 16)}: ${e}`); }
    }
    setAssetsSkip(toSkip.length);
    setAssetsDone(toSkip.length);

    let uploadOk = 0;
    let uploadErr = 0;

    for (let i = 0; i < toUpload.length; i += CONCURRENCY) {
      if (abortRef.current) { log('warn', '⛔ Прервано пользователем'); setOverall('error'); return; }

      const chunk = toUpload.slice(i, i + CONCURRENCY);
      await Promise.all(chunk.map(async ([filename, sourceUrl]) => {
        try {
          log('debug', `↑ fetch blob ${filename.slice(0, 20)}…`);
          const { data, mimeType } = await blobUrlToBase64(sourceUrl);
          log('debug', `↑ upload ${filename.slice(0, 20)}… (${mimeType})`);
          const r = await apiPost('/assets/upload-bytes', { filename, data, mimeType });
          await apiPost('/assets/save-url', { filename, publicUrl: r.publicUrl });
          uploadOk++;
          log('ok', `✓ ${filename.slice(0, 48)}`);
        } catch (e) {
          uploadErr++;
          log('err', `✗ ${filename.slice(0, 36)}… → ${e}`);
        }
        setAssetsDone((p) => p + 1);
        setAssetsOk(uploadOk);
        setAssetsErr(uploadErr);
      }));
    }

    log('ok', `✓ Загрузка завершена. OK: ${uploadOk + toSkip.length}  Ошибок: ${uploadErr}`);
    if (uploadErr > 0) log('warn', `${uploadErr} ассетов не загрузились — деплой продолжим, они могут быть неполными`);

    // ─────────────────────────────────────────────────────────────────────────
    // PHASE 2 — Commit to GitHub
    // ─────────────────────────────────────────────────────────────────────────
    setPhase('commit');
    log('head', '═══ PHASE 2 / 3 — Коммит в GitHub ═══');

    const actUrl = `https://github.com/${ghOwner}/${ghRepo}/actions`;
    setActionsUrl(actUrl);
    log('debug', `GitHub repo: ${ghOwner}/${ghRepo}  branch: ${ghBranch}`);

    try {
      // 2a. Commit deploy.yml [skip ci] — doesn't trigger workflow
      log('info', 'Обновляю .github/workflows/deploy.yml [skip ci]...');
      const wfShaExisting = await ghGetFileSha(ghOwner, ghRepo, '.github%2Fworkflows%2Fdeploy.yml', ghToken);
      const wfSha = await ghPutFile(
        ghOwner, ghRepo, ghBranch, ghToken,
        '.github/workflows/deploy.yml',
        toBase64(DEPLOY_YML),
        (wfShaExisting ? 'ci: update' : 'ci: add') + ' GitHub Pages deploy workflow [skip ci]',
        wfShaExisting,
      );
      log('ok', `✓ deploy.yml ${wfShaExisting ? 'обновлён' : 'создан'} (${wfSha.slice(0, 7)}) [skip ci]`);

      // 2b. Commit vite.config.ts [skip ci] — critical: this has the figmaAssetFallback plugin
      log('info', 'Обновляю vite.config.ts [skip ci]...');
      const viteShaExisting = await ghGetFileSha(ghOwner, ghRepo, 'vite.config.ts', ghToken);
      const viteSha = await ghPutFile(
        ghOwner, ghRepo, ghBranch, ghToken,
        'vite.config.ts',
        toBase64(VITE_CONFIG_TS),
        'build: update vite.config.ts with figma-asset-fallback plugin [skip ci]',
        viteShaExisting,
      );
      log('ok', `✓ vite.config.ts ${viteShaExisting ? 'обновлён' : 'создан'} (${viteSha.slice(0, 7)}) [skip ci]`);

      // 2c. Fetch asset-map from KV
      log('info', 'Получаю asset-map.json с Supabase KV...');
      const mapRes = await fetch(`${SERVER}/assets/export-json`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!mapRes.ok) throw new Error(`export-json HTTP ${mapRes.status}: ${await mapRes.text()}`);
      const mapJson = await mapRes.text();
      const mapObj = JSON.parse(mapJson);
      const mapKeys = Object.keys(mapObj);
      log('debug', `asset-map.json: ${mapKeys.length} записей`);
      const populated = mapKeys.filter((k) => mapObj[k] && mapObj[k] !== '');
      log(populated.length > 0 ? 'ok' : 'warn', `✓ asset-map: ${populated.length} заполненных / ${mapKeys.length} всего`);

      // 2d. Commit asset-map.json — THIS triggers the workflow
      log('info', 'Коммичу src/asset-map.json → триггерит GitHub Actions...');
      const existingSha = await ghGetFileSha(ghOwner, ghRepo, 'src%2Fasset-map.json', ghToken);
      log('debug', existingSha ? `Существующий SHA: ${existingSha.slice(0, 7)}` : 'Файл не существует — создаю');
      const commitSha = await ghPutFile(
        ghOwner, ghRepo, ghBranch, ghToken,
        'src/asset-map.json',
        toBase64(mapJson),
        `chore: update asset-map.json (${populated.length} assets)`,
        existingSha,
      );
      log('ok', `✓ src/asset-map.json закоммичен → commit SHA: ${commitSha}`);
      log('info', `Ссылка на Actions: ${actUrl}`);

      // 2e. Set VITE_BASE variable
      if (ghBase && ghBase !== '/') {
        log('info', `Устанавливаю VITE_BASE="${ghBase}" в GitHub Actions Variables...`);
        try {
          const varBase = `https://api.github.com/repos/${ghOwner}/${ghRepo}/actions/variables`;
          const checkRes = await fetch(`${varBase}/VITE_BASE`, { headers: ghHeaders(ghToken) });
          log('debug', `VITE_BASE exists: ${checkRes.ok}  status: ${checkRes.status}`);
          const method  = checkRes.ok ? 'PATCH' : 'POST';
          const varUrl  = checkRes.ok ? `${varBase}/VITE_BASE` : varBase;
          const varRes  = await fetch(varUrl, {
            method, headers: ghHeaders(ghToken),
            body: JSON.stringify({ name: 'VITE_BASE', value: ghBase, visibility: 'all' }),
          });
          log('debug', `VITE_BASE PUT response: ${varRes.status}`);
          if (varRes.ok || varRes.status === 204) {
            log('ok', `✓ VITE_BASE="${ghBase}" сохранён`);
          } else {
            const e = await varRes.json().catch(() => ({}));
            log('warn', `⚠ VITE_BASE не удалось сохранить: ${e.message || varRes.status} — добавь вручную`);
          }
        } catch (e) {
          log('warn', `⚠ Ошибка при установке VITE_BASE: ${e}`);
        }
      } else {
        log('debug', `VITE_BASE="${ghBase}" — используется значение по умолчанию, пропускаю`);
      }

      // ───────────────────────────────────────────────────────────────────────
      // PHASE 3 — Poll GitHub Actions
      // ───────────────────────────────────────────────────────────────────────
      setPhase('deploy');
      log('head', '═══ PHASE 3 / 3 — Слежу за GitHub Actions ═══');
      log('info', 'Ожидаю появления workflow run...');
      log('debug', `Ищу run с head_sha=${commitSha} или созданный после ${new Date().toISOString()}`);

      const pollStart = Date.now();
      let attempts = 0;
      const MAX_ATTEMPTS = 45; // ~6 минут

      const poll = async () => {
        attempts++;
        log('debug', `Polling attempt #${attempts}...`);
        try {
          const runsRes = await fetch(
            `https://api.github.com/repos/${ghOwner}/${ghRepo}/actions/runs?branch=${encodeURIComponent(ghBranch)}&per_page=10&event=push`,
            { headers: ghHeaders(ghToken) },
          );
          log('debug', `Actions API response: HTTP ${runsRes.status}`);
          if (!runsRes.ok) {
            const body = await runsRes.text();
            log('warn', `Actions API error ${runsRes.status}: ${body.slice(0, 200)}`);
          } else {
            const runsData = await runsRes.json();
            const runs: WorkflowRun[] = runsData.workflow_runs ?? [];
            log('debug', `Получено ${runs.length} runs. IDs: ${runs.map((r) => r.id).join(', ') || 'нет'}`);

            const cutoff = pollStart - 30_000;
            const run =
              runs.find((r) => r.head_sha === commitSha) ??
              runs.find((r) => new Date(r.created_at).getTime() >= cutoff);

            if (!run) {
              log('info', `Workflow run ещё не появился (попытка ${attempts}/${MAX_ATTEMPTS})...`);
            } else {
              setRunUrl(run.html_url);
              log('debug', `Найден run #${run.id}  status=${run.status}  conclusion=${run.conclusion ?? 'null'}  url=${run.html_url}`);

              if (run.status === 'completed') {
                if (run.conclusion === 'success') {
                  setDeployDone('success');
                  setPhase('done');
                  setOverall('done');
                  log('ok', `✅ Деплой завершён успешно!`);
                  log('ok', `🌐 Сайт: https://${ghOwner}.github.io/${ghBase !== '/' ? ghRepo : ''}`);
                  return;
                } else {
                  setDeployDone('failure');
                  setPhase('done');
                  setOverall('error');
                  log('err', `❌ Деплой завершился с ошибкой: conclusion="${run.conclusion}"`);
                  log('err', `Подробности: ${run.html_url}`);
                  return;
                }
              } else {
                log('info', `⏳ Run #${run.id} — status: ${run.status} (ждём завершения...)`);
              }
            }
          }
        } catch (e) {
          log('err', `Polling exception: ${e}`);
        }

        if (attempts >= MAX_ATTEMPTS) {
          log('warn', `⏰ Превышено время ожидания (${MAX_ATTEMPTS} попыток). Проверь вручную: ${actUrl}`);
          setPhase('done');
          setOverall('done');
          return;
        }
        pollRef.current = setTimeout(poll, 8000);
      };

      pollRef.current = setTimeout(poll, 12000);

    } catch (e) {
      log('err', `❌ Критическая ошибка на фазе commit/deploy: ${e}`);
      setOverall('error');
      setPhase('idle');
    }
  }, [ghOwner, ghRepo, ghToken, ghBranch, ghBase, log]);

  // ── derived ────────────────────────────────────────────────────────────────

  const isRunning  = overall === 'running';
  const ghReady    = !!ghOwner && !!ghRepo && !!ghToken;
  const progress   = assetsTotal > 0 ? Math.round((assetsDone / assetsTotal) * 100) : 0;

  const phaseLabel: Record<typeof phase, string> = {
    idle:   'Готов к запуску',
    upload: `Загрузка ассетов: ${assetsDone}/${assetsTotal}`,
    commit: 'Коммит в GitHub...',
    deploy: 'GitHub Actions деплоит...',
    done:   deployDone === 'success' ? '✅ Задеплоено!' : deployDone === 'failure' ? '❌ Деплой упал' : '✓ Завершено',
  };
  const phaseColor: Record<typeof phase, string> = {
    idle:   '#555',
    upload: '#60a5fa',
    commit: '#a78bfa',
    deploy: '#fbbf24',
    done:   deployDone === 'success' ? '#4ade80' : deployDone === 'failure' ? '#f87171' : '#a3a3a3',
  };

  // ── styles ─────────────────────────────────────────────────────────────────

  const btnStyle = (bg: string, off = false): React.CSSProperties => ({
    padding: '0 28px', height: 42, borderRadius: 8, border: 'none',
    background: off ? '#1a1a1a' : bg, color: off ? '#444' : '#fff',
    fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
    cursor: off ? 'not-allowed' : 'pointer', opacity: off ? 0.5 : 1,
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'opacity .15s, background .15s',
  });

  const inputStyle: React.CSSProperties = {
    background: '#161616', border: '1px solid #2a2a2a', borderRadius: 6,
    padding: '8px 12px', color: '#e0e0e0', fontFamily: 'monospace',
    fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, color: '#555', textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: 5, display: 'block',
  };

  return (
    <div style={{ fontFamily: 'monospace', background: '#080808', color: '#e0e0e0', minHeight: '100vh', padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
            🚀 One-Click Deploy
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
            Одна кнопка: загружает {TOTAL_ASSETS} ассетов → коммитит в GitHub → деплоит на Pages.
          </p>
        </div>

        {/* ── GitHub Settings ──────────────────────────────────────────────── */}
        <div style={{
          background: '#0f0f0f', border: `1px solid ${ghOpen ? '#2563eb' : '#1e1e1e'}`,
          borderRadius: 10, marginBottom: 20, overflow: 'hidden',
        }}>
          <button
            onClick={() => setGhOpen((v) => !v)}
            style={{ background: 'none', border: 'none', width: '100%', padding: '14px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: '#e0e0e0', fontFamily: 'monospace', fontSize: 13 }}
          >
            <span style={{ fontSize: 14 }}>⚙️</span>
            <span style={{ fontWeight: 700 }}>GitHub настройки</span>
            {ghReady
              ? <span style={{ color: '#4ade80', fontSize: 11, marginLeft: 4 }}>● {ghOwner}/{ghRepo}</span>
              : <span style={{ color: '#f87171', fontSize: 11, marginLeft: 4 }}>● не настроено</span>
            }
            <span style={{ marginLeft: 'auto', color: '#333', fontSize: 11 }}>{ghOpen ? '▲' : '▼'}</span>
          </button>

          {ghOpen && (
            <div style={{ padding: '0 20px 20px', borderTop: '1px solid #1a1a1a' }}>
              <div style={{ height: 16 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={labelStyle}>GitHub Owner</label>
                  <input style={inputStyle} value={ghOwner} onChange={(e) => setGhOwner(e.target.value)} placeholder="octocat" />
                </div>
                <div>
                  <label style={labelStyle}>Repository</label>
                  <input style={inputStyle} value={ghRepo} onChange={(e) => setGhRepo(e.target.value)} placeholder="my-portfolio" />
                </div>
                <div>
                  <label style={labelStyle}>Branch</label>
                  <input style={inputStyle} value={ghBranch} onChange={(e) => setGhBranch(e.target.value)} placeholder="main" />
                </div>
                <div>
                  <label style={labelStyle}>
                    VITE_BASE &nbsp;
                    <span style={{ textTransform: 'none', letterSpacing: 0, color: '#444' }}>
                      / для username.github.io · /repo/ для остальных
                    </span>
                  </label>
                  <input style={inputStyle} value={ghBase} onChange={(e) => setGhBase(e.target.value)} placeholder="/" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>
                  Personal Access Token &nbsp;
                  <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noreferrer"
                    style={{ color: '#3b82f6', textDecoration: 'none', textTransform: 'none', letterSpacing: 0 }}>
                    сгенерировать (scope: repo) →
                  </a>
                </label>
                <input style={inputStyle} type="password" value={ghToken} onChange={(e) => setGhToken(e.target.value)}
                  placeholder="ghp_••••••••••••••••••••••••••••••••" />
              </div>
              <div style={{ marginTop: 12, padding: '8px 12px', background: '#0d1a2d', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 11, color: '#60a5fa' }}>
                ⚠ Одноразово: GitHub → Settings → Pages → Source: <strong>GitHub Actions</strong>
              </div>
            </div>
          )}
        </div>

        {/* ── Big button + phase status ────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button
            onClick={isRunning ? undefined : runAll}
            disabled={isRunning}
            style={btnStyle(
              overall === 'done' && deployDone === 'success' ? '#15803d'
                : overall === 'error' ? '#991b1b'
                : '#7c3aed',
              isRunning || !ghReady,
            )}
          >
            {isRunning ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                {phaseLabel[phase]}
              </>
            ) : overall === 'done' || overall === 'error' ? (
              <>{overall === 'done' && deployDone === 'success' ? '✅' : overall === 'error' ? '❌' : '✓'} {phaseLabel[phase]}</>
            ) : (
              <>🚀 Запустить всё</>
            )}
          </button>

          {overall === 'done' || overall === 'error' ? (
            <button onClick={runAll} style={btnStyle('#1e1e1e')} title="Запустить снова">
              🔄 Запустить снова
            </button>
          ) : null}

          {(actionsUrl || runUrl) && (
            <a href={runUrl || actionsUrl} target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: '#60a5fa', textDecoration: 'none' }}>
              {runUrl ? '→ Открыть этот run' : '→ GitHub Actions'}
            </a>
          )}
        </div>

        {/* ── Progress bar (upload phase) ──────────────────────────────────── */}
        {(phase === 'upload' || assetsDone > 0) && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: '#555' }}>
                Ассеты: &nbsp;
                <span style={{ color: '#4ade80' }}>✓ {assetsOk + assetsSkip}</span> &nbsp;
                <span style={{ color: '#60a5fa' }}>⟳ {assetsSkip}</span> &nbsp;
                <span style={{ color: '#f87171' }}>✗ {assetsErr}</span>
              </span>
              <span style={{ color: phaseColor[phase], fontWeight: 700 }}>
                {phaseLabel[phase]}
              </span>
            </div>
            <div style={{ background: '#111', borderRadius: 6, height: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 6, transition: 'width .25s ease',
                width: `${phase === 'upload' ? progress : 100}%`,
                background: overall === 'error' ? '#ef4444' : phase === 'done' ? '#4ade80' : '#7c3aed',
              }} />
            </div>
          </div>
        )}

        {/* ── Debug log terminal ───────────────────────────────────────────── */}
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 10, overflow: 'hidden' }}>
          {/* terminal header */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #1a1a1a', background: '#0f0f0f' }}>
            <div style={{ display: 'flex', gap: 6, marginRight: 14 }}>
              {['#ef4444', '#eab308', '#22c55e'].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: '#444', flex: 1 }}>deploy.log</span>
            <button onClick={() => setShowDebug((v) => !v)}
              style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: 4, padding: '2px 8px', color: '#555', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer' }}>
              {showDebug ? 'скрыть debug' : 'показать debug'}
            </button>
            <button onClick={() => setLogs([])}
              style={{ marginLeft: 6, background: 'none', border: '1px solid #2a2a2a', borderRadius: 4, padding: '2px 8px', color: '#555', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer' }}>
              очистить
            </button>
          </div>

          {/* log body */}
          <div ref={logRef} style={{ height: 420, overflowY: 'auto', padding: '10px 0', scrollBehavior: 'smooth' }}>
            {logs.length === 0 ? (
              <div style={{ padding: '20px 16px', color: '#2a2a2a', fontSize: 12 }}>
                Нажми «🚀 Запустить всё» — логи появятся здесь в реальном времени.
              </div>
            ) : (
              logs
                .filter((e) => showDebug || e.level !== 'debug')
                .map((entry) => (
                  <div key={entry.id}
                    style={{
                      display: 'flex', gap: 0, padding: '1px 0',
                      background: entry.level === 'head' ? '#0d0d1a' : entry.level === 'err' ? '#1a0808' : 'transparent',
                      borderLeft: entry.level === 'head' ? '2px solid #4f46e5' : entry.level === 'err' ? '2px solid #7f1d1d' : '2px solid transparent',
                    }}
                  >
                    <span style={{ color: '#2a2a2a', padding: '0 12px', fontSize: 11, flexShrink: 0, lineHeight: '20px', userSelect: 'none' }}>
                      {entry.time}
                    </span>
                    <span style={{
                      fontSize: 11, padding: '0 4px', minWidth: 46, textAlign: 'right', flexShrink: 0,
                      color: LC[entry.level], lineHeight: '20px', fontWeight: entry.level === 'head' ? 700 : 400,
                    }}>
                      {entry.level}
                    </span>
                    <span style={{ color: LC[entry.level], fontSize: 12, padding: '0 0 0 12px', lineHeight: '20px', wordBreak: 'break-all', opacity: entry.level === 'debug' ? 0.5 : 1 }}>
                      {entry.msg}
                    </span>
                  </div>
                ))
            )}
          </div>

          {/* legend */}
          <div style={{ borderTop: '1px solid #1a1a1a', padding: '8px 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(Object.entries(LC) as [LogLevel, string][]).map(([level, color]) => (
              <span key={level} style={{ fontSize: 10, color, opacity: 0.7 }}>
                ■ {level}
              </span>
            ))}
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}