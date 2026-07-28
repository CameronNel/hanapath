#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import { detectAmbiguityFlags, normalizeSentenceExamAnswer } from "./lib/sentence-exam-ambiguity.mjs";
import { LOCKED_SELECTION_POLICY, auditCuratedBankState } from "./audit-sentence-exam-curated-bank.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REVISION = "curated-sentence-exam-v1-cb4";
const AUTHORED_BY = "GPT-5.6 Thinking / CB4 author";
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_curated_bank_cb4_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_curated_bank_cb4_reviews.json");
const BANK_FILE = join(ROOT, "sentence_exam_curated_bank.js");
const SHORTLIST_FILE = join(ROOT, "docs", "generated", "sentence_exam_shortlist.json");
const TYPED_TARGETS_BY_SECTION = Object.freeze({ 1: 33, 2: 36, 3: 36, 4: 36, 5: 36, 6: 36, 7: 36, 8: 39 });
const RECOGNITION_TARGETS_BY_SECTION = Object.freeze({ 1: 40, 2: 40, 3: 40, 4: 40, 5: 40, 6: 40, 7: 40, 8: 40 });

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
        unitId: lesson.unitId,
        sectionOrder: sectionOrder.get(unitToSection.get(lesson.unitId)) || null,
      });
    }
  }
  return routes;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function readJsonIfPresent(path) {
  try {
    return readJson(path);
  } catch {
    return null;
  }
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function checkFile(path, expected) {
  let current = "";
  try {
    current = readFileSync(path, "utf8");
  } catch {
    console.error(`Missing generated file: ${path}`);
    return false;
  }
  if (current !== expected) {
    console.error(`Stale generated file: ${path}`);
    return false;
  }
  console.log(`Generated file is current: ${path}`);
  return true;
}

function uniqueNormalized(values) {
  const seen = new Set();
  const output = [];
  for (const value of values || []) {
    if (typeof value !== "string" || !value.trim()) continue;
    const key = normalizeSentenceExamAnswer(value);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(value.trim());
  }
  return output;
}

function chooseTypedTemplate(candidate, prompt) {
  const tags = new Set(candidate.patternTags || []);
  const lower = prompt.toLowerCase();
  if (lower.includes("as for") || tags.has("topic-neun")) return "topic-statement";
  if (lower.includes("answering what or who") || tags.has("subject-i-ga")) return "focus-answer";
  if (tags.has("past-eosseoyo") || tags.has("future-geoyeyo") || tags.has("time-expression")) return "time-anchored-statement";
  if (tags.has("formal-nida") || tags.has("honorific-si") || lower.includes("formal") || lower.includes("respectfully")) return "register-forced-utterance";
  return "lexically-anchored-production";
}

function loadSource() {
  const W = loadGlobals([
    "sentences_core.js",
    "sentences_lesson_plan.js",
    "sentence_exam_eligibility_shard_a.js",
    "sentence_exam_eligibility_shard_b.js",
    "sentence_exam_eligibility_shard_c.js",
    "sentence_exam_eligibility_shard_d.js",
    "sentence_exam_eligibility.js",
    "sentence_exam_prompt_templates.js",
    "sentence_lesson_contrasts_sections_1_4.js",
    "sentence_lesson_contrasts_sections_5_8.js",
  ]);
  const shortlist = readJson(SHORTLIST_FILE);
  const sentences = Array.isArray(W.HANAPATH_SENTENCES) ? W.HANAPATH_SENTENCES : [];
  const sentenceMap = new Map(sentences.map((row) => [row.id, row]));
  const reviewedRows = W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.reviewedRows || {};
  const contrastEntries = [
    ...(W.HANAPATH_SENTENCE_LESSON_CONTRASTS_1_4?.entries || []),
    ...(W.HANAPATH_SENTENCE_LESSON_CONTRASTS_5_8?.entries || []),
  ];
  const contrastMap = new Map(contrastEntries.map((entry) => [entry.targetSentenceId, entry]));
  const routes = buildRoutes(W);
  const templates = W.HANAPATH_SENTENCE_EXAM_PROMPT_TEMPLATES;
  return { W, shortlist, sentences, sentenceMap, reviewedRows, contrastMap, routes, templates };
}

function typedEntryFromCandidate(candidate, source) {
  const row = source.sentenceMap.get(candidate.id);
  const contrast = source.contrastMap.get(candidate.id);
  if (!row || !contrast) return { rejected: "missing-live-row-or-lesson-contrast" };
  const prompt = contrast.controlledProduction?.promptEn || candidate.existingExamPromptEn;
  if (typeof prompt !== "string" || !prompt.trim()) return { rejected: "missing-controlled-prompt" };
  const review = source.reviewedRows[candidate.id] || null;
  const acceptedAnswers = uniqueNormalized(review?.acceptedAnswers || [row.korean]);
  const canonicalKey = normalizeSentenceExamAnswer(row.korean);
  const manualAlternatives = acceptedAnswers.filter((value) => normalizeSentenceExamAnswer(value) !== canonicalKey).slice(0, 4);
  const templateId = chooseTypedTemplate(candidate, prompt);
  const requiresLexicalAnchor = templateId === "lexically-anchored-production" || /use the lesson expression|using the word/i.test(prompt);
  const analysis = detectAmbiguityFlags(row, prompt, { requiresLexicalAnchor });
  const unresolvableFlags = analysis.flags.filter((flag) => ["productive-clause-family", "particle-or-order-family", "duplicate-canonical-target"].includes(flag));
  if (unresolvableFlags.length > 0) return { rejected: `unresolved-family:${unresolvableFlags.join(",")}` };
  const routes = source.routes.get(candidate.id) || [];
  if (routes.length === 0) return { rejected: "missing-live-route" };
  return {
    entry: {
      id: candidate.id,
      mode: "typed",
      templateId,
      examPromptEn: prompt.trim(),
      canonicalAnswer: row.korean,
      manualAlternatives,
      requiresLexicalAnchor,
      sourceLessonIds: [...new Set(routes.map((route) => route.lessonId))].sort(),
      sourceSectionOrder: candidate.sectionOrder,
      patternTags: [...(candidate.patternTags || [])].sort(),
      shortlistRank: candidate.rankWithinSection,
      shortlistScore: candidate.score,
      sourceCandidateClass: contrast.sourceCandidateClass || candidate.existingTypedClass || "canonical",
      lessonContrastRevision: contrast.provenance?.revision || contrast.revision || null,
      promptOrigin: contrast.promptReviewRequired ? "cb2-cb3-generated" : "reviewed-source-reuse",
      authoringAmbiguityFlags: [...analysis.flags].sort(),
      authoredBy: AUTHORED_BY,
      authoredRevision: REVISION,
      reviewStatus: "pending",
      reviewedBy: null,
      reviewedAt: null,
      reviewedRevision: null,
      reviewerNote: null,
    },
  };
}

function recognitionEntryFromCandidate(candidate, source) {
  const row = source.sentenceMap.get(candidate.id);
  const routes = source.routes.get(candidate.id) || [];
  if (!row || routes.length === 0) return { rejected: "missing-live-row-or-route" };
  return {
    entry: {
      id: candidate.id,
      mode: "recognition",
      templateId: "recognition-meaning",
      examPromptEn: "Choose the English meaning that matches the Korean sentence.",
      canonicalAnswer: row.korean,
      recognitionAnswerEn: row.english,
      manualAlternatives: [],
      requiresLexicalAnchor: false,
      sourceLessonIds: [...new Set(routes.map((route) => route.lessonId))].sort(),
      sourceSectionOrder: candidate.sectionOrder,
      patternTags: [...(candidate.patternTags || [])].sort(),
      shortlistRank: candidate.rankWithinSection,
      shortlistScore: candidate.score,
      authoredBy: AUTHORED_BY,
      authoredRevision: REVISION,
      reviewStatus: "not-required-by-cb4",
    },
  };
}

function acceptedKeys(entry) {
  return [entry.canonicalAnswer, ...(entry.manualAlternatives || [])]
    .map(normalizeSentenceExamAnswer)
    .filter(Boolean);
}

function reserveAnswers(entry, owners) {
  for (const key of acceptedKeys(entry)) {
    const previous = owners.get(key);
    if (previous && previous !== entry.id) return false;
  }
  for (const key of acceptedKeys(entry)) owners.set(key, entry.id);
  return true;
}

function selectSectionPool(candidates, count, makeEntry, source, owners, rejectionLog, mode) {
  const selected = [];
  for (const candidate of candidates) {
    const result = makeEntry(candidate, source);
    if (!result.entry) {
      rejectionLog.push({ id: candidate.id, mode, reason: result.rejected });
      continue;
    }
    if (!reserveAnswers(result.entry, owners)) {
      rejectionLog.push({ id: candidate.id, mode, reason: "accepted-answer-collision" });
      continue;
    }
    selected.push(result.entry);
    if (selected.length === count) break;
  }
  if (selected.length !== count) {
    throw new Error(`Could not select ${count} ${mode} entries; selected ${selected.length}.`);
  }
  return selected;
}

function countBySection(entries) {
  return Object.fromEntries(Array.from({ length: 8 }, (_, index) => {
    const section = index + 1;
    return [section, entries.filter((entry) => entry.sourceSectionOrder === section).length];
  }));
}

function countByTemplate(entries) {
  const counts = new Map();
  for (const entry of entries) counts.set(entry.templateId, (counts.get(entry.templateId) || 0) + 1);
  return Object.fromEntries([...counts].sort(([a], [b]) => a.localeCompare(b)));
}

export function buildCb4AuthoringPackage() {
  const source = loadSource();
  const answerOwners = new Map();
  const rejectionLog = [];
  const typedEntries = [];
  const recognitionEntries = [];

  for (let section = 1; section <= 8; section += 1) {
    const candidates = source.shortlist.typedCandidates
      .filter((candidate) => candidate.sectionOrder === section)
      .sort((a, b) => {
        const aFinite = a.existingTypedClass === "finite" ? 1 : 0;
        const bFinite = b.existingTypedClass === "finite" ? 1 : 0;
        return aFinite - bFinite || a.risks.length - b.risks.length || a.rankWithinSection - b.rankWithinSection || a.id.localeCompare(b.id);
      });
    typedEntries.push(...selectSectionPool(
      candidates,
      TYPED_TARGETS_BY_SECTION[section],
      typedEntryFromCandidate,
      source,
      answerOwners,
      rejectionLog,
      "typed",
    ));
  }

  for (let section = 1; section <= 8; section += 1) {
    const candidates = source.shortlist.recognitionCandidates
      .filter((candidate) => candidate.sectionOrder === section)
      .sort((a, b) => a.rankWithinSection - b.rankWithinSection || a.id.localeCompare(b.id));
    recognitionEntries.push(...selectSectionPool(
      candidates,
      RECOGNITION_TARGETS_BY_SECTION[section],
      recognitionEntryFromCandidate,
      source,
      answerOwners,
      rejectionLog,
      "recognition",
    ));
  }

  if (typedEntries.length !== LOCKED_SELECTION_POLICY.typedTargetSize) throw new Error("Typed target size drifted.");
  if (recognitionEntries.length !== LOCKED_SELECTION_POLICY.recognitionTargetSize) throw new Error("Recognition target size drifted.");
  const finiteCount = typedEntries.filter((entry) => entry.manualAlternatives.length > 0).length;
  const finiteShare = finiteCount / typedEntries.length;
  if (finiteShare > LOCKED_SELECTION_POLICY.maxFiniteTypedShare) {
    throw new Error(`Finite typed share ${(finiteShare * 100).toFixed(2)}% exceeds locked cap.`);
  }

  const entries = [...typedEntries, ...recognitionEntries];
  return {
    source,
    package: {
      schemaVersion: 1,
      revision: REVISION,
      authoredBy: AUTHORED_BY,
      state: "awaiting-independent-review",
      decisionRule: "Agent 1 authors and selects. A distinct integrator must individually approve every typed prompt, canonical answer, and manual alternative before the runtime bank is emitted.",
      selectionPolicy: LOCKED_SELECTION_POLICY,
      summary: {
        typedCount: typedEntries.length,
        recognitionCount: recognitionEntries.length,
        finiteTypedCount: finiteCount,
        finiteTypedShare: Number(finiteShare.toFixed(6)),
        typedBySection: countBySection(typedEntries),
        recognitionBySection: countBySection(recognitionEntries),
        typedByTemplate: countByTemplate(typedEntries),
        recognitionByTemplate: countByTemplate(recognitionEntries),
        rejectedCandidateCount: rejectionLog.length,
      },
      rejectionLog,
      entries,
    },
  };
}

function initialReviewEntry(entry, previous) {
  if (previous?.id === entry.id && previous?.authoredRevision === REVISION) {
    return {
      id: entry.id,
      authoredRevision: REVISION,
      reviewStatus: previous.reviewStatus || "pending",
      reviewedBy: previous.reviewedBy ?? null,
      reviewedAt: previous.reviewedAt ?? null,
      reviewedRevision: previous.reviewedRevision ?? null,
      reviewerNote: previous.reviewerNote ?? null,
      promptOverride: previous.promptOverride ?? null,
      manualAlternativesOverride: previous.manualAlternativesOverride ?? null,
    };
  }
  return {
    id: entry.id,
    authoredRevision: REVISION,
    reviewStatus: "pending",
    reviewedBy: null,
    reviewedAt: null,
    reviewedRevision: null,
    reviewerNote: null,
    promptOverride: null,
    manualAlternativesOverride: null,
  };
}

export function buildReviewManifest(authoringPackage, previousManifest = null) {
  const previousById = new Map((previousManifest?.entries || []).map((entry) => [entry.id, entry]));
  const typedEntries = authoringPackage.entries.filter((entry) => entry.mode === "typed");
  const entries = typedEntries.map((entry) => initialReviewEntry(entry, previousById.get(entry.id)));
  const approvedCount = entries.filter((entry) => entry.reviewStatus === "approved").length;
  return {
    schemaVersion: 1,
    revision: REVISION,
    authoredBy: AUTHORED_BY,
    state: approvedCount === entries.length ? "independently-approved" : "awaiting-independent-review",
    approvedCount,
    pendingCount: entries.length - approvedCount,
    entries,
  };
}

function validUtcTimestamp(value) {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)
    && Number.isFinite(Date.parse(value));
}

export function validateReviewManifest(authoringPackage, manifest, { requireApproved = false } = {}) {
  const errors = [];
  const typedEntries = authoringPackage.entries.filter((entry) => entry.mode === "typed");
  const typedMap = new Map(typedEntries.map((entry) => [entry.id, entry]));
  if (manifest?.schemaVersion !== 1) errors.push("CB4 review manifest schemaVersion must be 1.");
  if (manifest?.revision !== REVISION) errors.push(`CB4 review manifest revision must be ${REVISION}.`);
  const rows = Array.isArray(manifest?.entries) ? manifest.entries : [];
  if (rows.length !== typedEntries.length) errors.push(`CB4 review manifest must contain ${typedEntries.length} typed decisions.`);
  const seen = new Set();
  for (const review of rows) {
    if (!typedMap.has(review?.id) || seen.has(review?.id)) {
      errors.push(`CB4 review manifest has missing, unknown, or duplicate id '${review?.id}'.`);
      continue;
    }
    seen.add(review.id);
    const authored = typedMap.get(review.id);
    if (review.authoredRevision !== REVISION) errors.push(`${review.id}: authoredRevision is stale.`);
    if (review.reviewStatus === "pending") {
      if (requireApproved) errors.push(`${review.id}: independent review is still pending.`);
      if (review.reviewedBy || review.reviewedAt || review.reviewedRevision || review.reviewerNote) {
        errors.push(`${review.id}: pending review must not contain approval evidence.`);
      }
      continue;
    }
    if (review.reviewStatus !== "approved") {
      errors.push(`${review.id}: reviewStatus must be pending or approved.`);
      continue;
    }
    if (typeof review.reviewedBy !== "string" || !review.reviewedBy.trim()) errors.push(`${review.id}: reviewedBy is required.`);
    if (review.reviewedBy?.trim().toLowerCase() === authored.authoredBy.trim().toLowerCase()) errors.push(`${review.id}: reviewer must differ from author.`);
    if (!validUtcTimestamp(review.reviewedAt)) errors.push(`${review.id}: reviewedAt must be a valid UTC timestamp.`);
    if (review.reviewedRevision !== REVISION) errors.push(`${review.id}: reviewedRevision must match ${REVISION}.`);
    if (typeof review.reviewerNote !== "string" || review.reviewerNote.trim().length < 20) errors.push(`${review.id}: reviewerNote must be substantive.`);
    if (review.promptOverride != null && (typeof review.promptOverride !== "string" || !review.promptOverride.trim())) errors.push(`${review.id}: promptOverride must be null or non-empty.`);
    if (review.manualAlternativesOverride != null && !Array.isArray(review.manualAlternativesOverride)) errors.push(`${review.id}: manualAlternativesOverride must be null or an array.`);
    if ((review.manualAlternativesOverride || []).length > 4) errors.push(`${review.id}: no more than four manual alternatives are allowed.`);
  }
  return errors;
}

export function buildReviewedBank(authoringPackage, manifest) {
  const errors = validateReviewManifest(authoringPackage, manifest, { requireApproved: true });
  if (errors.length) throw new Error(errors.join("\n"));
  const reviews = new Map(manifest.entries.map((entry) => [entry.id, entry]));
  const entries = authoringPackage.entries.map((entry) => {
    if (entry.mode !== "typed") return { ...entry };
    const review = reviews.get(entry.id);
    return {
      ...entry,
      examPromptEn: review.promptOverride || entry.examPromptEn,
      manualAlternatives: review.manualAlternativesOverride == null
        ? [...entry.manualAlternatives]
        : uniqueNormalized(review.manualAlternativesOverride),
      reviewStatus: "approved",
      reviewedBy: review.reviewedBy,
      reviewedAt: review.reviewedAt,
      reviewedRevision: review.reviewedRevision,
      reviewerNote: review.reviewerNote,
    };
  });
  return {
    schemaVersion: 1,
    revision: REVISION,
    enabled: false,
    reviewState: "independently-approved",
    selectionPolicy: LOCKED_SELECTION_POLICY,
    entries,
  };
}

function bankText(bank) {
  return `(function () {\n  "use strict";\n\n  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = ${JSON.stringify(bank, null, 2)};\n})();\n`;
}

function loadBankFromText(text) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(text, sandbox, { filename: "sentence_exam_curated_bank.js" });
  return sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
}

export function auditCb4Package({ requireApproved = false } = {}) {
  const { source, package: authoringPackage } = buildCb4AuthoringPackage();
  const manifest = readJsonIfPresent(REVIEW_FILE);
  const errors = [];
  if (!manifest) errors.push("Missing CB4 review manifest.");
  else errors.push(...validateReviewManifest(authoringPackage, manifest, { requireApproved }));

  if (authoringPackage.summary.typedCount !== LOCKED_SELECTION_POLICY.typedTargetSize) errors.push("CB4 typed count does not match the locked audit constant.");
  if (authoringPackage.summary.recognitionCount !== LOCKED_SELECTION_POLICY.recognitionTargetSize) errors.push("CB4 recognition count does not match the locked audit constant.");
  for (let section = 1; section <= 8; section += 1) {
    if (authoringPackage.summary.typedBySection[section] < LOCKED_SELECTION_POLICY.minTypedPerSection) errors.push(`Section ${section} typed floor failed.`);
    if (authoringPackage.summary.recognitionBySection[section] < LOCKED_SELECTION_POLICY.minRecognitionPerSection) errors.push(`Section ${section} recognition floor failed.`);
  }

  const allApproved = manifest && manifest.entries.every((entry) => entry.reviewStatus === "approved");
  if (allApproved) {
    const expectedBank = buildReviewedBank(authoringPackage, manifest);
    let currentText = "";
    try {
      currentText = readFileSync(BANK_FILE, "utf8");
    } catch {
      errors.push("Reviewed CB4 bank file is missing.");
    }
    if (currentText) {
      const currentBank = loadBankFromText(currentText);
      const isCb4Runtime = currentBank?.revision === REVISION;
      const isCb6bSuccessor = currentBank?.revision === "curated-sentence-exam-v2-cb6b"
        && currentBank?.baseRevision === REVISION;
      if (isCb4Runtime && currentText !== bankText(expectedBank)) {
        errors.push("Reviewed CB4 bank file is stale relative to the authoring package and review manifest.");
      } else if (isCb6bSuccessor) {
        const successorById = new Map((currentBank.entries || []).map((entry) => [entry.id, entry]));
        for (const entry of expectedBank.entries) {
          if (JSON.stringify(successorById.get(entry.id)) !== JSON.stringify(entry)) {
            errors.push(`CB6B successor does not preserve reviewed CB4 entry ${entry.id}.`);
          }
        }
      } else if (!isCb4Runtime) {
        errors.push("Runtime curated bank is neither the reviewed CB4 bank nor its recognized CB6B successor.");
      }
      const result = auditCuratedBankState({
        bank: currentBank,
        templates: source.templates,
        sentences: source.sentences,
        reviewedRows: source.reviewedRows,
        routes: source.routes,
      });
      errors.push(...result.errors);
      if (isCb4Runtime && result.typedCount !== LOCKED_SELECTION_POLICY.typedTargetSize) errors.push("Reviewed bank typed count drifted.");
      if (isCb4Runtime && result.recognitionCount !== LOCKED_SELECTION_POLICY.recognitionTargetSize) errors.push("Reviewed bank recognition count drifted.");
    }
  } else if (requireApproved) {
    errors.push("CB4 package has not completed independent approval.");
  }

  return { errors, authoringPackage, manifest, allApproved };
}

function writePackage({ applyReviewed = false } = {}) {
  const { package: authoringPackage } = buildCb4AuthoringPackage();
  const previousManifest = readJsonIfPresent(REVIEW_FILE);
  const manifest = buildReviewManifest(authoringPackage, previousManifest);
  writeJson(AUTHORING_FILE, authoringPackage);
  writeJson(REVIEW_FILE, manifest);
  if (applyReviewed || manifest.state === "independently-approved") {
    const bank = buildReviewedBank(authoringPackage, manifest);
    writeFileSync(BANK_FILE, bankText(bank));
    console.log(`Wrote reviewed bank: ${BANK_FILE}`);
  }
  console.log(`Wrote authoring package: ${AUTHORING_FILE}`);
  console.log(`Wrote review manifest: ${REVIEW_FILE}`);
}

function checkPackage({ requireApproved = false } = {}) {
  const { package: authoringPackage } = buildCb4AuthoringPackage();
  const expectedAuthoring = `${JSON.stringify(authoringPackage, null, 2)}\n`;
  const okay = checkFile(AUTHORING_FILE, expectedAuthoring);
  const result = auditCb4Package({ requireApproved });
  if (result.errors.length > 0) {
    console.error(`CB4 package audit failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) console.error(`  - ${error}`);
    return false;
  }
  console.log(`CB4 package audit passed (${result.allApproved ? "independently approved" : "awaiting independent review"}).`);
  return okay;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--write")) {
    writePackage();
  } else if (process.argv.includes("--apply-reviewed")) {
    writePackage({ applyReviewed: true });
  } else if (process.argv.includes("--check")) {
    if (!checkPackage()) process.exit(1);
  } else if (process.argv.includes("--require-approved")) {
    if (!checkPackage({ requireApproved: true })) process.exit(1);
  } else {
    const { package: authoringPackage } = buildCb4AuthoringPackage();
    const manifest = buildReviewManifest(authoringPackage, readJsonIfPresent(REVIEW_FILE));
    console.log(JSON.stringify({
      revision: REVISION,
      typedCount: authoringPackage.summary.typedCount,
      recognitionCount: authoringPackage.summary.recognitionCount,
      finiteTypedCount: authoringPackage.summary.finiteTypedCount,
      finiteTypedShare: authoringPackage.summary.finiteTypedShare,
      typedBySection: authoringPackage.summary.typedBySection,
      recognitionBySection: authoringPackage.summary.recognitionBySection,
      pendingReviews: manifest.pendingCount,
      approvedReviews: manifest.approvedCount,
    }, null, 2));
  }
}
