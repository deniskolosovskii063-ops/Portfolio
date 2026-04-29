import { useState, useCallback, useRef, useEffect } from 'react';
import { assetRegistry, TOTAL_ASSETS } from '../utils/assetRegistry';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { convertAndSave, fetchWebPMap, ImageTask } from '../utils/webpOptimizer';

// Hashes that get quality 0.97 instead of 0.92 (subtle gradients / brand backgrounds)
const GRADIENT_HASHES = new Set([
  'f0a5a169b3b6645ad2104b1123241b145dd4a1ff',
  '83fa246ecf6ba4e0a16e69dd93edd72d9bac84ea',
  'bd0e56bf6e9d68376cc46189a29fc1da338d15a3',
  '1b475722cf5220d3b3c6e2fe10085721b214a367',
  '4ec7aba99419cd6d448575a03ec3e5f365155f8b',
]);

const STORAGE_BASE = `https://${projectId}.supabase.co/storage/v1/object/public/make-de62407f-assets`;

function buildWebpTasks(): ImageTask[] {
  return Object.entries(assetRegistry).map(([filename, src]) => {
    const hash = filename.replace('.png', '');
    // If src isn't a full URL (bare filename, empty string, or relative path),
    // fall back to the deterministic Supabase Storage public URL.
    const resolvedSrc = (src.startsWith('http') || src.startsWith('blob:'))
      ? src
      : `${STORAGE_BASE}/${filename}`;
    return { hash, src: resolvedSrc, label: hash.slice(0, 14) + '…', isGradient: GRADIENT_HASHES.has(hash) };
  });
}

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

// ── server helpers ────────────────────────────────────────────────────────────
// All GitHub API calls go through the backend — the token never touches the browser.

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

// ── component ─────────────────────────────────────────────────────────────────

let logIdCounter = 0;

export default function MigratePage() {
  const [overall,      setOverall]      = useState<OverallStatus>('idle');
  const [logs,         setLogs]         = useState<LogEntry[]>([]);
  const [assetsTotal,  setAssetsTotal]  = useState(TOTAL_ASSETS);
  const [assetsDone,   setAssetsDone]   = useState(0);
  const [assetsOk,     setAssetsOk]     = useState(0);
  const [assetsSkip,   setAssetsSkip]   = useState(0);
  const [assetsErr,    setAssetsErr]    = useState(0);
  const [phase, setPhase] = useState<'idle' | 'webp' | 'upload' | 'commit' | 'deploy' | 'done'>('idle');
  const [webpTotal, setWebpTotal] = useState(0);
  const [webpDone,  setWebpDone]  = useState(0);
  const [webpOk,    setWebpOk]    = useState(0);
  const [webpErr,   setWebpErr]   = useState(0);
  const withWebpRef = useRef(false);
  const [actionsUrl, setActionsUrl] = useState('');
  const [runUrl,     setRunUrl]     = useState('');
  const [deployDone, setDeployDone] = useState<'none' | 'success' | 'failure'>('none');
  const [showDebug,  setShowDebug]  = useState(true);

  const logRef   = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);
  const pollRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (pollRef.current) clearTimeout(pollRef.current); }, []);

  // ── log helper ──────────────────────────────────────────────────────────────

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

  // ── main flow ───────────────────────────────────────────────────────────────

  const runAll = useCallback(async () => {
    abortRef.current = false;
    setOverall('running');
    setLogs([]);
    setAssetsDone(0); setAssetsOk(0); setAssetsSkip(0); setAssetsErr(0);
    setWebpDone(0); setWebpOk(0); setWebpErr(0); setWebpTotal(0);
    setActionsUrl(''); setRunUrl(''); setDeployDone('none');

    const withWebp = withWebpRef.current;
    const totalPhases = withWebp ? 4 : 3;

    // ── PHASE 0 — WebP ────────────────────────────────────────────────────────
    if (withWebp) {
      setPhase('webp');
      log('head', `═══ PHASE 0 / ${totalPhases} — Оптимизация изображений → WebP ═══`);

      const allTasks = buildWebpTasks();
      setWebpTotal(allTasks.length);

      let existingMap: Record<string, unknown> = {};
      try {
        existingMap = await fetchWebPMap();
        log('debug', `WebP-map: уже готово ${Object.keys(existingMap).length} из ${allTasks.length}`);
      } catch (e) {
        log('warn', `Не удалось загрузить webp-map: ${e} — конвертируем всё`);
      }

      const toConvert = allTasks.filter((t) => !existingMap[t.hash]);
      const skipCount  = allTasks.length - toConvert.length;
      setWebpDone(skipCount);
      setWebpOk(skipCount);
      log('info', `Всего: ${allTasks.length} | уже готово: ${skipCount} | конвертируем: ${toConvert.length}`);

      let wOk = skipCount;
      let wErr = 0;
      const W_CONCURRENCY = 3;

      for (let i = 0; i < toConvert.length; i += W_CONCURRENCY) {
        if (abortRef.current) { log('warn', '⛔ Прервано'); setOverall('error'); return; }
        const chunk = toConvert.slice(i, i + W_CONCURRENCY);
        await Promise.all(chunk.map(async (task) => {
          try {
            log('debug', `⚙ WebP: ${task.hash.slice(0, 16)}…`);
            const entry = await convertAndSave(task);
            wOk++;
            log('ok', `✓ WebP ${task.hash.slice(0, 16)}… → −${entry.savings}% (${Math.round(entry.webpSize / 1024)} KB)`);
          } catch (e) {
            wErr++;
            log('err', `✗ WebP ${task.hash.slice(0, 16)}…: ${e}`);
          }
          setWebpDone((p) => p + 1);
          setWebpOk(wOk);
          setWebpErr(wErr);
        }));
      }
      log('ok', `✓ WebP готово. Успешно: ${wOk}  Ошибок: ${wErr}`);
      if (abortRef.current) { setOverall('error'); return; }
    }

    // ── PHASE 1 — Upload assets ───────────────────────────────────────────────
    setPhase('upload');
    log('head', `═══ PHASE 1 / ${totalPhases} — Загрузка ассетов в Supabase Storage ═══`);

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

    log('info', `Всего: ${entries.length}  |  пропускаем: ${toSkip.length}  |  к загрузке: ${toUpload.length}`);

    // Save URLs for already-uploaded files in parallel batches (retry once on failure)
    const SAVE_BATCH = 15;
    for (let i = 0; i < toSkip.length; i += SAVE_BATCH) {
      const chunk = toSkip.slice(i, i + SAVE_BATCH);
      await Promise.all(chunk.map(async ([filename]) => {
        const url = `${STORAGE_BASE}/${filename}`;
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            await apiPost('/assets/save-url', { filename, publicUrl: url });
            break;
          } catch (e) {
            if (attempt === 1) {
              log('warn', `save-url skip ${filename.slice(0, 16)}: ${e}`);
            } else {
              await new Promise(r => setTimeout(r, 800)); // wait before retry
            }
          }
        }
      }));
    }
    setAssetsSkip(toSkip.length);
    setAssetsDone(toSkip.length);

    let uploadOk = 0;
    let uploadErr = 0;

    for (let i = 0; i < toUpload.length; i += CONCURRENCY) {
      if (abortRef.current) { log('warn', '⛔ Прервано'); setOverall('error'); return; }
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
    if (uploadErr > 0) log('warn', `${uploadErr} ассетов не загрузились — деплой продолжим`);

    // ── PHASE 2 — Commit via backend (token stays on server!) ─────────────────
    setPhase('commit');
    log('head', `═══ PHASE 2 / ${totalPhases} — Коммит в GitHub (через сервер) ═══`);
    log('info', '🔒 Токен хранится на сервере — в браузер не передаётся');

    const actUrl = `https://github.com/deniskolosovskii063-ops/Portfolio/actions`;
    setActionsUrl(actUrl);

    let commitSha = '';
    try {
      const result = await apiPost('/github/deploy', {});

      // Replay server logs into our terminal
      if (result.logs && Array.isArray(result.logs)) {
        for (const raw of result.logs) {
          try {
            const entry = typeof raw === 'string' ? JSON.parse(raw) : raw;
            log((entry.level as LogLevel) ?? 'info', entry.msg ?? String(entry));
          } catch {
            log('debug', String(raw));
          }
        }
      }

      if (!result.ok) {
        throw new Error(result.error ?? 'Server returned ok:false');
      }

      commitSha = result.commitSha ?? '';

    } catch (e) {
      log('err', `❌ Ошибка фазы commit: ${e}`);
      setOverall('error');
      setPhase('idle');
      return;
    }

    // ── PHASE 3 — Poll GitHub Actions (proxied through server) ────────────────
    setPhase('deploy');
    log('head', `═══ PHASE 3 / ${totalPhases} — Слежу за GitHub Actions ═══`);
    log('info', 'Ожидаю появления workflow run...');

    const pollStart = Date.now();
    let attempts = 0;
    const MAX_ATTEMPTS = 45;

    const poll = async () => {
      attempts++;
      log('debug', `Polling attempt #${attempts}...`);
      try {
        const runsData = await apiGet('/github/runs');
        const runs: WorkflowRun[] = runsData.workflow_runs ?? [];
        log('debug', `Получено ${runs.length} runs`);

        const cutoff = pollStart - 30_000;
        const run =
          (commitSha ? runs.find((r) => r.head_sha === commitSha) : undefined) ??
          runs.find((r) => new Date(r.created_at).getTime() >= cutoff);

        if (!run) {
          log('info', `Workflow run ещё не появился (попытка ${attempts}/${MAX_ATTEMPTS})...`);
        } else {
          setRunUrl(run.html_url);
          log('debug', `Найден run #${run.id}  status=${run.status}  conclusion=${run.conclusion ?? 'null'}`);

          if (run.status === 'completed') {
            if (run.conclusion === 'success') {
              setDeployDone('success');
              setPhase('done');
              setOverall('done');
              log('ok', '✅ Деплой завершён успешно!');
              log('ok', '🌐 Сайт: https://deniskolosovskii063-ops.github.io/Portfolio');
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
            log('info', `⏳ Run #${run.id} — status: ${run.status}`);
          }
        }
      } catch (e) {
        log('err', `Polling exception: ${e}`);
      }

      if (attempts >= MAX_ATTEMPTS) {
        log('warn', `⏰ Превышено время ожидания. Проверь вручную: ${actUrl}`);
        setPhase('done');
        setOverall('done');
        return;
      }
      pollRef.current = setTimeout(poll, 8000);
    };

    pollRef.current = setTimeout(poll, 12000);
  }, [log]);

  // ── derived ─────────────────────────────────────────────────────────────────

  const isRunning    = overall === 'running';
  const progress     = assetsTotal > 0 ? Math.round((assetsDone / assetsTotal) * 100) : 0;
  const webpProgress = webpTotal > 0 ? Math.round((webpDone / webpTotal) * 100) : 0;

  const phaseLabel: Record<typeof phase, string> = {
    idle:   'Готов к запуску',
    webp:   `WebP: ${webpDone}/${webpTotal}`,
    upload: `Загрузка ассетов: ${assetsDone}/${assetsTotal}`,
    commit: 'Коммит в GitHub...',
    deploy: 'GitHub Actions деплоит...',
    done:   deployDone === 'success' ? '✅ Задеплоено!' : deployDone === 'failure' ? '❌ Деплой упал' : '✓ Завершено',
  };
  const phaseColor: Record<typeof phase, string> = {
    idle:   '#555',
    webp:   '#a78bfa',
    upload: '#60a5fa',
    commit: '#a78bfa',
    deploy: '#fbbf24',
    done:   deployDone === 'success' ? '#4ade80' : deployDone === 'failure' ? '#f87171' : '#a3a3a3',
  };

  // ── styles ───────────────────────────────────────────────────────────────────

  const btnStyle = (bg: string, off = false): React.CSSProperties => ({
    padding: '0 28px', height: 42, borderRadius: 8, border: 'none',
    background: off ? '#1a1a1a' : bg, color: off ? '#444' : '#fff',
    fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
    cursor: off ? 'not-allowed' : 'pointer', opacity: off ? 0.5 : 1,
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'opacity .15s, background .15s',
  });

  return (
    <div style={{ fontFamily: 'monospace', background: '#080808', color: '#e0e0e0', minHeight: '100vh', padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
            🚀 One-Click Deploy
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: '0 0 4px' }}>
            {TOTAL_ASSETS} ассетов · репо: deniskolosovskii063-ops/Portfolio
          </p>
          <p style={{ color: '#4ade80', fontSize: 12, margin: 0 }}>
            🔒 Токен хранится на сервере Supabase — в браузер никогда не передаётся
          </p>
        </div>

        {/* ── Buttons ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <button
            onClick={isRunning ? undefined : () => { withWebpRef.current = true; runAll(); }}
            disabled={isRunning}
            style={btnStyle(
              overall === 'done' && deployDone === 'success' && withWebpRef.current ? '#15803d'
                : overall === 'error' ? '#991b1b'
                : '#7c3aed',
              isRunning,
            )}
          >
            {isRunning && withWebpRef.current ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                {phaseLabel[phase]}
              </>
            ) : overall === 'done' || overall === 'error' ? (
              <>{overall === 'done' && deployDone === 'success' ? '✅' : overall === 'error' ? '❌' : '✓'} {phaseLabel[phase]}</>
            ) : (
              <>✨ Оптимизировать + Задеплоить</>
            )}
          </button>

          {!isRunning && overall === 'idle' && (
            <button
              onClick={() => { withWebpRef.current = false; runAll(); }}
              style={btnStyle('#1a1a1a')}
              title="Только загрузка ассетов + деплой (без WebP)"
            >
              🚀 Только деплой
            </button>
          )}

          {(overall === 'done' || overall === 'error') && (
            <button
              onClick={() => { withWebpRef.current = true; runAll(); }}
              style={btnStyle('#1e1e1e')}
            >
              🔄 Снова
            </button>
          )}

          {(actionsUrl || runUrl) && (
            <a href={runUrl || actionsUrl} target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: '#60a5fa', textDecoration: 'none' }}>
              {runUrl ? '→ Открыть этот run' : '→ GitHub Actions'}
            </a>
          )}
        </div>

        {/* ── WebP progress ───────────────────────────────────────────────────── */}
        {(phase === 'webp' || webpDone > 0) && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: '#555' }}>
                WebP: &nbsp;
                <span style={{ color: '#4ade80' }}>✓ {webpOk}</span> &nbsp;
                {webpErr > 0 && <span style={{ color: '#f87171' }}>✗ {webpErr}</span>}
              </span>
              <span style={{ color: phaseColor[phase], fontWeight: 700 }}>
                {phase === 'webp' ? phaseLabel['webp'] : `WebP: ${webpOk}/${webpTotal}`}
              </span>
            </div>
            <div style={{ background: '#111', borderRadius: 6, height: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 6, transition: 'width .25s ease',
                width: `${phase === 'webp' ? webpProgress : 100}%`,
                background: webpErr > 0 && phase !== 'webp' ? '#ef4444' : '#a855f7',
              }} />
            </div>
          </div>
        )}

        {/* ── Upload progress ─────────────────────────────────────────────────── */}
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

        {/* ── Terminal log ────────────────────────────────────────────────────── */}
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 10, overflow: 'hidden' }}>
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

          <div ref={logRef} style={{ height: 420, overflowY: 'auto', padding: '10px 0', scrollBehavior: 'smooth' }}>
            {logs.length === 0 ? (
              <div style={{ padding: '20px 16px', color: '#2a2a2a', fontSize: 12 }}>
                Нажми кнопку — логи появятся здесь в реальном времени.
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

          <div style={{ borderTop: '1px solid #1a1a1a', padding: '8px 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(Object.entries(LC) as [LogLevel, string][]).map(([level, color]) => (
              <span key={level} style={{ fontSize: 10, color, opacity: 0.7 }}>■ {level}</span>
            ))}
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}