# Words Batch Authoring Contract & Instructions

This document defines the interface and quality requirements for authoring new vocabulary batches in HanaPath. The authoring model MUST output a machine-readable JSON/JSONL format matching the curated schema, and adhere strictly to these rules.

---

## 1. No Invented Senses (Polysemy Guard)
- **Rule**: Do not invent fake definitions or meanings to force polysemy.
- **Verification**: Senses must correspond to dictionary definitions. If a word has multiple senses, they must carry distinct `senseKey` and `senseNo` attributes.
- **Default**: Map the primary high-frequency sense first.

## 2. Duplicate Gloss Check
- **Rule**: Ensure the meaning or short meaning does not conflict with an existing curated word of the same surface.
- **Verification**: Search the existing bank. If same surface has same meaning, merge them or add distinct `senseKey` and `senseNo` if they represent distinct concepts.

## 3. Beginner-Parseable & Controlled Vocabulary Examples
- **Rule**: Examples must be simple, using only words and grammar that a beginner who has completed the core section (S1-S8) can recognize.
- **Length**: Sentences must be short (usually under 8 syllables for early elective lessons).
- **No Complex Structures**: Avoid advanced grammar (e.g. high-level relative clauses, complex endings).

## 4. Stable IDs & Provenance
- **Rule**: Assign a stable, unique ID to each row in the format: `w_m6_<rank>_<surface_romanized>`.
- **Metadata**: Retain `rawFrequencyRank` and `source` markers to trace the origin of the word.

## 5. Lesson Group vs. Form Drill Track
- **Rule**: Do not confuse `lessonGroup` with the verb/adjective form-drill tracks.
- ** lessonGroup**: Groups words by scenario or semantic category (e.g., `travel-city`, `study-school`, `food-drink`).
- **Form Drill tracks**: Grammar markers (like irregular conjugation families or honorific roles) are handled via `irregularFamily`, `honorificRole`, or `isFunctionWord`, NOT by inventing new `lessonGroup` labels.

## 6. Coherent Scenario Lessons
- **Rule**: Elective lessons must group 8–12 words into a single, cohesive thematic or scenario-based lesson.
- **Scenario integrity**: Do not mix unrelated topics. Keep lessons focused on communicative goals (e.g., ordering food, checking in at a hotel).

## 7. Register & Annotations
- **Rule**: All rows must declare their grammatical and register markers explicitly:
  - `register`: defaults to `everyday` (or `polite` / `formal` / `honorific` / `written-formal` if appropriate).
  - `speechLevel`: defaults to `plain`.
  - `originType`: `native` / `Sino-Korean` / `loanword` / `hybrid`.
  - `morphTag`: Standard POS tag (e.g., `NNG`, `VV`, `VA`, `MAG`).
  - `annotationSource`: Set keys to `explicit`.

---

## Output JSON Schema Example

```json
[
  {
    "id": "w_m6_5000_haendeupon",
    "korean": "핸드폰",
    "meaning": "cellphone / mobile phone",
    "pos": "noun",
    "pronunciation": "haendeupon",
    "exampleKo": "핸드폰이 있어요.",
    "exampleEn": "I have a cellphone.",
    "lessonGroup": "daily-objects-tech",
    "originType": "loanword",
    "voiceText": "핸드폰",
    "exampleVoiceText": "핸드폰이 있어요.",
    "register": "everyday",
    "speechLevel": "plain",
    "morphTag": "NNG",
    "annotationSource": {
      "register": "explicit",
      "speechLevel": "explicit",
      "originType": "explicit",
      "morphTag": "explicit",
      "hanja": "absent"
    }
  }
]
```
