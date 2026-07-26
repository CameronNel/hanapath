const DEFAULT_SHORTLIST_POLICY = Object.freeze({
  sectionOrders: Object.freeze([1, 2, 3, 4, 5, 6, 7, 8]),
  typedPerSection: 50,
  recognitionPerSection: 57,
});

const SEVERE_TYPED_FLAGS = new Set([
  "duplicate-canonical-target",
  "productive-clause-family",
  "particle-or-order-family",
]);

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b), "en");
  });
}

function wordCount(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function primarySection(item) {
  const sections = uniqueSorted((item.sectionOrders || []).filter(Number.isInteger));
  return sections[0] ?? null;
}

function routeAssessment(item) {
  const lessonIds = uniqueSorted(item.lessonIds || []);
  const sections = uniqueSorted((item.sectionOrders || []).filter(Number.isInteger));
  return {
    hasRoute: lessonIds.length > 0 && sections.length > 0,
    lessonIds,
    sections,
    stableSingleRoute: lessonIds.length === 1 && sections.length === 1,
    crossSectionRoute: sections.length > 1,
  };
}

function typedAssessment(item) {
  const route = routeAssessment(item);
  const flags = uniqueSorted(item.ambiguityFlags || []);
  const risks = [];
  const reasons = [];
  let score = 0;

  if (!route.hasRoute) {
    risks.push("no-live-lesson-route");
    return { eligible: false, score: -10000, reasons, risks, route };
  }
  if (route.crossSectionRoute) risks.push("cross-section-route");
  if (item.existingTypedClass === "excluded") {
    risks.push("existing-reviewed-exclusion");
    return { eligible: false, score: -9000, reasons, risks, route };
  }
  if (flags.includes("duplicate-canonical-target")) {
    risks.push("duplicate-canonical-target");
    return { eligible: false, score: -8000, reasons, risks, route };
  }

  if (item.existingTypedClass === "canonical") {
    score += 100;
    reasons.push("existing-reviewed-canonical-evidence");
  } else if (item.existingTypedClass === "finite") {
    score += 82;
    reasons.push("existing-reviewed-finite-evidence");
    risks.push("manual-alternative-review-required");
  } else {
    score += 24;
    reasons.push("unreviewed-candidate-only");
  }

  if (route.stableSingleRoute) {
    score += 14;
    reasons.push("stable-single-lesson-route");
  } else {
    score += 5;
    risks.push("multiple-live-lesson-routes");
  }

  if (flags.length === 0) {
    score += 36;
    reasons.push("no-current-heuristic-ambiguity-flags");
  } else {
    score -= flags.length * 11;
    risks.push(...flags.map((flag) => `ambiguity:${flag}`));
  }

  const severeCount = flags.filter((flag) => SEVERE_TYPED_FLAGS.has(flag)).length;
  score -= severeCount * 13;

  const variants = Number(item.plausibleVariantCount) || 0;
  if (variants === 0) {
    score += 12;
    reasons.push("low-estimated-variant-risk");
  } else if (variants <= 2) {
    score += 5;
  } else {
    score -= Math.min(variants, 8) * 2;
    risks.push("higher-estimated-variant-risk");
  }

  const tokens = wordCount(item.korean);
  if (tokens >= 2 && tokens <= 9) {
    score += 8;
    reasons.push("manageable-production-length");
  } else if (tokens > 14) {
    score -= 8;
    risks.push("long-production-target");
  }

  score += Math.min((item.patternTags || []).length, 6);
  reasons.push("requires-manual-cb4-approval");

  return { eligible: true, score, reasons: uniqueSorted(reasons), risks: uniqueSorted(risks), route };
}

function recognitionAssessment(item) {
  const route = routeAssessment(item);
  const flags = uniqueSorted(item.ambiguityFlags || []);
  const risks = [];
  const reasons = [];
  let score = 0;

  if (!route.hasRoute) {
    risks.push("no-live-lesson-route");
    return { eligible: false, score: -10000, reasons, risks, route };
  }

  if (item.existingTypedClass === "excluded") {
    score += 66;
    reasons.push("reviewed-as-unsuitable-for-exact-typing");
  } else if (item.existingTypedClass === "finite") {
    score += 36;
    reasons.push("finite-typed-variation-supports-recognition-use");
  } else if (item.existingTypedClass === "canonical") {
    score += 24;
    reasons.push("reviewed-source-evidence");
  } else {
    score += 20;
    reasons.push("unreviewed-candidate-only");
  }

  if (flags.length > 0) {
    score += Math.min(flags.length, 5) * 7;
    reasons.push("recognition-avoids-exact-production-ambiguity");
  } else {
    score += 12;
    reasons.push("clear-source-row");
  }

  if (route.stableSingleRoute) {
    score += 12;
    reasons.push("stable-single-lesson-route");
  } else {
    score += 4;
    risks.push("multiple-live-lesson-routes");
  }
  if (route.crossSectionRoute) risks.push("cross-section-route");

  const tokens = wordCount(item.korean);
  if (tokens >= 2 && tokens <= 13) score += 6;
  if (tokens > 18) risks.push("long-recognition-target");

  score += Math.min((item.patternTags || []).length, 6);
  reasons.push("requires-manual-option-authoring-and-review");

  return { eligible: true, score, reasons: uniqueSorted(reasons), risks: uniqueSorted(risks), route };
}

function compareByScoreThenId(a, b, assessmentKey) {
  const scoreDiff = b[assessmentKey].score - a[assessmentKey].score;
  if (scoreDiff) return scoreDiff;
  return String(a.id).localeCompare(String(b.id), "en");
}

function takePerSection(items, assessmentKey, perSection, sectionOrders, excludedIds = new Set()) {
  const selected = [];
  const shortages = [];
  for (const section of sectionOrders) {
    const pool = items
      .filter((item) => item.primarySection === section)
      .filter((item) => item[assessmentKey].eligible)
      .filter((item) => !excludedIds.has(item.id))
      .sort((a, b) => compareByScoreThenId(a, b, assessmentKey));
    if (pool.length < perSection) {
      shortages.push({ section, required: perSection, available: pool.length });
    }
    selected.push(...pool.slice(0, perSection));
  }
  return { selected, shortages };
}

function compactCandidate(item, mode, rankWithinSection) {
  const assessment = mode === "typed" ? item.typedAssessment : item.recognitionAssessment;
  return {
    id: item.id,
    mode,
    sectionOrder: item.primarySection,
    rankWithinSection,
    score: assessment.score,
    korean: item.korean,
    english: item.english,
    lessonIds: assessment.route.lessonIds,
    patternTags: uniqueSorted(item.patternTags || []),
    existingTypedClass: item.existingTypedClass,
    existingExamPromptEn: item.existingExamPromptEn,
    ambiguityFlags: uniqueSorted(item.ambiguityFlags || []),
    plausibleVariantCount: Number(item.plausibleVariantCount) || 0,
    reasons: assessment.reasons,
    risks: assessment.risks,
    approved: false,
    reviewRequired: true,
  };
}

function selectBalancedShortlist(rawInventory, policy = DEFAULT_SHORTLIST_POLICY) {
  const sectionOrders = uniqueSorted(policy.sectionOrders || DEFAULT_SHORTLIST_POLICY.sectionOrders);
  const typedPerSection = Number(policy.typedPerSection);
  const recognitionPerSection = Number(policy.recognitionPerSection);
  if (!Number.isInteger(typedPerSection) || typedPerSection < 1) throw new Error("typedPerSection must be a positive integer.");
  if (!Number.isInteger(recognitionPerSection) || recognitionPerSection < 1) throw new Error("recognitionPerSection must be a positive integer.");

  const assessed = rawInventory.map((item) => ({
    ...item,
    primarySection: primarySection(item),
    typedAssessment: typedAssessment(item),
    recognitionAssessment: recognitionAssessment(item),
  }));

  const typedResult = takePerSection(assessed, "typedAssessment", typedPerSection, sectionOrders);
  const typedIds = new Set(typedResult.selected.map((item) => item.id));
  const recognitionResult = takePerSection(
    assessed,
    "recognitionAssessment",
    recognitionPerSection,
    sectionOrders,
    typedIds
  );

  const shortages = [
    ...typedResult.shortages.map((item) => ({ mode: "typed", ...item })),
    ...recognitionResult.shortages.map((item) => ({ mode: "recognition", ...item })),
  ];
  if (shortages.length > 0) {
    const detail = shortages.map((item) => `${item.mode} section ${item.section}: ${item.available}/${item.required}`).join(", ");
    throw new Error(`Cannot satisfy deterministic shortlist policy: ${detail}`);
  }

  const rankMaps = { typed: new Map(), recognition: new Map() };
  for (const mode of ["typed", "recognition"]) {
    const selected = mode === "typed" ? typedResult.selected : recognitionResult.selected;
    for (const section of sectionOrders) {
      const sectionItems = selected
        .filter((item) => item.primarySection === section)
        .sort((a, b) => compareByScoreThenId(a, b, mode === "typed" ? "typedAssessment" : "recognitionAssessment"));
      sectionItems.forEach((item, index) => rankMaps[mode].set(item.id, index + 1));
    }
  }

  const typed = typedResult.selected
    .map((item) => compactCandidate(item, "typed", rankMaps.typed.get(item.id)))
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.rankWithinSection - b.rankWithinSection || a.id.localeCompare(b.id, "en"));
  const recognition = recognitionResult.selected
    .map((item) => compactCandidate(item, "recognition", rankMaps.recognition.get(item.id)))
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.rankWithinSection - b.rankWithinSection || a.id.localeCompare(b.id, "en"));

  const typedSet = new Set(typed.map((item) => item.id));
  const recognitionSet = new Set(recognition.map((item) => item.id));
  const inventory = assessed
    .map((item) => {
      let disposition = "not-shortlisted";
      if (!item.typedAssessment.route.hasRoute) disposition = "rejected-no-route";
      else if (typedSet.has(item.id)) disposition = "shortlist-typed";
      else if (recognitionSet.has(item.id)) disposition = "shortlist-recognition";
      else if (item.typedAssessment.risks.length > 0 || item.recognitionAssessment.risks.length > 0) disposition = "flagged-not-shortlisted";
      return {
        ...item,
        candidateAssessment: {
          disposition,
          primarySection: item.primarySection,
          typed: {
            eligible: item.typedAssessment.eligible,
            score: item.typedAssessment.score,
            reasons: item.typedAssessment.reasons,
            risks: item.typedAssessment.risks,
          },
          recognition: {
            eligible: item.recognitionAssessment.eligible,
            score: item.recognitionAssessment.score,
            reasons: item.recognitionAssessment.reasons,
            risks: item.recognitionAssessment.risks,
          },
          approved: false,
          reviewRequired: true,
        },
      };
    })
    .sort((a, b) => String(a.id).localeCompare(String(b.id), "en"));

  const bySection = sectionOrders.map((sectionOrder) => ({
    sectionOrder,
    typed: typed.filter((item) => item.sectionOrder === sectionOrder).length,
    recognition: recognition.filter((item) => item.sectionOrder === sectionOrder).length,
  }));

  return {
    policy: { sectionOrders, typedPerSection, recognitionPerSection },
    typed,
    recognition,
    inventory,
    summary: {
      typedCount: typed.length,
      recognitionCount: recognition.length,
      overlapCount: typed.filter((item) => recognitionSet.has(item.id)).length,
      bySection,
    },
  };
}

export {
  DEFAULT_SHORTLIST_POLICY,
  primarySection,
  recognitionAssessment,
  selectBalancedShortlist,
  typedAssessment,
};
