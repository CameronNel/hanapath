# ChatGPT Deep-Research Brief — Completing the HanaPath Examination Programme

> **How this document is used.** The owner pastes this entire file into ChatGPT
> (deep-research / browsing mode). ChatGPT returns the Markdown deliverables
> defined in §12. Claude then edits those drafts into repository planning docs,
> and other models execute them one PR at a time. You (ChatGPT) are the
> **researcher and first drafter**, not the implementer: you never see the
> code, you produce evidence-backed specifications precise enough that a model
> with full repo access can build from them without guessing.
>
> Written 2026-07-21, immediately after a full audit of the shipped exam
> section. Every number in §10 was re-derived from the live data on `main`
> that day — treat them as ground truth and cite them as "repo audit
> 2026-07-21" rather than re-estimating.

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
gaps, in priority order:

- **Workstream A (flagship):** a **Sentence Mastery Examination** — the third
  exam pillar, certifying *production* of sentence-level grammar: past tense,
  future tense, negation, register, honorifics, particles, connectives —
  through typed Korean translation.
- **Workstream B:** **Form Checks** — short, blocked, corrective practice
  diagnostics (e.g. "Past & negation check") under the Learn tab. Specced in
  the Words exam contract (§3.5 there) but never built.
- **Workstream C:** a **Words-curriculum extension teaching typed
  past/negation production**, which unlocks scored production quotas the Word
  exams currently (and correctly) refuse to assign.
- **Workstream D:** a **future-tense content expansion proposal** for the
  sentence bank, because 52 future-tense sentences is too thin a pool to
  examine from. Theme choices are owner-gated; you propose, the owner picks.
- **Workstream E (small):** **exam-integrity hardening** — the shipped app
  contains an owner-mandated developer button that instantly completes a
  Words section, which also unlocks that section's exam.

**Explicitly out of scope:** pronunciation/speaking assessment. The owner has
deferred it. Do not design it, but Workstream A's construct definition should
note where a future speaking exam would attach, so nothing you design blocks
it.

---

## 1. What HanaPath is (context you must respect)

HanaPath is a **vanilla static Korean-learning PWA** built for one learner
persona: an English speaker starting from zero, learning on a phone.

Technical constraints that shape every plan you write:

- **No framework, no bundler, no build step.** One large plain browser script
  (`app.js`, ~24k lines) plus plain-JS data files loaded as browser globals
  via `<script defer>` before it. This is an owner hard rule; never propose
  React, TypeScript, a test framework, or a server.
- **All state is client-side** in `localStorage` (key `hanapath-v1`),
  normalized/backfilled on load. Persistence plans must be additive and
  backward-compatible: old saves must never lose progress.
- **Offline-first PWA** with a service-worker shell cache; every changed
  asset needs a cache-version bump. Audio is pre-generated MP3 per Korean
  string (no runtime TTS); any new Korean text requires regenerating audio
  assets through an existing offline pipeline.
- **Determinism is a design value.** Exams are generated from seeds by a pure
  engine so the browser runner and the Node audit script produce identical
  items. Selection is never personalised from SRS or lesson history.
- **Node audit scripts are the guardrails.** There is no test framework;
  every data contract is enforced by an audit script that hard-fails.
  Any plan you draft must include its audit contract.
- **Workflow:** every shippable unit of work is one small draft PR
  ("one box = one PR"); the owner reviews and squash-merges. Your plans must
  decompose into such boxes.

The app's three learning pillars and their status:

| Pillar | Status | Exam status |
|---|---|---|
| **Alphabet (Hangul)** | Complete, protected | ✅ Hangul Mastery Examination shipped |
| **Words** (2,028 curated senses, 8 sections, 75 units, 208 content lessons) | Shipped v2 curriculum | ✅ Ten-exam Core Word Suite shipped |
| **Sentences** (4,177-row bank, 8 sections, 75 units, 703 lessons) | Shipped v2 curriculum; flagship drill is **Translate & Type** | ❌ **No exam — this is Workstream A** |

**Translate & Type** (the Sentences flagship you will design the exam around):
the learner sees an English prompt and types the Korean translation in Hangul.
During *learning*, a helper ladder assists: tip → word bank → next chunk →
reveal. The grader normalizes and compares against the target sentence. An
exam mode would run this surface with the helper ladder disabled.

---

## 2. The shipped examination estate (do not redesign it)

You are extending a working system. Its conventions are precedent, and your
drafts should feel like siblings of the two existing contracts.

### 2.1 Hangul Mastery Examination (precedent for "mastery = perfection")

- 200 items: 120 six-option MCQs, 40 Korean-keyboard typed, 40 drawn from
  memory on a blank canvas graded by a stroke recognizer.
- Mastery **only** at 200/200 with zero unanswered; no partial credit.
- Forward-only runner, 90-minute countdown, audio ≤ 2 plays/item, no hints or
  feedback until submission, full answer review after.

### 2.2 Core Word Examination Suite (precedent for "achievement = sampled")

- Ten exams: eight section exams (40–60 items), one midterm (80), one
  cumulative final (150). 640 scored items per full pass.
- Items are generated per attempt from a **seeded, stratified, pure engine**;
  no frozen banks. The same engine runs in the browser and in the audit.
- Every item has one primary **macrostrand**: `R` receptive, `C` cued
  selection, `P` controlled production (typed), `X` contextual use, `F`
  form/register control, `D` lexical depth. Blueprints fix per-strand quotas.
- Pass = 75% (final 80%) with per-strand floors; Distinction = 88–90%;
  **Core Words mastered** requires a qualifying final (≥88% + strand floors)
  and then a **60-item retention confirmation 7 days later** (21-day window,
  new seed, no repeated targets). Mastery is sticky once earned.
- A **competency milestone map** proves every scored form was explicitly
  taught before any exam tests it. This gate is why past/negation production
  is currently unscored (see Workstream C) — the map is honest, not lazy.
- Cut scores are described in-product as provisional HanaPath achievement
  standards, never TOPIK/CEFR equivalence.

### 2.3 Locked owner decisions you must not reopen

1. `Learn · Exam · Progress` is the tab structure; new exams go on the Exam
   tab beneath Core Words.
2. **No standalone form-named exams** ("Past Tense Exam"). Forms are mixed in
   realistic contexts inside broader exams; blocked practice belongs in Form
   Checks. Prompts must never name the required form ("use the past tense") —
   context must force it.
3. Recognition MCQs are four-option in Words-style exams; the six-option
   format is Hangul-exam-only.
4. Exams are generated, seeded, deterministic, never personalised.
5. No hints, no feedback before submission, audio ≤ 2 plays, quit discards,
   timeout submits; full answer review after submission.
6. Exams never gate, re-lock, or mutate normal learning progression or SRS.
7. Mastery claims require delayed retention evidence (the Exam 10 precedent).
8. The app stays vanilla/static; audits guard every data contract.
9. Authored Korean content (new sentences) requires **owner approval of
   themes** before any authoring starts.

---

## 3. Verified gap analysis (2026-07-21 audit)

1. **Sentence-level grammar production is taught but never examined.** The
   Sentences path teaches past/future/negation/register through 703 lessons
   and drills production via Translate & Type — and no exam certifies any of
   it. Meanwhile the Words exams *cannot* test future tense at all: the Words
   curriculum never teaches it and the Words inflection engine cannot even
   generate future forms. Tense production certification therefore belongs to
   a Sentences exam by necessity, not preference.
2. **Form Checks don't exist.** The Words exam spec prescribes 8–15-item
   blocked corrective diagnostics under Learn; zero are built.
3. **Typed past/negation production is untaught in Words.** The Words
   curriculum teaches 았/었어요 and 안/못/-지 않다/-지 못하다 receptively
   (recognition + context) in one Section 3 grammar lesson. Because the
   competency gate is honest, the Word exams score these only as
   recognition/context. A promised follow-up curriculum issue was never
   actually opened.
4. **Future-tense sentence content is thin:** 52 rows tagged `future-geoyeyo`
   out of 4,177 — too few for seeded exam sampling with fresh-seed retakes.
5. **Integrity:** `TEST_ENABLE_WORD_SECTION_COMPLETION = true` ships a live
   button that crowns an entire Words section, unlocking its exam without
   study. Owner-mandated for testing; needs a hardening story before real
   students are examined.

---

## 4. Workstream A — Sentence Mastery Examination (flagship)

### 4.1 What you must research

Do genuine literature and precedent research, with citations, on:

1. **Grading free typed translation fairly.** The single hardest problem.
   Translate & Type currently grades against one target sentence. An exam
   needs a defensible accepted-answer model: word-order variation, optional
   topic/subject particle alternation (은/는 vs 이/가), particle omission
   legitimacy in polite speech, synonym substitution, spacing variation,
   multiple valid tense readings of an English prompt, and honorific-level
   ambiguity. Research how established Korean assessments (TOPIK 쓰기,
   Sejong Institute placement, university placement tests) constrain prompts
   so the target is uniquely recoverable, versus accepting variant sets.
   Recommend a concrete policy: prompt-design constraints first (time
   adverbs force tense; named addressee forces register), finite
   accepted-variant generation second, and where a variant set is
   infeasible, item exclusion. Every accepted answer must be enumerable at
   authoring/audit time — the grader is deterministic and offline; no LLM,
   no fuzzy scoring at runtime.
2. **Construct definition and strand model.** Define what "sentence mastery"
   means for a finite taught bank: which competencies (tense, negation,
   register, honorifics, particles, connectives, word order, copula,
   modality want/can/must) and which evidence types. Propose a macrostrand
   scheme parallel to the Words exams' R/C/P/X/F/D — reuse codes where the
   construct genuinely matches, introduce new ones only with justification.
   Production via full-sentence typing must dominate; recognition MCQs
   (e.g. choose the correct Korean rendering, spot the wrong particle) may
   support diagnosis but must not carry the certification.
3. **Exam structure.** How many exams? Options include: one cumulative
   Sentence Mastery Exam unlocked by finishing the Sentences path; a small
   ladder (e.g. section-band exams + final) mirroring the Words suite; or a
   single exam with a qualifying + retention structure like Exam 10.
   Research retrieval/spacing/interleaving evidence (you may reuse the
   citations already used by the Words spec: Nakata & Suzuki 2019; Pan et
   al. 2019; Webb 2009; Edmonds et al. 2022 — plus anything newer) and
   recommend ONE structure with item counts and time limits justified by
   realistic per-item times for *typing full Korean sentences on a phone*
   (measure against TOPIK 쓰기 pacing; typed translation is far slower than
   MCQ — assume 60–120s/item and defend your number).
4. **Sampling and coverage.** The bank has 4,177 sentences across 8
   sections/75 units with per-row pattern tags (census in §10.3). Design the
   stratified seeded sampling: pattern-tag quotas (so past/future/negation/
   register each get certain floors), section/unit coverage floors, length/
   difficulty banding, same-surface caps, and how sampling behaves when a
   tag pool is thin (future tense until Workstream D lands). Define what the
   audit must verify across seeds (mirror the Words audit's 28-point hard-
   failure contract — §9 of the Core Word spec — adapted to sentences).
5. **Scoring bands and mastery.** Propose pass/distinction bands with
   per-strand floors, and a **Sentences mastered** definition with delayed
   retention confirmation mirroring the Exam 10 contract (qualify → 7-day
   wait → confirmation window → sticky mastery). Justify thresholds as
   provisional achievement standards; keep the no-TOPIK/CEFR-claims rule.
6. **Partial credit.** The Hangul exam is all-or-nothing per item; Words MCQs
   are binary. Typed sentences raise the question of per-item partial credit
   (e.g. correct stem, wrong particle). Research scoring models (holistic
   binary vs analytic error-category scoring) and recommend one, remembering
   the grader must be deterministic and explainable to a learner in the
   post-submission review. Binary with rich diagnostic tagging is the
   default hypothesis; argue if you disagree.
7. **Diagnostics.** Per-pattern subscores (past, future, negation, register,
   particles, connectives) with minimum-evidence rules (never show a
   percentage from 1–2 items), weak-area routes back to Sentences units, and
   error-axis tagging for typed answers (tense, particle, register,
   spelling, word order, lexical choice).

### 4.2 Constraints specific to this exam

- Runs on the existing Translate & Type surface with the helper ladder
  disabled; Korean keyboard input; NFC normalization; audio prompts optional
  per item type (listening-transcription items are allowed as a strand if
  you justify them — the bank rows all have audio).
- English prompt shown; the learner types Korean. Never the reverse as a
  scored production item (Korean→English typing tests English, not Korean).
- Unlock gating: recommend what must be complete (full Sentences path? a
  section band?) consistent with your structure choice.
- Persistence: extend the same versioned pattern (`state.sentenceExams`,
  normalized on load, additive, never mutates learning progress).

---

## 5. Workstream B — Form Checks (blocked practice diagnostics)

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

## 6. Workstream C — Words curriculum: typed past/negation production

Draft the curriculum-change plan that makes typed production of
았/었어요 and 안/못/-지 않다/-지 못하다 *taught*, so the competency map and
Word-exam quotas can unlock it. Cover:

1. Where the lessons go: the live path teaches these in Section 3's
   "Connecting clauses" grammar unit (`s3-grammar-u2`, lesson l2) with
   recognition/context modes only. Propose either extending that unit with
   production lessons or adding a dedicated grammar lesson — respecting that
   unit/lesson IDs, word placement, and prerequisites must stay stable for
   existing learners (additive only; migration-safe).
2. Lesson design: typed-production practice modes using the existing typing
   drill surface and the audited inflection engine's accepted forms; which
   verbs/adjectives (eligible pools exist — the inflection engine already
   generates these forms; teaching, not generation, is the gap).
3. Sequencing research: evidence on production practice after receptive
   introduction (retrieval practice / generation effect literature).
4. The exam consequence: exactly which Word-exam quotas should change once
   this ships (the blueprints currently realise `P` evidence through typed
   lemma production and context-driven register choice), and the required
   competency-map/audit updates.
5. A ready-to-file GitHub issue text for the curriculum gap (the docs
   reference a follow-up issue that was never opened — your draft closes
   that loop).

---

## 7. Workstream D — Future-tense sentence expansion proposal

The bank has 52 `future-geoyeyo` rows. For a seeded exam with fresh-seed
retakes and a retention confirmation that avoids repeated targets, estimate
the minimum viable pool (justify with the sampling math from Workstream A —
target exposure, no-repeat windows, same-surface caps) and draft an
**owner-decision proposal**:

- 3–5 candidate theme packs (consistent with the existing K-pop-trainee-
  flavoured scenario style and the learner's taught vocabulary — new
  sentences may only use curated Words vocabulary), each with scope,
  estimated row count, and which pattern tags each pack would enrich
  (future tense primarily; note secondary enrichment of other thin tags —
  see the census: `copula-negative-anieyo` 23, `neg-mot` 53, etc.).
- Authoring pipeline notes: rows follow the existing bank schema, pass the
  sentences audit, and require audio regeneration.
- Mark the whole workstream 🔒 owner-gated: no authoring until the owner
  picks themes.

---

## 8. Workstream E — Exam integrity hardening (small)

Propose a minimal, owner-friendly policy for the section-crowning test
button so certification claims survive: options include hiding it behind a
query flag like the existing `?__wetest=1` acceptance hook, marking exam
records earned after test-crowning as unofficial, or an owner setting.
Constraint: the owner explicitly mandated the button's existence — the
proposal must preserve their workflow, so removal is off the table.
One page maximum; present 2–3 options with a recommendation.

---

## 9. Research standards

- **Cite everything load-bearing** with working links: Korean assessment
  precedent (TOPIK structure/scoring, Sejong Institute materials, National
  Institute of Korean Language curriculum resources), SLA/testing literature
  (interleaving, retrieval practice, receptive/productive distinction,
  writing assessment reliability), and CEFR/ACTFL framing for what the exam
  may and may not claim.
- Distinguish **evidence-backed recommendations** from **design judgement
  calls** — label each major decision as one or the other.
- Where the literature is mixed, say so and make a cautious call (the Words
  spec's handling of interleaving research is the house style).
- No psychometric overclaiming: all cut scores are provisional until real
  learner calibration; say this in every scoring section.
- Prefer official/primary sources for Korean language-assessment facts.

---

## 10. Ground-truth data facts (verified 2026-07-21 — do not re-estimate)

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
  Section 5; modifier & irregular production from Section 7; **future tense
  absent entirely** (untaught in Words; inflection engine has no future
  forms).

### 10.2 Sentences curriculum

- Bank: **4,177 rows** (2,117 authored s2061–s4177 + words-core-derived
  rows), each with English, Korean, tokens, register, band, pattern tags,
  and pre-generated audio. 8 sections, 75 units, **703 lessons**; 199
  lessons carry past/negation pattern tags.
- Flagship drill: Translate & Type (English → typed Korean) with a
  tip → word bank → next chunk → reveal helper ladder (exam mode = ladder
  off). Listening tab reads the full bank.

### 10.3 Pattern-tag census (rows per tag, key tags)

| Tag | Rows | | Tag | Rows |
|---|---:|---|---|---:|
| `present-polite` | 1,963 | | `imperative-seyo` | 262 |
| `past-polite` | 1,044 | | `honorific-si` | 237 |
| `object-eul-reul` | 2,008 | | `formal-nida` | 190 |
| `subject-i-ga` | 1,344 | | `if-myeon` | 189 |
| `topic-neun` | 746 | | `existence-itda` | 171 |
| `time-expression` | 648 | | `must-ya-dwaeda` | 79 |
| `location-e` | 620 | | `can-su-itda` | 79 |
| `location-eseo` | 433 | | `want-go-sipda` | 69 |
| `possessive-ui` | 334 | | `neg-ji-anta` | 65 |
| `because-aseo` | 284 | | `neg-an` | 64 |
| `copula-ieyo` | 256 | | `neg-mot` | 53 |
| `direction-euro` | 245 | | **`future-geoyeyo`** | **52** |
| `and-go` | 203 | | `copula-negative-anieyo` | 23 |

Registers: polite ≈ 2,055 · plain ≈ 1,995 · formal ≈ 122.

### 10.4 Hangul exam (for parallel-structure reference only)

200 items (120 MCQ / 40 typed / 40 drawn); mastery only at 200/200; all 21
vowels + 19 consonants covered in recognition, typing, and handwriting.

---

## 11. Questions you must answer explicitly (the owner will check these)

1. One Sentence exam or a ladder — and why, in terms of learner motivation
   *and* evidence quality?
2. Exactly how does a deterministic offline grader accept legitimate
   variation in typed Korean without accepting errors? Give worked examples
   for at least: particle alternation, word-order permutation, tense
   ambiguity in the English prompt, and register ambiguity.
3. What per-item time budget and total exam length keep phone typing
   fatigue from contaminating the measurement?
4. What minimum tag-pool size makes a pattern examinable with fresh-seed
   retakes, and which tags fail that bar today (given §10.3)?
5. Binary items with diagnostic tags, or partial credit — and how is the
   choice explained to a learner reviewing a "wrong" answer?
6. When Workstream C ships, which Word-exam quotas change, and does any
   existing learner's stored result need migration?
7. What does "Sentences mastered" allow HanaPath to claim about the learner,
   in one sentence, without proficiency-framework overclaiming?

---

## 12. Required deliverables (all Markdown, in this order)

Produce **six separate .md documents**, each self-contained, titled exactly:

1. `SENTENCE_EXAM_RESEARCH_REPORT.md` — the evidence: literature, precedent
   analysis, and answers to every §11 question, with citations.
2. `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` — the flagship draft contract,
   mirroring the structure of the Core Word exam spec: executive decision →
   construct → grading/accepted-answer model → structure & blueprints →
   sampling/coverage → scoring bands & retention → result experience →
   audit contract (numbered hard-failures) → acceptance tests → ship
   checklist → evidence notes.
3. `FORM_CHECKS_PLAN_DRAFT.md` — Workstream B inventory and contracts.
4. `WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` — Workstream C, including
   the ready-to-file issue text and the exam-quota consequences.
5. `FUTURE_TENSE_EXPANSION_PROPOSAL_DRAFT.md` — Workstream D, ending in an
   explicit owner-decision menu (🔒).
6. `EXAM_INTEGRITY_NOTE.md` — Workstream E, one page.

Formatting rules for every deliverable:

- House style: decisive numbered/bulleted contracts, tables for structures
  and quotas, fenced pseudocode for data shapes, explicit "Locked decisions"
  and "Open questions for the owner" sections, 🔒 on every owner-gated item.
- Write for a coding model with full repo access as the reader: name the
  concepts (engines, state keys, audit scripts) descriptively; never invent
  file paths or function names — where you need one, write
  `[IMPL: existing sentence grader]` style placeholders for Claude to bind
  to real symbols during the edit pass.
- Every plan decomposes into a phased queue of one-PR boxes with
  verification steps per box.
- No code beyond illustrative data-shape sketches. No framework proposals.
  No renaming of shipped features. No reopening §2.3 locked decisions.
- State every assumption you could not verify and phrase it as a question
  rather than silently designing on top of it.

---

## 13. What happens after you deliver

1. Claude re-reads your six documents against the live repository, binds
   every `[IMPL: …]` placeholder to real symbols, corrects anything that
   contradicts the code or the locked decisions, and lands the edited specs
   in `docs/` as the governing planning documents.
2. The owner reviews the decision menus (exam structure, thresholds, theme
   packs, integrity option) and locks them.
3. Execution models build from the locked specs box-by-box: data/audit
   first, runner/UI second, following the same discipline as the Hangul and
   Core Word exam builds (audits green before merge, cache bumps, browser
   acceptance tests, draft PRs).

Your drafts succeed if step 1 requires editing only bindings and small
corrections — not re-research. Be thorough, be decisive, and show your
evidence.
