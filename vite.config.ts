import { defineConfig } from 'vite'
import path from 'path'
import { readFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * Resolves `figma:asset/<hash>.<ext>` virtual imports.
 *
 * • In Figma Make's own dev/preview environment these imports are handled
 *   natively — this plugin is never invoked for them.
 * • During a GitHub Pages build (pnpm build / GitHub Actions) Vite sees the
 *   virtual specifier and calls resolveId/load.  We look up the hash in
 *   src/asset-map.json (populated by running asset migration once) and
 *   return the Supabase CDN URL as the default export.
 *   If the hash is not yet in the map the export is an empty string so the
 *   build doesn't fail — the image just won't show until migration is run.
 */
function figmaAssetFallback() {
  const PREFIX = 'figma:asset/';
  const VIRTUAL = '\0virtual:figma-asset/';

  let assetMap: Record<string, string> = {};
  try {
    assetMap = JSON.parse(readFileSync('./src/asset-map.json', 'utf8'));
  } catch {
    // asset-map.json missing or empty — gracefully continue
  }

  return {
    name: 'figma-asset-fallback',
    resolveId(id: string) {
      if (id.startsWith(PREFIX)) return VIRTUAL + id.slice(PREFIX.length);
      return null;
    },
    load(id: string) {
      if (!id.startsWith(VIRTUAL)) return null;
      const filename = id.slice(VIRTUAL.length);
      const url = assetMap[filename] ?? '';
      return `export default ${JSON.stringify(url)}`;
    },
  };
}

export default defineConfig({
  // base is '/' by default; override with VITE_BASE env var for GitHub Pages
  // subdirectory deployments, e.g. VITE_BASE=/Portfolio/
  base: process.env.VITE_BASE ?? '/',

  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them.
    react({
      // Exclude Figma-generated imports from Babel to avoid the 500 KB
      // "deoptimised styling" warning.  Vite's built-in esbuild transform
      // handles JSX/TSX in these files with no file-size limit.
      exclude: [/\/src\/imports\//],
    }),
    tailwindcss(),
    // Must come AFTER react() so it only handles the figma:asset/ virtual
    // scheme that react() doesn't know about.
    figmaAssetFallback(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
