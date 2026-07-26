#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(ROOT, "scripts", "audit-core-release.mjs");
let text = readFileSync(path, "utf8");

const marker = '  { id: "sentence-exam-inventory", label: "Sentence-exam inventory and shortlist freshness (CB1)", script: "scripts/build-sentence-exam-inventory.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },';
const insertion = `${marker}\n  { id: "sentence-exam-curated-authoring-freshness", label: "Sentence-exam curated bank authoring freshness (CB4)", script: "scripts/build-sentence-exam-curated-bank.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },\n  { id: "sentence-exam-curated-authoring-audit", label: "Sentence-exam curated bank authoring audit (CB4)", script: "scripts/audit-sentence-exam-curated-bank-cb4.mjs" },\n  { id: "sentence-exam-curated-authoring-regression", label: "Sentence-exam curated bank authoring regression (CB4)", script: "scripts/test-sentence-exam-curated-bank-cb4.mjs" },`;

if (!text.includes(insertion)) {
  if (!text.includes(marker)) throw new Error("Could not locate CB1 inventory gate marker.");
  text = text.replace(marker, insertion);
  writeFileSync(path, text);
  console.log("Installed permanent CB4 core-release steps.");
} else {
  console.log("Permanent CB4 core-release steps already installed.");
}
