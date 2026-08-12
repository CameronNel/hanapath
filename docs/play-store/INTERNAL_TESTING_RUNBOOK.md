# Play internal-testing runbook (M5)

> How the owner gets a signed HanaPath build onto real phones through Google
> Play, and what stands between internal testing and production. Written
> 2026-07-16 against handover §15 and revised 2026-08-12 for the ad-supported
> release. **Re-check each linked Google requirement at execution time** — Play
> and AdMob policies change.
>
> **Current release contract (2026-08-12):** the listing is free, Handwriting
> Coach is `free_all`, and the Android app is ad-supported with Google AdMob
> interstitials only at newly completed lesson boundaries and no more often
> than once every five minutes. There is no Play Billing or purchase flow.
> Google sign-in remains disabled for this release, so there is no HanaPath
> account, session, or progress sync. The hosted website/PWA remains ad-free.

## 0. Prerequisites (in order)

1. Every remaining release-blocking ⏳ decision in
   [`OWNER_DECISIONS.md`](OWNER_DECISIONS.md) confirmed ✅. The permanent
   package ID, privacy URL, worldwide availability, and non-child audience are
   already confirmed.
2. Google Play developer account registered and identity-verified.
3. Upload keystore + `google-play-release` environment set up per
   [`SIGNING_AND_RELEASE.md`](SIGNING_AND_RELEASE.md) §1–§2.
4. Production AdMob app + interstitial ad unit created; put their public IDs in
   protected environment variables `HANAPATH_ADMOB_APP_ID` and
   `HANAPATH_ADMOB_INTERSTITIAL_ID`.
5. Configure the applicable AdMob **Privacy & messaging** message(s). The
   production app requests consent information at launch and does not request
   ads until UMP reports that ads may be requested.
6. A signed AAB artifact from a green run of the **Android signed release**
   workflow. That workflow fails closed if the production AdMob identifiers are
   absent.
7. `privacy.html` live at the confirmed URL and
   [`DATA_SAFETY.md`](DATA_SAFETY.md) re-verified against that exact build.
8. Merged-manifest/dependency evidence confirms AdMob's reviewed INTERNET,
   network-state and advertising-ID permissions, while Billing, microphone,
   price, checkout, restore, and store-entitlement surfaces remain absent.
9. Google sign-in remains unconfigured: no `HANAPATH_GOOGLE_SERVER_CLIENT_ID`
   and no browser `window.HANAPATH_AUTH_CONFIG` session endpoint.

## 1. Create the app (once)

Play Console → **Create app**: app name (decision #2), default language, App
(not game), Free (decision #3), then accept the developer policies and Play App
Signing terms. Complete the **App content** section early: privacy-policy URL,
**contains ads = yes**, Data Safety per `DATA_SAFETY.md`, app access = full with
no login required, content rating, and target audience per decision #4.

For target audience, select only **18 and over**. Do not enable Families,
child age treatment, or Play's optional **Restrict minor access** control; the
app has no age-restricted content and does not need an advertising age gate.

Do not declare an in-app purchase or active HanaPath account merely because
historical paid-plan documents and configuration-gated sign-in adapters exist
in the repository.

## 2. Internal testing release

1. Play Console → Testing → **Internal testing** → Create release.
2. Upload the `.aab` from the workflow artifact
   (`hanapath-<versionName>-c<versionCode>.aab`).
3. Paste the release notes (the artifact's `release-notes.txt`, if provided).
4. Add testers and distribute the Play opt-in URL.
5. Install the **Play-delivered** build before broad tester distribution.

Roll a new build by running the release workflow with the next versionCode and
uploading the new AAB to the same track.

Before sharing the opt-in URL widely, confirm on the Play-installed build:

- Handwriting Coach opens without a paywall.
- Google sign-in reports configuration required.
- Local progress works without an account.
- The applicable UMP consent flow appears where required.
- If UMP says privacy options are required, Settings shows **Privacy choices**
  and opens the Google privacy-options form.
- A lesson completed before minute five shows no interstitial.
- The first newly completed lesson after minute five can show an interstitial.
- After an ad actually appears, another lesson completed inside the next five
  minutes shows no ad; the first eligible lesson after that window may show one.
- No ad appears in the middle of a lesson, on startup, on navigation, after a
  failed lesson, or simply because an earlier lesson completed during cooldown.

## 3. Tester instructions (copy-paste template)

> Thanks for testing HanaPath! 🇰🇷
> 1. Install HanaPath from the Play testing link.
> 2. Use it like a real learner for a few sessions: finish Alphabet, Words and
>    Sentences lessons; use writing; background/reopen the app; and try airplane
>    mode.
> 3. Check the ad cadence: if a lesson finishes before five minutes, no ad
>    should appear. After five minutes, a newly completed lesson may show one.
>    Once an ad appears, there must be at least another five minutes before a
>    later lesson can show the next one. Ads must never interrupt an active
>    lesson or appear just because you changed tabs.
> 4. If a consent/privacy message is shown, complete it normally. If Settings
>    includes **Privacy choices**, make sure it reopens the privacy form.
> 5. Confirm Handwriting Coach has no price/purchase/restore prompt and Google
>    sign-in does not claim that progress is synced.
> 6. Try airplane mode: core learning and local progress must keep working;
>    ads simply cannot be fetched while offline.
>
> **Feedback template**
> - Device model + Android version:
> - App version / build:
> - Approx. session time when lesson completed:
> - Did an ad appear? If so, when was the previous ad?
> - What you did:
> - What you expected:
> - What actually happened:
> - Severity: blocker / annoying / cosmetic

Track failures as GitHub issues and compare reports against
[`../MOBILE_DEVICE_TEST_CHECKLIST.md`](../MOBILE_DEVICE_TEST_CHECKLIST.md).

## 4. Closed testing / production-access requirements

Use the current requirements shown in the owner's Play Console account. Google
has changed personal-account testing requirements over time, so do not treat an
old numeric threshold in a repository document as authority. Start recruiting
real testers early and record feedback, device coverage, crashes, ANRs, ad
cadence issues, consent issues, and fixes.

## 5. Pre-launch report and release health

After each upload, review Play Console's pre-launch report and Android vitals.
Treat crashes, ANRs, security warnings, broken layouts, consent problems, and
ad-policy/cadence defects as release blockers until triaged.

## 6. Production

Production rollout remains a manual owner action after testing and production
access. Use a staged rollout and keep rollback/revert procedures ready. No
repository automation promotes a build to production.

## 7. Later Google sign-in activation — not part of this release

Do not turn the disabled control into a working login by changing only a client
ID. A later internal-track candidate must first have:

1. An owner-controlled Google Cloud OAuth consent screen and Web application
   client ID used as the token audience.
2. Android OAuth clients for package `io.github.cameronnel.hanapath`, covering
   both upload and Play App Signing certificates as required by the configured
   Google services.
3. `HANAPATH_GOOGLE_SERVER_CLIENT_ID` injected into Android plus a secure web
   `sessionEndpoint` configuration.
4. A trusted HTTPS verifier that validates Google signature/keys, issuer,
   audience, timing claims, and the exact single-use request nonce before
   issuing a session.
5. Updated privacy, Data Safety, reviewer-access, retention, sign-out/revocation,
   and account-deletion contracts. Account activation still does not authorize
   progress sync; sync requires a separate reviewed design.

Run the E4 matrix in
[`../MOBILE_DEVICE_TEST_CHECKLIST.md`](../MOBILE_DEVICE_TEST_CHECKLIST.md) before
changing the Play Console account declarations.
