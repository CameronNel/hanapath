# Mobile device test checklist (M2 evidence)

> Companion to [`FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](FABLE_MOBILE_PLAY_STORE_HANDOVER.md)
> §11–§12. The code side of M2 ships in the repo; the evidence below needs real
> hardware. Check items off per device and note the device model + Android
> version. Install the debug APK from the **Android build** workflow artifact
> on any PR, or build locally (`cd mobile && npm ci && npm run sync:android &&
> cd android && ./gradlew assembleDebug`).

## Devices

Aim for at least: one ~360 px-wide phone, one 390–430 px phone, one tablet.

| # | Device | Android | Surface (native app / Chrome / PWA) | Date | Tester |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

## A. First launch and offline

- [ ] Fresh install launches to onboarding with no blank screen or console-visible error page.
- [ ] Airplane mode ON from before first launch: app fully loads (fonts, styles, icons — no missing glyph boxes).
- [ ] With airplane mode still on: complete one Hangul lesson step, one Words question, one Sentences question; word/sentence audio plays.
- [ ] Kill the app, relaunch offline: progress from the previous step is still there.

## B. Android back button / back gesture

Expected contract, in order:
- [ ] Intro film open → back closes the film, app stays open.
- [ ] Inside any lesson/detail screen (a ‹ bar is visible) → back acts exactly like tapping ‹.
- [ ] On the Practice or Progress hub root → back returns to the Learn hub.
- [ ] On the Learn hub root → back minimizes the app (home screen appears); reopening from Recents resumes instantly with state intact — the app is never killed mid-lesson.

## C. Korean keyboard / IME (Translate & Type, typing recall)

- [ ] Hangul composition works: typing ㅎ+ㅏ+ㄴ composes 한 without the answer field validating the incomplete syllable early.
- [ ] The input field stays visible above the keyboard (not covered) on phone and tablet.
- [ ] Suggestions/autocorrect from the IME don't break answer checking.
- [ ] Enter/Go submits; focus behaves after dismissing the keyboard and rotating.
- [ ] Hardware/Bluetooth keyboard on tablet: typing and Enter work.

## D. Audio lifecycle

- [ ] Backgrounding the app (home button) mid-playback stops the audio.
- [ ] A phone call / timer interruption stops playback; the app resumes cleanly afterward.
- [ ] Silent mode and media-volume-at-zero behave as expected (no stuck UI waiting on audio).
- [ ] Bluetooth and wired headphones route audio; rapid repeated taps on speaker buttons don't stack overlapping voices.

## E. Drawing (Hangul writing)

- [ ] Finger drawing on phone: strokes track the finger with no scroll interference on the canvas.
- [ ] Tablet + stylus: palm on screen doesn't add strokes; stylus draws.
- [ ] Undo / Erase all / Check / Help targets are comfortably tappable.
- [ ] The rough-한 case: natural joined strokes for 한 are accepted (post-#264 behaviour).

## E2. M3 recognition-provider evidence

Record the exported JSON comparison report for each phone/tablet. Until this
section is signed off, ML Kit is diagnostic-only and `$Q` remains the learner
grader.

- [ ] Before download: the app clearly discloses the optional ~20 MiB Korean model; dismissing it leaves writing fully usable with `$Q`.
- [ ] Airplane mode before first download: download failure is clear, no crash occurs, and writing still grades through `$Q`.
- [ ] Online download: the `ko` model installs; relaunching the app reports it installed without downloading again.
- [ ] Airplane mode after download: ML Kit diagnostics run on-device and the comparison report completes.
- [ ] Run **Run device comparison** on a mid-range phone and a tablet; save both JSON reports with device model, Android version, build commit, and tester.
- [ ] Reports include the rough `한`, authored positives, split/merged variants, pairwise negatives, candidates, target rank, false accepts, latency, and fallback rate.
- [ ] No new ML Kit false accepts are accepted for prompted practice; rough learner ink materially improves over `$Q`.
- [ ] Warm latency is acceptable on both devices; record average and p95 rather than judging one attempt.
- [ ] Low-storage/download interruption returns to `$Q` cleanly and does not leave a false “ready” state.
- [ ] Only after evidence review: record the provider decision in the PR and change learner grading authority in a separate, explicitly reviewed patch if ML Kit wins.

## F. Layout, safe areas, system UI

- [ ] No content under the status bar, gesture bar, or camera cutout (portrait + landscape).
- [ ] Bottom nav clears the gesture-navigation area.
- [ ] Rotation mid-lesson keeps state and layout.
- [ ] Split-screen mode doesn't crash or clip the core screens.
- [ ] Android font scale 130% and 200%: primary flows remain usable, no clipped buttons.

## G. Lifecycle and updates

- [ ] Background + resume during: a Hangul lesson, a Words review, a Sentences drill, a writing session.
- [ ] Kill from Recents mid-lesson, relaunch: no corrupted state; paused-session re-entry appears where designed.
- [ ] Install a newer debug build over an older one: `localStorage` progress survives (device restart too).
- [ ] Export progress → uninstall → reinstall → import: progress restored (Settings → Progress backup).

## H. Browser/PWA parity (same device)

- [ ] The GitHub Pages URL works in Chrome for Android; PWA installs; offline relaunch works.
- [ ] iPhone/iPad Safari: hosted app loads; Add to Home Screen launches standalone (when an iOS device is available).

## Results log

Record failures as issues with: device, Android version, surface, steps,
expected vs actual, screenshot/recording.
