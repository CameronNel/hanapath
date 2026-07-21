# HanaPath Sentence Examination Eligibility Authoring Guide

> **Authoring and Classification Runbook.** This guide governs row classification for Sentence Examination Eligibility (Boxes A1/A2 of `docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` §§4–5). Batch workers (`gemini-flash` across TASK-005..008) and human adjudicators (`sol`) follow these exact classification and prompt-design rules.

---

## 1. The Three Accepted-Answer Classes

Every reviewed row in `HANAPATH_SENTENCES` (`s0001`–`s4177`) must be classified into exactly one of three `typedClass` categories in `window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY`:

### Class 1: `canonical` (Canonical-Only)
- **Definition:** Exactly one reviewed exam prompt and **one canonical Korean target**.
- **Accepted Answers:** `acceptedAnswers` contains only the canonical target key (`normalizeSentenceExamAnswer(row.korean)`).
- **Condition:** The prompt tightly forces tense, register, lexical choice, discourse role, and communicative act such that no other Korean response is equally valid for the prompt.

### Class 2: `finite` (Authored Finite-Variant)
- **Definition:** One canonical target plus **1 to 4 human-reviewed alternative strings** (`acceptAlso`).
- **Accepted Answers:** Total accepted strings (canonical target + alternatives) is between 2 and 5.
- **Condition:** Every alternative is independently stored and reviewed. Alternatives represent standard contractions, permitted spacing variants, or specific reviewed permutations that preserve the exact construct and intended information structure. No rule generates alternatives at runtime.

### Class 3: `excluded` (Excluded from Typed Scoring)
- **Definition:** The row cannot be certified via exact-match typed production and is excluded from typed exam papers (`typedClass: "excluded"`).
- **Condition:** Excluded rows remain available for learning practice and, where a unique 4-option set can be authored, for selected-response (`R` or `C`) diagnostic items.
- **Mandatory Exclusions:** A row MUST be excluded if any of the following apply:
  1. **Lexical ambiguity:** The English prompt permits several ordinary lexical choices (e.g. synonyms not forced by prompt context).
  2. **Topic vs. Subject ambiguity:** `은/는` vs. `이/가` alternation changes or leaves information structure unresolved.
  3. **Particle omission:** Case particles may legitimately be present or omitted without the prompt selecting one.
  4. **Word-order scrambling:** Several word orders are ordinary and construct-relevant, and the prompt cannot force one.
  5. **Unspecified register or speech level:** Register/listener level (`해요체` vs. `하십시오체`) is not forced by context.
  6. **Unspecified tense:** English prompt tense permits multiple interpretations (e.g., simple present describing routine vs. future plan).
  7. **More than 4 alternatives needed:** Accepted variants form a productive family (>4 variants) rather than a small finite list.
  8. **Duplicate canonical target:** The normalized Korean target duplicates another canonical target in the bank.
  9. **Unstable teaching route / untaught material:** The row contains untaught vocabulary or grammar for the paper scope.

---

## 2. Decision Rules & Worked Examples (Spec §4.1–§4.2)

### 2.1 Particle Alternation (`은/는` vs `이/가`)
- **Linguistic Finding:** `은/는` marks topic or contrast; `이/가` marks focus or neutral subject. They are not globally interchangeable.
- **Decision:** Do NOT automatically accept both.
  - **Prompt:** *"As for Mina, she is a trainee."* → Target: `미나는 연습생이에요.` (**Class 1: canonical**). The prompt *"As for"* forces the topic marker `은/는`.
  - **Bad Prompt:** *"Mina is a trainee."* (Unresolved topic vs. subject focus) → **Class 3: excluded** (unless prompt is rewritten with topic framing).

### 2.2 Word-Order Permutation
- **Linguistic Finding:** Korean word-order variation carries syntactic and discourse/information-structure consequences.
- **Decision:** Do NOT generate permutations automatically.
  - **Prompt:** *"Answer the question 'What did Jisoo buy yesterday?'"* → Target: `지수는 어제 앨범을 샀어요.` (**Class 1: canonical** or **Class 2: finite** if `어제 지수는 앨범을 샀어요` is explicitly reviewed and approved).
  - If several orders are ordinary and the prompt cannot select among them → **Class 3: excluded**.

### 2.3 Tense Ambiguity
- **Bad Prompt:** *"I go to practice."* (English simple present can describe routine or future plan) → **Class 3: excluded**.
- **Rewritten Prompt:** *"I went to practice yesterday."* → Target: `어제 연습하러 갔어요.` (**Class 1: canonical**).

### 2.4 Register & Social Setting
- **Bad Prompt:** *"Please sit down."* (Unspecified addressee / speech level) → **Class 3: excluded**.
- **Rewritten Prompt:** *"At a formal audition, tell the judge respectfully: 'Please sit down.'"* → Target: `앉으십시오.` (**Class 1: canonical**).

### 2.5 Contractions & Spacing
- Standard contractions (e.g., `이것은` → `이건`, `나는` → `난`) may be included in `acceptAlso` **only** when compatible with the prompt's register and explicitly authored (up to 4 alternatives).

### 2.6 Prohibited Automatic Transformations
The grading engine will NEVER automatically perform any of the following:
- Exchange `은/는` with `이/가`
- Remove or insert particles
- Swap `을/를`, `에/에서`, etc.
- Reorder tokens or clauses
- Replace words with synonyms
- Convert `해요체` and `하십시오체`
- Remove spaces or use fuzzy matching / LLM evaluation

---

## 3. Prompt-Design Rules (Phase 1 Research Report §3.5)

| Rule | Purpose | Eligible Class |
|---|---|---|
| **Put a concrete time expression in the English prompt** | Force present, past, or future tense | Canonical or finite variant |
| **Identify the addressee or social setting** | Force polite informal (`해요체`), formal (`하십시오체`), or plain register | Canonical or finite variant |
| **Supply the lexical item when ordinary synonyms exist** | Prevent arbitrary synonym expansion | Canonical |
| **State discourse context, not only propositional content** | Distinguish topic (`은/는`), focus (`이/가`), contrast, question, or command | Canonical or finite variant |
| **Preserve one communicative act per prompt** | Avoid several equally good clause structures | Canonical |
| **Author every accepted contraction or permitted spacing form** | Keep acceptance finite (≤4 alternatives) and human-reviewed | Finite variant |
| **Exclude prompts with multiple legitimate particles, registers, clause orders, or lexicalizations** | Prevent false negatives and false positives | Excluded |
| **Never say “use the past tense”** | Preserve the locked contextual-elicitation rule | All eligible items |

---

## 4. Summary for Batch Classification Workers

When classifying rows in batch tasks (`TASK-005`–`TASK-008`):
1. Inspect the row's `korean` target and `english` prompt in `sentences_core.js`.
2. Draft a constrained `examPromptEn` following Section 3 prompt-design rules.
3. Check if the Korean target requires `acceptAlso` strings (max 4).
4. Assign `typedClass`:
   - `canonical` if prompt forces exactly 1 target.
   - `finite` if prompt allows 1–4 specific reviewed alternatives.
   - `excluded` if the prompt cannot eliminate multiple valid Korean forms or has untaught items. State explicit `exclusionReasons`.
5. Set `reviewStatus: "approved"` and set `reviewedAt` timestamp.
