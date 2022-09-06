importScripts("assets/lib/cache-polyfill.js");

let CACHE_VERSION = "app-v0.00";
// give all files path you want to work offline
let CACHE_FILES = [
  "./",
  "index.html",
  "assets/src/themes/default.css",
  "assets/src/themes/blue.css",
  "assets/src/themes/dark.css",
  "assets/src/themes/green.css",
  "assets/src/themes/orange.css",
  "assets/src/themes/purple.css",
  "assets/src/js/jquery.js",
  "assets/src/js/index.js",
  "assets/src/js/app.js",
  "assets/lib/cache-polyfill.js",
  "assets/src/images/icons/favicon.png",
  "assets/src/images/icons/icon_256.png",
  "assets/src/images/icons/icon_512.png",
  "assets/src/images/bg1.jpg",
  "assets/src/images/waves.jpg",
  "assets/src/images/phone1.png",
  "assets/src/images/screenshots/screenshot1.PNG",
  "assets/src/images/screenshots/screenshot2.PNG",
  "assets/src/images/screenshots/screenshot3.PNG",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener("fetch", function (event) {
  let online = navigator.onLine;
  if (!online) {
    event.respondWith(
      caches.match(event.request).then(function (res) {
        if (res) {
          return res;
        }
      })
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return prompt.all(
        keys.map(function (keys, i) {
          if (keys !== CACHE_VERSION) {
            return caches.delete(keys[i]);
          }
        })
      );
    })
  );
});
