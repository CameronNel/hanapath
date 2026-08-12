#!/usr/bin/env node
// Audit the generated native web payload (mobile/www) and the Capacitor
// Android project against the packaging contract in
// docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md §12.3.
//
// Run after `npm run prepare:web` inside mobile/. Fails (exit 1) on any
// contract violation; prints measured file counts and sizes.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const wwwRoot = join(repoRoot, "mobile", "www");
const manifestPath = join(repoRoot, "mobile", "www-manifest.json");
const androidRoot = join(repoRoot, "mobile", "android");

const errors = [];
const warnings = [];

// Conservative uncompressed payload guard. The current package is close
// enough to Play delivery thresholds that further growth must be an explicit
// release decision, not a silent warning hundreds of MiB later.
const SIZE_WARN_MIB = 190;
const SIZE_FAIL_MIB = 200;

// Assets the app cannot run without.
const REQUIRED_ASSETS = [
  "index.html",
  "app.js",
  "native_ads.js",
  "styles.css",
  "audio_map.js",
  "words_curated_core.js",
  "words_inflect.js",
  "words_lesson_plan.js",
  "raw_word_meanings.js",
  "sentences_core.js",
  "sentences_lesson_plan.js",
  "sentence_feedback.js",
  "sentence_exam_eligibility.js",
  "hangul_strokes.js",
  "alphabet_skill_srs.js",
  "manifest.webmanifest",
  "korean_5000_claude_ready.csv",
  "korean_supplementary_15k.csv",
  "lib/hangul.js",
  "lib/hangul_q_recognizer.js",
  "fonts/fonts.css",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

// Repository directories that must never be packaged.
const DISALLOWED_TOP_DIRS = new Set([
  ".agents", ".claude", ".git", ".github", "docs", "mobile", "node_modules", "scratch", "scripts", "__pycache__",
]);

// File shapes that must never be packaged anywhere in the payload.
const DISALLOWED_FILE_PATTERNS = [
  { re: /\.py$/i, why: "Python tooling" },
  { re: /\.map$/i, why: "source map" },
  { re: /\.log$/i, why: "log file" },
  { re: /\.(jks|keystore|p12|pem|key)$/i, why: "signing/credential material" },
  { re: /(^|\/)\.env(\.|$)/i, why: "environment secrets" },
  { re: /(^|\/)sw\.js$/, why: "service worker (native runtime must not register one)" },
];

// Remote references in load positions (same contract as prepare-web.mjs).
const REMOTE_DEPENDENCY_PATTERNS = [
  /url\(\s*["']?https?:\/\//i,
  /\bsrc\s*=\s*["']https?:\/\//i,
  /<link\b[^>]*\bhref\s*=\s*["']https?:\/\//i,
  /\bfetch\(\s*["'`]https?:\/\//,
  /\.src\s*=\s*["'`]https?:\/\//,
  /\bimportScripts\(/,
  /\bimport\s+[^;]*\bfrom\s*["']https?:\/\//,
  /\bnew\s+Worker\(\s*["'`]https?:\/\//,
];

// INTERNET and network-state access support the optional ML Kit download and
// AdMob delivery. AD_ID is a normal Google Play services permission used by the
// ads SDK; Billing and all unrelated permissions remain forbidden.
const ALLOWED_ANDROID_PERMISSIONS = new Set([
  "android.permission.INTERNET",
  "android.permission.ACCESS_NETWORK_STATE",
  "com.google.android.gms.permission.AD_ID",
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!existsSync(wwwRoot)) {
  errors.push("mobile/www does not exist — run `npm run prepare:web` inside mobile/ first");
} else {
  const files = walk(wwwRoot);
  const relFiles = files
    .map((f) => relative(wwwRoot, f).split(sep).join("/"))
    .filter((rel) => rel !== ".hanapath-generated");
  const relSet = new Set(relFiles);

  for (const required of REQUIRED_ASSETS) {
    if (!relSet.has(required)) errors.push(`mobile/www is missing required asset: ${required}`);
  }

  const fontFileCount = relFiles.filter((f) => f.startsWith("fonts/files/") && f.endsWith(".woff2")).length;
  if (fontFileCount === 0) errors.push("mobile/www/fonts/files contains no woff2 fonts");
  const audioCount = relFiles.filter((f) => f.startsWith("audio/") && f.endsWith(".ogg")).length;
  if (audioCount < 30000) errors.push(`mobile/www/audio has ${audioCount} ogg files; expected the full mapped library (>30000)`);

  for (const rel of relFiles) {
    const top = rel.split("/")[0];
    if (DISALLOWED_TOP_DIRS.has(top)) errors.push(`disallowed repository directory packaged: ${rel}`);
    for (const { re, why } of DISALLOWED_FILE_PATTERNS) {
      if (re.test(rel)) errors.push(`disallowed file packaged (${why}): ${rel}`);
    }
  }

  // index.html local references must resolve inside the package.
  const indexHtml = readFileSync(join(wwwRoot, "index.html"), "utf8");
  if (!/<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']*viewport-fit=cover/i.test(indexHtml)) {
    errors.push("mobile/www/index.html must opt into viewport-fit=cover for safe-area insets");
  }
  if (!/<script\b[^>]*\bsrc=["']\.\/native_ads\.js["'][^>]*><\/script>/i.test(indexHtml)) {
    errors.push("mobile/www/index.html must load the native-only lesson ad trigger");
  }
  const refs = [];
  for (const match of indexHtml.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) refs.push(match[1]);
  for (const match of indexHtml.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) refs.push(match[1]);
  for (const ref of refs) {
    if (/^https?:\/\//.test(ref)) {
      errors.push(`mobile/www/index.html references a remote asset: ${ref}`);
      continue;
    }
    const bare = ref.split("?")[0].replace(/^\.\//, "");
    if (bare && !relSet.has(bare)) errors.push(`mobile/www/index.html references a missing local asset: ${bare}`);
  }

  // No remote runtime dependencies in any packaged text asset.
  const textExtensions = new Set([".html", ".css", ".js", ".mjs", ".json", ".webmanifest", ".svg"]);
  let totalBytes = 0;
  const hashed = [];
  for (const full of files) {
    const rel = relative(wwwRoot, full).split(sep).join("/");
    if (rel === ".hanapath-generated") continue;
    const bytes = readFileSync(full);
    totalBytes += bytes.length;
    hashed.push({ path: rel, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
    const ext = rel.slice(rel.lastIndexOf(".")).toLowerCase();
    if (textExtensions.has(ext)) {
      const text = bytes.toString("utf8");
      for (const pattern of REMOTE_DEPENDENCY_PATTERNS) {
        const match = text.match(pattern);
        if (match) errors.push(`${rel} contains a remote runtime dependency: ${match[0]}`);
      }
    }
  }

  // The native runtime must skip service-worker registration.
  const appJs = readFileSync(join(wwwRoot, "app.js"), "utf8");
  const swGuard = appJs.match(/function registerServiceWorker\(\)\s*\{\s*if \(isHanaPathNative\(\)\)/);
  if (!swGuard) {
    errors.push("app.js registerServiceWorker() is not guarded by isHanaPathNative() — the native WebView would register a service worker");
  }

  // Capacitor 8 supplies --safe-area-inset-* when Android WebView env() values
  // are unavailable or unreliable. The shared shell must consume those values
  // first and preserve env() as the browser/PWA fallback.
  const stylesCss = readFileSync(join(wwwRoot, "styles.css"), "utf8");
  const safeAreaContracts = [
    [/--app-safe-top:\s*var\(--safe-area-inset-top,\s*env\(safe-area-inset-top,\s*0px\)\)/, "top safe-area fallback"],
    [/--app-safe-right:\s*var\(--safe-area-inset-right,\s*env\(safe-area-inset-right,\s*0px\)\)/, "right safe-area fallback"],
    [/--app-safe-bottom:\s*var\(--safe-area-inset-bottom,\s*env\(safe-area-inset-bottom,\s*0px\)\)/, "bottom safe-area fallback"],
    [/--app-safe-left:\s*var\(--safe-area-inset-left,\s*env\(safe-area-inset-left,\s*0px\)\)/, "left safe-area fallback"],
    [/\.screen-shell\s*\{[\s\S]*?inset:\s*var\(--app-safe-top\)\s+var\(--app-safe-right\)\s+var\(--app-safe-bottom\)\s+var\(--app-safe-left\)/, "onboarding safe-area boundary"],
    [/\.app-shell\s*\{[\s\S]*?inset:\s*var\(--app-safe-top\)\s+var\(--app-safe-right\)\s+0\s+var\(--app-safe-left\)/, "app-shell safe-area boundary"],
    [/\.bottom-nav\s*\{[\s\S]*?padding-bottom:\s*var\(--app-safe-bottom\)/, "bottom-navigation safe area"],
  ];
  for (const [pattern, description] of safeAreaContracts) {
    if (!pattern.test(stylesCss)) errors.push(`styles.css is missing the ${description} contract`);
  }

  // Deterministic manifest: recompute and compare byte-for-byte.
  if (!existsSync(manifestPath)) {
    errors.push("mobile/www-manifest.json missing — prepare-web.mjs must produce it");
  } else {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    hashed.sort((a, b) => a.path.localeCompare(b.path, "en"));
    const recomputed = JSON.stringify(hashed);
    const recorded = JSON.stringify((manifest.files || []).map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 })));
    if (recomputed !== recorded) errors.push("www-manifest.json does not match the actual mobile/www contents (non-deterministic or stale)");
    if (manifest.fileCount !== hashed.length) errors.push(`www-manifest.json fileCount ${manifest.fileCount} != actual ${hashed.length}`);
  }

  const totalMib = totalBytes / 1024 / 1024;
  console.log(`mobile/www: ${hashed.length} files, ${totalMib.toFixed(2)} MiB (audio: ${audioCount} ogg, fonts: ${fontFileCount} woff2)`);
  if (totalMib > SIZE_FAIL_MIB) errors.push(`package size ${totalMib.toFixed(0)} MiB exceeds the hard ceiling of ${SIZE_FAIL_MIB} MiB — revisit the audio strategy (handover §7)`);
  else if (totalMib > SIZE_WARN_MIB) warnings.push(`package size ${totalMib.toFixed(0)} MiB exceeds the documented ${SIZE_WARN_MIB} MiB warning threshold`);
}

// Android project checks.
if (!existsSync(androidRoot)) {
  errors.push("mobile/android does not exist — run `npx cap add android` inside mobile/");
} else {
  const manifestXmlPath = join(androidRoot, "app", "src", "main", "AndroidManifest.xml");
  const manifestXml = readFileSync(manifestXmlPath, "utf8");
  for (const match of manifestXml.matchAll(/<uses-permission\b[^>]*>/g)) {
    const tag = match[0];
    if (/tools:node=["']remove["']/.test(tag)) continue;
    const permission = tag.match(/android:name=["']([^"']+)["']/)?.[1];
    if (permission && !ALLOWED_ANDROID_PERMISSIONS.has(permission)) {
      errors.push(`AndroidManifest.xml declares an unexpected permission: ${permission}`);
    }
  }
  if (!/com\.google\.android\.gms\.ads\.APPLICATION_ID/.test(manifestXml)) {
    errors.push("AndroidManifest.xml is missing the AdMob application-id metadata");
  }
  if (/android:usesCleartextTraffic=["']true["']/.test(manifestXml)) {
    errors.push("AndroidManifest.xml enables cleartext traffic");
  }

  const buildGradle = readFileSync(join(androidRoot, "app", "build.gradle"), "utf8");
  const appId = buildGradle.match(/applicationId\s+["']([^"']+)["']/);
  if (!appId) errors.push("app/build.gradle: applicationId missing");
  else if (appId[1] !== "io.github.cameronnel.hanapath") errors.push(`app/build.gradle applicationId is ${appId[1]}; expected io.github.cameronnel.hanapath`);
  if (!/versionCode\s+\d+/.test(buildGradle)) errors.push("app/build.gradle: versionCode missing");
  if (!/versionName\s+["']/.test(buildGradle)) errors.push("app/build.gradle: versionName missing");
  if (!/com\.google\.android\.gms:play-services-ads:25\.4\.0/.test(buildGradle)) errors.push("app/build.gradle must pin Google Mobile Ads SDK 25.4.0");
  if (!/com\.google\.android\.ump:user-messaging-platform:4\.0\.0/.test(buildGradle)) errors.push("app/build.gradle must pin UMP SDK 4.0.0");
  if (!/HANAPATH_ADMOB_APP_ID/.test(buildGradle) || !/HANAPATH_ADMOB_INTERSTITIAL_ID/.test(buildGradle)) {
    errors.push("app/build.gradle must keep production AdMob identifiers owner-configured");
  }

  const variablesGradle = readFileSync(join(androidRoot, "variables.gradle"), "utf8");
  const minSdk = variablesGradle.match(/minSdkVersion\s*=\s*(\d+)/);
  const targetSdk = variablesGradle.match(/targetSdkVersion\s*=\s*(\d+)/);
  if (!minSdk) errors.push("variables.gradle: minSdkVersion missing");
  else if (Number(minSdk[1]) < 23) errors.push(`minSdkVersion ${minSdk[1]} is below the supported floor of 23`);
  if (!targetSdk) errors.push("variables.gradle: targetSdkVersion missing");
  else if (Number(targetSdk[1]) !== 36) errors.push(`targetSdkVersion ${targetSdk[1]} does not match HanaPath's audited API 36 release contract`);

  const capacitorConfig = JSON.parse(readFileSync(join(repoRoot, "mobile", "capacitor.config.json"), "utf8"));
  if (capacitorConfig.appId !== "io.github.cameronnel.hanapath") errors.push(`capacitor.config.json appId is ${capacitorConfig.appId}`);
  if (capacitorConfig.webDir !== "www") errors.push(`capacitor.config.json webDir is ${capacitorConfig.webDir}; expected www`);
  if (capacitorConfig.android && capacitorConfig.android.webContentsDebuggingEnabled === true) {
    errors.push("capacitor.config.json enables WebView debugging");
  }
  if (capacitorConfig.plugins?.SystemBars?.insetsHandling !== "css") {
    errors.push('capacitor.config.json must keep SystemBars.insetsHandling at "css"');
  }
  if (targetSdk && appId) {
    console.log(`android: appId ${appId[1]}, minSdk ${minSdk ? minSdk[1] : "?"}, targetSdk ${targetSdk[1]}, permissions OK`);
  }
}

console.log(`Errors: ${errors.length}`);
for (const message of errors) console.log(`  ERROR ${message}`);
console.log(`Warnings: ${warnings.length}`);
for (const message of warnings) console.log(`  warn  ${message}`);
if (errors.length) process.exit(1);
console.log("Mobile package audit passed.");