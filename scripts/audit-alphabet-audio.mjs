#!/usr/bin/env node
// Audit Phase One (alphabet) audio coverage.
//
// Collects the Korean strings the app will try to speak during the alphabet
// path — every `voiceText` sequence in phaseOneLessons, plus the per-letter
// tap-to-hear syllables from HANGUL_JAMO_SPEAK — normalizes them the same way
// speak() now does (trim + NFC), and checks them against the keys in
// audio_map.js. Reports required / present / missing tokens, and flags any
// AUDIO_MAP keys that are not already NFC-normalized (the ones the normalizer
// now rescues at runtime).
//
// Usage: node scripts/audit-alphabet-audio.mjs [--strict]
//   --strict exits non-zero if any required token is missing.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

const norm = (s) => String(s || "").trim().normalize("NFC");

// ── Load AUDIO_MAP from audio_map.js (it assigns window.AUDIO_MAP) ──────────
function loadAudioMap() {
  const src = fs.readFileSync(path.join(ROOT, "audio_map.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.AUDIO_MAP || {};
}

// ── Collect required Phase One tokens ───────────────────────────────────────
function sliceBlock(src, startMarker) {
  const start = src.indexOf(startMarker);
  if (start < 0) throw new Error("could not find " + startMarker);
  const end = src.indexOf("\n];", start);
  if (end < 0) throw new Error("could not find end of " + startMarker);
  return src.slice(start, end);
}

function collectRequired() {
  const tokens = new Set();

  // 1. voiceText sequences inside phaseOneLessons (comma-split, like the app).
  const phaseOne = sliceBlock(appSrc, "const phaseOneLessons = [");
  for (const m of phaseOne.matchAll(/voiceText:\s*"([^"]*)"/g)) {
    for (const chunk of m[1].split(",")) {
      const t = norm(chunk);
      if (t) tokens.add(t);
    }
  }

  // 2. Per-letter tap-to-hear syllables (HANGUL_JAMO_SPEAK values).
  const jamoBlock = appSrc.match(/const HANGUL_JAMO_SPEAK = \{[\s\S]*?\n\};/);
  if (jamoBlock) {
    for (const m of jamoBlock[0].matchAll(/:\s*"([^"]+)"/g)) {
      const t = norm(m[1]);
      if (t) tokens.add(t);
    }
  }

  return [...tokens];
}

// ── Run ─────────────────────────────────────────────────────────────────────
const strict = process.argv.includes("--strict");
const audioMap = loadAudioMap();

// Index map keys by NFC form (mirrors lookupAudioUrl in app.js).
const normalizedKeys = new Set(Object.keys(audioMap).map(norm));
const nonNormalizedKeys = Object.keys(audioMap).filter((k) => k !== norm(k));

const required = collectRequired();
const present = required.filter((t) => normalizedKeys.has(t));
const missing = required.filter((t) => !normalizedKeys.has(t));

console.log("Phase One alphabet audio audit");
console.log("==============================");
console.log(`audio_map.js keys : ${Object.keys(audioMap).length}`);
console.log(`required tokens   : ${required.length}`);
console.log(`present           : ${present.length}`);
console.log(`missing           : ${missing.length}`);
console.log(`non-NFC map keys  : ${nonNormalizedKeys.length} (rescued by normalizeAudioKey at runtime)`);

if (missing.length) {
  console.log("\nMissing audio (falls back to browser TTS):");
  for (const t of missing) console.log("  - " + JSON.stringify(t));
}
if (nonNormalizedKeys.length) {
  console.log("\nNon-NFC keys in audio_map.js (consider re-normalizing the source):");
  for (const k of nonNormalizedKeys.slice(0, 50)) console.log("  - " + JSON.stringify(k));
  if (nonNormalizedKeys.length > 50) console.log(`  …and ${nonNormalizedKeys.length - 50} more`);
}

console.log(missing.length ? "\nResult: gaps found (see above)." : "\nResult: all required Phase One audio present.");
process.exit(strict && missing.length ? 1 : 0);
