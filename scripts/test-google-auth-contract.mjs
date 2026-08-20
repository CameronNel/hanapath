#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const core = read("google_auth.js");
const web = read("google_auth_web.js");
const config = read("firebase_config.js");
const rules = read("firestore.rules");
const index = read("index.html");
const serviceWorker = read("sw.js");
const prepare = read("mobile/scripts/prepare-web.mjs");
const services = JSON.parse(read("mobile/android/app/google-services.json"));
const gradle = read("mobile/android/app/build.gradle");
const activity = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/MainActivity.java");
const plugin = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/GoogleSignInPlugin.java");

assert.match(config, /projectId: "hanapath"/);
assert.match(config, /webClientId: "978247158815-[a-z0-9]+\.apps\.googleusercontent\.com"/);
assert.match(core, /accounts:signInWithIdp/);
assert.match(core, /securetoken\.googleapis\.com\/v1\/token/);
assert.match(core, /firestore\.googleapis\.com\/v1\/projects/);
assert.match(core, /accounts:delete/);
assert.match(core, /Authorization: `Bearer \$\{session\.idToken\}`/);
assert.match(core, /window\.confirm\("Permanently delete/);
assert.match(core, /HANAPATH_CLOUD_MERGE\.stripForCloud/);
assert.match(core, /HANAPATH_CLOUD_MERGE\.mergeStates|adapter\.merge/);
assert.match(core, /adapter\.adoptRemote/);
assert.match(core, /crypto\.subtle\.digest\("SHA-256"/);
assert.doesNotMatch(core, /Math\.random/, "authentication and device IDs must use secure randomness");
assert.match(core, /Capacitor\?\.Plugins\?\.GoogleSignIn/);

assert.match(rules, /request\.auth\.uid == uid/);
assert.match(rules, /backupId == 'current'/);
assert.match(rules, /stateJson\.size\(\) <= 850000/);
assert.match(rules, /match \/\{document=\*\*\}[\s\S]*allow read, write: if false/);

assert.match(web, /https:\/\/accounts\.google\.com\/gsi\/client/);
assert.match(index, /src="\.\/firebase_config\.js\?v=20260812c"/);
assert.match(index, /src="\.\/cloud_sync_merge\.js\?v=20260812c"/);
assert.match(index, /data-browser-only src="\.\/google_auth_web\.js\?v=20260812c"/);
assert.match(serviceWorker, /"\.\/firebase_config\.js\?v=20260812c"/);
assert.match(serviceWorker, /"\.\/cloud_sync_merge\.js\?v=20260812c"/);
assert.match(prepare, /data-browser-only/);
assert.match(prepare, /nativeIndexHtml/);

assert.equal(services.project_info.project_id, "hanapath");
assert.equal(services.client[0].client_info.android_client_info.package_name, "io.github.cameronnel.hanapath");
assert.match(gradle, /com\.google\.android\.libraries\.identity\.googleid:googleid:1\.2\.0/);
assert.match(activity, /registerPlugin\(GoogleSignInPlugin\.class\)/);
assert.match(plugin, /GetSignInWithGoogleOption/);
assert.match(plugin, /default_web_client_id/);
assert.match(plugin, /setNonce\(nonce\)/);
assert.doesNotMatch(plugin, /SharedPreferences|putString\([^\n]*idToken/, "native plugin must not persist the ID token");

console.log("Google auth contract passed: Firebase Google sign-in, user-owned Firestore sync, deletion, and browser/native wiring.");
