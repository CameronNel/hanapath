#!/usr/bin/env node
// Guards the two paths an onboarding change broke on the Play Store branch:
// the post-onboarding shell bootstrap, and the pre-safety-v2 alphabet rescue
// record. Both fail silently in production, so they get explicit coverage.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(join(root, "app.js"), "utf8");

function bodyOf(name) {
  const start = app.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `app.js must define ${name}()`);
  let depth = 0;
  for (let i = app.indexOf("{", start); i < app.length; i += 1) {
    if (app[i] === "{") depth += 1;
    else if (app[i] === "}") {
      depth -= 1;
      if (depth === 0) return app.slice(start, i + 1);
    }
  }
  throw new Error(`unbalanced braces reading ${name}()`);
}

// ── Shell bootstrap ────────────────────────────────────────────────────────
// init() returns early for fresh installs, so every listener it used to bind
// has to live in a function both entry points call.
const shell = bodyOf("startAppShell");
assert.match(shell, /appShellStarted/, "startAppShell must guard against double binding");
for (const wiring of [
  'document.querySelectorAll(".nav-btn")',
  'document.getElementById("app-settings-button")',
  "bindKeyboardShortcuts()",
  'goHub("learn")',
]) {
  assert.ok(shell.includes(wiring), `startAppShell must own ${wiring}`);
}

const init = bodyOf("init");
assert.ok(init.includes("startAppShell()"), "init() must hand off to startAppShell()");
assert.ok(
  !init.includes('document.querySelectorAll(".nav-btn")'),
  "nav wiring must not be duplicated back into init()",
);

const onboarding = bodyOf("renderOnboarding");
assert.ok(
  onboarding.includes("startAppShell()"),
  "the onboarding start button must run the same bootstrap as a returning profile",
);
assert.ok(
  !/showTab\("today"\);\s*\n\s*bindKeyboardShortcuts\(\);/.test(onboarding),
  "onboarding must not re-introduce the partial bootstrap that left the nav unbound",
);

// ── Alphabet rescue record ─────────────────────────────────────────────────
const migrate = bodyOf("migrateAlphabetProgress");
assert.match(
  migrate,
  /phaseOneCompletedBeforeSafetyV2/,
  "migrateAlphabetProgress must still consume the pre-safety-v2 rescue record",
);
assert.match(migrate, /restoredAt/, "the rescue record must be stamped so it is consumed once");
assert.ok(
  migrate.indexOf("phaseOneCompletedBeforeSafetyV2") < migrate.indexOf("normalizeCompletedAlphabetIds("),
  "rescued ids must be merged before canonicalization, not after",
);
assert.match(
  migrate,
  /rescueConsumed \|\| JSON\.stringify\(cleaned\) !== before/,
  "consuming the rescue record must persist even when the canonical list is unchanged",
);
assert.ok(
  !/if \(!state\.onboarded\) cleaned = \[\]/.test(migrate),
  "migration must never clear completion just because the onboarding flag is absent",
);

// ── Storage safety ─────────────────────────────────────────────────────────
const save = bodyOf("saveState");
assert.match(save, /STORAGE_RECOVERY_KEY/, "saveState must keep a verified recovery copy");
assert.ok(
  !/localStorage\.removeItem\(STORAGE_KEY\)/.test(save),
  "saveState must never remove the live profile key",
);
const load = bodyOf("loadState");
assert.match(load, /STORAGE_CORRUPT_KEY/, "loadState must quarantine an unreadable payload");

console.log("App-shell bootstrap, alphabet rescue record, and storage-safety contracts passed.");
