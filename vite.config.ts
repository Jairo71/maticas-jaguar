// ARCHIVO: vite.config.ts
// INSTRUCCIÓN: REEMPLAZA TODO EL CÓDIGO CON ESTA VERSIÓN FINAL Y COMPLETA.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   // Estrategia de actualización automática para el Service Worker.
    //   registerType: 'autoUpdate',
      
    //   // Aseguramos que el Service Worker se genere aunque no se importe 'virtual:pwa-register'.
    //   injectRegister: 'auto',

    //   // Configuración de Workbox para el cacheo de archivos.
    //   workbox: {
    //     cleanupOutdatedCaches: true, // Limpia cachés antiguas en cada actualización.
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,jpg,jpeg,gif}'], // Archivos que se guardarán en caché.
    //   },

    //   // Configuración del Manifest de la PWA.
    //   // Este bloque genera el archivo manifest.json.
    //   manifest: {
    //     name: 'Máticas Jaguar',
    //     short_name: 'Máticas',
    //     description: 'Una aplicación interactiva para aprender y practicar matemáticas.',
    //     theme_color: '#4CAF50', // Un color verde más acorde a la temática. Puedes cambiarlo.
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     scope: '/',
    //     start_url: '/',
    //     orientation: 'portrait',
    //     icons: [
    //       {
    //         // Icono estándar, usado en muchos contextos.
    //         // **IMPORTANTE**: Corresponde al archivo /public/icono-192x192.png
    //         src: 'icono-192x192.png', 
    //         sizes: '192x192',
    //         type: 'image/png',
    //         purpose: 'any' 
    //       },
    //       {
    //         // Icono más grande para pantallas de alta resolución.
    //         // **IMPORTANTE**: Corresponde al archivo /public/icono-512x512.png
    //         src: 'icono-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any'
    //       },
    //       {
    //         // Icono MASKABLE. crucial para Android.
    //         // El sistema lo usará para el ícono en la pantalla de inicio.
    //         // **ACCIÓN REQUERIDA**: Necesitas crear este archivo.
    //         src: 'icono-maskable-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'maskable'
    //       }
    //     ]
    //   }
    // })
  ],
})
