# Google Play Data Safety — draft answers (M5)

> Draft prepared 2026-07-16 from the app's **actual measured behaviour**
> (handover §15.2). The owner submits these in Play Console → App content →
> Data safety. **Re-verify every answer against the shipped build right
> before submission** — any new SDK or feature can change them, and the
> declaration must describe the app as uploaded, not as intended.
>
> Ground truth this draft is based on: no accounts, no ads, no analytics, no
> tracking SDKs; learner state in on-device `localStorage` (`hanapath-v1`);
> all audio bundled; handwriting recognized on-device ($Q always; optional
> opt-in ML Kit Digital Ink runs on-device after a one-time model download
> via Google Play services); progress export/import is user-initiated local
> files; the only permission is `android.permission.INTERNET` (enforced by
> `scripts/audit-mobile-package.mjs` and the CI merged-manifest check).

## Questionnaire answers

| Play Console question | Answer | Why |
|---|---|---|
| Does your app collect or share any of the required user data types? | **No** | Nothing leaves the device. "Collect" per Google means transmitting off-device; HanaPath transmits nothing. |
| Is all of the user data collected by your app encrypted in transit? | *(not asked when "No" above)* | — |
| Do you provide a way for users to request that their data is deleted? | *(not asked when "No" above)* | Local data is deleted by uninstalling / clearing site data; stated in the privacy policy anyway. |

Because the answer to the first question is **No**, the store listing will
show "No data collected" and the rest of the questionnaire collapses. Do not
answer "Yes" defensively — a false "Yes" creates ongoing declaration
obligations for data that does not exist.

## Points Google's reviewers may probe (prepared answers)

- **On-device ephemeral processing** — handwriting strokes and typed answers
  are processed in memory on the device and are not transmitted; per Google's
  definitions this is not "collection".
- **ML Kit model download (opt-in diagnostics feature)** — the device fetches
  a Korean handwriting model **from** Google Play services; no user data is
  uploaded. The network call is a download, not a data transfer of user data.
  If Google's SDK data-disclosure index ever lists a required disclosure for
  `com.google.mlkit:digital-ink-recognition`, follow the index — check it at
  submission time.
- **INTERNET permission with "no data collected"** — legitimate: the
  permission exists for the optional model download; core content is bundled.
- **WebView** — the app loads only its own bundled assets
  (`https://localhost` Capacitor origin); it does not load remote web content.

## Related declarations (same Play Console section)

| Declaration | Answer |
|---|---|
| Privacy policy URL | `https://cameronnel.github.io/hanapath/privacy.html` (decision #8 — owner must confirm ✅ in `OWNER_DECISIONS.md` first) |
| Ads | **No, my app does not contain ads** |
| App access | **All functionality is available without special access** (no login; reviewers need no credentials) |
| Content rating questionnaire | Educational reference/study app; no user-generated content, no violence, no data collection — expect "Everyone" |
| Target audience | 13+ / not directed at children (decision #4, pending ✅) |
| News app | No |
| COVID-19 contact tracing/status app | No |
| Data safety → Financial features | None |
| Government app | No |

## Change control

Any PR that adds a dependency, permission, network call, or storage location
to the mobile app **must** update this file in the same PR, and the audits
(`audit-mobile-package.mjs`, the android-build merged-manifest check) are the
enforcement backstop. The Data Safety form must be re-submitted in Play
Console whenever these answers change.
