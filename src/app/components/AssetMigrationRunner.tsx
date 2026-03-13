/**
 * AssetMigrationRunner
 *
 * Runs silently in the background on first page load inside Figma Make.
 * For each figma:asset/ image, it:
 *   1. Checks if already uploaded to Supabase Storage
 *   2. If not — fetches the image blob and uploads via the server
 *   3. Stores the hash → Supabase public URL mapping in KV store
 *
 * After migration, a "Download asset-map.json" button appears.
 * Place that file at /src/asset-map.json and the Vite plugin will use
 * Supabase URLs for all standalone (GitHub) builds.
 */

import { useEffect, useRef, useState } from 'react';
import { assetRegistry, TOTAL_ASSETS } from '../utils/assetRegistry';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-de62407f`;
const CONCURRENCY = 3; // parallel uploads

type Status = 'idle' | 'running' | 'done' | 'error';

interface Progress {
  done: number;
  total: number;
  failed: number;
  status: Status;
}

async function fetchImageBlob(url: string): Promise<Blob | null> {
  try {
    if (!url || url === '') return null;

    // Handle data URLs directly
    if (url.startsWith('data:')) {
      const [header, data] = url.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return new Blob([bytes], { type: mimeType });
    }

    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
}

async function uploadAsset(
  key: string,
  blob: Blob,
): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('key', key);
    formData.append('file', blob, key);

    const res = await fetch(`${SERVER}/upload-asset`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${publicAnonKey}` },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`[AssetMigration] Upload failed for ${key}:`, err);
      return null;
    }

    const { url } = await res.json();
    return url ?? null;
  } catch (e) {
    console.error(`[AssetMigration] Upload error for ${key}:`, e);
    return null;
  }
}

async function downloadAssetMap(): Promise<void> {
  try {
    const res = await fetch(`${SERVER}/asset-map`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    const map = await res.json();

    const json = JSON.stringify(map, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'asset-map.json';
    a.click();
    URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error('[AssetMigration] Failed to download asset-map:', e);
  }
}

export function AssetMigrationRunner() {
  const [progress, setProgress] = useState<Progress>({
    done: 0,
    total: TOTAL_ASSETS,
    failed: 0,
    status: 'idle',
  });
  const [dismissed, setDismissed] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    runMigration();
  }, []);

  async function runMigration() {
    try {
      // Get already-migrated assets
      const mapRes = await fetch(`${SERVER}/asset-map`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!mapRes.ok) {
        console.warn('[AssetMigration] Could not reach server, skipping migration.');
        return;
      }
      const existingMap: Record<string, string> = await mapRes.json();

      // Filter to only those not yet migrated
      const toMigrate = Object.entries(assetRegistry).filter(
        ([key, url]) => !existingMap[key] && url && url !== '',
      );

      if (toMigrate.length === 0) {
        setProgress((p) => ({ ...p, status: 'done' }));
        return;
      }

      setProgress({ done: 0, total: toMigrate.length, failed: 0, status: 'running' });

      let done = 0;
      let failed = 0;

      // Process in batches of CONCURRENCY
      for (let i = 0; i < toMigrate.length; i += CONCURRENCY) {
        const batch = toMigrate.slice(i, i + CONCURRENCY);
        await Promise.all(
          batch.map(async ([key, url]) => {
            const blob = await fetchImageBlob(url);
            if (!blob) {
              failed++;
              return;
            }
            const result = await uploadAsset(key, blob);
            if (result) done++;
            else failed++;
            setProgress({ done, total: toMigrate.length, failed, status: 'running' });
          }),
        );
      }

      setProgress({ done, total: toMigrate.length, failed, status: 'done' });
      console.log(`[AssetMigration] Complete: ${done} uploaded, ${failed} failed.`);
    } catch (e) {
      console.error('[AssetMigration] Unexpected error:', e);
      setProgress((p) => ({ ...p, status: 'error' }));
    }
  }

  // Don't render if idle or dismissed
  if (progress.status === 'idle' || dismissed) return null;

  const pct =
    progress.total > 0
      ? Math.round((progress.done / progress.total) * 100)
      : 0;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 rounded-xl shadow-2xl"
      style={{
        background: 'rgba(18,18,18,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '14px 16px',
        minWidth: 260,
        maxWidth: 320,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}
        >
          {progress.status === 'running' && '⬆ Uploading to Supabase'}
          {progress.status === 'done' && '✓ Migration complete'}
          {progress.status === 'error' && '✗ Migration error'}
        </span>
        <button
          onClick={() => setDismissed(true)}
          style={{
            color: 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      {progress.status === 'running' && (
        <>
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                borderRadius: 2,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {progress.done} / {progress.total} изображений
            {progress.failed > 0 && ` · ${progress.failed} ошибок`}
          </p>
        </>
      )}

      {/* Done state — download button */}
      {progress.status === 'done' && (
        <>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {progress.done} / {TOTAL_ASSETS} загружено в Supabase CDN
          </p>
          <button
            onClick={downloadAssetMap}
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '7px 12px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'left',
            }}
          >
            ↓ Скачать asset-map.json
          </button>
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 10,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.4,
            }}
          >
            Сохрани файл в /src/asset-map.json — и сайт заработает на GitHub.
          </p>
        </>
      )}
    </div>
  );
}
