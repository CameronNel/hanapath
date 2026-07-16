#!/usr/bin/env node
// Inject a release versionName/versionCode into the Android project
// (docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md §13.2 versioning automation).
//
// Usage: node scripts/version-android.mjs <versionName> <versionCode>
//   versionName: MAJOR.MINOR or MAJOR.MINOR.PATCH (e.g. 1.0.0)
//   versionCode: positive integer; Google Play requires it to strictly
//                increase on every upload
//
// The committed app/build.gradle keeps placeholder values (versionCode 1,
// versionName "1.0"); this script rewrites them in the working copy only.
// The protected release workflow runs it on a clean CI checkout — the edit
// is never committed. Monotonicity against past releases is enforced by the
// workflow's android-release/<versionCode> tag guard, not here.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [versionName, versionCodeRaw] = process.argv.slice(2);

function fail(message) {
  console.error(`version-android: ${message}`);
  console.error("usage: node scripts/version-android.mjs <versionName> <versionCode>");
  process.exit(1);
}

if (!versionName || !versionCodeRaw) fail("both versionName and versionCode are required");
if (!/^\d+\.\d+(\.\d+)?$/.test(versionName)) {
  fail(`versionName "${versionName}" must be MAJOR.MINOR or MAJOR.MINOR.PATCH (digits only)`);
}
if (!/^[1-9]\d*$/.test(versionCodeRaw)) {
  fail(`versionCode "${versionCodeRaw}" must be a positive integer with no leading zeros`);
}
const versionCode = Number(versionCodeRaw);
// Play's hard ceiling for versionCode is 2100000000.
if (versionCode > 2100000000) fail(`versionCode ${versionCode} exceeds Google Play's maximum of 2100000000`);

const gradlePath = join(dirname(fileURLToPath(import.meta.url)), "..", "android", "app", "build.gradle");
const original = readFileSync(gradlePath, "utf8");

const codeMatches = original.match(/versionCode\s+\d+/g) || [];
const nameMatches = original.match(/versionName\s+"[^"]*"/g) || [];
if (codeMatches.length !== 1) fail(`expected exactly one versionCode line in app/build.gradle, found ${codeMatches.length}`);
if (nameMatches.length !== 1) fail(`expected exactly one versionName line in app/build.gradle, found ${nameMatches.length}`);

const updated = original
  .replace(/versionCode\s+\d+/, `versionCode ${versionCode}`)
  .replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);
writeFileSync(gradlePath, updated);

console.log(`version-android: ${codeMatches[0]} -> versionCode ${versionCode}`);
console.log(`version-android: ${nameMatches[0]} -> versionName "${versionName}"`);
