#!/usr/bin/env node
// build-word-exam-competency-map.mjs — First gate for the Core Word Examination
// Suite (docs/CORE_WORD_EXAM_SPECS.md §3.3 / handover §2).
//
// Re-derives the competency→milestone map from the LIVE curriculum + curated
// data, cross-checks the authored HANAPATH_WORD_EXAM_COMPETENCIES map against
// it, proves where each assessable form is first taught/practised, and writes a
// human-reviewable report to docs/CORE_WORD_EXAM_COMPETENCY_MAP.md.
//
// It FAILS LOUDLY (exit 1) if the authored map drifts from live data, so exam
// generation can never test a competency before its teaching milestone.
//
// Usage:
//   node scripts/build-word-exam-competency-map.mjs         # write report
//   node scripts/build-word-exam-competency-map.mjs --check  # verify only

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const REPORT = path.join(ROOT, "docs", "CORE_WORD_EXAM_COMPETENCY_MAP.md");

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox);
  return sandbox.window;
}

const W = loadGlobals([
  "audio_map.js", "words_curated_core.js", "words_lesson_plan.js",
  "words_inflect.js", "word_exam_blueprints.js", "word_exam_engine.js",
]);

const words = W.HANAPATH_CURATED_WORDS;
const sections = W.HANAPATH_WORD_SECTIONS;
const units = W.HANAPATH_WORD_UNITS;
const lessons = W.HANAPATH_WORD_LESSONS;
const COMPETENCIES = W.HANAPATH_WORD_EXAM_COMPETENCIES;

const unitById = new Map(units.map((u) => [u.id, u]));
const sectionOrder = new Map(sections.map((s) => [s.id, s.order]));
const wordUnit = new Map();
lessons.forEach((l) => {
  if (l.type !== "content") return;
  (l.newWordIds || []).forEach((wid) => { const u = unitById.get(l.unitId); if (u) wordUnit.set(wid, u); });
});
// unit -> modes taught by its content lessons
const unitModes = new Map();
lessons.forEach((l) => {
  if (l.type !== "content") return;
  const set = unitModes.get(l.unitId) || new Set();
  (l.checkpoints || []).forEach((m) => set.add(m));
  unitModes.set(l.unitId, set);
});
// group -> words / earliest unit
function wordsInGroup(g) { return words.filter((w) => w.lessonGroup === g); }
function earliestUnitOf(list) {
  let best = null;
  list.forEach((w) => {
    const u = wordUnit.get(w.id);
    if (!u) return;
    const key = (sectionOrder.get(u.sectionId) || 0) * 1000 + (u.order || 0);
    if (!best || key < best.key) best = { key, unit: u };
  });
  return best ? best.unit : null;
}

const failures = [];
const fail = (m) => failures.push(m);

// ── Re-derive milestones from live data (the machine-readable report) ────────
// Maps each authored competency to a live-verified milestone record.
const GROUP_FOR_COMPETENCY = {
  "particle-function": "function-words-1",
  connectives: "connectives",
  "past-tense": "tense-negation",
  negation: "tense-negation",
  "formal-register": "endings-register",
  "subject-honorific": "honorifics",
  "honorific-lexical": "honorifics",
  "noun-modification": "noun-modification",
  "irregular-families": "irregular-families",
};

const records = {};
for (const [id, c] of Object.entries(COMPETENCIES)) {
  const rec = {
    competencyId: id,
    learnerLabel: c.learnerLabel,
    strands: c.strands,
    authoredFirstUnit: c.firstTeachingUnitId,
    firstProductionLessonId: c.firstProductionLessonId || null,
    minimumExamSection: c.minimumExamSection,
    scoredProduction: c.scoredProduction,
    acceptedFormsSource: c.acceptedFormsSource,
    derivedFirstUnit: null,
    supportingLessonIds: [],
    eligibleWordCount: 0,
    supportedModes: [],
    productionItemCount: 0,
    productionTargetIds: [],
    productionSupportingLessonIds: [],
    productionModes: [],
    productionAcceptedFormsSources: [],
    evidence: c.evidence,
  };
  const group = GROUP_FOR_COMPETENCY[id];
  if (group) {
    const list = wordsInGroup(group);
    // negation vs past split inside tense-negation
    let filtered = list;
    if (id === "past-tense") filtered = list.filter((w) => (w.tags || []).includes("past"));
    if (id === "negation") filtered = list.filter((w) => !(w.tags || []).includes("past"));
    if (id === "subject-honorific") filtered = list.filter((w) => w.honorificRole === "subject" || w.pos === "ending" || w.pos === "verb");
    const u = earliestUnitOf(filtered.length ? filtered : list);
    rec.derivedFirstUnit = u ? u.id : null;
    rec.eligibleWordCount = filtered.length;
    rec.supportingLessonIds = lessons.filter((l) => l.type === "content" && filtered.some((w) => (l.newWordIds || []).includes(w.id))).map((l) => l.id);
    const modes = new Set();
    rec.supportingLessonIds.forEach((lid) => {
      const l = lessons.find((x) => x.id === lid);
      (l.checkpoints || []).forEach((m) => modes.add(m));
    });
    rec.supportedModes = [...modes].sort();
  } else if (id === "lexeme-identity" || id === "polite-present") {
    rec.derivedFirstUnit = "s1-firstwords-u1";
    rec.eligibleWordCount = id === "polite-present"
      ? words.filter((w) => (w.pos === "verb" || w.pos === "adjective")).length
      : words.length;
    rec.supportedModes = ["ko-to-meaning", "meaning-to-ko", "type-ko"];
  } else {
    // depth competencies — per word, no single milestone
    rec.derivedFirstUnit = null;
    rec.eligibleWordCount = id === "sense-distinction"
      ? words.filter((w) => (w.contrastWith || []).length || w.senseKey).length
      : words.filter((w) => w.exampleKo).length;
    rec.supportedModes = ["sense-disambiguation", "collocation-choice"];
  }
  // ── Production evidence from the authored production lesson (Words C2) ─────
  // Proof source is lesson.authoredItems (NOT newWordIds): the typed production
  // items are authored, so the recognition-pool derivation above stays separate.
  if (c.firstProductionLessonId) {
    const prodLesson = lessons.find((l) => l.id === c.firstProductionLessonId);
    const authored = (prodLesson && prodLesson.authoredItems) || [];
    const prodItems = authored.filter((it) => it.competencyId === id && it.mode === "form-production");
    rec.productionItemCount = prodItems.length;
    rec.productionTargetIds = [...new Set(prodItems.map((it) => it.targetWordId))].sort();
    rec.productionSupportingLessonIds = [...new Set(prodItems.map((it) => it.supportingLessonId))].sort();
    rec.productionModes = [...new Set(prodItems.map((it) => it.mode))].sort();
    rec.productionAcceptedFormsSources = [...new Set(prodItems.map((it) => it.acceptedFormsSource))].sort();
    rec.supportingLessonIds = [...new Set([...rec.supportingLessonIds, c.firstProductionLessonId])].sort();
    rec.supportedModes = [...new Set([...rec.supportedModes, "form-production"])].sort();
  }
  records[id] = rec;

  // ── Verification (fail loudly on drift) ──────────────────────────────────
  if (c.firstTeachingUnitId) {
    if (!unitById.has(c.firstTeachingUnitId)) fail(`${id}: authored firstTeachingUnitId ${c.firstTeachingUnitId} does not exist`);
    if (group && rec.derivedFirstUnit && rec.derivedFirstUnit !== c.firstTeachingUnitId) {
      fail(`${id}: authored firstTeachingUnitId ${c.firstTeachingUnitId} != live-derived ${rec.derivedFirstUnit}`);
    }
    const u = unitById.get(c.firstTeachingUnitId);
    if (u) {
      const s = sectionOrder.get(u.sectionId) || 0;
      if (s > c.minimumExamSection) fail(`${id}: minimumExamSection ${c.minimumExamSection} precedes teaching section ${s}`);
    }
  }
}

// ── Past/negation production milestone (Words C2) ────────────────────────────
// s3-grammar-u2-l2 must stay receptive/contextual: no typed production mode.
const pastNegLesson = lessons.find((l) => l.id === "s3-grammar-u2-l2");
const pastNegModes = pastNegLesson ? new Set(pastNegLesson.checkpoints || []) : new Set();
const teachesTypedProduction = pastNegModes.has("type-ko") || pastNegModes.has("form-production");
if (teachesTypedProduction) {
  fail("past/negation: s3-grammar-u2-l2 now includes a typed production mode — it must stay receptive/contextual");
}

// The production bridge s3-grammar-u2-l3 must belong to the s3-grammar-u2 unit.
const pastNegUnit = unitById.get("s3-grammar-u2");
if (!pastNegUnit) {
  fail("past/negation: unit s3-grammar-u2 does not exist");
} else if (!(pastNegUnit.lessonIds || []).includes("s3-grammar-u2-l3")) {
  fail("past/negation: s3-grammar-u2 does not contain s3-grammar-u2-l3 in lessonIds");
}

// Exact C2 production-evidence proof for past-tense and negation.
const C2_EXPECT = {
  "past-tense": { count: 6, source: "inflect:past" },
  "negation": { count: 10, source: "authored:pattern" },
};
const C2_TARGETS = ["w0006_ikda", "w0007_deutda", "w0008_sseuda", "w0704_boda"];
const wordById = new Map(words.map((w) => [w.id, w]));
for (const [id, expect] of Object.entries(C2_EXPECT)) {
  const comp = COMPETENCIES[id];
  const rec = records[id];
  if (comp.scoredProduction !== true) fail(`${id}: blueprint scoredProduction must be true`);
  if (comp.firstProductionLessonId !== "s3-grammar-u2-l3") fail(`${id}: blueprint firstProductionLessonId must be s3-grammar-u2-l3`);
  if (comp.acceptedFormsSource !== expect.source) fail(`${id}: blueprint acceptedFormsSource must be ${expect.source}, found ${comp.acceptedFormsSource}`);
  const prodLesson = lessons.find((l) => l.id === "s3-grammar-u2-l3");
  if (!prodLesson) {
    fail(`${id}: production lesson s3-grammar-u2-l3 does not exist`);
  } else {
    if (prodLesson.type !== "content") fail(`${id}: production lesson s3-grammar-u2-l3 is not a content lesson`);
    if (prodLesson.unitId !== "s3-grammar-u2") fail(`${id}: production lesson s3-grammar-u2-l3 is not in unit s3-grammar-u2`);
  }
  if (rec.productionItemCount !== expect.count) fail(`${id}: expected ${expect.count} form-production items, found ${rec.productionItemCount}`);
  if (JSON.stringify(rec.productionTargetIds) !== JSON.stringify(C2_TARGETS)) fail(`${id}: production targets ${JSON.stringify(rec.productionTargetIds)} != ${JSON.stringify(C2_TARGETS)}`);
  for (const tid of rec.productionTargetIds) {
    if (!wordById.has(tid)) fail(`${id}: production target ${tid} does not exist in HANAPATH_CURATED_WORDS`);
  }
  if (rec.productionModes.length !== 1 || rec.productionModes[0] !== "form-production") fail(`${id}: every production mode must be form-production, found ${JSON.stringify(rec.productionModes)}`);
  if (rec.productionSupportingLessonIds.length !== 1 || rec.productionSupportingLessonIds[0] !== "s3-grammar-u2-l3") fail(`${id}: every production supporting lesson must be s3-grammar-u2-l3, found ${JSON.stringify(rec.productionSupportingLessonIds)}`);
  if (rec.productionAcceptedFormsSources.length !== 1 || rec.productionAcceptedFormsSources[0] !== expect.source) fail(`${id}: accepted-forms source must be ${expect.source}, found ${JSON.stringify(rec.productionAcceptedFormsSources)}`);
  const authored = (prodLesson && prodLesson.authoredItems) || [];
  const prodItems = authored.filter((it) => it.competencyId === id && it.mode === "form-production");
  for (const it of prodItems) {
    if (typeof it.prompt !== "string" || !it.prompt.trim()) fail(`${id}: production item has an empty prompt`);
    if (typeof it.answer !== "string" || !it.answer.trim()) fail(`${id}: production item has an empty answer`);
    if (!Array.isArray(it.acceptedAnswers) || it.acceptedAnswers.length === 0) {
      fail(`${id}: production item acceptedAnswers must be a non-empty array`);
    } else {
      for (const aa of it.acceptedAnswers) {
        if (typeof aa !== "string" || !aa.trim()) fail(`${id}: production item acceptedAnswers must contain only non-empty strings`);
      }
      if (!it.acceptedAnswers.includes(it.answer)) fail(`${id}: production item canonical answer "${it.answer}" is missing from acceptedAnswers`);
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
function tableRow(rec) {
  return `| \`${rec.competencyId}\` | ${rec.learnerLabel} | ${rec.strands.join("/")} | ${rec.authoredFirstUnit || "—"} | ${rec.derivedFirstUnit || "(per-word)"} | ${rec.firstProductionLessonId || "—"} | S${rec.minimumExamSection} | ${rec.scoredProduction ? "yes" : "no"} | ${rec.eligibleWordCount} | ${rec.supportedModes.join(", ") || "—"} |`;
}

const lines = [];
lines.push("# Core Word Examination Suite — competency milestone map");
lines.push("");
lines.push("> Generated by `scripts/build-word-exam-competency-map.mjs` from the live");
lines.push("> curriculum and curated data. Do not hand-edit. Re-run after changing the");
lines.push("> Words curriculum, curated bank, or `word_exam_blueprints.js`.");
lines.push("");
lines.push("This is the **first gate** of the Core Word Examination Suite: it proves that");
lines.push("every scored form competency is taught/practised before any exam may test it,");
lines.push("and is consumed by `word_exam_engine.js` (which gates every item by");
lines.push("`minimumExamSection`). The audit `scripts/audit-word-exams.mjs` re-checks the");
lines.push("same contract.");
lines.push("");
lines.push("## Milestone table");
lines.push("");
lines.push("| Competency | Learner label | Strands | Authored first unit | Live-derived first unit | First production lesson | Min exam | Scored production | Eligible words | Practised modes |");
lines.push("|---|---|---|---|---|---|---|---|---|---|");
for (const id of Object.keys(COMPETENCIES)) lines.push(tableRow(records[id]));
lines.push("");
lines.push("## Typed past/negation production evidence");
lines.push("");
lines.push("| Competency | Production lesson | Authored item count | Unique target count | Target ids | Mode | Accepted-forms source |");
lines.push("|---|---|---|---|---|---|---|");
for (const id of ["past-tense", "negation"]) {
  const rec = records[id];
  lines.push(`| \`${id}\` | ${rec.firstProductionLessonId || "—"} | ${rec.productionItemCount} | ${rec.productionTargetIds.length} | ${rec.productionTargetIds.join(", ")} | ${rec.productionModes.join(", ")} | ${rec.productionAcceptedFormsSources.join(", ")} |`);
}
lines.push("");
lines.push("## Where each production milestone first becomes eligible (spec §3.3)");
lines.push("");
lines.push("- **Past production:** eligible from **s3-grammar-u2-l3** (Section 3) — 6 reviewed typed" +
  " polite-past production items across four previously taught verbs, accepted-forms source `inflect:past`.");
lines.push("- **Negation production:** eligible from **s3-grammar-u2-l3** (Section 3) — 10 reviewed typed" +
  " 안, 못, -지 않아요, and -지 못해요 production items with finite authored answer sets," +
  " accepted-forms source `authored:pattern`.");
lines.push("- **Polite formal production:** eligible from **s5-grammar-u3** (Section 5), realised as" +
  " context-driven `register-choice` form selection (the spec forbids instruction-named form" +
  " prompts, so free typed conjugation is not used; typed lemma production supplies the P evidence).");
lines.push("- **Subject honorific production:** eligible from **s5-grammar-u3** (Section 5).");
lines.push("- **Modifier / irregular-family production:** eligible from **s7-grammar-u4** (Section 7).");
lines.push("- **Connective production:** eligible from **s3-grammar-u2** (Section 3), which has" +
  " form-recognition + form-production practice for connectives.");
lines.push("");
lines.push("## C2 scope note");
lines.push("");
lines.push("Words C2 changes competency evidence metadata only: `past-tense` and `negation` are now");
lines.push("production-eligible because `s3-grammar-u2-l3` teaches the reviewed typed items. v2 exam");
lines.push("generation, quotas, and paper lengths remain unchanged until the v3 generator work (Words C3).");
lines.push("");

if (failures.length) {
  console.error("Competency map verification FAILED:");
  failures.forEach((f) => console.error("  ✗ " + f));
  process.exit(1);
}

if (!process.argv.includes("--check")) {
  fs.writeFileSync(REPORT, lines.join("\n"));
  console.log("Wrote " + path.relative(ROOT, REPORT));
} else {
  console.log("Competency map matches live data (checked, not written).");
}
console.log(`Verified ${Object.keys(COMPETENCIES).length} competencies against live curriculum.`);
