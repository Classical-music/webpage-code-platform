import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@WidgetList': fileURLToPath(new URL('./src/WidgetList', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
    }
  }
})
