#!/usr/bin/env node
// Audit the static app shell wiring (index.html + sw.js).
//
// This project has no build step, so cache/version drift is one of the easiest
// ways to ship stale app code. This script validates that the versioned assets
// loaded by index.html are mirrored in the service worker shell and that shell
// entries point to real files.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import "./test-audit-words-assessment-integrity.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const indexHtml = readFileSync(join(root, "index.html"), "utf8");
const swJs = readFileSync(join(root, "sw.js"), "utf8");

const REQUIRED_VERSIONED_INDEX_ASSETS = new Set([
  "./styles.css",
  "./audio_map.js",
  "./words_curated_core.js",
  "./words_inflect.js",
  "./words_lesson_plan.js",
  "./raw_word_meanings.js",
  "./sentences_core.js",
  "./sentence_lesson_contrast_ui.js",
  "./sentence_lesson_contrasts_sections_1_4.js",
    "./sentence_lesson_contrasts_sections_5_8.js",
  "./sentence_feedback.js",
  "./sentence_exam_runner.css",
  "./sentence_exam_prompt_templates.js",
  "./sentence_exam_curated_bank.js",
  "./sentence_exam_curated_bank_freeze.js",
  "./sentence_exam_grader.js",
  "./sentence_exam_blueprints.js",
  "./sentence_exam_engine.js",
  "./sentence_exam_runner_core.js",
  "./app.js",
  "./sentence_exam_runner.js",
  "./alphabet_skill_srs.js",
]);

function stripVersion(asset) {
  return asset.split("?")[0];
}

function localPathForAsset(asset) {
  const bare = stripVersion(asset).replace(/^\.\//, "");
  return join(root, bare);
}

function extractIndexAssets() {
  const assets = [];
  for (const match of indexHtml.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    assets.push(match[1]);
  }
  for (const match of indexHtml.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    assets.push(match[1]);
  }
  return assets.filter((asset) => asset.startsWith("./"));
}

function extractShellAssets() {
  const match = swJs.match(/const\s+APP_SHELL\s*=\s*\[([\s\S]*?)\];/);
  if (!match) {
    errors.push("sw.js: could not find APP_SHELL array");
    return [];
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

const cacheMatch = swJs.match(/const\s+CACHE_NAME\s*=\s*"hanapath-shell-v(\d+)";/);
if (!cacheMatch) {
  errors.push('sw.js: CACHE_NAME must look like "hanapath-shell-v<number>"');
} else if (Number(cacheMatch[1]) <= 0) {
  errors.push("sw.js: CACHE_NAME version must be positive");
}

const indexAssets = extractIndexAssets();
const shellAssets = extractShellAssets();
const shellSet = new Set(shellAssets);

for (const asset of indexAssets) {
  if (!shellSet.has(asset)) {
    errors.push(`sw.js APP_SHELL is missing index asset ${asset}`);
  }
}

for (const asset of indexAssets) {
  const bare = stripVersion(asset);
  if (REQUIRED_VERSIONED_INDEX_ASSETS.has(bare) && !asset.includes("?v=")) {
    errors.push(`index.html: ${asset} must include a ?v= cache-busting query`);
  }
}

for (const required of REQUIRED_VERSIONED_INDEX_ASSETS) {
  const indexMatches = indexAssets.filter((asset) => stripVersion(asset) === required);
  if (indexMatches.length !== 1) {
    errors.push(`index.html: expected exactly one load of ${required}, found ${indexMatches.length}`);
    continue;
  }
  const shellMatches = shellAssets.filter((asset) => stripVersion(asset) === required);
  if (shellMatches.length !== 1) {
    errors.push(`sw.js APP_SHELL: expected exactly one entry for ${required}, found ${shellMatches.length}`);
  } else if (shellMatches[0] !== indexMatches[0]) {
    errors.push(`version mismatch for ${required}: index has ${indexMatches[0]}, sw.js has ${shellMatches[0]}`);
  }
}

const seenShellAssets = new Set();
for (const asset of shellAssets) {
  if (seenShellAssets.has(asset)) errors.push(`sw.js APP_SHELL duplicate entry: ${asset}`);
  seenShellAssets.add(asset);
  if (asset === "./") continue;
  if (!asset.startsWith("./")) {
    warnings.push(`sw.js APP_SHELL non-local entry skipped: ${asset}`);
    continue;
  }
  if (!existsSync(localPathForAsset(asset))) {
    errors.push(`sw.js APP_SHELL points to missing file: ${asset}`);
  }
}

if (!shellSet.has("./index.html")) errors.push("sw.js APP_SHELL must include ./index.html");
if (!shellSet.has("./")) errors.push("sw.js APP_SHELL must include ./");

console.log(`Index local assets: ${indexAssets.length}`);
console.log(`Service worker shell assets: ${shellAssets.length}`);
console.log(`Cache name: ${cacheMatch ? `hanapath-shell-v${cacheMatch[1]}` : "(invalid)"}`);
console.log(`Errors: ${errors.length}`);
for (const message of errors) console.log(`  ERROR ${message}`);
console.log(`Warnings: ${warnings.length}`);
for (const message of warnings) console.log(`  warn  ${message}`);

if (errors.length) process.exit(1);
console.log("App shell audit passed.");
