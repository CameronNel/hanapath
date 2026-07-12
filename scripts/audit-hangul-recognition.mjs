#!/usr/bin/env node
// Deterministic mobile-ink stress audit for HanaPath's offline Hangul recognizer.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
globalThis.window = globalThis;
await import(pathToFileURL(path.join(ROOT, "hangul_strokes.js")).href);
await import(pathToFileURL(path.join(ROOT, "lib", "hangul_q_recognizer.js")).href);

const bank = globalThis.HANGUL_STROKES;
const API = globalThis.HANAPATH_HANGUL_RECOGNIZER;
if (!bank || !API?.Recognizer) throw new Error("Writing data or recognizer global did not load.");

const hieutTop = bank["ㅎ"]?.strokes?.[0];
if (
  !Array.isArray(hieutTop) ||
  hieutTop.length < 2 ||
  Math.abs(hieutTop[0][0] - hieutTop[hieutTop.length - 1][0]) > 0.02 ||
  hieutTop[hieutTop.length - 1][1] <= hieutTop[0][1]
) {
  throw new Error("ㅎ must use the learner-facing upright top-mark variant.");
}

const recognizer = new API.Recognizer();
for (const [glyph, guide] of Object.entries(bank)) {
  if (!recognizer.add(glyph, guide.strokes, { augment: true })) throw new Error(`Could not add template ${glyph}`);
}

let seed = 0x71ab5eed;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000;
}

function interpolate(stroke, pointsPerSegment = 9) {
  const out = [];
  for (let i = 1; i < stroke.length; i += 1) {
    const a = stroke[i - 1];
    const b = stroke[i];
    for (let step = i === 1 ? 0 : 1; step <= pointsPerSegment; step += 1) {
      const t = step / pointsPerSegment;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out.length ? out : stroke.map((point) => point.slice());
}

function mobileVariant(strokes, index) {
  const sx = 0.78 + random() * 0.42;
  const sy = 0.78 + random() * 0.42;
  const slant = (random() - 0.5) * 0.16;
  const tx = (random() - 0.5) * 0.45;
  const ty = (random() - 0.5) * 0.45;
  let transformed = strokes.map((stroke) => interpolate(stroke).map(([x, y]) => [
    x * sx + (y - 0.5) * slant + tx + (random() - 0.5) * 0.012,
    y * sy + ty + (random() - 0.5) * 0.012,
  ]));
  // $Q deliberately recognizes articulation independent of direction/order.
  if (index % 3 === 1) transformed = transformed.map((stroke) => stroke.slice().reverse());
  if (index % 3 === 2) transformed = transformed.slice().reverse();
  return transformed;
}

const failures = [];
let cases = 0;
let minimumConfidence = 1;
for (const [glyph, guide] of Object.entries(bank)) {
  for (let variant = 0; variant < 12; variant += 1) {
    const matches = recognizer.recognize(mobileVariant(guide.strokes, variant), 3);
    cases += 1;
    const rank = matches.findIndex((match) => match.name === glyph);
    if (rank !== 0) failures.push({ glyph, variant, matches: matches.map((match) => match.name).join(" ") });
    if (matches[0]?.name === glyph) minimumConfidence = Math.min(minimumConfidence, matches[0].confidence);
  }
}

console.log("Hangul recognition audit");
console.log("========================");
console.log(`algorithm          : ${API.algorithm}`);
console.log(`templates          : ${Object.keys(bank).length}`);
console.log(`mobile ink cases   : ${cases}`);
console.log(`top-1 failures     : ${failures.length}`);
console.log(`minimum confidence : ${minimumConfidence.toFixed(3)}`);

if (failures.length) {
  console.log("\nFirst failures:");
  failures.slice(0, 20).forEach((failure) => console.log(`  ${failure.glyph} variant ${failure.variant}: ${failure.matches}`));
  process.exit(1);
}

console.log("\nResult: all deterministic finger-style variants recognized correctly.");
