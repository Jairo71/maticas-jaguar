
const CACHE_NAME = 'i-learn-math-cache-v1';
const urlsToCache = [
    '/',
  'index.html',
  'manifest.json',
  'sw.js',
  '/assets/icono-pequeño.png',
  '/assets/icono-grande.png',
  // --- Perímetros ---
  '/assets/imagenes/Reactivo1_peri.png',
  '/assets/imagenes/Reactivo2_peri.png',
  '/assets/imagenes/Reactivo3_peri.png',
  '/assets/imagenes/Reactivo4_peri.png',
  '/assets/imagenes/Reactivo5_peri.png',
  '/assets/imagenes/Reactivo6_peri.png',
  '/assets/imagenes/Reactivo7_peri.png',
  '/assets/imagenes/Reactivo8_peri.png',
  '/assets/imagenes/Reactivo9_peri.png',
  '/assets/imagenes/Reactivo10_peri.png',
  // --- Sucesiones ---
  '/assets/imagenes/Reactivo1_suce.png',
  '/assets/imagenes/Reactivo2_suce.png',
  '/assets/imagenes/Reactivo3_suce.png',
  '/assets/imagenes/Reactivo4_suce.png',
  '/assets/imagenes/Reactivo5_suce.png',
  '/assets/imagenes/Reactivo6_suce.png',
  '/assets/imagenes/Reactivo7_suce.png',
  '/assets/imagenes/Reactivo8_suce.png',
  '/assets/imagenes/Reactivo9_suce.png',
  '/assets/imagenes/Reactivo10_suce.png',
  // --- Otros temas (Reactivo1.png, etc.) ---
  '/assets/imagenes/Reactivo1.png',
  '/assets/imagenes/Reactivo2.png',
  '/assets/imagenes/Reactivo3.png',
  '/assets/imagenes/Reactivo4.png',
  '/assets/imagenes/Reactivo5.png',
  '/assets/imagenes/Reactivo6.png',
  '/assets/imagenes/Reactivo7.png',
  '/assets/imagenes/Reactivo8.png',
  '/assets/imagenes/Reactivo9.png',
  '/assets/imagenes/Reactivo10.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                // Use addAll for atomic operation, but it fails if one request fails.
                // A more robust way for external resources is to fetch and put individually.
                const promises = urlsToCache.map(url => {
                    return fetch(new Request(url, { mode: 'no-cors' }))
                        .then(response => {
                            // Responses from no-cors are opaque and have status 0. We can cache them.
                            if (response.status === 0 || response.ok) {
                                return cache.put(url, response);
                            }
                            console.error(`Failed to fetch and cache ${url}. Status: ${response.status}`);
                            return Promise.resolve(); // Continue even if one fails
                        }).catch(err => {
                            console.error(`Fetch error for ${url}:`, err);
                        });
                });
                return Promise.all(promises);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Not in cache - go to network
                return fetch(event.request).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 && networkResponse.type !== 'opaque') {
                            return networkResponse;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                ).catch(error => {
                    // This is a simplified offline fallback.
                    // You might want to return a specific offline page here.
                    console.error('Fetching failed:', error);
                });
            })
    );
});
