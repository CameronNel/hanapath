# Google Play Data Safety — draft answers (free release)

> Revised 2026-08-10 for the `free_all` Android build. Re-check the uploaded
> AAB, current SDK disclosures, and current Play Console wording at submission.

## Measured product behaviour

- HanaPath has no enabled accounts, ads, developer analytics, billing, or
  developer-operated backend in the current release.
- The Google sign-in controls are configuration-required and disabled by
  default. They transmit nothing in this release. Enabling them later requires
  a secure token-verification/session service, account deletion routes, and a
  new Data Safety and privacy review.
- Learning progress remains in on-device `localStorage` (`hanapath-v1`). Cloud
  backup and device-transfer extraction are explicitly excluded on Android.
- Handwriting strokes and recognition candidates are processed on-device and
  are not sent to HanaPath.
- `com.google.mlkit:digital-ink-recognition` can download the Korean model and,
  according to Google's SDK disclosure, collects limited device/app
  information, per-installation identifiers, performance/API metrics, feature
  input/output sizes, events, errors, and configured language for diagnostics
  and usage analytics. Google says this data is encrypted in transit and not
  shared with third parties.
- The merged release manifest is restricted to `android.permission.INTERNET`
  plus Android's app-specific signature-level receiver permission. Billing and
  dangerous permissions are rejected by CI.
- Browser/PWA Transcript practice is outside the Android declaration: its
  speech-recognition provider boundary is disclosed in-app and in the privacy
  policy, while the Android AAB has no microphone permission.

Official source to re-check at submission:
<https://developers.google.com/ml-kit/android-data-disclosure>

## Questionnaire draft

| Play Console question | Draft answer | Reason |
|---|---|---|
| Does your app collect or share any required user data types? | **Yes — collects; does not share** | Included ML Kit SDK diagnostics/usage collection counts even though HanaPath's developer does not receive it. |
| Is collected data encrypted in transit? | **Yes** | Google's ML Kit disclosure specifies HTTPS. |
| Can users request deletion? | **No developer-held account data exists** | Local learning data is removed by clearing app data/uninstalling. Use the console's current exemption wording. |

Data types to validate against the exact uploaded dependency graph:

| Likely Play data type | Purpose | Handling |
|---|---|---|
| Device or other IDs | Diagnostics, usage analytics | Collected by ML Kit; not shared; encrypted in transit; not used for advertising |
| App interactions | SDK feature/model events and configured language | Collected by ML Kit for diagnostics/usage analytics; not handwriting content |
| Diagnostics / app performance | Latency, input/output size, API configuration, errors | Collected by ML Kit; not shared; encrypted in transit |

Do not select names, email, purchase history, precise location, contacts,
photos, files, handwriting content, typed answers, advertising, or cross-app
tracking unless the final AAB or an enabled account service changes the facts.

## Related declarations

| Declaration | Draft answer |
|---|---|
| Privacy policy URL | `https://cameronnel.github.io/hanapath/privacy.html` (owner decision #8 pending) |
| Ads | **No ads** |
| App access | No login required; all learning paths and handwriting are free |
| Target audience | 13+ / not directed at children (owner decision #4 pending) |
| Financial features | None; no billing library, permission, checkout, or paid feature ships |

## Change control

Every dependency, permission, authentication, network, telemetry, or storage
change must update this file and `privacy.html`. Complete the Play form from the
uploaded AAB rather than this draft alone.
