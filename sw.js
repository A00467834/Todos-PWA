self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache-name-03')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/styles.css',
                    'https://unpkg.com/dexie/dist/dexie.js',
                    '/db.js',
                    '/index.js',
                    '/manifest.json',
                    '/favicon.ico',
                    '/todo-icon-x192.png',
                    '/todo-icon-x512.png'
                ])
            })
    );
    return self.clients.claim();
});

// activat service worker
self.addEventListener('activate', function (event) {
    console.log('Service worker activated', event);
})

// return cached response
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                return res;
            })
    );
});