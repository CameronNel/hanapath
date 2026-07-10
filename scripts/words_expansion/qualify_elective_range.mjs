import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BATCH_ID = "p2-qualify-r345-r453";
const MIN_RANK = 345;
const MAX_RANK = 453;
const SOURCE_HASHES = new Set([
  "4dfba796fd3f2d828c48d78a8a10565e33483b5366af16f2b607ec27d0f714dd",
  "ce8e5f08929b413f46c9f949e1f56957e35a903fe1432cc048c8081ed575df5a"
]);

// Conservative lexical seeds for a future study/work/social-participation pack.
// Everything else in this raw range is covered, inflected, ambiguous, or held
// for a stronger semantic decision; this is qualification, not authoring.
const ACCEPTED = new Set(["관계", "프로그램", "자리", "여러분", "시대"]);

function loadGlobal(filePath, globalName) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), context);
  return context.window[globalName] || [];
}

function classify(candidate, curatedBySurface) {
  if (candidate.flags.includes("is-curated")) {
    return { status: "covered", parentId: curatedBySurface.get(candidate.surface) || null, reason: "Candidate surface is already covered by a curated row; no elective row is proposed." };
  }
  if (candidate.flags.includes("is-inflected") || candidate.flags.includes("is-conjugated")) {
    return { status: "inflected", parentId: null, reason: "Frequency token is an inflected/conjugated surface; retain the lemma decision for a separate review and do not create a row from this form." };
  }
  if (candidate.flags.includes("is-particle-ending") || candidate.flags.includes("is-ambiguous-short")) {
    return { status: "rejected", parentId: null, reason: "Raw token is a particle/ending or ambiguous short surface; exclude from vocabulary rows until independent lexical evidence exists." };
  }
  if (ACCEPTED.has(candidate.surface)) {
    return { status: "accepted", parentId: null, reason: "Qualified as a standalone lexical candidate for a future study/work/social-participation elective pack; authoring, examples, and owner approval are still required." };
  }
  return { status: "needs-sense-review", parentId: null, reason: "No safe standalone lexical decision from the queue alone; preserve for semantic review rather than inventing a lemma or vocabulary row." };
}

export function qualify({ append = false, reportPath = null } = {}) {
  const queue = JSON.parse(fs.readFileSync(path.join(root, "scripts/words_expansion/candidate_queue.json"), "utf8"));
  const curated = loadGlobal(path.join(root, "words_curated_core.js"), "HANAPATH_CURATED_WORDS");
  const curatedBySurface = new Map(curated.map((word) => [word.korean, word.id]));
  const range = queue.filter((candidate) => candidate.rank >= MIN_RANK && candidate.rank <= MAX_RANK);
  if (!range.length) throw new Error("No candidates found in the requested range.");
  if (!range.every((candidate) => SOURCE_HASHES.has(candidate.sourceFileHash))) throw new Error("Candidate range includes an unexpected source hash.");
  const records = range.map((candidate) => {
    const decision = classify(candidate, curatedBySurface);
    return {
      batchId: BATCH_ID,
      sourceFileHash: candidate.sourceFileHash,
      sourceRowKey: candidate.sourceRowKey,
      normalizedSurface: candidate.surface,
      canonicalLemma: decision.status === "accepted" ? candidate.surface : null,
      status: decision.status,
      parentId: decision.parentId,
      reason: decision.reason
    };
  });
  const counts = Object.fromEntries([...new Set(records.map((record) => record.status))].map((status) => [status, records.filter((record) => record.status === status).length]));
  const output = {
    batchId: BATCH_ID,
    range: { minRank: MIN_RANK, maxRank: MAX_RANK, sourceRows: range.length },
    theme: "Study, work, and social participation",
    counts,
    qualifiedLexicalCandidates: records.filter((record) => record.status === "accepted").map((record) => record.normalizedSurface),
    importReadyRows: 0,
    records
  };
  const destination = path.join(root, "scripts/words_expansion/candidate_decisions.jsonl");
  if (append) fs.appendFileSync(destination, records.map((record) => JSON.stringify(record)).join("\n") + "\n", "utf8");
  if (reportPath) fs.writeFileSync(path.resolve(reportPath), JSON.stringify(output, null, 2) + "\n", "utf8");
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const append = process.argv.includes("--append");
  const reportArg = process.argv.indexOf("--report");
  const reportPath = reportArg >= 0 ? process.argv[reportArg + 1] : path.join(root, "scripts/words_expansion/elective_qualification_report.json");
  const output = qualify({ append, reportPath });
  console.log(`Qualified ranks ${MIN_RANK}-${MAX_RANK}: ${output.range.sourceRows} rows; ${output.qualifiedLexicalCandidates.length} lexical candidates; ${output.importReadyRows} import-ready rows.`);
}
