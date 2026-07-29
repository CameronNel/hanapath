#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

function replaceOnce(path, before, after, label) {
  const text = readFileSync(path, "utf8");
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  writeFileSync(path, text.replace(before, after));
}

replaceOnce(
  "sentence_exam_runner.js",
  `  function qualifierIsValid(exam, record) {
    const id = record?.qualifyingAttemptId;
    const qualifier = id && typeof getExamResultRecord === "function" ? getExamResultRecord(id) : null;
    return Boolean(qualifier)
      && qualifier.status === "hanaPath"
      && qualifier.legacyProvenanceStatus == null
      && qualifier.examId === exam.id
      && qualifier.attemptMode === "achievement"
      && qualifier.blueprintVersion === getMeta().blueprintVersion
      && qualifier.engineVersion === getMeta().engineVersion
      && qualifier.contentBankRevision === getMeta().contentBankRevision
      && qualifier.eligibilityRevision === ELIGIBILITY_REVISION
      && Array.isArray(record.qualifyingTargetKeys)
      && record.qualifyingTargetKeys.length > 0;
  }`,
  `  function qualifierIsValid(exam, record) {
    const id = record?.qualifyingAttemptId;
    const qualifier = id && typeof getExamResultRecord === "function" ? getExamResultRecord(id) : null;
    const history = state.sentenceExams?.generationHistory?.[exam.id];
    const generation = Array.isArray(history)
      ? history.find((entry) => entry.submittedAttemptId === id && entry.generationId === qualifier?.generationId)
      : null;
    const targetKeysMatch = Boolean(generation)
      && JSON.stringify(generation.targetKeys || []) === JSON.stringify(record?.qualifyingTargetKeys || []);
    return Boolean(qualifier)
      && qualifier.status === "hanaPath"
      && qualifier.legacyProvenanceStatus == null
      && qualifier.examId === exam.id
      && qualifier.attemptMode === "achievement"
      && qualifier.blueprintVersion === getMeta().blueprintVersion
      && qualifier.engineVersion === getMeta().engineVersion
      && qualifier.contentBankRevision === getMeta().contentBankRevision
      && qualifier.eligibilityRevision === ELIGIBILITY_REVISION
      && qualifier.floorSummary?.details?.masteryQualified === true
      && Boolean(generation)
      && (generation.status === "submitted" || generation.status === "timed-out")
      && generation.integrityStatus === "hanaPath"
      && generation.blueprintVersion === qualifier.blueprintVersion
      && generation.engineVersion === qualifier.engineVersion
      && generation.contentBankRevision === qualifier.contentBankRevision
      && generation.eligibilityRevision === qualifier.eligibilityRevision
      && Array.isArray(record.qualifyingTargetKeys)
      && record.qualifyingTargetKeys.length > 0
      && targetKeysMatch;
  }`,
  "retention qualifier result-generation linkage",
);
replaceOnce(
  "scripts/audit-sentence-exam-runner.mjs",
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");`,
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");
check(runner.includes("qualifier.floorSummary?.details?.masteryQualified === true"), "retention qualifier does not prove the mastery-qualification floor");
check(runner.includes("entry.submittedAttemptId === id && entry.generationId === qualifier?.generationId"), "retention qualifier is not linked to its exact generated form");
check(runner.includes("targetKeysMatch") && runner.includes('generation.integrityStatus === "hanaPath"'), "retention qualifier target set or generation integrity linkage is incomplete");`,
  "audit qualifier linkage",
);

console.log("Applied exact qualifying-result and generated-form linkage for retention.");
