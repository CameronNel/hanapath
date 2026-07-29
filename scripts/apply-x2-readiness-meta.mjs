#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const path = "sentence_exam_runner_core.js";
const text = readFileSync(path, "utf8");
const before = '})(typeof globalThis !== "undefined" ? globalThis : this, function createSentenceExamRunnerCore() {';
const after = '})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this), function createSentenceExamRunnerCore() {';
const count = text.split(before).length - 1;
if (count !== 1) throw new Error(`runner root anchor: expected one, found ${count}`);
writeFileSync(path, text.replace(before, after));
console.log("Aligned X2 runner metadata with browser and core-gate window globals.");
