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
| Eligibility rows reviewed | 2100 / 4177 (50.28%) |
| Eligibility rows approved | 2100 / 4177 (50.28%) |

### Audio

| Metric | Value |
|---|---|
| Mapped audio keys | 38952 |

### App shell

| Metric | Value |
|---|---|
| Service-worker cache name | hanapath-shell-v457 |
| Versioned local assets loaded by index.html | 37 |
| Precached service-worker shell assets | 210 |

### Sentence Mastery examination readiness

Delivered across packets CB5/X1/X2. CB5 is derived from the enabled, immutable
curated bank and its committed prompt, answer, review, entry, and inventory hashes.
X1/X2 derive from the locked artifact files plus the
`HANAPATH_SENTENCE_EXAM_META` runtime marker, so each row flips automatically as
its packet lands, with no hand-edit to this report.

| Milestone | Present |
|---|---|
| Enabled frozen expanded curated bank (CB6B) | yes — 359 typed / 343 recognition — curated-sentence-exam-v2-cb6b |
| Exam blueprints (X1) | yes |
| Generator/grader engine (X1) | yes — engine v1 |
| Seed audit (X1) | yes |
| Browser runner + provenance (X2) | yes — runner v1 |
| Delayed retention confirmation (X2) | yes |

## Core gate steps

Run by `node scripts/audit-core-release.mjs --full`. Every listed step is
blocking; release mode permits no skipped or conditional core checks.

| Step | Command | Kind |
|---|---|---|
| Syntax check (node --check, all root scripts) | `node --check` (all root scripts) | blocking |
| Syntax-gate regression (every file checked) | `node scripts/test-core-release-syntax-gate.mjs` | blocking |
| Release-candidate strict-gate wiring regression (Q2) | `node scripts/test-core-release-strict-gate.mjs` | blocking |
| Sentence-exam readiness derivation regression | `node scripts/test-sentence-exam-readiness.mjs` | blocking |
| Exam integrity | `node scripts/audit-exam-integrity.mjs` | blocking |
| Hangul Mastery examination | `node scripts/audit-hangul-mastery-exam.mjs` | blocking |
| Word-exam competency map | `node scripts/build-word-exam-competency-map.mjs --check` | blocking |
| Core Word examinations | `node scripts/audit-word-exams.mjs` | blocking |
| Words data | `node scripts/audit-words-data.mjs --strict` | blocking |
| Thin-lesson heuristic regression | `node scripts/test-thin-lesson-heuristic.mjs` | blocking |
| Sentences data | `node scripts/audit-sentences-data.mjs --strict` | blocking |
| Sentences foundation coverage | `node scripts/audit-sentences-foundation.mjs` | blocking |
| Form Checks | `node scripts/audit-form-checks.mjs` | blocking |
| Learning question coverage and answer-leak safety (L1) | `node scripts/audit-learning-questions.mjs` | blocking |
| Curriculum v2 migration regression (L1) | `node scripts/test_curriculum_v2_migration.mjs` | blocking |
| Lesson reachability and migration browser journey (L1) | `node scripts/test-lesson-journey-gate.mjs` | blocking |
| Protected historical Sentence eligibility evidence | `node scripts/audit-sentence-eligibility.mjs --protect-historical-evidence` | blocking |
| Eligibility shard-integrity fixtures (E0) | `node scripts/test-sentence-eligibility-shards.mjs` | blocking |
| Enabled frozen curated Sentence exam bank (CB5) | `node scripts/audit-sentence-exam-curated-bank.mjs` | blocking |
| Sentence-exam ambiguity screening regression (CB0) | `node scripts/test-sentence-exam-ambiguity.mjs` | blocking |
| Sentence-exam strict grader regression (CB0) | `node scripts/test-sentence-exam-grader.mjs` | blocking |
| Sentence-exam candidate ranking regression (CB1) | `node scripts/test-sentence-exam-candidate-ranking.mjs` | blocking |
| Sentence-exam inventory and shortlist freshness (CB1) | `node scripts/build-sentence-exam-inventory.mjs --check` | blocking |
| Sentence-exam curated bank authoring freshness (CB4) | `node scripts/build-sentence-exam-curated-bank.mjs --check` | blocking |
| Sentence-exam curated bank approved-review audit (CB4) | `node scripts/audit-sentence-exam-curated-bank-cb4.mjs --require-approved` | blocking |
| Sentence-exam curated bank authoring regression (CB4) | `node scripts/test-sentence-exam-curated-bank-cb4.mjs` | blocking |
| Sentence-exam CB6B capacity package freshness | `node scripts/build-sentence-exam-capacity-remediation.mjs --check` | blocking |
| Sentence-exam CB6B independent-review freshness | `node scripts/review-sentence-exam-capacity-remediation.mjs --check` | blocking |
| Sentence-exam CB6B five-attempt capacity audit | `node scripts/audit-sentence-exam-capacity-remediation.mjs --require-approved` | blocking |
| Sentence-exam CB6B capacity regression | `node scripts/test-sentence-exam-capacity-remediation.mjs` | blocking |
| Sentence-exam CB6B expanded-bank freshness | `node scripts/build-sentence-exam-curated-bank-cb6b.mjs --check` | blocking |
| Sentence-exam CB6B complete-bank approval regression | `node scripts/test-sentence-exam-bank-approval.mjs` | blocking |
| Sentence-exam curated bank freeze freshness (CB5) | `node scripts/build-sentence-exam-curated-bank-freeze.mjs --check` | blocking |
| Sentence-exam curated bank freeze regression (CB5) | `node scripts/test-sentence-exam-curated-bank-freeze.mjs` | blocking |
| Sentence lesson contrast authoring regression (CB2) | `node scripts/test-sentence-lesson-contrast-authoring.mjs` | blocking |
| Sentence lesson contrast UI regression (CB2) | `node scripts/test-sentence-lesson-contrast-ui.mjs` | blocking |
| Sentence lesson contrast data freshness (CB2) | `node scripts/build-sentence-lesson-contrasts.mjs --check` | blocking |
| Sentence lesson contrast coverage and safety (CB2) | `node scripts/audit-sentence-lesson-contrasts.mjs` | blocking |
| Sentence lesson contrast browser fixtures (CB2) | `node scripts/test-sentence-lesson-contrasts-browser.mjs` | blocking |
| Sentence lesson contrast data freshness (CB3) | `node scripts/build-sentence-lesson-contrasts-sections-5-8.mjs --check` | blocking |
| Sentence lesson contrast coverage and safety (CB3) | `node scripts/audit-sentence-lesson-contrasts-sections-5-8.mjs` | blocking |
| Sentence lesson contrast browser fixtures sections 5-8 (CB3) | `node scripts/test-sentence-lesson-contrasts-browser-sections-5-8.mjs` | blocking |
| Sentence Mastery examination seed audit | `node scripts/audit-sentence-exams.mjs` | blocking |
| Sentence Mastery X2 runner, provenance, and retention audit | `node scripts/audit-sentence-exam-runner.mjs` | blocking |
| Sentence Mastery X2 state and scoring regression | `node scripts/test-sentence-exam-runner.mjs` | blocking |
| Sentence Mastery X2 browser acceptance | `node scripts/test-sentence-exam-runner-browser.mjs` | blocking |
| Audio coverage | `node scripts/audit-audio-coverage.mjs` | blocking |
| Authored audio target discovery regression (L3) | `node scripts/test-authored-audio-targets.mjs` | blocking |
| Authored audio mapped-runtime regression (L3) | `node scripts/test-authored-audio-runtime.mjs` | blocking |
| Alphabet audio coverage | `node scripts/audit-alphabet-audio.mjs --strict` | blocking |
| Hangul recognition | `node scripts/audit-hangul-recognition.mjs` | blocking |
| Premium handwriting | `node scripts/audit-premium-handwriting.mjs` | blocking |
| App shell | `node scripts/audit-app-shell.mjs` | blocking |
| Prepared mobile package validation | `node scripts/audit-mobile-package.mjs` | blocking |
| CORE_APP_STATUS.md freshness | `--check-status` (internal) | blocking |

## Release-candidate state

- **Historical Sentence eligibility evidence:** 2100 protected approved rows. E1A/E1B remain immutable evidence; superseded E1C/E1D are not release prerequisites. The enabled frozen curated bank is the strict examination source.
- **Sentence Mastery examination:** blueprints, engine, runner, provenance, results, and retention are shipped.
- **Core CI:** prepares the isolated Capacitor web payload, then requires every full-gate step to pass with zero skips.

## Coverage gaps

No roadmap §9 verification scripts are deliberately excluded from this gate.

