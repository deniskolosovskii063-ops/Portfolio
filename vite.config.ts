import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

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
            Object.entries(raw).filter(([k]) => /^[0-9a-f]{40}\.png$/i.test(k))
          )
          console.log('[figma-asset-fallback] loaded ' + Object.keys(assetMap).length + ' assets')
        } catch (e) {
          console.warn('[figma-asset-fallback] failed to parse asset-map.json:', e)
        }
      }
    },
    resolveId(id) {
      if (id.startsWith('figma:asset/') && Object.keys(assetMap).length > 0) {
        return '__figma_asset__:' + id
      }
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
    react({ exclude: [/\/src\/imports\//] }),
    tailwindcss(),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
