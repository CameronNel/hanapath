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

### 1. Permanent application/package ID — ✅ owner-confirmed 2026-08-12

**Confirmed: `io.github.cameronnel.hanapath`.**

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

### 3. Free listing and current monetization — ✅ owner-confirmed 2026-08-12

**Confirmed: Free listing with every learning feature and Handwriting Coach
included for every learner (`free_all`), Google AdMob interstitial advertising
in the Android app, and an optional US$2/month Google Play subscription that
removes ads while active.**

- Owner instruction on 2026-08-12 sets the ad cadence: an interstitial may be
  shown only after a newly completed lesson and only when at least five minutes
  have elapsed since app-session start or the last ad that actually appeared.
  A lesson completed inside the cooldown shows no ad and does not queue one.
- The website/PWA remains ad-free. Android production ads are configuration-
  gated behind owner-controlled AdMob IDs and UMP consent readiness.
- The subscription product ID is `hanapath_ad_free_monthly`, with the monthly
  auto-renewing base plan ID `monthly`, no free trial, and Play-localized
  regional pricing. A purchase never unlocks learning content; it only
  suppresses Android interstitials while Google Play reports active ownership.
- Irreversibility warning: a **free listing can never become paid**; a paid
  app can later become free. Choosing Free is a permanent commitment for this
  listing; future revenue can use advertising, in-app purchases, or a separate
  listing subject to a new reviewed product decision.
- **Superseded history:** the 2026-07-20 decision described an optional paid,
  restorable Handwriting Coach. Handwriting remains free; Play Billing is
  isolated to the ad-free subscription and must not become a content paywall.

### 4. Target audience / children — ✅ owner-confirmed 2026-08-12

**Confirmed: HanaPath is not directed at children. Distribute worldwide and
select only Google Play's `18 and over` target-age group. Do not enable
Families-only advertising and do not add an age gate merely for advertising.**

- Google's current Play guidance says the `13–15` and `16–17` groups may be
  considered to include children in some locales. For worldwide distribution,
  `18 and over` is therefore the broadest available group that is consistently
  non-child across locales.
- Do not opt HanaPath into the Families program or tag ordinary ad requests for
  child age treatment. UMP still handles consent and privacy choices wherever
  required by regional law.
- Selecting an adult target audience does not make the app adult content and
  does not require Play's optional **Restrict minor access** control. HanaPath
  has no age-restricted functionality, so no in-app age gate is added.

### 5. Developer account: personal vs organization — ⏳

**Proposed: personal developer account** (one-time $25 registration).

- Note: personal accounts created after 2023-11-13 may have testing
  requirements before production access. Re-check the current Play requirement
  when the account is created rather than relying on this planning document.

### 6. Publisher/developer display name — ⏳

Shown publicly on the listing. Decide together with account type (personal
accounts show the verified name rules Google applies at registration).

### 7. Support email + support website — ⏳

- Support email is **publicly visible** on the listing — the owner may prefer
  a dedicated address over a personal one.
- Proposed support website: `https://cameronnel.github.io/hanapath/`.

### 8. Privacy-policy URL — ✅ owner-confirmed 2026-08-12

**Confirmed:** `https://cameronnel.github.io/hanapath/privacy.html`.

- **Drafted (M5):** `privacy.html` exists at the repository root and now states
  the ad-supported Android behaviour: local learning/handwriting data is not
  sent to AdMob; the Android app may show five-minute-gated lesson-completion
  interstitials; the Google Mobile Ads SDK performs its documented ad/analytics/
  fraud-prevention data processing; the website/PWA remains ad-free.
- The same page continues to document local progress, ML Kit, disabled Google
  sign-in, UMP privacy choices, and Google Play subscription handling.
- Required for the ad-enabled Play release. Use this exact URL in AdMob and
  Play Console.

### 9. Google sign-in activation boundary — ✅ current release confirmed 2026-08-10

**Confirmed for the current release: Google sign-in remains unconfigured and
fail-closed. HanaPath creates no account or authenticated session, sends no ID
token to a verifier, and does not sync learner progress.** A disabled sign-in
control may explain that owner configuration is required; it must not imply
that an account exists or that local progress is backed up.

Activating sign-in in a later reviewed release requires all of these owner
actions together; setting only a client ID is not sufficient:

1. Choose an owner-controlled Google Cloud project, configure its OAuth consent
   screen, authorized domains, production status, and support/privacy links.
2. Create a **Web application OAuth client**. Its client ID is the server/Web
   client ID and the required `aud` value for every Google ID token. Supply it
   to Android as `HANAPATH_GOOGLE_SERVER_CLIENT_ID`; supply it to the browser as
   `window.HANAPATH_AUTH_CONFIG.webClientId` before `google_auth.js` loads.
3. Create Android OAuth client registrations for the exact package
   `io.github.cameronnel.hanapath`. Record **upload-key SHA-1 and SHA-256** and,
   after Play App Signing enrolment, the distinct **Play App Signing SHA-1 and
   SHA-256**. Use each certificate's SHA-1 in the corresponding Android OAuth
   client and register SHA-256 wherever the linked Google/Firebase or Android
   developer configuration requests it. A locally signed/upload-key build
   working does not prove that a Play-installed build will work.
4. Operate a trusted HTTPS session endpoint and configure it as
   `window.HANAPATH_AUTH_CONFIG.sessionEndpoint` before `google_auth.js` loads
   on both hosted web and an explicitly generated native configuration. It must
   verify the Google ID token's cryptographic signature and current Google
   keys, allowed issuer, exact Web-client audience, expiry/timing claims, and
   the exact request nonce. The nonce must be single-use/replay-resistant before
   the service creates its own secure session. The browser or Android plugin
   must never decode a token and treat it as authenticated locally.
5. Define the actual account lifecycle, sign-out/revocation behaviour, data
   retention, in-app deletion path, public account-deletion URL, reviewer
   access, privacy text, and Data Safety declarations before enabling the
   control. Progress remains device-local unless a separately reviewed sync
   service and migration contract are shipped.

## Record of confirmations

| # | Decision | Status | Confirmed value | Date |
|---|---|---|---|---|
| 1 | Package ID | ✅ | `io.github.cameronnel.hanapath` | 2026-08-12 |
| 2 | Store app name | ⏳ | — | — |
| 3 | Free vs paid / monetization | ✅ | Free listing and all-free learning; Android AdMob lesson-completion interstitials; optional US$2/month Play subscription removes ads | 2026-08-12 |
| 4 | Audience/countries | ✅ | Not directed at children; Play target age `18 and over`; worldwide; no Families-only ads or advertising age gate | 2026-08-12 |
| 5 | Account type | ⏳ | — | — |
| 6 | Publisher name | ⏳ | — | — |
| 7 | Support contacts | ⏳ | — | — |
| 8 | Privacy-policy URL | ✅ | `https://cameronnel.github.io/hanapath/privacy.html` | 2026-08-12 |
| 9 | Google sign-in activation | ✅ | Unconfigured/fail-closed; no account, session, or sync in current release | 2026-08-10 |
