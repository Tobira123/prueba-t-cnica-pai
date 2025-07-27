// vite.config.js
import { defineConfig, splitVendorChunkPlugin } from 'vite'  // ← importa aquí
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),

    // ↙ Brotli
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,         // (opcional) sólo comprime archivos ≥ 1 KB
      deleteOriginFile: false  // conserva el .js “crudo”
    }),

    // ↙ Gzip
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),

    splitVendorChunkPlugin()   // ← añade al final de la lista
  ],

  resolve: { alias: { '@': '/src' } },

  build: {
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600
  }
})
