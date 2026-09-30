import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /isitniceout/, not from /.
  // Change to '/' if you ever use a custom domain.
  base: '/isitniceout/',
  plugins: [vue(), tailwindcss()],
})
