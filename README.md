# HanaPath

HanaPath is a mobile-first Korean learning app built around four learner-first tabs:

- Today
- Path
- Practice
- Library

The app opens with a guided daily action, routes learners based on onboarding answers, and grows through level-based practice with review loops, quizzes, and the 5k vocabulary file.

## What each tab does

- `Today` tells you what to do next.
- `Path` shows the full roadmap through Hangul and beyond.
- `Practice` handles sentence building, speaking-style drills, and listening work.
- `Library` keeps vocabulary, phrases, and reference content close at hand.

## Run locally

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Main files

- `index.html`
- `app.js`
- `styles.css`
- `korean_5000_claude_ready.csv`

## Notes

- Progress is stored in the browser.
- The repo is meant to be static and easy to deploy to GitHub Pages or another static host.
