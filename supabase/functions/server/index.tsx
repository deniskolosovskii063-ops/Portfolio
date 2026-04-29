import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { ensureBucket, uploadAsset, uploadAssetFromBytes, listUploadedAssets, getPublicUrl, ensureVideosBucket, uploadVideo } from "./assets.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Storage bucket on startup
ensureBucket().catch((e) => console.log("ensureBucket startup error:", e));
ensureVideosBucket().catch((e) => console.log("ensureVideosBucket startup error:", e));

// ── Helper: query asset map with both key+value ───────────────────────────────
function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

async function getAssetMap(): Promise<Record<string, string>> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("kv_store_de62407f")
    .select("key, value")
    .like("key", "asset:%");
  if (error) throw new Error(`getAssetMap DB error: ${error.message}`);
  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    const filename = (row.key as string).replace("asset:", "");
    map[filename] = row.value as string;
  }
  return map;
}

// ── Health check ───────────────────────────────────────────────────────────────
app.get("/make-server-de62407f/health", (c) => {
  return c.json({ status: "ok" });
});

// ── Keep-alive ping ────────────────────────────────────────────────────────────
app.get("/make-server-de62407f/ping", (c) => {
  console.log("[ping] keep-alive hit at", new Date().toISOString());
  return c.json({ ok: true, ts: new Date().toISOString() });
});

// ── Asset Storage Routes ──────────────────────────────────────────────────────

app.post("/make-server-de62407f/assets/upload", async (c) => {
  let body: { filename?: string; url?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { filename, url } = body;
  if (!filename || !url) {
    return c.json({ error: "Missing required fields: filename, url" }, 400);
  }

  console.log(`assets/upload: uploading ${filename} from ${url.slice(0, 80)}...`);
  const result = await uploadAsset(filename, url);
  if ("error" in result) {
    console.log(`assets/upload: error for ${filename}:`, result.error);
    return c.json(result, 500);
  }
  return c.json(result);
});

app.post("/make-server-de62407f/assets/upload-bytes", async (c) => {
  let body: { filename?: string; data?: string; mimeType?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { filename, data, mimeType } = body;
  if (!filename || !data) {
    return c.json({ error: "Missing required fields: filename, data" }, 400);
  }

  console.log(`assets/upload-bytes: uploading ${filename} (${Math.round(data.length * 0.75 / 1024)}KB)`);
  const result = await uploadAssetFromBytes(filename, data, mimeType || "image/png");
  if ("error" in result) {
    console.log(`assets/upload-bytes: error for ${filename}:`, result.error);
    return c.json(result, 500);
  }
  return c.json(result);
});

app.get("/make-server-de62407f/assets/map", async (c) => {
  try {
    const map = await getAssetMap();
    return c.json({ map, count: Object.keys(map).length });
  } catch (e) {
    console.log("assets/map error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-de62407f/assets/save-url", async (c) => {
  let body: { filename?: string; publicUrl?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }
  const { filename, publicUrl } = body;
  if (!filename || !publicUrl) {
    return c.json({ error: "Missing filename or publicUrl" }, 400);
  }
  try {
    await kv.set(`asset:${filename}`, publicUrl);
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

app.get("/make-server-de62407f/assets/uploaded", async (c) => {
  try {
    const files = await listUploadedAssets();
    return c.json({ files, count: files.length });
  } catch (e) {
    console.log("assets/uploaded error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.get("/make-server-de62407f/assets/export-json", async (c) => {
  try {
    const map = await getAssetMap();
    const count = Object.keys(map).length;
    console.log(`assets/export-json: returning ${count} entries`);
    const json = JSON.stringify(map, null, 2);
    return new Response(json, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="asset-map.json"',
      },
    });
  } catch (e) {
    console.log("assets/export-json error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── WebP Optimization Routes ──────────────────────────────────────────────────

app.get("/make-server-de62407f/images/webp-map", async (c) => {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("kv_store_de62407f")
      .select("key, value")
      .like("key", "webp:%");
    if (error) throw new Error(`webp-map DB error: ${error.message}`);

    const map: Record<string, unknown> = {};
    for (const row of data ?? []) {
      const hash = (row.key as string).replace("webp:", "");
      let entry = row.value;
      if (typeof entry === "string") {
        try { entry = JSON.parse(entry); } catch { /* keep as string */ }
      }
      map[hash] = entry;
    }
    console.log(`images/webp-map: returning ${Object.keys(map).length} entries`);
    return c.json({ map, count: Object.keys(map).length });
  } catch (e) {
    console.log("images/webp-map error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-de62407f/images/webp-upload-url", async (c) => {
  let body: { hash?: string };
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }

  const { hash } = body;
  if (!hash) return c.json({ error: "Missing hash" }, 400);

  const supabase = getSupabaseAdmin();
  const path = `webp/${hash}.webp`;

  const { data, error } = await supabase.storage
    .from("make-de62407f-assets")
    .createSignedUploadUrl(path, { upsert: true });

  if (error || !data) {
    console.log(`images/webp-upload-url error for ${hash}:`, error?.message);
    return c.json({ error: `createSignedUploadUrl failed: ${error?.message}` }, 500);
  }

  console.log(`images/webp-upload-url: signed URL created for webp/${hash}.webp`);
  return c.json({ signedUrl: data.signedUrl, token: data.token, path: data.path });
});

app.post("/make-server-de62407f/images/save-webp-meta", async (c) => {
  let body: { hash?: string; originalSize?: number; webpSize?: number; savings?: number };
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }

  const { hash, originalSize, webpSize, savings } = body;
  if (!hash || originalSize === undefined || webpSize === undefined || savings === undefined) {
    return c.json({ error: "Missing required fields: hash, originalSize, webpSize, savings" }, 400);
  }

  const publicUrl = getPublicUrl(`webp/${hash}.webp`);
  const entry = { url: publicUrl, originalSize, webpSize, savings };

  try {
    await kv.set(`webp:${hash}`, JSON.stringify(entry));
  } catch (e) {
    console.log(`images/save-webp-meta: KV set error for ${hash}:`, e);
    return c.json({ error: `KV save failed: ${String(e)}` }, 500);
  }

  console.log(`images/save-webp-meta: saved ${hash} → ${savings}% savings, ${Math.round(webpSize / 1024)}KB`);
  return c.json(entry);
});

// ── Video Routes ──────────────────────────────────────────────────────────────

const GAZPROM_VIDEO_URL = "https://www.dropbox.com/scl/fi/6msfngpelt75pqllwmw0j/gazprom_id.mp4?rlkey=d35ci80zhqgbldgc0txnp6q81&dl=1";
const GAZPROM_VIDEO_KV_KEY = "video:gazprom";

app.get("/make-server-de62407f/video/gazprom", async (c) => {
  try {
    const url = await kv.get(GAZPROM_VIDEO_KV_KEY);
    return c.json({ url: url ?? null });
  } catch (e) {
    console.log("video/gazprom GET error:", e);
    return c.json({ url: null, error: String(e) });
  }
});

app.post("/make-server-de62407f/video/upload-gazprom", async (c) => {
  try {
    const cached = await kv.get(GAZPROM_VIDEO_KV_KEY);
    if (cached) {
      console.log("video/upload-gazprom: returning cached URL");
      return c.json({ publicUrl: cached, cached: true });
    }

    await ensureVideosBucket();

    console.log("video/upload-gazprom: starting download from Dropbox...");
    const result = await uploadVideo("gazprom_id.mp4", GAZPROM_VIDEO_URL);
    if ("error" in result) {
      console.log("video/upload-gazprom: upload error:", result.error);
      return c.json(result, 500);
    }

    await kv.set(GAZPROM_VIDEO_KV_KEY, result.publicUrl);
    console.log("video/upload-gazprom: saved URL to KV:", result.publicUrl);
    return c.json(result);
  } catch (e) {
    console.log("video/upload-gazprom: unexpected error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.delete("/make-server-de62407f/video/gazprom", async (c) => {
  try {
    await kv.del(GAZPROM_VIDEO_KV_KEY);
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// ── GitHub Deploy Routes ──────────────────────────────────────────────────────

const GH_OWNER  = 'deniskolosovskii063-ops';
const GH_REPO   = 'Portfolio';
const GH_BRANCH = 'main';
const GH_BASE   = '/Portfolio/';

function ghHeaders(): Record<string, string> {
  const token = Deno.env.get('GITHUB_TOKEN');
  if (!token) throw new Error('GITHUB_TOKEN env var is not set');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function ghGetFileSha(path: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${encodeURIComponent(path)}`,
    { headers: ghHeaders() },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(`GitHub GET ${path}: ${(e as any).message || res.status}`);
  }
  return ((await res.json()) as any).sha as string;
}

async function ghPutFile(
  path: string, content: string, message: string, sha?: string | null,
): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: ghHeaders(),
      body: JSON.stringify({ message, content, branch: GH_BRANCH, ...(sha ? { sha } : {}) }),
    },
  );
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(`GitHub PUT ${path}: ${(e as any).message || res.status}`);
  }
  const data = await res.json() as any;
  return data.commit?.sha ?? '';
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  return btoa(binary);
}

async function setGhVar(name: string, value: string): Promise<boolean> {
  const base = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/actions/variables`;
  const checkRes = await fetch(`${base}/${name}`, { headers: ghHeaders() });
  const method = checkRes.ok ? 'PATCH' : 'POST';
  const varUrl = checkRes.ok ? `${base}/${name}` : base;
  const res = await fetch(varUrl, {
    method, headers: ghHeaders(),
    body: JSON.stringify({ name, value, visibility: 'all' }),
  });
  return res.ok || res.status === 204;
}

// ── Embedded file templates pushed to GitHub on deploy ────────────────────────

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

      - name: Fetch fresh asset map from Supabase
        run: |
          echo "Fetching asset map from Supabase..."
          curl -sf \\
            -H "Authorization: Bearer \${{ vars.SUPABASE_ANON_KEY }}" \\
            "\${{ vars.SUPABASE_URL }}/functions/v1/make-server-de62407f/assets/export-json" \\
            -o src/asset-map.json \\
          && echo "✓ asset-map fetched: \$(wc -c < src/asset-map.json) bytes" \\
          || echo "⚠ fetch failed – using committed asset-map.json"
        continue-on-error: true

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

const KEEP_ALIVE_YML = `name: Keep-Alive Supabase Server

on:
  schedule:
    - cron: '0 9 */2 * *'
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase server
        run: |
          STATUS=\$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer \${{ vars.SUPABASE_ANON_KEY }}" "\${{ vars.SUPABASE_URL }}/functions/v1/make-server-de62407f/ping")
          if [ "\$STATUS" = "200" ]; then echo "Server alive"; else echo "Failed: \$STATUS"; exit 1; fi
`;

const GITIGNORE = `# dependencies
node_modules/
.pnp
.pnp.js

# build output
dist/
dist-ssr/
build/

# local env files
.env
.env.local
.env.*.local

# editor / OS
.DS_Store
Thumbs.db
.idea/
.vscode/

# logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# misc
*.local
`;

const VITE_CONFIG_TS = [
  "import { defineConfig } from 'vite'",
  "import path from 'path'",
  "import { readFileSync } from 'fs'",
  "import tailwindcss from '@tailwindcss/vite'",
  "import react from '@vitejs/plugin-react'",
  "",
  "/** Resolves figma:asset/<hash>.<ext> imports using src/asset-map.json */",
  "function figmaAssetFallback() {",
  "  return {",
  "    name: 'figma-asset-fallback',",
  "    resolveId(id: string) {",
  "      if (id.startsWith('figma:asset/')) return 'virtual:figma-asset/' + id.slice('figma:asset/'.length)",
  "      return null",
  "    },",
  "    load(id: string) {",
  "      if (!id.startsWith('virtual:figma-asset/')) return null",
  "      const filename = id.slice('virtual:figma-asset/'.length)",
  "      let map: Record<string, string> = {}",
  "      try {",
  "        map = JSON.parse(readFileSync('./src/asset-map.json', 'utf8'))",
  "      } catch {}",
  "      const url = map[filename] ?? ''",
  "      return 'export default ' + JSON.stringify(url)",
  "    },",
  "  }",
  "}",
  "",
  "export default defineConfig({",
  "  base: process.env.VITE_BASE ?? '/',",
  "",
  "  plugins: [",
  "    react({",
  "      exclude: [new RegExp('/src/imports/')],",
  "    }),",
  "    tailwindcss(),",
  "    figmaAssetFallback(),",
  "  ],",
  "  resolve: {",
  "    alias: {",
  "      '@': path.resolve(__dirname, './src'),",
  "    },",
  "  },",
  "",
  "  assetsInclude: ['**/*.svg', '**/*.csv'],",
  "})",
].join('\n');

// Canonical routes.ts with correct runtime basename detection for all 3 envs
const ROUTES_TS = `import { createBrowserRouter } from 'react-router';
import RootLayout from './components/root-layout';
import GazpromIDPage from './pages/GazpromIDPage';
import GIDPage from './pages/GIDPage';
import NovebaPage from './pages/NovebaPage';
import MigratePage from './pages/MigratePage';
import ZenitPage from './pages/ZenitPage';
import MTSPage from './pages/MTSPage';
import HomePage from './pages/HomePage';
import GIDHubPage from './pages/GIDHubPage';

function getBasename(): string {
  try {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    if (hostname.endsWith('github.io')) return '/Portfolio/';
    if (pathname.startsWith('/_components/')) return import.meta.env.BASE_URL ?? '/';
    return '/';
  } catch {
    return '/';
  }
}

export const router = createBrowserRouter(
  [
    {
      Component: RootLayout,
      children: [
        { index: true,        path: '/',          Component: HomePage },
        { path: '/GazpromID', Component: GazpromIDPage },
        { path: '/GID',       Component: GIDPage },
        { path: '/gidhub',    Component: GIDHubPage },
        { path: '/noveba',    Component: NovebaPage },
        { path: '/zenit',     Component: ZenitPage },
        { path: '/MTS',       Component: MTSPage },
        { path: '/migrate',   Component: MigratePage },
      ],
    },
  ],
  { basename: getBasename() }
);`;

interface FileEntry { path: string; content: string; }

const DEPLOY_FILES: FileEntry[] = [
  { path: 'vite.config.ts',                  content: VITE_CONFIG_TS },
  { path: '.github/workflows/deploy.yml',     content: DEPLOY_YML },
  { path: '.github/workflows/keep-alive.yml', content: KEEP_ALIVE_YML },
  { path: '.gitignore',                       content: GITIGNORE },
  { path: 'src/app/routes.ts',               content: ROUTES_TS },
];

// ── POST /make-server-de62407f/github/deploy ──────────────────────────────────
// Pushes key config + routing files to GitHub, then GitHub Actions auto-builds.
app.post('/make-server-de62407f/github/deploy', async (c) => {
  const logs: { level: string; msg: string }[] = [];
  const push = (level: string, msg: string) => {
    console.log(`[deploy] [${level}] ${msg}`);
    logs.push({ level, msg });
  };

  try {
    push('step', `Деплой → ${GH_OWNER}/${GH_REPO}@${GH_BRANCH}`);

    push('info', 'Устанавливаю переменную VITE_BASE...');
    await setGhVar('VITE_BASE', GH_BASE);
    push('ok', `VITE_BASE = ${GH_BASE}`);

    let lastSha = '';
    for (const file of DEPLOY_FILES) {
      push('info', `Отправляю ${file.path}...`);
      const sha = await ghGetFileSha(file.path);
      const commitSha = await ghPutFile(
        file.path,
        toBase64(file.content),
        `chore: update ${file.path} via /migrate`,
        sha,
      );
      if (commitSha) lastSha = commitSha;
      push('ok', `✓ ${file.path}${sha ? ' (обновлён)' : ' (создан)'}`);
    }

    push('ok', `Запушено. Коммит: ${lastSha.slice(0, 7)}`);
    push('step', 'GitHub Actions запустится автоматически по push-событию.');
    return c.json({ ok: true, commitSha: lastSha, logs });
  } catch (e) {
    push('err', `Ошибка деплоя: ${e}`);
    return c.json({ ok: false, error: String(e), logs }, 500);
  }
});

// ── GET /make-server-de62407f/github/runs ────────────────────────────────────
app.get('/make-server-de62407f/github/runs', async (c) => {
  try {
    const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/actions/runs?per_page=10&branch=${GH_BRANCH}`;
    const res = await fetch(url, { headers: ghHeaders() });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return c.json({ error: `GitHub API: ${(err as any).message || res.status}` }, 502);
    }
    return c.json(await res.json());
  } catch (e) {
    console.log('github/runs error:', e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Start Deno server ─────────────────────────────────────────────────────────
Deno.serve(app.fetch);
