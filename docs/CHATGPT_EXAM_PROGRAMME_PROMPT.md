# Paste-ready ChatGPT kickoff prompt — Exam Programme research

> **Owner instructions (not part of the prompt):** open ChatGPT in deep
> research mode. If your ChatGPT can read GitHub, connect
> `CameronNel/hanapath` read-only at commit `55ac8898`; otherwise attach
> `docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md` as a file. Then paste
> everything below the line as your message. When it returns Phase 1,
> bring both documents back to Claude before answering the decision memo.

---

You are the research lead for the next phase of **HanaPath**, a vanilla
static Korean-learning PWA. Your commission is defined in
`docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md` (attached / in the repo) —
read it completely before doing anything. It contains the mission, the
locked owner decisions you must not reopen, verified ground-truth data
with a reproducibility appendix, and the two-phase deliverable contract.
This message tells you **what to go look for**. Work through every
numbered hunt below; each one feeds a specific decision the owner must
make.

**Produce Phase 1 only** — `EXAM_PROGRAMME_RESEARCH_REPORT.md` and
`EXAM_PROGRAMME_DECISION_MEMO.md`, exactly as specified in the brief's
§12 — then STOP. Do not draft Phase 2 specifications until the owner
returns the locked decision memo.

## Hunt 1 — How real Korean exams constrain writing/translation prompts

Dig into how established Korean assessments make a written answer
uniquely gradable, because HanaPath's grader is deterministic and offline
(no LLM, no fuzzy match, no human rater):

- TOPIK II 쓰기 (문항 51–54): item formats, what the short-answer items
  (51–52) accept, official rating rubrics, per-item time allowances, and
  inter-rater measures. TOPIK I has no writing section — note what that
  implies for beginner-level production testing.
- King Sejong Institute curriculum/placement materials and the NIKL
  standard Korean curriculum: how beginner production is elicited and
  scored.
- University KLI (Yonsei/SNU/Sogang) placement and achievement tests:
  any public information on sentence-level production items.
- Any published work on **automated/deterministic scoring of short
  constructed responses** in L2 assessment — what item designs survive
  exact-match grading, and what error tolerance schemes exist that don't
  require human judgement.

Deliverable from this hunt: prompt-design rules that force a unique
answer (time adverbs → tense, addressee → register, given vocabulary →
lexical choice), with citations, mapped onto the brief's three item
classes (canonical-only / authored finite-variant / excluded).

## Hunt 2 — Korean linguistics facts for the accepted-answer model

The grader compares NFC-normalized typed Korean against a target plus an
authored `acceptAlso` variant list. Research the specific variation
phenomena that decide whether a learner answer is "same sentence,
legitimate variant" or "different sentence":

- 은/는 vs 이/가: when the alternation changes meaning (contrast/topic
  vs subject focus) and when a beginner context genuinely permits both.
- Particle omission in spoken/polite Korean: which particles drop
  legitimately (을/를, 은/는 in casual speech) and whether a formal exam
  should accept omission at all.
- Word-order flexibility: what scrambling is grammatical vs what changes
  information structure; whether beginner exams elsewhere accept
  reordered answers.
- Contractions and phonological variants: 이것은→이건, 나는→난, 무엇→뭐,
  -어요/-여요/-해요 stems, 하십시오체 vs 해요체 boundaries.
- 띄어쓰기 (spacing): official rules vs common acceptable variation, and
  how strict Korean exams are about it.
- Orthography: common learner misspellings that are *errors* vs standard
  alternative spellings that are *variants*.

Deliverable: a decision table — phenomenon → accept / reject / exclude
item — with linguistic citations, feeding decision-memo worked examples
(the brief's §11-2 requires at least particle alternation, word-order
permutation, tense ambiguity, register ambiguity).

## Hunt 3 — Scoring model evidence

- Binary vs partial credit for constructed responses: reliability and
  learner-feedback research on holistic binary scoring vs analytic
  error-category scoring in L2 writing.
- Minimum item counts for reportable subscores (the Words suite refuses
  to show a percentage from 1–2 items — find the psychometric basis to
  keep or refine that rule).
- Standard-setting basics for provisional cut scores (Angoff/bookmark in
  language testing) — enough to justify calling HanaPath's bands
  "provisional achievement standards" and to define what future
  calibration would take.

## Hunt 4 — Learning-science evidence for structure and retention

- Retrieval practice / testing effect for *typed production* specifically
  (not MCQ): does typing full sentences produce stronger retention than
  recognition, and at what cost?
- Interleaving vs blocking: the brief's house position is "blocked in
  Form Checks, mixed in exams" (from the Words spec §1.3, citing Nakata
  & Suzuki 2019 and Pan et al. 2019) — extend, confirm, or refine with
  anything newer.
- Delayed retention testing: evidence for the 7-day/21-day confirmation
  window design (Exam 10 precedent) applied to sentence production.
- Exam length and fatigue on mobile: anything on sustained typing tasks
  on phone keyboards; Korean IME input speed data (characters or
  syllables per minute for learners vs natives) to defend a per-item
  time budget in the 60–120s range — or to move it.

## Hunt 5 — Honest-claims and integrity precedent

- How self-study products word achievement claims without overclaiming:
  Duolingo (scores/certificates and their published claim boundaries),
  WaniKani, Anki ecosystems, language-app "certificates". What claim
  language survived scrutiny and what got criticized.
- Local-first apps and result integrity: precedents for labeling
  untrusted/self-reported results, "practice mode" vs "official" result
  separation, and provenance metadata on locally stored achievements.
- CEFR/ACTFL/TOPIK claim boundaries: exactly what a curriculum
  achievement test may say about a learner (the brief's §11-7 one-liner
  must survive this).

## Hunt 6 — The sampling mathematics (no external research; do the math)

Derive the minimum-pool formula the brief's §5.1-4 demands: given a
per-attempt tag quota, N supported ordinary retakes with fresh seeds, a
retention confirmation that avoids qualifying-attempt targets, and
same-target/same-surface caps, how many distinct eligible rows must a
pattern tag contain? Apply it to every tag in the brief's §10.3 census
under your recommended exam structure. Show the arithmetic for
`future-geoyeyo` (52 rows) explicitly — the owner will check this number
first. State which tags pass, which fail, and by how much.

## Hunt 7 — Repository verification (if you have repo access)

If you can read the repo, verify before citing: the Translate & Type
grader path and its `acceptAlso` handling in `app.js`; the sentence-row
schema in `sentences_core.js`; the Words exam engine's
generation/grading/band structure in `word_exam_engine.js` and
`word_exam_blueprints.js`; the audit contracts in `scripts/audit-*.mjs`;
the specs in `docs/`. Cite file + symbol. If you cannot read the repo,
rely on the brief's §10/Appendix A ground truth and mark every
code-behaviour assumption `[IMPL: …]` as the brief instructs.

## Rules of engagement (enforced at review)

- Every load-bearing claim gets a working citation; primary/official
  sources for Korean assessment facts; label each major recommendation
  **evidence-backed** or **judgement call**.
- Where literature is mixed, say so and make a cautious call — do not
  manufacture consensus.
- Do not reopen the brief's §2.3 locked decisions. Do not design
  pronunciation/speaking assessment. Do not propose frameworks, servers,
  or build tooling.
- Answer all seven questions in the brief's §11 explicitly — the owner
  checks these first.
- The decision memo presents each choice as a numbered menu: your
  recommendation, the strongest argument against it, and what changes
  downstream if the owner picks differently.
- Output: two Markdown documents, titled exactly
  `EXAM_PROGRAMME_RESEARCH_REPORT.md` and
  `EXAM_PROGRAMME_DECISION_MEMO.md`. Then stop and wait.
