#!/usr/bin/env node
// Deterministic mobile-ink stress audit for HanaPath's offline Hangul recognizer.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
globalThis.window = globalThis;
await import(pathToFileURL(path.join(ROOT, "hangul_strokes.js")).href);
await import(pathToFileURL(path.join(ROOT, "lib", "hangul_q_recognizer.js")).href);

const bank = globalThis.HANGUL_STROKES;
const API = globalThis.HANAPATH_HANGUL_RECOGNIZER;
if (!bank || !API?.Recognizer) throw new Error("Writing data or recognizer global did not load.");

// Execute the composition implementation shipped in app.js without loading the
// entire browser application. The audit extracts the declarations verbatim so
// it cannot drift into a second, audit-only implementation of syllable layout.
const appSource = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const freeDrawingContractProblems = [];
const requireAppSource = (condition, problem) => {
  if (!condition) freeDrawingContractProblems.push(problem);
};
requireAppSource(
  appSource.includes('inputMode: "freehand"') && !appSource.includes("data-writing-mode"),
  "writing sessions are not locked to the single free-drawing mode",
);
requireAppSource(
  appSource.includes('check.addEventListener("click", () => checkHangulFreehandDrawing(canvas, glyph, unit))'),
  "the learner Check action does not use completed-shape recognition",
);
requireAppSource(
  appSource.includes("scheduleHangulFreehandAutoCheck(canvas, glyph, unit)")
    && !appSource.includes("validateLatestHangulGuidedStroke"),
  "drawing events can still enter the removed guided per-stroke grader",
);
requireAppSource(
  appSource.includes('id="writingLineWidth" type="range"')
    && appSource.includes("Number(state.writingLineWidth)"),
  "the persisted line-thickness setting is not wired to learner ink",
);
requireAppSource(
  appSource.includes("recognizeHangulWriting(canvas, getHangulWritingRecognitionGlyphs().length)")
    && appSource.includes("isHangulFreehandRecognitionMatch(matches, glyph, strokes)"),
  "completed syllables do not reach the target-aware component fallback",
);
requireAppSource(
  appSource.includes("async function recognizeHangulInkWithProvider")
    && appSource.includes('provider: "mlkit"')
    && appSource.includes('provider: "$q"'),
  "the M3 comparison does not use the shared provider boundary",
);
requireAppSource(
  appSource.includes("state.useMLKit !== true")
    && appSource.includes("$Q still grades this attempt"),
  "ML Kit diagnostics are not explicitly opt-in or may appear authoritative before device sign-off",
);

function scanJavaScript(source, start, stop) {
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1] || "";
    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (stop(char, index)) return index;
  }
  return -1;
}

function extractDeclaration(name) {
  const marker = new RegExp(`(?:^|\\n)(?:const|let|var)\\s+${name}\\s*=`, "m");
  const match = marker.exec(appSource);
  if (!match) throw new Error(`Could not extract declaration ${name} from app.js.`);
  const start = match.index + (match[0].startsWith("\n") ? 1 : 0);
  let depth = 0;
  const end = scanJavaScript(appSource, start, (char) => {
    if (char === "{" || char === "[" || char === "(") depth += 1;
    else if (char === "}" || char === "]" || char === ")") depth -= 1;
    return char === ";" && depth === 0;
  });
  if (end < 0) throw new Error(`Could not find the end of declaration ${name} in app.js.`);
  return appSource.slice(start, end + 1);
}

function extractFunction(name) {
  const marker = new RegExp(`(?:^|\\n)function\\s+${name}\\s*\\(`, "m");
  const match = marker.exec(appSource);
  if (!match) throw new Error(`Could not extract function ${name} from app.js.`);
  const start = match.index + (match[0].startsWith("\n") ? 1 : 0);
  const openBrace = appSource.indexOf("{", start);
  let depth = 0;
  const end = scanJavaScript(appSource, openBrace, (char) => {
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return true;
    }
    return false;
  });
  if (end < 0) throw new Error(`Could not find the end of function ${name} in app.js.`);
  return appSource.slice(start, end + 1);
}

const compositionDeclarations = [
  "INITIALS",
  "MEDIALS",
  "FINALS",
  "VOWEL_FAMILIES",
  "HANGUL_SYLLABLE_LAYOUTS",
  "HANGUL_COMPOUND_FINAL_PARTS",
  "hangulSyllableGuideCache",
  "HANGUL_TICK_VARIANT_STROKES",
  "hangulVariantBankCache",
  "hangulVariantSyllableGuideCache",
  "HANGUL_GRADE",
  "HANGUL_FREEHAND_TARGET_CONFIDENCE",
  "HANGUL_FREEHAND_MIN_MARGIN",
  "HANGUL_FREEHAND_COMPONENT_MIN_CONFIDENCE",
  "HANGUL_FREEHAND_COMPONENT_AVG_CONFIDENCE",
  "HANGUL_FREEHAND_PRIMARY_COMPONENT_MAX_RANK",
  "HANGUL_FREEHAND_COMPONENT_MAX_RANK",
  "HANGUL_FREEHAND_STROKE_TOLERANCE",
  "hangulComponentRecognizerCache",
  "HangulNativeRecognizer",
].map(extractDeclaration);
const compositionFunctions = [
  "getHanaPathRuntime",
  "isHanaPathNative",
  "getHanaPathNativePlugin",
  "decomposeHangul",
  "normalizeHangulJamoStrokes",
  "getComposableJamoStrokes",
  "getHangulSyllableLayout",
  "composeHangulSyllableGuide",
  "getHangulStrokeGuide",
  "getHangulVariantStrokeBank",
  "hangulGlyphHasTickVariant",
  "getHangulTickVariantGuide",
  "getHangulComponentVariantStrokes",
  "hangulPairDist",
  "hangulPairPathLength",
  "cleanHangulInkStroke",
  "resampleHangulStroke",
  "getHangulComponentStrokes",
  "getHangulComponentRecognizer",
  "extractHangulInkComponentStrokes",
  "getHangulTargetComponentMatches",
  "hasUnexpectedHangulFinalInk",
  "isHangulTargetAwareRecognitionMatch",
  "isHangulFreehandRecognitionMatch",
  "validateWritingStrokes",
].map(extractFunction);
const createCompositionApi = new Function(
  "window",
  `"use strict";\n${compositionDeclarations.join("\n")}\n${compositionFunctions.join("\n")}\nreturn { getHangulStrokeGuide, getHangulTickVariantGuide, getHangulTargetComponentMatches, isHangulFreehandRecognitionMatch, validateWritingStrokes, HangulNativeRecognizer };\n//# sourceURL=hanapath-app-composition-audit.js`,
);
const { getHangulStrokeGuide, getHangulTickVariantGuide, getHangulTargetComponentMatches, isHangulFreehandRecognitionMatch, validateWritingStrokes, HangulNativeRecognizer } = createCompositionApi(globalThis);

function guideProblem(guide) {
  if (!guide || typeof guide !== "object") return "guide is missing";
  if (!Array.isArray(guide.strokes) || !guide.strokes.length) return "strokes are missing or empty";
  for (let strokeIndex = 0; strokeIndex < guide.strokes.length; strokeIndex += 1) {
    const stroke = guide.strokes[strokeIndex];
    if (!Array.isArray(stroke) || stroke.length < 2) return `stroke ${strokeIndex + 1} has fewer than two points`;
    for (let pointIndex = 0; pointIndex < stroke.length; pointIndex += 1) {
      const point = stroke[pointIndex];
      if (!Array.isArray(point) || point.length < 2) return `stroke ${strokeIndex + 1} point ${pointIndex + 1} is malformed`;
      const x = point[0];
      const y = point[1];
      if (!Number.isFinite(x) || !Number.isFinite(y)) return `stroke ${strokeIndex + 1} point ${pointIndex + 1} is not finite`;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        return `stroke ${strokeIndex + 1} point ${pointIndex + 1} is out of bounds (${x}, ${y})`;
      }
    }
  }
  return "";
}

let compositionFailureCount = 0;
const compositionFailures = [];
function recordCompositionFailure(glyph, kind, problem) {
  compositionFailureCount += 1;
  if (compositionFailures.length < 50) compositionFailures.push({ glyph, kind, problem });
}

const modernJamo = Object.keys(bank);
if (modernJamo.length !== 40 || globalThis.HANGUL_STROKE_GUIDE_COUNT !== 40) {
  recordCompositionFailure("modern jamo bank", "coverage", `expected 40 guides, found ${modernJamo.length} bank entries and ${globalThis.HANGUL_STROKE_GUIDE_COUNT} exported guides`);
}
for (const glyph of modernJamo) {
  const problem = guideProblem(getHangulStrokeGuide(glyph));
  if (problem) recordCompositionFailure(glyph, "jamo", problem);
}

const MODERN_SYLLABLE_START = 0xac00;
const MODERN_SYLLABLE_COUNT = 11172;
for (let offset = 0; offset < MODERN_SYLLABLE_COUNT; offset += 1) {
  const glyph = String.fromCharCode(MODERN_SYLLABLE_START + offset);
  const problem = guideProblem(getHangulStrokeGuide(glyph));
  if (problem) recordCompositionFailure(glyph, "syllable", problem);
}

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
  // Mirror the app: glyphs containing ㅎ/ㅊ also register the alternate
  // top-tick handwriting style (flat-bar ㅎ, upright-tick ㅊ).
  const tickVariant = getHangulTickVariantGuide(glyph);
  if (tickVariant && !recognizer.add(glyph, tickVariant.strokes, { augment: true })) {
    throw new Error(`Could not add tick-variant template ${glyph}`);
  }
}
const glyphs = Object.keys(bank);

// Regression captured from the 2026-07-16 learner report: a loose but
// structurally readable 한, with ㅎ and final ㄴ joined into one natural pen
// gesture and an overlong ㅏ. Whole-block $Q ranks this behind several
// unrelated blocks, so the prompted-syllable fallback must validate the three
// Hangul components without accepting another unit glyph as 한.
const ROUGH_NATURAL_HAN = [
  [[0.24, 0.04], [0.24, 0.2]],
  [[0.08, 0.17], [0.18, 0.18], [0.31, 0.19], [0.43, 0.17]],
  [[0.16, 0.3], [0.11, 0.36], [0.1, 0.48], [0.15, 0.55], [0.28, 0.56], [0.37, 0.5], [0.4, 0.4], [0.36, 0.32], [0.25, 0.3], [0.16, 0.3], [0.13, 0.46], [0.14, 0.65], [0.16, 0.82], [0.19, 0.91], [0.39, 0.91]],
  [[0.69, 0.22], [0.69, 0.84]],
  [[0.69, 0.49], [0.9, 0.49]],
];
const TARGET_AWARE_UNIT_GLYPHS = [
  "한", "부", "리", "워", "글", "국", "어", "말", "단", "읽", "다", "듣", "쓰", "문",
  "장", "안", "녕", "하", "세", "요", "감", "니", "네", "아", "주", "죄", "송",
];
const targetAwareRecognizer = new API.Recognizer();
for (const glyph of [...new Set([...glyphs, ...TARGET_AWARE_UNIT_GLYPHS])]) {
  const guide = getHangulStrokeGuide(glyph);
  if (guide) targetAwareRecognizer.add(glyph, guide.strokes, { augment: true });
  const tickVariant = getHangulTickVariantGuide(glyph);
  if (tickVariant) targetAwareRecognizer.add(glyph, tickVariant.strokes, { augment: true });
}
// The same natural 한, but with the ㅎ top mark written as a flat bar instead
// of an upright tick — the other common handwriting style. Both must pass.
const ROUGH_NATURAL_HAN_FLAT_TOP = [
  [[0.15, 0.08], [0.24, 0.09], [0.34, 0.08]],
  ...ROUGH_NATURAL_HAN.slice(1).map((stroke) => stroke.map((point) => point.slice())),
];
// Regression from the 2026-07-19 phone report: the learner completed all
// three components separately, used the common flat-top ㅎ, extended ㅏ down
// beside the final, and drew ㄴ as one natural corner stroke. This must grade
// as the prompted 한 instead of exposing an unrelated jamo guess.
const NATURAL_SEPARATE_HAN = [
  [[0.2, 0.07], [0.38, 0.07]],
  [[0.1, 0.19], [0.26, 0.2], [0.43, 0.19]],
  [[0.18, 0.3], [0.13, 0.36], [0.13, 0.46], [0.19, 0.52], [0.31, 0.52], [0.38, 0.46], [0.38, 0.36], [0.32, 0.3], [0.18, 0.3]],
  [[0.7, 0.18], [0.7, 0.84]],
  [[0.7, 0.48], [0.89, 0.48]],
  [[0.18, 0.61], [0.14, 0.85], [0.43, 0.85]],
];
const targetAwareLimit = glyphs.length + TARGET_AWARE_UNIT_GLYPHS.length;
const roughHanMatches = targetAwareRecognizer.recognize(ROUGH_NATURAL_HAN, targetAwareLimit);
const roughHanComponents = getHangulTargetComponentMatches(ROUGH_NATURAL_HAN, "한");
const targetAwareFailures = [];
if (!isHangulFreehandRecognitionMatch(roughHanMatches, "한", ROUGH_NATURAL_HAN)) {
  targetAwareFailures.push({ kind: "rough-positive", source: "한", components: roughHanComponents });
}
const roughFlatHanMatches = targetAwareRecognizer.recognize(ROUGH_NATURAL_HAN_FLAT_TOP, targetAwareLimit);
if (!isHangulFreehandRecognitionMatch(roughFlatHanMatches, "한", ROUGH_NATURAL_HAN_FLAT_TOP)) {
  targetAwareFailures.push({
    kind: "rough-positive-flat-top",
    source: "한",
    components: getHangulTargetComponentMatches(ROUGH_NATURAL_HAN_FLAT_TOP, "한"),
  });
}
const naturalSeparateHanMatches = targetAwareRecognizer.recognize(NATURAL_SEPARATE_HAN, targetAwareLimit);
if (!isHangulFreehandRecognitionMatch(naturalSeparateHanMatches, "한", NATURAL_SEPARATE_HAN)) {
  targetAwareFailures.push({
    kind: "natural-separate-positive",
    source: "한",
    components: getHangulTargetComponentMatches(NATURAL_SEPARATE_HAN, "한"),
  });
}
for (const source of TARGET_AWARE_UNIT_GLYPHS) {
  const strokes = getHangulStrokeGuide(source)?.strokes || [];
  const matches = targetAwareRecognizer.recognize(strokes, targetAwareLimit);
  for (const prompt of TARGET_AWARE_UNIT_GLYPHS) {
    if (prompt === source) continue;
    if (isHangulFreehandRecognitionMatch(matches, prompt, strokes)) {
      targetAwareFailures.push({
        kind: "false-accept",
        source,
        prompt,
        wholeTarget: matches.find((match) => match.name === prompt) || null,
        wholeRank: matches.findIndex((match) => match.name === prompt) + 1,
        sourceStrokeCount: strokes.length,
        promptStrokeCount: getHangulStrokeGuide(prompt)?.strokes?.length || 0,
        components: getHangulTargetComponentMatches(strokes, prompt),
      });
    }
  }
}
// Match the learner-facing confidence floor. Unlike the old freehand check,
// passing this audit also requires the prompted glyph to be the top-ranked
// result; a high-confidence second or third choice is only a confuser.
const ACCEPTANCE_CONFIDENCE = 0.82;
const ACCEPTANCE_MIN_MARGIN = 0.01;
const ACCEPTANCE_MARGIN_BYPASS_CONFIDENCE = 0.96;

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

function cloneStrokes(strokes) {
  return strokes.map((stroke) => stroke.map((point) => point.slice()));
}

function strokeLength(stroke) {
  let total = 0;
  for (let i = 1; i < stroke.length; i += 1) {
    total += Math.hypot(stroke[i][0] - stroke[i - 1][0], stroke[i][1] - stroke[i - 1][1]);
  }
  return total;
}

// Split the longest authored stroke at its geometric midpoint. Both fragments
// share the split point, so this changes articulation by exactly +1 stroke
// without changing the visible shape.
function splitOneStroke(strokes) {
  const dense = strokes.map((stroke) => interpolate(stroke));
  let strokeIndex = 0;
  for (let i = 1; i < dense.length; i += 1) {
    if (strokeLength(dense[i]) > strokeLength(dense[strokeIndex])) strokeIndex = i;
  }

  const stroke = dense[strokeIndex];
  const halfLength = strokeLength(stroke) / 2;
  let travelled = 0;
  let splitIndex = 1;
  for (let i = 1; i < stroke.length - 1; i += 1) {
    travelled += Math.hypot(stroke[i][0] - stroke[i - 1][0], stroke[i][1] - stroke[i - 1][1]);
    splitIndex = i;
    if (travelled >= halfLength) break;
  }
  splitIndex = Math.max(1, Math.min(stroke.length - 2, splitIndex));

  return [
    ...dense.slice(0, strokeIndex),
    stroke.slice(0, splitIndex + 1),
    stroke.slice(splitIndex),
    ...dense.slice(strokeIndex + 1),
  ];
}

function endpointDistance(first, second) {
  const a = first[first.length - 1];
  const b = second[0];
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

// Merge the easiest adjacent pair into one continuous gesture. Direction is
// deliberately free (as it is in $Q); choosing the shortest connector models
// a learner naturally reducing the standard count by exactly one stroke.
function mergeTwoAdjacentStrokes(strokes) {
  if (strokes.length < 2) return null;
  const dense = strokes.map((stroke) => interpolate(stroke));
  let best = null;
  for (let i = 0; i < dense.length - 1; i += 1) {
    for (const reverseFirst of [false, true]) {
      for (const reverseSecond of [false, true]) {
        const first = reverseFirst ? dense[i].slice().reverse() : dense[i].slice();
        const second = reverseSecond ? dense[i + 1].slice().reverse() : dense[i + 1].slice();
        const gap = endpointDistance(first, second);
        if (!best || gap < best.gap) best = { index: i, first, second, gap };
      }
    }
  }
  return [
    ...dense.slice(0, best.index),
    [...best.first, ...best.second],
    ...dense.slice(best.index + 2),
  ];
}

function createGroup(label) {
  return { label, cases: 0, failures: [], minimumConfidence: Infinity, minimumMargin: Infinity };
}

const groups = {
  mobile: createGroup("mobile ink"),
  joined: createGroup("joined freehand"),
  split: createGroup("split +1 stroke"),
  merged: createGroup("merged -1 stroke"),
  tick: createGroup("alternate tick"),
};
const negativeSamples = [];

function formattedMatches(matches, limit = 4) {
  return matches.slice(0, limit).map((match) => `${match.name}:${match.confidence.toFixed(3)}`).join(" ");
}

function evaluateAcceptance(matches, promptedGlyph) {
  const top = matches[0] || null;
  const second = matches[1] || null;
  const margin = top ? (second ? top.confidence - second.confidence : 1) : 0;
  const accepted = Boolean(
    top?.name === promptedGlyph
    && top.confidence >= ACCEPTANCE_CONFIDENCE
    && (margin >= ACCEPTANCE_MIN_MARGIN || top.confidence >= ACCEPTANCE_MARGIN_BYPASS_CONFIDENCE)
  );
  return { accepted, top, second, margin };
}

function evaluatePositive(group, glyph, variant, strokes) {
  const matches = recognizer.recognize(strokes, glyphs.length);
  const acceptance = evaluateAcceptance(matches, glyph);
  const { top, margin } = acceptance;
  const target = matches.find((match) => match.name === glyph) || null;
  group.cases += 1;
  if (acceptance.accepted) {
    group.minimumConfidence = Math.min(group.minimumConfidence, top.confidence);
    group.minimumMargin = Math.min(group.minimumMargin, margin);
  } else {
    group.failures.push({ glyph, variant, top, target, margin, matches: formattedMatches(matches) });
  }
  negativeSamples.push({ source: glyph, variant, matches });
}

// Preserve the deterministic mobile-ink stress set.
for (const [glyph, guide] of Object.entries(bank)) {
  for (let variant = 0; variant < 12; variant += 1) {
    evaluatePositive(groups.mobile, glyph, `mobile-${variant}`, mobileVariant(guide.strokes, variant));
  }
}

// Preserve the all-strokes-joined case, but require the target to rank first.
for (const [glyph, guide] of Object.entries(bank)) {
  evaluatePositive(groups.joined, glyph, "all-joined", [guide.strokes.flatMap((stroke) => stroke)]);
}

for (const [glyph, guide] of Object.entries(bank)) {
  const split = splitOneStroke(guide.strokes);
  if (split.length !== guide.strokes.length + 1) throw new Error(`Split case for ${glyph} did not add exactly one stroke.`);
  evaluatePositive(groups.split, glyph, "split-longest", split);
  const merged = mergeTwoAdjacentStrokes(guide.strokes);
  if (merged) {
    if (merged.length !== guide.strokes.length - 1) throw new Error(`Merge case for ${glyph} did not remove exactly one stroke.`);
    evaluatePositive(groups.merged, glyph, "merge-closest-adjacent", merged);
  }
}

// Both top-tick handwriting styles must be accepted for ㅎ and ㅊ (owner
// report 2026-07-19: some learners write the top mark flat, others upright).
for (const glyph of ["ㅎ", "ㅊ"]) {
  const variant = getHangulTickVariantGuide(glyph);
  if (!variant?.strokes?.length) throw new Error(`Missing alternate-tick variant guide for ${glyph}.`);
  evaluatePositive(groups.tick, glyph, "alternate-tick-authored", cloneStrokes(variant.strokes));
  for (let index = 0; index < 12; index += 1) {
    evaluatePositive(groups.tick, glyph, `alternate-tick-mobile-${index}`, mobileVariant(variant.strokes, index));
  }
}

// Include exact authored ink in the negative matrix without duplicating it in
// the positive totals. Each source sample is tested against every other prompt.
for (const [glyph, guide] of Object.entries(bank)) {
  negativeSamples.push({
    source: glyph,
    variant: "authored",
    matches: recognizer.recognize(cloneStrokes(guide.strokes), glyphs.length),
  });
}

let negativeCases = 0;
const confidenceConfusers = [];
const falseAccepts = [];
for (const sample of negativeSamples) {
  for (const promptedGlyph of glyphs) {
    if (promptedGlyph === sample.source) continue;
    negativeCases += 1;
    const match = sample.matches.find((candidate) => candidate.name === promptedGlyph) || null;
    if (match?.confidence >= ACCEPTANCE_CONFIDENCE) {
      confidenceConfusers.push({
        source: sample.source,
        prompt: promptedGlyph,
        variant: sample.variant,
        rank: sample.matches.indexOf(match) + 1,
        confidence: match.confidence,
      });
    }
    // Use the exact learner-facing contract for every negative prompt too.
    const acceptance = evaluateAcceptance(sample.matches, promptedGlyph);
    if (acceptance.accepted) {
      falseAccepts.push({
        source: sample.source,
        prompt: promptedGlyph,
        variant: sample.variant,
        confidence: acceptance.top.confidence,
        margin: acceptance.margin,
        matches: formattedMatches(sample.matches),
      });
    }
  }
}

confidenceConfusers.sort((a, b) => b.confidence - a.confidence);
falseAccepts.sort((a, b) => b.confidence - a.confidence);

function formatMinimum(group) {
  return Number.isFinite(group.minimumConfidence) ? group.minimumConfidence.toFixed(3) : "n/a";
}

function formatMinimumMargin(group) {
  return Number.isFinite(group.minimumMargin) ? group.minimumMargin.toFixed(3) : "n/a";
}

function printGroup(group) {
  console.log(`${group.label.padEnd(19)}: ${group.cases}`);
  console.log(`${"  accept failures".padEnd(19)}: ${group.failures.length}`);
  console.log(`${"  minimum conf".padEnd(19)}: ${formatMinimum(group)}`);
  console.log(`${"  minimum margin".padEnd(19)}: ${formatMinimumMargin(group)}`);
}

console.log("Hangul recognition audit");
console.log("========================");
console.log(`algorithm          : ${API.algorithm}`);
console.log(`templates          : ${glyphs.length}`);
console.log(`app jamo guides    : ${modernJamo.length}`);
console.log(`app syllable guides: ${MODERN_SYLLABLE_COUNT}`);
console.log(`app guide cases    : ${modernJamo.length + MODERN_SYLLABLE_COUNT}`);
console.log(`composition failures: ${compositionFailureCount}`);
console.log(`free-drawing contract: ${freeDrawingContractProblems.length ? `${freeDrawingContractProblems.length} failure(s)` : "pass"}`);
console.log(`acceptance contract: target top-1 + confidence >= ${ACCEPTANCE_CONFIDENCE.toFixed(2)}`);
console.log(`margin contract    : >= ${ACCEPTANCE_MIN_MARGIN.toFixed(2)} unless confidence >= ${ACCEPTANCE_MARGIN_BYPASS_CONFIDENCE.toFixed(2)}`);
printGroup(groups.mobile);
printGroup(groups.joined);
printGroup(groups.split);
printGroup(groups.merged);
printGroup(groups.tick);
const minimumPositiveMargin = Math.min(...Object.values(groups).map((group) => group.minimumMargin));
console.log(`positive min margin: ${Number.isFinite(minimumPositiveMargin) ? minimumPositiveMargin.toFixed(3) : "n/a"}`);
console.log(`pairwise negatives : ${negativeCases}`);
console.log(`confidence confusers: ${confidenceConfusers.length}`);
console.log(`false accepts      : ${falseAccepts.length}`);
console.log(`rough 한 fallback  : ${targetAwareFailures.some((failure) => failure.kind.startsWith("rough-positive")) ? "fail" : "pass"}`);
console.log(`fallback negatives : ${TARGET_AWARE_UNIT_GLYPHS.length * (TARGET_AWARE_UNIT_GLYPHS.length - 1)}`);
console.log(`fallback false accepts: ${targetAwareFailures.filter((failure) => failure.kind === "false-accept").length}`);

const positiveFailures = Object.values(groups).flatMap((group) =>
  group.failures.map((failure) => ({ group: group.label, ...failure })),
);

if (compositionFailureCount || freeDrawingContractProblems.length || positiveFailures.length || falseAccepts.length || targetAwareFailures.length) {
  if (freeDrawingContractProblems.length) {
    console.log("\nFree-drawing contract failures:");
    freeDrawingContractProblems.forEach((problem) => console.log(`  ${problem}`));
  }
  if (compositionFailureCount) {
    console.log("\nApp composition failures:");
    compositionFailures.forEach((failure) => {
      console.log(`  ${failure.kind} · ${failure.glyph}: ${failure.problem}`);
    });
    if (compositionFailureCount > compositionFailures.length) {
      console.log(`  …and ${compositionFailureCount - compositionFailures.length} more composition failures.`);
    }
  }
  if (positiveFailures.length) {
    console.log("\nPositive acceptance failures:");
    positiveFailures.slice(0, 30).forEach((failure) => {
      const targetConfidence = failure.target ? failure.target.confidence.toFixed(3) : "missing";
      console.log(`  ${failure.group} · ${failure.glyph} · ${failure.variant}: target ${targetConfidence}; margin ${failure.margin.toFixed(3)}; ${failure.matches}`);
    });
  }
  if (falseAccepts.length) {
    console.log("\nPairwise false accepts:");
    falseAccepts.slice(0, 30).forEach((failure) => {
      console.log(`  drew ${failure.source}, prompted ${failure.prompt} · ${failure.variant}: margin ${failure.margin.toFixed(3)}; ${failure.matches}`);
    });
  }
  if (targetAwareFailures.length) {
    console.log("\nTarget-aware syllable fallback failures:");
    targetAwareFailures.forEach((failure) => {
      console.log(`  ${failure.kind} · drew ${failure.source}${failure.prompt ? `, prompted ${failure.prompt}` : ""}${failure.wholeTarget ? ` · whole rank ${failure.wholeRank}, ${failure.wholeTarget.confidence.toFixed(3)} · strokes ${failure.sourceStrokeCount}/${failure.promptStrokeCount}` : ""}: ${JSON.stringify(failure.components)}`);
    });
  }
  if (confidenceConfusers.length) {
    console.log("\nStrongest high-confidence confusers (top-1 is required, so these are not all accepts):");
    confidenceConfusers.slice(0, 20).forEach((confuser) => {
      console.log(`  drew ${confuser.source}, prompt ${confuser.prompt} · ${confuser.variant}: rank ${confuser.rank}, ${confuser.confidence.toFixed(3)}`);
    });
  }
  process.exit(1);
}

// Verification unit tests for validation, normalization, and fallback.
const providerAuditErrors = [];

const runValTest = (input, expectedErr) => {
  const err = validateWritingStrokes(input);
  if (expectedErr === null) {
    if (err !== null) providerAuditErrors.push(`Expected validation to pass but got: "${err}"`);
  } else {
    if (err === null) providerAuditErrors.push(`Expected validation error "${expectedErr}" but got success`);
    else if (!err.includes(expectedErr)) providerAuditErrors.push(`Expected validation error containing "${expectedErr}" but got "${err}"`);
  }
};

runValTest(null, "Invalid or empty strokes payload");
runValTest([], "Invalid or empty strokes payload");
runValTest([[{ x: 10, y: 20, t: 100 }]], null);
runValTest([[]], "Stroke must contain at least one point");

const tooManyStrokes = Array(501).fill([[{ x: 10, y: 20, t: 100 }]]);
runValTest(tooManyStrokes, "Payload size exceeds maximum allowed strokes (500)");

const tooManyPoints = [Array(1001).fill({ x: 10, y: 20, t: 100 })];
runValTest(tooManyPoints, "Stroke point count exceeds maximum (1000)");

const tooManyTotalPoints = Array(21).fill(null).map(() => Array(1000).fill({ x: 10, y: 20, t: 100 }));
runValTest(tooManyTotalPoints, "Payload point count exceeds maximum (20000)");

runValTest([[{ y: 20, t: 100 }]], "Missing coordinates or timestamp field");
runValTest([[{ x: 10, t: 100 }]], "Missing coordinates or timestamp field");
runValTest([[{ x: 10, y: 20 }]], "Missing coordinates or timestamp field");

runValTest([[{ x: NaN, y: 20, t: 100 }]], "Non-finite coordinates or timestamps detected");
runValTest([[{ x: 10, y: Infinity, t: 100 }]], "Non-finite coordinates or timestamps detected");

runValTest([[{ x: -1001, y: 20, t: 100 }]], "Coordinates out of reasonable bounds");
runValTest([[{ x: 10, y: 5001, t: 100 }]], "Coordinates out of reasonable bounds");

const norm1 = HangulNativeRecognizer.normalizeResult("mlkit", { ready: true, candidates: [{ name: "한", score: 0.88 }] }, 15, null);
if (norm1.provider !== "mlkit" || !norm1.ready || norm1.candidates.length !== 1 || norm1.candidates[0].name !== "한" || norm1.candidates[0].score !== 0.88 || norm1.latencyMs !== 15 || norm1.error !== null || norm1.fallbackReason !== null) {
  providerAuditErrors.push("Normalization failed for valid result: " + JSON.stringify(norm1));
}

const normErr = HangulNativeRecognizer.normalizeResult("mlkit", null, 0, "some_error");
if (normErr.ready || normErr.error !== "some_error" || normErr.fallbackReason !== "some_error") {
  providerAuditErrors.push("Normalization failed for error result: " + JSON.stringify(normErr));
}

const normNoScore = HangulNativeRecognizer.normalizeResult("mlkit", { ready: true, candidates: [{ name: "한" }] }, 8, null);
if (normNoScore.candidates[0]?.score !== null) {
  providerAuditErrors.push("Missing ML Kit text score was not preserved as null: " + JSON.stringify(normNoScore));
}

await HangulNativeRecognizer.recognize([[{ x: 10, y: 20, t: 100 }]]).then((res) => {
  if (res.ready || res.error !== "bridge_missing" || res.fallbackReason !== "bridge_missing") {
    providerAuditErrors.push("Fallback recognize did not fail closed on desktop: " + JSON.stringify(res));
  }
}).catch((e) => {
  providerAuditErrors.push("Fallback recognize threw exception: " + String(e));
});

if (providerAuditErrors.length) {
  console.log("\nProvider normalization/validation audit failures:");
  providerAuditErrors.forEach(err => console.log(`  ${err}`));
  process.exit(1);
}

console.log("\nResult: free drawing is the only writing mode; all 11,172 composed syllables and 40 jamo have valid app guides; all deterministic finger-style and ±1-stroke variants recognized correctly, with no pairwise false accepts.");
