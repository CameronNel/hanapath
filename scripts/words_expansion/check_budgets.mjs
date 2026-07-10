import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PORT = 8765;
const BUDGETS = {
  curatedBytes: 1.5 * 1024 * 1024,
  realisticSrsBytes: 5.5 * 1024 * 1024,
  shellBytes: 12 * 1024 * 1024,
  audioRuntimeEntries: 256,
  mobileLoadMs: 5000
};

function bytes(filePath) { return fs.statSync(filePath).size; }
function parseShellAssets() {
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  const cacheName = sw.match(/const CACHE_NAME\s*=\s*["']([^"']+)["']/)?.[1] || null;
  const audioLimit = Number(sw.match(/const AUDIO_RUNTIME_CACHE_LIMIT\s*=\s*(\d+)/)?.[1] || 0);
  const assets = [...sw.matchAll(/"(\.\/[^"?]+)(?:\?[^"\\]*)?"/g)].map((match) => match[1]);
  const unique = [...new Set(assets)];
  const sizes = unique.filter((asset) => fs.existsSync(path.join(root, asset))).map((asset) => ({ asset, bytes: bytes(path.join(root, asset)) }));
  return { cacheName, audioLimit, assets: sizes, missing: unique.filter((asset) => !fs.existsSync(path.join(root, asset))) };
}

function estimateSrsBytes() {
  const records = {};
  for (let i = 0; i < 10000; i++) records[`expansion-${i}`] = { box: 0, due: 0, seen: 1, correct: 1, missed: 0, lastSeen: 0 };
  return Buffer.byteLength(JSON.stringify({ vocabSrs: records }), "utf8");
}

async function browserCheck() {
  const server = spawn("python", ["-m", "http.server", String(PORT)], { cwd: root, stdio: "ignore" });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const started = Date.now();
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1000);
    const loadMs = Date.now() - started;
    const title = await page.title();
    const serviceWorkerReady = await page.evaluate(async () => {
      if (!navigator.serviceWorker) return false;
      try { await navigator.serviceWorker.ready; return true; } catch { return false; }
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await context.setOffline(true);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
    const offlineTitle = await page.title();
    await browser.close();
    return { loadMs, title, offlineTitle, serviceWorkerReady, pageErrors };
  } finally {
    server.kill();
  }
}

export async function run() {
  const shell = parseShellAssets();
  const report = {
    schemaVersion: 1,
    generatedBy: "scripts/words_expansion/check_budgets.mjs",
    budgets: BUDGETS,
    measurements: {
      curatedBytes: bytes(path.join(root, "words_curated_core.js")),
      realisticSrsBytes: estimateSrsBytes(),
      shellBytes: shell.assets.reduce((sum, asset) => sum + asset.bytes, 0),
      shellAssetCount: shell.assets.length,
      missingShellAssets: shell.missing,
      cacheName: shell.cacheName,
      audioRuntimeEntries: shell.audioLimit
    },
    browser: await browserCheck()
  };
  report.pass = report.measurements.curatedBytes <= BUDGETS.curatedBytes
    && report.measurements.realisticSrsBytes <= BUDGETS.realisticSrsBytes
    && report.measurements.shellBytes <= BUDGETS.shellBytes
    && report.measurements.audioRuntimeEntries <= BUDGETS.audioRuntimeEntries
    && report.measurements.missingShellAssets.length === 0
    && report.browser.loadMs <= BUDGETS.mobileLoadMs
    && report.browser.offlineTitle === "HanaPath"
    && report.browser.serviceWorkerReady
    && report.browser.pageErrors.length === 0;
  fs.writeFileSync(path.join(root, "scripts/words_expansion/budget_report.json"), JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(JSON.stringify(report, null, 2));
  if (!report.pass) process.exitCode = 1;
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await run();
