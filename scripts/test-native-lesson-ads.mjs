#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "mobile", "web", "native_ads.js"), "utf8");

function createHarness({ native = true } = {}) {
  const state = {
    phaseOneCompleted: [],
    vocabLessonCompleted: [],
    sentencesProgress: { completedLessons: [] },
  };
  const validAlphabetIds = new Set(["alphabet-1", "alphabet-2", "alphabet-3"]);
  const calls = [];
  const rafQueue = [];
  const documentListeners = new Map();
  let observerCallback = null;
  let observerCount = 0;

  const plugin = {
    async getStatus() { return { privacyOptionsRequired: false }; },
    addListener() {},
    async lessonCompleted(payload) { calls.push(payload); return { shown: false }; },
  };
  const document = {
    readyState: "complete",
    visibilityState: "visible",
    documentElement: {},
    getElementById() { return null; },
    addEventListener(type, callback) { documentListeners.set(type, callback); },
  };
  class MutationObserver {
    constructor(callback) {
      observerCount += 1;
      observerCallback = callback;
    }
    observe() {}
  }
  const context = {
    console,
    document,
    MutationObserver,
    requestAnimationFrame(callback) { rafQueue.push(callback); },
    state,
    getAlphabetProgress() {
      return { completedIds: state.phaseOneCompleted.filter((id) => validAlphabetIds.has(id)) };
    },
    getSentencesProgress() { return state.sentencesProgress; },
    window: {
      Capacitor: {
        isNativePlatform: () => native,
        Plugins: { HanaPathAds: plugin },
      },
      addEventListener() {},
    },
  };
  vm.runInNewContext(source, context, { filename: "mobile/web/native_ads.js" });

  async function flushFrames() {
    while (rafQueue.length) rafQueue.shift()();
    await Promise.resolve();
    await Promise.resolve();
  }

  return {
    calls,
    document,
    documentListeners,
    get observerCount() { return observerCount; },
    state,
    async arm() { await flushFrames(); },
    async mutate() {
      assert.equal(typeof observerCallback, "function", "native completion observer was not armed");
      observerCallback();
      await flushFrames();
    },
  };
}

{
  const h = createHarness({ native: false });
  assert.equal(h.observerCount, 0, "hosted PWA must not initialize the native ad observer");
  assert.deepEqual(h.calls, []);
}

{
  const h = createHarness();
  h.state.vocabLessonCompleted.push("restored-word");
  await h.arm();
  await h.mutate();
  assert.deepEqual(h.calls, [], "startup/restored completion must become baseline, not an ad trigger");
}

{
  const h = createHarness();
  await h.arm();
  await h.mutate();
  await h.mutate();
  assert.deepEqual(h.calls, [], "ordinary navigation/DOM changes must not request an ad");

  h.state.phaseOneCompleted.push("invalid-migrated-id");
  await h.mutate();
  assert.deepEqual(h.calls, [], "raw invalid Alphabet state must not bypass getAlphabetProgress()");

  h.state.phaseOneCompleted.push("alphabet-1");
  await h.mutate();
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].subject, "alphabet");
  assert.equal(h.calls[0].lessonId, "alphabet-1");

  await h.mutate();
  assert.equal(h.calls.length, 1, "a replay without new completion progress must not request an ad");

  h.state.vocabLessonCompleted.push("words-1");
  await h.mutate();
  h.state.sentencesProgress.completedLessons.push("sentences-1");
  await h.mutate();
  assert.deepEqual(h.calls.map(({ subject }) => subject), ["alphabet", "words", "sentences"]);
}

{
  const h = createHarness();
  await h.arm();
  h.state.vocabLessonCompleted.push("bulk-1", "bulk-2");
  await h.mutate();
  assert.deepEqual(h.calls, [], "bulk migration/test progress must not request an ad");
}

{
  const h = createHarness();
  await h.arm();
  h.document.visibilityState = "hidden";
  h.state.vocabLessonCompleted.push("hidden-completion");
  await h.mutate();
  assert.deepEqual(h.calls, [], "hidden completion must not request an ad");

  h.document.visibilityState = "visible";
  h.documentListeners.get("visibilitychange")();
  await h.mutate();
  assert.deepEqual(h.calls, [], "hidden completion must not queue an ad for resume");
}

console.log("Native lesson-ad trigger tests passed: native-only, startup/navigation/replay/bulk/hidden safe, all lesson families covered.");
