#!/usr/bin/env node
// Audit Phase One and permanent Drill Lab alphabet audio coverage.
//
// Collects the Korean strings the app will try to speak during the alphabet
// path — every `voiceText` sequence in phaseOneLessons, the per-letter
// tap-to-hear syllables from HANGUL_JAMO_SPEAK, and the Drill Lab's canonical
// whole-word / closing-sound samples — normalizes them the same way speak()
// does (trim + NFC), and checks both map coverage and local file existence.
//
// Usage: node scripts/audit-alphabet-audio.mjs [--strict]
//   --strict exits non-zero if any required token lacks a non-empty local file.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

const norm = (s) => String(s || "").trim().normalize("NFC");

// `No sound` is deliberately represented by a real Ogg silence clip. It is
// documented here so nobody reintroduces the old zero-byte exception; even a
// silent/non-speech key must point to a non-empty audio container.
const DOCUMENTED_SILENT_KEYS = new Set(["No sound"]);

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

  // 3. Drill Lab whole-word samples and isolated closing-sound anchors.
  for (const objectName of ["BATCHIM_GROUP_SOUND_SPEAK", "BATCHIM_GROUP_WORD_SAMPLE"]) {
    const block = appSrc.match(new RegExp(`const ${objectName} = \\{[\\s\\S]*?\\n\\};`));
    if (!block) continue;
    for (const m of block[0].matchAll(/:\s*("(?:\\.|[^"\\])*")/g)) {
      const t = norm(JSON.parse(m[1]));
      if (t) tokens.add(t);
    }
  }

  return [...tokens];
}

// ── Run ─────────────────────────────────────────────────────────────────────
const strict = process.argv.includes("--strict");
const audioMap = loadAudioMap();

// Index map keys by NFC form (mirrors lookupAudioUrl in app.js).
const normalizedEntries = new Map(Object.entries(audioMap).map(([key, value]) => [norm(key), value]));
const normalizedKeys = new Set(normalizedEntries.keys());
const nonNormalizedKeys = Object.keys(audioMap).filter((k) => k !== norm(k));

const required = collectRequired();
const present = required.filter((t) => normalizedKeys.has(t));
const missing = required.filter((t) => !normalizedKeys.has(t));
const invalidAssets = present.map((token) => {
  const assetPath = normalizedEntries.get(token);
  if (typeof assetPath !== "string" || !assetPath.startsWith("./audio/")) {
    return { token, assetPath, reason: "invalid mapped path" };
  }
  const filePath = path.resolve(ROOT, assetPath.slice(2));
  const audioRoot = path.resolve(ROOT, "audio");
  const rel = path.relative(audioRoot, filePath);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) {
    return { token, assetPath, reason: "mapped path escapes audio/" };
  }
  if (!fs.existsSync(filePath)) return { token, assetPath, reason: "mapped file is missing" };
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return { token, assetPath, reason: "mapped path is not a file" };
  if (stat.size === 0) return { token, assetPath, reason: "mapped file is zero-byte" };
  return null;
}).filter(Boolean);

console.log("Alphabet audio audit");
console.log("====================");
console.log(`audio_map.js keys : ${Object.keys(audioMap).length}`);
console.log(`required tokens   : ${required.length}`);
console.log(`present           : ${present.length}`);
console.log(`missing           : ${missing.length}`);
console.log(`invalid files     : ${invalidAssets.length}`);
console.log(`documented silent : ${DOCUMENTED_SILENT_KEYS.size}`);
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
if (invalidAssets.length) {
  console.log("\nMapped audio with missing, empty, or invalid local files:");
  for (const issue of invalidAssets) {
    console.log(`  - ${JSON.stringify(issue.token)}: ${issue.reason} (${JSON.stringify(issue.assetPath)})`);
  }
}

const failed = missing.length || invalidAssets.length;
console.log(failed ? "\nResult: alphabet audio gaps found (see above)." : "\nResult: all required alphabet and Drill Lab audio is present.");
process.exit(strict && failed ? 1 : 0);
