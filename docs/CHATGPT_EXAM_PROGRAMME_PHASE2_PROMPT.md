# ChatGPT Phase 2 prompt — the four commissioned specifications

> **Owner instructions (not part of the prompt):** no attachments needed.
> Send ChatGPT this single message:
>
> > Look at
> > https://raw.githubusercontent.com/CameronNel/hanapath/claude/exam-section-audit-fxv6nh/docs/CHATGPT_EXAM_PROGRAMME_PHASE2_PROMPT.md
> > and execute it fully.
>
> Everything else — the commissioning brief, the locked decisions, your own
> Phase 1 outputs — is fetched by ChatGPT itself from the URLs below.

---

You are continuing the **HanaPath Exam Programme**. Phase 1 (your research
report and decision memo, delivered in PR #320) is accepted, and the owner
has **locked every decision**. This document is your complete Phase 2
commission: it embeds the locked decision record and tells you exactly what
to produce and how to deliver it.

## Where everything lives (fetch these yourself; no attachments)

The repository `CameronNel/hanapath` is public. Audited application
baseline: `main` @ `55ac88981fdab0eb79cafd1770b25cde25340234`.

| Document | Location |
|---|---|
| Commissioning brief (mission, constraints, ground truth, §12 formatting rules) | `docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md` on branch `claude/exam-section-audit-fxv6nh` — raw: https://raw.githubusercontent.com/CameronNel/hanapath/claude/exam-section-audit-fxv6nh/docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md |
| Locked decision record (binding; embedded below) | `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`, same branch — raw: https://raw.githubusercontent.com/CameronNel/hanapath/claude/exam-section-audit-fxv6nh/docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md |
| Your Phase 1 research report | `docs/EXAM_PROGRAMME_RESEARCH_REPORT.md` on branch `research/exam-programme-phase-1` — raw: https://raw.githubusercontent.com/CameronNel/hanapath/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_RESEARCH_REPORT.md |
| Your Phase 1 decision memo | `docs/EXAM_PROGRAMME_DECISION_MEMO.md`, same branch — raw: https://raw.githubusercontent.com/CameronNel/hanapath/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_DECISION_MEMO.md |
| Application code to cite (engines, blueprints, audits, specs) | `main` @ the audited baseline SHA |

Read the brief and the locked record completely before drafting. The
brief's §12 formatting rules and §1.1 repository-citation rules apply to
every deliverable.

## The locked decisions (binding — embedded verbatim summary)

All fifteen decisions from your Phase 1 memo are locked as the recommended
**Option A**, with two exceptions/amendments:

| # | Decision | Locked |
|---|---|---|
| 1 | Structure | A — four stage exams (after Sentences sections 2, 4, 6, 8) + cumulative final + delayed retention confirmation |
| 2 | Length/mix | A — 80% typed; 24/50/25 items; 40/75/40 min; 90s/20s planning; no per-item timer; response-time instrumentation |
| 3 | Strands | A — reuse `P/F/X/R/C`, sentence-specific labels, pattern tags secondary |
| 4 | Answers | A — three classes; max **four** reviewed `acceptAlso` strings; NFC + trim + whitespace-collapse only; no automatic transformations |
| 5 | Scoring | A — binary + non-scoring diagnostic tags |
| 6 | Subscores | A **scoped: Sentence exam only** (see amendment) |
| 7 | Freshness | A — five-attempt disjoint window, `c=1`; retention avoids qualifier; `M_t = max(5q_t, q_t + r_t)` |
| 8 | Future tense 🔒 | A — **no authoring**; eligibility audit required; re-trigger only if `E_future < 25` |
| 9 | Unlocks | A — cumulative two-section milestones |
| 10 | Bands | A — provisional (stage 75%, final 80%, qualify 88%, retention 84% = 21/25, 7/21-day window, sticky mastery) |
| 11 | Integrity | A — query-gated test control + persistent taint; `Practice result` vs `HanaPath result`; no "official"/"verified" labels |
| 12 | Provenance | A — full schema, immutable history, `legacy-incomplete` backfill, checksum ≠ authenticity |
| 13 | Words v3 | A — typed past/negation minima inside existing P/F allocations (0/0, 2/2, 2/2, 4/4, 2/2×4, 6/6, retention 3/3), pending generator audit |
| 14 | v2 migration | A — frozen v2 retention during live windows; mastery pairs never cross major versions |
| 15 | Claim copy | **B** (see amendment) |

**Amendment to Decision 6 (owner, verbatim intent):** the graduated
subscore guard (0–4 no percentage; 5–7 directional + `n/N`; 8+ percentage;
10+ floor-eligible after pilot) applies **to the new Sentence exam only**.
Words-suite reporting (`MIN_SUBSCORE_ITEMS = 3`) is unchanged in this
workstream. The Sentence spec must carry an explicit "known inconsistency"
note; cross-suite harmonisation is a separate owner decision deferred until
Sentence pilot data exists.

**Amendment to Decision 15 (owner, verbatim wording):** result card shows:

> You demonstrated and retained the taught HanaPath sentence patterns in
> this device-local assessment.

The full disclosure **must remain immediately accessible** in result
details and documentation:

> HanaPath Sentence Mastery records that, under this version of HanaPath's
> local assessment, you produced the taught sentence patterns accurately
> and retained that performance after a delayed confirmation. Results are
> stored on this device and are not proctored or tamper-proof credentials.

Nothing above may be reopened, re-argued, or silently adjusted. If a locked
decision proves infeasible during drafting, flag it in an "Open questions
for the owner" section — do not redesign around it.

**Phase 2 scope is FOUR specifications, not five.** Per locked Decision 8A,
`FUTURE_TENSE_EXPANSION_PROPOSAL_DRAFT.md` is not commissioned: your Phase
1 mathematics showed `future-geoyeyo` needs 25 eligible targets against 52
raw rows. Instead, the Sentence exam spec must define the eligibility
census that computes `E_t` for every pattern tag and **fails loudly** if
`E_future < 25` (or any locked quota's floor is breached), which would
re-trigger the 🔒 Workstream D owner decision.

## Produce these four documents

Structure the flagship spec as a sibling of `docs/CORE_WORD_EXAM_SPECS.md`.

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
