// Bump this cache key whenever deployed assets change so installed PWAs refresh cleanly.
const CACHE = 'medal-tracker-v5';
const ASSETS = ['./', './index.html', './style.css', './storage.js', './condition.js', './graph.js', './csv.js', './app.js', './pwa.js', './manifest.json', './assets/icon192.svg', './assets/icon512.svg'];

self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((hit) => hit || fetch(event.request).then((response) => {
    const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});

