# Sentences Curriculum v2 — Restructure Plan & Execution Queue

> **Status:** Owner-approved plan, written 2026-07-10. This document defines the
> restructure of the **Sentence Studio** lesson experience into the same
> Duolingo-style path the Words section shipped in Words Curriculum v2,
> without touching the Words section.
>
> **Owner supersession — 2026-07-11:** the path keeps the evidence-based
> learning methods associated with intensive Korean study, but the learner UI
> is no longer K-pop- or trainee-themed. Use plain, descriptive curriculum
> names and the Words lesson-player language. This supersedes the surface-copy
> parts of decisions 3, 8, and 9 and §§3.0, 3.3, 3.7, and 3.10; it does not
> change the bank, topology, progression, drill mix, or SRS contract.
>
> **Audience:** a highly capable coding model executing this plan PR by PR.
> Read §1 (locked decisions), §2 (verified current state), §3 (target design),
> then take the next unchecked box in §4/§5. One box = one branch off `main`.
>
> **Relationship to other docs:**
> - `docs/SENTENCES_TEACHING_SPEC.md` stays the pedagogy north star; this plan
>   supersedes only the *lesson-list/hub structure* pieces (see §3.14).
> - `docs/SENTENCES_FINAL_ROADMAP.md` remains the historical record of the v1
>   Sentence Studio build; its only open track (H, authored expansion) is
>   re-anchored by §5 of this plan. B3/Track-I leftovers are carried in §8.
> - `docs/WORDS_CURRICULUM_V2_PLAN.md` is the sibling precedent — this plan
>   deliberately mirrors its shape and steals its shipped machinery patterns.
>
> Function names and behaviors in this doc were verified 2026-07-10 against
> `main` (hardened same day after a 3-critic adversarial review @ `2a769a02`).
> `main` is moving quickly (parallel agents) and app.js line numbers drift —
> **re-grep by function name; treat line numbers as approximate.**

---

## 0. The problem being solved

The Sentence Studio hub today shows stats, band chips, six mode cards, and a
**flat sequential list of 12 pattern lessons** covering only **69 unique
sentences out of a 2,060-row bank**. The Words section just shipped a
sections → units → lessons path with checkpoints, scenario names, and a
polished lesson-card design language. The owner wants the same "easy flow" for
Sentences.

Target: a **Duolingo-style sentence path** that mirrors the Words v2 topology
unit-for-unit ("learn the words, then speak them"), covering **all 2,060 bank
sentences** in ~5–7-sentence, plainly named lessons with unit checks — while keeping the Sentence
Studio's own identity (Translate & Type flagship, helper ladder, SRS,
shadowing, free drill modes).

---

## 1. Locked decisions

Decisions 1–8 were made by the owner for Words v2 (2026-07-09) and are
**carried over** here with sentence-specific adaptation noted. Decision 9–10
are from the owner's 2026-07-10 instruction for this plan.

| # | Decision | Sentences adaptation |
|---|----------|----------------------|
| 1 | Phased scope | Phase 1 restructures the existing 2,060-row bank into the path now (zero new content, zero audio). Phase 2 re-anchors the owner-gated Track H authored expansion (§5). |
| 2 | Duolingo-style path | Sections → units → lesson nodes replaces the hub's flat lesson list. Free drill modes and review stay, below the path (§3.9). |
| 3 | Scenario names | Lesson names are concrete K-pop-trainee-life scenarios; units inherit their twin Words unit theme; sections carry the trainee-journey arc (§3.7). No "Pattern 3"-style names, no numeral suffixes. |
| 4 | Preserve progress via migration | One-shot `sentencesPlanVersion` gate. Per-sentence SRS is keyed by frozen bank ids and untouched. The 12 legacy lesson completions are credited by inference (§3.11). |
| 5 | Full practice + mid-session save | Lessons get a listen/shadow study pass before graded production, and a serialized resumable session (`state.sentenceLessonSession`), copying the shipped Words precedent (§3.10, §3.12). |
| 6 | Relevance ordering | Inherited structurally: sentences slot into the Words v2 topology via `focusWordIds`, so the Words frequency+usefulness ordering carries over for free (§3.2). Within a unit, band then bank order sorts lessons easy→hard. |
| 7 | Linear units, parallel categories | Lessons inside a unit unlock in order; units unlock independently the moment their words are met — the frontier naturally tracks the Words path (§3.8). |
| 8 | Checkpoint per unit | Every sentence unit ends with a "stage rehearsal" checkpoint over the unit's sentences; passing crowns it (§3.10). Bounded 12–18 prompts — do NOT repeat the Words checkpoint overshoot (§9.3). |
| 9 | **Stay K-pop-true** | Owner 2026-07-10: *"we built it around how foreign kpop stars learn korean, so don't stray too far away from that."* §3.0 is the fidelity contract. |
| 10 | **Do not change the Words section** | Owner 2026-07-10. §6 has the explicit do-not-touch list; reuse is by *parallel new code* + shared CSS + read-only calls into existing helpers. |
| 11 | **Methods, not K-pop theming** | Owner 2026-07-11. Keep retrieval, spacing, shadowing, guided production, and the Words-aligned path. Replace trainee/idol scenario copy with plain learning labels. |

---

## 2. Verified current state (re-derived 2026-07-10 — re-verify before your PR; scorecards here have been wrong before)

### 2.1 The bank (untouched by this plan)

- `sentences_core.js` → `window.HANAPATH_SENTENCES`: **2,060 rows**, ids
  `s0001`–`s2060` (**frozen**), generated by `scripts/build-sentence-bank.mjs`.
  Fields per row: `id, korean, english, voiceText, tokens, band, patternTags,
  focusWordIds, sourceWordIds, speechLevel, register, source, grammarTip,
  acceptAlso, annotationSource`.
- Bands 1–5: **471 / 283 / 304 / 395 / 607**. Source: words-core 2,007 +
  legacy-app 53. Register: 1,979 everyday / 64 polite / 7 formal / 10
  honorific. `grammarTip` and `acceptAlso` are empty on **all** rows.
- 37 closed pattern tags. Thin tags (exact): `copula-negative-anieyo`=1,
  `propositive-eyo`=4, `only-man`=4, `from-buteo`=5, `but-jiman`=6,
  `until-kkaji`=7, `neg-mot`=7, `future-geoyeyo`=12. Fat tags:
  `object-eul-reul`=1129, `present-polite`=991, `subject-i-ga`=832,
  `past-polite`=670.
- **Audio: 100%** — all 2,060 `voiceText` strings resolve in `AUDIO_MAP`.
  Phase 1 needs zero audio work.

### 2.2 The current lesson layer (what gets replaced)

- `sentences_lesson_plan.js` → `window.HANAPATH_SENTENCE_LESSONS`: flat array
  of exactly **12 lessons** `{id, title, concept, patternTags,
  sentenceIds[6]}` (ids `s0-topic-subject` … `s11-existence-copula`), 72
  slots / 69 unique rows (`s0002`, `s0030`, `s0043` appear twice — row reuse
  is currently legal).
- Hub: `sentenceStudioHubHtml` (`app.js:15124`) — stats, band chips, mode
  cards, flat sequential lesson list; entry `renderPracticeView`
  (`app.js:15642`) into `#screen-speak`; lesson intro
  `sentenceLessonIntroHtml` (`app.js:15314`).
- Lesson session: the 6 rows in file order, alternating `translate`/`build`
  by index parity (`sentenceQuestionMode`, `app.js:14957`); free modes use
  `pickSentenceSessionRows` (`app.js:14655`, due → unseen capped by
  `newPerDay` → seen-not-due) with `SENTENCE_SESSION_LENGTH = 5`.
- Pass: hardcoded `Math.ceil(rows.length * 0.67)` (`app.js:15105`) — i.e. **5
  of 6** for today's lessons; completion pushes the lesson id once; no
  first-try tracking, no crowning, no typed-attempt requirement.
- Unlock: strictly sequential array order (`isSentenceLessonUnlocked`,
  `app.js:14895`; honors `TEST_UNLOCK_ALL_STAGES` at 14897/14906). Section
  entry gated on K2 (`isStudioUnlocked` `app.js:3143`; K2 = alphabet complete
  + 20 correct answers, `getUnlockedLevelFromProgress` `app.js:3080`).

### 2.3 Sentence Studio engine (kept, extended)

- Six modes (`SENTENCE_MODES`, `app.js:14332`): `translate` (flagship
  Translate & Type), `build`, `listen` (dictation), `shadow`, `transform`
  (band ≥3, uses `HANAPATH_INFLECT`), `mixed`.
- Translate & Type helper ladder: Tip → Word bank → Next chunk → Reveal
  (`useSentenceHelper` `app.js:15746`, `sentenceHelperLadderHtml`
  `app.js:15424`); tips from `PATTERN_TAG_INFO` (`app.js:14347`) keyed by
  `patternTags`; helper use blocks SRS box promotion. Answer checking:
  `checkSentenceAnswer` (`app.js:14718`) via
  `normalizeKoreanAnswer({ignoreSpaces:true})` vs `korean` + `acceptAlso`;
  LCS token diff on miss (`sentenceTokenDiffHtml`, `app.js:14727`).
  (B3 "real positional alignment" remains an open `EXTENSION` — §8.)
- SRS: `recordSentenceResult` (`app.js:15006`) — Leitner over the shared
  `VOCAB_SRS_INTERVALS`; every lesson/free-mode answer writes the same
  per-sentence record. **This engine is untouched by the restructure.**
- The Studio was deliberately rebuilt 2026-07-06 as **its own subsystem**
  (owner: the old version was "too similar and boiler-heavy"). Do not
  resurrect the shared quiz-engine pattern; extend at the labelled
  `EXTENSION (roadmap <box>)` markers.

### 2.4 Persistence

`localStorage['hanapath-v1']` → `state.sentencesProgress`, normalized lazily
by `getSentencesProgress` (`app.js:14412`):
`{ band, results, sessionsDone, newPerDay (5), completedLessons[],
reviewEvents[] (capped 5000) }`.
- `results` keyed by **frozen sentence ids** → fully restructure-proof.
- `completedLessons` (flat lesson-id array) is consumed in exactly 4 places:
  normalize (`app.js:14430`), sequential unlock (`app.js:14904`), completion
  push (`app.js:15097`), hub render (`app.js:15228/15238/15305`). That is the
  entire blast radius of lesson-id changes.
- `reviewEvents[].lessonId` is analytics-only; stale ids are harmless.
- **No mid-session persistence exists**: `sentenceStudioSession` /
  `sentenceLessonView` are module-level `let`s (`app.js:14397`) — nothing to
  migrate, resume is a pure addition.

### 2.5 Words integration points (read-only for us)

- `getMetWords` (`app.js:14520`) = word ids from completed Words lessons
  (via `getWordLessonReviewWordIds`) ∪ `state.vocabSrs` keys.
- `isSentenceAvailable` (`app.js:14545`) requires ALL `focusWordIds` met,
  with a band-1 exemption for legacy w0–w2 early words
  (`getSentenceEarlyWordIds` `app.js:14539`, rebuilt from
  `HANAPATH_WORD_V1_SNAPSHOT`). Cold-start ceiling: only **39 band-1 rows**
  are reachable with zero Words progress — the path fixes this properly by
  gating on the Words path itself (§3.8); the exemption stays for free modes.

### 2.6 The Words v2 machinery available to mirror (read, never modify)

Shipped on `main` and verified working:
- Topology: `HANAPATH_WORD_SECTIONS` (8 sections `s1`–`s8`),
  `HANAPATH_WORD_UNITS` (**75 units**, `prerequisiteUnitId` chaining),
  `HANAPATH_WORD_LESSONS` (283 = 208 content + 75 checkpoints), ids like
  `s2-food-u1-l2` / `s2-food-u1-cp`, frozen by
  `scripts/curriculum_v2_lock.json`; plus `HANAPATH_WORD_V1_SNAPSHOT`.
- Derived unlock: `isWordSectionUnlocked` (`app.js:4402`),
  `isWordUnitUnlocked` (4431), `isWordUnitCrowned` (4401),
  feature-detect `isWordCurriculumV2` (4386), semantic helpers
  `getWordLessonStudyWordIds`/`getWordLessonReviewWordIds` (4394/4395).
- Migration precedent: `migrateVocabState` (`app.js:4443`) — version gate,
  legacy-coverage credit, `vocabLessonCompletedLegacy` stash.
- Session persistence precedent: `serializeWordLessonView` (4286) /
  `rehydrateWordLessonView` (4316, validate-or-drop) /
  `persistWordLessonSession` (4353), resume via `openWordLesson(id,
  {resume:true})` (5319).
- Path UI: `wordPathV2Html` (7124), `wordPathV2UnitHtml` (7146),
  `bindWordPathUnitToggles` (7173); CSS `.vocab-path-*`
  (`styles.css:3696-3812`).
- Audit v2 pattern: `scripts/audit-words-data.mjs` auto-detects plan shape
  (line 32) and checks referential integrity, checkpoint equality, name
  rules, size bands.
- Test controls: `TEST_UNLOCK_ALL_STAGES` (`app.js:2856`, false),
  `TEST_ENABLE_WORD_SECTION_COMPLETION` (2860, currently true),
  `completeWordSectionForTesting` (4410).

### 2.7 The decisive data fact: the bank maps cleanly onto the Words topology

Computed 2026-07-10 against live data (the generator re-derives and the audit
re-checks all of this):
- Every `focusWordId` in all 2,060 rows resolves to exactly one Words v2 unit
  (**0 unmappable**; each word appears in exactly one unit). Define **path
  order** = **array index in `HANAPATH_WORD_UNITS`** (verified
  section-monotonic; do NOT use `unit.order`, which restarts per track and
  has only 11 distinct values). A row's **gating unit** = the unit with the
  **max array index** among its focus words' units — deterministic, total,
  and by construction satisfying the §3.13 cumulative-subset check.
- **2,018/2,060 (98%)** rows have all focus words inside a single unit; 40
  span two units, 2 span three — the gating-unit rule handles all of them.
- **Every one of the 75 Words units has sentences**: median 30, max 41
  (`s1-firstwords-u1`), min 7 (`s2-grammar-u1`; next thinnest 12
  (`s3-grammar-u2`) and 15 (`s5-grammar-u3`)).
- Per-section row counts: s1=115 (bands 1–3 only), s2=322, s3=315, s4=283,
  s5=258, s6=255, s7=263, s8=249 — difficulty (band 4–5 share) rises
  naturally along the path.

### 2.8 Audit constraints

- `scripts/audit-sentences-data.mjs --strict` validates the **bank only**
  (never reads the lesson plan) — unchanged by this plan.
- `scripts/audit-sentences-foundation.mjs` is the ONLY lesson-plan validator
  and **hard-codes 12 lessons × 6 sentences** (lines 17–18, enforced 62–69)
  plus a per-row tag-match rule. **It breaks on any restructure and must be
  rewritten in the same PR as the data change** (§3.13). It is also the named
  Gemini guard rail (`docs/SENTENCES_FINAL_ROADMAP.md:452,475-476`) and cited
  in `README.md:36` — update those references.
- Cache-bump surface: `sentences_lesson_plan.js?v=20260707b`,
  `sentences_core.js?v=20260707i` pinned at `index.html:27-28` AND
  `sw.js:13-14`; `CACHE_NAME` was `hanapath-shell-v303` at time of writing —
  **read `sw.js` before bumping, it moves fast**; plus `app.js`/`styles.css`
  `?v=` strings.

---

## 3. Target design

### 3.0 The K-pop-trainee fidelity contract (decision 9 — read first)

The section was designed from research on how foreign K-pop idols actually
learn Korean (`docs/SENTENCES_TEACHING_SPEC_SOURCE.md` — "K-pop-Informed
Korean Learning System", case studies mapped to product principles). The
restructure must **strengthen, not dilute**, each of these:

| Trainee-model principle | Where it lives in v2 |
|---|---|
| Daily forced use / retrieval first | Translate & Type stays the flagship drill and the majority mode in every content lesson and checkpoint (§3.10). |
| Shadowing & pronunciation pressure | Every content lesson opens with a listen-and-shadow pass over its sentences — the study phase IS shadowing (§3.10). Shadow free mode stays. |
| Chunks before free production | Helper ladder (Tip → Word bank → Next chunk → Reveal) unchanged, available on every translate prompt. Build drills keep token-chunk assembly. |
| i+1 comprehensibility | **Strengthened**: sentence units unlock only when their focus words are met via the Words curriculum — the twin-topology makes i+1 structural (§3.8). |
| Spacing beats massing | Per-sentence Leitner SRS untouched; every lesson/checkpoint answer still writes SRS; hub still leads with due reviews (§3.9). |
| Survival-first content & register | Polite-informal 해요체 spoken Korean; the trainee-life situations (practice room, schedules, fan greetings, backstage, interviews, encouragement) become the **naming and framing layer** of the whole path (§3.7). |

Hard limits carried from the spec (line 57) and roadmap Track H2:
- **No verbatim lyrics or subtitles, ever** (copyright — already rejected).
- K-pop flavor = *situations and copy*, not brands: **no real idol, group,
  company, platform, TV-show, or award-show names** in learner-facing
  strings (generic nouns — fan-sign, music show, award show, live stream —
  are the intended register).
- Bands measure sentence complexity, NOT politeness register (the rejected
  Gemini band sweep is precedent).

**Consciously not carried over** (so future agents don't "fix" it ad hoc):
diary/free writing (no grader in a static app — Translate & Type is the
production surface); peer scaffolding/social correction (single-player app —
encouragement lives in copy); continuous drama/media input (the
copyright-rejected mining arm — dictation + shadow are the listening
surface); scored/recorded pronunciation stays in the free **Shadow** mode
(SpeechRecognition stub) rather than the lesson Phase A, which is
repeat-aloud only.

### 3.1 Terminology & hierarchy

```
Sentence path (inside Sentence Studio)
└── Section   — trainee-journey band, twin of a Words section (8 total)
    └── Unit  — twin of one Words unit: 1–6 content lessons + 1 checkpoint
        └── Lesson     — 5–7 sentences, K-pop-scenario name
        └── Checkpoint — "stage rehearsal" over the unit's sentences, 0 new rows
```

Phase 1 magnitudes: 2,060 rows under §3.4 even packing ≈ **~331 content
lessons + 75 checkpoints across 75 units and 8 sections**. Exact numbers
come from the generator; the audit enforces invariants, not totals.

### 3.2 The twin topology (the core structural move)

The sentence path **mirrors the shipped Words v2 skeleton unit-for-unit**:

- One sentence unit per Words unit (75), in the same section/order.
- A sentence row belongs to the unit that is its **gating unit** (§2.7):
  the focus-word unit with the highest `HANAPATH_WORD_UNITS` array index.
  Deterministic, total (0 unmapped), and 98% of rows land with all their
  words in that single unit. Exception: 4 rows in 3 units (`s0045`,
  `s2021`, `s2041`, `s2045`) depend on a **parallel same-section track**;
  the generator reassigns each of these to its earlier co-unit so that
  every unit's words are covered by twin + ancestors + prior sections
  (audit-checked as a warning).
- Product story: *finish a Words unit → its sentences open in the Studio —
  "you learned the words; now say the lines."*
- Words ordering (frequency + usefulness, decision 6) is inherited
  structurally — no separate sentence-relevance scoring needed.

This mirrors, it does not couple: the sentence plan file stores the twin
relationship as data (`twinUnitId`), and the app reads Words state through
the existing public helpers (`getMetWords`, `isWordUnitCrowned`) only. No
Words code changes.

### 3.3 Sections — the trainee journey arc

Sections twin the Words sections but carry the K-pop-career overlay in their
names and intro copy:

| Sentence section | Twin | Name | Flavor (intro copy angle) |
|---|---|---|---|
| `sn1` | s1 First Words | **Trainee Orientation** | First day at the company: greet, thank, apologise, survive. |
| `sn2` | s2 Daily Life | **Practice Room Days** | Daily routine, food runs, the grind. |
| `sn3` | s3 Out and About | **On Schedule** | The van, the city, shops, weather — moving between schedules. |
| `sn4` | s4 People & Plans | **Backstage Family** | Members, managers, staff; making plans, checking on people. |
| `sn5` | s5 Getting Things Done | **Comeback Prep** | Tasks, requests, honorifics for seniors and staff. |
| `sn6` | s6 Wider World | **Promo Season** | Travel, nature, wider topics between broadcasts. |
| `sn7` | s7 Depth & Nuance | **Variety Night** | Reactions, contrast, nuance — surviving a variety show. |
| `sn8` | s8 Finishing the Core | **World Tour** | The full range; long sentences, all registers. |

Unit names inherit the twin Words unit theme (e.g. `Café & Restaurant`) so
the learner sees the connection; the **lesson names** carry the trainee-life
scenarios (§3.7). Section names above are final unless the owner edits them
in the name manifest.

### 3.4 Row → lesson assignment algorithm (generator spec)

Within each unit (deterministic, no randomness):

1. Collect the unit's rows (gating-unit rule). Sort by `band` ascending,
   then bank id ascending.
2. **Even packing** (naive chunk-of-6 is infeasible — 25 of 75 units leave a
   2–4-row remainder): `k = ceil(n/7)` lessons (a unit with ≤7 rows becomes
   one lesson); lesson sizes are `floor(n/k)` and `ceil(n/k)`. Verified
   feasible against live data for every unit: all sizes land in 5–7, no
   unit exceeds 6 content lessons (max 41 rows → 7,7,7,7,7,6). Thin grammar
   units: 7→1, 12→2, 15→3 lessons — kept whole, NOT merged across units, to
   preserve the twin mapping.
3. Constraint repair (swap between adjacent lessons in the same unit):
   - No two rows with identical `korean` text in one lesson.
   - Each lesson keeps a band spread ≤2 where possible (warn otherwise).
4. Derive per-lesson metadata:
   - `patternTags` = the up-to-3 most frequent tags among the lesson's rows
     (drives Tip content) — the v1 "every row must match a lesson tag" rule
     is retired (§3.13).
   - `drillPlan` = deterministic mode per row: **translate ≥50% of every
     lesson** (§3.0), one `build`, one `listen` (dictation). Band-5 rows
     lean toward `build`/`listen` slots so a unit's final lesson (which
     band-sorting makes the hardest) isn't a wall of long typed
     translations — the translate-majority rule still holds per lesson.
     On **odd lesson indexes within a unit**, the `build`-slot row may be
     `transform` instead when the row has band ≥3. The generator does NOT
     verify transform derivability (that needs the inflect engine at
     runtime); §3.10 requires the runner to fall back `transform → build`
     when the transform can't be constructed, mirroring the existing
     mixed-mode fallback.
5. Checkpoint per unit: `reviewSentenceIds` = every row in the unit's
   content lessons (exact equality, audit-enforced).
6. Every bank row appears in **exactly one content lesson** (new invariant —
   v1's row reuse is retired; audit-enforced).

### 3.5 IDs and stability

- Sections `sn1`…`sn8`; units mirror their twin with the `sn` prefix:
  `sn2-food-u1` (twin `s2-food-u1`); lessons `sn2-food-u1-l1`…; checkpoints
  `sn2-food-u1-cp`.
- **From switchover (S2-C) onward, sentence lesson/unit/section ids are
  frozen** like word ids; Phase 2 only appends. Freeze is enforced by a lock
  file `scripts/sentences_curriculum_v2_lock.json` (mirror the Words lock
  pattern — and note §9.3: keep the lock checker pointed at the RIGHT
  filename after any rename).
- The 12 legacy lessons are preserved verbatim as
  `window.HANAPATH_SENTENCE_V1_SNAPSHOT` in the new plan file (migration
  reference + parity with `HANAPATH_WORD_V1_SNAPSHOT`).

### 3.6 The generator

`scripts/generate_sentences_curriculum_v2.mjs` (Node, no deps):
- **Inputs:** `sentences_core.js`, `words_lesson_plan.js` (read-only, for
  topology + word→unit mapping), the name manifest
  `scripts/sentences_curriculum_v2_names.json`.
- **Outputs:** (1) the new plan file (emitted as
  `sentences_lesson_plan_v2.js` until S2-C swaps it in); (2)
  `scripts/sentences_curriculum_v2_report.md` — every unit, lesson, name,
  row list, band spread, drill plan, plus the old→new coverage map for the
  12 legacy lessons; owner reviews this in the PR.
- Deterministic: same inputs → byte-identical output. Fails loudly (non-zero
  exit) if any §3.4 invariant can't be satisfied.
- `--check` mode re-derives everything and diffs against the committed plan
  + lock file (regression oracle for later PRs; see §9.3 for the Words
  cautionary tale).

### 3.7 Naming system (K-pop scenario names)

Names live in `scripts/sentences_curriculum_v2_names.json`
(`{ sectionId|unitId|lessonId: { name/title, subtitle, goal, emoji } }`).

**Authoring is a first-class task, not a template pass.** The Words rollout
bootstrapped names mechanically ("two in context", placeholder ✏️ emoji) and
it was the weakest part of that ship — §9.3. Here the manifest MUST be
authored by a strong model against the actual row lists in the generator
report, then owner-skimmed.

Rules (audit-enforced where marked):
- Lesson titles globally unique, case-insensitive (hard error); no numeral
  or Roman-numeral suffixes (hard error, regex `/\b(\d+|II|III|IV|V)\b$/`);
  title ≤ 32 chars; subtitle ≤ 48; `goal` = one outcome sentence.
- Lesson titles are **trainee-life scenarios grounded in the actual
  sentences** of the lesson. Register of the copy: warm, second-person,
  polite-informal world. Examples of the wanted register:
  - Food unit: "Cafeteria run", "Ordering for the members", "Late-night
    tteokbokki".
  - Feelings unit: "Pre-stage nerves", "How was practice?", "Cheer up the
    maknae".
  - People unit: "Meeting the new manager", "Fan-sign small talk".
  - Grammar units keep instructive names: "Linking your lines",
    "Honorifics for the seniors".
- **No real idol/group/company/platform/TV-show/award-show names; no lyric
  fragments** (§3.0).
- **Honesty rule**: a title must not promise a scenario the rows don't
  contain — the bank is generic daily-life content until Phase 2 adds
  trainee-flavored rows, and band-sorted chunking produces thematic
  grab-bags. Neutral daily-life scenario names ("Morning fuel", "Kitchen
  basics") are fine; apply trainee flavor only where the rows support it
  ("Dinner after practice" works for generic food rows; "Fan-sign small
  talk" only if greetings/compliments are actually present). The generator
  report prints each lesson's English glosses beside its proposed name so
  the S2-B owner review can catch mismatches.
- Unit names = twin Words unit theme name + real emoji (no placeholder ✏️).
- Checkpoints auto-named: title `"Stage rehearsal: {unit name}"`, subtitle
  `"Prove your {n} lines stick"` — unique by construction (the checkpoint
  drills 12–18 prompts, so never promise "all {n} lines").
- Section names per §3.3 table.

### 3.8 Unlock model

Derived at runtime from plan data + existing helpers (no stored unlock
state), implemented in NEW functions (`isSentenceUnitUnlocked`,
`isSentenceUnitCrowned`, `isSentenceLessonUnlockedV2`,
`getNextSentenceLesson`) parallel to the Words ones:

- **Studio entry**: unchanged — K2 (`isStudioUnlocked`).
- **Unit**: unlocked iff every `focusWordId` across the unit's content
  lessons is met per `getMetWords()`. No sentence-section gating on top —
  the words-met frontier already tracks the Words path, giving "linear
  units, parallel categories" for free (decision 7). A unit whose twin
  Words unit is merely *started* usually stays locked until the words are
  actually seen — that is the i+1 contract.
- **Lesson**: unlocked iff its unit is unlocked AND the previous lesson in
  the unit is completed (first lesson: just the unit). Checkpoint: all
  content lessons in the unit completed.
- **Crowned**: checkpoint passed (§3.10 pass rules).
- Sections are display grouping + progress headers only.
- All new unlock functions honor `TEST_UNLOCK_ALL_STAGES` exactly like
  `isSentenceLessonUnlocked` does today.
- **Performance mandate**: the naive per-lesson mirror of today's code is
  quadratic (v1 `isSentenceLessonUnlocked` → `getSentencesProgress` re-sorts
  up to 5,000 reviewEvents per call; `getMetWords` rebuilds a ~2,000-entry
  set per call). At ~406 nodes × 75 units per hub render that is real jank.
  Required shape: compute `getMetWords()` and the progress/completed sets
  **once per render** and pass them in (the `isSentenceAvailable(row,
  metWords)` signature is the in-repo precedent); precompute per-unit
  focus-word unions and a bank by-id map once at plan load (plan data is
  static); normalize `reviewEvents` on load/push, not on every read.
- UI affordance: a locked unit's card shows *which Words unit to finish*,
  computed from the **actual unmet focus words** (each word maps to exactly
  one Words unit — link the earliest blocking unit). Do NOT hardwire the
  twin: with the §3.2 reassignment the twin is almost always the blocker,
  but unmet-word derivation stays correct even if data drifts.
- Note (intended): a unit can be word-unlocked while the Studio entrance is
  still K2-locked; the K2 gate wins at the door.

### 3.9 Hub & path UI

`sentenceStudioHubHtml` is rebuilt (Studio identity preserved — this is a
new layout of the Studio's own hub, not a clone of the Words tab):

1. **Continue hero** — next sentence lesson (`getNextSentenceLesson()` =
   first incomplete unlocked lesson in plan-array order, preferring the unit
   of the learner's most recent sentence review event when one is
   in-progress), or the due-review card when reviews ≥ due threshold (SRS
   stays the lead motivator, §3.0).
2. **The path** — sections `sn1`–`sn8` with units as collapsible cards:
   new `sentencePathHtml` / `sentencePathUnitHtml` / `bindSentencePathUnitToggles`
   functions that **share the `.vocab-path-*` CSS classes as-is**
   (`styles.css:3696-3812`; CSS sharing touches zero Words code). Unit card:
   emoji, unit name, twin-theme label, `n/m` lesson progress, lesson rows
   (scenario title + status), checkpoint row visually distinct, crowned
   units collapse. Locked units show the Words deep-link (§3.8).
3. **Free practice strip** — the existing mode cards (mixed, translate,
   build, dictation, shadow, transform) and band chips move below the path,
   unchanged in behavior (they keep `pickSentenceSessionRows`,
   `isSentenceAvailable`, and the band-1 early-word exemption).
4. Stats/insights link stays (analytics untouched).
5. **Zero-unlocked-units state is a requirement, not polish**: a learner can
   reach K2 before crowning any Words unit, at which point ALL 75 units are
   locked. That first load must show a clear "Start with Words: First
   Words →" hero (deep-link) above the free-practice strip — never a wall
   of 75 locked cards. Locked units render as compact single rows.

The flat 12-lesson list dies. `sentenceLessonIntroHtml` is upgraded to the
Words intro idiom (`.study-list` "How it works" card + `.pill.accent` count
+ primary Start), reusing those existing classes.

### 3.10 Lesson & checkpoint session design

**Content lesson** (5–7 rows) — two phases, replacing the bare 6-question
quiz:

- **Phase A — Listen & shadow pass** (study; one step per row): the sentence
  hero card (§3.12) with autoplay, tap-to-replay, romanization reveal,
  English gloss, pattern chips; a "Shadow it" prompt (play → pause beat →
  learner repeats aloud; optional slow replay). Ungraded; advances with the
  primary button. This phase embodies the shadowing principle (§3.0).
- **Phase B — Production pass** (graded; one drill per row per the lesson's
  `drillPlan`): translate-majority mix (§3.4). Helper ladder available on
  translate prompts as today; every answer writes SRS as today. A
  `transform` prompt whose transform can't be constructed at runtime falls
  back to `build` (the existing mixed-mode fallback pattern).
- **Pass**: `{ minFirstTryPct: 75 }` over Phase B. **First-try is NOT
  derivable from today's records** — an incorrect check currently just
  increments `session.attempts` and lets the learner retry, and
  `recordSentenceResult` fires only on eventual success or reveal. The
  session layer must record `firstTry = (attempts === 0 && !revealed)` into
  each `results` entry (a behavioral change to the shared
  `recordSentenceResult` call path, not just UI). Tip/Word bank/Next chunk
  don't break first-try; Reveal and any failed check do. Pass iff
  `firstTryCorrect / gradedPrompts ≥ minFirstTryPct/100`, no rounding
  tricks — worked examples: 6-row lesson → 5 of 6 (same bar as today's
  ceil(0.67·6)); 12-prompt checkpoint → 10 of 12. Fail = summary + "the
  lines are saved for review" + replayable, exactly the forgiving Words
  pattern. Completion still pushes to `completedLessons`.

**Checkpoint** ("stage rehearsal"): no study phase; **prompt count =
clamp(unitRowCount, min(12, unitRowCount), 18)** — the generator emits
per-unit `promptBounds` accordingly (bounded, see §9.3; a 30-row unit must
never drill all 30; the 7-row `sn2-grammar-u1` gets `{7,7}` and is a
replay-style checkpoint until the Phase 2 grammar fills land — accepted).
Row selection: all unit rows sorted by SRS weakness (lowest box, then
due-ness, then bank id as the deterministic tie-break), **frozen into the
session at start and persisted** — answers write SRS mid-session, so
recomputing on reload would change the remaining prompts. Same
deterministic mode mix, translate-majority. Pass `{ minFirstTryPct: 80 }`;
passing crowns the unit (crowning moment reuses the Words result-screen
pattern). Checkpoint completion is stored in `completedLessons` like any
lesson id.

Schema (new plan file; plain data, additive):

```js
window.HANAPATH_SENTENCE_SECTIONS = [
  { id: "sn1", twinSectionId: "s1", name: "Trainee Orientation", order: 1 },
  // ...
];
window.HANAPATH_SENTENCE_UNITS = [
  { id: "sn2-food-u1", sectionId: "sn2", twinUnitId: "s2-food-u1",
    name: "Café & Restaurant", emoji: "☕", order: 12,
    lessonIds: ["sn2-food-u1-l1", ...], checkpointId: "sn2-food-u1-cp" },
  // ...
];
window.HANAPATH_SENTENCE_LESSONS = [
  { id: "sn2-food-u1-l1", unitId: "sn2-food-u1", type: "content",
    title: "Cafeteria run", subtitle: "Order like you mean it",
    goal: "Order food and drinks politely at the company cafeteria.",
    sentenceIds: [/* 5–7 */],
    drillPlan: [{ sentenceId: "s0412", mode: "translate" }, ...],
    patternTags: ["object-eul-reul", "present-polite"],
    pass: { minFirstTryPct: 75 } },
  { id: "sn2-food-u1-cp", unitId: "sn2-food-u1", type: "checkpoint",
    title: "Stage rehearsal: Café & Restaurant",
    subtitle: "Prove your 31 lines stick",
    goal: "Prove the whole unit sticks.",
    sentenceIds: [], reviewSentenceIds: [/* all unit rows */],
    promptBounds: { min: 12, max: 18 },
    pass: { minFirstTryPct: 80 } },
  // ...
];
window.HANAPATH_SENTENCE_V1_SNAPSHOT = [/* the 12 legacy lessons verbatim */];
```

App feature-detects the shape via a new `isSentenceCurriculumV2()`
(mirroring `isWordCurriculumV2`, `app.js:4386`) so the v1 code path keeps
working until switchover — **and the switchover PR must include the
end-to-end reachability check** (§9.3).

### 3.11 Migration (one-shot, version-gated)

In `getSentencesProgress()`'s normalization (or a sibling
`migrateSentencesState()` called from the same init path), gate on
`isSentenceCurriculumV2() && (progress.planVersion || 1) < 2` (the plan-shape
gate prevents a v1-plan rollback from mis-running the migration —
`vocabPlanVersion` precedent; note the canonical field name is
`progress.planVersion`, used consistently in §7):

- Stash `progress.completedLessonsLegacy = completedLessons`.
- Rebuild `completedLessons`: credit each new **content** lesson whose
  `sentenceIds` all have `results[id].seen > 0`.
- **Be honest about what transfers**: the 69 legacy-lesson rows scatter
  across 32 units, and under 5–7-row packing **zero new lessons are fully
  covered by them** — a learner who completed all 12 v1 lessons starts the
  new path fresh. What the migration actually preserves is the per-sentence
  SRS (`results`), review history, and the `completedLessonsLegacy` record;
  the seen-rows credit rule exists for heavy free-mode users, not as a v1
  lesson mapping. Do not claim otherwise in UI copy.
- Checkpoints are never auto-crowned (Words parity).
- Clear `state.sentenceLessonSession` (an S2-A-era in-flight session would
  reference v1 lesson ids).
- Leave `results`, `reviewEvents`, `band`, `newPerDay` untouched.
- Set `progress.planVersion = 2`; save once.

Nothing else references the old ids (§2.4 blast radius), and per-sentence
SRS survives by construction.

### 3.12 Runner formatting — steal the guided-Words card language

The owner brought polished formatting into the first Words lessons; the
sentence runner adopts the same visual system (all classes reusable from
`styles.css` — referencing them from new sentence HTML touches zero Words
code):

- **Shell**: `.word-card-progress-row` + `.word-card-progress-tile`
  (eyebrow "Line N of M" + 4px accent progress track) left; a compact
  "📚 Sentence Bank" (or unit word-list) secondary button right.
- **Hero**: the sentence in a `.word-card-ko-tile`-style tile — full-tile
  speak `<button lang="ko">` with the Korean sentence
  (`clamp(1.35rem,5vw,1.8rem)` for sentence-length text, not the word-size
  clamp), romanization sub-line, 38px circular ▶ play pinned right. English
  gloss below in the `.word-card-definition` flex idiom; pattern-tag chips
  where the POS row sits for words.
- **Nav**: `.word-card-nav-actions` 2-col grid, Back (secondary) left,
  primary forward right, min-height 50px; audio actions row left-aligned.
- **Typing (Translate & Type)**: the `.word-type-box` idiom —
  `.sentence-input`, "No Korean keyboard?" hint, syllable tile row + ⌫ —
  reconciled with the existing Studio word-bank helper (the helper ladder
  supplies the tiles; keep ladder semantics, adopt the visual shell).
- **Feedback**: aria-live region with reserved height; correct answers get
  the rating-pill treatment where SRS grading applies (Hard #ff7d7d /
  Known #72dda0 pills, `word-rating-pop` overshoot, 520ms auto-advance).
- **Overlay**: the `openWordExampleOverlay` modal pattern (blurred scrim,
  430px dialog, spring-in) reused for "hear it slow" / tip details.
- **Events**: ONE delegated listener on the **session root** routing
  `data-sentence-*` attributes (mirror `bindWordLessonRoot`). Scope: the
  delegation covers session markup only; the hub's existing per-element
  `data-ss-*` bindings (`bindSentenceStudioEvents`) stay as-is until S2-D
  rebuilds the hub — no half-renamed dual-namespace binder. Every speakable
  Korean string is a `<button lang="ko" data-speak>` with
  `aria-label="Hear …"`.
- **Gotchas** (from the extraction report): `var(--accent-text)` is used but
  never defined — use `var(--accent)`; do NOT copy the legacy
  `.word-example*` / `.word-card-meaning` / `.word-card-meta*` classes; the
  words check step (`wordLessonCheckHtml`) was never restyled — don't copy
  it, style the sentence check step to match the card language instead;
  `.word-type-study-box .sentence-input` carries word-sized
  `letter-spacing:.14em` and existing rules can't be edited (invariant 3) —
  wrap the sentence input in a new `.sent-type-box` container, never in
  `.word-type-study-box`.
- **Mid-session save**: `state.sentenceLessonSession` with versioned
  `serializeSentenceLessonView` / `rehydrateSentenceLessonView`
  (validate-or-drop) / `persistSentenceLessonSession`, persisted on every
  advance, cleared at summary — a direct mirror of the Words trio. "Resume
  with identical prompts" requires persisting the DERIVED random state, not
  just an index (the Words serializer persists `questions[]` + `typeTiles`
  for exactly this reason). Serialize: row ids, phase, step/prompt cursor,
  drill-plan cursor, typed input, `attempts`, helper state (`helperLevel`,
  `helperUsed`, `revealedTokenCount`, `lockedPrefix`), `builtTiles` +
  tile/token pools (shuffled at build time), transform assignments,
  `results[]`. Checkpoint row selection is frozen at session start (§3.10)
  and persisted. S2-C bumps the snapshot version so S2-A-era v1-shape
  sessions are dropped on rehydrate. Free-mode sessions stay unpersisted
  (they're 5 prompts).

New CSS goes in `styles.css` under a `.sent-*` prefix ONLY where sentence
needs diverge; shared classes are used as-is, and **no existing CSS rule is
edited** (Words visual regressions are off the table).

### 3.13 Audit changes (same PR as the data change)

Rewrite `scripts/audit-sentences-foundation.mjs` in place (filename kept —
roadmap/README references stay valid; update their descriptive text) with
shape auto-detection (v1 rules for the v1 file, v2 rules for v2 — the Words
audit line-32 pattern):

Hard errors (v2):
- Referential integrity: every lesson has a valid `unitId`; every unit a
  valid `sectionId` + resolvable `lessonIds`/`checkpointId`; every
  `twinUnitId`/`twinSectionId` resolves in the Words plan; every content
  lesson in exactly one unit's `lessonIds`.
- Coverage: every bank row in **exactly one** content lesson; every
  `sentenceId`/`reviewSentenceIds` entry exists in the bank.
- Checkpoint equality: `reviewSentenceIds` === union of the unit's content
  rows.
- i+1 well-formedness: for every unit, every row's `focusWordIds` ⊆ the
  cumulative word set of Words units up to and including the twin, where
  path order is the `HANAPATH_WORD_UNITS` **array index** (the exact §2.7
  definition — generator and audit must share it or the audit fails).
- Checkpoint `promptBounds` = `{ min(12, rowCount) … min(18, max(12,
  rowCount)) }` against the unit's actual row count (the fixed 12-min is
  unsatisfiable for the 7-row grammar unit).
- Names: global lesson-title uniqueness; numeral/Roman suffix ban.
- `drillPlan` modes ∈ the closed mode set; `transform` only on band ≥3 rows.
- No duplicate `korean` surface within one lesson.
- Legacy snapshot present and verbatim (ids `s0-…`–`s11-…`).

Warnings (strict-failing):
- Lesson size outside 5–7 (hard error <3 or >9); unit >6 content lessons;
  `patternTags` not ⊆ union of row tags; placeholder emoji (✏️) in unit
  names; title length caps; a unit whose required focus words are not
  covered by twin + ancestor units + prior sections (the §3.2 four-row
  reassignment keeps this clean).

Informational only (printed, never failing — some units span 4 bands and no
legal 5–7 packing avoids it): band spread >2 within a lesson.

Add a self-test (`scripts/test_sentences_curriculum_audit.mjs`) that mutates
a copy of the plan and asserts each check fires — and keep it pointed at the
real filename forever (§9.3).

### 3.14 Spec supersessions

For the Sentences section, this plan supersedes:
- Teaching spec §8 rows 4 (hub) and 8 (pattern micro-lessons): the 12-lesson
  linear layer is replaced by the path curriculum; pattern *tips* live on in
  lesson `patternTags` + the helper ladder.
- The hardcoded 5-question lesson session and `ceil(0.67·N)` pass rule →
  §3.10 session design and pass config in data.
- The flat hub lesson list → §3.9 path.

Everything else in the teaching spec (bank schema, tags, bands, drill modes,
SRS, helper ladder, analytics) still governs. S2-F records the supersessions
in the spec with a dated addendum, and updates `CLAUDE.md` + `HANDOVER.md`
pointers.

---

## 4. Phase 1 — execution queue (existing 2,060 rows; zero new content, zero audio)

> One box = one branch off `main`. Keep order — later boxes assume earlier
> merges. Model routing (per roadmap §0.1 conventions): **[coder]** = strong
> coding model (app.js/schema work is NOT Gemini-safe); **[author]** =
> strongest writing model; **[owner]** 🔒 = owner action. Every PR ends with
> the §7 verification playbook, including the **reachability check** — the
> Words path UI once shipped unreachable (§9.3); do not repeat that.

- [x] **S2-A — Session restyle + resume** [coder]
  Adopt the guided-Words card language for the EXISTING Studio session
  (hero tile, progress row, nav grid, typing shell, aria-live feedback,
  delegated `data-sentence-*` events) per §3.12, and add
  `state.sentenceLessonSession` save/resume. No data change; works with the
  current 12 lessons. Touches `app.js`, `styles.css` (+ cache bumps).
  *Accept:* play a lesson and a free translate session end-to-end in the
  browser; kill the tab mid-lesson, reopen, position + prompts identical;
  `node --check app.js`; all audits green.

- [x] **S2-B — Curriculum generator + name manifest + audit rewrite** [coder + author]
  Build `scripts/generate_sentences_curriculum_v2.mjs` (§3.4–§3.6); author
  `scripts/sentences_curriculum_v2_names.json` (§3.7 — REAL names against
  the report's row lists, no template bootstrap); emit
  `sentences_lesson_plan_v2.js` (NOT loaded by index.html yet) +
  `scripts/sentences_curriculum_v2_report.md` + lock file; rewrite
  `scripts/audit-sentences-foundation.mjs` with shape auto-detect (§3.13) +
  self-test.
  *Accept:* audit green on BOTH v1 (loaded) and v2 (emitted) plans;
  generator re-run byte-identical; `--check` passes; self-test proves every
  new check fires; report reviewed by owner (names especially).

- [x] **S2-C — Switchover: plan swap, unlock, checkpoint runner, migration** [coder]
  Rename `sentences_lesson_plan_v2.js` → `sentences_lesson_plan.js` (v1
  content preserved inside as `HANAPATH_SENTENCE_V1_SNAPSHOT`). Implement
  `isSentenceCurriculumV2()`, the §3.8 unlock functions, the §3.10 two-phase
  content session + bounded checkpoint session, pass rules, and the §3.11
  migration. Update the generator/lock/self-test to the final filename
  (§9.3!). Add `TEST_ENABLE_SENTENCE_SECTION_COMPLETION` +
  `completeSentenceSectionForTesting` (parity with the Words test controls,
  `app.js:4410`). The old hub list may render the new lessons as a flat
  interim list this PR — path UI is S2-D — but the interim list MUST:
  (1) route unlock through the new v2 unit-gating functions (the v1
  array-sequential rule would lock everything behind ~400 predecessors),
  (2) branch intro/start on `lesson.type` so checkpoints reach the
  checkpoint runner instead of dead-ending on `sentenceIds: []`,
  (3) share one memoized bank by-id map (§3.8 performance mandate).
  *Accept:* fresh profile (K2 satisfied per §7): sn1 units open as s1 words
  are learned, lessons linear within units, checkpoint crowns; profile with
  legacy completions: `planVersion: 2`, SRS/results intact,
  `completedLessonsLegacy` stashed, path starts fresh (legacy lessons do
  NOT map — §3.11); no console errors; audits green; cache bumped.

- [x] **S2-D — Path UI** [coder]
  Rebuild the hub per §3.9: continue hero, `sentencePathHtml` sections/units
  (shared `.vocab-path-*` CSS), locked-unit Words deep-links, free-practice
  strip below, flat lesson list deleted.
  *Accept:* browser smoke per §7 (path renders, collapse, locked toast +
  deep-link jumps to the Words unit owning the unmet words, hero targets
  the highlighted node); a fresh K2 profile with zero crowned Words units
  sees the "Start with Words" hero, not 75 locked cards (§3.9 item 5);
  mobile-width sane; **the path is reachable from the Studio tab on first
  load** (reachability check); cache bumped.

- [x] **S2-E — Polish pass** [coder + author]
  Crowning moment for checkpoints; unit emoji finalized (no ✏️); per-unit
  due-count chips (optional); intro copy in the trainee voice; empty
  states; copy review of all goals/subtitles in context.
  *Accept:* owner eyeballs the path end-to-end; no audit regressions.

- [x] **S2-F — Docs + pointers** [coder]
  Dated supersession addendum in `docs/SENTENCES_TEACHING_SPEC.md` (§8
  scorecard rows 4/8 updated honestly); `docs/SENTENCES_FINAL_ROADMAP.md`
  banner pointing curriculum/hub work here (Track H stays there, §5);
  `CLAUDE.md` + `HANDOVER.md` + `README.md:36` reference updates.
  *Accept:* a cold-start agent reading CLAUDE.md lands here for sentence
  path work and in the roadmap for Track H.

- [x] 🔒 **S2-G — Owner acceptance** [owner]
  Real-device run: sn1 → one sn2 unit → checkpoint crown; confirm migration
  on your live profile (back up localStorage first); confirm session length
  feels right; date-stamp Phase 1 closed here.
  *Closed 2026-07-10: the owner waived the real-device acceptance run and
  declared Phase 1 closed on the strength of the PR #218 verification matrix
  (browser-checked sn1→sn2 gating, checkpoint crown, migration, 380px layout).
  Any live-profile migration issue found later is a bug against this decision,
  not a reopened phase.*

Independent maintainer review (2026-07-10, follow-up to PR #217): corrected
per-unit due/count calculations, restored the free-practice band selector,
made Words prerequisite actions open and highlight the blocking unit, added
the checkpoint crowning summary, restored the content lesson's listen-and-shadow
pass, made generator `--check` a no-write drift oracle, and reconciled the
scorecard's generated-plan counts. S2-G was closed by owner decision on
2026-07-10 (device run waived) — **Phase 1 is closed**; remaining work is
Phase 2 (Track H authored expansion, §5), still owner-gated 🔒.

---

## 5. Phase 2 — authored expansion (Track H; 🔓 owner-unlocked 2026-07-16)

Track H from `docs/SENTENCES_FINAL_ROADMAP.md` remains the content pipeline;
this plan re-anchors where its output lands. The owner unlocked the priority
queue below on 2026-07-16 (executor + rules:
`docs/OPUS_TRACK_H_BATCH_PROMPT.md`); scenario-pack themes stay owner-picked
per batch.

- **Batch shape** (unchanged mechanics): author original rows (ids `s2061+`,
  full bank schema, all audit fields) → `python generate_assets.py` (owner)
  → append to `sentences_core.js` → run the curriculum generator to slot new
  rows → audits + report.
- **Where new rows land** (two allowed shapes, generator-enforced):
  1. **Fills**: append lessons to existing thin units (the three grammar
     units at 7/12/15 rows first). A crowned unit stays crowned; its
     checkpoint `reviewSentenceIds` extends (ids frozen, content data may
     grow).
  2. **Scenario packs**: new themed units appended to the right section by
     gating unit — this is where the K-pop flavor becomes *content*, not
     just naming: practice-room talk, fan-sign lines, interview reactions,
     award-show thanks, live-stream chat — **original sentences only, no
     lyrics, no real names of any kind** (§3.0).
- **Priority queue**: (1) the 8 thin pattern tags per
  `docs/SENTENCES_GAP_REPORT.md` (~100 rows in 4 batches — makes
  pattern-focused drilling viable); (2) grammar-unit fills; (3) scenario
  packs per owner taste.
- Every batch PR updates a ledger row in the generator report (re-derivable
  counts — the scorecard-was-wrong-4-times rule applies).

---

## 6. Invariants & do-not-touch list (all phases)

1. Vanilla/static PWA; no framework/bundler/build step.
2. Bank rows frozen: never edit `id/korean/english/tokens` of existing rows;
   additive fields only. Sentence lesson/unit/section ids frozen from S2-C.
3. **Words section is read-only.** Do not modify: `words_curated_core.js`,
   `words_lesson_plan.js`, `words_inflect.js`,
   `scripts/generate_words_curriculum_v2.mjs` + its json artifacts,
   `scripts/audit-words-data.mjs`, any `word*`/`vocab*`-prefixed function or
   state field in `app.js`, or any existing CSS rule (including
   `.vocab-path-*` and `.word-card-*` — *referencing* the classes from
   sentence HTML is the intended reuse; *editing* the rules is not).
   Sentences code calls only the public read helpers (`getMetWords`,
   `isWordUnitCrowned`, `getWordLessonReviewWordIds`, plan globals).
4. Sentence Studio stays its own subsystem: extend at `EXTENSION` markers;
   never resurrect the legacy shared quiz engine (`sentenceDeck`,
   `makeSentence*` at `app.js:1858+/2275+` are Listening-tab legacy — Track
   I's problem, not this plan's).
5. K-pop fidelity contract (§3.0): no lyrics/subtitles, no real idol/group/
   company names, 해요체-first register, bands ≠ politeness.
6. Cache bumps every PR that touches loaded files (`CACHE_NAME` +
   `?v=` in BOTH `index.html` and `sw.js`); audio only via
   `generate_assets.py` (never hand-edit `audio_map.js`).
7. Test flags ship-state: `TEST_UNLOCK_ALL_STAGES` false; the section-
   completion test controls ship per current owner setting (word control is
   `true` on main today — match, don't flip, unless the owner says).
8. A v1 saved state must always load (migration handles it; never require a
   manual reset). No PR may weaken an audit to get itself green.
9. Re-derive every count from the data files before building on it —
   scorecards and checkboxes in this repo have been wrong repeatedly.

---

## 7. Verification playbook (every PR)

```
node --check app.js                              # + other touched JS
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentences-foundation.mjs      # rewritten in S2-B
node scripts/audit-words-data.mjs --strict       # proves Words untouched
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs                 # if shell/versions touched
python -m http.server 8000                       # browser smoke:
```
Browser smoke (fresh profile in a private window + a legacy-state profile).
Satisfying K2 on a fresh profile: complete the alphabet via its test button,
then earn 20 correct answers in the quiz — `state.correct` is only
incremented by the legacy quiz engine, so Words test controls and
`TEST_UNLOCK_ALL_STAGES` do NOT open the Studio door for gating tests.
1. Studio tab loads; **the new UI is actually reachable** (§9.3).
2. Path renders; locked unit shows the Words deep-link and it navigates.
3. One full content lesson: shadow pass → production pass → pass/fail
   summary; every row heard and drilled; mid-lesson reload resumes exactly.
4. One checkpoint: 12–18 prompts, 80% gate, unit crowns.
5. Free modes + review still work; band chips unaffected.
6. localStorage: `sentencesProgress.planVersion === 2`, `results` untouched,
   `completedLessonsLegacy` present on migrated profiles.
7. Console: zero errors. Words tab: spot-check one lesson to prove no
   regression.

---

## 8. Open items & carried-over debts (not blockers for Phase 1)

| Item | Owner-gated? | Note |
|---|---|---|
| Track H batch volume/themes | 🔓 queue unlocked 2026-07-16; themes per batch | §5; gap report is the shopping list; work order: `OPUS_TRACK_H_BATCH_PROMPT.md` |
| B3 Translate & Type positional/near-miss diff | no | `EXTENSION (roadmap B3)` markers in app.js; unrelated to the restructure — do not bundle |
| Track I dead-code removal (`getSentenceStudyBank`/`makeSentence*`) | no | Blocked on Listening tab repoint; unchanged by this plan |
| Listening-tab runtime verification (54 `.find()` lookups) | no | Outstanding since 2026-07-07 handover |
| Words-side breakage found while mapping: `generate_words_curriculum_v2.mjs --check` and `scripts/test_curriculum_v2_audit.mjs` still read the renamed `words_lesson_plan_v2.js` → ENOENT | no | **Words territory — out of scope for this plan** (invariant #3); flagged to the owner separately |
| Section names (§3.3) & unit emoji final say | 🔒 | Editable in the name manifest before S2-C |

---

## 9. Appendix

### 9.1 Numbers that shaped the design (re-derive before use)

- Bank: 2,060 rows; bands 471/283/304/395/607; audio 2,060/2,060.
- Twin mapping: 0 unmapped focus words; 2,018 single-unit rows (98%); 40
  two-unit; 2 three-unit; per-unit median 30, min 7 (`s2-grammar-u1`), max
  41 (`s1-firstwords-u1`); zero empty units.
- Per-section rows: sn1=115, sn2=322, sn3=315, sn4=283, sn5=258, sn6=255,
  sn7=263, sn8=249 (sum 2,060).
- Expected output: ~331 content lessons + 75 checkpoints across 75 units
  (even packing, §3.4); 4–6 content lessons for most units; 1–3 for the
  three thin grammar units (7→1, 12→2, 15→3).
- Legacy layer: 12 lessons, 72 slots, 69 unique rows; pass rule
  `ceil(0.67·N)` = 5-of-6 today.
- Cold-start (free modes only): 39 band-1 rows via the early-word exemption.

### 9.2 Key code reference index (verified 2026-07-10, `main` @ `a7cd28b9` — re-grep first)

| What | Where (approximate — re-grep by name) |
|---|---|
| Studio region | `app.js` ~14320–16050; entry `renderPracticeView` ~15657 |
| Hub (replaced S2-D) | `sentenceStudioHubHtml` ~15139; intro ~15320 |
| Modes/session | `SENTENCE_MODES` ~14347; `sentenceQuestionMode` ~14963; picker ~14670; `SENTENCE_SESSION_LENGTH` ~14345 |
| Helper ladder / checking | ~15761 / ~15439; `PATTERN_TAG_INFO` ~14362; `checkSentenceAnswer` ~14733; diff ~14742 |
| SRS write | `recordSentenceResult` ~15021 |
| Progress slice | `getSentencesProgress` ~14427; completion push ~15106; pass calc ~15105 |
| Unlock (v1) | `isSentenceLessonUnlocked` ~14910; K2 gate 3143/3080 |
| Words read-only helpers | `getMetWords` ~14526; `isSentenceAvailable` ~14551; early words ~14545 |
| Words v2 patterns to mirror | unlock 4401/4402/4431; feature-detect 4386; migration 4443; session persist 4286/4316/4353; path UI ~7130/~7152/~7179; CSS ~3708-3821 |
| Card design system | `wordLessonStudyHtml` ~5597; overlay 5397; intro 5539; delegated events `bindWordLessonRoot` ~6027 |
| Audits | `audit-sentences-data.mjs` (bank); `audit-sentences-foundation.mjs` (12×6 hard-coded — rewrite); words audit auto-detect line 32 |
| Cache pins | `index.html:27-28`, `sw.js:13-14`, `CACHE_NAME` (v303 at write time — always re-read) |

### 9.3 Lessons from the Words v2 rollout (bake these in)

1. **Ship reachable or don't ship**: the Words path UI (P1-D) landed
   unreachable and needed hotfix `ad2de661`. Every UI PR here ends with a
   first-load reachability check in the browser (§7 step 1).
2. **Template names are not names**: the Words name manifest was bootstrapped
   mechanically and reads like it. S2-B budgets real authoring + owner
   review of the report.
3. **Bound your checkpoints**: Words unit checkpoints ask ~48 prompts for a
   30-word unit because the planned rotation was skipped. Sentence
   checkpoints carry `promptBounds {12,18}` in DATA and the audit checks the
   runner constant exists — a 30-row unit must never drill all 30.
4. **Keep tooling pointed at renamed files**: the Words `--check` oracle and
   audit self-test broke on the v2→final rename and are dead on main today.
   S2-C explicitly updates the generator/lock/self-test paths in the same
   commit as the rename.
5. **Snapshot the old world**: `HANAPATH_WORD_V1_SNAPSHOT` made migration and
   the early-word exemption possible. Keep the sentence v1 snapshot (§3.5).
6. **Verify scorecards against data** — four historical failures; this plan's
   own §2 numbers must be re-derived, not trusted.
