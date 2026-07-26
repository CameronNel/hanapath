#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import {
  SENTENCE_EXAM_FREEZE_SOURCE_FILES,
  auditFreezeManifest,
  buildFreezeManifest,
} from "./lib/sentence-exam-freeze.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_FILE = join(ROOT, "docs", "generated", "sentence_exam_curated_bank_cb5_freeze.json");
const ACTIVATION_FILE = join(ROOT, "sentence_exam_curated_bank_freeze.js");

function loadBank() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(ROOT, "sentence_exam_curated_bank.js"), "utf8"), sandbox, {
    filename: "sentence_exam_curated_bank.js",
  });
  return sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
}

function sourceFileContents() {
  return Object.fromEntries(
    SENTENCE_EXAM_FREEZE_SOURCE_FILES.map((path) => [path, readFileSync(join(ROOT, path))])
  );
}

export function renderFreezeManifest(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

export function renderActivationScript(manifest) {
  return `(function () {\n  "use strict";\n\n  const bank = window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;\n  const freeze = ${JSON.stringify(manifest, null, 2).replace(/^/gm, "  ").trimStart()};\n\n  if (!bank || typeof bank !== "object") {\n    throw new Error("Curated Sentence exam bank must load before its CB5 freeze contract.");\n  }\n  if (bank.revision !== freeze.revision) {\n    throw new Error("Curated Sentence exam bank revision does not match the CB5 freeze contract.");\n  }\n\n  function deepFreeze(value) {\n    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;\n    for (const child of Object.values(value)) deepFreeze(child);\n    return Object.freeze(value);\n  }\n\n  bank.enabled = true;\n  bank.freezeState = "frozen";\n  bank.freeze = freeze;\n  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE = deepFreeze(freeze);\n  deepFreeze(bank);\n})();\n`;
}

export function buildCb5FreezePackage() {
  const bank = loadBank();
  const sources = sourceFileContents();
  const manifest = buildFreezeManifest({ bank, sourceFileContents: sources });
  const audit = auditFreezeManifest({ bank, manifest, sourceFileContents: sources });
  return {
    bank,
    manifest,
    manifestText: renderFreezeManifest(manifest),
    activationText: renderActivationScript(manifest),
    errors: audit.errors,
  };
}

function checkFile(path, expected) {
  let actual;
  try {
    actual = readFileSync(path, "utf8");
  } catch {
    console.error(`Missing generated file: ${path}`);
    return false;
  }
  if (actual !== expected) {
    console.error(`Stale generated file: ${path}`);
    return false;
  }
  console.log(`Generated file is current: ${path}`);
  return true;
}

function main() {
  const result = buildCb5FreezePackage();
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(error);
    process.exit(1);
  }
  if (process.argv.includes("--print")) {
    process.stdout.write(result.manifestText);
    return;
  }
  if (process.argv.includes("--write")) {
    mkdirSync(dirname(MANIFEST_FILE), { recursive: true });
    writeFileSync(MANIFEST_FILE, result.manifestText);
    writeFileSync(ACTIVATION_FILE, result.activationText);
    console.log(`Wrote ${MANIFEST_FILE}`);
    console.log(`Wrote ${ACTIVATION_FILE}`);
    return;
  }
  if (process.argv.includes("--check")) {
    const ok = checkFile(MANIFEST_FILE, result.manifestText) && checkFile(ACTIVATION_FILE, result.activationText);
    process.exit(ok ? 0 : 1);
  }
  console.log("Use --write, --check, or --print.");
}

if (pathToFileURL(process.argv[1] || "").href === import.meta.url) main();
