var cacheName = 'workserservice'
var contentToCache = [
  '/vue-webpack-project/workerservice/',
  '/vue-webpack-project/workerservice/index.html',
  '/vue-webpack-project/workerservice/index.js',
  '/vue-webpack-project/workerservice/dati.png'
]

self.addEventListener('install', function (e) {
  console.log(e)
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[Service Worker] Caching all: app shell and content')
      return cache.addAll(contentToCache)
    })
  )
})

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url)
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
