// Tiny capture-regression fixture. It deliberately reads repository inputs
// through named ESM bindings from both node:fs and node:fs/promises so the
// freeze capture cannot regress to observing only default `fs` consumers.
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

readFileSync(join(ROOT, "word_exam_blueprints.js"), "utf8");
await readFile(join(ROOT, "sentence_exam_blueprints.js"), "utf8");
