# Play internal-testing runbook (M5)

> How the owner gets a signed HanaPath build onto real phones through Google
> Play, and what stands between internal testing and production. Written
> 2026-07-16 against handover §15; **re-check each linked Google requirement
> at execution time** — Play policies change without notice.

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

## 1. Create the app (once)

Play Console → **Create app**: app name (decision #2), default language,
App (not game), Free (decision #3 — permanent), then accept the developer
policies and **Play App Signing** terms. Complete the **App content** section
early (privacy policy URL, ads = no, data safety per `DATA_SAFETY.md`, app
access = full, content rating questionnaire, target audience per decision
#4) — an incomplete App content section blocks every release, even internal.

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

## 3. Tester instructions (copy-paste template)

> Thanks for testing HanaPath! 🇰🇷
> 1. On your Android phone, open this opt-in link and tap **Become a
>    tester**: `<opt-in URL>`
> 2. Install HanaPath from the Play Store link on that page.
> 3. Use it like a real learner for a few sessions: finish at least one
>    alphabet lesson, one writing exercise, one word review, and one
>    sentence exercise. Try airplane mode — everything should still work.
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
