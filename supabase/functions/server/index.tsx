import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { ensureBucket, uploadAsset, uploadAssetFromBytes, listUploadedAssets, getPublicUrl } from "./assets.tsx";

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

// ── Helper: query asset map with both key+value ───────────────────────────────
// kv.getByPrefix() strips keys (returns values only), so we query DB directly.
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

// ── Asset Storage Routes ───────────────────────────────────────────────────────

/**
 * POST /make-server-de62407f/assets/upload
 * Body: { filename: string, url: string }
 * Fetches the image from `url` and uploads it to Supabase Storage.
 * Returns { publicUrl } or { error }.
 */
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

/**
 * POST /make-server-de62407f/assets/upload-bytes
 * Body: { filename: string, data: string (base64), mimeType?: string }
 * Browser fetches the blob URL itself and sends raw bytes as base64.
 * Returns { publicUrl } or { error }.
 */
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

/**
 * GET /make-server-de62407f/assets/map
 * Returns the full hash→supabaseURL mapping stored in KV.
 * Used by the Vite plugin and runtime resolver.
 */
app.get("/make-server-de62407f/assets/map", async (c) => {
  try {
    const map = await getAssetMap();
    return c.json({ map, count: Object.keys(map).length });
  } catch (e) {
    console.log("assets/map error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

/**
 * POST /make-server-de62407f/assets/save-url
 * Body: { filename: string, publicUrl: string }
 * Saves the hash→URL mapping to KV store.
 */
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

/**
 * GET /make-server-de62407f/assets/uploaded
 * Returns list of already-uploaded filenames from Storage.
 * Used by migration runner to skip already-done files.
 */
app.get("/make-server-de62407f/assets/uploaded", async (c) => {
  try {
    const files = await listUploadedAssets();
    return c.json({ files, count: files.length });
  } catch (e) {
    console.log("assets/uploaded error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

/**
 * GET /make-server-de62407f/assets/export-json
 * Returns asset-map.json content — ready to commit to git.
 */
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

Deno.serve(app.fetch);