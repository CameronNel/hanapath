# Google Play store listing — text drafts and asset checklist (M5)

> Drafts prepared 2026-07-16 and revised 2026-08-12 for the free,
> ad-supported Android release. Everything here is a **proposal for the owner
> to edit and approve** — nothing is submitted anywhere by an agent.
> Names/contacts marked ⏳ trace to [`OWNER_DECISIONS.md`](OWNER_DECISIONS.md).
> Claims below describe features that actually exist today; keep it that way.

## App name (30-char limit) — decision #2 ⏳

Proposed: **`HanaPath: Learn Korean`** (22 chars)

## Short description (80-char limit)

Proposed (74 chars):

> Learn Korean from zero: Hangul writing, vocabulary and sentences. Offline.

Alternatives:
- `Korean from zero — write Hangul, build vocabulary, type real sentences.` (71)
- `Learn Korean offline: alphabet, handwriting, 5,000+ words, sentences.` (69)

## Full description (4,000-char limit; draft)

> **Learn Korean from the very first letter — no required account.**
>
> HanaPath takes you from zero to reading, writing, and typing real Korean,
> one small step at a time.
>
> **✍️ Master Hangul by writing it**
> Learn every letter of the Korean alphabet with guided lessons, then
> practice writing by hand directly on your screen. HanaPath checks your
> strokes on your device and coaches you on standard stroke order and
> direction — for all 11,000+ Korean syllables.
>
> **📚 Build a real vocabulary**
> Study useful Korean words with spaced-repetition reviews. Every word comes
> with audio, so you learn the sound with the spelling.
>
> **💬 Type real sentences**
> The Sentences path teaches you to produce Korean, not just recognize it:
> read an English prompt and type the Korean yourself, with a helper ladder
> (hint → word bank → next chunk → reveal) that supports you as needed.
>
> **Write complete Korean lines**
> On supported phones, write complete words, phrases, and sentences one Hangul
> block at a time. Each clearly recognized block is banked immediately and the
> next block is highlighted. All handwriting paths are included for free. The
> optional Korean recognition model is tested on your device before use.
>
> **🔒 Local learning progress**
> No required account. Your lesson progress stays on your device, and you can
> export or import it as a backup file whenever you like.
>
> **Core learning works offline**
> Every lesson and audio clip is bundled. The optional ML Kit handwriting model
> needs a one-time download; learning and the built-in writing fallback remain
> available without it.
>
> **Free, ad-supported Android app**
> HanaPath may show a Google interstitial ad after a newly completed lesson,
> with a minimum five-minute interval between displayed ads. Ads are never
> inserted in the middle of a lesson.
>
> HanaPath is a focused study path — start with the alphabet and work your way
> to typing sentences you actually understand.

## Graphic assets checklist (produce at listing time)

| Asset | Spec | Source guidance |
|---|---|---|
| App icon | 512×512 PNG, ≤1 MB | Derive from `icons/icon-512.png` (already maskable-safe) |
| Feature graphic | 1024×500 PNG/JPEG | Brand art; avoid unsupported claims |
| Phone screenshots | 2–8, 16:9–9:16, min 320 px | Real screens: Learn home path, alphabet lesson, Hangul writing canvas, word review, Translate & Type, Settings/progress backup |
| 7-inch tablet screenshots | recommended | Same flows on a small tablet profile |
| 10-inch tablet screenshots | recommended | Same flows, landscape included |

Capture screenshots from the actual Android build (device or emulator), after
the M2 device checklist has been exercised, so the shots reflect shipped
behaviour. Keep the source captures in owner storage, not in the repository.

## Other listing fields

| Field | Proposed value |
|---|---|
| Category | Education |
| Tags | Language learning / Korean |
| Contact email | ⏳ decision #7 (publicly visible — owner may want a dedicated address) |
| Website | `https://cameronnel.github.io/hanapath/` |
| Privacy policy | `https://cameronnel.github.io/hanapath/privacy.html` (⏳ decision #8) |
| Countries | All (⏳ decision #4) |
| Price | Free download; ad-supported; no in-app purchases in the current `free_all` release |
| Contains ads | Yes — Google AdMob interstitials in the Android app |
