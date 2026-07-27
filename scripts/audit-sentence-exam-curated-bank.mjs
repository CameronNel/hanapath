#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import {
  CONTROLLED_CLAUSE_PATTERN_TAGS,
  detectAmbiguityFlags,
  normalizeSentenceExamAnswer,
  validateControlledClauseContract,
} from "./lib/sentence-exam-ambiguity.mjs";
import { SENTENCE_EXAM_FREEZE_SOURCE_FILES, auditFreezeManifest } from "./lib/sentence-exam-freeze.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const CONTROLLED_CLAUSE_RESOLVABLE_EXCLUSIONS = new Set([
  "complex-word-order-or-particle-variation",
  "connective-clause-continuation",
  "coordination-particle-or-order-ambiguity",
  "lexical-or-information-structure-ambiguity",
  "multiple-communicative-acts",
  "particle-or-word-order-ambiguity",
  "productive-clause-or-modality-variants",
  "productive-pragmatic-variants",
  "productive-word-order-family",
  "topic-subject-information-structure-ambiguity",
]);

export const LOCKED_SELECTION_POLICY = Object.freeze({
  typedTargetSize: 288,
  recognitionTargetSize: 320,
  minTypedPerSection: 32,
  minRecognitionPerSection: 24,
  maxTypedPerLesson: 1,
  maxRecognitionPerLesson: 2,
  maxFiniteTypedShare: 0.15,
  examSizes: Object.freeze({
    stage: Object.freeze({ total: 24, typed: 20, selected: 4 }),
    final: Object.freeze({ total: 50, typed: 40, selected: 10 }),
    retention: Object.freeze({ total: 25, typed: 20, selected: 5 }),
  }),
});

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of files) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return sandbox.window;
}

function buildRoutes(W) {
  const units = Array.isArray(W.HANAPATH_SENTENCE_UNITS) ? W.HANAPATH_SENTENCE_UNITS : [];
  const sections = Array.isArray(W.HANAPATH_SENTENCE_SECTIONS) ? W.HANAPATH_SENTENCE_SECTIONS : [];
  const lessons = Array.isArray(W.HANAPATH_SENTENCE_LESSONS) ? W.HANAPATH_SENTENCE_LESSONS : [];
  const unitToSection = new Map(units.map((unit) => [unit.id, unit.sectionId]));
  const sectionOrder = new Map(sections.map((section) => [section.id, section.order]));
  const routes = new Map();
  for (const lesson of lessons) {
    for (const sentenceId of lesson.sentenceIds || []) {
      if (!routes.has(sentenceId)) routes.set(sentenceId, []);
      routes.get(sentenceId).push({
        lessonId: lesson.id,
        sectionOrder: sectionOrder.get(unitToSection.get(lesson.unitId)) || null,
      });
    }
  }
  return routes;
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validIsoTimestamp(value) {
  return nonEmptyString(value)
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)
    && Number.isFinite(Date.parse(value));
}

function validateLockedPolicy(policy, errors) {
  if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
    errors.push("Curated bank selectionPolicy is missing or malformed.");
    return;
  }
  for (const key of [
    "typedTargetSize",
    "recognitionTargetSize",
    "minTypedPerSection",
    "minRecognitionPerSection",
    "maxTypedPerLesson",
    "maxRecognitionPerLesson",
    "maxFiniteTypedShare",
  ]) {
    if (policy[key] !== LOCKED_SELECTION_POLICY[key]) {
      errors.push(`selectionPolicy.${key} must equal locked value ${LOCKED_SELECTION_POLICY[key]}, got ${policy[key]}.`);
    }
  }
  for (const paper of ["stage", "final", "retention"]) {
    for (const key of ["total", "typed", "selected"]) {
      const actual = policy.examSizes?.[paper]?.[key];
      const expected = LOCKED_SELECTION_POLICY.examSizes[paper][key];
      if (actual !== expected) {
        errors.push(`selectionPolicy.examSizes.${paper}.${key} must equal locked value ${expected}, got ${actual}.`);
      }
    }
  }
}

function validateTypedReviewEvidence(entry, bankRevision, errors) {
  const prefix = `Curated typed entry ${entry.id}`;
  if (entry.reviewStatus !== "approved") {
    errors.push(`${prefix} lacks approved independent-review status.`);
  }
  if (!nonEmptyString(entry.authoredBy)) {
    errors.push(`${prefix} has no authoredBy identity.`);
  }
  if (!nonEmptyString(entry.reviewedBy)) {
    errors.push(`${prefix} has no reviewedBy identity.`);
  }
  if (nonEmptyString(entry.authoredBy) && nonEmptyString(entry.reviewedBy)
      && entry.authoredBy.trim().toLowerCase() === entry.reviewedBy.trim().toLowerCase()) {
    errors.push(`${prefix} must be reviewed by someone other than its author.`);
  }
  if (!validIsoTimestamp(entry.reviewedAt)) {
    errors.push(`${prefix} has no valid UTC reviewedAt timestamp.`);
  }
  if (!nonEmptyString(entry.reviewedRevision) || entry.reviewedRevision !== bankRevision) {
    errors.push(`${prefix} review evidence does not match bank revision '${bankRevision}'.`);
  }
  if (!nonEmptyString(entry.reviewerNote)) {
    errors.push(`${prefix} has no reviewerNote.`);
  }
}

export function auditCuratedBankState({ bank, templates, sentences, reviewedRows = {}, routes = new Map() }) {
  const errors = [];
  if (!bank || typeof bank !== "object" || Array.isArray(bank)) errors.push("Curated bank global is missing.");
  if (bank?.schemaVersion !== 1) errors.push(`Expected curated-bank schemaVersion 1, got ${bank?.schemaVersion}.`);
  if (!nonEmptyString(bank?.revision)) errors.push("Curated bank revision is missing.");
  if (!Array.isArray(bank?.entries)) errors.push("Curated bank entries must be an array.");
  if (!templates || templates.schemaVersion !== 1) errors.push("Prompt-template contract is missing or has the wrong schema version.");
  validateLockedPolicy(bank?.selectionPolicy, errors);

  const safeSentences = Array.isArray(sentences) ? sentences : [];
  const sentenceMap = new Map(safeSentences.map((row) => [row.id, row]));
  const templateMap = new Map((templates?.templates || []).map((template) => [template.id, template]));
  const canonicalCounts = new Map();
  for (const row of safeSentences) {
    const key = normalizeSentenceExamAnswer(row.korean);
    canonicalCounts.set(key, (canonicalCounts.get(key) || 0) + 1);
  }
  const duplicateCanonicalKeys = new Set([...canonicalCounts].filter(([, count]) => count > 1).map(([key]) => key));

  const seenIds = new Set();
  const acceptedOwner = new Map();
  const typedEntries = [];
  const recognitionEntries = [];

  for (const entry of bank?.entries || []) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push("Curated bank contains a non-object entry.");
      continue;
    }
    if (!entry.id || seenIds.has(entry.id)) {
      errors.push(`Curated entry has a missing or duplicate id: '${entry.id}'.`);
      continue;
    }
    seenIds.add(entry.id);

    const row = sentenceMap.get(entry.id);
    if (!row) {
      errors.push(`Curated entry ${entry.id} does not exist in sentences_core.js.`);
      continue;
    }
    if (!routes.has(entry.id) || routes.get(entry.id).length === 0) errors.push(`Curated entry ${entry.id} has no live lesson route.`);
    if (!templateMap.has(entry.templateId)) errors.push(`Curated entry ${entry.id} uses unknown template '${entry.templateId}'.`);
    if (!nonEmptyString(entry.examPromptEn)) errors.push(`Curated entry ${entry.id} has no examPromptEn.`);
    if (!Array.isArray(entry.manualAlternatives)) errors.push(`Curated entry ${entry.id} manualAlternatives must be an array.`);
    if ((entry.manualAlternatives || []).length > 4) errors.push(`Curated entry ${entry.id} has more than four manual alternatives.`);

    const canonical = normalizeSentenceExamAnswer(entry.canonicalAnswer);
    if (canonical !== normalizeSentenceExamAnswer(row.korean)) errors.push(`Curated entry ${entry.id} canonicalAnswer does not match the live Korean row.`);
    const accepted = [canonical, ...(entry.manualAlternatives || []).map(normalizeSentenceExamAnswer)].filter(Boolean);
    if (accepted.length !== new Set(accepted).size) errors.push(`Curated entry ${entry.id} has duplicate accepted answers after normalization.`);
    for (const answer of accepted) {
      const previous = acceptedOwner.get(answer);
      if (previous && previous !== entry.id) errors.push(`Accepted answer collision: '${answer}' belongs to both ${previous} and ${entry.id}.`);
      else acceptedOwner.set(answer, entry.id);
    }

    if (entry.mode === "typed") {
      typedEntries.push(entry);
      validateTypedReviewEvidence(entry, bank?.revision, errors);
      const review = reviewedRows[entry.id];
      const clauseTags = CONTROLLED_CLAUSE_PATTERN_TAGS.filter((tag) => (row.patternTags || []).includes(tag));
      const usesControlledClauseTemplate = entry.templateId === "controlled-clause-transformation";
      let controlledClauseValidation = { valid: false, errors: [] };

      if (clauseTags.length > 0 && !usesControlledClauseTemplate) {
        errors.push(`Curated typed entry ${entry.id} carries productive clause tag(s) ${clauseTags.join(", ")} but does not use the controlled-clause-transformation template.`);
      }
      if (usesControlledClauseTemplate && clauseTags.length === 0) {
        errors.push(`Curated typed entry ${entry.id} uses controlled-clause-transformation without an approved clause-sensitive tag.`);
      }
      if (usesControlledClauseTemplate) {
        if ((entry.manualAlternatives || []).length > 0) {
          errors.push(`Curated typed entry ${entry.id} uses controlled-clause-transformation but carries manual alternatives; the exact visible replacement contract permits only the canonical output.`);
        }
        controlledClauseValidation = validateControlledClauseContract(row, entry.examPromptEn, entry.controlledClause);
        for (const contractError of controlledClauseValidation.errors) {
          errors.push(`Curated typed entry ${entry.id} has an invalid controlled-clause contract: ${contractError}`);
        }
      }

      if (review?.typedClass === "excluded") {
        const historicalReasons = Array.isArray(review.exclusionReasons) ? review.exclusionReasons : [];
        const unresolvedHistoricalReasons = historicalReasons.filter(
          (reason) => !CONTROLLED_CLAUSE_RESOLVABLE_EXCLUSIONS.has(reason),
        );
        if (!controlledClauseValidation.valid) {
          errors.push(`Curated typed entry ${entry.id} contradicts the existing reviewed exclusion.`);
        } else if (historicalReasons.length === 0) {
          errors.push(`Curated typed entry ${entry.id} cannot supersede a historical exclusion with no recorded reason.`);
        } else if (unresolvedHistoricalReasons.length > 0) {
          errors.push(`Curated typed entry ${entry.id} has historical exclusion reason(s) not resolved by the controlled-clause contract: ${unresolvedHistoricalReasons.join(", ")}.`);
        }
      }
      const analysis = detectAmbiguityFlags(row, entry.examPromptEn, {
        duplicateCanonicalKeys,
        requiresLexicalAnchor: entry.requiresLexicalAnchor === true,
        controlledClauseContract: usesControlledClauseTemplate ? entry.controlledClause : null,
      });
      if (analysis.flags.length > 0) errors.push(`Curated typed entry ${entry.id} remains ambiguous: ${analysis.flags.join(", ")}.`);
    } else if (entry.mode === "recognition") {
      recognitionEntries.push(entry);
    } else {
      errors.push(`Curated entry ${entry.id} has invalid mode '${entry.mode}'.`);
    }
  }

  if (bank?.enabled === true) {
    const policy = LOCKED_SELECTION_POLICY;
    if (typedEntries.length !== policy.typedTargetSize) errors.push(`Enabled typed pool has ${typedEntries.length} entries; locked target is ${policy.typedTargetSize} exactly.`);
    if (recognitionEntries.length !== policy.recognitionTargetSize) errors.push(`Enabled recognition pool has ${recognitionEntries.length} entries; locked target is ${policy.recognitionTargetSize} exactly.`);

    const typedBySection = new Map();
    const recognitionBySection = new Map();
    const typedByLesson = new Map();
    const recognitionByLesson = new Map();
    for (const entry of typedEntries) {
      for (const route of routes.get(entry.id) || []) {
        typedBySection.set(route.sectionOrder, (typedBySection.get(route.sectionOrder) || 0) + 1);
        typedByLesson.set(route.lessonId, (typedByLesson.get(route.lessonId) || 0) + 1);
      }
    }
    for (const entry of recognitionEntries) {
      for (const route of routes.get(entry.id) || []) {
        recognitionBySection.set(route.sectionOrder, (recognitionBySection.get(route.sectionOrder) || 0) + 1);
        recognitionByLesson.set(route.lessonId, (recognitionByLesson.get(route.lessonId) || 0) + 1);
      }
    }
    for (let section = 1; section <= 8; section += 1) {
      if ((typedBySection.get(section) || 0) < policy.minTypedPerSection) errors.push(`Section ${section} has fewer than ${policy.minTypedPerSection} typed entries.`);
      if ((recognitionBySection.get(section) || 0) < policy.minRecognitionPerSection) errors.push(`Section ${section} has fewer than ${policy.minRecognitionPerSection} recognition entries.`);
    }
    for (const [lessonId, count] of typedByLesson) if (count > policy.maxTypedPerLesson) errors.push(`Lesson ${lessonId} exceeds the typed-entry cap.`);
    for (const [lessonId, count] of recognitionByLesson) if (count > policy.maxRecognitionPerLesson) errors.push(`Lesson ${lessonId} exceeds the recognition-entry cap.`);

    const finiteCount = typedEntries.filter((entry) => (entry.manualAlternatives || []).length > 0).length;
    const finiteShare = typedEntries.length ? finiteCount / typedEntries.length : 0;
    if (finiteShare > policy.maxFiniteTypedShare) errors.push(`Finite typed share ${(finiteShare * 100).toFixed(2)}% exceeds locked ${(policy.maxFiniteTypedShare * 100).toFixed(2)}%.`);
  }

  return { errors, typedCount: typedEntries.length, recognitionCount: recognitionEntries.length };
}

function main() {
  const W = loadGlobals([
    "sentences_core.js",
    "sentences_lesson_plan.js",
    "sentence_exam_eligibility_shard_a.js",
    "sentence_exam_eligibility_shard_b.js",
    "sentence_exam_eligibility_shard_c.js",
    "sentence_exam_eligibility_shard_d.js",
    "sentence_exam_eligibility.js",
    "sentence_exam_prompt_templates.js",
    "sentence_exam_curated_bank.js",
    "sentence_exam_curated_bank_freeze.js",
  ]);
  const bank = W.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
  const result = auditCuratedBankState({
    bank,
    templates: W.HANAPATH_SENTENCE_EXAM_PROMPT_TEMPLATES,
    sentences: Array.isArray(W.HANAPATH_SENTENCES) ? W.HANAPATH_SENTENCES : [],
    reviewedRows: W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.reviewedRows || {},
    routes: buildRoutes(W),
  });

  let manifest = null;
  try {
    manifest = JSON.parse(readFileSync(join(ROOT, "docs", "generated", "sentence_exam_curated_bank_cb5_freeze.json"), "utf8"));
  } catch {
    result.errors.push("CB5 curated-bank freeze manifest is missing or invalid JSON.");
  }
  const sourceFileContents = Object.fromEntries(
    SENTENCE_EXAM_FREEZE_SOURCE_FILES.map((path) => [path, readFileSync(join(ROOT, path))])
  );
  if (manifest) {
    result.errors.push(...auditFreezeManifest({ bank, manifest, sourceFileContents }).errors);
    if (JSON.stringify(W.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE) !== JSON.stringify(manifest)) {
      result.errors.push("Runtime CB5 freeze contract does not match the committed manifest.");
    }
  }
  if (bank?.enabled !== true) result.errors.push("CB5 requires the curated Sentence exam bank to be enabled.");
  if (bank?.freezeState !== "frozen") result.errors.push("CB5 requires freezeState 'frozen'.");
  if (!Object.isFrozen(bank)) result.errors.push("CB5 curated Sentence exam bank object is not runtime-frozen.");
  if (!Object.isFrozen(bank?.entries)) result.errors.push("CB5 curated Sentence exam entry array is not runtime-frozen.");

  console.log("Curated sentence exam bank audit");
  console.log("================================");
  console.log(`Enabled             : ${bank?.enabled === true ? "yes" : "no"}`);
  console.log(`Frozen revision     : ${bank?.freeze?.revision || "missing"}`);
  console.log(`Prompt hash         : ${bank?.freeze?.hashes?.promptsSha256 || "missing"}`);
  console.log(`Answer hash         : ${bank?.freeze?.hashes?.answersSha256 || "missing"}`);
  console.log(`Typed entries       : ${result.typedCount}`);
  console.log(`Recognition entries : ${result.recognitionCount}`);
  if (result.errors.length > 0) {
    console.error(`\nAudit failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  console.log("\nAudit passed cleanly.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
