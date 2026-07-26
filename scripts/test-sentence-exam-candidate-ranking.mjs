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
  row("s0001", 1, { existingTypedClass: "canonical" }),
  row("s0002", 1),
  row("s0003", 1, { existingTypedClass: "excluded", ambiguityFlags: ["productive-clause-family"] }),
  row("s0004", 1, { ambiguityFlags: ["topic-or-focus-not-forced"] }),
  row("s0005", 1),
  row("s0006", 1),
  row("s0101", 2, { existingTypedClass: "finite", plausibleVariantCount: 1 }),
  row("s0102", 2),
  row("s0103", 2, { existingTypedClass: "excluded", ambiguityFlags: ["particle-or-order-family"] }),
  row("s0104", 2),
  row("s0105", 2),
  row("s0106", 2),
];

const first = selectBalancedShortlist(inventory, {
  sectionOrders: [1, 2],
  typedPerSection: 2,
  recognitionPerSection: 2,
});
const second = selectBalancedShortlist([...inventory].reverse(), {
  sectionOrders: [1, 2],
  typedPerSection: 2,
  recognitionPerSection: 2,
});

check("selects exact typed quota", first.typed.length === 4);
check("selects exact recognition quota", first.recognition.length === 4);
check("keeps modes disjoint", first.summary.overlapCount === 0);
check("balances both sections", first.summary.bySection.every((section) => section.typed === 2 && section.recognition === 2));
check("prefers reviewed canonical evidence", first.typed.some((item) => item.id === "s0001"));
check("does not shortlist reviewed exclusion for typed", !first.typed.some((item) => item.id === "s0003" || item.id === "s0103"));
check("can use reviewed exclusion for recognition", first.recognition.some((item) => item.id === "s0003") && first.recognition.some((item) => item.id === "s0103"));
check("never marks a shortlist item approved", [...first.typed, ...first.recognition].every((item) => item.approved === false && item.reviewRequired === true));
check("selection is deterministic regardless of input order", JSON.stringify(first) === JSON.stringify(second));

let shortageFailed = false;
try {
  selectBalancedShortlist([row("s9001", 1)], {
    sectionOrders: [1],
    typedPerSection: 1,
    recognitionPerSection: 1,
  });
} catch (error) {
  shortageFailed = /Cannot satisfy deterministic shortlist policy/.test(String(error));
}
check("fails rather than silently weakening quotas", shortageFailed);

if (failures > 0) {
  console.error(`\nSentence-exam candidate-ranking regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence-exam candidate-ranking regression passed.");
