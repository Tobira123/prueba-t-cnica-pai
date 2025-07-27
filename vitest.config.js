/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,                       // permite a Vite procesar .css
    setupFiles: ['src/tests/setup/vitest.setup.js'],
    server: {                        // reemplaza al deprecado deps.inline
      deps: { inline: ['vuetify'] }, // recomendado por Vitest/Vuetify
    },
    deps: {
      optimizer: { web: { include: ['vuetify'] } }, // algunos casos lo requieren
    },
    // (opcional) si notas comportamientos raros en Windows/WSL:
    // pool: 'vmThreads',
  },
  resolve: { alias: { '@': '/src' } },
})
