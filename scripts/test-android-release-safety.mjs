#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const androidRoot = join(root, "mobile", "android", "app");
const javaRoot = join(androidRoot, "src", "main", "java", "io", "github", "cameronnel", "hanapath");
const manifest = readFileSync(join(androidRoot, "src", "main", "AndroidManifest.xml"), "utf8");
const extractionRules = readFileSync(join(androidRoot, "src", "main", "res", "xml", "data_extraction_rules.xml"), "utf8");
const mainActivity = readFileSync(join(javaRoot, "MainActivity.java"), "utf8");
const adsPlugin = readFileSync(join(javaRoot, "HanaPathAdsPlugin.java"), "utf8");
const adCadence = readFileSync(join(javaRoot, "AdCadence.java"), "utf8");
const adCadenceTest = readFileSync(join(androidRoot, "src", "test", "java", "io", "github", "cameronnel", "hanapath", "AdCadenceTest.java"), "utf8");
const buildGradle = readFileSync(join(androidRoot, "build.gradle"), "utf8");
const strings = readFileSync(join(androidRoot, "src", "main", "res", "values", "strings.xml"), "utf8");
const nativeAds = readFileSync(join(root, "mobile", "web", "native_ads.js"), "utf8");
const prepareWeb = readFileSync(join(root, "mobile", "scripts", "prepare-web.mjs"), "utf8");
const releaseWorkflow = readFileSync(join(root, ".github", "workflows", "android-release.yml"), "utf8");
const buildWorkflow = readFileSync(join(root, ".github", "workflows", "android-build.yml"), "utf8");
const versionScript = readFileSync(join(root, "mobile", "scripts", "version-android.mjs"), "utf8");
const packageAudit = readFileSync(join(root, "scripts", "audit-mobile-package.mjs"), "utf8");
const billingPlugin = join(javaRoot, "PremiumWritingPlugin.java");

assert.match(manifest, /android:allowBackup="false"/);
assert.match(manifest, /android:fullBackupContent="false"/);
assert.match(manifest, /android:dataExtractionRules="@xml\/data_extraction_rules"/);
assert.doesNotMatch(manifest, /<uses-permission android:name="com\.android\.vending\.BILLING"\s*\/>/);
assert.match(manifest, /android:name="com\.android\.vending\.BILLING" tools:node="remove"/);
assert.doesNotMatch(manifest, /android\.permission\.RECORD_AUDIO/);
assert.match(manifest, /android:name="android\.permission\.ACCESS_NETWORK_STATE"/);
assert.match(manifest, /android:name="com\.google\.android\.gms\.permission\.AD_ID"/);
assert.match(manifest, /android:name="com\.google\.android\.gms\.ads\.APPLICATION_ID"/);
assert.match(manifest, /android:value="\$\{hanapathAdMobAppId\}"/);

assert.doesNotMatch(manifest, /androidx\.core\.content\.FileProvider/);
assert.equal(existsSync(join(androidRoot, "src", "main", "res", "xml", "file_paths.xml")), false);
assert.match(extractionRules, /<cloud-backup>[\s\S]*?<exclude domain="sharedpref" path="\." \/>[\s\S]*?<\/cloud-backup>/);
assert.match(extractionRules, /<device-transfer>[\s\S]*?<exclude domain="device_sharedpref" path="\." \/>[\s\S]*?<\/device-transfer>/);

assert.equal(existsSync(billingPlugin), false, "free_all build must not ship PremiumWritingPlugin.java");
assert.doesNotMatch(mainActivity, /PremiumWritingPlugin/);
assert.doesNotMatch(buildGradle, /com\.android\.billingclient|billingclient/i);
assert.doesNotMatch(strings, /premium_writing_product_id|play_billing_public_key/);
assert.doesNotMatch(packageAudit.match(/const ALLOWED_ANDROID_PERMISSIONS = new Set\(\[([\s\S]*?)\]\);/)?.[1] || "", /BILLING/);

assert.match(mainActivity, /registerPlugin\(HanaPathAdsPlugin\.class\)/);
assert.match(buildGradle, /com\.google\.android\.gms:play-services-ads:25\.4\.0/);
assert.match(buildGradle, /com\.google\.android\.ump:user-messaging-platform:4\.0\.0/);
assert.match(buildGradle, /HANAPATH_ADMOB_APP_ID/);
assert.match(buildGradle, /HANAPATH_ADMOB_INTERSTITIAL_ID/);
assert.match(buildGradle, /ADMOB_CONFIGURED/);
assert.match(adCadence, /COOLDOWN_MS\s*=\s*5L\s*\*\s*60L\s*\*\s*1000L/);
assert.match(adCadenceTest, /4L \* MINUTE/);
assert.match(adCadenceTest, /7L \* MINUTE/);
assert.match(adCadenceTest, /12L \* MINUTE/);
assert.match(adsPlugin, /AdCadence\.isEligible/);
assert.match(adsPlugin, /GOOGLE_TEST_INTERSTITIAL_ID\s*=\s*"ca-app-pub-3940256099942544\/1033173712"/);
assert.match(adsPlugin, /onAdShowedFullScreenContent\(\)[\s\S]*?PREF_LAST_SHOWN_AT/);
assert.match(adsPlugin, /onAdFailedToShowFullScreenContent[\s\S]*?Do not advance the cooldown/);
assert.match(adsPlugin, /UserMessagingPlatform\.loadAndShowConsentFormIfRequired/);
assert.match(adsPlugin, /PrivacyOptionsRequirementStatus\.REQUIRED/);
assert.match(nativeAds, /profile\.phaseOneCompleted/);
assert.match(nativeAds, /profile\.vocabLessonCompleted/);
assert.match(nativeAds, /completedLessons/);
assert.match(nativeAds, /if \(completions\.length !== 1\) return;/);
assert.match(nativeAds, /window\.addEventListener\("load", arm/);
assert.match(nativeAds, /plugin\.lessonCompleted/);
assert.match(prepareWeb, /native_ads\.js/);
assert.doesNotMatch(readFileSync(join(root, "index.html"), "utf8"), /native_ads\.js/, "hosted PWA must remain ad-free");

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

console.log("Android extraction, native lesson ads, billing-free build, permissions, and release versioning contracts passed.");
