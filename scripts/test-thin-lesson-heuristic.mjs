#!/usr/bin/env node
// Regression guard for the grammar-track exemption in the thin-lesson
// heuristic (scripts/lib/thin-lesson.mjs), added alongside the additive
// s3-grammar-u2-l3 past/negation production bridge. Run with:
//   node scripts/test-thin-lesson-heuristic.mjs
//
// It checks the predicate directly (synthetic cases) AND against the real
// live Words plan (the grammar bridge lesson must NOT warn, while a
// non-grammar thin lesson still would).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";
import { isThinLessonWarning } from "./lib/thin-lesson.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
function check(name, actual, expected) {
  if (actual === expected) {
    console.log(`  ok    ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name} — expected ${expected}, got ${actual}`);
  }
}

// ── Synthetic cases ────────────────────────────────────────────────────────
const stageLessonCounts = new Map([["s3", 4]]);
const unitTrackById = new Map([
  ["u-grammar", "grammar"],
  ["u-content", "daily"],
]);
const ctx = { stageLessonCounts, unitTrackById };
const isCheckpoint = false;

check(
  "grammar-track thin lesson is exempt",
  isThinLessonWarning({ id: "g", stage: "s3", unitId: "u-grammar", newWordIds: ["a"] }, { ...ctx, isCheckpoint }),
  false,
);
check(
  "non-grammar thin lesson still warns",
  isThinLessonWarning({ id: "c", stage: "s3", unitId: "u-content", newWordIds: ["a"] }, { ...ctx, isCheckpoint }),
  true,
);
check(
  "checkpoint never warns",
  isThinLessonWarning({ id: "cp", stage: "s3", unitId: "u-content", newWordIds: [] }, { ...ctx, isCheckpoint: true }),
  false,
);
check(
  "lesson with 4+ words is fine",
  isThinLessonWarning({ id: "d", stage: "s3", unitId: "u-content", newWordIds: ["a", "b", "c", "d"] }, { ...ctx, isCheckpoint }),
  false,
);
check(
  "no foldable sibling means no warning",
  isThinLessonWarning({ id: "e", stage: "s9", unitId: "u-content", newWordIds: ["a"] }, { ...ctx, isCheckpoint }),
  false,
);

// ── Real live-plan case ────────────────────────────────────────────────────
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["words_curated_core.js", "words_lesson_plan.js"]) {
  vm.runInContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
}
const lessons = sandbox.window.HANAPATH_WORD_LESSONS || [];
const units = sandbox.window.HANAPATH_WORD_UNITS || [];
const realStageCounts = new Map();
for (const lesson of lessons) {
  if (!lesson.stage) continue;
  realStageCounts.set(lesson.stage, (realStageCounts.get(lesson.stage) || 0) + 1);
}
const realTrackById = new Map(units.map((u) => [u.id, u.track]));
const bridge = lessons.find((l) => l.id === "s3-grammar-u2-l3");
check("s3-grammar-u2-l3 exists in the live plan", Boolean(bridge), true);
if (bridge) {
  check(
    "live grammar bridge lesson does not raise thin-lesson warning",
    isThinLessonWarning(bridge, { isCheckpoint: false, stageLessonCounts: realStageCounts, unitTrackById: realTrackById }),
    false,
  );
  // Prove the exemption is what suppresses it: pretend it is a content-track
  // lesson and the same word-thin shape must warn.
  check(
    "same lesson on a content track would still warn (exemption is load-bearing)",
    isThinLessonWarning(bridge, {
      isCheckpoint: false,
      stageLessonCounts: realStageCounts,
      unitTrackById: new Map([...realTrackById, [bridge.unitId, "daily"]]),
    }),
    bridge.newWordIds.length < 4, // only meaningful while the bridge stays word-thin
  );
}

if (failures) {
  console.error(`\nThin-lesson heuristic: ${failures} check(s) FAILED.`);
  process.exit(1);
}
console.log("\nThin-lesson heuristic: all checks passed.");
