const cacheName = 'v2';

self.addEventListener('install', e => {
    console.log(`install event: ${e}`, e);

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
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
})

