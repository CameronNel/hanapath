# HanaPath Words Section Master Spec

Date: 2026-07-01  
Repo: `CameronNel/hanapath`  
Owner intent: alphabet/Hangul is treated as sorted. The next major product-quality push is the Words section.

This file is a Codex-ready implementation plan. It is intentionally detailed. The goal is that a contributor can pick this up, understand the current app, implement the words section without breaking alphabet, and test it like a cold learner.

---

## 0. Product verdict

The current project already has a functional static app shell, a completed alphabet learning path, an alphabet quick reference, an alphabet drill lab, a 5,000-row Korean frequency CSV, and a basic vocabulary UI.

The Words section now needs to become a real learning system.

The current vocabulary experience is not yet enough because it mostly teaches:

- Korean spelling
- Romanization / English spelling
- Audio to Hangul recognition
- Search and browse

It does not yet reliably teach:

- Meaning
- Context
- Recall
- Typed Hangul production
- Function word usage
- Spaced review with due dates
- A beginner-safe curriculum
- Quick reference access from every word lesson state
- A massive but non-laggy word bank that can be used as a dictionary/reference

The target is:

> Any person should be able to open the Words section, see a word, understand it, hear it, type it, repeat it, review it later, and quickly look it up again.

---

## 1. Current project scan

### 1.1 Confirmed app shape

The app is a static PWA.

Current important files:

```text
/
  index.html
  app.js
  styles.css
  sw.js
  manifest.webmanifest
  audio_map.js
  alphabet_skill_srs.js
  korean_5000_claude_ready.csv
  lib/
    hangul.js
  audio/
    *.mp3
  scripts/
    audit-alphabet-audio.mjs
  icons/
    icon-192.png
    icon-512.png
  README.md
  HANDOVER.md
```

`HANDOVER.md` says the app has no framework, no build step, no `package.json`, and most logic lives in `app.js`. Keep that constraint unless the owner explicitly approves a build system later.

### 1.2 Current shell and routing facts

Current bottom navigation labels are:

```text
Learn
Practice
Progress
```

But the app logic still has older internal hub/screen naming:

```text
today     -> alphabet / continue
path      -> path
practice  -> sentences/practice
library   -> vocabulary
listening -> listening
progress  -> stats
```

Do not rename every legacy internal identifier just to make the words section cleaner. That would be a swamp-door rewrite. Add words cleanly within the existing routing model.

### 1.3 Current state facts

Main persistent state key:

```js
const STORAGE_KEY = "hanapath-v1";
```

Existing word-related state includes:

```js
state.vocabQuery
state.vocabBand
state.vocabView
state.vocabPage
state.vocabActiveRank
state.vocabKnownRanks
state.vocabHardRanks
```

Existing alphabet state includes recently completed work:

```js
state.quickRefActive
state.alphabetWeakSpots
state.drillLabSeen
state.letterSrs
```

New Words state must be backward compatible. Do not remove old arrays until migration is proven.

### 1.4 Current vocabulary data facts

Current raw CSV file:

```text
korean_5000_claude_ready.csv
```

Current fields:

```text
rank
korean_spelling
english_spelling_romanization
frequency_band
syllables
token_note
source_url
```

The first rows include many particles, endings, bound stems, and function forms:

```text
이, 는, 을, 하, 에, 다, 의, 고, 은, 가, 를, 있, 들...
```

This is expected for a raw frequency list, but it is not a polished beginner curriculum. A frequency list is a mine, not a meal. The app must refine it before feeding it to beginners.

### 1.5 Current vocabulary code facts

Current vocabulary constants:

```js
const VOCAB_CSV_URL = "./korean_5000_claude_ready.csv";
const VOCAB_PAGE_SIZE = 40;
const VOCAB_BANDS = [
  "1-500",
  "501-1000",
  "1001-1500",
  "1501-2000",
  "2001-2500",
  "2501-3000",
  "3001-3500",
  "3501-4000",
  "4001-4500",
  "4501-5000"
];
const VOCAB_VIEWS = [
  { id: "learn", label: "Today" },
  { id: "browse", label: "Browse" },
  { id: "test", label: "Quiz" },
  { id: "review", label: "Review" }
];
```

Current parser and normalizer:

```js
parseCSV(text)
normalizeVocabEntry(row)
loadVocabBank()
```

Current normalizer returns:

```js
{
  rank,
  korean,
  englishSpelling,
  pronunciation,
  romanization,
  frequencyBand,
  syllables,
  tokenNote,
  sourceUrl,
  _rankStr,
  _koreanLower,
  _englishLower,
  _pronLower,
  _bandLower,
  _syllablesStr,
  _noteLower
}
```

This is decent for browse/search performance. Keep this pattern.

### 1.6 Current vocabulary UI facts

`renderVocabulary()` currently shows:

- Hero card: "Today's words"
- Stage/level rail
- View buttons: Today, Browse, Quiz, Review
- Today view: 10 words from the current band
- Browse view: searchable word list
- Quiz view: a generic quiz card
- Review view: earlier bands / repeat words

### 1.7 Current vocabulary quiz facts

`generateVocabQuestion()` currently supports:

- `hangul-to-roman`
- `listen`
- default `romanization-to-hangul`

That means the learner is mostly tested on spelling and romanization, not true vocabulary meaning.

### 1.8 Current performance facts

There are already good signs:

- The CSV is parsed once.
- Normalized lowercase fields are cached.
- The browser view uses pagination.
- Search focus/cursor is preserved across re-render.
- Existing UI uses mobile-first cards and rows.

New work must preserve and improve this. Do not render 5,000 DOM rows at once. Ever.

### 1.9 Current offline/cache facts

`sw.js` precaches:

```text
index.html
styles.css
lib/hangul.js
audio_map.js
app.js
alphabet_skill_srs.js
manifest.webmanifest
korean_5000_claude_ready.csv
icons
```

When changing app assets:

- bump `CACHE_NAME`
- update `index.html` query strings
- update `sw.js` query strings

This is non-negotiable. PWA cache ghosts are sneaky little gremlins.

---

## 2. Words section north star

### 2.1 User promise

The Words section must let a total beginner:

1. Open the section.
2. See today's words.
3. Tap a word.
4. Hear the word.
5. See the English meaning.
6. See how it is used in a sentence.
7. Hear the sentence.
8. Type the Korean word.
9. Repeat the word aloud.
10. Mark it known or hard.
11. Review it later.
12. Look it up instantly in the full word bank.
13. Return from the word bank to the exact lesson/question state.

### 2.2 Learning model

Use a four-pass loop:

```text
Notice -> Recognize -> Recall -> Use
```

#### Notice

The learner meets the word gently.

Show:

- Korean
- English meaning
- pronunciation
- part of speech
- usage note
- example sentence
- audio buttons

#### Recognize

The learner identifies the word.

Question types:

- Korean -> meaning
- audio -> meaning
- sentence -> meaning
- Korean -> part of speech, only for function words and grammar words

#### Recall

The learner produces the word.

Question types:

- meaning -> Korean multiple choice
- meaning -> type Korean
- audio -> type Korean
- example blank -> type / choose Korean

#### Use

The learner sees the word inside real language.

Question types:

- choose word that fits sentence
- fill sentence blank
- choose correct function particle
- choose natural phrase
- shadow word and sentence aloud

### 2.3 Design principle

Do not make vocabulary a spreadsheet wearing perfume.

Words need context. A row can exist in the massive bank, but a lesson must be a small guided trail.

---

## 3. Proposed file structure

Keep the app static and no-build. Add files in a way that can be loaded by normal `<script defer>` and `fetch()`.

### 3.1 Minimum implementation file structure

```text
/
  index.html
  app.js
  styles.css
  sw.js
  korean_5000_claude_ready.csv

  words_curated_core.js
  words_lesson_plan.js
  words_reference_helpers.js

  scripts/
    audit-alphabet-audio.mjs
    audit-words-data.mjs
    audit-words-performance.mjs

  docs/
    WORDS_SECTION_MASTER_SPEC.md
```

### 3.2 Preferred later file structure if modularization becomes acceptable

Only do this after the no-build version is working.

```text
/
  src/
    words/
      words.schema.js
      words.curated-core.js
      words.lesson-plan.js
      words.srs.js
      words.reference.js
      words.lesson-runner.js
      words.quiz-generators.js
      words.review.js
      words.typing.js
      words.audio.js
      words.migrations.js
```

Do not start here unless the owner approves a build step. The current repo is static and plain.

### 3.3 Script loading order

In `index.html`, load data before `app.js`.

```html
<script defer src="./lib/hangul.js"></script>
<script defer src="./audio_map.js"></script>
<script defer src="./words_curated_core.js?v=202607xxa"></script>
<script defer src="./words_lesson_plan.js?v=202607xxa"></script>
<script defer src="./words_reference_helpers.js?v=202607xxa"></script>
<script defer src="./app.js?v=202607xxa"></script>
<script defer src="./alphabet_skill_srs.js?v=20260630a"></script>
```

### 3.4 Why separate word files

Reasons:

- `app.js` is already huge.
- Curated word content will be large.
- Codex can edit content without touching routing.
- Future word bank audits can run on word files directly.
- It avoids burying 1,000 words in the middle of app logic.

### 3.5 Static global pattern

Because there is no module system, use carefully named globals:

```js
window.HANAPATH_CURATED_WORDS = [...]
window.HANAPATH_WORD_LESSONS = [...]
window.HANAPATH_WORD_REFERENCE_HELPERS = { ... }
```

No short global names. No generic `words`, `lessons`, `bank`.

---

## 4. Data architecture

### 4.1 Two-bank model

There must be two word sources.

#### A. Curated Learning Bank

Purpose:

- Beginner lessons
- Meaning-first learning
- SRS
- typed recall
- examples
- function word explanations

This is the bank that teaches.

#### B. Raw 5,000 Frequency Bank

Purpose:

- reference
- browse/search
- later expansion
- frequency awareness
- discovery
- advanced study

This is the bank that supports.

### 4.2 Why not teach straight from the raw 5,000 list

The raw list contains particles, endings, stems, fragments, inflections, and bound forms. Examples:

```text
이, 는, 을, 하, 에, 다, 의, 고, 은, 가, 를
```

These are important, but not beginner vocabulary in the normal "word = meaning" sense.

Bad lesson:

```text
Word: 는
Meaning: neun
```

Good lesson:

```text
Function word: 은/는
Meaning: topic marker
Example: 저는 학생이에요.
Explanation: 은/는 marks what the sentence is about. Use 는 after a vowel, 은 after a consonant.
```

### 4.3 Curated word schema

Each curated word must use this schema.

```js
{
  id: "w0001_annyeonghaseyo",
  korean: "안녕하세요",
  lemma: "안녕하세요",
  display: "안녕하세요",
  meaning: "hello",
  meaningShort: "hello",
  pos: "phrase",
  pronunciation: "annyeonghaseyo",
  hangulPronunciation: "안녕 하세요",
  exampleKo: "안녕하세요. 저는 카메론이에요.",
  exampleEn: "Hello. I am Cameron.",
  usageNote: "Safe polite greeting for most situations.",
  lessonGroup: "survival-core",
  lessonTitle: "Survival core",
  difficulty: 1,
  priority: "core",
  isFunctionWord: false,
  isPhrase: true,
  register: "polite",
  politeness: "polite",
  tags: ["greeting", "survival", "speaking"],
  collocations: [],
  related: ["w0002_gamsahamnida"],
  rawFrequencyRank: null,
  frequencyBand: "curated",
  source: "curated",
  voiceText: "안녕하세요.",
  exampleVoiceText: "안녕하세요. 저는 카메론이에요."
}
```

### 4.4 Function word schema

Function words need extra fields.

```js
{
  id: "fw0001_eun_neun",
  korean: "은/는",
  forms: ["은", "는"],
  lemma: "은/는",
  display: "은/는",
  meaning: "topic marker",
  meaningShort: "topic marker",
  pos: "particle",
  pronunciation: "eun / neun",
  exampleKo: "저는 학생이에요.",
  exampleEn: "I am a student.",
  usageNote: "Use 는 after a vowel and 은 after a consonant. It marks the topic of the sentence.",
  grammarRole: "topic",
  contrastWith: ["이/가"],
  pattern: "[topic] + 은/는",
  lessonGroup: "function-words-1",
  difficulty: 1,
  priority: "core",
  isFunctionWord: true,
  isPhrase: false,
  tags: ["particle", "topic", "grammar"],
  voiceText: "은, 는",
  exampleVoiceText: "저는 학생이에요."
}
```

### 4.5 Raw CSV normalized schema extension

Keep current raw CSV parser, but enrich normalized entries.

Current:

```js
{
  rank,
  korean,
  englishSpelling,
  pronunciation,
  romanization,
  frequencyBand,
  syllables,
  tokenNote,
  sourceUrl
}
```

Add derived fields:

```js
{
  id: `raw-${rank}`,
  source: "raw-frequency",
  meaning: "",
  pos: inferRawPos(tokenNote, korean),
  learnableNow: false,
  hasCuratedEntry: curatedByKorean.has(korean),
  curatedId: curatedByKorean.get(korean)?.id || null,
  displayMeaning: curated?.meaning || "",
  displayPos: curated?.pos || inferredPos,
  quickNote: curated?.usageNote || tokenNote
}
```

### 4.6 Curated overlay map

Create these maps after loading both banks:

```js
const curatedWords = window.HANAPATH_CURATED_WORDS || [];
const curatedById = new Map(curatedWords.map(w => [w.id, w]));
const curatedByKorean = new Map();

curatedWords.forEach(word => {
  [word.korean, word.display, ...(word.forms || [])]
    .filter(Boolean)
    .forEach(form => curatedByKorean.set(form, word));
});
```

The massive word bank should show curated data where available.

---

## 5. Massive Word Bank reference

### 5.1 Required placement

The Words section must mirror the alphabet section.

At the top of the Words section, add a permanent card:

```text
Reference
Entire Korean Word Bank
5,000 frequency items plus curated beginner words. Search Korean, English, pronunciation, grammar role, or lesson group.
```

Button/card behavior:

```text
Open Entire Word Bank
```

It should appear:

- at the top of the Vocabulary stage menu
- at the top of the Words section Today view
- as a quick reference button inside every word lesson screen
- as a quick reference button inside every word quiz/review question
- as a quick reference button inside typed recall screens

### 5.2 Quick reference behavior

Like alphabet quick reference:

1. User is in a word lesson or quiz.
2. User taps `📚 View Word Bank`.
3. The full word bank opens.
4. User searches/taps/hears any word.
5. User taps `Return to lesson`.
6. App returns to the exact same state.

Exact means:

- same lesson
- same word card
- same card side
- same question
- same typed text, where applicable
- same answered/unanswered state
- same result screen, where applicable

### 5.3 Word bank screen layout

Mobile first.

Top:

```text
Entire Korean Word Bank
Search every curated word and the 5,000 frequency list.
```

Controls:

```text
Search input
Filter chips:
  All
  Curated
  Core
  Function words
  Nouns
  Verbs
  Adjectives
  Phrases
  Raw frequency
  Known
  Hard
  Due
Band selector:
  All
  1-500
  501-1000
  ...
Sort:
  Curriculum
  Frequency
  A-Z Korean
  Known status
```

Stats row:

```text
5,000 raw
X curated
Y known
Z due
```

List columns:

```text
Korean | English | POS | Pronunciation | Example | Status
```

On mobile, row layout:

```text
[큰 Korean word]   [status pill]
English meaning
POS · pronunciation · band/rank
Example sentence, if curated
Hear button
Open detail button
```

On desktop/wide:

```text
Korean | English | POS | Pronunciation | Example | Rank/Band | Status | Audio
```

### 5.4 Word detail card

Tapping a word opens detail card:

```text
Korean: 물
Meaning: water
POS: noun
Pronunciation: mul
Example: 물 주세요.
Example meaning: Water, please.
Usage: Common noun. Often appears in ordering phrases.
Buttons:
  Hear word
  Hear example
  Type it
  Mark known
  Mark hard
  Add to review
  Back to bank
```

For raw-only entries:

```text
Korean: 는
Romanization: neun
Raw frequency rank: 2
Note: High-frequency grammar particle/ending or function form.
Learning status: Not curated yet.
Button: Request curated card / Mark for later
```

No fake meanings. If meaning is not known, do not invent it.

### 5.5 Performance requirements

The word bank must not lag.

Rules:

- Never render all 5,000 rows at once.
- Render only current page/window.
- Default page size: 50.
- Maximum visible DOM rows: 100.
- Search is debounced by 120 to 180 ms.
- Lowercase searchable fields are precomputed once.
- Use arrays and maps, not repeated DOM queries through 5,000 rows.
- Preserve search focus and cursor position.
- Use `DocumentFragment` or one `innerHTML` assignment for the visible slice only.
- Do not call `speak()` during list rendering.
- Do not attach individual heavyweight listeners to 5,000 items. Use event delegation on the list container.
- Keep audio buttons lightweight.
- On input, do not recompute curated maps.
- Store filters in state, but not every keystroke if it causes too many writes. Debounce saving or only save after search settles.

Suggested state:

```js
state.wordBankQuery = "";
state.wordBankFilter = "all";
state.wordBankSort = "curriculum";
state.wordBankPage = 0;
state.wordBankPageSize = 50;
```

### 5.6 Search fields

Each searchable entry should have:

```js
entry._search = [
  entry.korean,
  entry.display,
  entry.lemma,
  entry.meaning,
  entry.meaningShort,
  entry.pos,
  entry.pronunciation,
  entry.exampleKo,
  entry.exampleEn,
  entry.usageNote,
  entry.lessonGroup,
  entry.frequencyBand,
  entry.tokenNote,
  entry.rank
].filter(Boolean).join(" ").toLowerCase();
```

Normalize with:

```js
normalize("NFKC")
toLowerCase()
trim()
```

### 5.7 Bank acceptance criteria

- Full word bank opens from the top of Words.
- It also opens as quick reference from a word lesson.
- It also opens as quick reference from a word quiz.
- Return goes back to the exact lesson/question.
- Search works for Korean.
- Search works for English meaning.
- Search works for romanization/pronunciation.
- Search works for POS.
- Search works for lesson group.
- Filters work.
- Pagination/windowing works.
- No UI freeze when typing fast.
- 5,000 raw items remain accessible.
- Curated items show meanings and examples.
- Raw-only items are clearly marked raw/reference only.

---

## 6. Words curriculum

### 6.1 Curriculum stages

Words should unlock after alphabet mastery. Use a staged curriculum called `Word Path`.

Suggested stage names:

```text
W0: Post-Hangul bridge
W1: Survival core
W2: People and pronouns
W3: Things and demonstratives
W4: Places and movement
W5: Food and drink
W6: Time and daily rhythm
W7: Core actions
W8: Feelings and descriptions
W9: Question words
W10: Function words 1
W11: Daily life objects
W12: Home and routine
W13: Travel and city
W14: Shopping and money
W15: Korean sentence glue
W16: Media starter words
W17: Work and study
W18: Health and body
W19: Social life
W20: Review bridge
```

### 6.2 Lesson size

Each lesson should teach:

```text
5 to 7 new items
2 to 4 review items
1 function/context note maximum
```

Do not teach 10 raw words per day just because the old view does that.

### 6.3 Daily load

Default daily words:

```text
New: 5
Review due: up to 20
Stretch: 2 optional
```

If the learner is struggling:

```text
New: 3
Review due: up to 15
```

If learner is fast:

```text
New: 7
Review due: up to 30
```

Use state:

```js
state.wordsDailyNewTarget = 5;
```

### 6.4 W0: Post-Hangul bridge

Purpose:

- Transition from letters to words.
- Teach that words have meaning, pronunciation, and usage.
- Show how to use the word bank quick reference.

Items:

```text
한글       Hangul
한국어     Korean language
말         speech / words
단어       word
읽다       to read
듣다       to listen
쓰다       to write / use
```

First lesson should be almost tutorial-like.

### 6.5 W1: Survival core

Items:

```text
안녕하세요     hello
감사합니다     thank you
네             yes
아니요         no
죄송합니다     sorry
괜찮아요       it is okay
주세요         please give me
도와주세요     please help me
잠시만요       one moment
몰라요         I do not know
알겠어요       I understand
```

### 6.6 W2: People and pronouns

Items:

```text
저       I / me
나       I / me, casual
너       you, casual
우리     we / our
사람     person
친구     friend
학생     student
선생님   teacher
이름     name
누구     who
```

### 6.7 W3: Things and demonstratives

Items:

```text
이       this
그       that
저       that over there
이거     this thing
그거     that thing
저거     that thing over there
것       thing
뭐       what
책       book
전화     phone
```

### 6.8 W4: Places and movement

Items:

```text
여기       here
거기       there
저기       over there
집         home
학교       school
회사       company / work
화장실     bathroom
역         station
가다       to go
오다       to come
```

### 6.9 W5: Food and drink

Items:

```text
물       water
밥       rice / meal
음식     food
커피     coffee
차       tea / car, context decides
고기     meat
과일     fruit
빵       bread
먹다     to eat
마시다   to drink
```

### 6.10 W6: Time and daily rhythm

Items:

```text
오늘       today
내일       tomorrow
어제       yesterday
지금       now
시간       time / hour
아침       morning / breakfast
점심       lunch
저녁       evening / dinner
날         day
언제       when
```

### 6.11 W7: Core actions

Items:

```text
하다       to do
있다       to exist / have
없다       to not exist / not have
보다       to see / watch
듣다       to listen
말하다     to speak
읽다       to read
쓰다       to write / use
사다       to buy
만나다     to meet
```

### 6.12 W8: Feelings and descriptions

Items:

```text
좋다       to be good
싫다       to dislike / be bad in preference
크다       to be big
작다       to be small
많다       to be many
적다       to be few
재미있다   to be fun
피곤하다   to be tired
괜찮다     to be okay
맛있다     to be delicious
```

### 6.13 W9: Question words

Items:

```text
뭐       what
누구     who
어디     where
언제     when
왜       why
어떻게   how
얼마     how much
몇       how many / what number
무슨     what kind of
어떤     what kind of / which
```

### 6.14 W10: Function words 1

Items:

```text
은/는     topic marker
이/가     subject marker
을/를     object marker
에         location/time marker
에서       action location / from
도         also / too
의         possession / of
와/과     and / with
하고       and / with
고         and / then
```

Teach these as function cards, not normal words.

### 6.15 Later curriculum groups

Add later as content expands:

```text
W11: Daily life objects
W12: Home and routine
W13: Travel and city
W14: Shopping and money
W15: Korean sentence glue
W16: Media starter words
W17: Work and study
W18: Health and body
W19: Social life
W20: Review bridge
```

Each should have 20 to 40 curated items eventually.

### 6.16 Massive bank target

Targets:

```text
Initial implementation: 120 curated items
Near-term: 500 curated items
Medium-term: 1,000 curated items
Long-term: 5,000 raw entries enriched or linked to curated/grammar/reference data
```

Minimum first PR:

```text
120 curated items across W0-W10
5,000 raw entries still searchable
```

Do not block implementation waiting for all 5,000 to be manually enriched.

---

## 7. Words section navigation and screens

### 7.1 Top-level Words section

When Hangul is complete and user opens Learn -> Vocabulary:

Show:

```text
Card 1: Continue words
  Continue: Survival core / current lesson
  New words today: 5
  Reviews due: N

Card 2: Entire Korean Word Bank
  Massive reference, search, hear, return to lesson

Card 3: Today's lesson
  5 new words
  2 review words
  Start lesson

Card 4: Review due
  N due
  Start review

Card 5: Word Path
  W0, W1, W2...
```

### 7.2 Vocabulary views

Keep:

```js
VOCAB_VIEWS = [
  { id: "learn", label: "Today" },
  { id: "browse", label: "Browse" },
  { id: "test", label: "Quiz" },
  { id: "review", label: "Review" }
];
```

But improve behavior:

#### Today

Guided lesson.

#### Browse

Massive bank.

#### Quiz

Practice modes.

#### Review

Due SRS queue.

### 7.3 New route state

Add:

```js
state.wordLesson = {
  activeLessonId: "w1-survival-core-01",
  mode: "intro", // intro | card | check | result
  cardIndex: 0,
  questionIndex: 0,
  answered: false,
  response: null,
  sessionResults: [],
  returnPoint: null
};
```

Or keep in volatile memory with persisted resume, similar to `phaseOneView`.

### 7.4 Exact quick-reference return

Add a word quick reference return state:

```js
let wordLessonView = {
  lessonId,
  mode,
  cardIndex,
  questionIndex,
  answered,
  typedValue,
  selectedChoice,
  resultState
};

state.wordQuickRefActive = false;
state.wordQuickRefReturn = null;
```

When opening reference:

```js
saveWordReturnPoint();
state.wordQuickRefActive = true;
openEntireWordBank({ returnable: true });
```

When returning:

```js
state.wordQuickRefActive = false;
restoreWordReturnPoint();
```

### 7.5 Learn menu entry

In `renderLearnStageMenu("vocabulary")`, add top entry:

```text
Entire Korean Word Bank
```

Analogous to alphabet's `Entire Korean alphabet`.

### 7.6 Word bank entry should not require lesson progress

The full word bank is reference. It should always be accessible once vocabulary is unlocked.

---

## 8. Word lesson flow

### 8.1 Lesson object schema

```js
{
  id: "w1-survival-core-01",
  stage: "W1",
  title: "Survival core",
  subtitle: "Words you can use immediately",
  goal: "Understand, hear, type, and say 5 survival words.",
  unlock: {
    requiresAlphabetComplete: true,
    previousLessonId: null
  },
  newWordIds: [
    "w0001_annyeonghaseyo",
    "w0002_gamsahamnida",
    "w0003_ne",
    "w0004_aniyo",
    "w0005_juseyo"
  ],
  reviewPolicy: {
    includeDue: true,
    maxReviewCards: 4
  },
  checkpoints: [
    "ko-to-meaning",
    "audio-to-meaning",
    "meaning-to-ko",
    "type-ko",
    "sentence-blank",
    "shadow"
  ],
  pass: {
    minFirstTryPct: 75,
    requireTypedAttempt: true
  }
}
```

### 8.2 Lesson intro screen

Shows:

```text
Stage W1
Survival core
Today you will learn 5 words.
You will hear each word, type it once, and use it in a tiny sentence.
```

Buttons:

```text
Start
View Word Bank
```

### 8.3 Word study card

Each word card shows:

```text
[Progress] Word 1 of 5

Korean:
안녕하세요

Meaning:
hello

Pronunciation:
annyeonghaseyo

Example:
안녕하세요. 저는 카메론이에요.
Hello. I am Cameron.

Usage:
Safe polite greeting for most situations.

Buttons:
Hear word
Hear example
Type it
Repeat aloud
Hard
Known
Next
View Word Bank
```

### 8.4 Hear word

Behavior:

- Calls `speak(word.voiceText || word.korean)`.
- Highlights the Korean word while playing.
- If audio exists in `audio_map.js`, use it.
- Else browser TTS fallback.

### 8.5 Type it

The user must type the word at least once in each lesson.

Input:

```text
Type 안녕하세요
[textarea/input]
```

But do not make keyboard setup a blocker.

Support two modes:

1. Real typing with Korean keyboard.
2. Tap-to-build from syllable chunks for beginners.

For early lessons, show a helper:

```text
No Korean keyboard yet? Tap the blocks below.
[안] [녕] [하] [세] [요]
```

Acceptance:

- Exact Hangul match after normalization.
- Ignore spaces for phrase words only if `allowSpaceFlexible` is true.
- For particles with multiple forms, accept any form in `forms`.

### 8.6 Repeat aloud

No speech recognition required in first implementation.

Use self-check:

```text
1. Tap Hear.
2. Say it out loud.
3. Tap "I said it".
```

This avoids fake speech scoring. Later, add speech recognition only if stable.

### 8.7 Recognition checkpoint

Question:

```text
What does 안녕하세요 mean?
A. hello
B. thank you
C. no
D. water
```

Feedback:

```text
Correct. 안녕하세요 means hello. It is a safe polite greeting.
```

Wrong feedback:

```text
Not quite. 안녕하세요 means hello. Listen once more and look at the example.
```

### 8.8 Listening checkpoint

Question:

```text
Listen, then choose the meaning.
[Replay]
A. hello
B. sorry
C. water
D. tomorrow
```

### 8.9 Recall checkpoint

Question:

```text
Which Korean word means "thank you"?
A. 감사합니다
B. 아니요
C. 물
D. 오늘
```

### 8.10 Typed recall checkpoint

Question:

```text
Type the Korean for "water".
```

Helper for early lessons:

```text
Hint: it has 1 syllable.
Optional blocks: [물] [불] [말]
```

### 8.11 Context checkpoint

Question:

```text
Complete the sentence:
____ 주세요.
Meaning: Water, please.
A. 물
B. 집
C. 친구
D. 오늘
```

### 8.12 Function word checkpoint

For particles:

```text
Choose the right topic marker:
저__ 학생이에요.
A. 는
B. 을
C. 에
D. 의
```

Feedback:

```text
Correct. 저 ends in a vowel, so 는 is the topic marker here.
```

### 8.13 Result screen

Shows:

```text
Survival core complete

New words:
5

Typed:
5/5

Accuracy:
82%

Known:
3

Shaky:
2

Due for review:
5
```

Buttons:

```text
Review shaky words
Next word lesson
Open Word Bank
Done
```

### 8.14 Lesson pass behavior

A learner should not be blocked forever.

Pass criteria:

- User saw all cards.
- User attempted typing for each new word.
- User completed checkpoints.
- First-try accuracy unlocks next lesson if above threshold.
- If below threshold, offer review and retry, but still keep the words in SRS.

---

## 9. SRS design

### 9.1 Why new SRS is needed

Current `vocabKnownRanks` and `vocabHardRanks` are not enough. They track status, not memory.

Need due dates.

### 9.2 State shape

Add:

```js
state.vocabSrs = {
  [wordId]: {
    box: 0,
    due: 0,
    seen: 0,
    correct: 0,
    missed: 0,
    lastSeen: 0,
    lastResult: null,
    isKnown: false,
    isHard: false,
    leech: false,
    directions: {
      koToMeaning: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 },
      meaningToKo: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 },
      audioToMeaning: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 },
      audioToKo: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 },
      typeKo: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 },
      context: { seen: 0, correct: 0, missed: 0, box: 0, due: 0 }
    }
  }
};
```

### 9.3 Intervals

Simple intervals:

```js
const VOCAB_SRS_INTERVALS = [
  5 * 60 * 1000,              // box 0: 5 minutes
  20 * 60 * 1000,             // box 1: 20 minutes
  24 * 60 * 60 * 1000,        // box 2: 1 day
  3 * 24 * 60 * 60 * 1000,    // box 3: 3 days
  7 * 24 * 60 * 60 * 1000,    // box 4: 7 days
  14 * 24 * 60 * 60 * 1000,   // box 5: 14 days
  30 * 24 * 60 * 60 * 1000,   // box 6: 30 days
  60 * 24 * 60 * 60 * 1000    // box 7: 60 days
];
```

### 9.4 Correct answer behavior

If correct:

```js
box = Math.min(box + 1, maxBox)
due = now + interval[box]
correct += 1
seen += 1
```

### 9.5 Wrong answer behavior

If wrong:

```js
box = 0
due = now + 5 minutes
missed += 1
seen += 1
isHard = true
```

If missed many times:

```js
leech = missed >= 5 && missed / seen > 0.45
```

### 9.6 Manual known/hard

Manual buttons should update both legacy and new state.

Known:

```js
state.vocabKnownRanks.add(rawRank if any)
state.vocabHardRanks.remove(rawRank if any)
srs.isKnown = true
srs.isHard = false
srs.box = Math.max(srs.box, 4)
srs.due = now + 7 days
```

Hard:

```js
state.vocabHardRanks.add(rawRank if any)
state.vocabKnownRanks.remove(rawRank if any)
srs.isHard = true
srs.isKnown = false
srs.box = 0
srs.due = now + 5 minutes
```

### 9.7 Due queue

Due queue priority:

1. Due and hard
2. Due and missed recently
3. Due typed recall
4. Due audio
5. Due recognition
6. New words from current lesson

### 9.8 Review screen

Show:

```text
Review due
N cards waiting

Buckets:
Hard
Due today
Listening
Typing
Context
```

Buttons:

```text
Start mixed review
Review hard words
Review typing
Review listening
```

### 9.9 Review session result

Shows:

```text
Reviewed: 20
Correct: 16
Missed: 4
Typed correctly: 7/10
Words promoted: 12
Words reset: 4
Next review: 5 minutes / tomorrow
```

---

## 10. Quiz and practice modes

### 10.1 Word question schema

All word question generators should return:

```js
{
  kind: "Words",
  mode: "Korean -> meaning",
  wordId: "w0001_annyeonghaseyo",
  direction: "koToMeaning",
  prompt: "What does this word mean?",
  detail: "Survival core • phrase • polite",
  visual: "...",
  interaction: "choice", // choice | type | build | selfCheck
  options: [],
  answer: "hello",
  acceptedAnswers: ["hello"],
  explanation: "안녕하세요 means hello. It is a polite greeting.",
  voiceText: "안녕하세요.",
  autoSpeak: false,
  helper: "Tap Hear if you want to listen again."
}
```

### 10.2 Required generators

Implement:

```js
generateWordKoToMeaningQuestion(word)
generateWordMeaningToKoQuestion(word)
generateWordAudioToMeaningQuestion(word)
generateWordAudioToKoQuestion(word)
generateWordTypeKoQuestion(word)
generateWordSentenceBlankQuestion(word)
generateWordSituationQuestion(word)
generateFunctionWordUsageQuestion(word)
generateWordShadowQuestion(word)
```

### 10.3 Typed question support

Current app has `interaction: "type"` support for sentence dictation. Reuse it, but add word-specific acceptance.

Need:

```js
normalizeKoreanAnswer(value)
isWordAnswerCorrect(userAnswer, question)
```

For Korean:

- normalize Unicode
- trim spaces
- remove extra internal spaces only when allowed
- accept forms for particles
- accept punctuation-free phrase

### 10.4 Build/tap support

For early lessons:

```js
interaction: "build-word"
```

Or reuse sentence builder patterns.

Example:

```text
Target: 감사합니다
Tiles: 감 / 사 / 합 / 니 / 다 / 물 / 네
```

Learner taps syllable chunks.

### 10.5 Self-check support

For speaking/shadowing:

```js
interaction: "self-check"
```

Buttons:

```text
Hear
I said it
Try again
```

Do not pretend to grade pronunciation.

### 10.6 Mixed quiz composition

Default word quiz weights:

```text
Korean -> meaning: 25%
Meaning -> Korean: 20%
Audio -> meaning: 20%
Audio -> Korean: 10%
Type Korean: 10%
Sentence blank: 10%
Function usage / situation: 5%
```

For brand-new words:

```text
more recognition
less typed recall
```

For known words:

```text
more recall and context
less recognition
```

For hard words:

```text
meaning, audio, and typing all return quickly
```

---

## 11. Audio and pronunciation

### 11.1 Audio rules

Use existing audio helpers:

```js
lookupAudioUrl()
normalizeAudioKey()
speak()
hearIconButton()
```

Do not raw index `AUDIO_MAP[text]`.

### 11.2 Word audio buttons

Every word card needs:

```text
Hear word
Hear example
```

Every quiz question with audio needs:

```text
Replay
```

### 11.3 Tap-to-hear

All visible Korean text in word study cards should be tap-to-hear where reasonable:

- word
- example sentence
- function word forms

Reuse `renderFlashableHangulText()` or equivalent helper if safe.

### 11.4 Audio asset policy

First implementation may use browser TTS fallback.

Later:

- Generate mp3 for curated words.
- Generate mp3 for curated examples.
- Add audit script to confirm coverage.

### 11.5 Audio audit script

Add:

```text
scripts/audit-words-data.mjs
```

Checks:

- every curated word has `voiceText`
- every curated word has `exampleVoiceText`
- `voiceText` contains Hangul
- no English-only text is sent to audio keys
- no duplicate IDs
- no missing meanings
- no missing POS
- no missing lesson group
- examples are not empty for core items

Optional strict mode:

```bash
node scripts/audit-words-data.mjs --strict
```

---

## 12. UI detail

### 12.1 New CSS classes

Add minimal CSS:

```css
.word-bank-entry
.word-bank-toolbar
.word-bank-search
.word-bank-filter-row
.word-bank-list
.word-bank-row
.word-bank-ko
.word-bank-en
.word-bank-meta
.word-bank-status
.word-bank-detail
.word-card
.word-card-ko
.word-card-meaning
.word-example
.word-type-box
.word-shadow-card
.word-result-grid
.word-reference-row
.word-lesson-progress
.word-srs-bucket
```

Keep style consistent with existing cards, study rows, pills, quiz card, and alphabet reference.

### 12.2 Word card visual hierarchy

Korean word should be large.

```text
물
water
noun · mul
```

Example should be visually separate:

```text
물 주세요.
Water, please.
```

Usage note should be small and clear:

```text
Use this when ordering or asking for water.
```

### 12.3 Important microcopy

Use plain beginner language.

Good:

```text
Tap Hear, then say it once.
```

Bad:

```text
Engage phonological retrieval for durable encoding.
```

Good:

```text
Type the Korean word. No Korean keyboard? Use the syllable tiles.
```

Bad:

```text
Input lexical target.
```

### 12.4 Empty states

No scary blank cards.

If no due reviews:

```text
No reviews due. Learn 5 new words or browse the word bank.
```

If raw CSV fails:

```text
The 5,000-word bank did not load. Curated lessons still work.
```

If curated file fails:

```text
Curated word lessons did not load. The raw word bank is still available.
```

### 12.5 Accessibility

Must have:

- real button labels
- `aria-live="polite"` for feedback
- visible focus
- no icon-only button without `aria-label`
- keyboard support for choices
- keyboard support for word bank search and pagination
- detail card announced when selected
- audio buttons named, for example `Hear 물`

---

## 13. Current code integration plan

### 13.1 Add new defaults to `loadState()`

Add:

```js
wordBankQuery: "",
wordBankFilter: "all",
wordBankSort: "curriculum",
wordBankPage: 0,
wordBankPageSize: 50,

wordQuickRefActive: false,
wordQuickRefReturn: null,

wordLessonActiveId: null,
wordLessonMode: "intro",
wordLessonCardIndex: 0,
wordLessonQuestionIndex: 0,
wordLessonResults: [],

vocabSrs: {},
vocabLessonCompleted: [],
vocabLessonActive: null,
vocabDailyNewTarget: 5
```

### 13.2 Add migration

Add:

```js
function migrateVocabState() {
  if (!state.vocabSrs || typeof state.vocabSrs !== "object") state.vocabSrs = {};
  if (!Array.isArray(state.vocabLessonCompleted)) state.vocabLessonCompleted = [];
  // Convert old known/hard ranks into soft SRS hints where possible.
}
```

Call after `state` load and before render.

### 13.3 Keep old fields alive

Do not remove:

```js
vocabKnownRanks
vocabHardRanks
vocabActiveRank
vocabBand
vocabPage
```

Map curated word known/hard to old rank only if it has `rawFrequencyRank`.

### 13.4 New bank loading function

Add:

```js
function getCuratedWordBank() {}
function getWordLessons() {}
function buildWordReferenceBank() {}
function loadWordBanks() {}
```

`loadWordBanks()` should:

1. load raw CSV via existing `loadVocabBank()`
2. read curated globals
3. build maps
4. build combined reference rows
5. cache searchable strings

### 13.5 Reference rows

Unified row:

```js
{
  id,
  source: "curated" | "raw" | "merged",
  korean,
  display,
  meaning,
  pos,
  pronunciation,
  exampleKo,
  exampleEn,
  usageNote,
  lessonGroup,
  rank,
  frequencyBand,
  status,
  srsDue,
  _search
}
```

### 13.6 Render functions

Add:

```js
renderWordSectionHome()
renderEntireWordBank(options)
renderWordBankToolbar()
renderWordBankRows()
renderWordBankDetail(wordId)
openEntireWordBank(options)
returnFromWordBankReference()
```

### 13.7 Lesson functions

Add:

```js
renderWordLessonMenu()
openWordLesson(lessonId, options)
renderWordLessonIntro(lesson)
renderWordStudyCard(lesson)
renderWordLessonQuestion(lesson)
renderWordLessonResult(lesson)
advanceWordLesson()
goBackWordLesson()
saveWordLessonReturnPoint()
restoreWordLessonReturnPoint()
```

### 13.8 SRS functions

Add:

```js
getVocabSrsRecord(wordId)
recordVocabAttempt(wordId, direction, isCorrect)
setCuratedWordStatus(wordId, status)
getDueVocabReviews(options)
getVocabDueCount()
startVocabReviewSession(mode)
renderVocabReviewQuestion()
renderVocabReviewResult()
```

### 13.9 Generator functions

Add:

```js
generateWordQuestion(wordId, direction)
generateWordKoToMeaningQuestion(word)
generateWordMeaningToKoQuestion(word)
generateWordAudioToMeaningQuestion(word)
generateWordAudioToKoQuestion(word)
generateWordTypeKoQuestion(word)
generateWordSentenceBlankQuestion(word)
generateFunctionWordUsageQuestion(word)
generateWordSituationQuestion(word)
```

### 13.10 RenderVocabulary integration

Modify `renderVocabulary()`:

- Top card should say "Words" not just "Today's words" if in learn mode.
- Always show Entire Word Bank card near top.
- `learn` view becomes guided lesson.
- `browse` view becomes full word bank.
- `test` view uses meaning-based generators.
- `review` view uses due SRS.

### 13.11 Practice integration

Practice -> Vocabulary quiz should use new word quiz generator, not romanization-only questions.

### 13.12 Today/Continue integration

After Hangul complete, Today should show:

```text
Today's new words
Continue your current word lesson
```

Not only generic `Learn words`.

### 13.13 Service worker

If adding files:

```js
"./words_curated_core.js?v=202607xxa",
"./words_lesson_plan.js?v=202607xxa",
"./words_reference_helpers.js?v=202607xxa",
```

Update cache:

```js
const CACHE_NAME = "hanapath-shell-v100";
```

Also update query strings in `index.html`.

---

## 14. Content build plan

### 14.1 First content PR target

Add at least 120 curated items.

Suggested split:

```text
W0 Post-Hangul bridge: 10
W1 Survival core: 15
W2 People and pronouns: 12
W3 Things and demonstratives: 12
W4 Places and movement: 12
W5 Food and drink: 12
W6 Time: 12
W7 Core actions: 15
W8 Feelings/descriptions: 12
W9 Question words: 10
W10 Function words: 18
```

### 14.2 Do not overteach

For each lesson, show 5 to 7 words. A 120-item bank can feed many short lessons.

### 14.3 Example curated item list

Minimum words to include:

```text
안녕하세요, 감사합니다, 네, 아니요, 죄송합니다, 괜찮아요, 주세요, 도와주세요, 잠시만요, 몰라요,
저, 나, 너, 우리, 사람, 친구, 학생, 선생님, 이름, 누구,
이, 그, 저, 이거, 그거, 저거, 것, 뭐, 책, 전화,
여기, 거기, 저기, 집, 학교, 회사, 화장실, 역, 가다, 오다,
물, 밥, 음식, 커피, 차, 고기, 과일, 빵, 먹다, 마시다,
오늘, 내일, 어제, 지금, 시간, 아침, 점심, 저녁, 날, 언제,
하다, 있다, 없다, 보다, 듣다, 말하다, 읽다, 쓰다, 사다, 만나다,
좋다, 싫다, 크다, 작다, 많다, 적다, 재미있다, 피곤하다, 괜찮다, 맛있다,
뭐, 누구, 어디, 언제, 왜, 어떻게, 얼마, 몇, 무슨, 어떤,
은/는, 이/가, 을/를, 에, 에서, 도, 의, 와/과, 하고, 고
```

### 14.4 Example sentences

Every curated item needs a simple example. Examples should use words already taught where possible.

Bad:

```text
안녕하세요. 국제관계학과 대학원생입니다.
```

Good:

```text
안녕하세요. 저는 학생이에요.
```

### 14.5 Function word examples

Particles need paired examples:

```text
저는 학생이에요.
제가 가요.
물을 마셔요.
집에 가요.
학교에서 공부해요.
저도 가요.
저의 이름은 카메론이에요.
친구와 가요.
밥하고 물 주세요.
먹고 가요.
```

### 14.6 Content quality rules

Each curated entry must have:

- natural Korean
- beginner-safe English
- short example
- no unexplained advanced grammar in the first lessons
- voiceText exactly Korean
- no English in audio fields
- stable ID
- lesson group
- difficulty

### 14.7 Raw bank relationship

When curated item matches raw frequency item:

```js
rawFrequencyRank: 102
frequencyBand: "1-500"
```

If unknown:

```js
rawFrequencyRank: null
frequencyBand: "curated"
```

Do not spend the first implementation matching every curated item to frequency rank manually unless easy.

---

## 15. Non-laggy massive list implementation

### 15.1 Data preparation

Build once:

```js
let wordReferenceRows = [];
let wordReferenceById = new Map();
let wordReferenceFilteredCache = null;
let wordReferenceCacheKey = "";
```

### 15.2 Filter key

```js
function getWordReferenceCacheKey() {
  return [
    state.wordBankQuery,
    state.wordBankFilter,
    state.wordBankSort,
    vocabBank.length,
    curatedWords.length,
    state.vocabKnownRanks.length,
    state.vocabHardRanks.length,
    Object.keys(state.vocabSrs || {}).length
  ].join("|");
}
```

### 15.3 Filtering

```js
function getFilteredWordReferenceRows() {
  const key = getWordReferenceCacheKey();
  if (wordReferenceFilteredCache && wordReferenceCacheKey === key) return wordReferenceFilteredCache;

  let rows = wordReferenceRows;
  const q = normalizeSearch(state.wordBankQuery);
  if (q) rows = rows.filter(row => row._search.includes(q));

  rows = applyWordBankFilter(rows, state.wordBankFilter);
  rows = sortWordReferenceRows(rows, state.wordBankSort);

  wordReferenceCacheKey = key;
  wordReferenceFilteredCache = rows;
  return rows;
}
```

### 15.4 Pagination

```js
function getVisibleWordBankRows() {
  const rows = getFilteredWordReferenceRows();
  const pageSize = state.wordBankPageSize || 50;
  const start = state.wordBankPage * pageSize;
  return rows.slice(start, start + pageSize);
}
```

### 15.5 Row event delegation

```js
container.addEventListener("click", event => {
  const hear = event.target.closest("[data-word-hear]");
  const open = event.target.closest("[data-word-open]");
  const known = event.target.closest("[data-word-known]");
  const hard = event.target.closest("[data-word-hard]");
});
```

Do not bind 5,000 listeners.

### 15.6 Rendering limit

If a search returns 5,000 rows:

```text
Showing 1-50 of 5,000
```

Buttons:

```text
Previous
Next
Page select maybe later
```

### 15.7 Virtualization optional

Pagination is enough for 5,000. Avoid complex virtualization unless needed.

---

## 16. Detailed implementation phases

### Phase 0: Safety baseline

Checklist:

- [ ] Confirm no open PRs conflict.
- [ ] Branch from `main`.
- [ ] Read `HANDOVER.md`.
- [ ] Read `README.md`.
- [ ] Read `index.html`.
- [ ] Read `app.js` vocabulary functions.
- [ ] Read `sw.js`.
- [ ] Read `styles.css` relevant card/list/quiz classes.
- [ ] Run `node --check app.js`.
- [ ] Do not edit alphabet unless required for shared helper safety.

### Phase 1: Add curated data files

Files:

```text
words_curated_core.js
words_lesson_plan.js
```

Checklist:

- [ ] Add `window.HANAPATH_CURATED_WORDS`.
- [ ] Add `window.HANAPATH_WORD_LESSONS`.
- [ ] Add at least 120 curated items.
- [ ] Add stable IDs.
- [ ] Add examples.
- [ ] Add function word entries.
- [ ] Add `voiceText` and `exampleVoiceText`.
- [ ] Add lesson groups W0-W10.
- [ ] Add no English-only audio fields.
- [ ] Add script tags in `index.html`.
- [ ] Add files to `sw.js` precache.
- [ ] Bump cache and query strings.

### Phase 2: Add word data adapter

In `app.js`, add:

- [ ] curated bank reader
- [ ] raw bank overlay
- [ ] unified reference rows
- [ ] maps by id and Korean
- [ ] search normalization
- [ ] status lookup

Functions:

```js
getCuratedWords()
getWordLessons()
normalizeWordItem()
buildWordReferenceRows()
getWordById()
getWordStatus()
```

### Phase 3: Add SRS state and migration

Checklist:

- [ ] Add default `vocabSrs`.
- [ ] Add default word lesson state.
- [ ] Add `migrateVocabState()`.
- [ ] Preserve old known/hard ranks.
- [ ] Add `recordVocabAttempt()`.
- [ ] Add `getDueVocabReviews()`.
- [ ] Add `getVocabDueCount()`.
- [ ] Add direction-specific stats.
- [ ] Add due intervals.
- [ ] Add leech/hard logic.

### Phase 4: Build Entire Word Bank screen

Checklist:

- [ ] Add top entry card in vocabulary menu.
- [ ] Add combined curated/raw reference.
- [ ] Add search.
- [ ] Add filters.
- [ ] Add sort.
- [ ] Add pagination.
- [ ] Add detail card.
- [ ] Add audio buttons.
- [ ] Add status buttons.
- [ ] Add curated/raw distinction.
- [ ] Add return to lesson button when opened as quick reference.
- [ ] Ensure no lag with 5,000 items.

### Phase 5: Add word quick reference

Checklist:

- [ ] Add `wordReferenceButtonHtml()`.
- [ ] Add button to lesson intro.
- [ ] Add button to word cards.
- [ ] Add button to recognition questions.
- [ ] Add button to typed questions.
- [ ] Add button to result screen.
- [ ] Add return state save/restore.
- [ ] Return to exact card/question.
- [ ] Preserve typed input where applicable.
- [ ] Preserve answered state where applicable.
- [ ] Test from every screen.

### Phase 6: Build guided word lessons

Checklist:

- [ ] Lesson menu.
- [ ] Lesson intro.
- [ ] Word study card.
- [ ] Hear word.
- [ ] Hear example.
- [ ] Type it.
- [ ] Syllable/chunk helper.
- [ ] Repeat aloud self-check.
- [ ] Recognition checkpoint.
- [ ] Recall checkpoint.
- [ ] Context checkpoint.
- [ ] Function word checkpoint.
- [ ] Result screen.
- [ ] Next lesson unlock.

### Phase 7: Replace vocabulary quiz logic

Checklist:

- [ ] Keep legacy romanization quiz as optional "Reading check".
- [ ] Add meaning-based default quiz.
- [ ] Add audio-to-meaning.
- [ ] Add meaning-to-Korean.
- [ ] Add typed recall.
- [ ] Add sentence blank.
- [ ] Add function usage.
- [ ] Record SRS attempts.
- [ ] Use current lesson and due cards before random raw words.

### Phase 8: Build review screen

Checklist:

- [ ] Show due count.
- [ ] Show due buckets.
- [ ] Start mixed review.
- [ ] Start hard review.
- [ ] Start typing review.
- [ ] Start listening review.
- [ ] Result screen.
- [ ] Promote/demote cards.
- [ ] Show next due estimate.

### Phase 9: Integrate Today and Progress

Checklist:

- [ ] After Hangul complete, Today points to next word lesson.
- [ ] Continue card shows due reviews.
- [ ] Progress stats show words learned.
- [ ] Progress stats show due reviews.
- [ ] K-level unlocks use real word counts and review performance.
- [ ] Old unlock conditions still work or are migrated carefully.

### Phase 10: Add audit scripts

Files:

```text
scripts/audit-words-data.mjs
scripts/audit-words-performance.mjs
```

Data audit checklist:

- [ ] duplicate IDs fail
- [ ] missing Korean fails
- [ ] missing meaning fails for curated words
- [ ] missing POS fails
- [ ] missing lesson group fails
- [ ] missing example fails for core
- [ ] missing voiceText fails
- [ ] English in voiceText fails
- [ ] malformed lesson references fail

Performance audit checklist:

- [ ] reference row build under reasonable threshold
- [ ] filtering 5,000 rows under reasonable threshold
- [ ] rendering function only renders page slice
- [ ] no known full-bank `map(...).join("")` into DOM without slice

### Phase 11: Testing

Checklist:

- [ ] `node --check app.js`
- [ ] `node scripts/audit-alphabet-audio.mjs --strict`
- [ ] `node scripts/audit-words-data.mjs --strict`
- [ ] Fresh profile.
- [ ] Complete or seed alphabet mastery.
- [ ] Open Words.
- [ ] Start first word lesson.
- [ ] Hear every word.
- [ ] Hear every example.
- [ ] Type every word.
- [ ] Answer wrong then correct.
- [ ] Confirm feedback.
- [ ] Open word bank from lesson.
- [ ] Return to exact lesson card.
- [ ] Open word bank from typed question.
- [ ] Return with typed value preserved.
- [ ] Search raw bank for `는`.
- [ ] Search curated bank for `water`.
- [ ] Filter function words.
- [ ] Mark known.
- [ ] Mark hard.
- [ ] Review due appears.
- [ ] Hard word appears sooner.
- [ ] Known word appears later.
- [ ] Practice -> Vocabulary uses meaning questions.
- [ ] No runtime errors.
- [ ] Mobile layout.
- [ ] Service worker cache update.

---

## 17. Cold-user test script

Use this exact playtest script.

### 17.1 Fresh user

1. Clear localStorage.
2. Seed or complete alphabet mastery.
3. Open Learn.
4. Tap Vocabulary.
5. Observe first screen.

Expected:

- Clear "Words" section.
- Top card for Entire Word Bank.
- Clear next action: start today's word lesson.
- Review due count visible.
- No raw frequency swamp.

### 17.2 Learn a word

1. Start first word lesson.
2. See intro.
3. Tap Start.
4. On first word card, tap Hear word.
5. Tap Hear example.
6. Tap Type it.
7. Type the word or use chunks.
8. Tap Repeat aloud.
9. Tap Next.

Expected:

- User always knows what to do.
- Audio buttons are obvious.
- Typing helper exists.
- No unexplained UI.

### 17.3 Wrong answer

1. On recognition question, pick wrong answer.
2. Read feedback.
3. Continue.

Expected:

- Feedback gives correct answer and short explanation.
- Mistake records to SRS.
- User is not blocked.
- Same word comes back sooner.

### 17.4 Quick reference

1. On a word card, tap View Word Bank.
2. Search `water`.
3. Open `물`.
4. Hear it.
5. Tap Return to lesson.

Expected:

- Returns to exact same card.
- No progress lost.

Repeat from:

- intro
- word card
- typed question
- answered multiple-choice question
- result screen

### 17.5 Massive bank

1. Open Entire Word Bank.
2. Search Korean.
3. Search English.
4. Search romanization.
5. Filter function words.
6. Filter curated.
7. Next page.
8. Open raw-only item.
9. Open curated item.

Expected:

- No lag.
- Search focus preserved.
- Raw-only item is honest.
- Curated item is rich.

### 17.6 Review

1. Mark a few words hard.
2. Start review.
3. Answer wrong.
4. Finish review.
5. Check due count.

Expected:

- Hard words come back soon.
- Known words move later.
- Result screen explains next review.

---

## 18. Acceptance criteria

### 18.1 Product

- [ ] Words section feels like a real guided learning path.
- [ ] Learner can see, hear, type, repeat, and review each word.
- [ ] Full word bank is always accessible at top of Words.
- [ ] Full word bank is also available as quick reference inside lessons/quizzes.
- [ ] Quick reference returns to exact state.
- [ ] Raw 5,000 list remains available.
- [ ] Curated beginner lessons teach meanings and context.
- [ ] Function words are explained as grammar/function cards.
- [ ] Word list is not laggy.

### 18.2 Technical

- [ ] No build step introduced.
- [ ] Alphabet not broken.
- [ ] Existing CSV still loads.
- [ ] New curated files load.
- [ ] State migration is safe.
- [ ] SRS due dates work.
- [ ] Review queue works.
- [ ] Service worker cache bumped.
- [ ] `node --check app.js` passes.
- [ ] Word data audit passes.
- [ ] Alphabet audio audit still passes.

### 18.3 UX

- [ ] Every screen has obvious next action.
- [ ] Every Korean word has hear button or tap-to-hear.
- [ ] Typed recall has clear instructions.
- [ ] No Korean keyboard panic for beginners.
- [ ] Feedback explains mistakes.
- [ ] Result screens show what happened and what to do next.
- [ ] Quick reference is discoverable.

---

## 19. Do not do

- [ ] Do not delete alphabet code.
- [ ] Do not rewrite the entire router.
- [ ] Do not add a framework.
- [ ] Do not render 5,000 rows at once.
- [ ] Do not invent meanings for raw frequency entries.
- [ ] Do not teach particles as romanization-only words.
- [ ] Do not make speech recognition mandatory.
- [ ] Do not remove old `vocabKnownRanks` / `vocabHardRanks` without migration.
- [ ] Do not forget service worker cache versioning.
- [ ] Do not bury huge word content inside the middle of `app.js` if separate static data files can do it.

---

## 20. Suggested PR sequence

Keep PRs small.

### PR 1: Words data foundation

- Add curated word file.
- Add lesson plan file.
- Add word data audit.
- Load files.
- No major UI changes yet.

### PR 2: Entire Word Bank reference

- Add full bank top card.
- Add combined curated/raw reference.
- Add search/filter/pagination/detail.
- Add audio and status buttons.

### PR 3: Word SRS

- Add `vocabSrs`.
- Add migration.
- Add due queue.
- Add known/hard behavior.
- Add review count.

### PR 4: Guided word lessons

- Add lesson runner.
- Add study cards.
- Add type/repeat.
- Add checkpoints.
- Add result screen.

### PR 5: Quick reference return

- Add reference button to all lesson/question states.
- Add exact return restore.
- Test every state.

### PR 6: Quiz/review upgrade

- Replace romanization-only default quiz.
- Add meaning/audio/context/typing.
- Add review sessions.

### PR 7: Polish and cold-user audit

- Copy
- Screen tips
- Accessibility
- Performance pass
- Mobile pass

---

# 21. Review pass 1: Architecture fit update

After matching this spec against the current project architecture, these changes are required to keep implementation realistic:

1. Keep the no-build approach.
   - Use global data files, not ES modules.
   - Load them before `app.js`.

2. Do not replace the current raw CSV parser.
   - Extend it with an overlay map.
   - Keep existing cached lowercase fields.

3. Reuse current UI primitives.
   - Cards, study rows, pills, quiz cards, typed interaction, sentence builder patterns, and hear buttons already exist.

4. Avoid turning the massive word bank into a giant DOM render.
   - Use pagination/windowing.
   - Use event delegation.
   - Precompute search fields.

5. Keep old state fields.
   - Current progress logic uses `vocabKnownRanks.length`.
   - Removing it would break level unlocks.
   - New SRS should layer on top first.

6. Service worker versioning must be included in every PR that changes loaded assets.

Spec updated accordingly.

---

# 22. Review pass 2: Cold learner completeness update

After reviewing the spec as if I were a total beginner who just completed alphabet, these additions are required:

1. The first Words lesson must be a tutorial, not only content.
   - It must explain what a word card is.
   - It must explain Hear, Type, Repeat, Known, Hard, and Review.

2. Every new word must be encountered in at least four ways:
   - see it
   - hear it
   - type or build it
   - use it in context

3. Typed recall must not assume a Korean keyboard.
   - Add syllable chunk fallback for early lessons.

4. Function words must be taught with examples only.
   - No isolated romanization-only particle cards.

5. Quick reference must be available inside word lessons, not only on the Words home screen.

6. The result screen must tell the learner what happens next.
   - Learned
   - Shaky
   - Review due
   - Next lesson

Spec updated accordingly.

---

# 23. Review pass 3: Performance, QA, and handoff update

After matching the spec against the current risk areas, these final guardrails are required:

1. Add `scripts/audit-words-data.mjs`.
   - This prevents the content bank from rotting.

2. Add a performance audit or at least a scripted reference-row build test.
   - The massive bank should remain fast before UI testing.

3. Add exact cold-user playtest steps.
   - Codex/Claude should not say "works" without browser verification.

4. Add cache/version checklist.
   - Otherwise deployed users may see old JS.

5. Split implementation into PRs.
   - The full Words system is too large for one safe PR.

6. Keep raw-only items honest.
   - If no meaning exists, say reference-only instead of hallucinating.

Spec updated accordingly.

---

## 24. Final Codex instruction

Implement the Words section as a guided, meaning-first learning system with a massive non-laggy word bank and exact quick-reference return behavior.

Treat the alphabet section as complete and protected.

Start with PR 1 and PR 2 if doing this incrementally. Do not attempt all phases in one enormous PR unless explicitly instructed.

The first visible win should be:

```text
After Hangul is complete, the learner opens Words, sees a top "Entire Korean Word Bank" reference card, starts a 5-word Survival Core lesson, hears each word, types each word, answers meaning questions, sees a result screen, and gets due reviews scheduled.
```

That is the next HanaPath milestone.
