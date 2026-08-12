#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "cloud_sync_merge.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const { adoptRemoteState, mergeStates, stableStringify, stripForCloud } = context.window.HANAPATH_CLOUD_MERGE;

const local = {
  level: "K2",
  weeklyHours: 5,
  theme: "rose",
  route: { screen: "review" },
  phaseOneCompleted: ["a1"],
  examResults: { byAttemptId: { local: { attemptId: "local", score: 7 } } },
  sentencesProgress: { sessionsDone: 2, results: { s1: { successes: 2 } } },
  skills: { vocab: 12, grammar: 5 },
  todayDate: "2026-08-13",
  todayDone: ["local-today"],
};
const remote = {
  level: "K4",
  weeklyHours: 25,
  theme: "violet",
  route: { screen: "today" },
  phaseOneCompleted: ["a2"],
  examResults: { byAttemptId: { remote: { attemptId: "remote", score: 9 } } },
  sentencesProgress: { sessionsDone: 5, results: { s1: { successes: 3 }, s2: { successes: 1 } } },
  skills: { vocab: 8, grammar: 11 },
  todayDate: "2026-08-12",
  todayDone: ["remote-yesterday"],
};
const merged = mergeStates(local, remote);
assert.equal(merged.level, "K4");
assert.equal(merged.theme, "rose", "device preference must stay local");
assert.equal(merged.weeklyHours, 5, "study-plan preference must stay local");
assert.deepEqual(JSON.parse(JSON.stringify(merged.route)), local.route, "navigation state must stay local");
assert.deepEqual([...merged.phaseOneCompleted].sort(), ["a1", "a2"]);
assert.ok(merged.examResults.byAttemptId.local);
assert.ok(merged.examResults.byAttemptId.remote);
assert.equal(merged.sentencesProgress.sessionsDone, 5);
assert.equal(merged.sentencesProgress.results.s1.successes, 3);
assert.equal(merged.sentencesProgress.results.s2.successes, 1);
assert.equal(merged.skills.vocab, 12);
assert.equal(merged.skills.grammar, 11);
assert.deepEqual([...merged.todayDone], ["local-today"], "daily completions must follow the newer date");

const adopted = adoptRemoteState(local, remote);
assert.equal(adopted.theme, "violet", "an unchanged/fresh device adopts cloud preferences");
assert.equal(adopted.weeklyHours, 25);
assert.deepEqual(JSON.parse(JSON.stringify(adopted.route)), local.route, "remote adoption keeps device-only navigation");

const cloud = stripForCloud(local);
assert.equal(cloud.route, undefined);
assert.equal(cloud.theme, "rose", "preferences sync, but the current device wins conflicts");
assert.equal(stableStringify({ b: 1, a: 2 }), '{"a":2,"b":1}');

console.log("Cloud sync merge contract passed: additive progress merge, local UI preservation, and deterministic serialization.");
