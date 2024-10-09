// static/service-worker.js

const CACHE_NAME = "my-pwa-cache-v1";

// List all assets you want to pre-cache
const urlsToCache = [
  "/",
  "/index.html",
  "/simple",
  "/app.vue",
  "/manifest.json",
  "/favicon.ico",
  "/assets/css/main.css",
  "/assets/img/icons/Square44x44Logo.altform-lightunplated_targetsize-256.png",
  "/assets/img/icons/icon-512x512.png",
  "/assets/fonts/inter-var-latin.woff2",
  "/assets/fonts/dm-sans-var-latin.woff2",
  "/assets/fonts/domine.woff2",
  "/fonts/inter-var-latin.woff2",
  "/fonts/dm-sans-var-latin.woff2",
  "/fonts/domine.woff2",
  "/lib/tailwind.css",
  "/lib/lucide-vue-next.umd.js",
  "/lib/lucide-vue-next.umd.css",
  "/components/ui/**/*.{js,css}",
  "/stores/**/*.{js,ts}",
  "/utils/**/*.{js,ts}",
  "/assets/**/*.{js,css,svg,png,json}",
  "/components/**/*.{js,css,svg,png,json}",
  "/pages/**/*.{js,ts,vue}",
  "/app.vue",
  "/nuxt.config.{js,ts}",
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
