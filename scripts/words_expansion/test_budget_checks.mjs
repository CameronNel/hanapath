import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
assert.match(sw, /const AUDIO_RUNTIME_CACHE_LIMIT\s*=\s*256/);
assert.match(sw, /new URL\("\.\/audio\/", self\.registration\.scope\)\.pathname/);
assert.match(sw, /pathname\.startsWith\(AUDIO_RUNTIME_PATH_PREFIX\)/);
const report = JSON.parse(fs.readFileSync(path.join(root, "scripts/words_expansion/budget_report.json"), "utf8"));
assert.equal(report.measurements.audioRuntimeEntries, 256);
assert.equal(report.measurements.missingShellAssets.length, 0);
console.log("Budget policy checks passed.");
