// DBStudio - Service Worker
var CACHE = 'dbstudio-v2';
var FILES = ['./', './index.html', './manifest.json', './1781700842770.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).catch(function(){}));
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k !== CACHE) return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(fetch(e.request).catch(function(){ return caches.match(e.request); }));
});
