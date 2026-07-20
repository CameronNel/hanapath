#!/usr/bin/env node
// Audit the Hangul Mastery Examination bank (hangul_mastery_exam.js) against
// the coverage invariants in docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md §7:
//
//   MCQ count = 120, Typed count = 40, Drawing count = 40, Total = 200
//   Every MCQ has exactly 6 unique options; its answer appears exactly once
//   Part 1 targets all 21 vowels and all 19 consonants exactly once
//   Part 6 contains all 21 vowel demo syllables and all 19 consonant demo syllables
//   Part 7 targets all 40 modern jamo exactly once
//   Every Korean answer/target is NFC-normalized
//   No item exposes its answer/target in learner-facing copy
//   All audioText values exist in AUDIO_MAP with a non-empty local file
//
// Usage: node scripts/audit-hangul-mastery-exam.mjs
// Always strict: any violation exits non-zero.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");

function loadBrowserGlobal(file, key) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window[key];
}

const exam = loadBrowserGlobal("hangul_mastery_exam.js", "HANGUL_MASTERY_EXAM");
const AUDIO_MAP = loadBrowserGlobal("audio_map.js", "AUDIO_MAP") || {};

const VOWELS = [..."ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ"];
const CONSONANTS = [..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ"];
const VOWEL_DEMOS = [..."아야어여오요우유으이애얘에예와왜외워웨위의"];
const CONSONANT_DEMOS = [..."가나다라마바사자차카타파하까따빠싸짜"];
// The silent-ㅇ demo syllable 아 doubles as a vowel demo; Part 6 covers ㅇ via
// P6-C08 (아), so the consonant-demo list is 18 distinct syllables plus 아.

const failures = [];
const fail = (msg) => failures.push(msg);

if (!exam || !Array.isArray(exam.sections)) {
  fail("window.HANGUL_MASTERY_EXAM missing or has no sections array");
  report();
}

if (exam.version !== 2) fail(`version must be 2, got ${exam.version}`);
if (exam.requiredCorrect !== 200) fail(`requiredCorrect must be 200, got ${exam.requiredCorrect}`);
if (exam.optionCount !== 6) fail(`optionCount must be 6, got ${exam.optionCount}`);
if (exam.referenceAllowed !== false) fail("referenceAllowed must be false");
if (exam.feedbackDuringExam !== false) fail("feedbackDuringExam must be false");

const all = exam.sections.flatMap((s) => s.items.map((item) => ({ ...item, sectionPart: s.part })));
const byType = (t) => all.filter((q) => q.type === t);
const mcq = byType("mcq");
const typed = byType("type");
const drawn = byType("draw");

if (mcq.length !== 120) fail(`MCQ count must be 120, got ${mcq.length}`);
if (typed.length !== 40) fail(`Typed count must be 40, got ${typed.length}`);
if (drawn.length !== 40) fail(`Drawing count must be 40, got ${drawn.length}`);
if (all.length !== 200) fail(`Total count must be 200, got ${all.length}`);

// Unique IDs
const seenIds = new Set();
for (const q of all) {
  if (!q.id) fail(`item without id in part ${q.sectionPart}`);
  if (seenIds.has(q.id)) fail(`duplicate item id ${q.id}`);
  seenIds.add(q.id);
}

const isNFC = (s) => typeof s === "string" && s === s.normalize("NFC");

// MCQ shape: exactly 6 unique options, answer appears exactly once.
for (const q of mcq) {
  if (!Array.isArray(q.options) || q.options.length !== 6) {
    fail(`${q.id}: MCQ must have exactly 6 options`);
    continue;
  }
  if (new Set(q.options).size !== 6) fail(`${q.id}: MCQ options are not unique`);
  const hits = q.options.filter((o) => o === q.answer).length;
  if (hits !== 1) fail(`${q.id}: answer must appear exactly once in options (found ${hits})`);
  if (!isNFC(q.answer)) fail(`${q.id}: answer is not NFC-normalized`);
  for (const o of q.options) if (!isNFC(o)) fail(`${q.id}: option "${o}" is not NFC-normalized`);
}

for (const q of typed) {
  if (!isNFC(q.answer)) fail(`${q.id}: typed answer not NFC-normalized`);
  if (q.normalization !== "NFC_TRIM") fail(`${q.id}: typed normalization must be "NFC_TRIM"`);
}
for (const q of drawn) {
  if (!isNFC(q.target)) fail(`${q.id}: draw target not NFC-normalized`);
  if (q.requireExactGlyph !== true) fail(`${q.id}: draw item must set requireExactGlyph`);
  if (q.requireGreatVerdict !== true) fail(`${q.id}: draw item must set requireGreatVerdict`);
}

// Coverage matrices.
function coversExactlyOnce(label, values, expected) {
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  for (const e of expected) {
    const n = counts.get(e) || 0;
    if (n !== 1) fail(`${label}: ${e} covered ${n} times (expected exactly once)`);
  }
  for (const [v, n] of counts) {
    if (!expected.includes(v)) fail(`${label}: unexpected value ${v} (×${n})`);
  }
}

const part1 = all.filter((q) => q.sectionPart === 1);
if (part1.length !== 40) fail(`Part 1 must have 40 items, got ${part1.length}`);
coversExactlyOnce("Part 1 jamo coverage", part1.map((q) => q.answer), [...VOWELS, ...CONSONANTS]);

const part6 = all.filter((q) => q.sectionPart === 6);
if (part6.length !== 40) fail(`Part 6 must have 40 items, got ${part6.length}`);
// 아 appears twice by design (vowel ㅏ demo P6-V01 + silent-ㅇ demo P6-C08);
// every other demo syllable must appear exactly once.
const aCount = part6.filter((q) => q.answer === "아").length;
if (aCount !== 2) fail(`Part 6: 아 must appear exactly twice (vowel + silent ㅇ), got ${aCount}`);
coversExactlyOnce(
  "Part 6 demo-syllable coverage",
  part6.map((q) => q.answer).filter((v) => v !== "아"),
  [...new Set([...VOWEL_DEMOS, ...CONSONANT_DEMOS])].filter((v) => v !== "아"),
);

const part7 = all.filter((q) => q.sectionPart === 7);
coversExactlyOnce("Part 7 draw-target coverage", part7.map((q) => q.target), [...VOWELS, ...CONSONANTS]);

// No answer leak in learner-facing copy. MCQ options are the legitimate answer
// surface; everything else the candidate can read must not contain the answer.
// Only Hangul-bearing answers are checked: a single Latin letter like "k"
// (Part 4 end sounds) trivially appears inside English prose without leaking.
// promptKo is exempt when it is the section's generic instruction sentence
// (한국어 contains 어/국/어… as substrings by coincidence, not as a leak).
const genericInstructions = new Set(exam.sections.map((s) => s.instructionKo).filter(Boolean));
const hasHangul = (s) => /[ᄀ-ᇿ㄰-㆏가-힣]/.test(s);
for (const q of all) {
  const answer = q.type === "draw" ? q.target : q.answer;
  if (typeof answer !== "string" || !answer.length || !hasHangul(answer)) continue;
  const surfaces = [q.promptEn, q.stimulus].filter(Boolean);
  if (q.promptKo && !genericInstructions.has(q.promptKo)) surfaces.push(q.promptKo);
  for (const s of surfaces) {
    if (s.includes(answer)) {
      fail(`${q.id}: learner-facing copy leaks the answer (“${answer}” in “${s}”)`);
    }
  }
}

// Reference/hint vocabulary must not appear in candidate copy.
const FORBIDDEN_COPY = /\b(hint|reveal|answer key|reference board)\b/i;
for (const q of all) {
  for (const s of [q.promptEn, q.stimulus].filter(Boolean)) {
    if (FORBIDDEN_COPY.test(s)) fail(`${q.id}: copy contains forbidden aid language: “${s}”`);
  }
}

// Audio coverage: every audioText must resolve to a non-empty local file.
const audioTexts = [...new Set(all.map((q) => q.audioText).filter(Boolean).map((s) => s.trim().normalize("NFC")))];
for (const token of audioTexts) {
  const rel = AUDIO_MAP[token];
  if (!rel) { fail(`audioText “${token}” missing from AUDIO_MAP`); continue; }
  const file = path.join(ROOT, rel.replace(/^\.\//, ""));
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    fail(`audioText “${token}” maps to missing/empty file ${rel}`);
  }
}

report();

function report() {
  if (failures.length) {
    console.error(`audit-hangul-mastery-exam: ${failures.length} failure(s)`);
    for (const f of failures) console.error("  ✗ " + f);
    process.exit(1);
  }
  console.log(
    `audit-hangul-mastery-exam: OK — ${all?.length ?? 0} items ` +
    `(${mcq?.length ?? 0} MCQ / ${typed?.length ?? 0} typed / ${drawn?.length ?? 0} drawn), ` +
    `${audioTexts?.length ?? 0} audio tokens verified`,
  );
  process.exit(0);
}
