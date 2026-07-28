const FORM_TAGS = new Set([
  "present-polite", "past-polite", "future-geoyeyo", "formal-nida", "honorific-si",
  "imperative-seyo", "propositive-eyo", "copula-ieyo", "copula-negative-anieyo",
  "neg-an", "neg-mot", "neg-ji-anta", "want-go-sipda", "can-su-itda", "must-ya-dwaeda",
]);

const CONTEXT_TAGS = new Set([
  "topic-neun", "subject-i-ga", "object-eul-reul", "time-expression", "location-e",
  "location-eseo", "possessive-ui", "because-aseo", "direction-euro", "and-go",
  "with-hago-wa", "if-myeon", "existence-itda", "counter-phrase", "when-ttae",
  "also-do", "comparison-boda", "until-kkaji", "but-jiman", "only-man", "from-buteo",
  "question-polite",
]);

const TAG_FLOORS = Object.freeze({
  "sentence-exam-1": Object.freeze({
    "present-polite": 6, "topic-neun": 3, "subject-i-ga": 3, "object-eul-reul": 4,
    "location-e": 2, "location-eseo": 2, "copula-ieyo": 2, "question-polite": 2,
    "time-expression": 2,
  }),
  "sentence-exam-2": Object.freeze({
    "present-polite": 4, "past-polite": 4, "future-geoyeyo": 3, "time-expression": 3,
    "object-eul-reul": 4, "subject-i-ga": 3, "topic-neun": 3, "location-e": 2,
    "location-eseo": 2, "neg-an": 2, "neg-mot": 1, "neg-ji-anta": 1,
    "want-go-sipda": 2, "can-su-itda": 2, "question-polite": 2,
  }),
  "sentence-exam-3": Object.freeze({
    "past-polite": 4, "future-geoyeyo": 4, "present-polite": 3, "formal-nida": 3,
    "honorific-si": 3, "imperative-seyo": 2, "propositive-eyo": 1, "neg-an": 2,
    "neg-mot": 2, "neg-ji-anta": 2, "and-go": 2, "but-jiman": 2,
    "because-aseo": 2, "if-myeon": 2, "when-ttae": 1, "object-eul-reul": 3,
    "subject-i-ga": 3, "topic-neun": 2,
  }),
  "sentence-exam-4": Object.freeze({
    "present-polite": 3, "past-polite": 4, "future-geoyeyo": 4, "formal-nida": 4,
    "honorific-si": 4, "object-eul-reul": 3, "subject-i-ga": 3, "topic-neun": 3,
    "time-expression": 3, "neg-an": 2, "neg-mot": 2, "neg-ji-anta": 2,
    "and-go": 2, "but-jiman": 2, "because-aseo": 2, "if-myeon": 2,
    "when-ttae": 2, "want-go-sipda": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
    "question-polite": 2, "imperative-seyo": 2,
  }),
  "sentence-exam-5": Object.freeze({
    "object-eul-reul": 4, "present-polite": 4, "subject-i-ga": 4, "past-polite": 5,
    "topic-neun": 4, "time-expression": 3, "location-e": 3, "location-eseo": 3,
    "possessive-ui": 2, "because-aseo": 2, "imperative-seyo": 2, "copula-ieyo": 2,
    "direction-euro": 2, "honorific-si": 4, "and-go": 2, "question-polite": 2,
    "with-hago-wa": 2, "formal-nida": 4, "if-myeon": 2, "existence-itda": 2,
    "counter-phrase": 2, "when-ttae": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
    "also-do": 2, "comparison-boda": 2, "want-go-sipda": 2, "neg-ji-anta": 2,
    "neg-an": 2, "neg-mot": 2, "future-geoyeyo": 5, "until-kkaji": 1,
    "propositive-eyo": 1, "but-jiman": 2, "only-man": 1, "from-buteo": 1,
    "copula-negative-anieyo": 2,
  }),
});

function normalize(value) {
  return String(value ?? "").normalize("NFC").trim().replace(/\s+/g, " ");
}

function sectionFloors(examId) {
  if (examId === "sentence-exam-1") return { "section-1": 8, "section-2": 8 };
  if (examId === "sentence-exam-5") {
    return Object.fromEntries(Array.from({ length: 8 }, (_, index) => [`section-${index + 1}`, 5]));
  }
  const stage = Number(examId.slice(-1));
  return Object.fromEntries(Array.from({ length: stage }, (_, index) => [
    `band-${index + 1}`,
    index + 1 === stage ? 8 : 3,
  ]));
}

function scopeMax(examId) {
  return examId === "sentence-exam-5" ? 8 : Number(examId.slice(-1)) * 2;
}

function candidateStrands(entry) {
  if (entry.mode === "recognition") return new Set(["R", "C"]);
  const strands = new Set(["P"]);
  if ((entry.patternTags || []).some((tag) => FORM_TAGS.has(tag))) strands.add("F");
  if ((entry.patternTags || []).some((tag) => CONTEXT_TAGS.has(tag))) strands.add("X");
  return strands;
}

function canonicalKey(entry) {
  return normalize(entry?.canonicalAnswer);
}

function attemptDiagnostics(examId, attempt, entryMap, reservedCanonical = new Set()) {
  const tagCounts = {};
  const coverageCounts = {};
  const canonicalCounts = new Map();
  const invalid = [];
  for (let index = 0; index < attempt.length; index += 1) {
    const selected = attempt[index];
    const entry = entryMap.get(selected.id);
    if (!entry) {
      invalid.push(`unknown:${selected.id}`);
      continue;
    }
    if (Number(entry.sourceSectionOrder) > scopeMax(examId)) invalid.push(`scope:${selected.id}`);
    if (!candidateStrands(entry).has(selected.strand)) invalid.push(`strand:${selected.id}:${selected.strand}`);
    const key = canonicalKey(entry);
    canonicalCounts.set(key, (canonicalCounts.get(key) || 0) + 1);
    if (reservedCanonical.has(key)) invalid.push(`reserved:${selected.id}`);
    for (const tag of entry.patternTags || []) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    const section = Number(entry.sourceSectionOrder);
    coverageCounts[`section-${section}`] = (coverageCounts[`section-${section}`] || 0) + 1;
    const band = Math.ceil(section / 2);
    coverageCounts[`band-${band}`] = (coverageCounts[`band-${band}`] || 0) + 1;
  }
  for (const [key, count] of canonicalCounts) {
    if (key && count > 1) invalid.push(`duplicate:${key}:${count}`);
  }
  const tagDeficits = {};
  for (const [tag, floor] of Object.entries(TAG_FLOORS[examId])) {
    const deficit = Math.max(0, floor - (tagCounts[tag] || 0));
    if (deficit) tagDeficits[tag] = deficit;
  }
  const coverageDeficits = {};
  for (const [coverage, floor] of Object.entries(sectionFloors(examId))) {
    const deficit = Math.max(0, floor - (coverageCounts[coverage] || 0));
    if (deficit) coverageDeficits[coverage] = deficit;
  }
  const score = invalid.length * 1000
    + Object.values(tagDeficits).reduce((sum, value) => sum + value, 0) * 20
    + Object.values(coverageDeficits).reduce((sum, value) => sum + value, 0) * 20;
  return { score, invalid, tagDeficits, coverageDeficits, tagCounts, coverageCounts };
}

function changedCount(attempt, original) {
  let count = 0;
  for (let index = 0; index < attempt.length; index += 1) {
    if (attempt[index].id !== original[index].id) count += 1;
  }
  return count;
}

function stateKey(attempt) {
  return attempt.map((selected) => selected.id).join("|");
}

function xorshift32(seed) {
  let state = seed >>> 0 || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x100000000;
  };
}

function candidateLists(examId, attempt, entries, reservedCanonical) {
  const maxSection = scopeMax(examId);
  const byStrand = new Map();
  for (const strand of ["P", "F", "X", "R", "C"]) {
    byStrand.set(strand, entries.filter((entry) => Number(entry.sourceSectionOrder) <= maxSection
      && candidateStrands(entry).has(strand)
      && !reservedCanonical.has(canonicalKey(entry)))
      .sort((left, right) => left.id.localeCompare(right.id)));
  }
  return attempt.map((selected) => byStrand.get(selected.strand) || []);
}

function canPlace(candidate, slotIndex, attempt, entryMap, reservedCanonical) {
  const key = canonicalKey(candidate);
  if (!key || reservedCanonical.has(key)) return false;
  for (let index = 0; index < attempt.length; index += 1) {
    if (index === slotIndex) continue;
    const other = entryMap.get(attempt[index].id);
    if (other && canonicalKey(other) === key) return false;
  }
  return true;
}

function greedyRepair(examId, attempt, original, entries, entryMap, reservedCanonical) {
  const lists = candidateLists(examId, attempt, entries, reservedCanonical);
  let current = attempt.map((selected) => ({ ...selected }));
  let diagnostics = attemptDiagnostics(examId, current, entryMap, reservedCanonical);
  for (let iteration = 0; iteration < 100 && diagnostics.score > 0; iteration += 1) {
    let best = null;
    for (let slotIndex = 0; slotIndex < current.length; slotIndex += 1) {
      for (const candidate of lists[slotIndex]) {
        if (candidate.id === current[slotIndex].id) continue;
        if (!canPlace(candidate, slotIndex, current, entryMap, reservedCanonical)) continue;
        const next = current.map((selected, index) => index === slotIndex
          ? { ...selected, id: candidate.id }
          : selected);
        const nextDiagnostics = attemptDiagnostics(examId, next, entryMap, reservedCanonical);
        const nextChanged = changedCount(next, original);
        if (!best
            || nextDiagnostics.score < best.diagnostics.score
            || (nextDiagnostics.score === best.diagnostics.score && nextChanged < best.changed)
            || (nextDiagnostics.score === best.diagnostics.score && nextChanged === best.changed
              && candidate.id.localeCompare(best.candidateId) < 0)) {
          best = { next, diagnostics: nextDiagnostics, changed: nextChanged, candidateId: candidate.id };
        }
      }
    }
    if (!best || best.diagnostics.score >= diagnostics.score) break;
    current = best.next;
    diagnostics = best.diagnostics;
  }
  return { attempt: current, diagnostics };
}

function annealRepair(examId, initial, original, entries, entryMap, reservedCanonical, seed) {
  const lists = candidateLists(examId, initial, entries, reservedCanonical);
  const random = xorshift32(seed);
  let current = initial.map((selected) => ({ ...selected }));
  let diagnostics = attemptDiagnostics(examId, current, entryMap, reservedCanonical);
  let best = current;
  let bestDiagnostics = diagnostics;
  let bestChanged = changedCount(best, original);
  const iterations = examId === "sentence-exam-5" ? 60000 : 30000;
  for (let iteration = 0; iteration < iterations && bestDiagnostics.score > 0; iteration += 1) {
    const slotIndex = Math.floor(random() * current.length);
    const candidates = lists[slotIndex];
    if (!candidates.length) continue;
    const candidate = candidates[Math.floor(random() * candidates.length)];
    if (!candidate || candidate.id === current[slotIndex].id) continue;
    if (!canPlace(candidate, slotIndex, current, entryMap, reservedCanonical)) continue;
    const previous = current[slotIndex];
    current[slotIndex] = { ...previous, id: candidate.id };
    const nextDiagnostics = attemptDiagnostics(examId, current, entryMap, reservedCanonical);
    const progress = iteration / iterations;
    const temperature = Math.max(0.02, 8 * (1 - progress) ** 2);
    const delta = nextDiagnostics.score - diagnostics.score;
    const accept = delta <= 0 || random() < Math.exp(-delta / temperature);
    if (accept) {
      diagnostics = nextDiagnostics;
      const nextChanged = changedCount(current, original);
      if (diagnostics.score < bestDiagnostics.score
          || (diagnostics.score === bestDiagnostics.score && nextChanged < bestChanged)
          || (diagnostics.score === bestDiagnostics.score && nextChanged === bestChanged
            && stateKey(current).localeCompare(stateKey(best)) < 0)) {
        best = current.map((selected) => ({ ...selected }));
        bestDiagnostics = diagnostics;
        bestChanged = nextChanged;
      }
    } else {
      current[slotIndex] = previous;
    }
    if ((iteration + 1) % 25000 === 0 && bestDiagnostics.score > 0) {
      current = best.map((selected) => ({ ...selected }));
      diagnostics = bestDiagnostics;
    }
  }
  return { attempt: best.map((selected) => ({ ...selected })), diagnostics: bestDiagnostics };
}

function repairAttempt(examId, attemptIndex, attempts, originalAttempts, entries, entryMap) {
  const reservedCanonical = new Set();
  for (let otherIndex = 0; otherIndex < attempts.length; otherIndex += 1) {
    if (otherIndex === attemptIndex) continue;
    for (const selected of attempts[otherIndex]) {
      const entry = entryMap.get(selected.id);
      const key = canonicalKey(entry);
      if (key) reservedCanonical.add(key);
    }
  }
  const greedy = greedyRepair(
    examId,
    attempts[attemptIndex],
    originalAttempts[attemptIndex],
    entries,
    entryMap,
    reservedCanonical,
  );
  if (greedy.diagnostics.score === 0) return greedy;
  let best = greedy;
  for (let restart = 0; restart < 3 && best.diagnostics.score > 0; restart += 1) {
    const seed = [...examId].reduce((value, character) => ((value * 33) ^ character.charCodeAt(0)) >>> 0, 5381)
      ^ ((attemptIndex + 1) * 0x9e3779b1)
      ^ ((restart + 1) * 0x85ebca6b);
    const annealed = annealRepair(
      examId,
      best.attempt,
      originalAttempts[attemptIndex],
      entries,
      entryMap,
      reservedCanonical,
      seed,
    );
    const polished = greedyRepair(
      examId,
      annealed.attempt,
      originalAttempts[attemptIndex],
      entries,
      entryMap,
      reservedCanonical,
    );
    if (polished.diagnostics.score < best.diagnostics.score
        || (polished.diagnostics.score === best.diagnostics.score
          && changedCount(polished.attempt, originalAttempts[attemptIndex])
            < changedCount(best.attempt, originalAttempts[attemptIndex]))) {
      best = polished;
    }
  }
  return best;
}

function examDiagnostics(examId, attempts, entryMap) {
  const allCanonical = new Map();
  const attemptReports = attempts.map((attempt) => {
    const report = attemptDiagnostics(examId, attempt, entryMap, new Set());
    for (const selected of attempt) {
      const key = canonicalKey(entryMap.get(selected.id));
      if (key) allCanonical.set(key, (allCanonical.get(key) || 0) + 1);
    }
    return report;
  });
  const freshnessDuplicates = [...allCanonical.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }));
  return {
    ok: attemptReports.every((report) => report.score === 0) && freshnessDuplicates.length === 0,
    attemptReports,
    freshnessDuplicates,
  };
}

function repairExam(examId, baseAttempts, entries, entryMap) {
  const originalAttempts = baseAttempts.map((attempt) => attempt.map((selected) => ({ ...selected })));
  const attempts = originalAttempts.map((attempt) => attempt.map((selected) => ({ ...selected })));
  for (let pass = 0; pass < 3; pass += 1) {
    let changed = false;
    const order = attempts.map((attempt, index) => ({
      index,
      score: attemptDiagnostics(examId, attempt, entryMap, new Set()).score,
    })).sort((left, right) => right.score - left.score || left.index - right.index);
    for (const item of order) {
      const repaired = repairAttempt(examId, item.index, attempts, originalAttempts, entries, entryMap);
      if (stateKey(repaired.attempt) !== stateKey(attempts[item.index])) changed = true;
      attempts[item.index] = repaired.attempt;
    }
    const report = examDiagnostics(examId, attempts, entryMap);
    if (report.ok) return { attempts, report };
    if (!changed && pass >= 1) break;
  }
  return { attempts, report: examDiagnostics(examId, attempts, entryMap) };
}

function repairCb6bWitness({ baseWitness, entries, replacementByDemoted }) {
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]));
  const mapped = Object.fromEntries(Object.entries(baseWitness).map(([examId, attempts]) => [
    examId,
    attempts.map((attempt) => attempt.map((selected) => ({
      ...selected,
      id: replacementByDemoted.get(selected.id) || selected.id,
    }))),
  ]));
  const repaired = {};
  const reports = {};
  for (const examId of Object.keys(mapped).sort()) {
    const result = repairExam(examId, mapped[examId], entries, entryMap);
    repaired[examId] = result.attempts;
    reports[examId] = result.report;
  }
  const failures = [];
  for (const [examId, report] of Object.entries(reports)) {
    if (report.ok) continue;
    report.attemptReports.forEach((attemptReport, index) => {
      if (attemptReport.score > 0) failures.push(`${examId} attempt ${index + 1}: ${JSON.stringify({
        invalid: attemptReport.invalid,
        tagDeficits: attemptReport.tagDeficits,
        coverageDeficits: attemptReport.coverageDeficits,
      })}`);
    });
    for (const duplicate of report.freshnessDuplicates) {
      failures.push(`${examId}: freshness duplicate ${duplicate.key} x${duplicate.count}`);
    }
  }
  if (failures.length) {
    throw new Error(`CB6B witness repair failed:\n${failures.join("\n")}`);
  }
  return { exams: repaired, reports };
}

export {
  FORM_TAGS,
  CONTEXT_TAGS,
  TAG_FLOORS,
  candidateStrands,
  sectionFloors,
  repairCb6bWitness,
};
