const CACHE_NAME = 'unifiedapp-v1';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // tambahkan file CSS/JS lain yang Anda butuhkan
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // strategy: cache first, fallback network
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
