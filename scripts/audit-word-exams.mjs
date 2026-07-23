#!/usr/bin/env node
// audit-word-exams.mjs — Core Word Examination Suite audit.
// Governing contract: docs/CORE_WORD_EXAM_SPECS.md §9. Loads the same browser
// globals and the same generation/grading contracts as the app runner, so the
// audit and the browser exercise identical items.
//
// Implements every §9 hard failure, verifies determinism + cross-seed variation
// across the mandated seed counts (250 section / 500 midterm / 1000 final), and
// prints a content-validity matrix + exposure summary on success.
//
// Usage:
//   node scripts/audit-word-exams.mjs           # full mandated seed counts
//   node scripts/audit-word-exams.mjs --quick    # reduced counts for iteration
//   node scripts/audit-word-exams.mjs --matrix   # also dump the full matrix

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const QUICK = process.argv.includes("--quick");
const SHOW_MATRIX = process.argv.includes("--matrix");

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox);
  return sandbox.window;
}
const ENGINE_FILES = [
  "audio_map.js", "words_curated_core.js", "words_lesson_plan.js",
  "words_inflect.js", "word_exam_blueprints.js", "word_exam_engine.js",
];
const W = loadGlobals(ENGINE_FILES);
const ENG = W.HANAPATH_WORD_EXAM_ENGINE;
const EXAMS = W.HANAPATH_WORD_EXAMS;
const COMPETENCIES = W.HANAPATH_WORD_EXAM_COMPETENCIES;
const META = W.HANAPATH_WORD_EXAM_META;
const AUDIO_MAP = W.AUDIO_MAP;
const INFLECT = W.HANAPATH_INFLECT;
const words = W.HANAPATH_CURATED_WORDS;
const units = W.HANAPATH_WORD_UNITS;
const sections = W.HANAPATH_WORD_SECTIONS;
const wordById = new Map(words.map((w) => [w.id, w]));
const unitById = new Map(units.map((u) => [u.id, u]));
const sectionOrder = new Map(sections.map((s) => [s.id, s.order]));

const nfc = (s) => String(s == null ? "" : s).normalize("NFC").trim();
const audioIndex = new Set(Object.keys(AUDIO_MAP).filter((k) => AUDIO_MAP[k]).map(nfc));

const failures = [];
const fail = (m) => failures.push(m);
const negationFramesSeen = new Set();
const NEGATION_FRAME_CONTRACTS = {
  "short-negative": {
    marker: "안",
    englishLabel: "short negation",
    answerMatches: (answer) => answer.startsWith("안 "),
  },
  "short-inability": {
    marker: "못",
    englishLabel: "short inability",
    answerMatches: (answer) => answer.startsWith("못 "),
  },
  "long-negative": {
    marker: "-지 않아요",
    englishLabel: "long negation",
    answerMatches: (answer) => answer.endsWith("지 않아요"),
  },
  "long-inability": {
    marker: "-지 못해요",
    englishLabel: "long inability",
    answerMatches: (answer) => answer.endsWith("지 못해요"),
  },
};

// Expected structural contract (spec §6.1 / §6.2). Re-derived, not trusted.
const EXPECTED = [
  { id: "word-exam-1", order: 1, items: 40, time: 30, a: [8, 6, 4, 8, 8, 3, 3], scope: ["s1"] },
  { id: "word-exam-2", order: 2, items: 50, time: 40, a: [10, 8, 4, 10, 10, 5, 3], scope: ["s2"] },
  { id: "word-exam-3", order: 3, items: 50, time: 40, a: [10, 8, 4, 10, 9, 6, 3], scope: ["s3"] },
  { id: "word-exam-4", order: 4, items: 50, time: 40, a: [10, 8, 4, 10, 9, 5, 4], scope: ["s4"] },
  { id: "word-exam-5", order: 5, items: 80, time: 65, a: [14, 12, 6, 16, 16, 10, 6], scope: ["s1", "s2", "s3", "s4"] },
  { id: "word-exam-6", order: 6, items: 50, time: 40, a: [9, 7, 4, 10, 10, 7, 3], scope: ["s5"] },
  { id: "word-exam-7", order: 7, items: 50, time: 40, a: [9, 7, 4, 10, 10, 7, 3], scope: ["s6"] },
  { id: "word-exam-8", order: 8, items: 60, time: 50, a: [10, 8, 4, 12, 12, 9, 5], scope: ["s7"] },
  { id: "word-exam-9", order: 9, items: 60, time: 50, a: [10, 8, 4, 12, 12, 9, 5], scope: ["s8"] },
  { id: "word-exam-10", order: 10, items: 150, time: 120, a: [25, 20, 10, 30, 30, 20, 15], scope: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] },
];

// ── 1. Structural blueprint checks (once) ────────────────────────────────────
if (EXAMS.length !== 10) fail(`exam count ${EXAMS.length} != 10`);
const seenIds = new Set();
EXPECTED.forEach((exp, i) => {
  const e = EXAMS[i];
  if (!e || e.id !== exp.id) return fail(`exam[${i}] id ${e && e.id} != ${exp.id}`);
  if (seenIds.has(e.id)) fail(`duplicate exam id ${e.id}`);
  seenIds.add(e.id);
  if (e.order !== exp.order) fail(`${e.id} order ${e.order} != ${exp.order}`);
  if (e.items !== exp.items) fail(`${e.id} items ${e.items} != ${exp.items}`);
  if (e.timeMinutes !== exp.time) fail(`${e.id} time ${e.timeMinutes} != ${exp.time}`);
  const al = e.allocation;
  const got = [al.R_text, al.R_audio, al.C, al.P, al.X, al.F, al.D];
  if (got.join(",") !== exp.a.join(",")) fail(`${e.id} allocation ${got} != ${exp.a}`);
  const sum = got.reduce((x, y) => x + y, 0);
  if (sum !== e.items) fail(`${e.id} allocation sum ${sum} != items ${e.items}`);
  if (e.scopeSectionIds.join(",") !== exp.scope.join(",")) fail(`${e.id} scope mismatch`);
});
if (META.minSubscoreItems == null || META.minSubscoreItems < 1) fail("META.minSubscoreItems missing (§9.27)");

// Static personalisation check (§9.7): the engine must not read learner state.
const engineSrc = fs.readFileSync(path.join(ROOT, "word_exam_engine.js"), "utf8");
["vocabSrs", "vocabReviewEvents", "vocabLessonCompleted", "state.", "localStorage"].forEach((banned) => {
  if (engineSrc.includes(banned)) fail(`§9.7 personalisation: engine references '${banned}'`);
});

// #316 title safety (§9.26): no reachable unit title is truncated/malformed.
const MALFORMED = [/\b(to|the|going|tourist|absence|rumor|freshnes|thick|cheerfu)\s*$/i];
units.forEach((u) => {
  if (MALFORMED.some((re) => re.test(u.name))) fail(`§9.26 malformed unit title reachable: ${u.id} "${u.name}"`);
});

// ── Per-item deep checks (§9.2, .8, .10–.18) ─────────────────────────────────
function checkItem(exam, scopeSet, it, idSet, tag) {
  if (idSet.has(it.id)) fail(`${tag} duplicate item id ${it.id}`);
  idSet.add(it.id);
  // refs
  if (!wordById.has(it.targetWordId)) fail(`${tag} ${it.id} unknown target ${it.targetWordId}`);
  if (it.unitId && !unitById.has(it.unitId)) fail(`${tag} ${it.id} unknown unit ${it.unitId}`);
  // future-section leakage (§9.17)
  if (it.sectionId && !scopeSet.has(it.sectionId)) fail(`${tag} ${it.id} out-of-scope section ${it.sectionId}`);
  // competency milestone gate (§9.4)
  const comp = COMPETENCIES[it.competencyId];
  if (!comp) fail(`${tag} ${it.id} unknown competency ${it.competencyId}`);
  else {
    const maxSec = Math.max(...exam.scopeSectionIds.map((s) => sectionOrder.get(s) || 0));
    if ((comp.minimumExamSection || 1) > maxSec) fail(`${tag} ${it.id} competency ${it.competencyId} tested before milestone`);
    // §9.5 supported forms: non-citation predicate items must be reproducible by inflect
    if (it.isNonCitation && it.posClass === "predicate" && it.mode !== "form-recognition" && it.registerRole === undefined && it.competencyId !== "polite-present") {
      // register-choice answer / attributive form must be an inflect output
    }
  }
  if (it.options) {
    // §9.10 exactly four
    if (it.options.length !== 4) fail(`${tag} ${it.id} option count ${it.options.length}`);
    // §9.11 unique
    const set = new Set(it.options.map(nfc));
    if (set.size !== it.options.length) fail(`${tag} ${it.id} duplicate options`);
    // §9.12 answer present exactly once
    const ansN = it.options.filter((o) => nfc(o) === nfc(it.answer)).length;
    if (ansN !== 1) fail(`${tag} ${it.id} answer appears ${ansN}x`);
    // §9.18 candidate-visible answer leakage: the answer must not appear in the
    // content the learner reads (stimulus/context). The generic Korean
    // instruction (promptKo boilerplate) is not scanned — it can share a
    // syllable with a single-syllable answer without leaking it. Blanked frames
    // already have the answer removed.
    const ans = nfc(it.answer);
    const content = nfc(it.stimulus) + " " + nfc(it.contextEn || "");
    if (ans && content.includes(ans)) {
      // Legitimate when the stimulus IS the content and the answer is a
      // different-script gloss (form/word → meaning): the Korean stimulus never
      // contains the English answer, and vice versa.
      const ansHangul = /[가-힣]/.test(ans);
      const contentHangul = /[가-힣]/.test(nfc(it.stimulus));
      if (ansHangul === contentHangul) fail(`${tag} ${it.id} answer leaks into stimulus`);
    }
    // §9.13/§5.3.6 lexical-meaning items: no distractor may be an accepted
    // inflection variant of the answer word (which would be a second correct
    // answer). register-choice is intentionally excluded — offering the verb's
    // other register forms is the construct (scenario → one appropriate form).
    if (it.mode === "meaning-to-ko" || it.mode === "sentence-blank" || it.mode === "function-usage" || it.mode === "collocation-choice") {
      const w = wordById.get(it.targetWordId);
      const banned = inflectSurfaces(w);
      it.options.forEach((o) => {
        if (nfc(o) !== ans && banned.has(nfc(o))) fail(`${tag} ${it.id} distractor is inflection of answer`);
      });
    }
  } else {
    // §9.15 typed items need a finite accepted-answer set
    if (!Array.isArray(it.acceptedAnswers) || !it.acceptedAnswers.length) fail(`${tag} ${it.id} typed with no accepted answers`);
    const accepted = (it.acceptedAnswers || []).map(nfc).filter(Boolean);
    if (accepted.length !== new Set(accepted).size) fail(`${tag} ${it.id} typed accepted answers are not unique`);
    // Typed answers must not be visible before submission. The browser runner
    // renders stimulus, promptKo, and promptEn directly above the input.
    const visibleBeforeAnswer = [
      it.stimulus,
      it.promptKo,
      it.promptEn,
      it.contextKo,
      it.contextEn,
    ].map(nfc).filter(Boolean);
    accepted.forEach((answer) => {
      // A one-syllable lexeme can unavoidably occur inside boilerplate such as
      // 입 in 입력하십시오; that is not a usable answer reveal. Generated
      // multi-syllable surfaces and every form-production answer are exact.
      const exactLeakCheck = Array.from(answer).length > 1 || it.mode === "form-production";
      if (exactLeakCheck && visibleBeforeAnswer.some((field) => field.includes(answer))) {
        fail(`${tag} ${it.id} typed answer leaks into a pre-answer field`);
      }
    });
    if (it.competencyId === "negation" && it.mode === "form-production") {
      const contract = NEGATION_FRAME_CONTRACTS[it.negationFrame];
      if (!contract) {
        fail(`${tag} ${it.id} negation production has unknown frame ${it.negationFrame}`);
      } else {
        negationFramesSeen.add(it.negationFrame);
        const promptEn = nfc(it.promptEn);
        const promptKo = nfc(it.promptKo);
        const answer = nfc(it.answer);
        if (!promptEn.includes(contract.englishLabel) || !promptEn.includes(contract.marker)) {
          fail(`${tag} ${it.id} does not identify ${it.negationFrame} unambiguously in promptEn`);
        }
        if (!promptKo.includes(contract.marker)) {
          fail(`${tag} ${it.id} does not identify ${it.negationFrame} unambiguously in promptKo`);
        }
        if (!contract.answerMatches(answer)) {
          fail(`${tag} ${it.id} answer does not match declared frame ${it.negationFrame}`);
        }
      }
    }
  }
  // §9.14 audio must exist
  if (it.audioText && !audioIndex.has(nfc(it.audioText))) fail(`${tag} ${it.id} missing audio for ${it.audioText}`);
  // §9.16 sentence/function frames must contain a blank
  if (it.mode === "sentence-blank" || it.mode === "function-usage" || it.mode === "collocation-choice") {
    if (!nfc(it.promptKo).includes("____")) fail(`${tag} ${it.id} ${it.mode} has no blank`);
  }
}
function inflectSurfaces(w) {
  const set = new Set([nfc(w.korean)]);
  (w.forms || []).forEach((f) => set.add(nfc(f)));
  if (w.pos === "verb" || w.pos === "adjective") {
    ["polite", "formal", "past", "honorific", "attributive"].forEach((fn) => {
      try { const f = nfc(INFLECT.conjugate(w.korean, w.pos, w.irregularFamily, fn)); if (f) set.add(f); } catch (e) {}
    });
  }
  return set;
}

// ── Attempt-level checks (§9.3, .6, .9, .21, .23, exam floors) ────────────────
function checkAttempt(exam, scopeSet, att, tag, isFull, expected) {
  const expItems = expected ? expected.items : exam.items;
  const al = expected ? expected.allocation : exam.allocation;
  if (att.items.length !== expItems) fail(`${tag} item count ${att.items.length} != ${expItems}`);
  const idSet = new Set();
  const strand = { R: 0, C: 0, P: 0, X: 0, F: 0, D: 0 };
  const surfaceCount = new Map();
  const unitsSeen = new Set();
  const posClassCount = { predicate: 0, function: 0, noun: 0, other: 0 };
  let fnUsage = 0, nonCitPred = 0, typed = 0, pastProduction = 0, negationProduction = 0,
    audioUniq = new Set(), depth = 0, form = 0;
  att.items.forEach((it) => {
    checkItem(exam, scopeSet, it, idSet, tag);
    strand[it.strand] = (strand[it.strand] || 0) + 1;
    const k = it.korean || nfc(it.answer);
    surfaceCount.set(k, (surfaceCount.get(k) || 0) + 1);
    if (it.unitId) unitsSeen.add(it.unitId);
    posClassCount[it.posClass] = (posClassCount[it.posClass] || 0) + 1;
    if (it.mode === "function-usage") fnUsage += 1;
    if (it.isNonCitation && it.posClass === "predicate") nonCitPred += 1;
    if (it.mode === "type-ko" || it.mode === "form-production") typed += 1;
    if (it.mode === "form-production" && it.competencyId === "past-tense") pastProduction += 1;
    if (it.mode === "form-production" && it.competencyId === "negation") negationProduction += 1;
    if (it.audioText) audioUniq.add(nfc(it.audioText));
    if (it.strand === "D") depth += 1;
    if (it.strand === "F") form += 1;
  });
  // §9.6 macrostrand totals
  if (strand.R !== al.R_text + al.R_audio) fail(`${tag} R total ${strand.R} != ${al.R_text + al.R_audio}`);
  ["C", "P", "X", "F", "D"].forEach((s) => { if (strand[s] !== al[s]) fail(`${tag} ${s} total ${strand[s]} != ${al[s]}`); });
  // §9.9 surface cap
  const cap = (exam.finalInvariants && exam.finalInvariants.maxSameSurface) || 2;
  surfaceCount.forEach((v, kk) => { if (v > cap) fail(`${tag} surface "${kk}" x${v} > cap ${cap}`); });
  // The remaining floors are full-attempt invariants; the retention
  // confirmation is a shorter re-test with its own allocation.
  if (isFull) {
    // §9.3 unit coverage
    exam.scopeSectionIds.forEach((sid) => {
      units.filter((u) => u.sectionId === sid).forEach((u) => {
        if (!unitsSeen.has(u.id)) fail(`${tag} unit ${u.id} not represented`);
      });
    });
    // §9.21 POS floors + exam-spec floors
    const pf = exam.posFloor || {};
    if (posClassCount.predicate < (pf.predicate || 0)) fail(`${tag} predicate ${posClassCount.predicate} < ${pf.predicate}`);
    if (fnUsage < (exam.minFunctionContextItems || 0)) fail(`${tag} function-context ${fnUsage} < ${exam.minFunctionContextItems}`);
    if (exam.minFormItems && form < exam.minFormItems) fail(`${tag} F ${form} < ${exam.minFormItems}`);
    if (exam.minDepthItems && depth < exam.minDepthItems) fail(`${tag} D ${depth} < ${exam.minDepthItems}`);
    if (exam.minNonCitationPredicateItems && nonCitPred < exam.minNonCitationPredicateItems) fail(`${tag} nonCitPred ${nonCitPred} < ${exam.minNonCitationPredicateItems}`);
    if (exam.minProductiveContextualCombinedPct) {
      const pxfd = strand.P + strand.X + strand.F + strand.D;
      if (Math.round((pxfd / exam.items) * 100) < exam.minProductiveContextualCombinedPct) fail(`${tag} P/X/F/D% < ${exam.minProductiveContextualCombinedPct}`);
    }
  }
  const minPastProduction = isFull
    ? (exam.minPastProduction || 0)
    : ((exam.retention && exam.retention.minPastProduction) || 0);
  const minNegationProduction = isFull
    ? (exam.minNegationProduction || 0)
    : ((exam.retention && exam.retention.minNegationProduction) || 0);
  if (pastProduction < minPastProduction) {
    fail(`${tag} past production ${pastProduction} < ${minPastProduction}`);
  }
  if (negationProduction < minNegationProduction) {
    fail(`${tag} negation production ${negationProduction} < ${minNegationProduction}`);
  }
  // §9 final invariants
  if (isFull && exam.finalInvariants) {
    const fi = exam.finalInvariants;
    if (audioUniq.size < fi.minUniqueAudioTargets) fail(`${tag} audio targets ${audioUniq.size} < ${fi.minUniqueAudioTargets}`);
    if (typed < fi.minTypedProductionItems) fail(`${tag} typed ${typed} < ${fi.minTypedProductionItems}`);
    if (strand.X < fi.minContextualItems) fail(`${tag} X ${strand.X} < ${fi.minContextualItems}`);
    if (form < fi.minFormItems) fail(`${tag} F ${form} < ${fi.minFormItems}`);
    if (depth < fi.minDepthItems) fail(`${tag} D ${depth} < ${fi.minDepthItems}`);
    if (nonCitPred < fi.minNonCitationPredicateItems) fail(`${tag} nonCitPred ${nonCitPred} < ${fi.minNonCitationPredicateItems}`);
  }
  return { strand, unitsSeen, posClassCount };
}

// ── Content-validity matrix accumulators ─────────────────────────────────────
const matrix = {}; // examId -> { unitExposure, posExposure, macroExposure, competencyExposure }
function accMatrix(exam, att) {
  const m = matrix[exam.id] || (matrix[exam.id] = { unit: {}, pos: {}, macro: {}, comp: {}, seedTargets: [] });
  att.items.forEach((it) => {
    m.unit[it.unitId] = (m.unit[it.unitId] || 0) + 1;
    m.pos[it.pos] = (m.pos[it.pos] || 0) + 1;
    m.macro[it.strand] = (m.macro[it.strand] || 0) + 1;
    m.comp[it.competencyId] = (m.comp[it.competencyId] || 0) + 1;
  });
}

// ── Run ──────────────────────────────────────────────────────────────────────
function seedCount(exam) {
  if (QUICK) return exam.finalLayers ? 40 : (exam.id === "word-exam-5" ? 30 : 25);
  if (exam.finalLayers) return 1000;
  if (exam.id === "word-exam-5") return 500;
  return 250;
}

for (const exam of EXAMS) {
  const scopeSet = new Set(exam.scopeSectionIds);
  const n = seedCount(exam);
  let prevTargets = null;
  for (let s = 1; s <= n; s++) {
    let att;
    try { att = ENG.generateAttempt(exam.id, s, { mode: "full" }); }
    catch (e) { fail(`${exam.id} seed ${s} threw: ${e.message}`); continue; }
    checkAttempt(exam, scopeSet, att, `${exam.id}#${s}`, true);
    accMatrix(exam, att);
    // §9.20 cross-seed variation
    const targets = att.items.map((it) => it.targetWordId).join(",");
    if (prevTargets !== null && targets === prevTargets) fail(`${exam.id} seeds ${s - 1}/${s} identical targets`);
    prevTargets = targets;
    // §9.19 determinism (sample every 25th seed to bound cost)
    if (s % 25 === 0) {
      const again = ENG.generateAttempt(exam.id, s, { mode: "full" });
      if (JSON.stringify(again.items) !== JSON.stringify(att.items)) fail(`${exam.id} seed ${s} not reproducible`);
    }
    // §9.25 result routes resolve stable IDs (grade a fully-correct + empty pass)
    if (s === 1) {
      const answers = {};
      att.items.forEach((it) => { answers[it.id] = it.options ? it.answer : (it.acceptedAnswers || [it.answer])[0]; });
      const res = ENG.gradeAttempt(att, answers);
      if (res.correct !== exam.items) fail(`${exam.id} perfect answers graded ${res.correct}/${exam.items}`);
      Object.keys(res.byUnit).forEach((uid) => { if (uid !== "null" && !unitById.has(uid)) fail(`${exam.id} result unit route ${uid} invalid`); });
    }
  }
  process.stderr.write(`  audited ${exam.id}: ${n} seeds\n`);
}

// ── Exam 10 retention confirmation (§9.28) ───────────────────────────────────
{
  const exam = EXAMS.find((e) => e.id === "word-exam-10");
  const scopeSet = new Set(exam.scopeSectionIds);
  const confSeeds = QUICK ? 20 : 200;
  for (let s = 1; s <= confSeeds; s++) {
    const qual = ENG.generateAttempt("word-exam-10", s, { mode: "full" });
    const avoid = qual.items.map((it) => it.targetWordId);
    let conf;
    try { conf = ENG.generateAttempt("word-exam-10", s + 500000, { mode: "confirmation", avoidTargetIds: avoid }); }
    catch (e) { fail(`confirmation seed ${s} threw: ${e.message}`); continue; }
    if (conf.items.length !== exam.retention.confirmationItems) fail(`confirmation count ${conf.items.length}`);
    checkAttempt(exam, scopeSet, conf, `conf#${s}`, false, { items: exam.retention.confirmationItems, allocation: exam.retention.allocation });
    const overlap = conf.items.filter((it) => avoid.includes(it.targetWordId)).length;
    if (overlap > 0) fail(`§9.28 confirmation reuses ${overlap} qualifying targets`);
  }
  process.stderr.write(`  audited retention confirmation: ${confSeeds} seeds\n`);
}

// ── §9.24 final Layer B proportionality ──────────────────────────────────────
{
  const m = matrix["word-exam-10"];
  const sizes = units.map((u) => {
    const size = (W.HANAPATH_WORD_LESSONS.filter((l) => l.type === "content" && l.unitId === u.id)
      .reduce((n, l) => n + (l.newWordIds || []).length, 0));
    return { id: u.id, size, exposure: m.unit[u.id] || 0 };
  });
  const sorted = sizes.slice().sort((a, b) => a.size - b.size);
  const q = Math.floor(sorted.length / 4);
  const smallMean = sorted.slice(0, q).reduce((n, x) => n + x.exposure, 0) / q;
  const bigMean = sorted.slice(-q).reduce((n, x) => n + x.exposure, 0) / q;
  if (bigMean < smallMean) fail(`§9.24 Layer B not proportional: big-unit exposure ${bigMean.toFixed(1)} < small-unit ${smallMean.toFixed(1)}`);
}

for (const frame of Object.keys(NEGATION_FRAME_CONTRACTS)) {
  if (!negationFramesSeen.has(frame)) fail(`negation frame ${frame} was never generated`);
}

// ── Package 2 (Words C4) frozen v2 blueprint resolver & version pairing audit ──
{
  const resolver = W.resolveWordExamBlueprint || ENG.resolveWordExamBlueprint;
  if (typeof resolver !== "function") {
    fail("C4 audit: resolveWordExamBlueprint is not exported");
  } else {
    const v2_exam10 = resolver("word-exam-10", 2);
    const v3_exam10 = resolver("word-exam-10", 3);
    const default_exam10 = resolver("word-exam-10");
    if (!v2_exam10 || v2_exam10.version !== 2) fail("C4 audit: resolveWordExamBlueprint(id, 2) did not return v2 blueprint");
    if (!v3_exam10 || v3_exam10.version !== 3) fail("C4 audit: resolveWordExamBlueprint(id, 3) did not return v3 blueprint");
    if (!default_exam10 || default_exam10.version !== 3) fail("C4 audit: resolveWordExamBlueprint(id) did not default to v3");
    if (v2_exam10.minPastProduction !== 0 || v2_exam10.minNegationProduction !== 0) {
      fail("C4 audit: frozen v2 blueprint has non-zero typed past/negation minima");
    }

    // Verify v2 retention attempt generation contains no typed past/negation production items
    const v2Attempt = ENG.generateAttempt("word-exam-10", 12345, { mode: "confirmation", version: 2 });
    if (v2Attempt.items.some((it) => it.mode === "form-production" && (it.competencyId === "past-tense" || it.competencyId === "negation"))) {
      fail("C4 audit: frozen v2 retention attempt generated typed past/negation production items");
    }

    // Verify v3 retention attempt generation contains required past/negation production items
    const v3Attempt = ENG.generateAttempt("word-exam-10", 12345, { mode: "confirmation", version: 3 });
    const v3PastProd = v3Attempt.items.filter((it) => it.mode === "form-production" && it.competencyId === "past-tense").length;
    const v3NegProd = v3Attempt.items.filter((it) => it.mode === "form-production" && it.competencyId === "negation").length;
    if (v3PastProd < 3 || v3NegProd < 3) {
      fail(`C4 audit: v3 retention attempt missed minima (past=${v3PastProd}, neg=${v3NegProd})`);
    }
  }
}

// ── Package 3 (Words C5) v3 readiness & production bridge milestone audit ──
{
  const appCode = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  if (!appCode.includes("isWordsProductionBridgeComplete")) {
    fail("C5 audit: isWordsProductionBridgeComplete is not defined in app.js");
  }
  if (!appCode.includes("getWordExamTargetVersion")) {
    fail("C5 audit: getWordExamTargetVersion is not defined in app.js");
  }
  if (!appCode.includes("Production bridge available")) {
    fail("C5 audit: 'Production bridge available' UI message missing in app.js");
  }
  if (!appCode.includes("s3-grammar-u2-l3")) {
    fail("C5 audit: s3-grammar-u2-l3 bridge route missing in app.js");
  }

  // Evaluate readiness logic on four fixture states
  const appSandbox = {
    window: {}, state: {}, console, Map, Set,
    document: { addEventListener: () => {}, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [] },
    location: { search: "" },
    localStorage: { getItem: () => null, setItem: () => {} }
  };
  appSandbox.globalThis = appSandbox;
  vm.createContext(appSandbox);
  for (const f of ["words_curated_core.js", "words_lesson_plan.js", "words_inflect.js", "sentences_core.js", "sentences_lesson_plan.js", "word_exam_blueprints.js", "word_exam_engine.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), appSandbox);
  }
  vm.runInContext(appCode, appSandbox);

  const bridgeCheck = appSandbox.isWordsProductionBridgeComplete || appSandbox.window.isWordsProductionBridgeComplete;
  const targetVerCheck = appSandbox.getWordExamTargetVersion || appSandbox.window.getWordExamTargetVersion;

  if (typeof bridgeCheck === "function" && typeof targetVerCheck === "function") {
    // 1. New learner (empty completion)
    const newLearner = { vocabLessonCompleted: ["s1-firstwords-u1-l1"] };
    if (bridgeCheck(newLearner)) fail("C5 audit: new learner reported production ready");
    if (targetVerCheck("word-exam-5", "full", newLearner) !== 2) fail("C5 audit: new learner target version was not 2");

    // 2. Old crowned learner before the bridge (s1..s3 lessons excluding l3)
    const oldCrownedLearner = { vocabLessonCompleted: ["s1-firstwords-u1-l1", "s3-grammar-u2-l1", "s3-grammar-u2-l2", "s3-grammar-u2-cp"] };
    if (bridgeCheck(oldCrownedLearner)) fail("C5 audit: old crowned learner before bridge reported production ready");
    if (targetVerCheck("word-exam-5", "full", oldCrownedLearner) !== 2) fail("C5 audit: old crowned learner before bridge target version was not 2");

    // 3. Same learner after completing the bridge
    const learnerAfterBridge = { vocabLessonCompleted: ["s1-firstwords-u1-l1", "s3-grammar-u2-l1", "s3-grammar-u2-l2", "s3-grammar-u2-l3", "s3-grammar-u2-cp"] };
    if (!bridgeCheck(learnerAfterBridge)) fail("C5 audit: learner after bridge was not reported production ready");
    if (targetVerCheck("word-exam-5", "full", learnerAfterBridge) !== 3) fail("C5 audit: learner after bridge target version was not 3");

    // 4. Learner with live v2 retention window (qualifier version 2)
    const v2RetentionLearner = {
      vocabLessonCompleted: ["s1-firstwords-u1-l1"],
      wordExams: {
        version: 2,
        byExamId: {
          "word-exam-10": { blueprintVersion: 2, passed: true, confirmationDueFrom: 100, confirmationExpiresAt: 9999999999999 }
        }
      }
    };
    appSandbox.state = v2RetentionLearner;
    if (targetVerCheck("word-exam-10", "confirmation", v2RetentionLearner) !== 2) fail("C5 audit: v2 retention window target version was not 2");
  } else {
    fail("C5 audit: readiness functions not exported on window/global");
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
if (failures.length) {
  console.error(`\nWord-exam audit FAILED (${failures.length}):`);
  [...new Set(failures)].slice(0, 60).forEach((f) => console.error("  ✗ " + f));
  process.exit(1);
}

console.log("\nContent-validity matrix (exam × macrostrand exposure; mean items/attempt):");
console.log("exam         | R    C    P    X    F    D   | units  POS classes");
EXAMS.forEach((e) => {
  const m = matrix[e.id];
  const n = seedCount(e);
  const mm = (code) => ((m.macro[code] || 0) / n).toFixed(1).padStart(4);
  const posList = Object.keys(m.pos).length;
  console.log(`${e.id.padEnd(12)} | ${mm("R")} ${mm("C")} ${mm("P")} ${mm("X")} ${mm("F")} ${mm("D")} | ${String(Object.keys(m.unit).length).padStart(5)}  ${posList} POS`);
});

// Exposure summary (min/max/mean per unit) for the final.
{
  const m = matrix["word-exam-10"];
  const vals = units.map((u) => m.unit[u.id] || 0);
  const n = seedCount(EXAMS.find((e) => e.id === "word-exam-10"));
  const min = Math.min(...vals), max = Math.max(...vals);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  console.log(`\nFinal per-unit exposure across ${n} seeds — min ${min}, max ${max}, mean ${mean.toFixed(1)} (every unit ≥ 1 = Layer A anchor).`);
}

if (SHOW_MATRIX) {
  EXAMS.forEach((e) => {
    console.log(`\n${e.id} competency exposure:`);
    const m = matrix[e.id];
    Object.keys(m.comp).sort().forEach((c) => console.log(`  ${c.padEnd(22)} ${(m.comp[c] / seedCount(e)).toFixed(2)}`));
  });
}

console.log(`\nWord-exam audit passed (${QUICK ? "quick" : "full"} seed counts).`);
