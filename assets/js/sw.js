// static/service-worker.js

const CACHE_NAME = "my-pwa-cache-v1";

// List all assets you want to pre-cache
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/images/logo.png", // Add essential images here
  "/images/image1.jpg", // Add all images here
  "/images/image2.jpg",
  "/images/image3.jpg",
  // ... add more images as needed
];

// Install Service Worker and Pre-cache All Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve from Cache First
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the resource is found in the cache, serve it
      return cachedResponse || fetch(event.request);
    })
  );
});

// Optional: Clean up old caches during activation
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
