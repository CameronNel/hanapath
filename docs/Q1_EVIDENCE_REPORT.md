# HanaPath Packet Q1 Evidence Report

## Overview
This report documents the verification steps and results for the Q1 Packet (Full core acceptance and defect closure) of the HanaPath project, run on a Windows OS environment.

The initial Windows browser-harness fixes and this report were authored by Gemini on the local
`core/q1-full-core-acceptance` branch. During integrator review, the original width-only
compensation was found to leave the application iframe at a reduced Windows height (for example,
`768x873` during a requested `768x1024` run). The reviewed fix now pins and validates both iframe
dimensions exactly while using a larger outer Chrome window only as fixture headroom.

## 1. Environment Details
- **Base Commit**: `553486dfa14972e0923995d5a324227e2d02b93a` (squash merge of PR #375)
- **Local Branch**: `core/q1-full-core-acceptance`
- **OS**: Windows (PowerShell/CMD)
- **Node.js**: `v24.15.0`
- **Google Chrome Binary**: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- **Google Chrome Version**: `150.0.7871.187`

## 2. Identified Release-Blocking Layout Defect
During the execution of the L1 learner journey gate, the following failure occurred on Windows:
```
FAIL: L1 learner journey gate at 768,1024
Chrome exit code: 0
Fixture status: fail
Fixture result:
FAIL 768x873
frame-overflow: 768/752
```

### Root Cause Analysis
1. **Windows Window Borders (Non-Client Area)**: On Windows, Chrome headless window-sizing allocates space for the standard Windows window borders (8px on the left, 8px on the right, total 16px). Requesting a `--window-size=768,1024` opens an outer window of width 768px, but leaves only `752px` of inner `window.innerWidth` viewport.
2. **Fixed Frame Sizing**: The L1 integration fixture `tests/fixtures/lesson_journey_gate.html` sets the iframe `#appFrame` width to the requested viewport width (`768px`) and checks:
   `frame.getBoundingClientRect().width <= window.innerWidth + 1`
   Because `768 > 752 + 1`, a `frame-overflow` layout error is triggered.
3. **Scrollbar Reservations**: In headless Chrome on Windows, space is reserved for vertical scrollbars on the parent page if content overflows, compounding the width restriction.

### Resolution Implemented
1. **Exact App Viewport With Fixture Headroom**: Modified `scripts/test-lesson-journey-gate.mjs` to allocate extra outer-window headroom while the fixture pins the application iframe to the exact requested width and height. The fixture now rejects width or height mismatches as well as parent-frame overflow. This keeps the learner journey at exactly `375x812` and `768x1024` without assuming that every operating system uses the same non-client border dimensions.
2. **Scrollbar Hiding in CSS**: Added `overflow: hidden;` and `::-webkit-scrollbar { display: none; }` to `tests/fixtures/lesson_journey_gate.html` styling to prevent scrollbars on the parent test-runner frame.
3. **Cross-Platform Automatic Chrome Discovery**: Added standard Windows Google Chrome installation paths to the `candidates` search array in the four browser-testing scripts (`scripts/test-lesson-journey-gate.mjs`, `scripts/test-sentence-exam-runner-browser.mjs`, `scripts/test-sentence-lesson-contrasts-browser.mjs`, `scripts/test-sentence-lesson-contrasts-browser-sections-5-8.mjs`). This enables automatic Chrome discovery out-of-the-box on Windows without requiring manual `CHROME_BIN` environment variable injection.

All tests have been verified to pass cleanly after this fix.

## 3. Individual Release Gate Executions
The following table outlines each gate/audit command run, its purpose, and its result:

| Audit Gate / Command | Purpose / Scope | Result |
| :--- | :--- | :--- |
| `node scripts/audit-core-release.mjs --full` | Deterministic full core-release matrix on the reviewed diff | **PASS** — 54 passed, 0 skipped, 0 failed |
| `node scripts/test-lesson-journey-gate.mjs` | L1 Learner journey browser acceptance (cold start, PWA shell, routes, persist) | **PASS** |
| `node scripts/test-sentence-exam-runner-browser.mjs` | Sentence X2 exam runner browser fixture validation | **PASS** |
| `node scripts/test-sentence-lesson-contrasts-browser.mjs` | Sentence CB2 contrast browser fixture validation (sections 1-4) | **PASS** |
| `node scripts/test-sentence-lesson-contrasts-browser-sections-5-8.mjs` | Sentence CB3 contrast browser fixture validation (sections 5-8) | **PASS** |
| `node scripts/audit-exam-integrity.mjs` | Box 0B query gating, durability, and taint-before-mutation tests | **PASS** |
| `node scripts/audit-hangul-mastery-exam.mjs` | Hangul Mastery exam data, audio and progression checks | **PASS** |
| `node scripts/build-word-exam-competency-map.mjs --check` | Word competency mapping consistency validation | **PASS** |
| `node scripts/audit-words-data.mjs --strict` | Curated Word curriculum data completeness and formatting validation | **PASS** |
| `node scripts/test-thin-lesson-heuristic.mjs` | Thin-lesson exclusion validation and exempt grammar paths regression | **PASS** |
| `node scripts/audit-sentences-data.mjs --strict` | Curated Sentence curriculum data completeness validation | **PASS** |
| `node scripts/audit-sentences-foundation.mjs` | Sentences foundation twin-unit coverage checks | **PASS** (with expected warnings) |
| `node scripts/audit-form-checks.mjs` | Form checks layout and contrast validation | **PASS** |
| `node scripts/audit-sentence-eligibility.mjs --allow-incomplete` | Eligibility shards range, schema, progress and census verification | **PASS** |
| `node scripts/test-sentence-eligibility-shards.mjs` | Shard-integrity negative/positive fixture verification | **PASS** |
| `node scripts/audit-sentence-exam-curated-bank.mjs` | Enabled frozen curated Sentence exam bank (CB5) audit | **PASS** |
| `node scripts/test-sentence-exam-ambiguity.mjs` | Sentence exam ambiguity screening and audit-safety regression | **PASS** |
| `node scripts/test-sentence-exam-grader.mjs` | Sentence exam strict grading policy validation | **PASS** |
| `node scripts/test-sentence-exam-candidate-ranking.mjs` | Sentence exam candidate shortlist selection rules validation | **PASS** |
| `node scripts/build-sentence-exam-inventory.mjs --check` | Sentence exam inventory and shortlist freshness validation | **PASS** |
| `node scripts/build-sentence-exam-curated-bank.mjs --check` | Sentence exam curated bank authoring freshness validation | **PASS** |
| `node scripts/audit-sentence-exam-curated-bank-cb4.mjs --require-approved` | Sentence exam curated bank approved-review (CB4) audit | **PASS** |
| `node scripts/test-sentence-exam-curated-bank-cb4.mjs` | Sentence exam curated bank authoring regression | **PASS** |
| `node scripts/build-sentence-exam-capacity-remediation.mjs --check` | Sentence exam capacity remediation freshness check | **PASS** |
| `node scripts/review-sentence-exam-capacity-remediation.mjs --check` | Sentence exam capacity review decision validation | **PASS** |
| `node scripts/audit-sentence-exam-capacity-remediation.mjs --require-approved` | Sentence exam capacity remediation 5-attempt audit | **PASS** |
| `node scripts/test-sentence-exam-capacity-remediation.mjs` | Sentence exam capacity remediation logic validation | **PASS** |
| `node scripts/build-sentence-exam-curated-bank-cb6b.mjs --check` | Sentence exam CB6B expanded curated bank check | **PASS** |
| `node scripts/test-sentence-exam-bank-approval.mjs` | Sentence exam complete bank review evidence check | **PASS** |
| `node scripts/build-sentence-exam-curated-bank-freeze.mjs --check` | Sentence exam freeze manifest files check | **PASS** |
| `node scripts/test-sentence-exam-curated-bank-freeze.mjs` | Sentence exam freeze tamper-proofing validation | **PASS** |
| `node scripts/test-sentence-lesson-contrast-authoring.mjs` | Sentence lesson contrast selection behavior regression | **PASS** |
| `node scripts/test-sentence-lesson-contrast-ui.mjs` | Sentence lesson contrast UI rendering regression | **PASS** |
| `node scripts/build-sentence-lesson-contrasts.mjs --check` | Sentence CB2 contrast data files check | **PASS** |
| `node scripts/audit-sentence-lesson-contrasts.mjs` | Sentence CB2 contrast coverage and safety audit | **PASS** |
| `node scripts/build-sentence-lesson-contrasts-sections-5-8.mjs --check` | Sentence CB3 contrast data files check | **PASS** |
| `node scripts/audit-sentence-lesson-contrasts-sections-5-8.mjs` | Sentence CB3 contrast coverage and safety audit | **PASS** |
| `node scripts/audit-audio-coverage.mjs` | Learner-facing audio assets existence and maps alignment audit | **PASS** |
| `node scripts/audit-alphabet-audio.mjs --strict` | Alphabet and Drill Lab audio assets and maps audit | **PASS** |
| `node scripts/audit-hangul-recognition.mjs` | Syllable drawing templates and recognizer accuracy audit | **PASS** |
| `node scripts/audit-premium-handwriting.mjs` | Premium writing feature and monetization gateway validation | **PASS** |
| `node scripts/audit-app-shell.mjs` | Service Worker cache asset lists and index assets alignment audit | **PASS** |
| `node scripts/audit-mobile-package.mjs` | Capacitor mobile assets size, permissions and appId validation | **PASS** |
| `node scripts/test-sentence-exam-runner.mjs` | Sentence Mastery X2 runner-core logic regression | **PASS** |
| `node scripts/audit-sentence-exam-runner.mjs` | Sentence Mastery X2 runner and retention schema validation | **PASS** |
| `git diff --check` | Code style trailing whitespace and conflict marker check | **PASS** |

## 4. Verification and Conclusion
- **Independent Integrator Re-run**: The full matrix completed in 1,052.1 seconds on the reviewed diff. The exhaustive Word examination audit covered its full seed counts, the Sentence examination audit covered all full-release seeds and freshness sequences, and both exact learner-journey viewports passed.
- **PWA/App Vanilla Static Integrity**: Retained. All files are serving static assets from standard paths. Service Worker config is correct.
- **Cache Integrity**: No caches or version pins require updating because all modified files are test scripts/fixtures which are never served to learners at runtime.
- **Release-Readiness**: All release-blocking layout issues on Windows have been resolved. The entire suite passes.
