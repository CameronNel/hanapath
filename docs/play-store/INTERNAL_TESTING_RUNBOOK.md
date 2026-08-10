# Play internal-testing runbook (M5)

> How the owner gets a signed HanaPath build onto real phones through Google
> Play, and what stands between internal testing and production. Written
> 2026-07-16 against handover §15; **re-check each linked Google requirement
> at execution time** — Play policies change without notice.
>
> **Current release contract (2026-08-10):** the listing is free and
> Handwriting Coach is `free_all`; the bundle contains no Play Billing or
> purchase flow. Google sign-in is configuration-required and remains disabled
> for this release, so there is no HanaPath account, session, or progress sync.

## 0. Prerequisites (in order)

1. Every ⏳ decision in [`OWNER_DECISIONS.md`](OWNER_DECISIONS.md) confirmed
   ✅ — especially the permanent package ID (#1): it can never change after
   app creation.
2. Google Play developer account registered and identity-verified
   (one-time $25 for personal accounts; decision #5).
3. Upload keystore + `google-play-release` environment set up per
   [`SIGNING_AND_RELEASE.md`](SIGNING_AND_RELEASE.md) §1–§2.
4. A signed AAB artifact from a green run of the **Android signed release**
   workflow.
5. `privacy.html` live at the confirmed URL, and the
   [`DATA_SAFETY.md`](DATA_SAFETY.md) answers re-verified against that exact
   build.
6. Merged-manifest/dependency evidence confirms no
   `com.android.vending.BILLING`, Billing client, price, checkout, restore, or
   store-entitlement surface.
7. The release is built without `HANAPATH_GOOGLE_SERVER_CLIENT_ID` and without
   a browser `window.HANAPATH_AUTH_CONFIG` session endpoint. Activating only
   one piece of Google configuration is a release failure, not a partial login.

## 1. Create the app (once)

Play Console → **Create app**: app name (decision #2), default language,
App (not game), Free (decision #3 — permanent), then accept the developer
policies and **Play App Signing** terms. Complete the **App content** section
early (privacy policy URL, ads = no, data safety per `DATA_SAFETY.md`, app
access = full with no login required, content rating questionnaire, target
audience per decision #4) — an incomplete App content section blocks every
release, even internal. The current answers must not declare an in-app purchase
or active HanaPath account merely because historical paid-plan documents and
configuration-gated sign-in adapters exist in the repository.

## 2. Internal testing release (hours, not days)

1. Play Console → Testing → **Internal testing** → Create release.
2. Upload the `.aab` from the workflow artifact
   (`hanapath-<versionName>-c<versionCode>.aab`). Play verifies it is signed
   with the enrolled upload key.
3. Paste the release notes (the artifact's `release-notes.txt`, if provided).
4. Add testers: an email list of up to 100 addresses. Save, then copy the
   **opt-in URL** and send it to testers with the instructions below.
5. Internal testing has no review delay — builds are available to testers
   within minutes, and the track is invisible to the public.

Roll a new build (bug fix): re-run the release workflow with the **next
versionCode**, upload the new AAB to the same track.

Before sharing the opt-in URL, install the Play-delivered build once and
confirm that Handwriting Coach opens without a paywall, the Google sign-in
control reports configuration required, and local progress remains usable
without an account. A locally installed upload-key build is not a substitute
for this Play App Signing smoke test.

## 3. Tester instructions (copy-paste template)

> Thanks for testing HanaPath! 🇰🇷
> 1. On your Android phone, open this opt-in link and tap **Become a
>    tester**: `<opt-in URL>`
> 2. Install HanaPath from the Play Store link on that page.
> 3. Use it like a real learner for a few sessions: finish at least one
>    alphabet lesson, one writing exercise, one word review, and one
>    sentence exercise. Open word/sentence Handwriting Coach and confirm there
>    is no price, purchase, or restore prompt. The Google sign-in option should
>    be disabled as configuration-required and must not claim that progress is
>    synced. Try airplane mode — core learning and local progress should still
>    work, with the documented local fallback if the optional ML Kit model has
>    not been downloaded.
> 4. Send feedback with the template below. Screenshots welcome.
>
> **Feedback template**
> - Device model + Android version:
> - What you did:
> - What you expected:
> - What actually happened:
> - How annoying was it? (blocker / annoying / cosmetic)

Track incoming feedback as GitHub issues so fixes are auditable; the device
matrix in [`../MOBILE_DEVICE_TEST_CHECKLIST.md`](../MOBILE_DEVICE_TEST_CHECKLIST.md)
is the structured checklist testers' reports should be checked against.

## 4. Closed testing — the 12-tester / 14-day gate

For **personal** developer accounts created after 13 November 2023, Google
requires a closed test with **at least 12 opted-in testers, continuously for
14 days**, before the account can *apply* for production access
([requirement](https://support.google.com/googleplay/android-developer/answer/14151465)
— re-read it at execution time; Google has adjusted this program before).

Practical plan:

1. Promote the internal build to a **Closed testing** track (or create one).
2. Recruit 15–20 testers (buffer above 12 — the count is *opted-in* testers,
   and drop-outs reset nothing as long as ≥12 stay opted in).
3. Keep the same build or ship fixes freely during the 14 days; the clock
   runs on the track having ≥12 testers, not on build stability.
4. After 14 days, the production-access application appears in Play Console;
   it asks about the testing performed and the app's readiness — answer from
   the feedback log.

Start recruiting testers **before** the closed track opens; finding 12
committed people is usually the long pole (handover §15.4: "Do not discover
this requirement at launch").

## 5. Pre-launch report and release health

After each upload, review Play Console → **Test and inspect → Pre-launch
report**: Google runs the build on real devices and flags crashes, ANRs,
layout issues, and security warnings. Acceptance for M5 is **no untriaged
blocker** there (handover §16). After any public release, watch **Android
vitals** (crash rate, ANR rate) — they affect Play visibility.

## 6. Production (deliberately out of scope here)

Production rollout stays a manual owner action after closed testing and
production-access approval — staged rollout (start ≤20%), with rollback =
halt rollout and/or ship a higher-versionCode revert (handover §17). No
automation promotes anything to production.

## 7. Later Google sign-in activation — not part of this release

Do not turn the current disabled control into a working login by changing only
a client ID. A later internal-track candidate must first have:

1. An owner-controlled Google Cloud OAuth consent screen and a Web application
   client ID used as the server/Web token audience.
2. Android OAuth clients for package `io.github.cameronnel.hanapath`, covering
   the upload certificate's SHA-1/SHA-256 and the distinct Play App Signing
   certificate's SHA-1/SHA-256. Use the SHA-1 values for the corresponding
   Android OAuth clients and register SHA-256 wherever the linked Google or
   Android developer configuration requests it. Test both direct/upload-key and
   Play-installed builds.
3. `HANAPATH_GOOGLE_SERVER_CLIENT_ID` injected into the Android build and
   `window.HANAPATH_AUTH_CONFIG.webClientId` plus a secure
   `sessionEndpoint` configured before `google_auth.js` on web. The packaged
   native app also needs that endpoint through an audited generated
   configuration.
4. A trusted HTTPS verifier that validates Google signature/keys, issuer,
   exact audience, timing claims, and the exact single-use request nonce before
   issuing its own secure session. The client and native plugin are not trust
   boundaries.
5. Updated privacy, Data Safety, reviewer-access, retention, sign-out/revocation,
   and in-app/public account-deletion contracts. Account activation still does
   not authorize progress sync; sync requires a separate reviewed design.

Run the E4 matrix in
[`../MOBILE_DEVICE_TEST_CHECKLIST.md`](../MOBILE_DEVICE_TEST_CHECKLIST.md) on
the internal track before changing the Play Console account declarations.
