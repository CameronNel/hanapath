# Google Play owner decisions — confirm before app creation

> Per [`../FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](../FABLE_MOBILE_PLAY_STORE_HANDOVER.md)
> §9.1, these decisions are the owner's alone and must be confirmed **before
> the first Play Console app or release keystore is created**. Fable proposes
> defaults below but none is final until the owner marks it ✅.
>
> Legend: ⏳ awaiting owner · ✅ owner-confirmed (add date + initials)
>
> **M5 drafts now exist** to make each decision concrete:
> [`STORE_LISTING.md`](STORE_LISTING.md) (name/description/assets, #2),
> [`DATA_SAFETY.md`](DATA_SAFETY.md) (declarations, #4/#8),
> [`INTERNAL_TESTING_RUNBOOK.md`](INTERNAL_TESTING_RUNBOOK.md) (release path,
> #5), [`SIGNING_AND_RELEASE.md`](SIGNING_AND_RELEASE.md) (keystore/CI), and
> the privacy page `privacy.html` at the repository root (#8). They are
> proposals — nothing is submitted to Google until the table below is ✅.

## Blocking M1 (Capacitor project generation)

### 1. Permanent application/package ID — ⏳

**Proposed: `io.github.cameronnel.hanapath`**

- Reverse-DNS of the GitHub Pages domain the owner already controls
  (`cameronnel.github.io`). Honest, free, and collision-proof.
- Alternatives considered: `com.hanapath.app` / `app.hanapath.learn` — cleaner
  branding but convention requires owning `hanapath.com` / `hanapath.app`
  first; claiming an unowned namespace risks future disputes.
- **Unchangeable** after the app is created in the Play Console. If the owner
  ever plans to buy a HanaPath domain and wants the ID to match, decide that
  *now* — the app ID does not have to match the website domain, but it can
  never be migrated later.

## Blocking Play Console app creation (M5), not M1

### 2. Public Play Store app name — ⏳

**Proposed: `HanaPath: Learn Korean`** (22 chars; limit 30)

- Brand + searchable descriptor. Alternatives: `HanaPath` (clean, but no
  search keywords) or `HanaPath — Korean from zero`.
- Changeable later, unlike the package ID, but churn hurts recognition.

### 3. Free vs paid — ⏳

**Proposed: Free.**

- Matches the current product (no ads, no accounts, no tracking).
- Irreversibility warning: a **free listing can never become paid**; a paid
  app can later become free. Choosing Free is a permanent commitment for this
  listing (future revenue would need in-app purchases or a separate listing).

### 4. Target audience / children — ⏳

**Proposed: 13+ / general audience; not directed at children.**

- Avoids the Google Play Families policy (stricter review, additional
  declarations). Younger users may still use an app rated for everyone; this
  declaration is about *intended* audience.
- Also proposed: **all countries/regions** for availability.

### 5. Developer account: personal vs organization — ⏳

**Proposed: personal developer account** (one-time $25 registration).

- Note: personal accounts created after 2023-11-13 must run a closed test
  with **≥12 opted-in testers for 14 continuous days** before they can apply
  for production access. Plan tester recruitment well before launch
  (handover §15.4).

### 6. Publisher/developer display name — ⏳

Shown publicly on the listing. Decide together with account type (personal
accounts show the verified name rules Google applies at registration).

### 7. Support email + support website — ⏳

- Support email is **publicly visible** on the listing — the owner may prefer
  a dedicated address over a personal one.
- Proposed support website: `https://cameronnel.github.io/hanapath/`.

### 8. Privacy-policy URL — ⏳

**Proposed: host a static page in this repo**, at
`https://cameronnel.github.io/hanapath/privacy.html`.

- **Drafted (M5):** `privacy.html` now exists at the repository root and goes
  live at that URL on merge (GitHub Pages serves the repo root). It states
  the actual behaviour: all learning state and handwriting stay on-device; no
  ads, no analytics, no accounts; network use is only fetching the hosted app
  (plus GitHub's standard hosting logs) and the optional, opt-in on-device
  ML Kit Korean handwriting model download in the native app.
- Required for Data Safety even for apps that collect nothing. The URL
  entered in Play Console is this decision; the page existing does not
  confirm it.

## Record of confirmations

| # | Decision | Status | Confirmed value | Date |
|---|---|---|---|---|
| 1 | Package ID | ⏳ | — | — |
| 2 | Store app name | ⏳ | — | — |
| 3 | Free vs paid | ⏳ | — | — |
| 4 | Audience/countries | ⏳ | — | — |
| 5 | Account type | ⏳ | — | — |
| 6 | Publisher name | ⏳ | — | — |
| 7 | Support contacts | ⏳ | — | — |
| 8 | Privacy-policy URL | ⏳ | — | — |
