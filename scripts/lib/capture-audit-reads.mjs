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
    if (!abs.startsWith(ROOT)) return;
    const rel = path.relative(ROOT, abs).split(path.sep).join("/");
    // node_modules and generated mobile payloads are not audit inputs.
    if (rel.startsWith("node_modules/") || rel.startsWith("mobile/www/")) return;
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) reads.add(rel);
  } catch {
    /* unreadable path: nothing to pin */
  }
}

// Patch on the module object so every `import fs from "node:fs"` consumer sees
// it. Audits that destructure named exports would bypass this, so the freeze
// tool unions this capture with a static scan of the audit source.
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
