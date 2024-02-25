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
      '@WidgetMenu': fileURLToPath(new URL('./src/WidgetMenu', import.meta.url)),
      '@WidgetCtrl': fileURLToPath(new URL('./src/WidgetCtrl', import.meta.url)),
      '@WidgetSimu': fileURLToPath(new URL('./src/WidgetSimu', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@Utils': fileURLToPath(new URL('./src/Utils', import.meta.url)),
    }
  }
})
