#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
sandbox.self = sandbox.window;
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "sentence_exam_grader.js"), "utf8"), sandbox, {
  filename: "sentence_exam_grader.js",
});
const grader = sandbox.window.HANAPATH_SENTENCE_EXAM_GRADER;

let failures = 0;
function check(name, condition) {
  if (condition) {
    console.log(`PASS: ${name}`);
  } else {
    console.error(`FAIL: ${name}`);
    failures += 1;
  }
}

const item = {
  canonicalAnswer: "저는 한국어를 공부해요.",
  manualAlternatives: ["전 한국어를 공부해요."],
};
check("canonical answer is accepted", grader.scoreSentenceExamResponse(item, "저는 한국어를 공부해요.").correct === true);
check("manual alternative is accepted", grader.scoreSentenceExamResponse(item, "전 한국어를 공부해요.").correct === true);
check("repeated whitespace is normalized", grader.scoreSentenceExamResponse(item, "저는  한국어를   공부해요.").correct === true);
check("unlisted contraction is rejected", grader.scoreSentenceExamResponse({ canonicalAnswer: "이것은 좋아요.", manualAlternatives: [] }, "이건 좋아요.").correct === false);
check("deleted word boundaries are rejected", grader.scoreSentenceExamResponse(item, "저는한국어를공부해요.").correct === false);
check("a rejected answer receives diagnostics", grader.scoreSentenceExamResponse(item, "한국어를 저는 공부해요.").diagnostics.length > 0);

if (failures > 0) {
  console.error(`\nSentence-exam grader regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence-exam grader regression passed.");
