import assert from "node:assert/strict";
import { buildAudioReport, extractSpokenKeys } from "./extract_audio_keys.mjs";

const words = [{
  id: "w_test",
  korean: "가다",
  voiceText: "가다",
  exampleKo: "집에 가요.",
  exampleVoiceText: "집에 가요.",
  forms: { polite: "가요", past: "갔어요" }
}];

const keys = extractSpokenKeys(words);
assert.deepEqual(keys.map((key) => key.kind), ["word", "form", "form", "example"]);
assert.equal(keys[0].text, "가다");
assert.equal(keys[1].text, "가요");
const report = buildAudioReport(words, { "가다": "audio/ga.ogg", "가요": "audio/gayo.ogg" });
assert.equal(report.keyCount, 4);
assert.equal(report.missingKeyCount, 2);
assert.deepEqual(report.missing.map((key) => key.text), ["갔어요", "집에 가요."]);
console.log("Audio extraction tests passed.");
