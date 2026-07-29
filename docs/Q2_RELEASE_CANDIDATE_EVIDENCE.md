# HanaPath packet Q2 release-candidate evidence

## Evidence identity

- Packet: Q2, strict release-candidate closure
- Draft PR: #377
- Base: `e7348f66fa58e48c6c7b451faa1095854b6b9164` (merged Q1, #376)
- Exact validated implementation commit:
  `b4d8c66d234af7e086201b56f3331e96177ba8f1`
- Branch: `core/q2-strict-release-closure`
- Local full-gate window: 29 July 2026, 19:55:48–20:19:38
  Africa/Johannesburg (23 minutes 50 seconds)
- Result: **55 passed, 0 skipped, 0 failed**

This report is evidence for the Q2 draft. Q2 remains ACTIVE and unmerged until
the designated integrator independently reviews the draft, updates the roadmap
row to COMPLETE, and squash-merges it.

## Environment

| Component | Version |
|---|---|
| Operating system | Microsoft Windows 11 Pro 64-bit, 10.0.26200 |
| Node.js | v24.15.0 |
| Git | 2.44.0.windows.1 |
| Google Chrome | 150.0.7871.187 |

The CI contract uses Ubuntu and Node.js 22. CI generates `mobile/www` from the
checked-out static app before invoking the same strict full gate.

## Before and after

The merged Q1 `main` run exposed two Q2 closure defects:

1. The authoritative core job passed only **53 steps and skipped mobile
   packaging** because `mobile/www` is intentionally ignored.
2. A duplicate `Validate static app` job reran a subset of the matrix and
   failed when Chrome returned `--dump-dom` before the CB2 fixture published a
   terminal state at 1280×900. The authoritative core job passed the same
   fixture in that run. The failed main run was
   `https://github.com/CameronNel/hanapath/actions/runs/30471817342`.

Q2 now:

- has one authoritative CI matrix instead of a duplicated drifting subset;
- generates the isolated mobile payload before the gate;
- makes all 55 steps blocking, including the shipped X1 audit and mobile
  package;
- adds a regression that rejects conditional steps, missing scripts,
  `--allow-incomplete`, or `continue-on-error`;
- retries CB2/CB3 Chrome execution only when no terminal fixture state exists.
  A rendered fail state or non-zero Chrome exit remains immediately blocking;
- replaces permissive release use of `--allow-incomplete` with
  `--protect-historical-evidence`, which requires exactly s0001–s2100 to exist
  and be approved, and rejects any historical row beyond that protected range;
- re-labels generated teaching prompts and heuristic contrast provenance
  without treating either as curated-bank approval.

## Re-derived product counts

| Area | Re-derived state |
|---|---|
| Alphabet | 8 stages; 40 stroke guides; 200 Hangul Mastery items |
| Words | 2,028 curated senses; 75 units; 284 lessons; 17 Form Checks; 10 exams |
| Sentences | 4,177 rows; 75 units; 8 sections; 703 lessons |
| Historical eligibility | 2,100 reviewed; 2,100 approved; exact E1A/E1B range |
| Frozen Sentence exam bank | 702 entries: 359 typed / 343 recognition |
| Audio | 38,952 mapped keys |
| App shell | cache `hanapath-shell-v455`; 37 index assets; 210 precached assets |
| Prepared Android payload | 39,287 files; 195.00 MiB; 38,855 OGG; 126 WOFF2 |

The counts did not change in Q2. Q2 changes their enforcement and updates the
primary documentation to the already-merged X1/X2/Q1 product.

## Full verification transcript summary

Command:

```bash
node mobile/scripts/prepare-web.mjs
node scripts/audit-core-release.mjs --full
```

The full gate executed all roadmap section 9 families plus the Q2 wiring
regression:

| Evidence family | Result |
|---|---|
| Root browser-script syntax and syntax-gate negative fixture | PASS |
| Q2 strict-gate wiring regression | PASS — 55 blocking, zero conditional |
| Exam integrity, taint-before-mutation, provenance, and backup survival | PASS |
| Hangul Mastery Examination | PASS — 200 items |
| Core Word examinations | PASS — full release seed counts |
| Words/Sentences data and foundation | PASS |
| Form Checks and learning-question answer-leak safety | PASS |
| Curriculum v2 migration fixtures | PASS — failed, review-only, partial-session, completed, mastered |
| L1 cold/progressed/legacy/tainted/imported learner journey | PASS |
| Protected historical Sentence eligibility | PASS — 2,100/2,100 |
| Frozen curated bank, ambiguity, strict grading, author/reviewer, capacity, and freeze | PASS |
| CB2/CB3 lesson contrast data, safety, and browser fixtures | PASS |
| Sentence X1 full seed/freshness/retention audit | PASS |
| Sentence X2 runner, provenance, state, scoring, browser, and retention | PASS |
| Authored/full audio and mapped-runtime fallback checks | PASS |
| Alphabet audio, recognition, and Handwriting Coach | PASS |
| App shell/cache and prepared Android package | PASS |
| Generated `CORE_APP_STATUS.md` freshness | PASS |

Sentence X1 release evidence:

- frozen pool: 702 total / 359 typed / 343 recognition;
- independent forms: 3,000 / 3,000;
- freshness sequences: 1,500 / 1,500;
- freshness primary forms: 7,500 / 7,500;
- retention avoidance: 500 / 500, zero overlap.

Browser evidence:

| Journey | Viewports | Result |
|---|---|---|
| Full L1 learner journey | 375×812, 768×1024 | PASS |
| CB2 contrast fixture | 375×812, 1280×900 | PASS |
| CB3 contrast fixture | 375×812, 1280×900 | PASS |
| Sentence X2 runner | 375×812, 768×1024 | PASS |

The browser gates fail on terminal fixture errors, page errors, missing
controls, persistence/migration failures, incorrect app viewport dimensions, or
horizontal overflow. Q2's retry applies only to the absence of a terminal
fixture state from Chrome's command-line harness.

## Issue and limitation review

- Open GitHub issues at evidence time: **0**.
- Open P0/P1 core issues: **0**.
- Known P2 core issues observed in Q1/Q2: **none**.
- Teaching-only generated prompts and heuristic contrast provenance are not
  exam approvals. Every emitted typed exam entry remains independently approved
  against the frozen current bank revision.
- Real Android device evidence, Play signing/testing/owner decisions, paid
  Handwriting Coach activation, ML Kit authority selection, iOS packaging, and
  optional curriculum expansion remain explicitly post-core work. They do not
  weaken the browser/PWA core release candidate.

## Migration and cache impact

Q2 changes no learner-loaded runtime, curriculum data, exam bank, audio map,
style, HTML, service worker, or native source file. Therefore:

- no state migration is introduced;
- old saves, immutable results, qualifiers, retention relations, and Practice
  taint remain byte-for-byte governed by the merged X2 contracts;
- no `CACHE_NAME`, `?v=`, service-worker shell list, or integrity pin changes
  are required;
- `mobile/www` and `mobile/www-manifest.json` remain generated ignored outputs
  and are not committed.

## Exact changed files

- `.github/workflows/ci.yml` — one strict authoritative CI matrix and prepared
  mobile payload
- `scripts/audit-core-release.mjs` — 55 blocking steps and generated status
- `scripts/test-core-release-strict-gate.mjs` — strictness/wiring regression
- `scripts/audit-sentence-eligibility.mjs` — exact protected-history mode
- `scripts/test-sentence-lesson-contrasts-browser.mjs` — non-terminal-only retry
- `scripts/test-sentence-lesson-contrasts-browser-sections-5-8.mjs` — matching retry
- `scripts/audit-sentence-lesson-contrasts.mjs` — current teaching/provenance labels
- `scripts/audit-sentence-lesson-contrasts-sections-5-8.mjs` — current labels
- `docs/CORE_APP_STATUS.md` — regenerated live counts and blocking matrix
- `docs/CORE_APP_COMPLETION_ROADMAP.md` — merged X1/X2/Q1 and active Q2 truth
- `README.md`, `AGENTS.md`, `AI_INSTRUCTIONS.md`, `CLAUDE.md`, `HANDOVER.md`,
  `docs/EXAM_TAB_HANDOVER.md` — authoritative product/agent documentation
- `docs/Q2_RELEASE_CANDIDATE_EVIDENCE.md` — this exact evidence
