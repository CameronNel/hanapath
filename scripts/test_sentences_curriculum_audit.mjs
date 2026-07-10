import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const planSource = fs.readFileSync(path.join(root, "sentences_lesson_plan.js"), "utf8");
const sentencesSource = fs.readFileSync(path.join(root, "sentences_core.js"), "utf8");

function loadPlan() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(sentencesSource, context);
  vm.runInContext(planSource, context);
  if (!context.window.HANAPATH_SENTENCE_LESSONS || !context.window.HANAPATH_SENTENCE_LESSONS.length) {
    throw new Error("Plan does not contain HANAPATH_SENTENCE_LESSONS.");
  }
  return {
    sentences: context.window.HANAPATH_SENTENCES,
    units: context.window.HANAPATH_SENTENCE_UNITS,
    lessons: context.window.HANAPATH_SENTENCE_LESSONS
  };
}

function expectAuditFailure(label, mutateSource, mutateNames = (source) => source) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hanapath-sentence-audit-"));
  const tempPlan = path.join(tempDir, "sentences_lesson_plan.js");
  const tempNames = path.join(tempDir, "sentences_curriculum_v2_names.json");
  try {
    fs.writeFileSync(tempPlan, mutateSource(planSource), "utf8");
    fs.writeFileSync(tempNames, mutateNames(fs.readFileSync(path.join(root, "scripts", "sentences_curriculum_v2_names.json"), "utf8")), "utf8");
    const result = spawnSync(process.execPath, [path.join(root, "scripts", "audit-sentences-foundation.mjs"), "--strict", "--plan", tempPlan, "--names", tempNames], {
      cwd: root,
      encoding: "utf8",
    });
    if (result.status === 0) throw new Error(`Self-test error: ${label} mutation was accepted by the production audit`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function expectGeneratorCheckFailure() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "hanapath-sentence-generator-"));
  try {
    fs.mkdirSync(path.join(tempRoot, "scripts"));
    for (const relativePath of ["sentences_core.js", "words_lesson_plan.js", "sentences_lesson_plan.js"]) {
      fs.copyFileSync(path.join(root, relativePath), path.join(tempRoot, relativePath));
    }
    for (const relativePath of ["curriculum_v2_names.json", "sentences_curriculum_v2_names.json", "sentences_curriculum_v2_lock.json", "sentences_curriculum_v2_report.md"]) {
      fs.copyFileSync(path.join(root, "scripts", relativePath), path.join(tempRoot, "scripts", relativePath));
    }
    const planPath = path.join(tempRoot, "sentences_lesson_plan.js");
    fs.appendFileSync(planPath, "\n// deliberate self-test drift\n", "utf8");
    const driftedSource = fs.readFileSync(planPath, "utf8");
    const result = spawnSync(process.execPath, [path.join(root, "scripts", "generate_sentences_curriculum_v2.mjs"), "--check"], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, HANAPATH_ROOT: tempRoot },
    });
    if (result.status === 0 || !/output drift/.test(result.stderr)) {
      throw new Error("Self-test error: generator --check accepted a drifted output.");
    }
    if (fs.readFileSync(planPath, "utf8") !== driftedSource) {
      throw new Error("Self-test error: generator --check rewrote a drifted output.");
    }
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

expectAuditFailure("duplicate sentence in content lessons", (source) => {
  return source.replace('"s0001",\n      "s0002",', '"s0001",\n      "s0001",\n      "s0002",');
});

expectAuditFailure("missing sentence in checkpoint", (source) => {
  return source.replace('"s0001",\n      "s0002",\n      "s0003",', '"s0002",\n      "s0003",');
});

expectAuditFailure("forbidden numeral/roman suffix in title", (source) => source, (source) => source.replace('"title": "Vocal Warmup"', '"title": "Vocal Practice II"'));
expectGeneratorCheckFailure();

console.log("Sentences curriculum v2 self-test passed: three invalid copies rejected by the production audit and generator --check rejects drift without writing.");
