from pathlib import Path
import re


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(text, old, new, label):
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f"Missing expected source for {label}")
    return text.replace(old, new, 1)


# Record whether a contrast came from the deterministic ranker or an explicit
# human-selected semantic override. This is provenance, not approval.
path = "scripts/lib/sentence-lesson-contrast-authoring.mjs"
text = read(path)
text = replace_once(
    text,
    """    contrastSelection: {
      sourceScope: contrastSelection.sourceScope,""",
    """    contrastSelection: {
      selectionMethod: contrastSelection.selectionMethod || "ranked",
      sourceScope: contrastSelection.sourceScope,""",
    "contrast selection method",
)
write(path, text)


path = "scripts/build-sentence-lesson-contrasts.mjs"
text = read(path)
text = replace_once(
    text,
    'const REVISION = "sentence-lesson-contrasts-cb2-v2";',
    '''const REVISION = "sentence-lesson-contrasts-cb2-v2";
const MANUAL_CONTRAST_OVERRIDES = Object.freeze({
  s0043: "s2047", // "It's there." vs "It's over there."
  s0391: "s3025", // direct instruction vs polite request to open
  s0411: "s0412", // scarf vs necktie around the neck
  s0757: "s3117", // decision question vs statement about that decision
  s0990: "s3173", // two ways to express being proud
  s2032: "s2703", // first meeting vs past meeting closure
  s2998: "s2043", // "my point" idiom vs asking what something means
});''',
    "manual override map",
)
text = replace_once(
    text,
    '''    const contrastSelection = selectContrastRow(target, sectionRows, {
      targetLessonId: lesson.id,
      targetSectionOrder: sectionOrder,
      lessonIdsByRow,
      sectionOrdersByRow,
    });
    return buildLessonContrastEntry''',
    '''    const overrideId = MANUAL_CONTRAST_OVERRIDES[target.id] || null;
    const overrideRow = overrideId ? rowById.get(overrideId) : null;
    if (overrideId && !overrideRow) throw new Error(`${target.id}: missing manual contrast override ${overrideId}.`);
    const contrastSelection = selectContrastRow(target, overrideRow ? [overrideRow] : sectionRows, {
      targetLessonId: lesson.id,
      targetSectionOrder: sectionOrder,
      lessonIdsByRow,
      sectionOrdersByRow,
    });
    contrastSelection.selectionMethod = overrideRow ? "manual-semantic-override" : "ranked";
    return buildLessonContrastEntry''',
    "override selection",
)
text = replace_once(
    text,
    '''    weakContrastCount: entries.filter((entry) => entry.contrastSelection.qualityTier === "weak").length,
    sameLessonContrastCount:''',
    '''    weakContrastCount: entries.filter((entry) => entry.contrastSelection.qualityTier === "weak").length,
    rankedWeakContrastCount: entries.filter((entry) => entry.contrastSelection.selectionMethod === "ranked" && entry.contrastSelection.qualityTier === "weak").length,
    sameLessonContrastCount:''',
    "ranked weak count",
)
text = replace_once(
    text,
    '''    nearbySectionContrastCount: entries.filter((entry) => entry.contrastSelection.sourceScope === "nearby-section").length,
    countsBySection,''',
    '''    nearbySectionContrastCount: entries.filter((entry) => entry.contrastSelection.sourceScope === "nearby-section").length,
    manualOverrideCount: entries.filter((entry) => entry.contrastSelection.selectionMethod === "manual-semantic-override").length,
    countsBySection,''',
    "manual override count",
)
text = replace_once(
    text,
    '''    weakContrastCount: report.weakContrastCount,
    sameLessonContrastCount:''',
    '''    weakContrastCount: report.weakContrastCount,
    rankedWeakContrastCount: report.rankedWeakContrastCount,
    sameLessonContrastCount:''',
    "ranked weak output",
)
text = replace_once(
    text,
    '''    nearbySectionContrastCount: report.nearbySectionContrastCount,
    countsBySection:''',
    '''    nearbySectionContrastCount: report.nearbySectionContrastCount,
    manualOverrideCount: report.manualOverrideCount,
    countsBySection:''',
    "manual override output",
)
write(path, text)


path = "scripts/audit-sentence-lesson-contrasts.mjs"
text = read(path)
text = replace_once(
    text,
    "const EXPECTED_TOTAL = 198;",
    "const EXPECTED_TOTAL = 198;\nconst EXPECTED_MANUAL_OVERRIDES = 7;",
    "expected override count",
)
text = replace_once(
    text,
    'if (report.weakContrastCount !== 0) fail(`weak contrast count must remain 0; got ${report.weakContrastCount}`);',
    'if (report.rankedWeakContrastCount !== 0) fail(`ranked weak contrast count must remain 0; got ${report.rankedWeakContrastCount}`);\nif (report.manualOverrideCount !== EXPECTED_MANUAL_OVERRIDES) fail(`manual override count must be ${EXPECTED_MANUAL_OVERRIDES}; got ${report.manualOverrideCount}`);',
    "ranked weak audit",
)
text = replace_once(
    text,
    '''  if (!entry.contrastSelection || !["strong", "usable"].includes(entry.contrastSelection.qualityTier)) {
    fail(`${label}: contrast quality must be strong or usable`);
  }''',
    '''  if (!entry.contrastSelection || !["ranked", "manual-semantic-override"].includes(entry.contrastSelection.selectionMethod)) {
    fail(`${label}: invalid contrast selection method`);
  }
  if (entry.contrastSelection?.selectionMethod === "ranked" && !["strong", "usable"].includes(entry.contrastSelection.qualityTier)) {
    fail(`${label}: ranked contrast quality must be strong or usable`);
  }''',
    "selection method audit",
)
text = replace_once(
    text,
    'console.log(`Contrast quality: strong=${report.strongContrastCount}, usable=${report.usableContrastCount}, weak=${report.weakContrastCount}`);',
    'console.log(`Contrast quality: strong=${report.strongContrastCount}, usable=${report.usableContrastCount}, weak=${report.weakContrastCount}, ranked weak=${report.rankedWeakContrastCount}`);',
    "quality log",
)
text = replace_once(
    text,
    'console.log(`Contrast sources: same lesson=${report.sameLessonContrastCount}, same section=${report.sameSectionContrastCount}, nearby section=${report.nearbySectionContrastCount}`);',
    'console.log(`Contrast sources: same lesson=${report.sameLessonContrastCount}, same section=${report.sameSectionContrastCount}, nearby section=${report.nearbySectionContrastCount}`);\nconsole.log(`Manual semantic overrides: ${report.manualOverrideCount}`);',
    "override log",
)
write(path, text)

print("Applied CB2 semantic override provenance and audit rules.")
