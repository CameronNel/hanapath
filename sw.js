// [2026-07-30] State-safety delivery and bounded HanaPath cache ownership.
const CACHE_NAME = "hanapath-shell-v456";
const RUNTIME_CACHE_NAME = "hanapath-runtime-v1";
const CACHE_PREFIX = "hanapath-";
const AUDIO_RUNTIME_CACHE_LIMIT = 256;
const NON_AUDIO_RUNTIME_CACHE_LIMIT = 128;
const NAVIGATION_TIMEOUT_MS = 5000;
const AUDIO_RUNTIME_PATH_PREFIX = new URL("./audio/", self.registration.scope).pathname;

const APP_SHELL = [
  "./",
  "./index.html",
  "./fonts/fonts.css?v=20260716a",
  "./styles.css?v=20260729a",
  "./sentence_exam_runner.css?v=20260729b",
  "./lib/hangul.js",
  "./audio_map.js?v=20260727b",
  "./words_curated_core.js?v=20260705e",
  "./words_inflect.js?v=20260703c",
  "./words_lesson_plan.js?v=20260722f",
  "./raw_word_meanings.js?v=20260703b",
  "./sentences_core.js?v=20260717u",
  "./sentences_lesson_plan.js?v=20260717u",
  "./sentence_lesson_contrast_ui.js?v=20260726a",
  "./sentence_lesson_contrasts_sections_1_4.js?v=20260726a",
  "./sentence_lesson_contrasts_sections_5_8.js?v=20260726b",
  "./sentence_exam_eligibility_shard_a.js?v=20260725a",
  "./sentence_exam_eligibility_shard_b.js?v=20260725a",
  "./sentence_exam_eligibility_shard_c.js?v=20260725a",
  "./sentence_exam_eligibility_shard_d.js?v=20260725a",
  "./sentence_exam_eligibility.js?v=20260725a",
  "./sentence_exam_prompt_templates.js?v=20260729a",
  "./sentence_exam_curated_bank.js?v=20260729a",
  "./sentence_exam_curated_bank_freeze.js?v=20260729a",
  "./sentence_exam_grader.js?v=20260729a",
  "./sentence_exam_blueprints.js?v=20260729a",
  "./sentence_exam_engine.js?v=20260729a",
  "./sentence_exam_runner_core.js?v=20260729c",
  "./lib/hangul_q_recognizer.js?v=20260715b",
  "./hangul_strokes.js?v=20260715b",
  "./hangul_mastery_exam.js?v=20260720a",
  "./word_exam_blueprints.js?v=20260723a",
  "./word_exam_engine.js?v=20260723a",
  "./exam_integrity.js?v=20260721b",
  "./form_check_blueprints.js?v=20260723a",
  "./sentence_feedback.js?v=20260730b",
  "./app.js?v=20260729d",
  "./exam_integrity_hardening.js?v=20260730a",
  "./audit_runtime_truthfulness.js?v=20260730a",
  "./sentence_exam_fairness.js?v=20260730a",
  "./sentence_exam_runner.js?v=20260729c",
  "./alphabet_skill_srs.js?v=20260730a",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

async function trimCache(cache, predicate, limit) {
  const matches = (await cache.keys()).filter(predicate);
  const excess = matches.length - limit;
  for (const request of matches.slice(0, Math.max(0, excess))) await cache.delete(request);
}

async function cleanupShellCache() {
  const cache = await caches.open(CACHE_NAME);
  const allowed = new Set(APP_SHELL.map((asset) => new URL(asset, self.registration.scope).href));
  for (const request of await cache.keys()) {
    if (!allowed.has(request.url)) await cache.delete(request);
  }
}

async function cacheRuntimeResponse(request, response, requestUrl) {
  if (!response || response.status !== 200 || response.type !== "basic") return;
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  await cache.put(request, response);
  const isAudio = requestUrl.pathname.startsWith(AUDIO_RUNTIME_PATH_PREFIX);
  await trimCache(
    cache,
    (cachedRequest) => {
      const path = new URL(cachedRequest.url).pathname;
      return isAudio
        ? path.startsWith(AUDIO_RUNTIME_PATH_PREFIX)
        : !path.startsWith(AUDIO_RUNTIME_PATH_PREFIX);
    },
    isAudio ? AUDIO_RUNTIME_CACHE_LIMIT : NON_AUDIO_RUNTIME_CACHE_LIMIT,
  );
}

async function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetchWithTimeout(request, NAVIGATION_TIMEOUT_MS);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put("./index.html", response.clone());
    }
    return response;
  } catch {
    const cache = await caches.open(CACHE_NAME);
    return (await cache.match("./index.html")) || Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => (
        key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME && key !== RUNTIME_CACHE_NAME
          ? caches.delete(key)
          : null
      ))))
      .then(() => cleanupShellCache())
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(event.request));
    return;
  }

  event.respondWith((async () => {
    const shell = await caches.open(CACHE_NAME);
    const shellMatch = await shell.match(event.request);
    if (shellMatch) return shellMatch;

    const runtime = await caches.open(RUNTIME_CACHE_NAME);
    const runtimeMatch = await runtime.match(event.request);
    if (runtimeMatch) return runtimeMatch;

    const response = await fetch(event.request);
    if (response && response.status === 200 && response.type === "basic") {
      event.waitUntil(cacheRuntimeResponse(event.request, response.clone(), requestUrl));
    }
    return response;
  })());
});
