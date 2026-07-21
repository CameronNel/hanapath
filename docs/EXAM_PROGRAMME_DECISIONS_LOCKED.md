# Exam Programme — Locked Phase 1 Decisions

> **Status: LOCKED by the owner, 2026-07-21.** This file is the binding
> record of the owner's answers to `docs/EXAM_PROGRAMME_DECISION_MEMO.md`
> (delivered in PR #320 from `research/exam-programme-phase-1`, evidence in
> `docs/EXAM_PROGRAMME_RESEARCH_REPORT.md`). Phase 2 specifications and all
> execution work must carry these decisions forward without reopening them.
> Amendments require a new explicit owner decision.

## Locked selections

| # | Decision | Locked option |
|---|---|---|
| 1 | Sentence exam structure | **A** — four stage exams (after Sentences sections 2, 4, 6, 8) + cumulative final + delayed retention confirmation |
| 2 | Item mix, length, time | **A** — 80% typed production; 24/50/25 items; 40/75/40 minutes; 90s/20s planning assumptions; no per-item timer; response-time instrumentation required |
| 3 | Macrostrand model | **A** — reuse `P/F/X/R/C` with sentence-specific labels; pattern tags as secondary diagnostics |
| 4 | Accepted-answer policy | **A** — three classes (canonical-only / authored finite-variant / excluded); max **four** reviewed `acceptAlso` strings; normalization limited to NFC + trim + repeated-whitespace cleanup; no automatic grammatical transformations |
| 5 | Item scoring | **A** — binary certification score + non-scoring diagnostic error tags |
| 6 | Subscore evidence rules | **A, scoped (see amendment)** — graduated guard: 0–4 obs no percentage; 5–7 directional label + `n/N`; 8+ percentage; 10+ eligible for floors after pilot review |
| 7 | Sampling freshness | **A** — five-attempt disjoint window (`W=5`, `c=1`); retention avoids the qualifying attempt; `M_t = max(5q_t, q_t + r_t)` |
| 8 | Future-tense expansion 🔒 | **A** — no authoring; required eligible pool for `future-geoyeyo` is 25 vs 52 raw rows; Workstream D triggers only if the Phase 2 eligibility audit yields `E_future < 25` |
| 9 | Unlock gating | **A** — cumulative two-section milestones; final requires all eight sections; retention requires qualifying final + time window |
| 10 | Scoring bands | **A** — provisional bands as tabled in the memo (stage pass 75%, final pass 80%, qualification 88%, retention 84% = 21/25, 7-day open / 21-day expiry, sticky mastery); all labelled provisional pending standard setting + pilot |
| 11 | Integrity / test control | **A** — query-gated section-completion control + persistent local taint events; tainted-scope attempts are `Practice result`, never qualify for mastery/retention; untainted attempts are `HanaPath results`; no "official"/"verified" labels anywhere |
| 12 | Provenance & versioning | **A** — full provenance schema (as listed in the memo), immutable history, no retroactive recomputation, `legacy-incomplete` backfill marker, checksum ≠ authenticity |
| 13 | Words past/negation v3 | **A** — typed past/negation minima inside existing P/F allocations (0/0, 2/2, 2/2, 4/4, 2/2×4, 6/6, retention 3/3); blueprint v2→v3; minima are proposals pending full mandated-seed generator audit |
| 14 | v2 qualifying-final migration | **A** — frozen v2 retention during live windows; mastery pairs never cross major blueprint versions; new qualifications use v3 |
| 15 | Learner-facing claim | **B (see amendment)** — short result-card line with full disclosure one tap away |

## Owner amendments (verbatim intent)

### Decision 6 — scope limitation

The stricter graduated subscore guard applies **to the new Sentence exam
only** for now. The existing Words-suite reporting (`MIN_SUBSCORE_ITEMS = 3`)
is **not changed in this workstream**. Phase 2 must note the inconsistency
explicitly, and any cross-suite harmonisation is a **separate owner decision
deferred until Sentence pilot data exists**.

### Decision 15 — claim wording

Result-card line (Option B wording):

> You demonstrated and retained the taught HanaPath sentence patterns in
> this device-local assessment.

The full Option A wording **must remain immediately accessible** in the
result details and documentation, including the explicit statement that
results are not proctored or tamper-proof credentials:

> HanaPath Sentence Mastery records that, under this version of HanaPath's
> local assessment, you produced the taught sentence patterns accurately and
> retained that performance after a delayed confirmation. Results are stored
> on this device and are not proctored or tamper-proof credentials.

## Consequence for Phase 2 scope

Per locked Decision 8A, the future-tense expansion proposal
(`FUTURE_TENSE_EXPANSION_PROPOSAL_DRAFT.md`) is **not commissioned**. Phase 2
comprises **four** specifications:

1. `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` — must include the eligibility
   census/audit that computes `E_t` per pattern tag and **fails loudly** if
   `E_future < 25` (which would re-trigger the 🔒 Workstream D owner
   decision).
2. `INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` — Workstream 0; **ships first**.
3. `FORM_CHECKS_PLAN_DRAFT.md`.
4. `WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md`.

## Lock record

- **Owner:** CameronNel
- **Decision date:** 2026-07-21
- **Selections:** all recommended A options, except Decision 15 = B;
  Decision 6 scoped to the Sentence exam only, per the amendments above.
