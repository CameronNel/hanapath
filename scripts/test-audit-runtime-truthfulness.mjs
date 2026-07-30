#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const source = readFileSync(join(root, "audit_runtime_truthfulness.js"), "utf8");
const index = readFileSync(join(root, "index.html"), "utf8");
const sw = readFileSync(join(root, "sw.js"), "utf8");

const window = { location: { href: "https://example.test/" }, dispatchEvent() {} };
const context = {
  window,
  console,
  Math,
  Number,
  String,
  Object,
  Array,
  setInterval: () => 1,
  clearInterval: () => {},
  performance: { now: () => 1000 },
  escapeHtml: (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;"),
  scoreSpeechAttempt: () => ({ segmental: 82, prosodic: 67, target: "가", heard: "가" }),
  speakingScoreHtml: () => "old labels",
  wordBankDetailHtml: () => '<div class="speaking-practice-area"><button class="button secondary compact" type="button" onclick="handleSpeakingPractice(this)">🎤 Practice Speaking (Beta)</button></div>',
  buildVocabMetricsView: () => `
    <div>Assessment & analytics</div>
    <div>Review events persist per item, and the dashboard tracks mastery, latency, and retention windows.</div>
    <span>72% mastery</span><span>Mastery</span><span>Mastered words</span>
    <span>1-week retention</span><span>1-month retention</span><span>Confidence</span>
    <span> · conf 80%</span><span>Lowest mastery items bubble to the top.</span>
    <span>1-week sample: 1 · 1-month sample: 1</span>
  `,
  URL,
};
window.window = window;
vm.createContext(context);
vm.runInContext(source, context, { filename: "audit_runtime_truthfulness.js" });

const score = context.scoreSpeechAttempt("가", "가", 1000);
assert.equal(score.transcriptMatch, 82);
assert.equal(score.speakingTimeFit, 67);
assert.equal(score.measurementKind, "transcript-and-duration-proxy");

const speech = context.speakingScoreHtml("가", "가", score);
assert.match(speech, /Transcript match:/);
assert.match(speech, /Speaking-time estimate:/);
assert.match(speech, /not phonetic or prosodic analysis/);
assert.doesNotMatch(speech, /Segmental accuracy/);
assert.doesNotMatch(speech, /Prosodic fluency/);

const detail = context.wordBankDetailHtml({});
assert.match(detail, /speech-recognition service/);
assert.ok(detail.indexOf("speech-recognition service") < detail.indexOf("Practice Speaking"), "disclosure must appear before microphone action");

const metrics = context.buildVocabMetricsView();
assert.match(metrics, /Practice history & estimates/);
assert.match(metrics, /uncalibrated study aids/);
assert.match(metrics, /practice score/);
assert.match(metrics, /7-day recall proxy/);
assert.match(metrics, /30-day recall proxy/);
assert.match(metrics, /Speed-based ease estimate/);
assert.doesNotMatch(metrics, />Mastery</);
assert.doesNotMatch(metrics, />1-week retention</);
assert.doesNotMatch(metrics, />Confidence</);

assert.match(index, /audit_runtime_truthfulness\.js\?v=20260730a/);
assert.match(sw, /audit_runtime_truthfulness\.js\?v=20260730a/);
assert.doesNotMatch(source, /Segmental accuracy:/);
assert.doesNotMatch(source, /Prosodic fluency:/);

console.log("Truthful speech and heuristic analytics labels passed.");
