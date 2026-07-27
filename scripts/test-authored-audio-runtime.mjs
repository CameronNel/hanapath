#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playedUrls = [];
let fallbackSpeakCount = 0;

class TestAudio {
  constructor(url) {
    this.url = url;
    this.currentTime = 0;
    playedUrls.push(url);
  }
  play() {
    queueMicrotask(() => this.onended?.());
    return Promise.resolve();
  }
  pause() {
    this.onpause?.();
  }
}

function createSandbox() {
  const window = {};
  const document = {
    addEventListener() {},
    getElementById() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
  };
  const storage = { getItem() { return null; }, setItem() {}, removeItem() {} };
  const speechSynthesis = {
    cancel() {},
    getVoices() { return []; },
    speak(utterance) {
      fallbackSpeakCount += 1;
      queueMicrotask(() => utterance.onend?.());
    },
  };
  function SpeechSynthesisUtterance(text) { this.text = text; }
  const sandbox = {
    window, document, console, Map, Set, Date, Math, JSON, Array, Object, String, Number, Boolean, RegExp, Intl,
    URL, URLSearchParams, location: { search: "", pathname: "/", hash: "" },
    history: { replaceState() {}, pushState() {} }, navigator: { userAgent: "node" },
    localStorage: storage, sessionStorage: storage, Audio: TestAudio, SpeechSynthesisUtterance,
    setTimeout, clearTimeout, setInterval, clearInterval, queueMicrotask,
    requestAnimationFrame(callback) { return setTimeout(callback, 0); }, cancelAnimationFrame: clearTimeout,
    fetch: async () => ({ ok: false }),
  };
  sandbox.globalThis = sandbox;
  sandbox.self = window;
  Object.assign(window, {
    window, document, location: sandbox.location, history: sandbox.history, navigator: sandbox.navigator,
    localStorage: storage, sessionStorage: storage, Audio: TestAudio, SpeechSynthesisUtterance,
    speechSynthesis, setTimeout, clearTimeout, setInterval, clearInterval,
    requestAnimationFrame: sandbox.requestAnimationFrame, cancelAnimationFrame: sandbox.cancelAnimationFrame,
  });
  vm.createContext(sandbox);
  return sandbox;
}

const files = [
  "audio_map.js", "words_curated_core.js", "words_inflect.js", "words_lesson_plan.js",
  "raw_word_meanings.js", "sentences_core.js", "sentences_lesson_plan.js",
  "sentence_lesson_contrast_ui.js", "sentence_lesson_contrasts_sections_1_4.js",
  "sentence_lesson_contrasts_sections_5_8.js", "sentence_exam_eligibility_shard_a.js",
  "sentence_exam_eligibility_shard_b.js", "sentence_exam_eligibility_shard_c.js",
  "sentence_exam_eligibility_shard_d.js", "sentence_exam_eligibility.js", "hangul_strokes.js",
  "hangul_mastery_exam.js", "word_exam_blueprints.js", "word_exam_engine.js", "exam_integrity.js",
  "form_check_blueprints.js", "sentence_exam_prompt_templates.js", "sentence_exam_curated_bank.js",
  "sentence_exam_curated_bank_freeze.js", "sentence_exam_grader.js", "sentence_feedback.js", "app.js",
];
const sandbox = createSandbox();
for (const filename of files) {
  const filePath = path.join(ROOT, filename);
  if (fs.existsSync(filePath)) vm.runInContext(fs.readFileSync(filePath, "utf8"), sandbox, { filename });
}

const targets = ["계시세요", "드시세요", "주무시세요", "안 가요", "가지 않아요", "열었어요"];
for (const target of targets) {
  const before = playedUrls.length;
  await vm.runInContext(`speak(${JSON.stringify(target)})`, sandbox);
  assert.equal(playedUrls.length, before + 1, `${target}: app did not instantiate mapped Audio`);
  const mapped = sandbox.window.AUDIO_MAP[target];
  assert.equal(playedUrls.at(-1), mapped, `${target}: app did not use the exact AUDIO_MAP URL`);
  const asset = path.resolve(ROOT, mapped.replace(/^\.\//, ""));
  assert.ok(fs.existsSync(asset) && fs.statSync(asset).size > 0, `${target}: mapped asset is missing or empty`);
}
assert.equal(fallbackSpeakCount, 0, "mapped authored targets fell back to browser speech synthesis");
console.log(`Authored audio runtime passed: ${targets.length} mapped targets, zero TTS fallbacks.`);
