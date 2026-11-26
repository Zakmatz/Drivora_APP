import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxy = { '/api': { target: env.VITE_DEV_API_PROXY || 'http://localhost:4100', changeOrigin: true } };

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['branding/*.{svg,png}', 'icons/*.png'],
        manifest: {
          name: 'DRIVORA — Driver untuk Setiap Perjalanan',
          short_name: 'DRIVORA',
          description: 'Katalog jasa pengemudi profesional di Semarang dan sekitarnya.',
          lang: 'id',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait-primary',
          theme_color: '#961E2D',
          background_color: '#FFFAFA',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          // App shell (JS, CSS, font) di-precache. Gambar konten TIDAK di-precache — di-cache saat dipakai.
          globPatterns: ['**/*.{js,css,html,woff2,svg,png,ico}'],
          globIgnores: ['images/**'],
          navigateFallback: '/index.html',          // fallback offline untuk navigasi SPA
          navigateFallbackDenylist: [/^\/api\//],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              // Data API: selalu coba jaringan dulu agar data tidak basi; cache hanya sebagai cadangan offline.
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'drivora-api',
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 },
                cacheableResponse: { statuses: [200] },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'StaleWhileRevalidate',
              options: { cacheName: 'drivora-images', expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 } },
            },
          ],
        },
      }),
    ],
    server: { port: 5174, proxy, host: true },
    preview: { port: 4174, proxy },
  };
});
