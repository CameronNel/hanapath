// Runs one audit script with fs reads instrumented and records every
// repository file it touched. Used by scripts/exam-compute-freeze.mjs to derive
// an audit's real input set instead of hand-maintaining a path list — a
// hand-written list is exactly how a gate silently stops covering a dependency.
//
//   node scripts/lib/capture-audit-reads.mjs <audit.mjs> <out.json> [audit args...]
//
// The audit runs to completion; its own exit code is preserved so a capture
// against a failing audit cannot be mistaken for a clean one.
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { syncBuiltinESMExports } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const target = process.argv[2];
const outPath = process.argv[3];
if (!target || !outPath) {
  console.error("usage: capture-audit-reads.mjs <audit.mjs> <out.json> [audit args...]");
  process.exit(2);
}
const auditArgs = process.argv.slice(4);
const targetAbs = path.resolve(ROOT, target);

const reads = new Set();
function record(candidate) {
  if (typeof candidate !== "string" && !(candidate instanceof URL)) return; // fd or Buffer handle
  try {
    const abs = path.resolve(candidate instanceof URL ? fileURLToPath(candidate) : candidate);
    if (abs !== ROOT && !abs.startsWith(ROOT + path.sep)) return;
    const rel = path.relative(ROOT, abs).split(path.sep).join("/");
    // node_modules and generated mobile payloads are not audit inputs.
    if (rel.startsWith("node_modules/") || rel.startsWith("mobile/www/")) return;
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) reads.add(rel);
  } catch {
    /* unreadable path: nothing to pin */
  }
}

// Patch the mutable default fs surfaces first, then synchronize Node's builtin
// ESM live bindings. The target audit is imported only after this point, so both
// default and named imports observe the instrumented functions. Patch
// node:fs/promises directly rather than relying on fs.promises object identity.
const nativeWrite = fs.writeFileSync.bind(fs);
const nativeExists = fs.existsSync.bind(fs);
const nativeStat = fs.statSync.bind(fs);
for (const name of ["readFileSync", "readFile", "openSync", "createReadStream"]) {
  const original = fs[name];
  if (typeof original !== "function") continue;
  fs[name] = function patched(target_, ...rest) {
    record(target_);
    return original.call(this, target_, ...rest);
  };
}
for (const name of ["readFile", "open"]) {
  const original = fsPromises[name];
  if (typeof original !== "function") continue;
  fsPromises[name] = function patchedPromiseRead(target_, ...rest) {
    record(target_);
    return original.call(this, target_, ...rest);
  };
}
syncBuiltinESMExports();

let flushed = false;
function flush() {
  if (flushed) return;
  flushed = true;
  nativeWrite(outPath, JSON.stringify([...reads].sort(), null, 2) + "\n");
}

const nativeExit = process.exit.bind(process);
process.exit = (code) => {
  flush();
  return nativeExit(code);
};
process.on("exit", flush);

// The audit reads its own flags off process.argv.
process.argv = [process.argv[0], targetAbs, ...auditArgs];
await import(pathToFileURL(targetAbs).href);
flush();

// Keep the helpers referenced so bundlers/linters cannot drop them.
void nativeExists;
void nativeStat;
