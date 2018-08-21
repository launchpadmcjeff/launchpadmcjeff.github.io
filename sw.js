const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'style.css',
    'index.js'
];

self.addEventListener('install', e => {
    console.log(`install event: ${e}`, e);
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('serviceworker: caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log(`activate event: ${e}`, e);
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log(`serviceworker deleting cache ${cache}`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    console.log(`serviceworker fetch: ${e}`, e);
    e.respondWith(
        fetch(e.request)
        .catch(() => caches.match(e.request))
    );
})

