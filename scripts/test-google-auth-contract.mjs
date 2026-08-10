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
const rules = read("firestore.rules");
const prepare = read("mobile/scripts/prepare-web.mjs");
const gradle = read("mobile/android/app/build.gradle");
const activity = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/MainActivity.java");
const plugin = read("mobile/android/app/src/main/java/io/github/cameronnel/hanapath/GoogleSignInPlugin.java");

// Firebase is the trust boundary now. The client exchanges Google's signed ID
// token for a Firebase ID/refresh-token pair and uses Firebase Auth identity to
// authorize a single user's Firestore progress document.
assert.match(core, /accounts:signInWithIdp/);
assert.match(core, /providerId:\s*"google\.com"/);
assert.match(core, /securetoken\.googleapis\.com/);
assert.match(core, /firestore\.googleapis\.com/);
assert.match(core, /Authorization/);
assert.match(core, /Bearer \$\{active\.idToken\}/);
assert.match(core, /documents\/users\/\$\{encodeURIComponent\(uid\)\}\/progress\/current/);
assert.match(core, /currentDocument\.updateTime/);
assert.match(core, /currentDocument\.exists/);
assert.match(core, /stateSha256/);
assert.match(core, /hanapath-cloud-conflict-v1:/);
assert.match(core, /Storage\.prototype\.setItem/);
assert.match(core, /key === PROGRESS_KEY/);
assert.doesNotMatch(core, /sessionEndpoint/, "custom session server must not be required for Firebase sync");
assert.doesNotMatch(core, /atob\(|split\("\."\)/, "client must never decode a Google/Firebase JWT and trust its claims locally");
assert.doesNotMatch(core, /Math\.random/, "authentication identifiers must never use a non-cryptographic fallback");
assert.doesNotMatch(core, /localStorage\.setItem\([^\n]*(googleIdToken|oauthIdToken)/, "Google credentials must never be persisted directly");

assert.match(index, /firebaseApiKey:\s*""/);
assert.match(index, /firebaseProjectId:\s*""/);
assert.match(index, /webClientId:\s*""/);
assert.match(index, /data-browser-only src="\.\/google_auth_web\.js\?v=20260810c"/);

// Each authenticated user may read/write only their own progress/current doc.
assert.match(rules, /request\.auth != null/);
assert.match(rules, /request\.auth\.uid == userId/);
assert.match(rules, /match \/users\/\{userId\}\/progress\/current/);
assert.doesNotMatch(rules, /allow read, write: if true/);

assert.match(web, /https:\/\/accounts\.google\.com\/gsi\/client/);
assert.match(web, /google\?\.accounts\?\.id/);
assert.match(prepare, /data-browser-only/);
assert.match(prepare, /nativeIndexHtml/);

assert.match(gradle, /androidx\.credentials:credentials:1\.6\.0/);
assert.match(gradle, /androidx\.credentials:credentials-play-services-auth:1\.6\.0/);
assert.match(gradle, /com\.google\.android\.libraries\.identity\.googleid:googleid:1\.2\.0/);
assert.match(activity, /registerPlugin\(GoogleSignInPlugin\.class\)/);
assert.match(plugin, /GetSignInWithGoogleOption/);
assert.match(plugin, /GOOGLE_SIGN_IN_CONFIGURATION_REQUIRED/);
assert.match(plugin, /setNonce\(nonce\)/);
assert.doesNotMatch(plugin, /SharedPreferences|putString\([^\n]*idToken/, "native plugin must not persist the Google ID token");

console.log("Google/Firebase auth contract passed: fail-closed config, Firebase session exchange, per-user Firestore sync, conflict safety, and browser/native separation.");
