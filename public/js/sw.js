const cacheName = "my-pwa-cache-v2";

// List all assets you want to pre-cache
const contentToCache = [
  "/",
  "/_nuxt/",
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
  "/ProductImages/1020.png",
  "/ProductImages/1022.png",
  "/ProductImages/1024.png",
  "/ProductImages/1026.png",
  "/ProductImages/1027.png",
  "/ProductImages/1028.png",
  "/ProductImages/1031.png",
  "/ProductImages/1039.png",
  "/ProductImages/1046.png",
  "/ProductImages/1059.png",
  "/ProductImages/1068.png",
  "/ProductImages/1076.png",
  "/ProductImages/1083.png",
  "/ProductImages/1091.png",
  "/ProductImages/1099.png",
  "/ProductImages/1106.png",
  "/ProductImages/1128.png",
  "/ProductImages/1133.png",
  "/ProductImages/1138.png",
  "/ProductImages/1143.png",
  "/ProductImages/1147.png",
  "/ProductImages/1152.png",
  "/ProductImages/1157.png",
  "/ProductImages/1162.png",
  "/ProductImages/1172.png",
  "/ProductImages/1177.png",
  "/ProductImages/1182.png",
  "/ProductImages/1187.png",
  "/ProductImages/1228.png",
  "/ProductImages/2411.png",
  "/ProductImages/2413.png",
  "/ProductImages/2415.png",
  "/ProductImages/2417.png",
  "/ProductImages/2419.png",
  "/ProductImages/2421.png",
  "/ProductImages/2423.png",
  "/ProductImages/2425.png",
  "/ProductImages/2482.png",
  "/ProductImages/2486.png",
  "/ProductImages/2490.png",
  "/ProductImages/2493.png",
  "/ProductImages/2497.png",
  "/ProductImages/2505.png",
  "/ProductImages/2508.png",
  "/ProductImages/2511.png",
  "/ProductImages/2514.png",
  "/ProductImages/2517.jpg",
  "/ProductImages/2517.png",
  "/ProductImages/2520.png",
  "/ProductImages/2526.png",
  "/ProductImages/2530.png",
  "/ProductImages/2534.png",
  "/ProductImages/2538.png",
  "/ProductImages/2542.png",
  "/ProductImages/2546.png",
  "/ProductImages/2550.png",
  "/ProductImages/2553.png",
  "/ProductImages/2558.png",
  "/ProductImages/2872.png",
  "/ProductImages/2877.png",
  "/ProductImages/2882.png",
  "/ProductImages/2887.png",
  "/ProductImages/2892.png",
  "/ProductImages/2896.png",
  "/ProductImages/2901.png",
  "/ProductImages/2906.png",
  "/ProductImages/2911.png",
  "/ProductImages/2916.png",
  "/ProductImages/2921.png",
  "/ProductImages/2925.png",
  "/ProductImages/2930.png",
  "/ProductImages/2940.png",
  "/ProductImages/2950.png",
  "/ProductImages/2955.png",
  "/ProductImages/2965.png",
  "/ProductImages/4330.png",
  "/ProductImages/4331.png",
  "/ProductImages/4332.png",
  "/ProductImages/4350.png",
  "/ProductImages/4351.png",
  "/ProductImages/4420.png",
  "/ProductImages/694.png",
  "/ProductImages/749.png",
  "/ProductImages/751.png",
  "/ProductImages/752.png",
  "/ProductImages/753.png",
  "/ProductImages/754.png",
  "/ProductImages/883.png",
  "/ProductImages/929.png",
  "/ProductImages/930.png",
  "/ProductImages/931.png",
  "/ProductImages/932.png",
  "/ProductImages/933.png",
  "/ProductImages/934.png",
  "/ProductImages/962.png",
];

// Install Service Worker and Pre-cache All Assets
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});

// Serve from Cache First
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
// Optional: Clean up old caches during activation
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
