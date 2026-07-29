#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

function replaceOnce(path, before, after, label) {
  const text = readFileSync(path, "utf8");
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  writeFileSync(path, text.replace(before, after));
}

replaceOnce(
  "app.js",
  'const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v452";',
  'const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v453";',
  "app integrity shell pin",
);
replaceOnce(
  "app.js",
  'const EXAM_INTEGRITY_ASSET_REVISION = "20260727a";',
  'const EXAM_INTEGRITY_ASSET_REVISION = "20260729a";',
  "app integrity asset pin",
);
replaceOnce(
  "index.html",
  '<script defer src="./app.js?v=20260727a"></script>',
  '<script defer src="./app.js?v=20260729a"></script>',
  "index app revision",
);
replaceOnce(
  "sw.js",
  '"./app.js?v=20260727a"',
  '"./app.js?v=20260729a"',
  "service-worker app revision",
);
replaceOnce(
  "scripts/audit-exam-integrity.mjs",
  'const appRef = index.indexOf("./app.js?v=20260727a");',
  'const appRef = index.indexOf("./app.js?v=20260729a");',
  "integrity audit index app revision",
);
replaceOnce(
  "scripts/audit-exam-integrity.mjs",
  'assert.match(sw, /hanapath-shell-v452/);',
  'assert.match(sw, /hanapath-shell-v453/);',
  "integrity audit shell revision",
);
replaceOnce(
  "scripts/audit-exam-integrity.mjs",
  'assert.match(sw, /\\.\\/app\\.js\\?v=20260727a/);',
  'assert.match(sw, /\\.\\/app\\.js\\?v=20260729a/);',
  "integrity audit service-worker app revision",
);
replaceOnce(
  "scripts/audit-exam-integrity.mjs",
  'assert.match(app, /const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v452"/);',
  'assert.match(app, /const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v453"/);',
  "integrity audit app shell pin",
);
replaceOnce(
  "scripts/audit-exam-integrity.mjs",
  'assert.match(app, /const EXAM_INTEGRITY_ASSET_REVISION = "20260727a"/);',
  'assert.match(app, /const EXAM_INTEGRITY_ASSET_REVISION = "20260729a"/);',
  "integrity audit app asset pin",
);

console.log("Applied X2 integrity/cache pins.");
