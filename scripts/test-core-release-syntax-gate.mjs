#!/usr/bin/env node
// Regression test for the core-release syntax gate.
//
// `node --check a.js b.js` only checks the FIRST filename; Node ignores every
// later filename. An earlier runSyntaxStep() passed all files in one invocation,
// so it silently checked only app.js and skipped the other 18 root scripts.
// This test locks in the fix: checkSyntax() must invoke `node --check` once per
// file and fail when ANY file — including a non-first one — is invalid.

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkSyntax } from "./audit-core-release.mjs";

const dir = mkdtempSync(join(tmpdir(), "core-syntax-"));
let failures = 0;

try {
  writeFileSync(join(dir, "good.js"), "const a = 1;\nexport {};\n");
  writeFileSync(join(dir, "bad.js"), "const b = ;\n"); // deliberate syntax error

  // 1. Document the trap the fix defends against: the single multi-arg
  //    invocation wrongly returns 0 because the bad second file is ignored.
  const multi = spawnSync("node", ["--check", join(dir, "good.js"), join(dir, "bad.js")], {
    encoding: "utf8",
  });
  if (multi.status === 0) {
    console.log("confirmed trap: `node --check good.js bad.js` returns 0 (bad.js ignored)");
  } else {
    console.log(
      "note: this Node no longer ignores extra --check args; the fix is still required for older Node"
    );
  }

  // 2. The fix must FAIL when a non-first file is invalid.
  console.log("(the SyntaxError printed next is expected — it proves bad.js was checked)");
  if (checkSyntax(["good.js", "bad.js"], dir) !== false) {
    console.error("FAIL: checkSyntax([good, bad]) returned true — second file was not checked");
    failures++;
  }

  // 3. Sanity: an all-valid list passes.
  if (checkSyntax(["good.js"], dir) !== true) {
    console.error("FAIL: checkSyntax([good]) returned false for a valid file");
    failures++;
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\nSyntax-gate regression FAILED (${failures}).`);
  process.exit(1);
}
console.log("\nPASS: core-release syntax gate checks every file individually.");
