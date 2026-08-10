#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const core = read("google_auth.js");
const web = read("google_auth_web.js");
const index = read("index.html");
const prepare = read("mobile/scripts/prepare-web.mjs");
const gradle = read("mobile/android/app/build.gradle");
const activity = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/MainActivity.java");
const plugin = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/GoogleSignInPlugin.java");

assert.match(core, /sessionEndpoint/);
assert.match(core, /url\.protocol === "https:"/);
assert.match(core, /credentials: "include"/);
assert.match(core, /exchangeCredential\(credential, requestNonce, platform\)/);
assert.doesNotMatch(core, /atob\(|split\("\."\)|localStorage/, "client must not decode or persist an ID token");
assert.doesNotMatch(core, /Math\.random/, "authentication nonces must never use a non-cryptographic fallback");
assert.match(core, /Capacitor\?\.Plugins\?\.GoogleSignIn/);
assert.match(core, /Learning progress remains on this device and is not synced/);

assert.match(web, /https:\/\/accounts\.google\.com\/gsi\/client/);
assert.match(web, /google\?\.accounts\?\.id/);
assert.match(index, /data-browser-only src="\.\/google_auth_web\.js\?v=20260810c"/);
assert.match(prepare, /data-browser-only/);
assert.match(prepare, /nativeIndexHtml/);

assert.match(gradle, /androidx\.credentials:credentials:1\.6\.0/);
assert.match(gradle, /androidx\.credentials:credentials-play-services-auth:1\.6\.0/);
assert.match(gradle, /com\.google\.android\.libraries\.identity\.googleid:googleid:1\.2\.0/);
assert.match(activity, /registerPlugin\(GoogleSignInPlugin\.class\)/);
assert.match(plugin, /GetSignInWithGoogleOption/);
assert.match(plugin, /GOOGLE_SIGN_IN_CONFIGURATION_REQUIRED/);
assert.match(plugin, /setNonce\(nonce\)/);
assert.doesNotMatch(plugin, /SharedPreferences|putString\([^\n]*idToken/, "native plugin must not persist the ID token");

console.log("Google auth contract passed: disabled-by-default config, server verification boundary, browser/native separation, and native dependencies.");
