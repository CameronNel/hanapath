#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const candidates = [
  process.env.CHROME_BIN,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((path) => existsSync(path));
if (!chrome) {
  console.error("No Chrome/Chromium binary found for the L1 learner journey gate.");
  process.exit(1);
}

const MIME = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".csv", "text/csv; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".webmanifest", "application/manifest+json"],
  [".woff2", "font/woff2"],
  [".mp3", "audio/mpeg"],
  [".wav", "audio/wav"],
]);

const earlyErrorBridge = `
<script>
(() => {
  const send = (kind, value) => {
    try {
      parent.postMessage({ source: "hanapath-l1", kind, message: String(value || "unknown") }, "*");
    } catch (_) {}
  };
  addEventListener("error", (event) => send("pageerror", event.message || event.error));
  addEventListener("unhandledrejection", (event) => send("unhandledrejection", event.reason && (event.reason.stack || event.reason.message || event.reason)));
  window.confirm = () => true;
})();
</script>`;

function injectedIndex() {
  let html = readFileSync(join(ROOT, "index.html"), "utf8");
  html = html.replace(/<head>/i, `<head>\n<base href="/" />\n${earlyErrorBridge}`);
  return html;
}

function safeFilePath(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const relative = normalize(decoded).replace(/^([/\\])+/, "");
  const target = resolve(ROOT, relative || "index.html");
  if (!target.startsWith(ROOT)) return null;
  return target;
}

const server = createServer((request, response) => {
  try {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    if (url.pathname === "/__l1_app__/index.html") {
      const body = injectedIndex();
      response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      response.end(body);
      return;
    }
    const target = safeFilePath(url.pathname);
    if (!target || !existsSync(target) || !statSync(target).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "content-type": MIME.get(extname(target).toLowerCase()) || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(readFileSync(target));
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(String(error && error.stack ? error.stack : error));
  }
});

function runChrome(url, viewport) {
  return new Promise((resolveRun) => {
    const profile = mkdtempSync(join(tmpdir(), "hanapath-l1-chrome-"));
    const child = spawn(chrome, [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-background-networking",
      "--disable-extensions",
      "--disable-sync",
      "--no-first-run",
      "--mute-audio",
      `--user-data-dir=${profile}`,
      `--window-size=${viewport}`,
      "--virtual-time-budget=120000",
      "--run-all-compositor-stages-before-draw",
      "--dump-dom",
      url,
    ], { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
    }, 170000);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => {
      clearTimeout(timeout);
      rmSync(profile, { recursive: true, force: true });
      resolveRun({ code: -1, stdout, stderr, error });
    });
    child.on("close", (code) => {
      clearTimeout(timeout);
      rmSync(profile, { recursive: true, force: true });
      resolveRun({ code, stdout, stderr, error: null });
    });
  });
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function extractFixtureResult(output) {
  const bodyStatus = output.match(/<body\b[^>]*\bdata-test-status="([^"]+)"/i)?.[1] || "missing";
  const match = output.match(/<pre\b[^>]*\bid="fixtureResult"[^>]*>([\s\S]*?)<\/pre>/i);
  const text = decodeHtml((match?.[1] || "").replace(/<[^>]+>/g, "")).trim();
  return { bodyStatus, text };
}

await new Promise((resolveListen, rejectListen) => {
  server.once("error", rejectListen);
  server.listen(0, "127.0.0.1", resolveListen);
});

const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;
let failures = 0;
try {
  for (const viewport of ["375,812", "768,1024"]) {
    const url = `http://127.0.0.1:${port}/tests/fixtures/lesson_journey_gate.html?viewport=${encodeURIComponent(viewport)}`;
    const result = await runChrome(url, viewport);
    const output = result.stdout || "";
    const fixture = extractFixtureResult(output);
    const passed = result.code === 0
      && fixture.bodyStatus === "pass"
      && /^PASS \d+x\d+/m.test(fixture.text);
    if (passed) {
      console.log(`PASS: L1 learner journey gate at ${viewport}`);
    } else {
      failures += 1;
      console.error(`FAIL: L1 learner journey gate at ${viewport}`);
      console.error(`Chrome exit code: ${result.code}`);
      console.error(`Fixture status: ${fixture.bodyStatus}`);
      if (fixture.text) console.error(`Fixture result:\n${fixture.text}`);
      if (result.stderr) console.error(`Chrome stderr tail:\n${result.stderr.slice(-4000)}`);
      if (!fixture.text) console.error(`DOM tail:\n${output.slice(-6000)}`);
      if (result.error) console.error(String(result.error.stack || result.error));
    }
  }
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}

if (failures) process.exit(1);
console.log("L1 learner journey browser gate passed.");
