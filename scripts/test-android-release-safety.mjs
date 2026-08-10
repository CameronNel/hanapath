#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const androidRoot = join(root, "mobile", "android", "app");
const manifest = readFileSync(join(androidRoot, "src", "main", "AndroidManifest.xml"), "utf8");
const extractionRules = readFileSync(join(androidRoot, "src", "main", "res", "xml", "data_extraction_rules.xml"), "utf8");
const mainActivity = readFileSync(join(androidRoot, "src", "main", "java", "io", "github", "cameronnel", "hanapath", "MainActivity.java"), "utf8");
const buildGradle = readFileSync(join(androidRoot, "build.gradle"), "utf8");
const strings = readFileSync(join(androidRoot, "src", "main", "res", "values", "strings.xml"), "utf8");
const releaseWorkflow = readFileSync(join(root, ".github", "workflows", "android-release.yml"), "utf8");
const buildWorkflow = readFileSync(join(root, ".github", "workflows", "android-build.yml"), "utf8");
const versionScript = readFileSync(join(root, "mobile", "scripts", "version-android.mjs"), "utf8");
const packageAudit = readFileSync(join(root, "scripts", "audit-mobile-package.mjs"), "utf8");
const billingPlugin = join(androidRoot, "src", "main", "java", "io", "github", "cameronnel", "hanapath", "PremiumWritingPlugin.java");

assert.match(manifest, /android:allowBackup="false"/);
assert.match(manifest, /android:fullBackupContent="false"/);
assert.match(manifest, /android:dataExtractionRules="@xml\/data_extraction_rules"/);
assert.doesNotMatch(manifest, /<uses-permission android:name="com\.android\.vending\.BILLING"\s*\/>/);
assert.match(manifest, /android:name="com\.android\.vending\.BILLING" tools:node="remove"/);
assert.doesNotMatch(manifest, /android\.permission\.RECORD_AUDIO/);

assert.doesNotMatch(manifest, /androidx\.core\.content\.FileProvider/);
assert.equal(existsSync(join(androidRoot, "src", "main", "res", "xml", "file_paths.xml")), false);
assert.match(extractionRules, /<cloud-backup>[\s\S]*?<exclude domain="sharedpref" path="\." \/>[\s\S]*?<\/cloud-backup>/);
assert.match(extractionRules, /<device-transfer>[\s\S]*?<exclude domain="device_sharedpref" path="\." \/>[\s\S]*?<\/device-transfer>/);

assert.equal(existsSync(billingPlugin), false, "free_all build must not ship PremiumWritingPlugin.java");
assert.doesNotMatch(mainActivity, /PremiumWritingPlugin/);
assert.doesNotMatch(buildGradle, /com\.android\.billingclient|billingclient/i);
assert.doesNotMatch(strings, /premium_writing_product_id|play_billing_public_key/);
assert.doesNotMatch(packageAudit.match(/const ALLOWED_ANDROID_PERMISSIONS = new Set\(\[([\s\S]*?)\]\);/)?.[1] || "", /BILLING/);

assert.match(versionScript, /expected exactly one versionCode line/);
assert.match(releaseWorkflow, /Inject release version/);
assert.match(releaseWorkflow, /Enforce monotonic versionCode/);
assert.match(releaseWorkflow, /if \[ "\$VERSION_CODE" -le "\$last" \]; then/);
assert.doesNotMatch(buildWorkflow, /grep -v '\^com\\\.android\\\.vending\\\.BILLING\$'/);
assert.doesNotMatch(releaseWorkflow, /grep -v '\^com\\\.android\\\.vending\\\.BILLING\$'/);
assert.match(buildWorkflow, /node scripts\/test-android-release-safety\.mjs/);
assert.match(releaseWorkflow, /node scripts\/audit-core-release\.mjs --full/);
assert.match(releaseWorkflow, /git rev-parse HEAD.*git rev-parse origin\/main/);
assert.match(releaseWorkflow, /:app:lintRelease :app:testDebugUnitTest :app:bundleRelease/);
assert.match(releaseWorkflow, /ANDROID_UPLOAD_CERT_SHA256/);
assert.match(releaseWorkflow, /Upload certificate SHA-256 does not match/);
assert.match(releaseWorkflow, /Signed AAB certificate does not match/);
assert.match(releaseWorkflow, /190 MiB release ceiling/);
assert.doesNotMatch(releaseWorkflow, /uses:\s+actions\/[\w-]+@v\d+/);

console.log("Android extraction, no-FileProvider, billing-free build, permissions, and release versioning contracts passed.");
