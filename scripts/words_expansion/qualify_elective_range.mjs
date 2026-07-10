import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ---------------------------------------------------------------------------
// Legacy batch constants (p2-qualify-r345-r453). Kept so the original batch
// stays reproducible byte-for-byte; new batches use a committed config file
// instead of editing this script.
// ---------------------------------------------------------------------------
const LEGACY_BATCH_ID = "p2-qualify-r345-r453";
const LEGACY_MIN_RANK = 345;
const LEGACY_MAX_RANK = 453;
const LEGACY_THEME = "Study, work, and social participation";
const LEGACY_SOURCE_HASHES = new Set([
  "4dfba796fd3f2d828c48d78a8a10565e33483b5366af16f2b607ec27d0f714dd",
  "ce8e5f08929b413f46c9f949e1f56957e35a903fe1432cc048c8081ed575df5a"
]);
const LEGACY_ACCEPTED = new Set(["관계", "프로그램", "자리", "여러분", "시대"]);

const OVERRIDE_STATUSES = new Set([
  "accepted", "covered", "merged", "inflected", "deferred", "rejected", "needs-sense-review"
]);

function loadGlobal(filePath, globalName) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), context);
  return context.window[globalName] || [];
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function loadDecidedKeys(decisionsPath) {
  const keys = new Set();
  if (!fs.existsSync(decisionsPath)) return keys;
  const lines = fs.readFileSync(decisionsPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const record = JSON.parse(trimmed);
    keys.add(`${record.sourceFileHash}:${record.sourceRowKey}`);
  }
  return keys;
}

function classifyByFlags(candidate, curatedBySurface, acceptedSet) {
  if (candidate.flags.includes("is-curated")) {
    return { status: "covered", parentId: firstCuratedId(curatedBySurface, candidate.surface), reason: "Candidate surface is already covered by a curated row; no elective row is proposed." };
  }
  if (candidate.flags.includes("is-inflected") || candidate.flags.includes("is-conjugated")) {
    return { status: "inflected", parentId: null, reason: "Frequency token is an inflected/conjugated surface; retain the lemma decision for a separate review and do not create a row from this form." };
  }
  if (candidate.flags.includes("is-particle-ending") || candidate.flags.includes("is-ambiguous-short")) {
    return { status: "rejected", parentId: null, reason: "Raw token is a particle/ending or ambiguous short surface; exclude from vocabulary rows until independent lexical evidence exists." };
  }
  if (acceptedSet && acceptedSet.has(candidate.surface)) {
    return { status: "accepted", parentId: null, reason: "Qualified as a standalone lexical candidate for a future study/work/social-participation elective pack; authoring, examples, and owner approval are still required." };
  }
  return { status: "needs-sense-review", parentId: null, reason: "No safe standalone lexical decision from the queue alone; preserve for semantic review rather than inventing a lemma or vocabulary row." };
}

function firstCuratedId(curatedBySurface, surface) {
  const ids = curatedBySurface.get(surface);
  return ids && ids.length === 1 ? ids[0] : (ids && ids.length ? ids[0] : null);
}

// ---------------------------------------------------------------------------
// Generalized config-driven qualification.
//
// Config shape (committed per batch under scripts/words_expansion/batches/):
// {
//   "batchId": "p2-qualify-r1-r344",
//   "minRank": 1, "maxRank": 344,
//   "theme": "...",
//   "skipDecided": true,               // skip rows already in the ledger
//   "overrides": {
//     "<surface>": { "status": "...", "canonicalLemma": "...", "parentSurface": "...", "parentId": "...", "reason": "..." }
//   }
// }
//
// Guardrails:
// - Overrides may only target UNFLAGGED rows inside the range (heuristic
//   dispositions for flagged rows are never weakened by an override).
// - Every override surface must exist in the range (typo guard).
// - "accepted" requires a canonicalLemma.
// - parentSurface resolves against curated rows; a polysemous surface needs an
//   explicit parentId or the resolution fails loudly.
// - Unflagged rows without an override fall back to needs-sense-review.
// ---------------------------------------------------------------------------
export function qualifyWithConfig(config, { append = false, reportPath = null } = {}) {
  for (const key of ["batchId", "minRank", "maxRank", "theme"]) {
    if (config[key] === undefined || config[key] === null) throw new Error(`Config is missing required key "${key}".`);
  }
  const overrides = config.overrides || {};
  const skipDecided = config.skipDecided !== false;
  if (append && !skipDecided) {
    throw new Error("Append mode cannot disable skipDecided; immutable ledger rows must never be re-decided.");
  }
  if (append && config.decisionsPath) {
    throw new Error("Append mode always writes to the canonical decisions ledger; decisionsPath is test-only.");
  }

  const queue = JSON.parse(fs.readFileSync(path.join(root, "scripts/words_expansion/candidate_queue.json"), "utf8"));
  const curated = loadGlobal(path.join(root, "words_curated_core.js"), "HANAPATH_CURATED_WORDS");
  const curatedBySurface = new Map();
  for (const word of curated) {
    if (!curatedBySurface.has(word.korean)) curatedBySurface.set(word.korean, []);
    curatedBySurface.get(word.korean).push(word.id);
  }
  const curatedIds = new Set(curated.map((word) => word.id));

  const currentHashes = new Set([
    sha256(path.join(root, "korean_5000_claude_ready.csv")),
    sha256(path.join(root, "korean_supplementary_15k.csv"))
  ]);

  // decisionsPath is overridable for tests only; committed batch configs must
  // never point away from the real ledger.
  const decisionsPath = config.decisionsPath
    ? path.resolve(config.decisionsPath)
    : path.join(root, "scripts/words_expansion/candidate_decisions.jsonl");
  const decidedKeys = loadDecidedKeys(decisionsPath);

  const range = queue.filter((candidate) => candidate.rank >= config.minRank && candidate.rank <= config.maxRank);
  if (!range.length) throw new Error("No candidates found in the requested range.");
  for (const candidate of range) {
    if (!currentHashes.has(candidate.sourceFileHash)) {
      throw new Error(`Candidate ${candidate.surface} carries source hash ${candidate.sourceFileHash}, which does not match the current CSV inputs; rebuild the queue first.`);
    }
  }

  const skipped = [];
  const pending = [];
  for (const candidate of range) {
    const key = `${candidate.sourceFileHash}:${candidate.sourceRowKey}`;
    if (skipDecided && decidedKeys.has(key)) skipped.push(candidate);
    else pending.push(candidate);
  }

  const surfacesInRange = new Map(pending.map((candidate) => [candidate.surface, candidate]));
  for (const [surface, override] of Object.entries(overrides)) {
    const candidate = surfacesInRange.get(surface);
    if (!candidate) throw new Error(`Override targets "${surface}", which is not an undecided candidate in ranks ${config.minRank}-${config.maxRank}.`);
    if (candidate.flags.length) throw new Error(`Override targets "${surface}", but that row is heuristically flagged (${candidate.flags.join(", ")}); flagged dispositions may not be overridden.`);
    if (!OVERRIDE_STATUSES.has(override.status)) throw new Error(`Override for "${surface}" has invalid status "${override.status}".`);
    if (override.status === "accepted" && !override.canonicalLemma) throw new Error(`Override for "${surface}" is accepted but has no canonicalLemma.`);
    if (!override.reason || typeof override.reason !== "string" || override.reason.length < 20) throw new Error(`Override for "${surface}" needs a substantive reason (>= 20 chars).`);
    if (override.parentId && !curatedIds.has(override.parentId)) throw new Error(`Override for "${surface}" names parentId "${override.parentId}", which is not a curated row id.`);
    if (override.parentSurface && !override.parentId) {
      const ids = curatedBySurface.get(override.parentSurface);
      if (!ids || !ids.length) throw new Error(`Override for "${surface}" names parentSurface "${override.parentSurface}", which is not curated.`);
      if (ids.length > 1) throw new Error(`Override for "${surface}": parentSurface "${override.parentSurface}" is polysemous (${ids.join(", ")}); set an explicit parentId.`);
    }
  }

  const records = pending.map((candidate) => {
    let decision;
    const override = Object.prototype.hasOwnProperty.call(overrides, candidate.surface) && !candidate.flags.length
      ? overrides[candidate.surface]
      : null;
    if (override) {
      let parentId = override.parentId || null;
      if (!parentId && override.parentSurface) parentId = curatedBySurface.get(override.parentSurface)[0];
      decision = {
        status: override.status,
        parentId,
        canonicalLemma: override.canonicalLemma || (override.status === "accepted" ? candidate.surface : null),
        reason: override.reason
      };
    } else {
      const heuristic = classifyByFlags(candidate, curatedBySurface, null);
      decision = { ...heuristic, canonicalLemma: null };
    }
    return {
      batchId: config.batchId,
      sourceFileHash: candidate.sourceFileHash,
      sourceRowKey: candidate.sourceRowKey,
      normalizedSurface: candidate.surface,
      canonicalLemma: decision.canonicalLemma,
      status: decision.status,
      parentId: decision.parentId,
      reason: decision.reason
    };
  });

  const counts = Object.fromEntries([...new Set(records.map((record) => record.status))].sort().map((status) => [status, records.filter((record) => record.status === status).length]));
  const output = {
    batchId: config.batchId,
    range: { minRank: config.minRank, maxRank: config.maxRank, sourceRows: range.length, skippedAlreadyDecided: skipped.length, decidedRows: records.length },
    theme: config.theme,
    counts,
    qualifiedLexicalCandidates: records.filter((record) => record.status === "accepted").map((record) => record.normalizedSurface),
    importReadyRows: 0,
    records
  };

  if (append && records.length) {
    fs.appendFileSync(decisionsPath, records.map((record) => JSON.stringify(record)).join("\n") + "\n", "utf8");
  }
  if (reportPath) fs.writeFileSync(path.resolve(reportPath), JSON.stringify(output, null, 2) + "\n", "utf8");
  return output;
}

// ---------------------------------------------------------------------------
// Legacy entry point, preserved verbatim in behavior for p2-qualify-r345-r453.
// ---------------------------------------------------------------------------
export function qualify({ append = false, reportPath = null } = {}) {
  const queue = JSON.parse(fs.readFileSync(path.join(root, "scripts/words_expansion/candidate_queue.json"), "utf8"));
  const curated = loadGlobal(path.join(root, "words_curated_core.js"), "HANAPATH_CURATED_WORDS");
  const curatedBySurface = new Map(curated.map((word) => [word.korean, [word.id]]));
  const range = queue.filter((candidate) => candidate.rank >= LEGACY_MIN_RANK && candidate.rank <= LEGACY_MAX_RANK);
  if (!range.length) throw new Error("No candidates found in the requested range.");
  if (!range.every((candidate) => LEGACY_SOURCE_HASHES.has(candidate.sourceFileHash))) throw new Error("Candidate range includes an unexpected source hash.");
  const records = range.map((candidate) => {
    const decision = classifyByFlags(candidate, curatedBySurface, LEGACY_ACCEPTED);
    return {
      batchId: LEGACY_BATCH_ID,
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
    batchId: LEGACY_BATCH_ID,
    range: { minRank: LEGACY_MIN_RANK, maxRank: LEGACY_MAX_RANK, sourceRows: range.length },
    theme: LEGACY_THEME,
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
  const configArg = process.argv.indexOf("--config");
  const reportArg = process.argv.indexOf("--report");
  if (configArg >= 0) {
    const configPath = process.argv[configArg + 1];
    if (!configPath) throw new Error("--config requires a path.");
    const config = JSON.parse(fs.readFileSync(path.resolve(configPath), "utf8"));
    const reportPath = reportArg >= 0 ? process.argv[reportArg + 1] : path.join(path.dirname(path.resolve(configPath)), `${config.batchId}_report.json`);
    const output = qualifyWithConfig(config, { append, reportPath });
    console.log(`Qualified ranks ${config.minRank}-${config.maxRank}: ${output.range.sourceRows} rows in range, ${output.range.skippedAlreadyDecided} already decided, ${output.range.decidedRows} decided now; ${output.qualifiedLexicalCandidates.length} lexical candidates; ${output.importReadyRows} import-ready rows.`);
  } else {
    const reportPath = reportArg >= 0 ? process.argv[reportArg + 1] : path.join(root, "scripts/words_expansion/elective_qualification_report.json");
    const output = qualify({ append, reportPath });
    console.log(`Qualified ranks ${LEGACY_MIN_RANK}-${LEGACY_MAX_RANK}: ${output.range.sourceRows} rows; ${output.qualifiedLexicalCandidates.length} lexical candidates; ${output.importReadyRows} import-ready rows.`);
  }
}
