// [2026-07-09] Cache bumped to v288: persist guided Words lesson sessions safely across reloads.
const CACHE_NAME = "hanapath-shell-v296";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260709g",
  "./lib/hangul.js",
  "./audio_map.js?v=20260709g",
  "./words_curated_core.js?v=20260705e",
  "./words_inflect.js?v=20260703c",
  "./words_lesson_plan.js?v=20260709f",
  "./raw_word_meanings.js?v=20260703b",
  "./sentences_core.js?v=20260707i",
  "./sentences_lesson_plan.js?v=20260707b",
  "./app.js?v=20260709y",
  "./alphabet_skill_srs.js?v=20260630b",
  "./manifest.webmanifest",
  "./korean_5000_claude_ready.csv",
  "./korean_supplementary_15k.csv",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./audio/sound_effects/correct/correct_1.wav",
  "./audio/sound_effects/correct/correct_2.wav",
  "./audio/sound_effects/correct/correct_3.wav",
  "./audio/sound_effects/correct/correct_4.wav",
  "./audio/sound_effects/correct/correct_5.wav",
  "./audio/sound_effects/correct/correct_6.wav",
  "./audio/sound_effects/correct/correct_7.wav",
  "./audio/sound_effects/correct/correct_8.wav",
  "./audio/sound_effects/correct/correct_9.wav",
  "./audio/sound_effects/correct/correct_10.wav",
  "./audio/sound_effects/correct/correct_11.wav",
  "./audio/sound_effects/correct/correct_12.wav",
  "./audio/sound_effects/correct/correct_13.wav",
  "./audio/sound_effects/correct/correct_14.wav",
  "./audio/sound_effects/correct/correct_15.wav",
  "./audio/sound_effects/correct/correct_16.wav",
  "./audio/sound_effects/correct/correct_17.wav",
  "./audio/sound_effects/correct/correct_18.wav",
  "./audio/sound_effects/correct/correct_19.wav",
  "./audio/sound_effects/correct/correct_20.wav",
  "./audio/sound_effects/incorrect/incorrect_1.wav",
  "./audio/sound_effects/incorrect/incorrect_2.wav",
  "./audio/sound_effects/incorrect/incorrect_3.wav",
  "./audio/sound_effects/incorrect/incorrect_4.wav",
  "./audio/sound_effects/incorrect/incorrect_5.wav",
  "./audio/sound_effects/incorrect/incorrect_6.wav",
  "./audio/sound_effects/incorrect/incorrect_7.wav",
  "./audio/sound_effects/incorrect/incorrect_8.wav",
  "./audio/sound_effects/incorrect/incorrect_9.wav",
  "./audio/sound_effects/incorrect/incorrect_10.wav",
  "./audio/sound_effects/incorrect/incorrect_11.wav",
  "./audio/sound_effects/incorrect/incorrect_12.wav",
  "./audio/sound_effects/incorrect/incorrect_13.wav",
  "./audio/sound_effects/incorrect/incorrect_14.wav",
  "./audio/sound_effects/incorrect/incorrect_15.wav",
  "./audio/sound_effects/incorrect/incorrect_16.wav",
  "./audio/sound_effects/incorrect/incorrect_17.wav",
  "./audio/sound_effects/incorrect/incorrect_18.wav",
  "./audio/sound_effects/incorrect/incorrect_19.wav",
  "./audio/sound_effects/incorrect/incorrect_20.wav",
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
