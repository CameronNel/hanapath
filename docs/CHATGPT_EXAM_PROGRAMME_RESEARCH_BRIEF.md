# ChatGPT Deep-Research Brief — Completing the HanaPath Examination Programme

> **How this document is used.** The owner gives ChatGPT (deep-research mode,
> with **read-only access to this repository**) this entire file. ChatGPT
> works in **two phases with an owner decision gate between them** (§12).
> Claude then verifies the outputs against the live repo, corrects anything
> that contradicts the code, and lands the final specs in `docs/` as the
> governing planning documents for execution models to build from, one PR at
> a time. You (ChatGPT) are the **researcher and first drafter**, not the
> implementer.
>
> Written 2026-07-21 after a full audit of the shipped exam section at
> commit `55ac88981fdab0eb79cafd1770b25cde25340234` (`main`). Revised the
> same day after external (Codex) review. Every number in §10 was re-derived
> from live data at that commit; Appendix A records the exact commands and
> outputs so you can reproduce any of them rather than trusting this file.

---

## 0. Mission

HanaPath's Exam tab currently certifies two things, and certifies them well:

1. **Hangul Mastery Examination** — 200 items, perfect-score-only; a passer
   has demonstrably identified, typed, and handwritten all 40 modern jamo.
2. **Core Word Examination Suite** — ten seeded achievement exams over the
   2,028-sense curated Words curriculum, with macrostrand subscores and a
   delayed retention confirmation for the final.

A 2026-07-21 audit confirmed both are green, spec-exact, and ready to examine
students **within their stated scope**. The audit also confirmed what is
missing. Your mission is to research and draft the plans that close these
gaps:

- **Workstream 0 (P0 — prerequisite for credible certification):**
  **integrity, provenance, and honest claims.** The shipped app contains an
  owner-mandated developer button that instantly completes a Words section,
  which also unlocks that section's exam; and all state lives in
  client-side `localStorage`, so results are editable by a technically
  capable user regardless. Certification claims must be made honest before
  the programme grows (§4).
- **Workstream A (flagship):** a **Sentence Mastery Examination** — the
  third exam pillar, certifying *production* of sentence-level grammar:
  past tense, future tense, negation, register, honorifics, particles,
  connectives — through typed Korean translation.
- **Workstream B:** **Form Checks** — short, blocked, corrective practice
  diagnostics (e.g. "Past & negation check") under the Learn tab. Specced
  in `docs/CORE_WORD_EXAM_SPECS.md` §3.5 but never built.
- **Workstream C:** a **Words-curriculum extension teaching typed
  past/negation production**, which unlocks scored production quotas the
  Word exams currently (and correctly) refuse to assign.
- **Workstream D 🔒:** a **future-tense content expansion proposal** for the
  sentence bank. The 52-row `future-geoyeyo` pool is *hypothesised* to be
  too thin to examine from — your sampling mathematics must confirm or
  refute that before any authoring is proposed (§8). Theme choices are
  owner-gated.

**Explicitly out of scope:** pronunciation/speaking assessment. The owner
has deferred it. Do not design it, but Workstream A's construct definition
should note where a future speaking exam would attach, so nothing you
design blocks it.

---

## 1. What HanaPath is (context you must respect)

HanaPath is a **vanilla static Korean-learning PWA** built for one learner
persona: an English speaker starting from zero, learning on a phone.

Technical constraints that shape every plan you write:

- **No framework, no bundler, no build step.** One large plain browser
  script (`app.js`, ~24k lines) plus plain-JS data files loaded as browser
  globals via `<script defer>` before it (see `index.html` for the load
  order). This is an owner hard rule; never propose React, TypeScript, a
  test framework, or a server.
- **All state is client-side** in `localStorage` (key `hanapath-v1`),
  normalized/backfilled on load. Persistence plans must be additive and
  backward-compatible: old saves must never lose progress. This also means
  **no exam result is tamper-proof** — a design fact Workstream 0 must
  confront honestly rather than paper over.
- **Offline-first PWA** with a service-worker shell cache (`sw.js`); every
  changed asset needs a cache-version bump. Audio is pre-generated MP3 per
  Korean string (no runtime TTS; `audio_map.js` + `generate_assets.py`);
  any new Korean text requires regenerating audio assets.
- **Determinism is a design value.** Exams are generated from seeds by a
  pure engine (`word_exam_engine.js`) so the browser runner and the Node
  audit script produce identical items. Selection is never personalised
  from SRS or lesson history.
- **Node audit scripts are the guardrails.** There is no test framework;
  every data contract is enforced by an audit script under `scripts/` that
  hard-fails. Any plan you draft must include its audit contract.
- **Workflow:** every shippable unit of work is one small draft PR
  ("one box = one PR"); the owner reviews and squash-merges. Your plans
  must decompose into such boxes.

The app's three learning pillars and their status:

| Pillar | Status | Exam status |
|---|---|---|
| **Alphabet (Hangul)** | Complete, protected | ✅ Hangul Mastery Examination shipped |
| **Words** (2,028 curated senses, 8 sections, 75 units, 208 content lessons) | Shipped v2 curriculum | ✅ Ten-exam Core Word Suite shipped |
| **Sentences** (4,177-row bank, 8 sections, 75 units, 703 lessons) | Shipped v2 curriculum; flagship drill is **Translate & Type** | ❌ **No exam — this is Workstream A** |

**Translate & Type** (the Sentences flagship you will design the exam
around): the learner sees an English prompt and types the Korean translation
in Hangul. During *learning*, a helper ladder assists: tip → word bank →
next chunk → reveal. The grader normalizes the input and compares against
the target sentence **and the row's `acceptAlso` variant list** — the bank
schema already supports authored accepted-variant sets (98 of 4,177 rows
carry non-empty `acceptAlso` arrays today, e.g. 이것은 → 이건 contractions).
Your accepted-answer research (§5.1) must start from this existing
mechanism, not design a parallel one. An exam mode would run this surface
with the helper ladder disabled.

### 1.1 Repository access rules

You have **read-only** access to the repository at the audited commit.

- **Cite actual files, symbols, data fields, and doc sections** when you
  make claims about current behaviour. Key entry points: `app.js` (search
  `EXAM HUB · HANGUL MASTERY EXAMINATION` and `CORE WORD EXAMINATION
  SUITE`), `word_exam_blueprints.js`, `word_exam_engine.js`,
  `sentences_core.js`, `sentences_lesson_plan.js`, `words_lesson_plan.js`,
  `words_inflect.js`, `scripts/audit-*.mjs`, and the specs in `docs/`.
- Use an `[IMPL: …]` placeholder **only** where inspection genuinely cannot
  settle the question (e.g. behaviour that requires running the app).
  Claude's verification pass will bind or correct these — but a draft that
  needs hundreds of bindings has failed; a draft that cites real symbols
  with a handful of honest placeholders has succeeded.
- Do not modify anything; do not treat TODOs or comments in code as owner
  decisions unless a doc in `docs/` confirms them.

---

## 2. The shipped examination estate (do not redesign it)

You are extending a working system. Its conventions are precedent, and your
drafts should feel like siblings of the two existing contracts:
`docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md` and
`docs/CORE_WORD_EXAM_SPECS.md`.

### 2.1 Hangul Mastery Examination (precedent for "mastery = perfection")

- 200 items: 120 six-option MCQs, 40 Korean-keyboard typed, 40 drawn from
  memory on a blank canvas graded by a stroke recognizer.
- Mastery **only** at 200/200 with zero unanswered; no partial credit.
- Forward-only runner, 90-minute countdown, audio ≤ 2 plays/item, no hints
  or feedback until submission, full answer review after.

### 2.2 Core Word Examination Suite (precedent for "achievement = sampled")

- Ten exams: eight section exams (40–60 items), one midterm (80), one
  cumulative final (150). 640 scored items per full pass.
- Items are generated per attempt from a **seeded, stratified, pure
  engine**; no frozen banks. The same engine runs in the browser and in the
  audit (`scripts/audit-word-exams.mjs`).
- Every item has one primary **macrostrand**: `R` receptive, `C` cued
  selection, `P` controlled production (typed), `X` contextual use, `F`
  form/register control, `D` lexical depth. Blueprints fix per-strand
  quotas.
- Pass = 75% (final 80%) with per-strand floors; Distinction = 88–90%;
  **Core Words mastered** requires a qualifying final (≥88% + strand
  floors) and then a **60-item retention confirmation 7 days later**
  (21-day window, new seed, no repeated targets). Mastery is sticky once
  earned.
- A **competency milestone map**
  (`docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`, regenerated by
  `scripts/build-word-exam-competency-map.mjs`) proves every scored form
  was explicitly taught before any exam tests it. This gate is why
  past/negation production is currently unscored (see Workstream C) — the
  map is honest, not lazy.
- Cut scores are described in-product as provisional HanaPath achievement
  standards, never TOPIK/CEFR equivalence.

### 2.3 Locked owner decisions you must not reopen

1. `Learn · Exam · Progress` is the tab structure; new exams go on the Exam
   tab beneath Core Words.
2. **No standalone form-named exams** ("Past Tense Exam"). Forms are mixed
   in realistic contexts inside broader exams; blocked practice belongs in
   Form Checks. Prompts must never name the required form ("use the past
   tense") — context must force it.
3. Recognition MCQs are four-option in Words-style exams; the six-option
   format is Hangul-exam-only.
4. Exams are generated, seeded, deterministic, never personalised.
5. No hints, no feedback before submission, audio ≤ 2 plays, quit discards,
   timeout submits; full answer review after submission.
6. Exams never gate, re-lock, or mutate normal learning progression or SRS.
7. Mastery claims require delayed retention evidence (the Exam 10
   precedent).
8. The app stays vanilla/static; audits guard every data contract.
9. Authored Korean content (new sentences) requires **owner approval of
   themes** before any authoring starts.
10. The section-completion test control exists at the owner's explicit
    request; Workstream 0 may constrain, gate, or flag it — **removal is
    off the table**.

---

## 3. Verified gap analysis (2026-07-21 audit; reproduce via Appendix A)

1. **Certification integrity is not yet honest (P0).**
   `TEST_ENABLE_WORD_SECTION_COMPLETION = true` in `app.js` renders a live
   "Complete section" control whose handler crowns every lesson and
   checkpoint in a Words section; word-exam unlocking checks exactly that
   crowned state, so the control unlocks formal examinations without
   study. Independently: all progress and results live in `localStorage`,
   so no HanaPath result is tamper-proof even with the button gated.
2. **Sentence-level grammar production is taught but never examined.** The
   Sentences path teaches past/future/negation/register through 703
   lessons and drills production via Translate & Type — and no exam
   certifies any of it. Meanwhile the Words exams *cannot* test future
   tense at all: the Words curriculum never teaches it and
   `words_inflect.js` cannot generate future forms. Tense production
   certification therefore belongs to a Sentences exam by necessity, not
   preference.
3. **Form Checks don't exist.** `docs/CORE_WORD_EXAM_SPECS.md` §3.5
   prescribes 8–15-item blocked corrective diagnostics under Learn; zero
   are built (no matching implementation in `app.js`).
4. **Typed past/negation production is untaught in Words.** The Words
   curriculum teaches 았/었어요 and 안/못/-지 않다/-지 못하다 receptively
   (recognition + context) in `s3-grammar-u2` ("Connecting clauses",
   lesson l2). Because the competency gate is honest, the Word exams score
   these only as recognition/context. The follow-up curriculum issue that
   `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md` and
   `docs/EXAM_TAB_HANDOVER.md` reference was **never actually opened**
   (the repo has exactly one issue ever, #316, closed).
5. **Future-tense sentence content is thin:** 52 rows tagged
   `future-geoyeyo` out of 4,177. Whether this is *insufficient* depends
   on per-attempt quotas, retake counts, no-repeat windows, and caps —
   Workstream D must do that math before concluding.

---

## 4. Workstream 0 — Integrity, provenance, and honest claims (P0)

This ships **before** any new exam, because every certification the
programme adds inherits its credibility from it.

### 4.1 The honest framing (research + copy contract)

Document and enforce the truth: **HanaPath examinations are local
achievement assessments, not tamper-proof or proctored credentials.**
`localStorage` state can be edited by a capable user; hiding the test
button raises the effort bar but cannot create cryptographic trust.
Research how comparable self-study products (Duolingo score claims, Anki,
WaniKani, language-app "certificates") word their achievement claims, and
draft the in-product and documentation copy that makes honest claims
without undermining learner motivation.

### 4.2 The test-control policy

Propose 2–3 options with a recommendation for gating the section-crowning
control (precedent: the existing `?__wetest=1` query-gated acceptance
hook), honoring locked decision §2.3-10 (the owner keeps their workflow;
no removal).

### 4.3 Result provenance (required design)

Every stored exam result — existing Hangul/Words records via
backward-compatible migration, and all future Sentence exam records from
day one — must record at least:

- blueprint version and exam-engine/schema version;
- generation seed;
- content-bank revision identifier (word/sentence data version);
- **whether any testing override was active** (section-crowning control
  used on a section in the exam's scope, `?__wetest` hook active, or any
  future override);
- qualifying-attempt and retention-attempt linkage IDs for mastery flows.

**A result earned while a completion override was active must never
produce an official mastery state.** Define how the UI labels such results
(e.g. "practice/unofficial"), how the flag propagates from override use to
exam records, and the audit checks that enforce all of it.

### 4.4 Versioning and immutable history (required design)

The programme will evolve (Workstream C changes quotas; banks grow). Lock
the rules now:

- historical result records are **immutable** — never retroactively
  recomputed, re-banded, or deleted when blueprints/banks change;
- blueprints are versioned; new attempts always use the current version;
  records state which version earned them;
- define explicitly whether a qualifying final earned under an older
  blueprint version still opens/honours a retention confirmation under a
  newer one — and the migration story for learners mid-retention-window
  when a version bumps.

---

## 5. Workstream A — Sentence Mastery Examination (flagship)

### 5.1 What you must research

Do genuine literature and precedent research, with citations, on:

1. **Grading free typed translation fairly.** The single hardest problem.
   The Translate & Type grader compares normalized input against the
   row's Korean target **plus its authored `acceptAlso` variants** — an
   enumerated-variant mechanism that already exists (98 rows use it).
   Research how established Korean assessments (TOPIK 쓰기, Sejong
   Institute placement, university placement tests) constrain prompts so
   the target is uniquely recoverable, versus accepting variant sets.
   Then lock the item model into **three classes**:

   1. **Canonical-only items** — the prompt makes one taught response
      uniquely recoverable; graded against the single target (+ existing
      `acceptAlso` contractions where authored).
   2. **Authored finite-variant items** — every accepted response is
      explicitly enumerated and human-reviewed (the `acceptAlso`
      mechanism, possibly extended); no variant enters the accepted set
      by rule alone.
   3. **Excluded items** — the prompt permits too many legitimate
      lexical, particle, register, or word-order alternatives; the row is
      ineligible for typed exam grading (it may still serve recognition
      strands).

   **Prohibited:** automatically accepting broad grammatical
   transformations because they are theoretically valid. A blanket rule
   like "allow subject/topic particle alternation" can silently accept a
   meaning change (은/는 vs 이/가 is contrastive). Prompt design
   eliminates ambiguity first — time adverbs force tense, a named
   addressee forces register; variant enumeration is the safety net, not
   the engine. Every accepted answer must be enumerable at
   authoring/audit time — the grader is deterministic and offline; no
   LLM, no fuzzy scoring at runtime. Estimate what fraction of the bank
   lands in each class and what authoring effort class 2 requires.
2. **Construct definition and strand model.** Define what "sentence
   mastery" means for a finite taught bank: which competencies (tense,
   negation, register, honorifics, particles, connectives, word order,
   copula, modality want/can/must) and which evidence types. Propose a
   macrostrand scheme parallel to the Words exams' R/C/P/X/F/D — reuse
   codes where the construct genuinely matches, introduce new ones only
   with justification. Production via full-sentence typing must dominate;
   recognition MCQs (e.g. choose the correct Korean rendering, spot the
   wrong particle) may support diagnosis but must not carry the
   certification.
3. **Exam structure.** How many exams? Options include: one cumulative
   Sentence Mastery Exam unlocked by finishing the Sentences path; a
   small ladder (e.g. section-band exams + final) mirroring the Words
   suite; or a single exam with a qualifying + retention structure like
   Exam 10. Research retrieval/spacing/interleaving evidence (you may
   reuse the citations already used by the Words spec: Nakata & Suzuki
   2019; Pan et al. 2019; Webb 2009; Edmonds et al. 2022 — plus anything
   newer) and recommend ONE structure with item counts and time limits
   justified by realistic per-item times for *typing full Korean
   sentences on a phone* (measure against TOPIK 쓰기 pacing; typed
   translation is far slower than MCQ — assume 60–120s/item and defend
   your number).
4. **Sampling and coverage.** The bank has 4,177 sentences across 8
   sections/75 units with per-row pattern tags (census in §10.3). Design
   the stratified seeded sampling: pattern-tag quotas (so
   past/future/negation/register each get certain floors), section/unit
   coverage floors, length/difficulty banding, same-surface caps, and how
   sampling behaves when a tag pool is thin. **Produce the general
   minimum-pool formula** — given per-attempt quota, supported ordinary
   retakes, retention no-repeat rules, and same-target/same-surface caps,
   how many distinct eligible rows must a tag have to be examinable? —
   and apply it to every tag in §10.3. This formula is also Workstream
   D's foundation. Define what the audit must verify across seeds (mirror
   the Words audit's 28-point hard-failure contract —
   `docs/CORE_WORD_EXAM_SPECS.md` §9 — adapted to sentences).
5. **Scoring bands and mastery.** Propose pass/distinction bands with
   per-strand floors, and a **Sentences mastered** definition with
   delayed retention confirmation mirroring the Exam 10 contract
   (qualify → 7-day wait → confirmation window → sticky mastery). Justify
   thresholds as provisional achievement standards; keep the
   no-TOPIK/CEFR-claims rule.
6. **Partial credit.** The Hangul exam is all-or-nothing per item; Words
   MCQs are binary. Typed sentences raise the question of per-item
   partial credit (e.g. correct stem, wrong particle). Research scoring
   models (holistic binary vs analytic error-category scoring) and
   recommend one, remembering the grader must be deterministic and
   explainable to a learner in the post-submission review. Binary with
   rich diagnostic tagging is the default hypothesis; argue if you
   disagree.
7. **Diagnostics.** Per-pattern subscores (past, future, negation,
   register, particles, connectives) with minimum-evidence rules (never
   show a percentage from 1–2 items), weak-area routes back to Sentences
   units, and error-axis tagging for typed answers (tense, particle,
   register, spelling, word order, lexical choice).

### 5.2 Constraints specific to this exam

- Runs on the existing Translate & Type surface with the helper ladder
  disabled; Korean keyboard input; NFC normalization; audio prompts
  optional per item type (listening-transcription items are allowed as a
  strand if you justify them — the bank rows all have audio).
- English prompt shown; the learner types Korean. Never the reverse as a
  scored production item (Korean→English typing tests English, not
  Korean).
- Unlock gating: recommend what must be complete (full Sentences path? a
  section band?) consistent with your structure choice.
- Persistence: extend the same versioned pattern (`state.sentenceExams`,
  normalized on load, additive, never mutates learning progress), carrying
  the Workstream 0 provenance fields from day one.

---

## 6. Workstream B — Form Checks (blocked practice diagnostics)

Design the full set as a practice feature under Learn (NOT on the Exam tab,
NOT certifications). For each check: id, name (Korean + English), scope,
item count (8–15), item modes, corrective feedback behaviour (immediate,
per-item, with routing to the exact lesson), repeatability, and which
curriculum milestone unlocks it. The set should at minimum cover:

- Polite present check (Words S1+)
- Past & negation check (Words S3+ — recognition/context now; production
  once Workstream C ships; the check should upgrade automatically)
- Particles & location check (Words S2+)
- Connectives check (Words S3+)
- Register & honorific check (Words S5+)
- Modifier forms check (Words S7+)
- Irregular-family checks, per family (Words S7+)
- Sentence-pattern checks drawing on the Sentences bank (tense, negation,
  word order) once the learner has reached the matching Sentences content.

Research to cite: blocked-vs-interleaved practice literature justifying
"blocked here, mixed in exams" (the Words spec's §1.3 position — extend or
refine it). Deliverable format per §12. Keep it lightweight: these reuse
existing drill surfaces; the plan's value is the *inventory, gating, and
feedback contract*, not novel UI.

---

## 7. Workstream C — Words curriculum: typed past/negation production

Draft the curriculum-change plan that makes typed production of
았/었어요 and 안/못/-지 않다/-지 못하다 *taught*, so the competency map and
Word-exam quotas can unlock it. Cover:

1. Where the lessons go: the live path teaches these in `s3-grammar-u2`
   ("Connecting clauses"), lesson l2, with recognition/context modes only.
   Propose either extending that unit with production lessons or adding a
   dedicated grammar lesson — respecting that unit/lesson IDs, word
   placement, and prerequisites must stay stable for existing learners
   (additive only; migration-safe).
2. Lesson design: typed-production practice modes using the existing
   typing drill surface and the audited inflection engine's
   (`words_inflect.js`) accepted forms; which verbs/adjectives (eligible
   pools exist — the engine already generates these forms; teaching, not
   generation, is the gap).
3. Sequencing research: evidence on production practice after receptive
   introduction (retrieval practice / generation effect literature).
4. The exam consequence, **as versioned change per §4.4**: exactly which
   Word-exam blueprint quotas change once this ships (the blueprints
   currently realise `P` evidence through typed lemma production and
   context-driven register choice), the required competency-map and audit
   updates, a blueprint version bump — and **no retroactive recomputation
   of any existing result**. Answer explicitly: does a pre-change
   qualifying final still open/honour the retention confirmation after
   the quota change?
5. A ready-to-file GitHub issue text for the curriculum gap (the docs
   reference a follow-up issue that was never opened — your draft closes
   that loop).

---

## 8. Workstream D 🔒 — Future-tense sentence expansion proposal

The bank has 52 `future-geoyeyo` rows. **Do the math before the verdict:**
apply the §5.1-4 minimum-pool formula under your recommended exam
structure to determine whether 52 rows are actually insufficient, and for
which uses (ordinary retakes vs retention confirmation vs Form Checks).
Only if the formula shows a shortfall, draft an **owner-decision
proposal**:

- the computed minimum viable pool and the resulting authoring target;
- 3–5 candidate theme packs (consistent with the existing
  K-pop-trainee-flavoured scenario style and the learner's taught
  vocabulary — new sentences may only use curated Words vocabulary), each
  with scope, estimated row count, and which pattern tags each pack would
  enrich (future tense primarily; note secondary enrichment of other thin
  tags — see the census: `copula-negative-anieyo` 23, `neg-mot` 53,
  etc.);
- authoring pipeline notes: rows follow the existing bank schema
  (including `acceptAlso` where variants are legitimate), pass
  `scripts/audit-sentences-data.mjs --strict`, and require audio
  regeneration.

The whole workstream is 🔒 owner-gated: no authoring until the owner picks
themes.

---

## 9. Research standards

- **Cite everything load-bearing** with working links: Korean assessment
  precedent (TOPIK structure/scoring, Sejong Institute materials, National
  Institute of Korean Language curriculum resources), SLA/testing
  literature (interleaving, retrieval practice, receptive/productive
  distinction, writing assessment reliability), and CEFR/ACTFL framing for
  what the exam may and may not claim.
- **Cite the repository** for every claim about current behaviour (file +
  symbol or doc + section), per §1.1.
- Distinguish **evidence-backed recommendations** from **design judgement
  calls** — label each major decision as one or the other.
- Where the literature is mixed, say so and make a cautious call (the
  Words spec's handling of interleaving research is the house style).
- No psychometric overclaiming: all cut scores are provisional until real
  learner calibration; say this in every scoring section.
- Prefer official/primary sources for Korean language-assessment facts.

---

## 10. Ground-truth data facts (verified 2026-07-21 at `55ac8898`)

Reproduce any of these with Appendix A before disputing them; if your
re-derivation at a later commit differs, flag the drift explicitly rather
than silently using new numbers.

### 10.1 Words / Word exams

- Curated bank: **2,028 word senses**; 8 sections, 75 units, 208 content
  lessons + 75 checkpoints (283 lessons total).
- Word-exam suite: 640 scored items per full pass; one pass touches ~520
  distinct words (~26% of the bank); every unit floored at ≥1 item; final
  covers all 75 units every attempt (Layer A).
- Scoring: section pass 75% (floors R≥70, P≥60, X+F≥60), final pass 80%,
  distinction 88–90%, mastery = qualify 88% + strand floors ≥75% + no
  section <70%, then 60-item retention confirmation after 7 days (21-day
  window, ≥80%, P & X+F ≥65%, no section <60%). Sticky once earned.
- Competency map: past-tense/negation = recognition/context only (untaught
  as production); formal register & subject honorific production from
  Section 5; modifier & irregular production from Section 7; **future
  tense absent entirely** (untaught in Words; `words_inflect.js` has no
  future forms).

### 10.2 Sentences curriculum

- Bank: **4,177 rows** (2,117 authored s2061–s4177 + words-core-derived
  rows), each with English, Korean, tokens, register, band, pattern tags,
  an `acceptAlso` accepted-variant array (98 rows non-empty), and
  pre-generated audio. 8 sections, 75 units, **703 lessons**; 199 lessons
  carry past/negation pattern tags.
- Flagship drill: Translate & Type (English → typed Korean) with a
  tip → word bank → next chunk → reveal helper ladder (exam mode = ladder
  off). Listening tab reads the full bank.

### 10.3 Pattern-tag census (complete — all 37 tags, rows per tag)

| Tag | Rows | | Tag | Rows |
|---|---:|---|---|---:|
| `object-eul-reul` | 2,008 | | `counter-phrase` | 115 |
| `present-polite` | 1,963 | | `when-ttae` | 91 |
| `subject-i-ga` | 1,344 | | `can-su-itda` | 79 |
| `past-polite` | 1,044 | | `must-ya-dwaeda` | 79 |
| `topic-neun` | 746 | | `also-do` | 73 |
| `time-expression` | 648 | | `comparison-boda` | 73 |
| `location-e` | 620 | | `want-go-sipda` | 69 |
| `location-eseo` | 433 | | `neg-ji-anta` | 65 |
| `possessive-ui` | 334 | | `neg-an` | 64 |
| `because-aseo` | 284 | | `neg-mot` | 53 |
| `imperative-seyo` | 262 | | **`future-geoyeyo`** | **52** |
| `copula-ieyo` | 256 | | `until-kkaji` | 52 |
| `direction-euro` | 245 | | `propositive-eyo` | 41 |
| `honorific-si` | 237 | | `but-jiman` | 36 |
| `and-go` | 203 | | `only-man` | 36 |
| `question-polite` | 203 | | `from-buteo` | 34 |
| `with-hago-wa` | 191 | | `copula-negative-anieyo` | 23 |
| `formal-nida` | 190 | | | |
| `if-myeon` | 189 | | | |
| `existence-itda` | 171 | | | |

Two distinct row fields describe register — do not conflate them:
`register` (polite 2,055 · everyday 1,983 · formal 122 · honorific 17)
and `speechLevel` (polite informal 2,062 · plain 1,995 · polite formal
120).

### 10.4 Hangul exam (for parallel-structure reference only)

200 items (120 MCQ / 40 typed / 40 drawn); mastery only at 200/200; all 21
vowels + 19 consonants covered in recognition, typing, and handwriting.

---

## 11. Questions you must answer explicitly (the owner will check these)

1. One Sentence exam or a ladder — and why, in terms of learner motivation
   *and* evidence quality?
2. Exactly how does a deterministic offline grader accept legitimate
   variation in typed Korean without accepting errors? Give worked
   examples for at least: particle alternation, word-order permutation,
   tense ambiguity in the English prompt, and register ambiguity — each
   assigned to one of the three §5.1-1 item classes.
3. What per-item time budget and total exam length keep phone typing
   fatigue from contaminating the measurement?
4. What is the minimum-pool formula, and which tags in §10.3 fail it under
   your recommended structure? (52 future rows: sufficient or not — show
   the arithmetic.)
5. Binary items with diagnostic tags, or partial credit — and how is the
   choice explained to a learner reviewing a "wrong" answer?
6. When Workstream C ships, which Word-exam quotas change under a
   blueprint version bump, and what happens to a learner holding a
   pre-change qualifying final or mid-window retention confirmation?
7. What does "Sentences mastered" allow HanaPath to claim about the
   learner, in one sentence, without proficiency-framework overclaiming —
   and how does the Workstream 0 "local achievement, not tamper-proof
   credential" framing appear in learner-facing copy?

---

## 12. Required deliverables — two phases with an owner gate

**Do not produce Phase 2 until the owner has answered Phase 1.** Locking
decisions before speccing prevents fifty pages of ladder design the owner
rejects at the first gate.

### Phase 1 — research and decisions (produce these first, then stop)

1. `EXAM_PROGRAMME_RESEARCH_REPORT.md` — the evidence: literature,
   precedent analysis, repository citations, the minimum-pool
   mathematics, and answers to every §11 question.
2. `EXAM_PROGRAMME_DECISION_MEMO.md` — every decision the owner must make,
   as a numbered menu with your recommendation and the strongest argument
   against it, covering at minimum: exam structure (single vs ladder);
   binary vs partial credit; time budget; accepted-answer policy and
   item-class thresholds; minimum-pool verdict and whether Workstream D
   authoring is needed; integrity model (test-control gating option,
   provenance fields, official-vs-unofficial result labeling); unlock
   gating; mastery/retention parameters.

### Phase 2 — specifications (after the owner locks the memo)

3. `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` — the flagship contract,
   mirroring the structure of `docs/CORE_WORD_EXAM_SPECS.md`: executive
   decision → construct → grading/accepted-answer model → structure &
   blueprints → sampling/coverage → scoring bands & retention → result
   experience → audit contract (numbered hard-failures) → acceptance
   tests → ship checklist → evidence notes.
4. `INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` — Workstream 0: honest-claims
   copy, test-control gating, provenance record schema, versioning and
   immutable-history rules, migration for existing records, audit checks.
5. `FORM_CHECKS_PLAN_DRAFT.md` — Workstream B inventory and contracts.
6. `WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` — Workstream C,
   including the ready-to-file issue text, the versioned exam-quota
   consequences, and the qualifying-final/retention migration answer.
7. `FUTURE_TENSE_EXPANSION_PROPOSAL_DRAFT.md` 🔒 — Workstream D, only if
   the Phase 1 math showed a shortfall; ends in the owner theme menu.

Formatting rules for every deliverable:

- House style: decisive numbered/bulleted contracts, tables for structures
  and quotas, fenced pseudocode for data shapes, explicit "Locked
  decisions" and "Open questions for the owner" sections, 🔒 on every
  owner-gated item.
- Cite real files/symbols per §1.1; `[IMPL: …]` only where inspection
  genuinely cannot settle it.
- Every plan decomposes into a phased queue of one-PR boxes with
  verification steps per box.
- No code beyond illustrative data-shape sketches. No framework proposals.
  No renaming of shipped features. No reopening §2.3 locked decisions.
- State every assumption you could not verify and phrase it as a question
  rather than silently designing on top of it.

---

## 13. What happens after you deliver

1. After Phase 1: the owner answers `EXAM_PROGRAMME_DECISION_MEMO.md`;
   Claude sanity-checks the research report's repository citations against
   the live code.
2. After Phase 2: Claude re-reads every spec against the repository, binds
   any `[IMPL: …]` placeholders, corrects anything that contradicts the
   code or the locked decisions, and lands the edited specs in `docs/` as
   the governing planning documents.
3. Execution models build from the locked specs box-by-box — **Workstream
   0 first**, then data/audit before runner/UI for the Sentence exam,
   following the same discipline as the Hangul and Core Word exam builds
   (audits green before merge, cache bumps, browser acceptance tests,
   draft PRs).

Your drafts succeed if step 2 requires editing only small corrections —
not re-research. Be thorough, be decisive, and show your evidence.

---

## Appendix A — Audit evidence (2026-07-21, commit `55ac88981fdab0eb79cafd1770b25cde25340234`)

All commands run from the repo root with Node ≥ 20. Outputs below are the
actual captured results (summarised where long).

### A.1 Guard audits — all green

```text
$ node scripts/audit-hangul-mastery-exam.mjs
audit-hangul-mastery-exam: OK — 200 items (120 MCQ / 40 typed / 40 drawn), 39 audio tokens verified

$ node scripts/audit-word-exams.mjs          # full mandated seed counts (~20 min)
  audited word-exam-1..4, 6..9: 250 seeds each
  audited word-exam-5: 500 seeds · word-exam-10: 1000 seeds
  audited retention confirmation: 200 seeds
  Final per-unit exposure across 1000 seeds — min 1554, max 6504, mean 2000.0
  (every unit ≥ 1 = Layer A anchor).
Word-exam audit passed (full seed counts).

$ node scripts/build-word-exam-competency-map.mjs --check
Competency map matches live data (checked, not written).
Verified 13 competencies against live curriculum.

$ node scripts/audit-words-data.mjs --strict
Errors: 0 · Warnings: 0 — Words data audit passed (strict).   # 2,028 senses, 283 lessons

$ node scripts/audit-app-shell.mjs            # shell assets 190, cache hanapath-shell-v435
$ node scripts/audit-alphabet-audio.mjs --strict
$ node scripts/audit-hangul-recognition.mjs   # 11,172 syllables + 40 jamo, 0 false accepts
# all passed, 0 errors
```

### A.2 Census commands (reproduce §10 numbers — complete, paste-ready)

**Sentence bank: full pattern-tag census, register/speechLevel counts,
`acceptAlso` usage** (deterministic output: tags sorted by count desc,
then name):

```bash
node -e "
global.window = global;
require('./sentences_core.js');
const rows = window.HANAPATH_SENTENCES;
const count = (field) => {
  const m = new Map();
  for (const r of rows) m.set(r[field], (m.get(r[field]) || 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1]);
};
const tags = new Map();
for (const r of rows) for (const t of r.patternTags || []) tags.set(t, (tags.get(t) || 0) + 1);
console.log('rows=' + rows.length,
  'acceptAlso=' + rows.filter(x => Array.isArray(x.acceptAlso) && x.acceptAlso.length).length);
console.log('register:', JSON.stringify(count('register')));
console.log('speechLevel:', JSON.stringify(count('speechLevel')));
for (const [t, n] of [...tags].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])))
  console.log(String(n).padStart(5), t);
"
```

Captured output (first lines; the 37-tag list matches §10.3 exactly):

```text
rows=4177 acceptAlso=98
register: [["polite",2055],["everyday",1983],["formal",122],["honorific",17]]
speechLevel: [["polite informal",2062],["plain",1995],["polite formal",120]]
 2008 object-eul-reul
 1963 present-polite
 ...
   52 future-geoyeyo
 ...
   23 copula-negative-anieyo
```

**Sentences curriculum shape:**

```bash
node -e "
global.window = global;
require('./sentences_lesson_plan.js');
console.log(window.HANAPATH_SENTENCE_SECTIONS.length,
            window.HANAPATH_SENTENCE_UNITS.length,
            window.HANAPATH_SENTENCE_LESSONS.length)"
# → 8 75 703
```

**Word-exam distinct-target coverage** (seed 12345, one full pass through
all ten exams; per-exam lines sorted by blueprint order):

```bash
node --input-type=module -e "
import fs from 'node:fs'; import vm from 'node:vm';
const sandbox = { window: {} }; sandbox.globalThis = sandbox; vm.createContext(sandbox);
for (const f of ['audio_map.js','words_curated_core.js','words_lesson_plan.js',
                 'words_inflect.js','word_exam_blueprints.js','word_exam_engine.js'])
  vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox);
const W = sandbox.window, ENG = W.HANAPATH_WORD_EXAM_ENGINE;
const union = new Set(); let total = 0;
for (const e of W.HANAPATH_WORD_EXAMS) {
  const a = ENG.generateAttempt(e.id, 12345);
  total += a.items.length;
  a.items.forEach((it) => union.add(it.targetWordId));
  console.log(e.id, a.items.length + ' items',
              new Set(a.items.map((i) => i.targetWordId)).size + ' distinct');
}
console.log('TOTAL', total, 'items;', union.size, 'distinct curated words');
"
```

Captured output:

```text
word-exam-1 40 items 34 distinct    word-exam-6 50 items 46 distinct
word-exam-2 50 items 41 distinct    word-exam-7 50 items 44 distinct
word-exam-3 50 items 44 distinct    word-exam-8 60 items 55 distinct
word-exam-4 50 items 46 distinct    word-exam-9 60 items 55 distinct
word-exam-5 80 items 77 distinct    word-exam-10 150 items 144 distinct
TOTAL 640 items; 520 distinct curated words   (bank: 2,028 senses)
```

### A.3 Structural claims

- `TEST_ENABLE_WORD_SECTION_COMPLETION = true` — `app.js` (comment above it
  mandates owner permission before disabling; handler crowns every
  lesson/checkpoint in a section; `isWordExamUnlocked` →
  `isWordSectionComplete` checks crowned units).
- Hangul mastery condition in `app.js` `submitHangulExam`:
  `mastered = correct === 200 && total === 200 && unanswered === 0`.
- Repo issue tracker contained exactly one issue ever at audit time
  (#316, closed 2026-07-21); no past/negation curriculum issue exists.
