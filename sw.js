// [2026-07-03] Cache bumped to v138: TEST_UNLOCK_ALL_STAGES now truly unlocks
// every Words lesson (isWordLessonUnlocked + the "Finish Hangul first" banner
// previously ignored the flag for two of their three gates) — OWNER TEST
// OVERRIDE, flip TEST_UNLOCK_ALL_STAGES back to false in app.js when done.
const CACHE_NAME = "hanapath-shell-v138";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260703a",
  "./lib/hangul.js",
  "./audio_map.js?v=20260703d",
  "./words_curated_core.js?v=20260703z",
  "./words_inflect.js?v=20260703b",
  "./words_lesson_plan.js?v=20260703h",
  "./raw_word_meanings.js?v=20260703a",
  "./app.js?v=20260703p",
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
