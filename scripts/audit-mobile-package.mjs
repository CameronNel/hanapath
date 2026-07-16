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

// Documented size expectations (MiB). The base payload is ~167 MiB today,
// dominated by the audio library (handover §7 parity experiment).
const SIZE_WARN_MIB = 200;
const SIZE_FAIL_MIB = 400;

// Assets the app cannot run without.
const REQUIRED_ASSETS = [
  "index.html",
  "app.js",
  "styles.css",
  "app_intro.css",
  "app_intro.js",
  "app_intro_timeline.js",
  "audio_map.js",
  "words_curated_core.js",
  "words_inflect.js",
  "words_lesson_plan.js",
  "raw_word_meanings.js",
  "sentences_core.js",
  "sentences_lesson_plan.js",
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
  /\b(?:src|href)\s*=\s*["']https?:\/\//i,
  /\bfetch\(\s*["'`]https?:\/\//,
  /\.src\s*=\s*["'`]https?:\/\//,
  /\bimportScripts\(/,
  /\bimport\s+[^;]*\bfrom\s*["']https?:\/\//,
  /\bnew\s+Worker\(\s*["'`]https?:\/\//,
];

// Android permissions the foundation is allowed to declare. INTERNET is a
// normal (non-dangerous) permission needed by the hosted/browser product and
// a future optional ML Kit model download.
const ALLOWED_ANDROID_PERMISSIONS = new Set(["android.permission.INTERNET"]);

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
  for (const match of manifestXml.matchAll(/<uses-permission[^>]*android:name=["']([^"']+)["']/g)) {
    if (!ALLOWED_ANDROID_PERMISSIONS.has(match[1])) {
      errors.push(`AndroidManifest.xml declares an unexpected permission: ${match[1]}`);
    }
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

  const variablesGradle = readFileSync(join(androidRoot, "variables.gradle"), "utf8");
  const minSdk = variablesGradle.match(/minSdkVersion\s*=\s*(\d+)/);
  const targetSdk = variablesGradle.match(/targetSdkVersion\s*=\s*(\d+)/);
  if (!minSdk) errors.push("variables.gradle: minSdkVersion missing");
  else if (Number(minSdk[1]) < 23) errors.push(`minSdkVersion ${minSdk[1]} is below the supported floor of 23`);
  if (!targetSdk) errors.push("variables.gradle: targetSdkVersion missing");
  else if (Number(targetSdk[1]) < 35) errors.push(`targetSdkVersion ${targetSdk[1]} is below the current Play requirement of 35`);

  const capacitorConfig = JSON.parse(readFileSync(join(repoRoot, "mobile", "capacitor.config.json"), "utf8"));
  if (capacitorConfig.appId !== "io.github.cameronnel.hanapath") errors.push(`capacitor.config.json appId is ${capacitorConfig.appId}`);
  if (capacitorConfig.webDir !== "www") errors.push(`capacitor.config.json webDir is ${capacitorConfig.webDir}; expected www`);
  if (capacitorConfig.android && capacitorConfig.android.webContentsDebuggingEnabled === true) {
    errors.push("capacitor.config.json enables WebView debugging");
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
