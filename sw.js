const CACHE_NAME = "dbm-v1";
const urlsToCache = ["/membresia.html", "/manifest-membresia.json", "/dbm-icon-192.png", "/dbm-icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
