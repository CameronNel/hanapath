# Gemini Flash 3.5 — Massive Sentences v2 Execution Order

You are Gemini Flash 3.5 working in the HanaPath repository. You are a very fast,
high-volume implementation worker. Execute a large amount of fully specified work,
but do not invent architecture, product scope, Korean semantics, or migration rules.

The Words v2 expansion plumbing has already been implemented, reviewed, and merged.
The current outstanding work is the owner-approved Sentences Curriculum v2
restructure. Read AI_INSTRUCTIONS.md, CLAUDE.md, HANDOVER.md,
docs/SENTENCES_CURRICULUM_V2_PLAN.md, docs/SENTENCES_TEACHING_SPEC.md,
docs/SENTENCES_FINAL_ROADMAP.md §0, §2, §11, §12.5, and .agents/AGENTS.md
before editing.

## Hard boundaries

This is a vanilla static PWA: no framework, bundler, build step, package.json, or
new dependency. Do not modify Words curriculum/data, Alphabet code/data, or
audio_map.js. Do not start Track H authored sentence expansion; it is owner-gated.
Do not merge or push unless explicitly authorized. Preserve unrelated working-tree
changes and never use destructive git commands.

One roadmap box equals one logical PR/commit. You may execute many packets in this
session, but keep them separately reviewable and update a checkbox only when its
acceptance criteria truly pass.

## Baseline

Start with:

    git status --short --branch
    git log --oneline -12
    git pull --ff-only
    node scripts/audit-sentences-data.mjs --strict
    node scripts/audit-words-data.mjs --strict
    node scripts/audit-alphabet-audio.mjs --strict
    node scripts/audit-app-shell.mjs

Re-derive all counts from files. Expected baseline: 2,060 sentence rows, explicit
band/patternTags, 0 audio misses, 2,028 Words rows, 283 live Words v2 lessons, and
the legacy 12-lesson Sentence plan still loaded. The current unchecked queue is
S2-A through S2-G in docs/SENTENCES_CURRICULUM_V2_PLAN.md.

## Packet S2-A — session restyle and durable resume

Touch only app.js, styles.css, and required cache-version wiring. No sentence
data changes.

Restyle the existing Studio session in the already-shipped guided-Words language:

- progress row with “Line N of M”;
- Korean sentence hero tile using sentence-length sizing;
- full-tile button lang="ko" data-speak with accurate aria label;
- romanization, English gloss, pattern chips, and 38px play control;
- two-column Back/forward navigation with 50px targets;
- left-aligned audio controls;
- Translate & Type in the .word-type-box idiom;
- a new .sent-type-box wrapper so word-sized letter-spacing does not leak;
- reserved-height aria-live feedback;
- existing rating-pill treatment where SRS grading applies;
- existing overlay pattern for slow playback/tip details;
- narrow-mobile layout.

New CSS must use .sent-* unless reusing shared classes. Do not edit existing
Words rules. Do not copy legacy .word-example*, .word-card-meaning, or
.word-card-meta*. Replace undefined var(--accent-text) with var(--accent).

Add one delegated listener on the session root for data-sentence-* actions.
Leave hub data-ss-* bindings alone until S2-D. Every speakable Korean string
must be an accessible button.

Add versioned state.sentenceLessonSession persistence:

- serializer, validate-or-drop rehydrator, and persistence helper;
- persist on every advance, clear at summary;
- free-mode sessions remain unpersisted;
- persist lesson/row ids, phase, cursor, drill cursor, typed input, attempts,
  helper level/use, reveal count, locked prefix, built tiles, shuffled pools,
  transform assignments, results, and selected row order;
- persist derived random state, not merely an index, so reload gives identical
  prompts and tiles;
- never duplicate SRS or analytics events after reload.

Test after typed input, wrong answer, and helper use. Play both a lesson and free
translate session end-to-end. Acceptance: exact resume, no console errors,
node --check app.js, all audits green, and cache name/query versions bumped.

## Packet S2-B — deterministic v2 plan, names, lock, and audit

Build the complete data foundation, but do not load the v2 plan until S2-C.
Required files:

- scripts/generate_sentences_curriculum_v2.mjs
- scripts/sentences_curriculum_v2_names.json
- sentences_lesson_plan_v2.js
- scripts/sentences_curriculum_v2_report.md
- scripts/sentences_curriculum_v2_lock.json
- rewritten scripts/audit-sentences-foundation.mjs
- scripts/test_sentences_curriculum_audit.mjs

Inputs are sentences_core.js, words_lesson_plan.js read-only, and the name
manifest. Same inputs must produce byte-identical output. --check must detect
plan, lock, id, membership, name, and snapshot drift.

Use the exact §3.2–§3.6 algorithm:

1. map each sentence to its gating Words unit using the highest-index focus-word
   unit in the HANAPATH_WORD_UNITS array;
2. apply the four explicit reassignment exceptions in §3.2;
3. sort by band ascending then sentence id;
4. use k = ceil(n / 7) and even floor/ceil packing;
5. repair only adjacent same-unit lessons to avoid duplicate Korean surfaces;
6. derive up to three frequent pattern tags;
7. make drill plans with at least 50% translate, one build/listen slot, and
   optional odd-index transform for band >=3;
8. make checkpoint review ids exactly equal to the unit row union;
9. enforce exactly one content-lesson occurrence per bank row.

Emit HANAPATH_SENTENCE_SECTIONS (sn1–sn8), one twin unit per Words unit,
content lessons, checkpoints, and a verbatim HANAPATH_SENTENCE_V1_SNAPSHOT.
IDs are frozen: sn sections, sn... units, ...-lN lessons, ...-cp checkpoints.
No randomness and no invented content.

Author names against the generated report and actual English glosses. Do not use
template names, placeholder emoji, numeral/Roman suffixes, real idol/group/company/
platform/show names, or lyrics. Titles must be globally unique, <=32 characters,
honest to their rows, and trainee-flavored only where supported. Subtitles <=48
characters; goals are one outcome sentence. Unit names inherit the Words theme
with a real emoji. Checkpoint names follow §3.7.

Rewrite scripts/audit-sentences-foundation.mjs with v1/v2 shape auto-detection.
Keep v1 passing. For v2 hard-fail on referential integrity, twin links, exact
coverage, checkpoint equality, i+1 focus-word subsets against Words array order,
prompt bounds, global title uniqueness/suffix ban, closed drill modes, transform
only on band >=3, duplicate Korean within a lesson, and verbatim legacy snapshot.
Strict-fail lesson/unit size, tag/focus coverage, title limits, and placeholder
emoji warnings. Band spread is informational only.

The self-test must mutate copies and prove every new check fires. It must always
target the actual emitted/live filename after S2-C; never leave a stale reference
to a deleted sentences_lesson_plan_v2.js.

Acceptance: v1 and emitted-v2 audits pass, generator repeat is byte-identical,
--check catches drift, self-test covers every invariant, and the report lists
every section/unit/lesson/name/row list/drill plan plus legacy coverage.

## Packet S2-C — switchover, unlocks, runner, migration

Promote the generated plan to sentences_lesson_plan.js, preserving the 12 v1
lessons inside HANAPATH_SENTENCE_V1_SNAPSHOT. Add isSentenceCurriculumV2().

Implement exactly these functions and rules:

- isSentenceUnitUnlocked: all content focus words met via getMetWords();
- isSentenceUnitCrowned: checkpoint passed;
- isSentenceLessonUnlockedV2: unit unlocked plus prior same-unit lesson complete;
- getNextSentenceLesson: first incomplete unlocked lesson, respecting current
  review context;
- Studio entry remains K2-gated;
- sections are display grouping only;
- all functions honor TEST_UNLOCK_ALL_STAGES;
- compute met-word/completion sets once per render;
- use a memoized bank-by-id map and precomputed focus-word unions;
- locked copy identifies the earliest actual unmet Words unit, not merely the twin.

Content sessions have two phases: ungraded listen/shadow per row, then one graded
drill per row from drillPlan. Translate must remain the majority. Transform falls
back to build. Pass is 75% first-try correctness. A failed check or Reveal breaks
first-try; Tip/Word Bank/Next chunk do not. Record firstTry at the session/result
boundary, not by later inference.

Checkpoints have no study phase. Select rows by SRS weakness, due-ness, then id;
freeze selection into persisted session state; use emitted prompt bounds; pass at
80% first-try; crown only after passing. The 7-row grammar unit may have a
7-prompt checkpoint.

Migration must: stash completedLessonsLegacy; set planVersion=2; preserve
results/reviewEvents/band/newPerDay; credit only fully seen new content lessons;
never auto-crown checkpoints; clear old in-flight session; save once; and never
claim old 12 lessons map to new lessons. Keep fixtures for completed, failed,
review-only, partial-session, and mastered profiles.

Add TEST_ENABLE_SENTENCE_SECTION_COMPLETION and
completeSentenceSectionForTesting, but leave all test controls false.

Before S2-D, the interim flat list must still use v2 unit gates, route checkpoint
lessons to a checkpoint runner, share one bank map, preserve K2 gating, and never
dead-end on sentenceIds: [].

Acceptance: seeded K2 profile opens correct sn1 content, lesson progression is
linear within units, checkpoints crown correctly, migrations preserve state, no
console errors, all audits/checks pass, cache versions bump, and a reachability
test proves the active Studio entry opens a playable v2 lesson.

## Packet S2-D — path UI

Replace the flat sentence list with §3.9. Implement sentencePathHtml,
sentencePathUnitHtml, and bindSentencePathUnitToggles.

Include:

- continue hero targeting getNextSentenceLesson();
- eight collapsible sections;
- unit emoji/name/twin theme and n/m progress;
- scenario lesson rows and distinct checkpoint rows;
- crowned-unit collapse;
- locked-unit deep-link to the Words unit owning actual unmet words;
- free-practice strip below the path, unchanged in behavior;
- stats/insights link;
- zero-unlocked state with “Start with Words” hero above free practice;
- upgraded intro using existing .study-list, accent pill, and primary Start idiom.

Reuse .vocab-path-* CSS as-is and do not edit Words path rules. Confirm the Studio
tab reaches the path on first load. Test fresh zero-crown, locked/deep-link,
continue hero, collapse/crown, checkpoint, free-mode, and narrow-mobile states.

## Packet S2-E — polish

Only after S2-D works: remove placeholder emoji; finalize unit emoji; add due
chips if existing SRS APIs make it safe; improve trainee-voice copy; add honest
empty states; review all goals/subtitles in context. Do not add new sentence data,
idol/company/show names, or lyric text.

## Packet S2-F — documentation pointers

Update current docs, preserving history:

- docs/SENTENCES_TEACHING_SPEC.md: dated §8 supersession addendum;
- docs/SENTENCES_FINAL_ROADMAP.md: route path work here while keeping Track H;
- CLAUDE.md, HANDOVER.md, and README.md: cold-start pointers.

Do not mark S2-G complete. S2-G is owner-only real-device acceptance and live
profile migration review.

## Verification gates

Run after every packet and report the output:

    node --check app.js
    node --check sentences_core.js
    node --check sentences_lesson_plan.js
    node scripts/audit-sentences-data.mjs --strict
    node scripts/audit-sentences-foundation.mjs --strict
    node scripts/audit-words-data.mjs --strict
    node scripts/audit-alphabet-audio.mjs --strict
    node scripts/audit-app-shell.mjs
    node scripts/test_sentences_curriculum_audit.mjs

Use a static server and Chromium/playwright-core per HANDOVER.md; capture page
errors and console errors. Do not wait for infinite background animations.

Any changed loaded app.js, styles.css, plan, or data file requires a CACHE_NAME
bump in sw.js plus matching query-string bumps in index.html and sw.js. S2-A
through S2-F must add no Korean text, so audio should not change. If Korean text
is added, stop and use the approved audio pipeline.

Before each commit:

    git diff --stat
    git diff --check
    git diff -- app.js styles.css sentences_core.js sentences_lesson_plan.js

Confirm Words files, Alphabet files, and audio_map.js are unchanged; no current
sentence id/text was silently changed; no v2 plan is loaded before S2-C; and no
test bypass is enabled.

## Final report

Report one row per packet with status, files, verification, and remaining issues.
Include exact live counts derived from files, audit summaries, browser scenarios,
migration fixtures, cache version before/after, copy still needing owner review,
why S2-G remains gated, confirmation Track H was untouched, working-tree status,
and commits/branches actually created.

Never claim Sentences v2 is complete until S2-G owner acceptance is performed.
Never claim authored expansion started merely because the generator exists.
