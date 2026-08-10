#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const feedbackSource = readFileSync(join(ROOT, "sentence_feedback.js"), "utf8");
const appSource = readFileSync(join(ROOT, "app.js"), "utf8");
const indexHtml = readFileSync(join(ROOT, "index.html"), "utf8");
const swSource = readFileSync(join(ROOT, "sw.js"), "utf8");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(feedbackSource, sandbox, { filename: "sentence_feedback.js" });
const feedback = sandbox.window.HANAPATH_SENTENCE_FEEDBACK;
assert.ok(feedback, "feedback API must be published");
assert.equal(Object.isFrozen(feedback), true, "feedback API must be immutable");

const statuses = (items) => Array.from(items, (item) => item.status);

let alignment = feedback.alignTokens(["저는", "학교에", "가요"], "저는 집에 가요");
assert.deepEqual(statuses(alignment.target), ["correct", "substituted", "correct"]);
assert.deepEqual(statuses(alignment.attempt), ["correct", "substituted", "correct"]);
assert.equal(alignment.counts.substituted, 1);

alignment = feedback.alignTokens(["저는", "학교에", "가요"], "학교에 가요");
assert.deepEqual(statuses(alignment.target), ["missing", "correct", "correct"]);
assert.deepEqual(statuses(alignment.attempt), ["correct", "correct"]);
assert.equal(alignment.counts.missing, 1);

alignment = feedback.alignTokens(["저는", "학교에", "가요"], "저는 정말 학교에 가요");
assert.deepEqual(statuses(alignment.target), ["correct", "correct", "correct"]);
assert.deepEqual(statuses(alignment.attempt), ["correct", "extra", "correct", "correct"]);
assert.equal(alignment.counts.extra, 1);

alignment = feedback.alignTokens(["저는", "매일", "책을", "읽어요"], "저는 책을 매일 읽어요");
assert.equal(alignment.counts.moved, 1);
assert.equal(alignment.target.filter((item) => item.status === "moved").length, 1);
assert.equal(alignment.attempt.filter((item) => item.status === "moved").length, 1);

alignment = feedback.alignTokens(["정말", "정말", "좋아요"], "정말 좋아요 정말");
assert.equal(alignment.counts.moved, 1, "repeated tokens must pair deterministically");
assert.equal(alignment.counts.missing, 0);
assert.equal(alignment.counts.extra, 0);

alignment = feedback.alignTokens(["오늘은", "좋아요."], "오늘은 좋아요!");
assert.deepEqual(statuses(alignment.target), ["correct", "correct"], "terminal punctuation stays feedback-equivalent");

const sentenceSandbox = { window: {} };
vm.createContext(sentenceSandbox);
vm.runInContext(readFileSync(join(ROOT, "sentences_core.js"), "utf8"), sentenceSandbox, { filename: "sentences_core.js" });
const sentenceRows = sentenceSandbox.window.HANAPATH_SENTENCES || [];
assert.equal(sentenceRows.length, 4177, "live Sentence row count changed unexpectedly");
for (const row of sentenceRows) {
  const canonical = feedback.alignTokens(row.tokens || row.korean, row.korean);
  assert.equal(canonical.counts.correct, (row.tokens || []).length, `${row.id}: canonical tokens must all align`);
  assert.equal(canonical.counts.moved + canonical.counts.substituted + canonical.counts.missing + canonical.counts.extra, 0, `${row.id}: canonical answer produced false feedback`);
}

const html = feedback.render(["저는", "매일", "책을", "학교에서", "읽어요"], "저는 책을 아주 학교에서 매일 봐요");
assert.match(html, /role="status"/);
assert.match(html, /aria-live="polite"/);
assert.match(html, /aria-atomic="true"/);
assert.match(html, /data-sentence-diff-summary/);
assert.match(html, /moved token/);
assert.match(html, /substitution/);
assert.equal((html.match(/data-sentence-token-status="moved"/g) || []).length, 2);
assert.equal((html.match(/data-sentence-token-status="substituted"/g) || []).length, 2);
assert.doesNotMatch(feedback.render(["<script>"], "<img>"), /<script>|<img>/, "rendered tokens must be escaped");

const feedbackRef = indexHtml.indexOf("./sentence_feedback.js?v=20260810c");
const appRef = indexHtml.indexOf("./app.js?v=20260810f");
assert.ok(feedbackRef >= 0 && appRef > feedbackRef, "sentence feedback helper must load before app.js");
assert.match(swSource, /"\.\/sentence_feedback\.js\?v=20260810c"/);
assert.match(swSource, /"\.\/app\.js\?v=20260810f"/);
assert.match(swSource, /"\.\/styles\.css\?v=20260810f"/);

assert.match(appSource, /function alignSentenceTokens\(targetValue, typedValue\)[\s\S]*HANAPATH_SENTENCE_FEEDBACK/);
assert.match(appSource, /function sentenceTokenDiffHtml\(row, typed\)[\s\S]*feedback\.render\(targetTokens, typed\)/);
assert.match(appSource, /function sentenceAttemptFeedbackHtml\(session, targetRow\)[\s\S]*session\.lastWrongAttempt/);
assert.match(appSource, /session\.lastWrongAttempt = attempt;[\s\S]*session\.attempts \+= 1/);
assert.match(appSource, /sentenceAnswerBoxHtml\(session, "한국어로 써 보세요"[\s\S]*sentenceAttemptFeedbackHtml\(session, row\)/);

const checkAnswerBlock = appSource.match(/function checkSentenceAnswer\(row, typed\) \{[\s\S]*?\n\}/)?.[0] || "";
assert.match(checkAnswerBlock, /normalizeKoreanAnswer\(typed, \{ ignoreSpaces: true \}\)/, "lesson correctness must retain spacing tolerance");
assert.match(checkAnswerBlock, /acceptAlso/, "lesson correctness must retain curated alternatives");
assert.doesNotMatch(checkAnswerBlock, /HANAPATH_SENTENCE_FEEDBACK/, "feedback must not alter correctness");

console.log("Sentence feedback engine tests passed across 4,177 live rows: correct, moved, substituted, missing, extra, repeated-token, accessibility, escaping, and wiring contracts.");
