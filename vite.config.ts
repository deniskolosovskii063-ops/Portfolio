import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * figmaAssetFallback
 * ──────────────────
 * In Figma Make the platform's own plugin resolves `figma:asset/xxx.png`
 * before this plugin runs, so it's a no-op there.
 * In a standard Vite build (GitHub CI, local dev without Figma Make)
 * this plugin reads src/asset-map.json and returns the Supabase CDN URL.
 *
 * IMPORTANT: We ALWAYS intercept every `figma:asset/` id — even if the asset
 * is not yet in the map — so that a plain `vite build` never errors with
 * "Failed to resolve import figma:asset/…".  Missing assets get an empty
 * string URL and a console warning instead of a hard build failure.
 */
function figmaAssetFallback(): import('vite').Plugin {
  let assetMap: Record<string, string> = {};

  return {
    name: 'figma-asset-fallback',
    enforce: 'pre',
    buildStart() {
      const mapPath = path.resolve(__dirname, 'src/asset-map.json');
      if (fs.existsSync(mapPath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
          // Strip meta-keys (_comment, _total, etc.) — keep only hash.png keys
          assetMap = Object.fromEntries(
            Object.entries(raw).filter(([k]) => /^[0-9a-f]{40}\.png$/i.test(k))
          ) as Record<string, string>;
          console.log(`[figma-asset-fallback] loaded ${Object.keys(assetMap).length} assets from asset-map.json`);
        } catch (e) {
          console.warn('[figma-asset-fallback] failed to parse asset-map.json:', e);
        }
      } else {
        console.warn('[figma-asset-fallback] src/asset-map.json not found — all figma:asset/ imports will resolve to ""');
      }
    },
    resolveId(id: string) {
      // Always intercept every figma:asset/ id, regardless of whether
      // it is in the map. This prevents Vite from trying to resolve the
      // protocol natively and crashing the build.
      if (id.startsWith('figma:asset/')) {
        return '\0' + id;
      }
      return null;
    },
    load(id: string) {
      if (!id.startsWith('\0figma:asset/')) return null;
      const filename = id.replace('\0figma:asset/', '');
      const url = assetMap[filename] ?? '';
      if (!url) {
        console.warn(`[figma-asset-fallback] no URL found for ${filename} — add to src/asset-map.json`);
      }
      return `export default ${JSON.stringify(url)};`;
    },
  };
}

export default defineConfig({
  // base is '/' by default; override with VITE_BASE env var for GitHub Pages
  // subdirectory deployments, e.g. VITE_BASE=/portfolio/
  base: process.env.VITE_BASE ?? '/',

  plugins: [
    figmaAssetFallback(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react({
      // Exclude Figma-generated imports from Babel to avoid the 500 KB
      // "deoptimised styling" warning. Vite's built-in esbuild transform
      // handles JSX/TSX in these files with no file-size limit.
      exclude: [/\/src\/imports\//],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})