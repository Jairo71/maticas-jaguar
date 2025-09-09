import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3,jpeg,pdf,webm}'] // Ensure all assets are cached
      },
      manifest: {
        short_name: "Máticas Jaguar",
        name: "Máticas Jaguar: Aprende Matemáticas",
        icons: [
          {
            src: "/icono-192x192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/icono-512x512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#4f46e5",
        background_color: "#ffffff"
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})