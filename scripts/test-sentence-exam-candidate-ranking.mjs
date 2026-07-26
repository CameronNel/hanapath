#!/usr/bin/env node
import { selectBalancedShortlist } from "./lib/sentence-exam-candidate-ranking.mjs";

let failures = 0;
function check(name, condition) {
  if (condition) console.log(`PASS: ${name}`);
  else {
    console.error(`FAIL: ${name}`);
    failures += 1;
  }
}

function row(id, section, options = {}) {
  return {
    id,
    korean: options.korean || `문장 ${id}`,
    english: options.english || `Sentence ${id}`,
    lessonIds: options.lessonIds || [`lesson-${section}-${id}`],
    sectionOrders: options.sectionOrders || [section],
    patternTags: options.patternTags || ["basic"],
    existingTypedClass: options.existingTypedClass ?? null,
    existingExamPromptEn: options.existingExamPromptEn ?? null,
    ambiguityFlags: options.ambiguityFlags || [],
    contractionFamilies: [],
    plausibleVariantCount: options.plausibleVariantCount || 0,
    typedSafeHeuristic: (options.ambiguityFlags || []).length === 0,
  };
}

const inventory = [
  row("s0001", 1, { existingTypedClass: "canonical", lessonIds: ["lesson-shared-1"] }),
  row("s0002", 1, { existingTypedClass: "canonical", lessonIds: ["lesson-shared-1"] }),
  row("s0003", 1, { existingTypedClass: "excluded", ambiguityFlags: ["productive-clause-family"] }),
  row("s0004", 1, { ambiguityFlags: ["topic-or-focus-not-forced"] }),
  row("s0005", 1),
  row("s0006", 1),
  row("s0101", 2, { existingTypedClass: "finite", plausibleVariantCount: 1, lessonIds: ["lesson-shared-2"] }),
  row("s0102", 2, { existingTypedClass: "canonical", lessonIds: ["lesson-shared-2"] }),
  row("s0103", 2, { existingTypedClass: "excluded", ambiguityFlags: ["particle-or-order-family"] }),
  row("s0104", 2),
  row("s0105", 2),
  row("s0106", 2),
];

const policy = {
  sectionOrders: [1, 2],
  typedTargetSize: 4,
  minTypedPerSection: 2,
  recognitionTargetSize: 4,
  minRecognitionPerSection: 2,
  maxTypedPerLesson: 1,
  maxRecognitionPerLesson: 2,
};
const first = selectBalancedShortlist(inventory, policy);
const second = selectBalancedShortlist([...inventory].reverse(), policy);

check("selects exact typed target", first.typed.length === 4);
check("selects exact recognition target", first.recognition.length === 4);
check("keeps modes disjoint", first.summary.overlapCount === 0);
check("meets both section floors", first.summary.bySection.every((section) => section.typed >= 2 && section.recognition >= 2));
check("prefers reviewed canonical evidence", first.typed.some((item) => item.id === "s0001"));
check("does not consume two typed rows from one lesson", !(first.typed.some((item) => item.id === "s0001") && first.typed.some((item) => item.id === "s0002")));
check("enforces the typed lesson cap", first.summary.typedMaxPerLesson === 1 && first.summary.typedUniqueLessons >= first.typed.length);
check("enforces the recognition lesson cap", first.summary.recognitionMaxPerLesson <= 2);
check("does not shortlist reviewed exclusion for typed", !first.typed.some((item) => item.id === "s0003" || item.id === "s0103"));
check("can use reviewed exclusion for recognition", first.recognition.some((item) => item.id === "s0003") && first.recognition.some((item) => item.id === "s0103"));
check("never marks a shortlist item approved", [...first.typed, ...first.recognition].every((item) => item.approved === false && item.reviewRequired === true));
check("selection is deterministic regardless of input order", JSON.stringify(first) === JSON.stringify(second));

let floorFailed = false;
try {
  selectBalancedShortlist([
    row("s9001", 1, { lessonIds: ["only-lesson"] }),
    row("s9002", 1, { lessonIds: ["only-lesson"] }),
    row("s9101", 2),
    row("s9102", 2),
    row("s9103", 2),
  ], {
    sectionOrders: [1, 2],
    typedTargetSize: 4,
    minTypedPerSection: 2,
    recognitionTargetSize: 2,
    minRecognitionPerSection: 1,
    maxTypedPerLesson: 1,
    maxRecognitionPerLesson: 2,
  });
} catch (error) {
  floorFailed = /section floors/.test(String(error));
}
check("fails rather than weakening a section floor", floorFailed);

let targetFailed = false;
try {
  selectBalancedShortlist([
    row("s9201", 1),
    row("s9202", 1),
    row("s9301", 2),
    row("s9302", 2),
  ], {
    sectionOrders: [1, 2],
    typedTargetSize: 2,
    minTypedPerSection: 1,
    recognitionTargetSize: 3,
    minRecognitionPerSection: 1,
    maxTypedPerLesson: 1,
    maxRecognitionPerLesson: 1,
  });
} catch (error) {
  targetFailed = /shortlist target/.test(String(error));
}
check("fails rather than weakening a global target", targetFailed);

if (failures > 0) {
  console.error(`\nSentence-exam candidate-ranking regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence-exam candidate-ranking regression passed.");
