#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");
const WITNESS_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_witness.json");
const INVENTORY_FILE = join(ROOT, "docs", "generated", "sentence_exam_inventory.json");
const EXPECTED_REVISION = "curated-sentence-exam-v2-cb6-authoring";
const EXPECTED_AUTHOR = "GPT-5.6 Thinking / CB6 capacity author";
const EXPECTED_ADDITIONS = 94;
const EXPECTED_TYPED = 71;
const EXPECTED_RECOGNITION = 23;
const FORM_TAGS = new Set([
  "present-polite", "past-polite", "future-geoyeyo", "formal-nida", "honorific-si",
  "imperative-seyo", "propositive-eyo", "copula-ieyo", "copula-negative-anieyo",
  "neg-an", "neg-mot", "neg-ji-anta", "want-go-sipda", "can-su-itda", "must-ya-dwaeda",
]);
const CONTEXT_TAGS = new Set([
  "topic-neun", "subject-i-ga", "object-eul-reul", "time-expression", "location-e",
  "location-eseo", "possessive-ui", "because-aseo", "direction-euro", "and-go",
  "with-hago-wa", "if-myeon", "existence-itda", "counter-phrase", "when-ttae",
  "also-do", "comparison-boda", "until-kkaji", "but-jiman", "only-man", "from-buteo",
  "question-polite",
]);
const ALLOCATIONS = Object.freeze({
  "sentence-exam-1": { P: 14, F: 3, X: 3, R: 2, C: 2 },
  "sentence-exam-2": { P: 14, F: 3, X: 3, R: 2, C: 2 },
  "sentence-exam-3": { P: 14, F: 3, X: 3, R: 2, C: 2 },
  "sentence-exam-4": { P: 14, F: 3, X: 3, R: 2, C: 2 },
  "sentence-exam-5": { P: 30, F: 6, X: 4, R: 5, C: 5 },
});
const TAG_FLOORS = Object.freeze({
  "sentence-exam-1": {
    "present-polite": 6, "topic-neun": 3, "subject-i-ga": 3, "object-eul-reul": 4,
    "location-e": 2, "location-eseo": 2, "copula-ieyo": 2, "question-polite": 2,
    "time-expression": 2,
  },
  "sentence-exam-2": {
    "present-polite": 4, "past-polite": 4, "future-geoyeyo": 3, "time-expression": 3,
    "object-eul-reul": 4, "subject-i-ga": 3, "topic-neun": 3, "location-e": 2,
    "location-eseo": 2, "neg-an": 2, "neg-mot": 1, "neg-ji-anta": 1,
    "want-go-sipda": 2, "can-su-itda": 2, "question-polite": 2,
  },
  "sentence-exam-3": {
    "past-polite": 4, "future-geoyeyo": 4, "present-polite": 3, "formal-nida": 3,
    "honorific-si": 3, "imperative-seyo": 2, "propositive-eyo": 1, "neg-an": 2,
    "neg-mot": 2, "neg-ji-anta": 2, "and-go": 2, "but-jiman": 2,
    "because-aseo": 2, "if-myeon": 2, "when-ttae": 1, "object-eul-reul": 3,
    "subject-i-ga": 3, "topic-neun": 2,
  },
  "sentence-exam-4": {
    "present-polite": 3, "past-polite": 4, "future-geoyeyo": 4, "formal-nida": 4,
    "honorific-si": 4, "object-eul-reul": 3, "subject-i-ga": 3, "topic-neun": 3,
    "time-expression": 3, "neg-an": 2, "neg-mot": 2, "neg-ji-anta": 2,
    "and-go": 2, "but-jiman": 2, "because-aseo": 2, "if-myeon": 2,
    "when-ttae": 2, "want-go-sipda": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
    "question-polite": 2, "imperative-seyo": 2,
  },
  "sentence-exam-5": {
    "object-eul-reul": 4, "present-polite": 4, "subject-i-ga": 4, "past-polite": 5,
    "topic-neun": 4, "time-expression": 3, "location-e": 3, "location-eseo": 3,
    "possessive-ui": 2, "because-aseo": 2, "imperative-seyo": 2, "copula-ieyo": 2,
    "direction-euro": 2, "honorific-si": 4, "and-go": 2, "question-polite": 2,
    "with-hago-wa": 2, "formal-nida": 4, "if-myeon": 2, "existence-itda": 2,
    "counter-phrase": 2, "when-ttae": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
    "also-do": 2, "comparison-boda": 2, "want-go-sipda": 2, "neg-ji-anta": 2,
    "neg-an": 2, "neg-mot": 2, "future-geoyeyo": 5, "until-kkaji": 1,
    "propositive-eyo": 1, "but-jiman": 2, "only-man": 1, "from-buteo": 1,
    "copula-negative-anieyo": 2,
  },
});
const RETENTION_TAG_FLOORS = Object.freeze({
  "object-eul-reul": 2, "present-polite": 2, "subject-i-ga": 2, "past-polite": 3,
  "topic-neun": 2, "time-expression": 2, "location-e": 2, "location-eseo": 2,
  "possessive-ui": 1, "because-aseo": 1, "imperative-seyo": 1, "copula-ieyo": 1,
  "direction-euro": 1, "honorific-si": 2, "and-go": 1, "question-polite": 1,
  "with-hago-wa": 1, "formal-nida": 2, "if-myeon": 1, "existence-itda": 1,
  "counter-phrase": 1, "when-ttae": 1, "can-su-itda": 1, "must-ya-dwaeda": 1,
  "also-do": 1, "comparison-boda": 1, "want-go-sipda": 1, "neg-ji-anta": 1,
  "neg-an": 1, "neg-mot": 1, "future-geoyeyo": 3, "until-kkaji": 1,
  "propositive-eyo": 1, "but-jiman": 1, "only-man": 1, "from-buteo": 1,
  "copula-negative-anieyo": 1,
});

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function loadBank() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of ["sentence_exam_curated_bank.js", "sentence_exam_curated_bank_freeze.js"]) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
}

function normalize(value) {
  return String(value ?? "").normalize("NFC").trim().replace(/\s+/g, " ");
}

function sectionFloors(examId) {
  if (examId === "sentence-exam-1") return { "section-1": 8, "section-2": 8 };
  if (examId === "sentence-exam-5") {
    return Object.fromEntries(Array.from({ length: 8 }, (_, index) => [`section-${index + 1}`, 5]));
  }
  const stage = Number(examId.slice(-1));
  return Object.fromEntries(Array.from({ length: stage }, (_, index) => [
    `band-${index + 1}`,
    index + 1 === stage ? 8 : 3,
  ]));
}

function candidateStrands(entry) {
  if (entry.mode === "recognition") return new Set(["R", "C"]);
  const strands = new Set(["P"]);
  if (entry.patternTags.some((tag) => FORM_TAGS.has(tag))) strands.add("F");
  if (entry.patternTags.some((tag) => CONTEXT_TAGS.has(tag))) strands.add("X");
  return strands;
}

function auditLessonCaps(entries, failures) {
  for (const [mode, cap] of [["typed", 1], ["recognition", 2]]) {
    const counts = new Map();
    for (const entry of entries.filter((item) => item.mode === mode)) {
      for (const lessonId of entry.sourceLessonIds || []) {
        counts.set(lessonId, (counts.get(lessonId) || 0) + 1);
      }
    }
    for (const [lessonId, count] of counts) {
      if (count > cap) failures.push(`${mode} lesson cap exceeded at ${lessonId}: ${count}/${cap}`);
    }
  }
}

function auditWitness(examId, attempts, entriesById, failures) {
  const allocations = ALLOCATIONS[examId];
  const tagFloors = TAG_FLOORS[examId];
  const scopeMax = examId === "sentence-exam-5" ? 8 : Number(examId.slice(-1)) * 2;
  if (!Array.isArray(attempts) || attempts.length !== 5) {
    failures.push(`${examId}: witness must contain exactly five attempts`);
    return;
  }
  const acrossAttempts = new Set();
  attempts.forEach((items, attemptIndex) => {
    if (!Array.isArray(items)) {
      failures.push(`${examId} attempt ${attemptIndex + 1}: items are missing`);
      return;
    }
    const strandCounts = {};
    const tagCounts = {};
    const coverageCounts = {};
    const withinAttempt = new Set();
    for (const selected of items) {
      const entry = entriesById.get(selected.id);
      if (!entry) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: unknown entry ${selected.id}`);
        continue;
      }
      if (entry.sourceSectionOrder > scopeMax) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: ${entry.id} is outside section scope`);
      }
      const targetKey = normalize(entry.canonicalAnswer);
      if (withinAttempt.has(targetKey)) failures.push(`${examId} attempt ${attemptIndex + 1}: duplicate target ${entry.id}`);
      if (acrossAttempts.has(targetKey)) failures.push(`${examId}: freshness reuse across attempts for ${entry.id}`);
      withinAttempt.add(targetKey);
      acrossAttempts.add(targetKey);
      const strands = candidateStrands(entry);
      if (!strands.has(selected.strand)) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: ${entry.id} cannot serve strand ${selected.strand}`);
      }
      strandCounts[selected.strand] = (strandCounts[selected.strand] || 0) + 1;
      for (const tag of entry.patternTags) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      coverageCounts[`section-${entry.sourceSectionOrder}`] = (coverageCounts[`section-${entry.sourceSectionOrder}`] || 0) + 1;
      const band = Math.ceil(entry.sourceSectionOrder / 2);
      coverageCounts[`band-${band}`] = (coverageCounts[`band-${band}`] || 0) + 1;
    }
    const expectedCount = Object.values(allocations).reduce((sum, value) => sum + value, 0);
    if (items.length !== expectedCount) {
      failures.push(`${examId} attempt ${attemptIndex + 1}: item count ${items.length}/${expectedCount}`);
    }
    for (const [strand, floor] of Object.entries(allocations)) {
      if ((strandCounts[strand] || 0) !== floor) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: strand ${strand} ${(strandCounts[strand] || 0)}/${floor}`);
      }
    }
    for (const [tag, floor] of Object.entries(tagFloors)) {
      if ((tagCounts[tag] || 0) < floor) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: tag ${tag} ${(tagCounts[tag] || 0)}/${floor}`);
      }
    }
    for (const [coverage, floor] of Object.entries(sectionFloors(examId))) {
      if ((coverageCounts[coverage] || 0) < floor) {
        failures.push(`${examId} attempt ${attemptIndex + 1}: coverage ${coverage} ${(coverageCounts[coverage] || 0)}/${floor}`);
      }
    }
  });
}

export function auditCapacityRemediationState({ authoring, reviews, witness, inventory, bank, requireApproved = false }) {
  const failures = [];
  if (authoring.revision !== EXPECTED_REVISION) failures.push(`authoring revision mismatch: ${authoring.revision}`);
  if (reviews.revision !== EXPECTED_REVISION) failures.push(`review revision mismatch: ${reviews.revision}`);
  if (witness.revision !== EXPECTED_REVISION) failures.push(`witness revision mismatch: ${witness.revision}`);
  if (authoring.authoredBy !== EXPECTED_AUTHOR || reviews.authoredBy !== EXPECTED_AUTHOR) failures.push("author identity mismatch");
  if (!Array.isArray(authoring.entries) || authoring.entries.length !== EXPECTED_ADDITIONS) {
    failures.push(`addition count ${authoring.entries?.length}/${EXPECTED_ADDITIONS}`);
  }
  const typed = authoring.entries.filter((entry) => entry.mode === "typed");
  const recognition = authoring.entries.filter((entry) => entry.mode === "recognition");
  if (typed.length !== EXPECTED_TYPED) failures.push(`typed additions ${typed.length}/${EXPECTED_TYPED}`);
  if (recognition.length !== EXPECTED_RECOGNITION) failures.push(`recognition additions ${recognition.length}/${EXPECTED_RECOGNITION}`);
  const inventoryById = new Map(inventory.inventory.map((row) => [row.id, row]));
  const bankIds = new Set(bank.entries.map((entry) => entry.id));
  const ids = new Set();
  const targetKeys = new Map(bank.entries.map((entry) => [normalize(entry.canonicalAnswer), entry.id]));
  for (const entry of authoring.entries) {
    if (ids.has(entry.id)) failures.push(`duplicate CB6 id: ${entry.id}`);
    ids.add(entry.id);
    if (bankIds.has(entry.id)) failures.push(`CB6 id already exists in bank: ${entry.id}`);
    const row = inventoryById.get(entry.id);
    if (!row) {
      failures.push(`missing inventory row: ${entry.id}`);
      continue;
    }
    if (normalize(entry.canonicalAnswer) !== normalize(row.korean)) failures.push(`${entry.id}: canonical answer drift`);
    if (entry.englishMeaning !== row.english) failures.push(`${entry.id}: English meaning drift`);
    if (Number(entry.sourceSectionOrder) !== Number(row.candidateAssessment?.primarySection || row.sectionOrders?.[0])) {
      failures.push(`${entry.id}: section drift`);
    }
    if (JSON.stringify(entry.sourceLessonIds) !== JSON.stringify(row.lessonIds)) failures.push(`${entry.id}: lesson route drift`);
    if (JSON.stringify(entry.patternTags) !== JSON.stringify(row.patternTags)) failures.push(`${entry.id}: tag drift`);
    const targetKey = normalize(entry.canonicalAnswer);
    if (targetKeys.has(targetKey)) failures.push(`${entry.id}: target collision with ${targetKeys.get(targetKey)}`);
    targetKeys.set(targetKey, entry.id);
    if (!entry.examPromptEn || typeof entry.examPromptEn !== "string") failures.push(`${entry.id}: missing prompt`);
    if (entry.mode === "recognition" && entry.recognitionAnswerEn !== row.english) failures.push(`${entry.id}: recognition answer drift`);
    if (entry.reviewStatus !== "pending") failures.push(`${entry.id}: authoring item must remain pending in worker packet`);
  }
  const reviewById = new Map((reviews.entries || []).map((entry) => [entry.id, entry]));
  if (reviewById.size !== EXPECTED_ADDITIONS) failures.push(`review manifest size ${reviewById.size}/${EXPECTED_ADDITIONS}`);
  for (const entry of authoring.entries) {
    const review = reviewById.get(entry.id);
    if (!review) {
      failures.push(`${entry.id}: missing review row`);
      continue;
    }
    if (review.mode !== entry.mode) failures.push(`${entry.id}: review mode drift`);
    if (requireApproved) {
      if (review.reviewStatus !== "approved") failures.push(`${entry.id}: independent approval required`);
      if (!review.reviewedBy || review.reviewedBy === EXPECTED_AUTHOR) failures.push(`${entry.id}: invalid independent reviewer`);
      if (review.reviewedRevision !== EXPECTED_REVISION) failures.push(`${entry.id}: stale reviewed revision`);
      if (!review.reviewerNote || review.reviewerNote.trim().length < 40) failures.push(`${entry.id}: reviewer note is not substantive`);
    } else if (review.reviewStatus !== "pending") {
      failures.push(`${entry.id}: unexpected non-pending review status before integrator review`);
    }
  }
  const combined = [...bank.entries, ...authoring.entries].map((entry) => {
    const row = inventoryById.get(entry.id);
    return {
      ...entry,
      sourceLessonIds: row?.lessonIds || entry.sourceLessonIds || [],
      sourceSectionOrder: Number(row?.candidateAssessment?.primarySection || row?.sectionOrders?.[0] || entry.sourceSectionOrder),
      patternTags: row?.patternTags || entry.patternTags || [],
      canonicalAnswer: row?.korean || entry.canonicalAnswer,
    };
  });
  auditLessonCaps(combined, failures);
  const entriesById = new Map(combined.map((entry) => [entry.id, entry]));
  for (const examId of Object.keys(ALLOCATIONS)) {
    auditWitness(examId, witness.exams?.[examId], entriesById, failures);
  }
  const stage1Typed = new Set(combined
    .filter((entry) => entry.mode === "typed" && Number(entry.sourceSectionOrder) <= 2)
    .map((entry) => normalize(entry.canonicalAnswer)));
  if (stage1Typed.size < 100) failures.push(`Stage 1 typed capacity ${stage1Typed.size}/100`);
  const finalTags = {};
  for (const entry of combined) {
    for (const tag of entry.patternTags || []) {
      if (!finalTags[tag]) finalTags[tag] = new Set();
      finalTags[tag].add(normalize(entry.canonicalAnswer));
    }
  }
  for (const [tag, finalFloor] of Object.entries(TAG_FLOORS["sentence-exam-5"])) {
    const retentionFloor = RETENTION_TAG_FLOORS[tag] || 0;
    const required = Math.max(5 * finalFloor, finalFloor + retentionFloor);
    const count = finalTags[tag]?.size || 0;
    if (count < required) failures.push(`final tag pool ${tag} ${count}/${required}`);
  }
  return {
    ok: failures.length === 0,
    failures,
    summary: {
      baseEntries: bank.entries.length,
      additions: authoring.entries.length,
      projectedEntries: combined.length,
      typedAdditions: typed.length,
      recognitionAdditions: recognition.length,
      stage1TypedDistinctTargets: stage1Typed.size,
      witnessExams: Object.keys(witness.exams || {}).length,
      independentReviewRequired: reviews.entries.filter((entry) => entry.reviewStatus !== "approved").length,
    },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = auditCapacityRemediationState({
    authoring: readJson(AUTHORING_FILE),
    reviews: readJson(REVIEW_FILE),
    witness: readJson(WITNESS_FILE),
    inventory: readJson(INVENTORY_FILE),
    bank: loadBank(),
    requireApproved: process.argv.includes("--require-approved"),
  });
  if (!result.ok) {
    for (const failure of result.failures) console.error(`FAIL: ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`CB6 capacity remediation audit passed: ${JSON.stringify(result.summary)}`);
  }
}
