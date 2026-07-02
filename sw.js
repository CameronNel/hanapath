// [2026-07-02] Cache bumped to v102: Words detail romanization patch now adds
// sentence romanization plus explicit form and sound notes on top of the
// curated word bank + lesson plan data files, Entire Word Bank reference,
// word SRS, and guided word lessons.
const CACHE_NAME = "hanapath-shell-v102";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260702a",
  "./lib/hangul.js",
  "./audio_map.js",
  "./words_curated_core.js?v=20260702a",
  "./words_lesson_plan.js?v=20260702a",
  "./app.js?v=20260702a",
  "./words_sentence_romanization_patch.js?v=20260702c",
  "./alphabet_skill_srs.js?v=20260630a",
  "./manifest.webmanifest",
  "./korean_5000_claude_ready.csv",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        }),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match("./index.html");
        return cached || Response.error();
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    }),
  );
});
