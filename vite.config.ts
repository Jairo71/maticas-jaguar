// ARCHIVO: vite.config.ts
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTA VERSIÓN FINAL Y COMPLETA.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,jpg,jpeg,gif}'],
      },
      manifest: {
        name: 'Máticas Jaguar',
        short_name: 'Máticas',
        description: 'Una aplicación interactiva para aprender y practicar matemáticas.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})