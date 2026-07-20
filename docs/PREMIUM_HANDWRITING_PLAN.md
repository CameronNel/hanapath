# Handwriting Coach plan — words, phrases, and sentences

> **Owner approved 2026-07-20.** This plan supersedes the older owner gate in
> `HANGUL_WRITING_PLAN.md` for multi-block content writing. Alphabet writing
> remains free and capped at one jamo or syllable block. Word, phrase, and
> sentence handwriting uses native on-device recognition. On 2026-07-20 the
> owner changed the active product mode to `free_all` while the app is being
> finished and tested. Billing remains implemented but dormant.

## 1. Product contract

- **Current `free_all` mode:** every native-app user can write learned words,
  short phrases, and full sentences one Hangul block at a time. The app shows
  no paywall, price, purchase button, restore button, or paid/unlocked label.
- Alphabet writing keeps its authored-guide + `$Q` offline path and does not
  require the native model.
- Multi-block writing still requires the supported native app and Korean ML Kit
  model; this is a capability boundary, not a purchase boundary.
- **Future `store` mode:** the existing restorable non-consumable entitlement
  path may be activated only when store setup and release evidence are ready.
- Access mode is one source-level constant, not a user setting or persisted
  entitlement override. Testers never need to change settings on their phones.

## 2. Payment-without-service safety contract

Purchase availability and feature availability are separate states. In
`free_all` mode the billing bridge is not queried and access depends only on
native recognizer readiness. If `store` mode is activated later, it requires:

1. **Platform capable:** a supported native shell and store bridge exist.
2. **Recognizer ready:** the Korean on-device model is downloaded and a warm-up
   recognition succeeds.
3. **Product sellable:** the store returns the configured non-consumable with a
   localized name and price.
4. **Entitled:** the store reports a verified, purchased, non-pending,
   non-revoked transaction.

The purchase button may appear only after states 1–3 are true. A completed or
pending purchase is always re-queried when the app starts/resumes and after any
purchase flow. Existing purchasers retain the entitlement when the model is
temporarily unavailable; the UI offers model recovery, retry, typed practice,
and Restore Purchases rather than asking them to pay again.

Never grant access from a plain local boolean. Never remove access merely
because a model was deleted. Never acknowledge a pending Android purchase as
delivered. Store-returned localized price text is the only price shown.

## 3. Block-banking interaction

Each prompt preserves the real text and splits only Hangul syllables into
writable blocks. Spaces and punctuation are displayed and bank automatically.

```text
저는  한국어를  공부해요.
 ✓    ✓✓✓✓    [공] 부 해 요 .
                  ↑ active theme-colour block
```

- One comfortably sized square canvas is reused for every active syllable.
- The active block uses the learner's theme accent plus an accessible outline
  and `aria-current="step"`; completed blocks turn green and show a check mark.
- After a short pause, ML Kit recognizes the current block. Only an exact
  normalized top-candidate match banks automatically.
- A weak or different result stays on the same block and reports “I read this
  as …”; ink remains available for Undo, Erase, or explicit Retry.
- A successful block gives a short visual acknowledgement, clears the
  canvas, advances focus, and is ready for the next stroke without an overlay.
- Back/Undo completed block returns to the previous syllable without erasing
  the rest of the prompt. Leaving the session preserves prompt position.
- The entire prompt is complete only when every Hangul block is banked. Store
  entitlement, recognition, and curriculum progress are independent concerns.

## 4. Recognition contract

- Native paid writing uses Google ML Kit Digital Ink with Korean tag `ko`.
- The bridge accepts real-timestamp strokes, writing area, and up to 20 Unicode
  characters of preceding banked text as `preContext`.
- Text candidates do not expose reliable confidence scores. Automatic banking
  therefore requires target === normalized top candidate; lower candidates are
  feedback only and never silently pass.
- `$Q` remains authoritative for free Alphabet writing and its deterministic
  audit. It is not presented as a full-word/sentence fallback.
- If ML Kit becomes unavailable during a paid session, preserve the prompt,
  block index, and ink; stop auto-advancing and show recovery actions.

## 5. Content selection

- **Words:** learned vocabulary first; a small core fallback only for a learner
  who has unlocked Words but has no recorded review yet.
- **Phrases:** authored `tokens` from available sentence rows, keeping tokens
  that contain at least two Hangul syllables.
- **Sentences:** available rows at the learner's selected sentence band.
- Do not invent or add Korean content for this feature; reuse the existing
  audited word/sentence banks and audio keys.

## 6. Delivery gates

1. Shared prompt/block model + browser-auditable renderer.
2. Android ML Kit context support and paid-flow recognition authority.
3. Android non-consumable Play Billing bridge, product configuration, restore,
   pending purchase, acknowledgement, refund/revocation, and interrupted-flow
   tests. Direct client verification is accepted only if the owner reaffirms
   the no-backend trade-off before production; Google recommends server-side
   purchase verification.
4. Real Android phone/tablet recognition and purchase evidence. Checkout stays
   disabled until this gate passes.
5. iOS Capacitor shell + ML Kit/StoreKit 2 adapters on macOS/Xcode, with the
   same entitlement and model-recovery tests. Windows work must not claim this
   gate passed.
6. Store screenshots, privacy/Data Safety updates, refund/support copy, and
   cold-install/upgrade validation before public sale.

## 7. Required evidence

- Narrow phone, typical phone, and tablet layouts; finger and stylus.
- At least 100 real Korean syllable attempts across varied writers, including
  rough, joined, and alternate-stroke forms; record top-1 accuracy, false
  accepts, retry rate, average latency, and p95 latency.
- Model missing, download failure, airplane mode before/after download, low
  storage, model deletion, app update, and app reinstall.
- Purchase cancelled, pending then completed, network loss immediately after
  payment, relaunch recovery, second device, restore, refund/revocation, and
  an already-entitled user with a missing model.
- Free Alphabet writing works in browsers and native apps throughout.
