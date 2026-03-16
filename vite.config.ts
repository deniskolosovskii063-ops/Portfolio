import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base is '/' by default; override with VITE_BASE env var for GitHub Pages
  // subdirectory deployments, e.g. VITE_BASE=/portfolio/
  base: process.env.VITE_BASE ?? '/',

  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react({
      // Exclude Figma-generated imports from Babel to avoid the 500 KB
      // "deoptimised styling" warning. Vite's built-in esbuild transform
      // handles JSX/TSX in these files with no file-size limit.
      exclude: [new RegExp('/src/imports/')],
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
