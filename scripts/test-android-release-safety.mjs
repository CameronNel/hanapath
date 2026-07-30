#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const androidRoot = join(root, "mobile", "android", "app");
const manifest = readFileSync(join(androidRoot, "src", "main", "AndroidManifest.xml"), "utf8");
const paths = readFileSync(join(androidRoot, "src", "main", "res", "xml", "file_paths.xml"), "utf8");
const mainActivity = readFileSync(join(androidRoot, "src", "main", "java", "io", "github", "cameronnel", "hanapath", "MainActivity.java"), "utf8");
const buildGradle = readFileSync(join(androidRoot, "build.gradle"), "utf8");
const strings = readFileSync(join(androidRoot, "src", "main", "res", "values", "strings.xml"), "utf8");
const releaseWorkflow = readFileSync(join(root, ".github", "workflows", "android-release.yml"), "utf8");
const buildWorkflow = readFileSync(join(root, ".github", "workflows", "android-build.yml"), "utf8");
const versionScript = readFileSync(join(root, "mobile", "scripts", "version-android.mjs"), "utf8");
const billingPlugin = join(androidRoot, "src", "main", "java", "io", "github", "cameronnel", "hanapath", "PremiumWritingPlugin.java");

assert.match(manifest, /android:allowBackup="false"/);
assert.match(manifest, /android:fullBackupContent="false"/);
assert.doesNotMatch(manifest, /<uses-permission android:name="com\.android\.vending\.BILLING"\s*\/>/);
assert.match(manifest, /android:name="com\.android\.vending\.BILLING" tools:node="remove"/);
assert.doesNotMatch(manifest, /android\.permission\.RECORD_AUDIO/);

assert.doesNotMatch(paths, /<external-path\b/);
assert.doesNotMatch(paths, /path="\."/);
assert.match(paths, /<files-path name="hanapath_exports" path="exports\/"\s*\/>/);
assert.match(paths, /<cache-path name="hanapath_shared_cache" path="shared\/"\s*\/>/);

assert.equal(existsSync(billingPlugin), false, "free_all build must not ship PremiumWritingPlugin.java");
assert.doesNotMatch(mainActivity, /PremiumWritingPlugin/);
assert.doesNotMatch(buildGradle, /com\.android\.billingclient|billingclient/i);
assert.doesNotMatch(strings, /premium_writing_product_id|play_billing_public_key/);

assert.match(versionScript, /versionCode.*strictly\s+increase/s);
assert.match(versionScript, /expected exactly one versionCode line/);
assert.match(releaseWorkflow, /Inject release version/);
assert.match(releaseWorkflow, /Enforce monotonic versionCode/);
assert.doesNotMatch(buildWorkflow, /grep -v '\^com\\\.android\\\.vending\\\.BILLING\$'/);
assert.doesNotMatch(releaseWorkflow, /grep -v '\^com\\\.android\\\.vending\\\.BILLING\$'/);
assert.match(buildWorkflow, /node scripts\/test-android-release-safety\.mjs/);
assert.match(releaseWorkflow, /node scripts\/test-android-release-safety\.mjs/);

console.log("Android backup, FileProvider, billing-free build, permissions, and release versioning contracts passed.");
