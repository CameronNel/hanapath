# HanaPath core app status

> **Generated file — do not hand-edit.** Regenerate with
> `node scripts/audit-core-release.mjs --write-status`. Every number below is
> derived directly from the live data files; `--check-status` (and the core gate)
> fail if this report drifts from the code.

This report is the machine-derived companion to
[`docs/CORE_APP_COMPLETION_ROADMAP.md`](CORE_APP_COMPLETION_ROADMAP.md). The roadmap
owns *what to do next*; this file owns *what currently exists*.

## Derived counts

### Alphabet

| Metric | Value |
|---|---|
| Hangul stroke guides | 40 |
| Hangul Mastery Examination items | 200 (across 7 parts) |
| Hangul Mastery required-correct pool | 200 |
| Hangul Mastery blueprint version | 2 |

### Words

| Metric | Value |
|---|---|
| Curated senses | 2028 |
| Curriculum units | 75 |
| Curriculum sections | 8 |
| Lessons | 284 |
| Form Checks | 17 |
| Core Word examinations | 10 |
| Word-exam blueprint version | 3 |

### Sentences

| Metric | Value |
|---|---|
| Bank rows | 4177 |
| Curriculum units | 75 |
| Curriculum sections | 8 |
| Lessons | 703 |
| Eligibility revision | sentence-eligibility-v1 |
| Eligibility rows reviewed | 20 / 4177 (0.48%) |
| Eligibility rows approved | 20 / 4177 (0.48%) |

### Audio

| Metric | Value |
|---|---|
| Mapped audio keys | 37867 |

## Core gate steps

Run by `node scripts/audit-core-release.mjs` (full). `blocking` steps fail the
gate; `conditional` steps SKIP when the environment cannot perform them.

| Step | Command | Kind |
|---|---|---|
| Syntax check (node --check, all root scripts) | `node --check` (all root scripts) | blocking |
| Exam integrity | `node scripts/audit-exam-integrity.mjs` | blocking |
| Hangul Mastery examination | `node scripts/audit-hangul-mastery-exam.mjs` | blocking |
| Word-exam competency map | `node scripts/build-word-exam-competency-map.mjs --check` | blocking |
| Core Word examinations | `node scripts/audit-word-exams.mjs` | blocking |
| Words data | `node scripts/audit-words-data.mjs --strict` | blocking |
| Thin-lesson heuristic regression | `node scripts/test-thin-lesson-heuristic.mjs` | blocking |
| Sentences data | `node scripts/audit-sentences-data.mjs --strict` | blocking |
| Sentences foundation coverage | `node scripts/audit-sentences-foundation.mjs` | blocking |
| Form Checks | `node scripts/audit-form-checks.mjs` | blocking |
| Sentence eligibility (schema + progress) | `node scripts/audit-sentence-eligibility.mjs --allow-incomplete` | blocking |
| Sentence Mastery examination seed audit | `node scripts/audit-sentence-exams.mjs` | conditional |
| Audio coverage | `node scripts/audit-audio-coverage.mjs` | blocking |
| Alphabet audio coverage | `node scripts/audit-alphabet-audio.mjs --strict` | blocking |
| Hangul recognition | `node scripts/audit-hangul-recognition.mjs` | blocking |
| Premium handwriting | `node scripts/audit-premium-handwriting.mjs` | blocking |
| App shell | `node scripts/audit-app-shell.mjs` | blocking |
| Mobile package validation | `node scripts/audit-mobile-package.mjs` | conditional |
| CORE_APP_STATUS.md freshness | `--check-status` (internal) | blocking |

## Open core gates

- **Sentence eligibility** is at 20 / 4177 approved rows (0.48%). CI and this gate run `audit-sentence-eligibility.mjs --allow-incomplete`; the strict gate lands with packet **E2**.
- **Sentence Mastery examination** engine/runner: not yet shipped (packets **X1** and **X2**); the seed audit step SKIPs.
- **Mobile package validation** is conditional on a prepared `mobile/www`; the Android workflow performs it after `npm run prepare:web`.

## Excluded from the gate

- `scripts/audit-learning-questions.mjs` — throws on main (`appendAuthoredItemQuestions is not defined` — an audit-harness extraction bug, not a product defect); not wired into CI. Repair is out of scope for C1.

