#!/usr/bin/env node
// Audit the Form Checks declarative inventory (form_check_blueprints.js), Box B1.
//
//   node scripts/audit-form-checks.mjs           # report, exit 1 on any error
//   node scripts/audit-form-checks.mjs --pools   # also print computed pools
//
// Enforces the data-level slice of docs/FORM_CHECKS_PLAN_DRAFT.md §9: required
// checks present, unique ids, item counts honest against the real eligible
// pool (target key = (wordId, formName) for inflection checks; never padded),
// unlock + remediation routes resolve against the LIVE curriculum, irregular /
// modifier / register routing is correct, sentence unlocks resolve, no
// certification wording, and typed past/negation production stays gated behind
// Workstream C. Per-generated-target gating is B2; B1 enforces the milestone
// taught-before-tested proxy.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const printPools = process.argv.includes("--pools");

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["words_curated_core.js", "words_inflect.js", "words_lesson_plan.js", "sentences_lesson_plan.js", "form_check_blueprints.js"]) {
  vm.runInContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
}

const checks = sandbox.window.HANAPATH_FORM_CHECKS || [];
const words = sandbox.window.HANAPATH_CURATED_WORDS || [];
const lessons = sandbox.window.HANAPATH_WORD_LESSONS || [];
const units = sandbox.window.HANAPATH_WORD_UNITS || [];
const inflect = sandbox.window.HANAPATH_INFLECT;
const sentenceLessons = sandbox.window.HANAPATH_SENTENCE_LESSONS || [];
const sentenceSections = sandbox.window.HANAPATH_SENTENCE_SECTIONS || [];
const sentenceUnits = sandbox.window.HANAPATH_SENTENCE_UNITS || [];
const sentenceUnitSection = new Map(sentenceUnits.map((u) => [u.id, u.sectionId]));
const sentenceLessonSection = (lesson) => sentenceUnitSection.get(lesson.unitId)
  || (typeof lesson.id === "string" ? lesson.id.split("-")[0] : null);

const wordById = new Map(words.map((w) => [w.id, w]));
const lessonById = new Map(lessons.map((l) => [l.id, l]));
const unitById = new Map(units.map((u) => [u.id, u]));
const taughtWordIds = new Set(lessons.flatMap((l) => l.newWordIds || []));
const sentenceSectionIds = new Set([
  ...sentenceSections.map((s) => s.id),
  ...sentenceLessons.map((l) => l.sectionId).filter(Boolean),
  ...sentenceLessons.map((l) => l.stage).filter(Boolean),
]);

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);

// The plan's maximum item count per check (the honest pool caps at this).
const PLAN_MAX = {
  "form-check-polite-present": 10, "form-check-past-negation": 12,
  "form-check-particles-location": 12, "form-check-connectives": 12,
  "form-check-register-honorific": 12, "form-check-modifiers": 10,
  "form-check-irregular-d": 10, "form-check-irregular-b": 10,
  "form-check-irregular-s": 10, "form-check-irregular-h": 10,
  "form-check-irregular-reu": 10, "form-check-irregular-rieul": 10,
  "sentence-check-order": 12, "sentence-check-tense": 12,
  "sentence-check-negation": 10, "sentence-check-connectives": 12,
  "sentence-check-register": 12,
};
const REQUIRED_IDS = Object.keys(PLAN_MAX);

const PROHIBITED = /\b(passed|failed|certified|mastered|mastery|official|verified|tamper-?proof|TOPIK|CEFR)\b/i;

// Words taught by a check's unlock lessons and their units' content lessons —
// the milestone taught-before-tested set (B1 proxy).
function taughtSetForCheck(check) {
  const ids = new Set();
  const lessonIds = (check.unlock && check.unlock.lessonIds) || [];
  for (const lid of lessonIds) {
    const lesson = lessonById.get(lid);
    if (!lesson) continue;
    (lesson.newWordIds || []).forEach((id) => ids.add(id));
    const unit = unitById.get(lesson.unitId);
    if (unit) {
      (unit.lessonIds || []).forEach((sib) => {
        const sl = lessonById.get(sib);
        if (sl) (sl.newWordIds || []).forEach((id) => ids.add(id));
      });
    }
  }
  return ids;
}

function verifiedForms(word, formNames) {
  let n = 0;
  for (const fn of formNames) {
    let form = null;
    try { form = inflect.conjugate(word.korean, word.pos, word.irregularFamily, fn); } catch (e) { form = null; }
    if (form && form !== word.korean) n += 1;
  }
  return n;
}

// Two honest pool modes (the B1/B2 split of docs/FORM_CHECKS_PLAN_DRAFT.md):
//   TIGHT  — production/inflection checks whose eligible targets are a small,
//            enumerable set (irregular families, modifier production). The item
//            count MUST equal min(cap, pool); this is where honest reductions
//            live (e.g. ㅎ has one taught word). Target key = (wordId, formName).
//   AMPLE  — recognition/context/register checks that draw on many taught
//            targets and context frames. The pool is the taught-in-scope word
//            set; the item count must sit in 8–15 and not exceed it. Per-target
//            gating within a session is enforced by the B2 runner.
function taughtInScope(check) {
  return [...taughtSetForCheck(check)].map((id) => wordById.get(id)).filter(Boolean);
}
function poolMode(check) {
  if (check.pool && check.pool.source === "irregular-family") return "tight";
  if (check.id === "form-check-modifiers") return "tight";
  if (check.surface === "sentences") return "sentence";
  return "ample";
}
function computePool(check) {
  const mode = poolMode(check);
  if (mode === "tight") {
    if (check.pool && check.pool.source === "irregular-family") {
      const eligible = words.filter((w) => w.irregularFamily === check.targetFamily && taughtWordIds.has(w.id));
      return eligible.reduce((sum, w) => sum + verifiedForms(w, check.pool.formNames || ["past", "polite"]), 0);
    }
    // Modifier production: taught modifier predicates × verified modifier forms.
    const preds = taughtInScope(check).filter((w) => w.pos === "verb" || w.pos === "adjective");
    return preds.reduce((sum, w) => sum + verifiedForms(w, (check.pool && check.pool.formNames) || ["attributive"]), 0);
  }
  if (mode === "sentence") {
    return sentenceLessons.filter((l) => sentenceLessonSection(l) === check.pool.key).length * 8;
  }
  // AMPLE: taught targets in scope. Production adds inflected forms per predicate.
  const taught = taughtInScope(check);
  const formNames = check.pool && check.pool.formNames;
  const productionBonus = formNames
    ? taught.filter((w) => w.pos === "verb" || w.pos === "adjective").reduce((s, w) => s + verifiedForms(w, formNames), 0)
    : 0;
  return taught.length + productionBonus;
}

// ── Structural + routing validation ──────────────────────────────────────
const seen = new Set();
const matrix = [];
for (const check of checks) {
  const id = check.id || "(no id)";
  if (!check.id) err(`check ${JSON.stringify(check.title)} has no id`);
  else if (seen.has(check.id)) err(`duplicate check id: ${check.id}`);
  else seen.add(check.id);

  for (const field of ["titleKo", "title", "surface", "itemCount", "unlock", "modes", "routePolicy"]) {
    if (check[field] == null) err(`${id}: missing ${field}`);
  }
  if (PROHIBITED.test(check.title || "") || PROHIBITED.test(check.titleKo || "")) {
    err(`${id}: certification/exam wording in title`);
  }
  if (Array.isArray(check.notes ? [check.notes] : []) && PROHIBITED.test(check.notes || "")) {
    // notes may mention "mastery"/"production" contextually; only flag the hard tokens
    if (/\b(certified|official|verified|tamper-?proof|TOPIK|CEFR)\b/i.test(check.notes || "")) err(`${id}: certification wording in notes`);
  }

  // Unlock + remediation routes resolve.
  const lessonIds = (check.unlock && check.unlock.lessonIds) || [];
  for (const lid of lessonIds) if (!lessonById.has(lid)) err(`${id}: unlock lesson ${lid} does not resolve`);
  const sectionIds = (check.unlock && check.unlock.sectionsComplete) || [];
  for (const sid of sectionIds) if (!sentenceSectionIds.has(sid)) err(`${id}: unlock section ${sid} does not resolve`);
  if (check.surface === "words" && !lessonIds.length) err(`${id}: words check has no unlock lessonIds`);
  if (check.surface === "sentences" && !sectionIds.length) err(`${id}: sentence check has no unlock section`);

  const rem = check.remediation || {};
  for (const [axis, target] of Object.entries(rem)) {
    if (axis === "section") { if (!sentenceSectionIds.has(target)) err(`${id}: remediation section ${target} does not resolve`); continue; }
    if (!lessonById.has(target)) err(`${id}: remediation lesson ${target} (${axis}) does not resolve`);
  }

  // Family / axis routing correctness.
  if (check.targetFamily) {
    if (rem.default !== "s7-grammar-u4-l2") err(`${id}: irregular check must route to s7-grammar-u4-l2`);
  }
  if (check.id === "form-check-modifiers" && rem.default !== "s7-grammar-u4-l1") err(`${id}: modifier check must route to s7-grammar-u4-l1`);
  if (check.id === "form-check-register-honorific") {
    if (rem.register !== "s5-grammar-u3-l1") err(`${id}: register axis must route to s5-grammar-u3-l1`);
    if (rem.honorific !== "s5-grammar-u3-l2") err(`${id}: honorific axis must route to s5-grammar-u3-l2`);
  }

  // Typed past/negation production stays gated behind Workstream C.
  if (check.productionGated && (check.modes || []).some((m) => m === "form-production")) {
    err(`${id}: typed production mode present while production is gated (Workstream C incomplete)`);
  }

  // Honest item count vs computed pool.
  const pool = computePool(check);
  const cap = PLAN_MAX[check.id] || 15;
  const mode = poolMode(check);
  if (pool === 0) err(`${id}: empty eligible pool`);
  if (mode === "tight") {
    // Item count IS the honest live pool, capped at the plan maximum; a pool
    // below the 8-item floor yields a legitimately shorter check (resolution 2).
    const expected = Math.min(cap, pool);
    if (check.itemCount !== expected) {
      err(`${id}: item count ${check.itemCount} is not the honest pool (min(cap ${cap}, pool ${pool}) = ${expected}); do not pad or truncate`);
    }
  } else {
    if (check.itemCount < 8 || check.itemCount > 15) err(`${id}: item count ${check.itemCount} outside 8–15`);
    if (check.itemCount > pool) err(`${id}: item count ${check.itemCount} exceeds eligible pool ${pool}`);
  }

  matrix.push({ id, comp: (check.competencies || []).join("+"), modes: (check.modes || []).join(","), route: rem.default || rem.section || rem.register || "-", family: check.targetFamily || "-", count: check.itemCount, pool });
}

for (const rid of REQUIRED_IDS) if (!seen.has(rid)) err(`missing required check: ${rid}`);

// ── Report ────────────────────────────────────────────────────────────────
if (printPools || errors.length) {
  console.log("check × competency × mode × route × family — count / pool");
  for (const r of matrix) {
    console.log(`  ${r.id.padEnd(30)} ${r.comp.padEnd(28)} ${r.family.padEnd(11)} ${r.route.padEnd(16)} ${r.count}/${r.pool}`);
  }
}
console.log(`Checks: ${checks.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const w of warnings) console.log(`  warn  ${w}`);
console.log(`Errors: ${errors.length}`);
for (const e of errors) console.log(`  error ${e}`);
if (errors.length) process.exit(1);
console.log("Form Checks audit passed.");
