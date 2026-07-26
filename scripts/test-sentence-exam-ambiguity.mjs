#!/usr/bin/env node
import { detectAmbiguityFlags } from "./lib/sentence-exam-ambiguity.mjs";

let failures = 0;
function check(name, condition) {
  if (condition) {
    console.log(`PASS: ${name}`);
  } else {
    console.error(`FAIL: ${name}`);
    failures += 1;
  }
}

const topicRow = {
  korean: "미나는 연습생이에요.",
  english: "Mina is a trainee.",
  patternTags: ["topic-neun", "copula-ieyo"],
};
const ambiguousTopic = detectAmbiguityFlags(topicRow, "Mina is a trainee.");
check("topic sentence without discourse context is flagged", ambiguousTopic.flags.includes("topic-or-focus-not-forced"));
check("prompt without a communicative act is flagged", ambiguousTopic.flags.includes("communicative-act-not-forced"));

const anchoredTopic = detectAmbiguityFlags(topicRow, "As for Mina, tell a classmate that she is a trainee.");
check("topic framing removes the topic/focus flag", !anchoredTopic.flags.includes("topic-or-focus-not-forced"));
check("explicit action removes the communicative-act flag", !anchoredTopic.flags.includes("communicative-act-not-forced"));

const pastRow = {
  korean: "어제 한국어를 공부했어요.",
  english: "I studied Korean.",
  patternTags: ["past-polite", "object-eul-reul"],
};
const unanchoredPast = detectAmbiguityFlags(pastRow, "Tell a classmate that you studied Korean.");
check("past target without a time cue is flagged", unanchoredPast.flags.includes("time-or-tense-not-forced"));

const anchoredPast = detectAmbiguityFlags(pastRow, "Tell a classmate that you studied Korean yesterday.");
check("past target with a time cue is not tense-flagged", !anchoredPast.flags.includes("time-or-tense-not-forced"));

const formalRow = {
  korean: "감사합니다.",
  english: "Thank you.",
  patternTags: ["formal-nida"],
};
const formalPrompt = detectAmbiguityFlags(formalRow, "At a formal reception, thank the host respectfully.");
check("formal prompt with social setting is not register-flagged", !formalPrompt.flags.includes("register-not-forced"));

if (failures > 0) {
  console.error(`\nSentence-exam ambiguity regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence-exam ambiguity regression passed.");
