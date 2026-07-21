# Paste-ready ChatGPT Phase 2 prompt — the four commissioned specifications

> **Owner instructions (not part of the prompt):** open the same ChatGPT
> deep-research context that produced Phase 1 (or a fresh one). Attach
> `docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md` and
> `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`, plus your Phase 1 outputs
> (`docs/EXAM_PROGRAMME_RESEARCH_REPORT.md`,
> `docs/EXAM_PROGRAMME_DECISION_MEMO.md`) if the context is fresh. Connect
> `CameronNel/hanapath` read-only if possible (audited application baseline:
> `main @ 55ac88981fdab0eb79cafd1770b25cde25340234`). Then paste everything
> below the line.

---

Phase 1 is accepted and the decision gate is **closed**. The owner has
locked every decision in `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`
(attached / in the repo): all recommended A options, except **Decision 15 =
Option B** and a **scope amendment to Decision 6**. Read that file first —
it is now as binding as the research brief's §2.3 locked decisions, and
nothing in it may be reopened, re-argued, or silently adjusted.

Two amendments deserve your special attention:

1. **Decision 6 (scoped):** the graduated subscore guard applies to the
   new Sentence exam **only**. Do not change Words-suite reporting
   (`MIN_SUBSCORE_ITEMS = 3` stands). The Sentence spec must contain an
   explicit "known inconsistency" note stating that the two suites use
   different subscore-evidence rules and that harmonisation is a separate
   owner decision deferred until Sentence pilot data exists.
2. **Decision 15 = B:** the result card shows the short line — "You
   demonstrated and retained the taught HanaPath sentence patterns in this
   device-local assessment." — with the full Option A disclosure (including
   "not proctored or tamper-proof credentials") immediately accessible in
   the result details and in documentation.

**Phase 2 scope is FOUR specifications, not five.** Per locked Decision 8A,
`FUTURE_TENSE_EXPANSION_PROPOSAL_DRAFT.md` is not commissioned: your own
Phase 1 mathematics showed `future-geoyeyo` needs 25 eligible targets
against 52 raw rows. Instead, the Sentence exam spec must define the
eligibility census that computes `E_t` for every pattern tag and **fails
loudly** if `E_future < 25` (or any locked quota's floor is breached),
which would re-trigger the 🔒 Workstream D owner decision.

## Produce these four documents

Follow the research brief §12's formatting rules (house style, repo
citations per §1.1, `[IMPL: …]` only where inspection cannot settle it,
one-PR-box phased queues, "Locked decisions" and "Open questions for the
owner" sections, 🔒 on owner-gated items, no code beyond data-shape
sketches). Structure the flagship spec as a sibling of
`docs/CORE_WORD_EXAM_SPECS.md`.

### 1. `INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` — Workstream 0, ships first

From locked Decisions 11, 12, 15 and your Phase 1 §7:

- Query-gated section-completion control (reuse the existing private
  test-mode/query pattern precedent); persistent local taint events
  (section IDs, timestamp, app version, control ID); taint propagation
  into any exam attempt whose scope intersects a tainted section.
- `Practice result` vs `HanaPath result` labeling; tainted attempts never
  qualify for mastery/retention; no "official"/"verified" wording
  anywhere; the Decision 15 two-layer claim copy.
- Full provenance schema (the memo's field list) on all new results;
  additive, backward-compatible migration for existing Hangul and Words
  records; `legacy-incomplete` marker; immutable history; checksum ≠
  authenticity.
- Audit contract: numbered hard-failures for taint propagation, label
  correctness, provenance completeness, migration safety.
- Browser acceptance tests and a one-PR-box execution queue.

### 2. `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` — the flagship

From locked Decisions 1–10 and your Phase 1 §§3–6, 8–9: executive
decision → construct and strand definitions (sentence-specific labels
under `P/F/X/R/C`) → the three-class accepted-answer model and grading
contract (NFC + trim + whitespace-collapse only; max four `acceptAlso`
strings; prohibited transformations enumerated) → row-eligibility
metadata, review queue, and the eligibility census/audit (per-tag `E_t`,
fail-loudly floors, `E_future < 25` re-trigger) → five blueprints + the
retention mode with exact item counts, strand quotas, per-tag floors,
unlock milestones, and time limits → seeded sampling and freshness
(five-attempt window, attempt-history storage, canonical target keys,
fallback behaviour) → scoring bands (provisional, with the standard-
setting and pilot-calibration gates) → result experience (Decision 6
graduated guard + the explicit cross-suite inconsistency note; Decision
15-B claim copy; diagnostics, weak-area routes, error-axis tags) →
persistence (`state.sentenceExams` with day-one provenance) → audit
contract (numbered hard-failures across mandated seed counts, mirroring
the Words audit's rigor) → browser acceptance tests → ship checklist →
one-PR-box queue (data/eligibility/audit boxes before runner/UI boxes).
Include the response-time instrumentation requirement and the timing
pilot before limits are declared stable.

### 3. `FORM_CHECKS_PLAN_DRAFT.md`

From the brief §5 and your Phase 1 §6.2: the full inventory (polite
present; past & negation — auto-upgrading when Workstream C ships;
particles & location; connectives; register & honorific; modifier forms;
irregular families per family; sentence-pattern checks), each with id,
bilingual name, scope, 8–15 items, modes, immediate corrective feedback
with exact-lesson routing, repeatability (sample-with-replacement across
sessions, unique targets within one check), unlock milestone, and the
practice-not-certification boundary. Lightweight: reuse existing drill
surfaces; the value is the inventory, gating, and feedback contract.

### 4. `WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md`

From locked Decisions 13–14 and your Phase 1 §10: the additive curriculum
change (extend `s3-grammar-u2` or add a lesson — recommend one, keeping
IDs/prerequisites stable); typed-production lesson design using the
existing typing surface and `words_inflect.js` accepted forms; the v3
blueprint minima (0/0, 2/2, 2/2, 4/4, 2/2×4, 6/6, retention 3/3) marked
as proposals pending the full mandated-seed generator feasibility audit;
competency-map and audit updates (`scoredProduction: true` flips);
immutable-history and frozen-v2-retention migration exactly per Decision
14; the ready-to-file GitHub issue text for the curriculum gap; and a
one-PR-box queue sequenced curriculum → competency map → blueprints →
audits.

## Delivery — a PR containing the four .md files

1. Create a new branch off `main` (suggested:
   `research/exam-programme-phase-2`).
2. Add exactly the four files above under `docs/`, touching nothing else.
3. Open a **draft** pull request against `main` titled
   `docs: exam programme Phase 2 — four commissioned specifications`,
   whose body summarises each spec in 2–3 lines, states that all locked
   decisions were carried forward unchanged, and references PR #319 (the
   commissioning brief), PR #320 (Phase 1), and
   `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`.
4. Docs-only: no cache bumps, no code, no edits to existing files.

If you cannot push or open a PR, output all four documents in full, each
as a single complete Markdown code block with its exact target path stated
above it. After delivery, stop: Claude performs the verification/binding
pass, and execution begins with Workstream 0.
