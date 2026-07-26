#!/usr/bin/env node
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const candidates = [
  process.env.CHROME_BIN,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((path) => existsSync(path));
if (!chrome) {
  console.error("No Chrome/Chromium binary found for the CB2 browser fixture.");
  process.exit(1);
}

const fixtureUrl = pathToFileURL(join(ROOT, "tests", "fixtures", "sentence_lesson_contrasts.html")).href;
let failures = 0;
for (const viewport of ["375,812", "1280,900"]) {
  const profile = mkdtempSync(join(tmpdir(), "hanapath-cb2-chrome-"));
  const result = spawnSync(chrome, [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-extensions",
    "--no-first-run",
    "--allow-file-access-from-files",
    `--user-data-dir=${profile}`,
    `--window-size=${viewport}`,
    "--virtual-time-budget=4000",
    "--dump-dom",
    fixtureUrl,
  ], { encoding: "utf8", timeout: 30000, maxBuffer: 16 * 1024 * 1024 });
  rmSync(profile, { recursive: true, force: true });
  const output = result.stdout || "";
  const passed = result.status === 0 && /data-test-status="pass"/.test(output) && /PASS \d+x\d+/.test(output);
  if (passed) console.log(`PASS: browser contrast fixture at ${viewport}`);
  else {
    console.error(`FAIL: browser contrast fixture at ${viewport}`);
    const details = output || result.stderr || String(result.error || "unknown browser failure");
    console.error(details.slice(-3000));
    failures += 1;
  }
}
if (failures) process.exit(1);
console.log("Sentence lesson contrast browser fixtures passed.");
