#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(join(root, "app.js"), "utf8");

assert.match(app, /const SPEECH_PRACTICE_DISCLOSURE = .*not phonetic or prosodic analysis/);
assert.match(app, /transcriptMatch: segmental/);
assert.match(app, /speakingTimeFit: prosodic/);
assert.match(app, /measurementKind: "transcript-and-duration-proxy"/);
assert.match(app, /Transcript match:/);
assert.match(app, /Speaking-time estimate:/);
assert.match(app, /Recognizer returned:/);
assert.doesNotMatch(app, /Segmental accuracy:|Prosodic fluency:|Speech scoring|Practice Speaking/);

const wordDetail = app.match(/function wordBankDetailHtml\(row\) \{([\s\S]*?)\n\}\n\nfunction [^(]+\(/)?.[1] || "";
assert.ok(wordDetail.includes("SPEECH_PRACTICE_DISCLOSURE"), "word detail must disclose the speech provider boundary");
assert.ok(
  wordDetail.indexOf("SPEECH_PRACTICE_DISCLOSURE") < wordDetail.indexOf("handleSpeakingPractice(this)"),
  "speech disclosure must appear before the transcript-practice action",
);

for (const label of [
  "Practice history & estimates",
  "uncalibrated study aids",
  "Practice score",
  "High practice scores",
  "7-day recall proxy",
  "30-day recall proxy",
  "Speed-based ease estimate",
  "Lowest heuristic practice scores",
]) assert.ok(app.includes(label), `missing truthful practice label: ${label}`);

for (const overclaim of [
  "Assessment & analytics",
  "Mastered words",
  "1-week retention",
  "1-month retention",
  "Lowest mastery items",
]) assert.ok(!app.includes(overclaim), `stale learner-facing overclaim remains: ${overclaim}`);

console.log("Truthful transcript-proxy and heuristic practice labels passed.");
