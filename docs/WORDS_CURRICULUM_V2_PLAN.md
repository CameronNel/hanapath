# Words Curriculum v2 — Restructure Plan & Execution Queue

> **Status:** Owner-approved plan, written 2026-07-09. This document reopens the
> Words section (previously "complete and protected", finalization closed
> 2026-07-05) **by explicit owner decision**. It is the source of truth for the
> Words curriculum restructure and the 20k-word expansion pipeline.
>
> **Revision 2026-07-09:** Implementation-hardening pass added deterministic
> allocation/locking, bounded learner workload, conservative migration,
> checkpoint-safe audits, and a finite-core/elective-expansion architecture.
> The binding corrections labelled in §3–§5 take precedence over any earlier
> provisional narrative in this document.

> **Phase 1 close-out (2026-07-09):** The owner approved the v2 allocation,
> workload prototype, emoji/copy polish, live-profile migration review, and
> real-device S1/S2 acceptance. P1-0 through P1-G are complete; v2 IDs and
> the finite-core path are frozen. Further curriculum changes belong in the
> expansion pipeline below.
>
> **Audience:** a highly capable coding model executing this plan PR by PR.
> Read §1 (locked decisions), §2 (verified current state), §3 (target design),
> then take the next unchecked box in §4/§5. One box = one draft PR. The owner
> marks ready and squash-merges.
>
> **Relationship to other docs:** `docs/VOCABULARY_TEACHING_SPEC.md` remains the
> pedagogy north star except where this plan explicitly supersedes it (lesson
> size band, path structure — see §3.14). `docs/WORDS_SECTION_MASTER_SPEC.md`
> remains the implementation reference for the SRS engine and word-row schema,
> both of which this plan does NOT change.

---

## 0. The problem being solved

The Words lesson list today is **298 lessons in one flat scrolling list**,
labeled with meaningless stage dots (`W0`…`W218`), mostly 5–7 words each, with
sibling lessons distinguished only by Roman numerals ("Survival core II") or
repeated machine-generated titles. The owner experience: *"Once I go into
lessons I feel very overwhelmed by the amount of jagged lessons there are."*

Target: a **Duolingo-style path** — Sections → themed Units (~3 lessons + a
review checkpoint) → **10-word lessons with unique scenario names** — covering
the existing 2,028 curated words first (Phase 1, zero new content required),
then growing toward the full 20k+ frequency list via a batched enrichment
pipeline (Phase 2).

---

## 1. Locked owner decisions (2026-07-09)

These eight decisions were made explicitly by the owner. Do not re-litigate
them; open a question to the owner only if a decision proves technically
impossible.

| # | Question | Decision |
|---|----------|----------|
| 1 | Scope of 20k coverage | **Phased.** Phase 1 restructures the existing 2,028 curated words now; Phase 2 is a fully-specced batched AI-enrichment pipeline promoting the remaining ~18k frequency-list words into lessons category by category. |
| 2 | Browsing experience | **Duolingo-style path.** Sections → Units → lesson nodes; themed units of ~3 lessons + checkpoint; one obvious "continue" point; per-unit progress. Replaces the flat 298-row list. |
| 3 | Naming | **Scenario names.** Unit = theme area ("Café & Restaurant"); lesson = concrete scenario ("Ordering at a café"). Names are distinct within their displayed section; no numeral suffixes. |
| 4 | Existing progress | **Preserve via migration.** One-shot version-gated migration; a new lesson counts as complete when all its words are already seen in SRS. Word-level SRS untouched (word ids frozen). |
| 5 | Session size | **Full practice + mid-lesson save.** Scale the drill caps so every word gets audio, typing, and context practice; persist mid-lesson position so a reload doesn't lose progress. |
| 6 | "Most relevant first" | **Frequency + usefulness blend.** Corpus frequency rank where a 5k match exists (~63% of words), hand-curated curriculum position as fallback/tiebreaker. |
| 7 | Unlocking | **Linear units, parallel categories.** Lessons inside a unit unlock in order; all units within the active section are open in parallel; sections gate progression. |
| 8 | Unit reviews | **Checkpoint per unit.** Every unit ends with a review lesson mixing all the unit's words (no new words); passing it "crowns" the unit. |

**Implementation clarification:** scenario names must be distinct where the
learner sees them together (within a section) and never use numeric sequel
names. Later elective packs may reuse a natural scenario title with their
breadcrumb; this avoids artificial copy at 20k scale.

The accepted migration intent is preservation of completed learning, not
credit for any bare SRS `seen` event; §3.11 defines the conservative mapping.
“Full practice” means every word gets card/audio and typed study exposure;
retrieval is bounded and rotated rather than a 40+ question sitting (§3.10).
“Frequency + usefulness” and “parallel categories” are implemented through
utility overrides and per-track prerequisites (§3.4A/§3.8), not arbitrary
global file order.

---

## 2. Verified current state (re-derived from data 2026-07-09 — do not trust this section blindly either; re-verify counts before your PR)

### 2.1 Data tiers

| Tier | File | Rows | Lesson-eligible? |
|---|---|---|---|
| Curated core | `words_curated_core.js` → `window.HANAPATH_CURATED_WORDS` | **2,028** | Yes — the only tier lessons can reference |
| 5k frequency list | `korean_5000_claude_ready.csv` | 5,000 | No — bare `rank, korean_spelling, romanization, frequency_band, syllables, token_note, source_url`. No meanings, no POS, un-lemmatized (particles and conjugated stems are separate rows) |
| 15k supplementary | `korean_supplementary_15k.csv` | 14,661 | No — same bare schema, ranks 5194–22679; loaded at runtime for the word-bank reference view only (`app.js:3198`, `app.js:3376-3413`) |
| Rank 1–500 glosses | `raw_word_meanings.js` | 500 | Reference only |

Key facts:
- All 2,028 curated rows are **100% complete** on every audit-required field
  (meaning, exampleKo/En, voiceText, exampleVoiceText, annotations, audio
  mapping). **Phase 1 needs zero new content and zero audio work.**
- Word-level audio already exists for the current CSV spellings in
  `audio_map.js` (text-keyed, ~25,369 entries). This is not a Phase 2
  exemption: lemma normalisation or a new form can introduce spoken Korean
  absent from the CSV. Every new `voiceText`, form, and example text must be
  checked against `AUDIO_MAP` and generated before the final cache bump.
- 1,282 of 2,028 curated words (63.2%) exactly match a 5k CSV spelling; the
  runtime join logic to reuse offline is `buildWordReferenceRows`
  (`app.js:4338-4367`).
- 105 multi-sense lemmas exist (same `korean`, different sense rows); 54 rows
  have `contrastWith` (59 directed **surface-text** links, including ambiguous
  and unresolved targets); 26 rows have `honorificRole`. A generator must not
  treat `contrastWith` values as word ids — see §3.4.

### 2.2 Lesson plan

- `words_lesson_plan.js` (~2,446 lines) → `window.HANAPATH_WORD_LESSONS`:
  **298 lessons across 219 display "stages" (W0–W218)**, every curated word
  targeted to be referenced exactly once after P1-0 reconciliation.
  **Correction / P1-0 input:** this is a v2 invariant, not the current state.
  The 298 lessons contain 2,033 lesson-word references for 2,028 distinct
  curated ids: five ids are placed twice (`w0610_eonje`, `w1506_bae`,
  `fw1803_geona`, `w_m6_3034_gujo_rescue`, `w_m6_3035_jojik_tissue`). P1-0
  resolves those placements explicitly; v2 must contain every curated id
  exactly once.

- `defineLesson()` (`words_lesson_plan.js:11-31`) auto-chains
  `unlock.previousLessonId` to the previous lesson **in file order** — the
  array order IS the single strict linear path. Every lesson also requires
  alphabet completion. `stage` is purely a display label.
- Actual size distribution: 4w×2, 5w×33, 6w×37, **7w×188**, 8w×26, 9w×8,
  10w×2, 11w×2. The "5-word lesson" was never a hard rule — the spec band is
  5–7 (§6.2 of the master spec) and the only audited size rule is a
  thin-lesson (<4 words) fold warning.
- Default checkpoints (`words_lesson_plan.js:8`):
  `["ko-to-meaning","audio-to-meaning","meaning-to-ko","type-ko","sentence-blank"]`;
  default pass `{ minFirstTryPct: 75, requireTypedAttempt: true }`; review
  policy `{ includeDue: true, maxReviewCards: 4 }`.
- W0–~W37 are hand-curated (multi-lesson stages, decent titles/goals); W38+
  is a machine-generated tail of one-lesson stages — the main source of the
  "jagged" feel.
- One lesson has `tutorial: true` (`w0-post-hangul-bridge-01`); grammar-track
  lessons declare custom checkpoints (`function-usage`, `form-recognition`,
  `form-production`).

### 2.3 Lesson list UI (what gets replaced)

- Words home: `wordsHomeContentHtml()` (`app.js:7072`) stacks 5 cards —
  continue hero, review due, basics entry (`wordBasicsSectionHtml`,
  `app.js:6702`), guided lessons entry (`wordLessonsSectionHtml`,
  `app.js:6903`), legacy 10-band stage view entry
  (`vocabularyStagesSectionHtml`, `app.js:6718`).
- The lesson list itself: `wordPathLessonPanelHtml()` (`app.js:6839`) — one
  flat `study-list` of all matching lessons, with a Category `<select>`
  (options from `getWordLessonCategoryOptions()` `app.js:6649`; a lesson's
  category = its **first word's `lessonGroup`**, `getWordLessonCategoryId()`
  `app.js:6638`) and a Level `<select>` (`WORD_PATH_LEVEL_FILTERS`
  `app.js:4255-4264`), persisted as `state.wordPathCategory` /
  `state.wordPathLevel`.
- Row renderer `wordLessonRowHtml()` (`app.js:6678`): stage string crammed
  into a round `unit-dot`, title, subtitle + live SRS counts of varying
  length, status pill. Meta from `getWordLessonPathMeta()` (`app.js:6800`).
- The legacy 10-band view (`VOCAB_BANDS` `app.js:3200`) is a separate
  rank-band quiz feature — **out of scope, leave untouched**.

### 2.4 Lesson runner

- Volatile session state `wordLessonView` (`app.js:4280`) — **lost on
  reload** (only `state.vocabLessonActive` survives; resume restarts at
  intro). Modes: `intro → study → check → result`
  (`renderWordLesson` `app.js:5280`).
- Study phase (`initWordLessonView` `app.js:5107`): exactly 2 steps per word
  — card + type. (`WORD_LESSON_REPEAT_STEP_ENABLED = false`, `app.js:4253`.)
- Checkpoint builder `buildWordLessonQuestions` (`app.js:5073`) — current
  caps that do NOT scale with lesson size:
  - `audio-to-meaning`: first 2 words only (`words.slice(0, 2)`, ~line 5082)
  - `type-ko`: first + last word only (~line 5085)
  - `sentence-blank`: max 3 (~lines 5094-5099)
  - `ko-to-meaning` / `meaning-to-ko`: one per word (uncapped)
- Distractors are drawn from the whole curated bank, not the lesson
  (`pickWordMeaningChoices`/`pickWordKoreanChoices` `app.js:4745-4757`), so
  bigger lessons don't degrade choice quality.
- Sentence-blank viability: 1,985/2,028 words (97.9%) can generate one; the
  audit hard-fails any lesson whose declared checkpoint can't produce ≥1
  question.
- Form-drill targets are selected by `word.lessonGroup`
  (`app.js:4980-4986, 5013-5022`, mirrored in
  `scripts/audit-words-data.mjs:354-359`) — **word rows keep their
  `lessonGroup` field forever**; the new curriculum taxonomy is a separate
  mapping (§3.4) and must NOT rewrite `lessonGroup`.
- Pass/fail: `minFirstTryPct` 75 + typed attempt per word; failing keeps
  words in SRS and allows retry. `finishWordLesson` seeds a `vocabSrs`
  record for every lesson word.

### 2.5 Persistence & migration infrastructure

localStorage key `hanapath-v1`. Relevant fields:
- `state.vocabSrs` — keyed by **word id** (frozen forever; Leitner boxes 0–7).
- `state.vocabLessonCompleted` — array of **lesson ids** (these WILL change).
- `state.vocabLessonActive`, `state.wordPathCategory`, `state.wordPathLevel`,
  `state.vocabReviewEvents` (analytics; embeds old lessonIds — harmless).
- `migrateVocabState()` (`app.js:4306-4329`) runs on every init inside
  `initWordBanks()` (`app.js:4466`) — the natural home for the one-shot
  remap. Precedents: `migrateAlphabetProgress` (`app.js:2895-2903`, id
  filtering) and the version-gated one-shot `soundEffectPresetVersion` block
  (`app.js:2906-2915`).
- Without migration: the unlock chain re-locks at lesson 1, and completed
  counts inflate (raw `.length` at `app.js:6844`, `app.js:6905`). Quiz pool
  (`getCuratedQuizPool` `app.js:11148`) and Sentences met-words
  (`getMetWords` `app.js:14156`) mostly survive via SRS union.
- `TEST_UNLOCK_ALL_STAGES = true` (`app.js:2856`) currently unlocks
  everything. It is a temporary owner override; P1-C flips the production
  value to `false` before real v2 gating is tested. A separately scoped local
  dev override may exist, but must never bypass the shipped acceptance tests.

### 2.6 Hard-coded references that must be updated when lesson ids change

- `getBasicWordLessons()` — 8 hard-coded lesson ids (`app.js:6664-6676`).
- Sentences section stage strings `"W0"/"W1"/"W2"` (`app.js:14184`,
  `app.js:14218`).
- `getWordLessonCategoryId()` falls back to `lesson.stage` (`app.js:6646`).
- Audit subtitle rule: a subtitle matching `Learn N common words` must have
  N === `newWordIds.length` (`scripts/audit-words-data.mjs:292-295`).

### 2.7 Audit + shipping constraints (unchanged by this plan unless stated)

- `scripts/audit-words-data.mjs --strict` must stay green. Hard errors:
  duplicate/missing ids, missing `newWordIds` entries, **empty `newWordIds`**
  (must be relaxed for checkpoint lessons — §3.10), broken
  `previousLessonId`, checkpoint types that can't generate ≥1 question,
  invalid enums/annotationSource, identical senseKeys/glosses in a
  same-korean group. Warnings (strict-failing): thin lessons, orphan words,
  duplicate meanings (Jaccard ≥ 0.4 same POS), any voiceText missing from
  `AUDIO_MAP`.
- Cache bumps: any change to `app.js`, `styles.css`, or a loaded data file →
  bump `CACHE_NAME` in `sw.js` AND matching `?v=` strings in `index.html`
  and `sw.js`; verify with `node scripts/audit-app-shell.mjs`.
- Audio: new Korean text → `python generate_assets.py` (owner runs it);
  never hand-edit `audio_map.js`.
- Stay vanilla/static: no framework, no build step, plain browser globals.
- Word-row data changes remain **additive and backward-compatible**: never
  remove or rename an existing row `id`.
- Workflow: branch off `main`, small single-purpose **draft PR**, owner
  squash-merges. Verify per §7.
- Bulk tooling precedent: `scripts/generate_m5_data.py` (887 lines) inserts
  authored word dicts into `words_curated_core.js`, appends `defineLesson`
  blocks, bumps `?v=` strings — the working template for Phase 2 scripts.

---

## 3. Target design

### 3.1 Terminology & hierarchy

```
Course (Words section)
└── Section        — a learner-journey band (8 in Phase 1), gates progression
    └── Unit       — a themed cluster: 2–4 content lessons + 1 checkpoint
        └── Lesson — ~10 new words with a unique scenario name
        └── Checkpoint — unit-final review lesson, 0 new words
```

Phase 1 magnitudes (2,028 words): ~203 content lessons + ~68 checkpoints
across ~68 units and 8 sections. Exact numbers are produced by the generator
(§3.6) and will drift slightly; the audit enforces the invariants, not the
totals.

### 3.2 Sections (Phase 1 skeleton)

Sections are learner-journey bands, not themes. Every section (except S1)
contains units from several category tracks in parallel; big categories
contribute a unit to almost every section, small ones to two or three. This is
the Duolingo pattern: themes recur at increasing depth.

| # | Section id | Name | Contents | ~Units |
|---|---|---|---|---|
| 1 | `s1` | **First Words** | Tutorial + survival + pronouns/questions/demonstratives (post-hangul-bridge 26, survival-core 38, people-pronouns 10, things-demonstratives 10, question-words 13 = 97 words). Linear — units unlock in order here (it's the on-ramp). | 3 |
| 2 | `s2` | **Daily Life** | Highest-relevance unit from each major track: time & routine, food, actions, feelings, family, places + first Grammar Glue unit | ~9 |
| 3 | `s3` | **Out and About** | Next tier: travel & city, shopping, school, weather, body, tech + Grammar Glue II | ~9 |
| 4 | `s4` | **People & Plans** | Next tier: occupations, hobbies & sports, family depth, feelings depth, connectives | ~9 |
| 5 | `s5` | **Getting Things Done** | Next tier across tracks + honorifics/endings-register unit | ~9 |
| 6 | `s6` | **Wider World** | Next tier across tracks (nature, travel depth, work depth) | ~10 |
| 7 | `s7` | **Depth & Nuance** | Next tier; irregular families, noun modification, contrast pairs | ~10 |
| 8 | `s8` | **Finishing the Core** | Remainder of all tracks | ~9–10 |

Rules for the generator (provisional narrative; the binding allocation manifest
in §3.2A and binding partition rules in §3.4A override any conflict):
- Within a section, order units by category display order (stable), but the
  UI treats them as parallel (§3.8).
- The 97 S1 words keep (approximately) their current hand-tuned order — S1 is
  a re-chunking of today's W0–W3 region, not a re-sort.
- Grammar Glue units (§3.5) are pinned: one in S2, one in S3, honorifics/
  register in S5, irregulars/noun-modification in S7.

### 3.2A Binding allocation manifest (required before IDs are frozen)

The section table above is a learner-facing skeleton, **not** an executable
quota table. P1-0 creates and the owner approves
`scripts/curriculum_v2_allocation.json` before P1-B can emit v2 ids. It is a
plain, committed manifest containing every `sectionId -> unitId -> lessonId`
slot, its track, its ordered word ids, and its prerequisite unit (if any).
The generator validates and renders this manifest; it must never invent
section placement from a vague "earliest quota" rule.

The manifest must also contain the exact 97-word S1 order. S1 is **not** just
a re-chunking of W0-W3: those stages contain 41 words, while the S1 pool also
draws from W9, W20, W21, and W38. It records the deliberate order and the
resolution of the five duplicated legacy placements from §2.2. The owner
reviews the generated S1 and S2 lists before any v2 ids become durable.

### 3.3 Category tracks (consumer-facing taxonomy)

Word rows keep `lessonGroup` untouched (form drills depend on it, §2.4). The
curriculum taxonomy is a **new mapping defined here** and materialized only in
the generator + unit metadata:

| Track id | Display name | Source lessonGroups | Words |
|---|---|---|---|
| `feelings` | Feelings & Descriptions | feelings-descriptions (317), colors (12) | 329 |
| `actions` | Everyday Actions | core-actions (192) | 192 |
| `travel` | Travel & City | travel-city (184), places-movement (63) | 247 |
| `study` | School & Study | study-school (156) | 156 |
| `daily` | Time & Daily Life | time-daily (123), home-routine (53) | 176 |
| `work` | Work & Jobs | occupations (100) | 100 |
| `nature` | Nature & Weather | weather-nature (98), animals (19) | 117 |
| `shopping` | Shopping & Money | shopping-money (96), clothing (34) | 130 |
| `tech` | Objects & Tech | daily-objects-tech (90) | 90 |
| `people` | People & Family | family-people (83) | 83 |
| `food` | Food & Drink | food-drink (71) | 71 |
| `health` | Body & Health | body-health (67), body-parts (12) | 79 |
| `hobbies` | Hobbies & Sports | hobbies-leisure (54), sports (41) | 95 |
| `grammar` | Grammar Glue | function-words-1 (10), connectives (22), tense-negation (5), noun-modification (6), endings-register (6), honorifics (7), irregular-families (10) | 66 |
| `firstwords` | First Words (S1 only) | post-hangul-bridge (26), survival-core (38), people-pronouns (10), things-demonstratives (10), question-words (13) | 97 |

Total: 2,028. ✓ (Re-verify at generation time; the audit re-checks coverage.)

### 3.4 Word → lesson assignment algorithm (generator spec)

For each track (except `firstwords` and `grammar`, which have bespoke rules):

1. **Relevance score** per word:
   `score = matchedRank ?? (5000 + currentPlanIndex)` where `matchedRank` is
   the 5k CSV rank joined on exact `word.korean` (reuse the
   `buildWordReferenceRows` join logic offline), and `currentPlanIndex` is
   the word's global position in today's `words_lesson_plan.js` order (which
   encodes the hand-tuned pedagogy). Sort ascending.
2. **Chunk into lessons of 10** (allowed band 8–12; the final lesson of a
   track absorbs the remainder; never emit a lesson under 8 — merge the tail
   into the previous lesson up to 12 instead).
3. **Constraint repair pass** (swap words between adjacent lessons in the
   same track to satisfy, in priority order):
   - No two senses of the same surface form (`korean`) in one lesson
     (ko-to-meaning would be ambiguous).
   - Keep `contrastWith` pairs in the same lesson where both members share a
     track; otherwise leave them.
   - Every lesson must contain ≥1 sentence-blank-capable word (97.9% of the
     bank is capable — this virtually never binds, but the audit checks it).
4. **Group lessons into units of 3** (allowed 2–4; final unit of a track may
   have 2). Append one checkpoint per unit (§3.10).
5. **Distribute units across sections** S2–S8 in relevance order:
   unit *k* of a track goes to the earliest section whose track quota (§3.2)
   still has room. Every section should end up with 8–11 units.

Bespoke rules:
- `firstwords`: preserve current relative word order from today's W0–W3
  lessons; re-chunk into ~10-word lessons; 3 units; first lesson keeps
  `tutorial: true`.
- `grammar`: preserve today's hand-designed lesson *compositions* (these
  lessons carry custom checkpoints — `function-usage`, `form-recognition`,
  `form-production` — whose viability the audit enforces). Merge sibling
  grammar lessons toward 8–12 words ONLY when both source lessons share the
  same checkpoint list; otherwise keep the lesson as-is even if it stays at
  5–7 words. Re-house them into `grammar` units without changing
  word-to-lesson membership beyond those safe merges.

### 3.4A Binding assignment and partition rules

The prose algorithm in §3.4 is an editorial description. The following rules
are the executable contract and override it wherever they differ:

1. **Usefulness before rank.** Every word receives a committed manual
   `utilityTier`/override (or `null`) before rank is used. Sort by utility tier,
   then verified frequency rank, then the frozen v1 source index. This is a
   real frequency-and-usefulness blend; rank alone or the machine-generated
   legacy tail is not a curricular decision.
2. **Balanced lesson partition.** For a non-exempt track of `N` words, choose
   `k = round(N / 10)` subject to `8k <= N <= 12k`, then distribute the words
   as evenly as possible (`floor(N/k)` or `ceil(N/k)` each). Fail if no such
   `k` exists. Never make a 17-word lesson by merging a short tail. Grammar
   exemptions are explicit in the manifest.
3. **Balanced unit partition.** Group content lessons in threes; turn a final
   `3 + 1` grouping into `2 + 2` or `4`, so every unit has 2-4 content lessons.
   The allocation manifest, not a runtime heuristic, records the result.
4. **Sense-safe units.** No Korean surface may occur twice anywhere in one
   unit's review words, not merely in one content lesson: a unit checkpoint
   asks Korean-to-meaning over all its lessons. The audit hard-fails a
   violation unless that checkpoint direction is explicitly disabled with an
   owner-reviewed disambiguation reason.
5. **Contrast resolver.** `contrastWith` is Korean surface text, not a word
   id. Resolve it through a committed surface-to-id table; unresolved or
   polysemous matches are reported and require an explicit policy. Do not
   force a pair together if it would violate rule 4.
6. **Grammar extraction policy.** Preserve the eight custom grammar lessons
   as protected source units. Fifteen connective words currently live in six
   mixed/default lessons, so P1-0 must explicitly assign each of them either
   to a Grammar Glue unit or to its original non-grammar track; "preserve
   membership" and "move every connective" cannot both be implicit rules.

### 3.5 IDs and stability rules (v2)

- New lesson id format: `s{section}-{track}-u{unitOrdinal}-l{lessonOrdinal}`
  e.g. `s2-food-u1-l2`. Checkpoints: `s2-food-u1-cp`.
  Unit ids: `s2-food-u1`. Section ids: `s1`…`s8`.
- **From v2 onward, lesson/unit/section ids are frozen** just like word ids
  (progress is keyed on them). The shipped plan is captured in
  `scripts/curriculum_v2_lock.json`: ids, names, order, word membership, and
  source hashes. Phase 2 runs in append-only mode and fails if any locked v2
  object changes; it never re-sorts the whole course.
- `stage` field: keep the property for backward compatibility but set it to
  the section id (`"s2"`). Nothing user-facing renders it anymore (§3.9).

### 3.6 The generator script

`scripts/generate_words_curriculum_v2.mjs` (Node, no deps):

- **Inputs:** `words_curated_core.js`, current `words_lesson_plan.js` (for
  `currentPlanIndex` and grammar-lesson preservation),
  `korean_5000_claude_ready.csv` (for ranks), the track mapping table (§3.3,
  embedded as a constant), and the **name manifest** (§3.7).
- **Outputs:**
  1. `words_lesson_plan.js` — fully regenerated v2 file (schema §3.10),
     including the sections/units globals and compact v1 lesson-word snapshot
     needed for migration (§3.11).
  2. `scripts/curriculum_v2_report.md` — human-readable diff report: every
     unit with its lessons, names, word lists, relevance scores; flags any
     constraint-repair swaps; owner reviews this in the PR.
- **Determinism:** given identical inputs, output is byte-identical (no
  randomness, no timestamps). The generator is committed and re-runnable;
  Phase 2 batches extend it.
- The generator must fail loudly (non-zero exit) if any invariant in §3.4
  can't be satisfied, rather than emitting a best-effort plan.

**Bootstrap versus append mode (binding):** P1-B reads a committed
`scripts/curriculum_v1_snapshot.json`, not whichever lesson plan happens to
be loaded. It writes a caller-selected output path: P1-B writes the unreferenced
`words_lesson_plan_v2.js`; P1-C promotes it; later batches read the v2 lock and
may only append approved expansion-pack objects. The report is the human diff;
the lock is the machine-enforced regression oracle. The generator must expose
an explicit `--plan v2` audit input and a byte-identical `--check` mode.

### 3.7 Naming system (scenario names)

Names live in a **name manifest** consumed by the generator:
`scripts/curriculum_v2_names.json` — `{ unitId: { name, emoji }, lessonId:
{ title, subtitle, goal } }` keyed by the deterministic ids from §3.5.
Authoring the manifest is an LLM task inside the generator PR (P1-B): run the
generator once with placeholder names to fix ids and word assignments, author
names against the actual word lists, re-run.

Rules (audit-enforced where marked):
- **Content titles unique within their displayed section** (case-insensitive)
  — audit hard error. A section/unit breadcrumb disambiguates later expansion
  packs, avoiding strained globally-unique copy at 20k scale.
- No numeral or Roman-numeral suffixes ("Animals 2", "Survival core II") —
  audit hard error (regex `/\b(\d+|II|III|IV|V)\b$/`).
- Title ≤ 32 chars, sentence case, concrete scenario grounded in the actual
  words of the lesson. Subtitle ≤ 48 chars, may carry flavor. `goal` = one
  sentence, outcome-phrased.
- Unit names = theme area, unique within their displayed section, ≤ 24 chars,
  with one emoji for the path node.
- Checkpoint lessons are auto-named with their section/track context, e.g.
  `"Daily Life · Café checkpoint"`, subtitle `"Review {n} words"`. They are
  unique within their section by construction and retain the numeric-suffix ban.

Examples of the register wanted (for the authoring model):
- Unit "Café & Restaurant" (food): "Ordering at a café", "Table for two",
  "Compliments to the chef".
- Unit "Morning Routine" (daily): "Waking up late", "Out the door by eight".
- Unit "Small Talk" (feelings): "How was your day?", "Rainy-day moods".
- Grammar units keep instructive names: "Connecting your sentences",
  "Honorifics: speaking up".

### 3.8 Unlock model (v2)

Replaces the single linear chain. Implemented in app.js, driven by plan data:

- **Lesson**: unlocked iff its unit is unlocked AND the previous lesson in
  the unit is completed (first lesson: just the unit). Checkpoint: unlocked
  when all content lessons in its unit are completed.
- **Unit**: unlocked iff its section is unlocked. Exception: S1 is linear —
  each S1 unit also requires the previous S1 unit's checkpoint.
- **Unit crowned**: checkpoint passed.
- **Section**: S1 unlocked when alphabet complete (same
  `requiresAlphabetComplete` semantics as today). S(n+1) unlocked when **all
  units in S(n) are crowned**.
- `getNextWordLesson()` v2: first unlocked, uncompleted lesson in plan order
  — used by the continue hero; the path UI additionally shows every
  currently-unlocked lesson so the learner picks their track.
- `TEST_UNLOCK_ALL_STAGES` remains as a dev override but ships `false`
  (flipped in P1-C).

**Parallel-track clarification (binding):** categories are parallel, not a
free-for-all inside a category. A non-S1 unit is unlocked when its section is
unlocked **and** its `previousTrackUnitId` (when present) is crowned. This
keeps the learner's chosen track in relevance order while allowing another
topic to be chosen.

`getContinueWordLesson()` replaces the old hero behavior. It returns, in
order: a valid saved in-progress session; the next item in the learner's
last-active unit; the manifest's recommended unit; then the first ordered
fallback. `getNextWordLesson()` remains only that final deterministic fallback.
Store `lastActiveUnitId` when a learner opens a unit/lesson. This prevents a
reload from sending someone back to an unrelated earlier parallel unit.

`TEST_UNLOCK_ALL_STAGES` is `false` in P1-C, before gate acceptance tests run.

### 3.9 Path UI (v2)

Replaces `wordPathLessonPanelHtml` and the "Guided word lessons" flat list.
Keep vanilla JS + existing card/`study-list` CSS idioms; new CSS classes go in
`styles.css`.

Structure (top to bottom):
1. **Continue hero** (existing card, kept) — one obvious resumable or
   recommended next lesson, driven by `getContinueWordLesson()`.
2. **Sections**, rendered in order. Each section = a header (name +
   `crownedUnits/totalUnits` progress) + its units. Locked sections render
   collapsed with a lock note ("Finish Daily Life to unlock").
3. **Unit card**: emoji, unit name, track label, progress ring or `n/m`
   fraction, and the lesson nodes: one row per lesson (scenario title +
   status icon: done ✓ / current ▶ / locked 🔒), checkpoint row visually
   distinct (flag/trophy icon). Completed units auto-collapse to a single
   crowned row (tap to expand).
4. The active section is expanded by default; exactly one unit (the one
   containing `getContinueWordLesson()`) is highlighted. Other open tracks
   start behind an "Explore topics" disclosure so 8-11 available units are
   choice, not a wall of decisions.

Removals/simplifications:
- The `W0`–`W218` stage dot dies. The Category and Level `<select>` filters
  die (`state.wordPathCategory`/`wordPathLevel` become vestigial — migration
  clears them; keep the state keys tolerated for old saves).
- The separate "Guided word lessons" entry card collapses: Words home renders
  the path directly under the continue hero (basics card and legacy band
  view entry stay as-is).
- Per-row live SRS counts ("2 hard · 3 due") move off the path rows; the
  review card already communicates due load. (Unit expansion MAY show a
  small "n due" chip per unit — optional polish, P1-E.)

### 3.10 Lesson-plan schema (v2)

`words_lesson_plan.js` v2 exports three globals (all plain data, loaded
before `app.js`):

```js
window.HANAPATH_WORD_SECTIONS = [
  { id: "s1", name: "First Words", order: 1, unlock: { requiresAlphabetComplete: true } },
  { id: "s2", name: "Daily Life", order: 2, unlock: { previousSectionId: "s1" } },
  // ...
];
window.HANAPATH_WORD_UNITS = [
  { id: "s2-food-u1", sectionId: "s2", track: "food", name: "Café & Restaurant",
    emoji: "☕", order: 1, lessonIds: ["s2-food-u1-l1", "s2-food-u1-l2", "s2-food-u1-l3"],
    checkpointId: "s2-food-u1-cp" },
  // ...
];
window.HANAPATH_WORD_LESSONS = [
  { id: "s2-food-u1-l1", unitId: "s2-food-u1", stage: "s2", type: "content",
    title: "Ordering at a café", subtitle: "Drinks, sizes, and please",
    goal: "Order a drink and ask for the bill.",
    tutorial: false,
    newWordIds: [/* 8–12 ids */],
    reviewPolicy: { includeDue: true, maxReviewCards: 4 },
    checkpoints: [...defaults or custom...],
    pass: { minFirstTryPct: 75, requireTypedAttempt: true } },
  { id: "s2-food-u1-cp", unitId: "s2-food-u1", stage: "s2", type: "checkpoint",
    title: "Café & Restaurant checkpoint", subtitle: "Review all 30 words",
    goal: "Prove the whole unit sticks.",
    newWordIds: [],
    reviewWordIds: [/* every word id in the unit's content lessons */],
    checkpoints: ["ko-to-meaning", "audio-to-meaning", "meaning-to-ko", "type-ko", "sentence-blank"],
    pass: { minFirstTryPct: 80, requireTypedAttempt: false } },
  // ...
];
```

Notes:
- `unlock.previousLessonId` disappears from lesson rows (unlock is derived
  from unit/section structure, §3.8). Keep `defineLesson`-style normalization
  in the generated file so every row is fully populated.
- Checkpoint lessons: `type: "checkpoint"`, empty `newWordIds`, new
  `reviewWordIds`. Runner treatment: **no study phase** — straight to
  checkpoint questions built over `reviewWordIds` with the same question
  builders; question mix per word: 1 recognition question per word
  (alternate ko→meaning / meaning→ko), audio-to-meaning for a random-free
  deterministic third of words (every 3rd by index), type-ko for every 5th,
  sentence-blank for up to 8 viable words. Pass = 80% first-try, no typed
  requirement (typing was proven in content lessons).
- `requireTypedAttempt` semantics are per-lesson-words; checkpoints set it
  false.

**Workload and checkpoint correction (binding):** “full practice” means every
new word receives card/audio exposure and one typed production attempt in the
study phase. It does **not** require every word to receive every retrieval
mode in one sitting. A content-lesson checkpoint is capped at 18 prompts:
one alternating recognition prompt per word, `ceil(N/2)` delayed typed prompts,
and up to 3 spaced context prompts. A unit checkpoint is a bounded 12-18
prompt mastery check; deterministic rotation records which review words have
been sampled so repeated attempts cover the full unit without a 30-70 question
wall. Wrong answers immediately seed targeted remediation/retry. Before P1-C
is accepted, an owner times an S1 lesson and a 30-word unit; neither may rely
on a hidden interaction count to meet the “manageable session” promise.

### 3.11 Progress migration (one-shot, version-gated)

In `migrateVocabState()` (`app.js:4306`), add:

```js
if ((state.vocabPlanVersion || 1) < 2) {
  const legacy = state.vocabLessonCompleted || [];
  state.vocabLessonCompletedLegacy = legacy;          // keep for forensics
  const creditedWordIds = getLegacyCompletedWordIds(legacy);
  state.vocabLessonCompleted = [];
  for (const lesson of getWordLessons()) {
    if (lesson.type === "content" && lesson.newWordIds.length &&
        lesson.newWordIds.every((id) => creditedWordIds.has(id))) {
      state.vocabLessonCompleted.push(lesson.id);
    }
  }
  state.vocabUnitMigrationCredit = getFullyCreditedUnitIds(); // ready to crown, not passed
  state.vocabLessonActive = null;
  state.vocabLessonSession = null;
  state.wordPathCategory = null;
  state.wordPathLevel = null;
  state.vocabPlanVersion = 2;
  saveState();
}
```

`getLegacyCompletedWordIds` reads a compact, generated v1 lesson-id-to-word-id
snapshot retained in the v2 plan. It uses completed legacy lesson ids, not the
overloaded `vocabSrs[id].seen`: the current app increments `seen` for failed
lessons, standalone quizzes, and Word Bank “add to review”. Checkpoints are
never auto-passed; a fully credited unit is labelled **ready to crown** and
requires its bounded checkpoint before it unlocks the next section.

Design points (the legacy `seen`-based rationale below is historical context;
the binding migration contract immediately above overrides it):
- **Word-seen inference, not an id map.** Because words move between lessons
  arbitrarily, inferring completion from `vocabSrs.seen` is strictly more
  accurate than an old-id→new-id table (`finishWordLesson` seeds SRS for
  every lesson word, so completed old lessons imply seen words). Checkpoints
  are inferred complete the same way — generous by design (owner decision 4).
- `vocabSrs` untouched. `vocabReviewEvents` untouched (stale lessonIds are
  analytics-only).
- No `HANAPATH_LESSON_MIGRATION` table needed in the plan file — but the
  generator's report (§3.6) must include the old→new lesson mapping for
  human reference.
- Completed counts must intersect with current lesson ids everywhere
  (`app.js:6844`, `app.js:6905` replaced by the new path renderer anyway).

### 3.12 Runner upgrades (lesson-size-aware drills + mid-lesson save)

**Drill cap scaling** (`buildWordLessonQuestions`, `app.js:5073`) — for
content lessons of N words:
- `ko-to-meaning`: all N (unchanged).
- `audio-to-meaning`: **all N** (was: first 2).
- `meaning-to-ko`: all N (unchanged).
- `type-ko`: **ceil(N/2)**, deterministic spread (every 2nd word by index;
  study phase already types all N — this is the delayed retrieval rep).
- `sentence-blank`: **min(6, viable words)** (was 3), spread across the
  lesson's viable words by index, not just the first ones.
- For N=10 that's ≈ 41 checkpoint questions + 20 study steps ≈ 12–15 min —
  accepted by owner decision 5. Question order: keep the existing
  fixed-by-type order (recognition → audio → production → typing → context).

**Mid-lesson save** — new `state.vocabLessonSession`:
- Define one versioned `serializeWordLessonView` / `rehydrateWordLessonView`
  contract, rather than a partial ad-hoc object. Persist and validate the
  lesson id, mode, steps, words, indexes, questions, results, typed attempts,
  typed value/feedback/done state, answered/selected/correct/feedback state,
  review-return state, timers, and `resultSaved`. Snapshot after start, every
  answer/input/tile/back/advance transition, and clear on result, explicit
  abandon, invalid restore, or v2 migration. This prevents a reload after an
  answer from recording the same SRS attempt twice.
- Serialize the whole session on every step/question advance:
  `{ lessonId, mode, stepIndex, questionIndex, questions, results,
  typedAttempts, reviewingCheckpoint }`. `questions` are already plain data
  (choices included) — persisting them freezes the generated distractors
  across reloads, which is the desired behavior.
- `openWordLesson(id, { resume: true })` restores from
  `state.vocabLessonSession` when `lessonId` matches; cleared in
  `finishWordLesson` and on explicit abandon (back-out confirm).
- Guard: on restore, validate the lesson still exists and every referenced
  word id still resolves; else drop the session silently.
- This PR (P1-A) is plan-schema-agnostic and ships **before** the
  restructure — it works with the current 298 lessons too.

### 3.13 Audit changes (v2) — same PR as the data change (P1-B)

`scripts/audit-words-data.mjs` gains, without weakening any existing word-row
check:
- Schema: sections/units globals exist; every lesson has a valid `unitId`;
  every unit a valid `sectionId`; every unit's `lessonIds` + `checkpointId`
  resolve; every content lesson appears in exactly one unit's `lessonIds`.
- Checkpoints: `type: "checkpoint"` ⇔ empty `newWordIds` + non-empty
  `reviewWordIds` ⊆ its unit's content-lesson words (exactly equal, in fact).
  The existing "empty newWordIds" hard error applies to content lessons only.
- Sizes: content lessons 8–12 words (**warning** outside; hard error <5 or
  >15) — grammar-track lessons exempt from the lower bound (§3.4); units 2–4
  content lessons (warning).
- Names: lesson-title section-scoped uniqueness (hard error); numeral/Roman-suffix
  ban (hard error); length caps (warning).
- Coverage: every curated word in exactly one content lesson (new hard
  occurrence-count check); no same-surface senses anywhere in a unit's review
  words (new hard error).
- Question viability: extend the existing per-checkpoint generation check to
  checkpoint lessons over `reviewWordIds`.
- Subtitle rule (`Learn N common words`) stays for any subtitle matching the
  pattern; generated subtitles simply won't use it.

**Audit clarifications (binding):** “exactly once” is a **new** hard
per-content-lesson occurrence-count check; the current audit only detects
unreferenced words. Apply it separately from checkpoint `reviewWordIds`.
The audit also hard-fails duplicate Korean surfaces across a whole unit,
validates every `contrastWith` resolver result, enforces section-scoped title
uniqueness, and regression-checks the v2 lock on append runs.

P1-C must use semantic helpers such as `getLessonStudyWordIds()` and
`getLessonReviewWordIds()` everywhere: list rows, counts, result copy, category
selection, continue copy, and the runner. A checkpoint's empty `newWordIds`
must never render as a misleading “0 words” lesson or break the interim flat
list. If the path UI is still a later PR, P1-C makes that interim list
checkpoint-aware before switching the data file.

### 3.14 Spec supersessions

This plan supersedes, for the Words section:
- Master spec §6.2 "5 to 7 new items" → **8–12 (target 10)** content items;
  checkpoint lessons 0 new items.
- The single linear unlock chain → §3.8 model.
- The flat lesson list → §3.9 path.
Everything else in `docs/VOCABULARY_TEACHING_SPEC.md` (Four Strands,
notice→retrieve→deploy, retrieval ≥ exposure, SRS design) still governs. P1-F
records these supersessions in the docs.

---

## 4. Phase 1 — execution queue (existing 2,028 words; zero new content)

> One box = one branch off `main` = one draft PR. Keep them in order — later
> boxes assume earlier ones merged. Model routing: **[coder]** = any strong
> coding model; **[author]** = strongest available writing model (names/copy);
> **[owner]** 🔒 = owner action.

- [x] **P1-0 — Curriculum reconciliation + owner sign-off** [coder + author + owner]
  Create the immutable v1 snapshot, resolve the five duplicate legacy
  placements, classify the mixed grammar/connective words, resolve/report all
  `contrastWith` links, and emit the exact S1/S2 preview plus the full
  section-track allocation manifest (§3.2A/§3.4A). Add a short timing
  prototype for a 10-word lesson and 30-word unit checkpoint. The owner
  approves the S1/S2 word membership, the workload budget, and the finite
  core-versus-elective boundary before v2 ids are generated.
  *Accept:* every current word has one documented v2 destination; all
  exceptions have a reason; the manifest passes a self-check; no ids or app
  files change.

- [x] **P1-A — Size-aware drills + mid-lesson save** [coder]
  Scale drill caps per §3.12; add `state.vocabLessonSession` save/resume;
  works against the CURRENT plan file (no data change). Touches `app.js`
  (+ `sw.js`/`index.html` cache bumps).
  *Accept:* a 7-word lesson gives every word card/audio + typed study exposure
  and no more than 18 checkpoint prompts; kill the tab after a typed or choice
  answer, reopen, and verify position, feedback, questions, and SRS attempts
  are identical (no double record); audits green; `node --check app.js`.

- [x] **P1-B — Curriculum v2 generator + data + audit v2** [coder + author]
  Build `scripts/generate_words_curriculum_v2.mjs` (§3.4–§3.6), commit the
  v1 snapshot, allocation manifest, and v2 lock (§3.2A/§3.5), author
  `scripts/curriculum_v2_names.json` (§3.7), regenerate
  `words_lesson_plan_v2.js` (v2 schema §3.10), extend
  `scripts/audit-words-data.mjs` (§3.13), commit
  `scripts/curriculum_v2_report.md`.
  **app.js is NOT touched; the app cannot load the v2 file yet — so this PR
  must NOT swap the loaded file.** Emit the v2 plan as
  `words_lesson_plan_v2.js` (not referenced by `index.html`); P1-C renames it
  into place. Audit runs against v2 via a `--plan v2` flag (or by detecting
  which file exists) — implementer's choice, document it in the PR.
  *Accept:* audit --strict green on BOTH old and v2 plan files; generator
  re-run is byte-identical; report and S1/S2 preview approved by owner; every
  §3.13 invariant demonstrably enforced (add a self-test that mutates a copy
  and expects failures).

- [x] **P1-C — App switchover: unlock model, checkpoint runner, migration**
  [coder]
  Swap `words_lesson_plan_v2.js` → `words_lesson_plan.js` (delete old).
  Implement §3.8 unlock derivation, §3.10 checkpoint-lesson runner path
  (skip study phase, `reviewWordIds` questions, 80% pass), §3.11 migration.
  Update the hard-coded references (§2.6): `getBasicWordLessons` (point the
  basics card at the S1 lesson ids), category-id fallback, and every
  checkpoint-aware count/copy callsite. Do **not** replace the Sentences
  `W0/W1/W2` gate with `s1`: keep an explicit 31-word early-access marker (or
  intentionally revise it with a separate approved sentence-gating change),
  because S1 contains 97 words. The interim flat list must render checkpoints
  correctly; UI replacement is P1-D.
  *Accept:* `TEST_UNLOCK_ALL_STAGES` false; fresh profile: S1 linear, S2
  locked until S1 crowned; migration fixtures cover completed, failed,
  review-only, partial-session, and mastered learners; Sentences early gating
  is unchanged unless separately approved; SRS intact, no console errors;
  audits + app-shell audit green; cache bumped.

- [x] **P1-D — Path UI** [coder]
  Implement §3.9: sections/units/lesson-nodes path replacing
  `wordPathLessonPanelHtml` + the lessons entry card; delete the Category/Level filter
  controls; new CSS in `styles.css`.
  *Accept:* browser smoke test per §7 checklist (path renders, collapse
  behavior, locked toasts, continue hero targets the highlighted node);
  mobile-width layout sane; cache bumped; `audit-app-shell` green.

- [x] **P1-E — Polish pass** [coder + author]
  Unit emoji set finalized; per-unit "n due" chip (optional per §3.9); result
  screen crowning animation/copy for checkpoints; empty states; copy review
  of all goals/subtitles in context.
  *Accept:* owner eyeballs the path end-to-end; no audit regressions.

- [x] **P1-F — Docs + protection re-lock** [coder]
  Update `CLAUDE.md` (Words section status: restructured under this plan;
  point here), `HANDOVER.md`, spec supersession notes (§3.14) in
  `docs/VOCABULARY_TEACHING_SPEC.md` + `docs/WORDS_SECTION_MASTER_SPEC.md`
  (addendum sections, don't rewrite history), archive note for the old plan
  structure.
  *Accept:* a cold-start agent reading CLAUDE.md lands in this doc.

- [x] 🔒 **P1-G — Owner acceptance** [owner]
  Play through S1 + one S2 unit on a real device; confirm migration on your
  live profile (export/back up `localStorage` first!); confirm session length
  feels right; then declare Phase 1 closed here with a dated note.

---

## 5. Phase 2 — expansion pipeline (toward 20k+ words)

### 5.0 Honest sizing

The 5k+15k CSVs hold ~19.7k rows, but they are **un-lemmatized frequency
tokens**: particles, conjugated stems, romanization artifacts, and duplicates
of curated words. After lemma-filtering, expect the real teachable pool to be
roughly **10–14k new lexical items**. At the batch cadence below (~200 words
per batch PR), full coverage is **~50–70 batch PRs** — a long-running
background pipeline, by design. Track progress in the ledger (§5.4), not by
gut feel.

### 5.0A Product boundary: finite core, elective expansion

S1-S8 are the finite required core. “Account for all source rows” does **not**
mean a learner must pass 50-70 more serial sections. After the core, published
content is organised as optional level/topic packs (for example Travel,
Living, Study, Work, Hobbies) with independent unit progress and no gate back
onto S1-S8. A pack is published only once it has 6-12 coherent units; a 200
word import batch may feed a draft pack and the Word Bank before that pack is
published. Never add a unit to a crowned required section, because that could
revoke completed progression.

The ledger reports separately: raw source rows accounted for; qualified
lemmas; curated senses; taught core words; taught elective words; and
deferred/excluded/merged rows. “20k+” is source-row coverage, not a promise
that every raw token is a distinct teachable lesson item.

### 5.1 P2-0 — Pipeline tooling (one PR) [coder]

- [x] Build `scripts/words_expansion/` :
  1. **`build_candidate_queue.mjs`** — merge 5k+15k CSVs; drop rows whose
     surface matches any curated `korean`/`display`/inflected form (reuse
     `words_inflect.js` offline); drop non-lexical tokens (particle/ending
     heuristics + a committed exclusion list reviewed by a strong model);
     collapse obvious conjugates onto one lemma (heuristic + manual review
     flags); emit `candidate_queue.json`: `[{ surface, rank, band, guessedPos,
     flags }]` sorted by rank. Committed and regenerated per batch.
  2. **`author_batch_template.md`** — the authoring contract for the LLM:
     input = next K candidates; output = full curated-row dicts (same shape
     `generate_m5_data.py` consumes: korean, pos, meaning, meaningShort,
     pronunciation, exampleKo/En, usageNote, origin annotations, **track
     assignment** from §3.3, scenario-grouping hints) + explicit rules: no
     invented senses (fake-polysemy defense), no duplicate glosses vs
     existing bank, examples must be beginner-parseable, register defaults
     to everyday/polite.
  3. **`import_batch.mjs`** — import schema-validated rows through a tested
     Node adapter, extend an unpublished/published elective pack per §5.0A,
     run append-only generator mode and lock regression, then perform the
     final audio/cache sequence. Do not copy the brittle interpolation or
     hard-coded version assumptions from `generate_m5_data.py`.
  4. **`batch_qa_checklist.md`** — per-batch gates (§5.2 step 5).
  *Accept:* dry-run batch of 20 words flows end-to-end on a branch (with
  placeholder audio allowlisted ONLY in the dry run); audits green.

The original queue/import outline above is pre-hardening background; the
binding requirements below override it where they conflict.

**Required P2-0 additions:**
- `candidate_decisions.jsonl` is immutable history, not a regenerated queue:
  source-file hash + row key, normalized surface, canonical lemma, rank,
  status (`accepted`, `covered`, `merged`, `inflected`, `deferred`,
  `rejected`, `needs-sense-review`), parent id, and a human-readable reason.
  Matching a curated surface is a review signal, not an automatic drop: the
  core has real multi-sense lemmas.
- Qualify/classify candidates before selecting a release pack. The raw top
  ranks include particles, endings, inflections, and ambiguous short forms.
  Only then assemble 8-12 word scenario lessons with an explicit
  communicative function, prerequisites, controlled-vocabulary example rule,
  and word-inclusion rationale.
- Author machine-readable JSON/JSONL validated against a schema, never LLM
  JavaScript snippets. Each row carries a stable id, `lessonGroup`, consumer
  `track`, raw rank/band, source provenance, canonical-lemma relationship, and
  every existing required annotation. `track` never substitutes for the
  form-drill `lessonGroup`.
- Supply tested Node adapters for `words_inflect.js` and core-row validation;
  do not assume browser globals/private inference helpers can be imported by
  an `.mjs` script.
- Before scale, add deterministic/schema-aware audio extraction (only spoken
  fields, sorted text/map output), a final audio run **before** cache version
  changes, and a missing-key report covering word, form, and example text.
- Add a storage/performance budget. The current eager curated file is ~1.15 MB
  and a realistic 10k-word SRS state is ~5.5 MiB in one `localStorage` blob;
  the current audio corpus is ~141 MB and same-origin audio runtime caching is
  unbounded. Benchmark a low-end/mobile load and offline cache, then decide
  whether to compact state/use IndexedDB and cap or explicitly budget audio
  caching before any large batch ships.

### 5.2 The batch loop (repeating PR recipe)

Each batch = one PR, ~200 words → ~20 lessons → ~6–7 units:

1. **Qualify + select** [coder + author]: classify the next candidate range,
   persist every disposition, then select an owner-reviewable themed pack from
   qualified lemmas. “Top 200 raw rows” is never itself a lesson list.
2. **Author** [author — strongest model]: fill the authoring contract.
   Cross-check every gloss against the existing bank for duplicate meanings
   (the audit's Jaccard check is the backstop, not the primary defense).
3. **Import** [coder]: `import_batch.mjs`; run the curriculum generator;
   regenerate names manifest entries for new units (§3.7 rules).
4. 🔒 **Audio** [owner]: run the schema-aware audio generation for every new
   spoken field, inspect the missing-key report, then make the final cache and
   `audio_map.js` version bump. Never hand-edit `audio_map.js`.
5. **QA gates**: `audit-words-data.mjs --strict` green; `node --check` on
   touched JS; deterministic semantic sampling plus independent review of all
   high-risk forms/function words/homographs/proper nouns; source evidence per
   accepted sense; a blocking error threshold; verify no new lesson dips under
   8 words; browser smoke: play one new lesson. A discovered content mistake
   uses an additive deprecation/replacement policy — never reuses its id.
6. **Ledger** (§5.4) updated in the same PR.

### 5.3 Where new words land in the path

- New units do not alter the finite S1-S8 core. They accumulate in draft
  elective packs and publish only under the §5.0A rules.
- Never insert words into existing (frozen) lessons/units. Never renumber.
- A batch that creates a new track (taxonomy §3.3 can grow) must add the
  track to the mapping table here in the same PR.

**Expansion placement correction (binding):** The preceding “one new S9/S10
per batch” wording is superseded by §5.0A. Core v2 objects are immutable. An
append batch either (a) contributes rows and draft units to an unpublished
elective pack, or (b) publishes a complete optional pack with its own frozen
ids. Generator append mode must prove every previously locked section, unit,
lesson, name, and word membership is byte-identical. It may not re-sort core
words merely because a newly curated candidate has a high raw rank.

### 5.4 Progress ledger

- [x] Create `docs/WORDS_EXPANSION_LEDGER.md` in P2-0: a table of batch PRs —
  date, source-range/hash, disposition counts, qualified lemmas, words/senses
  added, cumulative curated count, draft/published pack, audio run/cache
  confirmation, and independent-review result. The scorecard-was-wrong-four-
  times lesson applies: **every claim must be re-derivable from the core data,
  lockfile, and candidate-decision ledger**.

---

## 6. Invariants & never-do list (all phases)

1. Vanilla/static: no framework, no build step, no package.json.
2. Word row `id`s frozen forever; from P1-C, lesson/unit/section ids frozen too.
3. Never rewrite `word.lessonGroup` (form-drill selection depends on it).
4. Never hand-edit `audio_map.js`; new Korean text ⇒ owner audio run.
5. Every PR: audits green (`audit-words-data.mjs --strict`,
   `audit-alphabet-audio.mjs --strict`, `audit-app-shell.mjs` when shell
   touched), `node --check` on touched JS, cache bumps when loaded files
   change.
6. Alphabet section untouched; Sentences section untouched except the §2.6
   integration points; legacy band quiz view untouched.
7. `TEST_UNLOCK_ALL_STAGES` ships `false` from P1-C onward; normal gate tests
   never run under the override.
8. `TEST_ENABLE_WORD_SECTION_COMPLETION` is a separate local test control. It
   must be set to `false` before learner-facing release; when enabled, its
   section button may crown test data but must not be treated as learner
   acceptance evidence.
9. Additive schema changes only; a v1 saved state must always load (the
   migration handles it — never require a manual reset).
10. No batch may weaken an audit check to get itself green.
11. Re-derive counts from data files before relying on any scorecard/ledger
    claim (the Words scorecard was wrong 4 times historically).
12. After v2 ships, the curriculum lock is append-only: no PR may change a
    shipped id, word membership, name, or required-core progression rule.
13. Before Phase 2 scale, meet the committed low-end/mobile parse, PWA cache,
    and persisted-state budgets. A silent `localStorage` quota failure is a
    release blocker, not a graceful fallback.

---

## 7. Verification playbook (run per PR)

```
node --check app.js                        # + any other touched JS
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs           # if index.html / sw.js / versions touched
python -m http.server 8000                 # then browser smoke:
```
Browser smoke checklist (cold learner, fresh profile in a private window +
your real profile):
1. Words home renders; continue hero targets the expected lesson.
2. Open the path: sections/units render, locked things toast, completed
   units collapse.
3. Play one full lesson: study steps → bounded checkpoint → result; every word
   got audio + typing exposure; mid-lesson reload immediately after an answer
   resumes exactly without a duplicate SRS event.
4. Play one checkpoint: no study phase, bounded rotating mastery check, 80%
   gate, wrong-answer remediation, crown lands on the unit.
5. localStorage `hanapath-v1`: `vocabPlanVersion: 2`, `vocabLessonCompleted`
   only contains current ids, `vocabSrs` untouched.
6. Console: zero errors.
7. Run scripted migration fixtures for completed, failed, review-only,
   partial-session, and mastered v1 profiles; content credit must be exact and
   checkpoints must remain uncrowned.
8. For P2, run lock regression, candidate-ledger reconciliation, schema/audio
   extraction tests, and the approved storage/performance budget test.

---

## 8. Open items (owner-gated) 🔒

| Item | Needed by | Note |
|---|---|---|
| Approve unit emoji set | P1-E | Approved in P1-G close-out |
| Approve S1/S2 allocation + workload prototype | P1-0 | Approved in P1-G close-out |
| Decide whether all 97 S1 words gate S2 | P1-0 | Approved in P1-G close-out |
| Approve core versus elective-pack boundary | P1-0 | Approved in P1-G close-out; S1-S8 remain finite core |
| Live-profile migration test | P1-G | Confirmed in owner acceptance; preserve the backup with the live profile |
| Audio runs per Phase 2 batch | every P2 batch | `python generate_assets.py` |
| Decide fate of legacy band quiz view | post-Phase 1 | Untouched by this plan; consider folding into path later |
| Approve any change to Sentences early gate | separate review | Keep the current 31-word marker by default; S1's 97 words are not behavior-equivalent |

---

## 9. Appendix

### 9.1 Current lessonGroup census (2026-07-09)

feelings-descriptions 317 · core-actions 192 · travel-city 184 ·
study-school 156 · time-daily 123 · occupations 100 · weather-nature 98 ·
shopping-money 96 · daily-objects-tech 90 · family-people 83 · food-drink 71 ·
body-health 67 · places-movement 63 · hobbies-leisure 54 · home-routine 53 ·
sports 41 · survival-core 38 · clothing 34 · post-hangul-bridge 26 ·
connectives 22 · animals 19 · question-words 13 · body-parts 12 · colors 12 ·
people-pronouns 10 · things-demonstratives 10 · function-words-1 10 ·
irregular-families 10 · honorifics 7 · endings-register 6 ·
noun-modification 6 · tense-negation 5. **Total 2,028.**

Other axes: difficulty {1: 1966, 2: 25, 3: 18, 4: 19} (flat — do not use for
sequencing); pos: noun 1541, verb 200, adverb 78, adjective 69, numeral 27,
particle 22, pronoun 20, ending 19, counter 18, determiner 12, phrase 9,
proper noun 7, interjection 3, conjunction 3; priority: core 2028.

### 9.2 Key code reference index

| What | Where |
|---|---|
| Lesson list panel (replaced in P1-D) | `wordPathLessonPanelHtml` `app.js:6839`; row `app.js:6678`; meta `app.js:6800` |
| Words home cards | `wordsHomeContentHtml` `app.js:7072`; subsection router `app.js:6965` |
| Unlock (rewritten P1-C) | `isWordLessonUnlocked` `app.js:5054`; next lesson `app.js:5062`; test flag `app.js:2856` |
| Runner | init `app.js:5107`; questions `app.js:5073` (caps ~5082/5085/5094); volatile view `app.js:4280`; render `app.js:5280`; bindings `app.js:5767` |
| Question builders / distractors | `app.js:4745-4757`; sentence-blank `app.js:4772-4822`; form drills by lessonGroup `app.js:4980-4986`, `app.js:5013-5022` |
| Migration hook | `migrateVocabState` `app.js:4306`; precedents `app.js:2895`, `app.js:2906-2915` |
| Hard-coded ids to update | basics `app.js:6664-6676`; Sentences stage strings `app.js:14184`, `app.js:14218`; category fallback `app.js:6646` |
| Audit | `scripts/audit-words-data.mjs` (subtitle rule 292-295; thin lessons 296-299; unlock 302-304; checkpoint viability 308-387; form-drill mirror 354-359; audio 447-481) |
| Bulk-import template | `scripts/generate_m5_data.py` (insert 726-777; lessons 829-859; cache bumps 864-884) |
| 5k join logic | `buildWordReferenceRows` `app.js:4338-4367` |
| Supplementary loader | `app.js:3198`, `app.js:3376-3413` |

*Line numbers verified 2026-07-09 against `main` @ `b74c9076`; re-grep before
relying on them — app.js shifts.*
