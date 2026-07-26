#!/usr/bin/env node
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ui = require("../sentence_lesson_contrast_ui.js");

let failures = 0;
function check(name, condition) {
  if (condition) console.log(`PASS: ${name}`);
  else { console.error(`FAIL: ${name}`); failures += 1; }
}

const entry = {
  lessonId: "lesson-1",
  targetSentenceId: "s1",
  contrastSentenceId: "s2",
  contrastClosure: {
    targetKorean: "한글은 재미있어요.",
    targetMeaning: "Hangul is fun.",
    contrastKorean: "한국어를 공부해요.",
    contrastMeaning: "I study Korean.",
    explanation: "The target describes the topic; the contrast describes an action.",
  },
  controlledProduction: { promptEn: "As for Hangul, tell a classmate that it is fun." },
  variationAwareness: { note: "The contrast is natural, but it expresses a different goal." },
  studyNotes: {
    s1: { phase: "Meaning in context", note: "Use the target meaning." },
    s2: { phase: "Nearby valid contrast", note: "Compare the different action." },
  },
};

const html = ui.renderIntroGuide(entry);
check("renders target and contrast roles", html.includes('data-sentence-contrast-role="target"') && html.includes('data-sentence-contrast-role="contrast"'));
check("marks Korean language content", (html.match(/lang="ko"/g) || []).length === 2);
check("adds an accessible labelled section", html.includes("aria-labelledby=") && html.includes("sentence-contrast-title"));
check("shows the controlled prompt", html.includes(entry.controlledProduction.promptEn));
check("renders study notes only for mapped rows", ui.renderStudyNote(entry, "s1").includes("Meaning in context") && ui.renderStudyNote(entry, "missing") === "");
check("uses prompt override only when present", ui.promptForDrill({ promptEn: "Forced cue" }, "Fallback") === "Forced cue" && ui.promptForDrill({}, "Fallback") === "Fallback");
check("uses cue labels only when present", ui.labelForDrill({ cueLabel: "Controlled target" }, "Translate") === "Controlled target" && ui.labelForDrill({}, "Translate") === "Translate");
const escaped = ui.renderIntroGuide({ ...entry, lessonId: '<bad id>' });
check("escapes generated identifiers", !escaped.includes('<bad id>'));

if (failures) process.exit(1);
console.log("\nSentence lesson contrast UI regression passed.");
