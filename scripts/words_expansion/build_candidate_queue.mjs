import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const Inflect = require(path.join(root, "words_inflect.js"));

// Common particles and endings in Korean
const COMMON_PARTICLES = new Set([
  "은", "는", "이", "가", "을", "를", "에", "의", "와", "과", "도", "로", "으로",
  "고", "며", "면", "서", "에서", "에게", "한테", "께", "한테서", "에게서",
  "만", "뿐", "조차", "마저", "치고", "야말로", "치고는", "이나", "나", "이랑",
  "랑", "랑은", "이랑은", "처럼", "같이", "만큼", "보다", "은지", "는지", "지",
  "지만", "거나", "도록", "기", "게", "음", "임", "ㄴ", "은", "는", "ㄹ", "을",
  "던", "ㄹ까", "을까", "네", "요", "다", "ㄴ다", "는다", "라", "이다",
  "아", "어", "여", "시", "으시", "옵", "습", "ㅂ"
]);

// Valid statuses for decision log
const VALID_STATUSES = new Set([
  "accepted", "covered", "merged", "inflected", "deferred", "rejected", "needs-sense-review"
]);

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(",").map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = [];
    let current = "";
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const row = { _lineIndex: i };
    headers.forEach((h, index) => {
      let val = values[index] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      row[h] = val;
    });
    rows.push(row);
  }
  return rows;
}

// Load curated words from words_curated_core.js
function loadCuratedWords() {
  const wordsPath = path.join(root, "words_curated_core.js");
  const wordsSource = fs.readFileSync(wordsPath, "utf8");
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(wordsSource, context);
  return context.window.HANAPATH_CURATED_WORDS || [];
}

// Parse decision history
function loadDecisions(decisionsPath, hashes) {
  // This is an append-only history: a later batch may replace an earlier
  // disposition for the same source row, but an event itself may not repeat.
  const decisions = new Map();
  const decisionEvents = new Set();
  if (!fs.existsSync(decisionsPath)) return decisions;
  
  const lines = fs.readFileSync(decisionsPath, "utf8").split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) continue;
    
    let record;
    try {
      record = JSON.parse(line);
    } catch (e) {
      throw new Error(`Malformed JSON at line ${i + 1} of decisions: ${e.message}`);
    }
    
    const key = `${record.sourceFileHash}:${record.sourceRowKey}`;
    const eventKey = `${key}:${record.batchId || "(unspecified)"}`;
    if (decisionEvents.has(eventKey)) {
      throw new Error(`Duplicate decision event: ${eventKey} at line ${i + 1}`);
    }
    if (!VALID_STATUSES.has(record.status)) {
      throw new Error(`Invalid status "${record.status}" at line ${i + 1}`);
    }
    
    decisionEvents.add(eventKey);
    decisions.set(key, record); // Later immutable history supersedes earlier disposition.
  }

  const currentHashes = new Set(Object.keys(hashes));
  for (const record of decisions.values()) {
    if (!record.sourceFileHash || !currentHashes.has(record.sourceFileHash)) {
      throw new Error(`Source hash mismatch for decision ${record.sourceRowKey || "(missing row key)"}: ${record.sourceFileHash || "(missing hash)"} is not one of the current inputs.`);
    }
    if (!record.sourceRowKey) {
      throw new Error(`Decision for ${record.sourceFileHash} is missing sourceRowKey.`);
    }
  }
  return decisions;
}

function run(args) {
  const options = {
    input5k: path.join(root, "korean_5000_claude_ready.csv"),
    input15k: path.join(root, "korean_supplementary_15k.csv"),
    output: path.join(root, "scripts/words_expansion/candidate_queue.json"),
    decisions: path.join(root, "scripts/words_expansion/candidate_decisions.jsonl"),
    validateOnly: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input5k") options.input5k = args[++i];
    else if (args[i] === "--input15k") options.input15k = args[++i];
    else if (args[i] === "--output") options.output = args[++i];
    else if (args[i] === "--decisions") options.decisions = args[++i];
    else if (args[i] === "--validate" || args[i] === "--validate-decisions") options.validateOnly = true;
  }

  const hash5k = getFileHash(options.input5k);
  const hash15k = getFileHash(options.input15k);
  const hashes = { [hash5k]: options.input5k, [hash15k]: options.input15k };

  // If validate only, just run the load checks
  if (options.validateOnly) {
    try {
      const decMap = loadDecisions(options.decisions, hashes);
      console.log(`Validation PASSED: decisions ledger is well-formed with ${decMap.size} records.`);
      return true;
    } catch (e) {
      console.error(`Validation FAILED: ${e.message}`);
      process.exit(1);
    }
  }

  console.log("Loading curated words...");
  const curated = loadCuratedWords();
  console.log(`Loaded ${curated.length} curated words.`);

  // Build maps of curated surfaces and inflected forms
  const curatedSurfaces = new Map(); // surface -> id
  const curatedInflections = new Map(); // inflected surface -> { originalWordId, formName }
  
  for (const word of curated) {
    const normK = word.korean.normalize("NFC").trim();
    curatedSurfaces.set(normK, word.id);
    if (word.display) {
      const normD = word.display.normalize("NFC").trim();
      curatedSurfaces.set(normD, word.id);
    }
    
    // Conjugate verbs/adjectives to catch inflected matches
    if (word.pos === "verb" || word.pos === "adjective") {
      const forms = ["polite", "formal", "past", "honorific", "attributive"];
      for (const formName of forms) {
        try {
          const conj = Inflect.conjugate(word.korean, word.pos, word.irregularFamily, formName);
          if (conj && conj !== word.korean) {
            const normC = conj.normalize("NFC").trim();
            curatedInflections.set(normC, { id: word.id, form: formName });
          }
        } catch (err) {
          // Skip errors on incomplete irregular rules
        }
      }
    }
  }

  // Load decision log
  let decisions;
  try {
    decisions = loadDecisions(options.decisions, hashes);
  } catch (e) {
    console.error(`Error loading decisions: ${e.message}`);
    process.exit(1);
  }

  console.log("Parsing CSVs...");
  const rows5k = parseCsv(options.input5k);
  const rows15k = parseCsv(options.input15k);
  console.log(`Loaded ${rows5k.length} rows from 5k CSV and ${rows15k.length} rows from 15k CSV.`);

  // Merge CSVs deterministically
  const merged = new Map(); // surface -> best candidate info
  
  function processRows(rows, fileHash) {
    for (const row of rows) {
      const original = row.korean_spelling;
      if (!original) continue;
      const surface = original.normalize("NFC").trim();
      const rank = parseInt(row.rank, 10);
      
      const existing = merged.get(surface);
      if (!existing || rank < existing.rank) {
        merged.set(surface, {
          originalSurface: original,
          surface: surface,
          rank: rank,
          band: row.frequency_band || "",
          tokenNote: row.token_note || "",
          sourceFileHash: fileHash,
          sourceRowKey: original,
          _row: row
        });
      }
    }
  }

  processRows(rows5k, hash5k);
  processRows(rows15k, hash15k);

  // Group candidates ending with "다" to use as potential base forms for collapsing
  const potentialVerbsAdjectives = [];
  for (const cand of merged.values()) {
    if (cand.surface.endsWith("다")) {
      potentialVerbsAdjectives.push(cand);
    }
  }

  // Helper to check if surface matches standard conjugation of potential base candidates
  function checkCandidateConjugation(surface) {
    for (const base of potentialVerbsAdjectives) {
      if (base.surface === surface) continue;
      const stem = base.surface.slice(0, -1);
      if (surface.startsWith(stem)) {
        // Quick prefix filter before calling expensive conjugate function
        const forms = ["polite", "formal", "past", "honorific", "attributive"];
        for (const formName of forms) {
          try {
            // Check both pos since we don't know the exact pos yet
            const conjVerb = Inflect.conjugate(base.surface, "verb", undefined, formName);
            if (conjVerb && conjVerb.normalize("NFC").trim() === surface) {
              return { lemma: base.surface, form: formName };
            }
            const conjAdj = Inflect.conjugate(base.surface, "adjective", undefined, formName);
            if (conjAdj && conjAdj.normalize("NFC").trim() === surface) {
              return { lemma: base.surface, form: formName };
            }
          } catch (err) {}
        }
      }
    }
    return null;
  }

  console.log("Analyzing candidates and applying heuristics...");
  const processedQueue = [];
  const dispositionCounts = {
    accepted: 0, covered: 0, merged: 0, inflected: 0, deferred: 0, rejected: 0, "needs-sense-review": 0
  };
  const flagCounts = {
    "is-curated": 0, "is-inflected": 0, "is-particle-ending": 0, "is-romanization-artifact": 0, "is-ambiguous-short": 0, "is-conjugated": 0
  };

  for (const cand of merged.values()) {
    const flags = [];
    let defaultStatus = "accepted";
    let parentId = null;
    let reason = "Candidate qualified for review.";

    // 1. Check if already curated
    const curatedId = curatedSurfaces.get(cand.surface);
    if (curatedId) {
      flags.push("is-curated");
      defaultStatus = "covered";
      parentId = curatedId;
      reason = `Matches curated word ID: ${curatedId}`;
      flagCounts["is-curated"]++;
    }

    // 2. Check if matches inflected form of already curated word
    const curatedInfl = curatedInflections.get(cand.surface);
    if (curatedInfl && defaultStatus === "accepted") {
      flags.push("is-inflected");
      defaultStatus = "inflected";
      parentId = curatedInfl.id;
      reason = `Matches inflected form (${curatedInfl.form}) of curated word ID: ${curatedInfl.id}`;
      flagCounts["is-inflected"]++;
    }

    // 3. Check for romanization artifacts
    if (/[a-zA-Z]/.test(cand.surface)) {
      flags.push("is-romanization-artifact");
      defaultStatus = "rejected";
      reason = "Contains English/Latin alphabet characters.";
      flagCounts["is-romanization-artifact"]++;
    }

    // 4. Check for particles and endings
    const isNoteParticleEnding = /particle|ending|grammar|suffix|conjunction/i.test(cand.tokenNote);
    const isCommonParticle = COMMON_PARTICLES.has(cand.surface);
    if (isNoteParticleEnding || isCommonParticle) {
      flags.push("is-particle-ending");
      // Don't override rejected if already flagged
      if (defaultStatus === "accepted") {
        defaultStatus = "rejected";
        reason = isCommonParticle ? "Matches known particle/ending list." : `Flagged by source token note: ${cand.tokenNote}`;
      }
      flagCounts["is-particle-ending"]++;
    }

    // 5. Check for ambiguous short forms
    if (cand.surface.length === 1) {
      flags.push("is-ambiguous-short");
      flagCounts["is-ambiguous-short"]++;
      if (defaultStatus === "accepted") {
        reason += " Note: single-syllable form is ambiguous.";
      }
    }

    // 6. Collapse obvious conjugates onto one lemma (conjugate heuristics)
    if (defaultStatus === "accepted") {
      const conjBase = checkCandidateConjugation(cand.surface);
      if (conjBase) {
        flags.push("is-conjugated");
        defaultStatus = "inflected";
        reason = `Obvious conjugate of candidate lemma "${conjBase.lemma}" (${conjBase.form}).`;
        parentId = conjBase.lemma;
        flagCounts["is-conjugated"]++;
      }
    }

    // Override status/disposition if there is an existing decision in the ledger
    const decisionKey = `${cand.sourceFileHash}:${cand.sourceRowKey}`;
    const priorDecision = decisions.get(decisionKey);
    let finalStatus = defaultStatus;
    if (priorDecision) {
      finalStatus = priorDecision.status;
      reason = `[Prior Decision Override] ${priorDecision.reason || reason}`;
      if (priorDecision.parentCuratedId) {
        parentId = priorDecision.parentCuratedId;
      }
    }

    dispositionCounts[finalStatus]++;

    processedQueue.push({
      originalSurface: cand.originalSurface,
      surface: cand.surface,
      rank: cand.rank,
      band: cand.band,
      guessedPos: cand._row.guessedPos || (cand.surface.endsWith("다") ? "verb/adjective" : "noun"),
      flags: flags,
      disposition: finalStatus,
      parent: parentId,
      reason: reason,
      sourceFileHash: cand.sourceFileHash,
      sourceRowKey: cand.sourceRowKey
    });
  }

  // Sort queue by rank ascending, with alphabetical tie-breakers
  processedQueue.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    return a.surface.localeCompare(b.surface);
  });

  // Write output
  fs.writeFileSync(options.output, JSON.stringify(processedQueue, null, 2), "utf8");
  console.log(`Saved ${processedQueue.length} candidates to ${options.output}`);

  // Print counts
  console.log("\n--- Flags Counts ---");
  for (const [flag, count] of Object.entries(flagCounts)) {
    console.log(`  ${flag.padEnd(26)}: ${count}`);
  }

  console.log("\n--- Disposition Counts ---");
  for (const [status, count] of Object.entries(dispositionCounts)) {
    console.log(`  ${status.padEnd(26)}: ${count}`);
  }

  return true;
}

// Run the script
const args = process.argv.slice(2);
run(args);
