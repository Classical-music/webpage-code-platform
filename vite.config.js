import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { devPlugin } from './electron/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devPlugin(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@Utils': fileURLToPath(new URL('./src/Utils', import.meta.url)),
      '@template': fileURLToPath(new URL('./src/template', import.meta.url)),
      '@WidgetMenu': fileURLToPath(new URL('./src/WidgetMenu', import.meta.url)),
      '@WidgetSimu': fileURLToPath(new URL('./src/WidgetSimu', import.meta.url)),
      '@WidgetAttr': fileURLToPath(new URL('./src/WidgetAttr', import.meta.url)),
      '@WidgetCtrl': fileURLToPath(new URL('./src/WidgetCtrl', import.meta.url)),
      '@WidgetPage': fileURLToPath(new URL('./src/WidgetPage', import.meta.url)),
    }
  }
})
