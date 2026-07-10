# Listening runtime verification — 2026-07-10

Packet 2 was run from `main` on a cold browser state using `python -m http.server 8000`.

## Runtime result

- The Listening hub opened at level 1 (`Stage 01: Short sounds`) with five real sentence rows and audio controls.
- The Listening quiz opened at level 1 with a real audio prompt (`olrin`), Hangul answer choices, replay, and next controls; the fallback `The listening bank is not ready yet.` was not shown.
- Browser console error log was empty after these flows and after exercising levels 1 through 10.
- The real Listening level rail produced a prompt, replay control, and non-fallback answer choices at every level:
  - Levels 1–2: Short sounds
  - Levels 3–4: Short phrases
  - Levels 5–6: Sentence meaning
  - Levels 7–8: Dictation
  - Levels 9–10: Mixed listening
- Answer grading was verified at level 10: selecting `고양이` visibly marked it wrong, marked `불편` correct, and showed the explanation `Not quite. The answer was 불편.` before enabling `Next →`.
- The runner is explicitly labeled `Sentences · Endless drill runner`; after advancing, it continued to the next round and did not expose a finite end-of-session summary. Summary verification is therefore not applicable to this actual UI flow.

Observed code paths were `renderLibrary()` (16992) for the Listening hub, `renderScopedQuestion()` (12434) for the quiz shell, `getListenDeckForLevel()` (1900) for the word deck, and `makeListenStudioQuestion()` (2434) as the sentence-capable question factory. The browser visibly reached the hub/deck/quiz path; the `Sentences` control still routes to Sentence Studio, while the default cold-learner Listening runner uses the word drill.

## Re-derived counts

- `app.js` contains 29 `.find(` calls.

## Legacy reference map

All references are in the loaded `app.js`; no other loaded file references these symbols.

| Symbol | Definition | Live callers | Caller lines |
|---|---:|---:|---|
| `getSentenceStudyBank` | 2137 | 4 | 2213, 2254, 2261, 17001 |
| `makeSentenceTokenPool` | 2228 | 3 | 2297, 15302, 15899 |
| `makeSentenceBuildQuestion` | 2275 | 1 | 11962 |
| `makeSentenceTypingQuestion` | 2316 | 2 | 2436, 11959 |
| `makeSentenceListenQuestion` | 2358 | 1 | 2463 |
| `makeSentenceTilePool` | 15057 | 1 | 15297 |

No symbol has zero live callers. No code was deleted, so no cache bump was needed.
