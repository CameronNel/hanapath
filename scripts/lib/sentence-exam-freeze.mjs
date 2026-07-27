import { createHash } from "node:crypto";

export const SENTENCE_EXAM_FREEZE_SCHEMA_VERSION = 1;
export const SENTENCE_EXAM_FREEZE_SOURCE_FILES = Object.freeze([
  "sentence_exam_curated_bank.js",
  "docs/generated/sentence_exam_inventory.json",
  "docs/generated/sentence_exam_shortlist.json",
  "docs/generated/sentence_exam_curated_bank_cb4_authoring.json",
  "docs/reviews/sentence_exam_curated_bank_cb4_reviews.json",
]);

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function hashJson(value) {
  return sha256(JSON.stringify(value));
}

export function buildFreezeManifest({ bank, sourceFileContents }) {
  if (!bank || typeof bank !== "object" || Array.isArray(bank)) {
    throw new TypeError("A curated Sentence exam bank object is required.");
  }
  const entries = Array.isArray(bank.entries) ? bank.entries : [];
  const typed = entries.filter((entry) => entry.mode === "typed");
  const recognition = entries.filter((entry) => entry.mode === "recognition");
  const prompts = entries.map((entry, index) => ({
    index,
    id: entry.id,
    mode: entry.mode,
    templateId: entry.templateId,
    examPromptEn: entry.examPromptEn,
    requiresLexicalAnchor: entry.requiresLexicalAnchor === true,
  }));
  const answers = entries.map((entry, index) => ({
    index,
    id: entry.id,
    mode: entry.mode,
    canonicalAnswer: entry.canonicalAnswer,
    manualAlternatives: entry.manualAlternatives || [],
    recognitionAnswerEn: entry.recognitionAnswerEn || null,
  }));
  const typedReviews = typed.map((entry, index) => ({
    index,
    id: entry.id,
    authoredBy: entry.authoredBy,
    reviewStatus: entry.reviewStatus,
    reviewedBy: entry.reviewedBy,
    reviewedAt: entry.reviewedAt,
    reviewedRevision: entry.reviewedRevision,
    reviewerNote: entry.reviewerNote,
  }));
  const sourceFiles = {};
  for (const path of SENTENCE_EXAM_FREEZE_SOURCE_FILES) {
    const content = sourceFileContents?.[path];
    if (typeof content !== "string" && !Buffer.isBuffer(content)) {
      throw new TypeError(`Missing freeze source content for ${path}.`);
    }
    sourceFiles[path] = sha256(content);
  }
  return {
    schemaVersion: SENTENCE_EXAM_FREEZE_SCHEMA_VERSION,
    revision: bank.revision,
    bankSchemaVersion: bank.schemaVersion,
    entryCount: entries.length,
    typedCount: typed.length,
    recognitionCount: recognition.length,
    hashes: {
      promptsSha256: hashJson(prompts),
      answersSha256: hashJson(answers),
      typedReviewsSha256: hashJson(typedReviews),
      entriesSha256: hashJson(stableValue(entries)),
    },
    sourceFiles,
  };
}

export function auditFreezeManifest({ bank, manifest, sourceFileContents }) {
  const errors = [];
  let expected;
  try {
    expected = buildFreezeManifest({ bank, sourceFileContents });
  } catch (error) {
    return { errors: [error.message], expected: null };
  }
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return { errors: ["Curated-bank freeze manifest is missing or malformed."], expected };
  }
  if (manifest.schemaVersion !== SENTENCE_EXAM_FREEZE_SCHEMA_VERSION) {
    errors.push(`Freeze schemaVersion must be ${SENTENCE_EXAM_FREEZE_SCHEMA_VERSION}.`);
  }
  if (manifest.revision !== bank.revision) errors.push("Freeze revision does not match the curated bank revision.");
  if (manifest.bankSchemaVersion !== bank.schemaVersion) errors.push("Freeze bankSchemaVersion does not match the curated bank.");
  for (const key of ["entryCount", "typedCount", "recognitionCount"]) {
    if (manifest[key] !== expected[key]) errors.push(`Freeze ${key} is stale: expected ${expected[key]}, got ${manifest[key]}.`);
  }
  for (const key of ["promptsSha256", "answersSha256", "typedReviewsSha256", "entriesSha256"]) {
    if (manifest.hashes?.[key] !== expected.hashes[key]) errors.push(`Freeze hash ${key} is stale or invalid.`);
  }
  for (const path of SENTENCE_EXAM_FREEZE_SOURCE_FILES) {
    if (manifest.sourceFiles?.[path] !== expected.sourceFiles[path]) {
      errors.push(`Freeze source hash is stale for ${path}.`);
    }
  }
  const extraSourcePaths = Object.keys(manifest.sourceFiles || {}).filter(
    (path) => !SENTENCE_EXAM_FREEZE_SOURCE_FILES.includes(path)
  );
  if (extraSourcePaths.length > 0) errors.push(`Freeze manifest has unexpected source files: ${extraSourcePaths.join(", ")}.`);
  return { errors, expected };
}
