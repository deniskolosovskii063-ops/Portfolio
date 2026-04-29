/**
 * WebP Optimizer — Browser-side image conversion via Canvas API.
 *
 * Upload strategy (avoids edge-function body size limits):
 *  1. Browser converts image to WebP Blob via Canvas  (no server involved)
 *  2. Browser requests a signed upload URL            (tiny JSON request)
 *  3. Browser PUTs the Blob DIRECTLY to Supabase CDN  (bypasses edge function)
 *  4. Browser POSTs only tiny metadata (sizes, %)     (tiny JSON request)
 *
 * Quality settings:
 *  • UI screenshots / phone screens  → 0.92  (great quality, ~60-70% smaller than PNG)
 *  • Gradient / brand backgrounds    → 0.97  (near-lossless, prevents banding)
 */

import { projectId, publicAnonKey } from '/utils/supabase/info';

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-de62407f`;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WebPEntry {
  url: string;
  originalSize: number;
  webpSize: number;
  savings: number; // percent
}

export interface WebPMap {
  [hash: string]: WebPEntry;
}

export interface ImageTask {
  hash: string;
  src: string;       // resolved original URL (from figma:asset import)
  label: string;
  /** true → quality 0.97 to prevent gradient banding */
  isGradient?: boolean;
}

// ── Core: PNG → WebP Blob ─────────────────────────────────────────────────────

/**
 * Fetch `srcUrl`, draw to Canvas, export as WebP Blob.
 * Returns the blob + exact size stats (no base64 conversion).
 */
export async function convertToWebPBlob(
  srcUrl: string,
  quality = 0.95,
): Promise<{ blob: Blob; originalSize: number; webpSize: number; savings: number }> {
  // 1. Fetch original image
  const resp = await fetch(srcUrl, { mode: 'cors' });
  if (!resp.ok) throw new Error(`Fetch failed (${resp.status}) for ${srcUrl.slice(0, 80)}`);
  const originalBlob = await resp.blob();
  const originalSize = originalBlob.size;

  // 2. Load into Image element
  const blobUrl = URL.createObjectURL(originalBlob);
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const el = new Image();
    el.onload = () => res(el);
    el.onerror = () => rej(new Error(`Image load failed: ${srcUrl.slice(0, 80)}`));
    el.src = blobUrl;
  });

  // 3. Draw to canvas — no background fill → preserves transparency
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(blobUrl);

  // 4. Export as WebP Blob (never null in Chrome/Edge/Firefox)
  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(b) : rej(new Error('canvas.toBlob returned null — WebP unsupported?'))),
      'image/webp',
      quality,
    ),
  );

  const webpSize = blob.size;
  const savings = Math.round((1 - webpSize / originalSize) * 100);
  return { blob, originalSize, webpSize, savings };
}

// ── Server helpers ────────────────────────────────────────────────────────────

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${publicAnonKey}`,
});

/** Fetch the current WebP map from the server KV store. */
export async function fetchWebPMap(): Promise<WebPMap> {
  const resp = await fetch(`${SERVER}/images/webp-map`, { headers: headers() });
  if (!resp.ok) throw new Error(`webp-map fetch failed: ${resp.status}`);
  const { map } = await resp.json();
  return (map as WebPMap) ?? {};
}

/**
 * Full pipeline for one image:
 *  1. Convert PNG → WebP Blob in browser
 *  2. Get signed upload URL from server  (no large payload)
 *  3. PUT Blob directly to Supabase CDN  (bypasses edge function size limit)
 *  4. Save metadata to KV via server     (no large payload)
 */
export async function convertAndSave(task: ImageTask): Promise<WebPEntry> {
  const quality = task.isGradient ? 0.97 : 0.92;

  // Step 1 — Convert in browser
  const { blob, originalSize, webpSize, savings } = await convertToWebPBlob(task.src, quality);

  // Step 2 — Request signed upload URL
  const urlResp = await fetch(`${SERVER}/images/webp-upload-url`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ hash: task.hash }),
  });
  if (!urlResp.ok) {
    const errText = await urlResp.text();
    throw new Error(`Failed to get upload URL for ${task.hash}: ${errText}`);
  }
  const { signedUrl } = await urlResp.json() as { signedUrl: string; token: string; path: string };

  // Step 3 — PUT Blob directly to Supabase Storage (no edge function involved)
  const uploadResp = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/webp' },
    body: blob,
  });
  if (!uploadResp.ok) {
    const errText = await uploadResp.text();
    throw new Error(`Direct upload failed (${uploadResp.status}): ${errText.slice(0, 200)}`);
  }

  // Step 4 — Save metadata only (tiny JSON payload)
  const metaResp = await fetch(`${SERVER}/images/save-webp-meta`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ hash: task.hash, originalSize, webpSize, savings }),
  });
  if (!metaResp.ok) {
    const errText = await metaResp.text();
    throw new Error(`Meta save failed for ${task.hash}: ${errText}`);
  }

  return (await metaResp.json()) as WebPEntry;
}

// ── Formatting utilities ──────────────────────────────────────────────────────

/** Convert any URL (relative or absolute) to an absolute href. */
export function absUrl(src: string): string {
  try {
    return new URL(src, window.location.href).href;
  } catch {
    return src;
  }
}

/** Format bytes nicely: "4.2 MB", "840 KB", "12 B" */
export function fmtBytes(n: number): string {
  if (n >= 1_048_576) return `${(n / 1_048_576).toFixed(1)} MB`;
  if (n >= 1_024) return `${Math.round(n / 1_024)} KB`;
  return `${n} B`;
}
