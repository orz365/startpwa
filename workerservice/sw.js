var cacheName = 'workserservice23'
var contentToCache = [
    '/workerservice/app.js?v=2',
    '/workerservice/dati.png'
]

self.addEventListener('install', function (e) {
    console.log(e)
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content')
            return cache.addAll(contentToCache)
        })

    )
})

self.addEventListener('activate', function(e) {
    console.log("activate开始")
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                console.log("遍历的缓存key：",key);
                if(cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url,r)
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url)
                    cache.put(e.request, response.clone())
                    return response
                })
            })
        })
    )
})
