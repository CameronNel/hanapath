# Handwriting Coach plan: words, phrases, and sentences

> **Owner approved 2026-07-20; free-build safety updated 2026-07-30.** This plan
> supersedes the older owner gate in `HANGUL_WRITING_PLAN.md` for multi-block
> content writing. Alphabet writing remains free and capped at one jamo or
> syllable block. Word, phrase, and sentence handwriting uses native on-device
> recognition. The active product mode is `free_all`.

## 1. Product contract

- **Current `free_all` mode:** every native-app user can write learned words,
  short phrases, and full sentences one Hangul block at a time. The app shows
  no paywall, price, purchase button, restore button, or paid/unlocked label.
- The free Android build does not compile, register, configure, or request
  permission for Google Play Billing. Dormant checkout code is not a release
  feature and must not ride inside the binary merely for a possible later sale.
- Alphabet writing keeps its authored-guide + `$Q` offline path and does not
  require the native model.
- Multi-block writing still requires the supported native app and Korean ML Kit
  model; this is a capability boundary, not a purchase boundary.
- **Future `store` mode:** a restorable non-consumable entitlement may be
  reintroduced only in a separately reviewed store-mode packet after product,
  privacy, refund, verification, device, and release evidence are ready.
- Access mode is one source-level constant, not a user setting or persisted
  entitlement override.

## 2. Payment-without-service safety contract

The current free build has no payment surface. `PremiumWritingStore` remains a
web-side future boundary, but `free_all` never calls it and the native app ships
without the corresponding purchase plugin.

A future `store` build must prove all of the following before checkout appears:

1. **Platform capable:** a supported native shell and reviewed store bridge exist.
2. **Recognizer ready:** the Korean on-device model is downloaded and a warm-up
   recognition succeeds.
3. **Product sellable:** the store returns the configured non-consumable with a
   localized name and price.
4. **Entitled:** the store reports a verified, purchased, non-pending,
   non-revoked transaction.

The purchase button may appear only after states 1 through 3 are true. A
completed or pending purchase must be re-queried when the app starts/resumes and
after any purchase flow. Existing purchasers must retain entitlement when the
model is temporarily unavailable; recovery may never ask them to pay twice.

Never grant access from a plain local boolean. Never remove access merely
because a model was deleted. Never acknowledge a pending Android purchase as
delivered. Store-returned localized price text is the only price that may be
shown. None of these future-store rules justify shipping billing in `free_all`.

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
- A successful block gives a short visual acknowledgement, clears the canvas,
  advances focus, and is ready for the next stroke without an overlay.
- Back/Undo completed block returns to the previous syllable without erasing
  the rest of the prompt. Leaving the session preserves prompt position.
- The entire prompt is complete only when every Hangul block is banked.

## 4. Recognition contract

- Native content writing uses Google ML Kit Digital Ink with Korean tag `ko`.
- The bridge accepts real-timestamp strokes, writing area, and up to 20 Unicode
  characters of preceding banked text as `preContext`.
- Text candidates do not expose reliable confidence scores. Automatic banking
  therefore requires target === normalized top candidate; lower candidates are
  feedback only and never silently pass.
- `$Q` remains authoritative for free Alphabet writing and its deterministic
  audit. It is not presented as a full-word/sentence fallback.
- If ML Kit becomes unavailable during a session, preserve the prompt, block
  index, and ink; stop auto-advancing and show recovery actions.

## 5. Content selection

- **Words:** learned vocabulary first; a small core fallback only for a learner
  who has unlocked Words but has no recorded review yet.
- **Phrases:** authored `tokens` from available sentence rows, keeping tokens
  that contain at least two Hangul syllables.
- **Sentences:** available rows at the learner's selected sentence band.
- Do not invent or add Korean content for this feature; reuse the existing
  audited word/sentence banks and audio keys.

## 6. Delivery gates

1. Shared prompt/block model plus browser-auditable renderer.
2. Android ML Kit context support and recognition authority.
3. Real Android phone/tablet recognition evidence.
4. A future paid packet, if approved, must separately add Play Billing product
   configuration, restore, pending purchase, acknowledgement, revocation,
   interrupted-flow, privacy, and server-verification decisions. It must not be
   smuggled into the free build as dormant code.
5. iOS Capacitor shell plus ML Kit adapter on macOS/Xcode. Any future StoreKit
   work is a separate paid-mode gate.
6. Store screenshots, privacy/Data Safety updates, refund/support copy, and
   cold-install/upgrade validation before any public sale.

## 7. Required evidence

- Narrow phone, typical phone, and tablet layouts; finger and stylus.
- At least 100 real Korean syllable attempts across varied writers, including
  rough, joined, and alternate-stroke forms; record top-1 accuracy, false
  accepts, retry rate, average latency, and p95 latency.
- Model missing, download failure, airplane mode before/after download, low
  storage, model deletion, app update, and app reinstall.
- For any future paid build: purchase cancelled, pending then completed,
  network loss immediately after payment, relaunch recovery, second device,
  restore, refund/revocation, and an already-entitled user with a missing model.
- Free Alphabet writing works in browsers and native apps throughout.
