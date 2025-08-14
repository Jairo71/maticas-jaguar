
const CACHE_NAME = 'i-learn-math-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'sw.js',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto:wght@400;700&display=swap',
    'https://freetousesounds.com/wp-content/uploads/2022/04/Coin-Sound-Effect.mp3',
    
    // App and Topic Icons
    'https://drive.google.com/thumbnail?id=1kHsPdkw6Tq4MsocpIqixwhsidsGqKcfU',
    'https://drive.google.com/thumbnail?id=1mgiCE1FPr0EOazTWViVxzpdN9dm_Os1X',
    'https://drive.google.com/thumbnail?id=1nBU4DSqhgCN4olAW01afFoXlUmvgZzaR',
    'https://drive.google.com/thumbnail?id=1Ow2_W0aQRTMaP4ooOyxPOFYhST_kAnpO',
    'https://drive.google.com/thumbnail?id=1DnLCVx4QPZ0rm1bP8RL8gFKOmVn78P-N',
    'https://drive.google.com/thumbnail?id=1oXgdQfi4z2wIlcQM8gkd1yctIRosFj6a',
    'https://drive.google.com/thumbnail?id=1ww5d2iV5zgWlo7UBVFjlYX57u9KgCOiR',

    // Perímetros Images
    'https://drive.google.com/thumbnail?id=1zne2lDF4aFNrpGoDj-mKVSVV7uH1wXjh',
    'https://drive.google.com/thumbnail?id=1nEIzQJrlyI0MlA3NMhI3RLKJ6sET-MYh',
    'https://drive.google.com/thumbnail?id=1dhLPO6b_mmUeA6hGoSCAbDzX3x0pgRdz',
    'https://drive.google.com/thumbnail?id=1X0wvjdku0sLDLeryfobbXHSAbJc5AaQt',
    'https://drive.google.com/thumbnail?id=1gtTH58QJk_dx7JAyivuggvGn26Q5lyVG',
    'https://drive.google.com/thumbnail?id=1FLG_HVx86-RY6UbXX8w2rW1TEurUoJeq',
    'https://drive.google.com/thumbnail?id=14_4XR3p7OdY5cEfCEJiYUdf3-yHKMClI',
    'https://drive.google.com/thumbnail?id=1e4MVLCYbvmp38diwIJO9i8H0bR10HWS4',
    'https://drive.google.com/thumbnail?id=1DnLCVx4QPZ0rm1bP8RL8gFKOmVn78P-N',
    'https://drive.google.com/thumbnail?id=1UK_3du_qKGEC-f8-r7rG7R5yjjVII9J-',

    // Sucesiones Images
    'https://drive.google.com/thumbnail?id=1fShUMc7DFJc0s2EWxMse_HMCJUxy_Rl-',
    'https://drive.google.com/thumbnail?id=13AudCE57GqFf61JlVULXyOKGN5Bi3gCa',
    'https://drive.google.com/thumbnail?id=1-gILkSfzliMdXyRLZL_7Adxdbkswxq-r',
    'https://drive.google.com/thumbnail?id=1GNEcXFDc2bIwO4Hs44QlWXFHoXIkI_sJ',
    'https://drive.google.com/thumbnail?id=1R0XRs4GWaa0ZiWix6tuaqNv-0chyJGQ_',
    'https://drive.google.com/thumbnail?id=1zFYtsrBODmmIE_nNLDrjKfQWhMYIignr',
    'https://drive.google.com/thumbnail?id=1XxxK5RddIX69OERTLt3tNdzru9v4kJ-N',
    'https://drive.google.com/thumbnail?id=10us2shyn2oFalegQFXrnyYOeVvJ0nzvC',
    'https://drive.google.com/thumbnail?id=1HeNAudFRHmJaz_BQPgU4ixMaF_cf3-l6',
    'https://drive.google.com/thumbnail?id=1vjxZbI8Y7OucL3ejrPTD83yKdjti9KEp',

    // Números en la Recta Images
    'https://drive.google.com/thumbnail?id=1-X5BsH-D12S_VGN9RCHGrChPVC5cHGiW',
    'https://drive.google.com/thumbnail?id=1wR-teorlaVAyg6KiG9DeDpK2-tHPww1N',
    'https://drive.google.com/thumbnail?id=1q8uHin33S_NiGH0Nsjbuu1kuhWPphdhB',
    'https://drive.google.com/thumbnail?id=1H2ih_vHz79LIWf5U1J6L7qH6FA5Kxvvd',
    'https://drive.google.com/thumbnail?id=1IUk5QLx_AlMvxxiyVfFsy5Vhg7ks-_tP',
    'https://drive.google.com/thumbnail?id=1SLaooaOe1fgKWTiD15X6FAVW9G9OQE0E',
    'https://drive.google.com/thumbnail?id=1bDsAA0UnD0IQPc9RxOOzrMUt0Ywdmxfy',
    'https://drive.google.com/thumbnail?id=19oNgpuL7_MGVnepAZXfnIGEBiTekpcqp',
    'https://drive.google.com/thumbnail?id=1pc-K5q-NthQGySH-X9aHjFjBd6P_h2_m',
    'https://drive.google.com/thumbnail?id=1r0QmLKejM4slwvh6Rjrl0o9ELZXCFP-F'
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
