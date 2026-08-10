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

### 3. Free listing and current monetization — ✅ owner-confirmed 2026-08-10

**Confirmed: Free listing with the Handwriting Coach included for every
learner (`free_all`). The current release has no in-app purchase, Play Billing
dependency, billing permission, checkout, restore flow, or store entitlement.**

- Matches the current release (no ads, no active accounts, no developer
  tracking, and no purchases).
- Irreversibility warning: a **free listing can never become paid**; a paid
  app can later become free. Choosing Free is a permanent commitment for this
  listing (future revenue would need in-app purchases or a separate listing).
- **Superseded history:** the 2026-07-20 decision described an optional paid,
  restorable Handwriting Coach. That paid plan is retained in historical
  planning documents for provenance, but it is not the current release
  contract and must not be presented in the app, store listing, privacy page,
  Data Safety form, manifest, or release bundle.

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
  the actual behaviour: learning state and handwriting content stay on-device;
  there are no ads, active HanaPath accounts, purchases, or developer
  analytics; Google ML Kit may send limited SDK diagnostics. The
  configuration-gated Google sign-in shell is not an account or sync feature
  in the current release.
- Required for Data Safety even for apps that collect nothing. The URL
  entered in Play Console is this decision; the page existing does not
  confirm it.

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
| 1 | Package ID | ⏳ | — | — |
| 2 | Store app name | ⏳ | — | — |
| 3 | Free vs paid | ✅ | Free listing; `free_all` Handwriting Coach; no Billing/IAP | 2026-08-10 |
| 4 | Audience/countries | ⏳ | — | — |
| 5 | Account type | ⏳ | — | — |
| 6 | Publisher name | ⏳ | — | — |
| 7 | Support contacts | ⏳ | — | — |
| 8 | Privacy-policy URL | ⏳ | — | — |
| 9 | Google sign-in activation | ✅ | Unconfigured/fail-closed; no account, session, or sync in current release | 2026-08-10 |
