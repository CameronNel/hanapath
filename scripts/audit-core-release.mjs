#!/usr/bin/env node
// Compatibility wrapper around the locked Q2 core-release orchestrator.
//
// The 200-item Hangul bank predates the owner-approved 75% scoring amendment.
// Browser runtime loads hangul_mastery_scoring_policy.js immediately after the
// bank. The original Q2 status derivation loads its browser data from a fixed
// file list, so preserve that large audited orchestrator verbatim in
// audit-core-release-base.mjs and make its Hangul-bank read observe the same
// bank+policy bytes as the browser. This keeps generated evidence derived from
// runtime truth without cloning 700 lines just to add one data-file entry.

import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BANK_PATH = join(HERE, "..", "hangul_mastery_exam.js");
const POLICY_PATH = join(HERE, "..", "hangul_mastery_scoring_policy.js");
const BASE_PATH = join(HERE, "audit-core-release-base.mjs");
const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function readFileSyncWithHangulPolicy(target, ...args) {
  const value = originalReadFileSync(target, ...args);
  if (String(target) !== BANK_PATH || typeof value !== "string") return value;
  const policy = originalReadFileSync(POLICY_PATH, "utf8");
  return `${value}\n${policy}\n`;
};
// `audit-core-release-base.mjs` imports readFileSync as a named node:fs export.
// Synchronize that binding after installing the narrow wrapper above.
syncBuiltinESMExports();

const invokedDirectly = pathToFileURL(process.argv[1] || "").href === import.meta.url;
if (invokedDirectly) {
  // The preserved module retains its original direct-entry guard and main().
  // Point argv[1] at it only for CLI execution; imports by regression tests stay
  // side-effect free and receive the exports below.
  process.argv[1] = BASE_PATH;
}

const base = await import("./audit-core-release-base.mjs");

export const checkSyntax = base.checkSyntax;
export const deriveStatus = base.deriveStatus;
export const renderStatusMarkdown = base.renderStatusMarkdown;
export const deriveSentenceExamReadiness = base.deriveSentenceExamReadiness;
export const GATE_STEPS = base.GATE_STEPS;
