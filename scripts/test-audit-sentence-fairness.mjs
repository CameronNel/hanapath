#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  controlledClauseReplacementInstruction,
  validateControlledClauseContract,
} from "./lib/sentence-exam-ambiguity-strict.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const feedbackSource = readFileSync(join(root, "sentence_feedback.js"), "utf8");
const fairnessSource = readFileSync(join(root, "sentence_exam_fairness.js"), "utf8");

const row = {
  korean: "저는 밥을 먹고 물을 마셔요.",
  patternTags: ["and-go", "object-eul-reul", "topic-neun"],
};
const prompt = [
  "Combine the supplied Korean clauses into one sentence.",
  "Source 1: 저는 밥을 먹어요.",
  "Source 2: 물을 마셔요.",
  "Use -고 as the required construction.",
  controlledClauseReplacementInstruction("어요", "고"),
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
].join(" ");
const contract = {
  schemaVersion: 1,
  operation: "combine-clauses",
  requiredPatternTag: "and-go",
  requiredConstructionCue: "-고",
  sourceFragments: ["저는 밥을 먹어요.", "물을 마셔요."],
  sourceEnding: "어요",
  targetEnding: "고",
  preservedClauseEvidence: [],
  preserveSourceOrder: true,
  preserveLexicalMaterial: true,
  preserveParticles: true,
  acceptedAnswerPolicy: "reviewed-finite-only",
};
assert.equal(validateControlledClauseContract(row, prompt, contract).valid, true, "valid explicit operation must pass");
assert.equal(
  validateControlledClauseContract(row, prompt.replace("Combine the supplied Korean clauses", "Use the supplied Korean text"), contract).valid,
  false,
  "operation must be visible to the learner",
);
const lexicalSource = {
  ...contract,
  sourceEnding: "밥을 먹어요",
  targetEnding: "밥을 먹고",
};
const lexicalPrompt = prompt.replace(
  controlledClauseReplacementInstruction("어요", "고"),
  controlledClauseReplacementInstruction("밥을 먹어요", "밥을 먹고"),
);
const lexicalResult = validateControlledClauseContract(row, lexicalPrompt, lexicalSource);
assert.equal(lexicalResult.valid, false, "noun/particle/predicate material may not be hidden inside an ending replacement");
assert.ok(lexicalResult.errors.some((message) => /one Korean eojeol|particle/.test(message)));

const context = {
  console,
  Math,
  Number,
  String,
  Object,
  Array,
  Set,
  Map,
  JSON,
  Date,
  RegExp,
  normalizeStudyText: (value) => String(value || "").toLowerCase().replace(/[^a-z]/g, ""),
  getSentenceBankRows: () => [
    { korean: "저는 한국어를 공부해요.", english: "I study Korean.", acceptAlso: [] },
    { korean: "저는 한국어를 배워요.", english: "I study Korean.", acceptAlso: [] },
  ],
  sentenceTokenDiffHtml: () => "original",
};
context.window = context;
context.HANAPATH_SENTENCE_EXAM_CURATED_BANK = {
  entries: [
    { id: "r1", mode: "recognition", canonicalAnswer: "저는 한국어를 배워요.", recognitionAnswerEn: "I learn Korean" },
    { id: "r2", mode: "recognition", canonicalAnswer: "저는 밥을 먹어요.", recognitionAnswerEn: "I eat rice" },
    { id: "r3", mode: "recognition", canonicalAnswer: "저는 집에 가요.", recognitionAnswerEn: "I go home" },
    { id: "r4", mode: "recognition", canonicalAnswer: "저는 물을 마셔요.", recognitionAnswerEn: "I drink water" },
    { id: "r5", mode: "recognition", canonicalAnswer: "저는 책을 읽어요.", recognitionAnswerEn: "I read a book" },
  ],
};
const rawAttempt = {
  items: [
    {
      itemId: "seed:01",
      sourceEntryId: "r1",
      sourceSectionOrder: 1,
      canonicalAnswer: "저는 한국어를 배워요.",
      canonicalTargetKey: "저는한국어를배워요",
      mode: "recognition",
      options: ["I learn Korean", "I study Korean", "I eat rice", "I go home"],
      answerContract: { recognitionAnswerEn: "I learn Korean" },
    },
    {
      itemId: "seed:02",
      sourceEntryId: "s0007",
      sourceSectionOrder: 1,
      canonicalAnswer: "음악을 들어요.",
      canonicalTargetKey: "음악을들어요",
      mode: "typed",
      manualAlternatives: [],
      answerContract: { canonicalAnswer: "음악을 들어요.", manualAlternatives: [] },
    },
  ],
  answerContracts: [],
};
context.HANAPATH_SENTENCE_EXAM_ENGINE = Object.freeze({
  generateAttempt: () => structuredClone(rawAttempt),
  generateFreshnessSequence: () => [structuredClone(rawAttempt)],
  validateAttempt: () => [],
  gradeAttempt: () => ({}),
  resolveBlueprint: () => ({}),
  analyzeCapacity: () => ({}),
});
vm.createContext(context);
vm.runInContext(feedbackSource, context, { filename: "sentence_feedback.js" });
vm.runInContext(fairnessSource, context, { filename: "sentence_exam_fairness.js" });

const attempt = context.HANAPATH_SENTENCE_EXAM_ENGINE.generateAttempt("sentence-exam-1", "seed");
const recognition = attempt.items[0];
assert.equal(recognition.options.length, 4);
assert.ok(recognition.options.includes("I learn Korean"));
assert.ok(!recognition.options.includes("I study Korean"), "learn/study semantic duplicate must be removed");
assert.equal(new Set(recognition.options.map(context.HANAPATH_SENTENCE_EXAM_FAIRNESS.semanticKey)).size, 4);
assert.deepEqual(attempt.items[1].answerContract.manualAlternatives, ["음악 들어요."], "reviewed optional-particle answer must be accepted");
assert.deepEqual(context.HANAPATH_SENTENCE_EXAM_ENGINE.validateAttempt(attempt), []);

const shifted = context.HANAPATH_SENTENCE_FEEDBACK.alignTokens(
  "저는 학교에 가요",
  "저는 정말 학교로 가요",
);
assert.equal(shifted.attempt.find((item) => item.token === "정말").status, "extra");
assert.equal(shifted.target.find((item) => item.token === "학교에").status, "substituted");
assert.equal(shifted.attempt.find((item) => item.token === "학교로").status, "substituted");

const closest = context.sentenceTokenDiffHtml(
  { korean: "저는 한국어를 공부해요.", english: "I study Korean.", acceptAlso: [] },
  "저는 한국어를 배웠어요.",
);
assert.match(closest, /배워요/);
assert.doesNotMatch(closest, /공부해요/);

console.log("Sentence distractor semantics, typed alternatives, controlled clauses, and feedback fairness passed.");
