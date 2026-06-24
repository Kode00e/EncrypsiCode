var CACHE='encrypsicode-v2';
var BASE=self.registration.scope;
var URLS=[BASE,BASE+'index.html',BASE+'manifest.json'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(URLS);
    }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(
        ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)})
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r||fetch(e.request);
    })
  );
});
