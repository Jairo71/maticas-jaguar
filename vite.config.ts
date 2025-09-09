// ARCHIVO: vite.config.ts
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTA VERSIÓN FINAL Y COMPLETA.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // ... (la configuración de PWA se mantiene comentada por ahora)
  ],
  // AÑADIDO: Configuración del servidor de desarrollo
  server: {
    proxy: {
      // Redirige las peticiones de /api a tu backend en localhost:3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Reescribe la ruta para quitar el prefijo /api
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
