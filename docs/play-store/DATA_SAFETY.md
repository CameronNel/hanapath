# Google Play Data Safety — draft answers (free ad-supported release)

> Revised 2026-08-12 for the Android build with AdMob interstitials. Re-check
> the uploaded AAB, current SDK disclosures, and current Play Console wording at
> submission. This is an evidence draft, not a substitute for the actual form.

## Measured product behaviour

- HanaPath has no enabled learner accounts, billing, or developer-operated
  backend in the current release.
- The Android app uses Google AdMob interstitial advertising only after a newly
  completed lesson and no more often than once every five minutes. The hosted
  website/PWA remains ad-free.
- The Google sign-in controls are configuration-required and disabled by
  default. They transmit nothing in this release. Enabling them later requires
  a secure token-verification/session service, account deletion routes, and a
  new Data Safety and privacy review.
- Learning progress remains in on-device `localStorage` (`hanapath-v1`). Cloud
  backup and device-transfer extraction are explicitly excluded on Android.
  Lesson IDs, answers, scores, handwriting strokes, and local progress are not
  added to AdMob ad requests.
- Handwriting strokes and recognition candidates are processed on-device and
  are not sent to HanaPath.
- `com.google.android.gms:play-services-ads:25.4.0` is pinned. Google's current
  disclosure says this SDK automatically **collects and shares** IP address,
  user product interactions, diagnostic information, and device/account
  identifiers (including Android advertising ID and app set ID) for
  advertising, analytics, and fraud prevention. Google says the data is
  encrypted in transit with TLS.
- `com.google.android.ump:user-messaging-platform:4.0.0` requests updated
  consent information at app launch for production-configured ads. If Google
  requires a privacy-options entry point, the Android Settings screen exposes
  **Privacy choices** and opens the UMP privacy-options form.
- `com.google.mlkit:digital-ink-recognition` can download the Korean model and,
  according to Google's SDK disclosure, collects limited device/app
  information, per-installation identifiers, performance/API metrics, feature
  input/output sizes, events, errors, and configured language for diagnostics
  and usage analytics. Google says this data is encrypted in transit and not
  shared with third parties.
- The reviewed app manifest permits `android.permission.INTERNET`,
  `android.permission.ACCESS_NETWORK_STATE`, and
  `com.google.android.gms.permission.AD_ID`, plus Android's app-specific
  signature-level receiver permission in the merged manifest. Billing,
  microphone, and unrelated permissions remain blocked by CI.
- Browser/PWA Transcript practice is outside the Android declaration: its
  speech-recognition provider boundary is disclosed in-app and in the privacy
  policy, while the Android AAB has no microphone permission.

Official sources to re-check at submission:

- <https://developers.google.com/admob/android/privacy/play-data-disclosure>
- <https://developers.google.com/admob/android/privacy>
- <https://developers.google.com/ml-kit/android-data-disclosure>

## Questionnaire draft

| Play Console question | Draft answer | Reason |
|---|---|---|
| Does your app collect or share any required user data types? | **Yes — collects and shares** | Google Mobile Ads 25.4.0 automatically collects and shares listed data for ads, analytics, and fraud prevention; ML Kit also performs its documented SDK collection. |
| Is collected data encrypted in transit? | **Yes** | Google's Mobile Ads disclosure specifies TLS; ML Kit specifies encrypted transport for its documented SDK data. |
| Can users request deletion? | **No developer-held account data exists** | Local learning data is removed by clearing app data/uninstalling. Complete the console's current deletion/exemption wording based on the final SDK disclosures. |

Data types to validate against the exact uploaded dependency graph and current
Play taxonomy:

| Likely Play data type | Purpose | Handling |
|---|---|---|
| Approximate location | Advertising, analytics, fraud prevention | AdMob collects IP address, which Google says may estimate general location; collected/shared; TLS |
| App interactions | Advertising, analytics, fraud prevention; ML Kit diagnostics | AdMob collects launch/tap/video interaction information; ML Kit records documented feature/model events |
| Diagnostics / app performance | Advertising, analytics, fraud prevention; SDK diagnostics | AdMob collects SDK/app performance information; ML Kit collects documented performance/error metrics |
| Device or other IDs | Advertising, analytics, fraud prevention; SDK diagnostics | AdMob collects advertising ID, app set ID, and applicable account-related identifiers; ML Kit may collect per-installation identifiers |

Do **not** select names, email, purchase history, precise location, contacts,
photos/files, handwriting content, typed answers, lesson progress, or purchase
information unless the final AAB or an enabled account service changes the
facts. Advertising is now part of the product and must not be omitted merely
because HanaPath itself does not operate the ad servers.

## Related declarations

| Declaration | Draft answer |
|---|---|
| Privacy policy URL | `https://cameronnel.github.io/hanapath/privacy.html` (owner-confirmed) |
| Ads | **Yes — contains Google AdMob interstitial ads in the Android app** |
| App access | No login required; all learning paths and handwriting remain available without an account |
| Target audience | Not directed at children; select only `18 and over` for worldwide distribution; do not opt into Families or add an advertising age gate |
| Financial features | None; no billing library, permission, checkout, or paid feature ships |

## Release blockers specific to ads

Before a signed/public ad-enabled release:

1. Create the production AdMob app and interstitial ad unit and store their
   public IDs in the protected `google-play-release` environment variables
   `HANAPATH_ADMOB_APP_ID` and `HANAPATH_ADMOB_INTERSTITIAL_ID`.
2. Configure the applicable AdMob **Privacy & messaging** message(s). Production
   code refuses to initialize Mobile Ads until UMP says ads may be requested.
3. Apply the confirmed non-child configuration: Play target age `18 and over`,
   worldwide availability, no Families-only advertising, and no child age-
   treatment tag. Keep UMP consent/privacy handling enabled for applicable
   regions.
4. Mark **Contains ads** in Play Console and complete Data Safety from the
   exact signed AAB/dependency graph.
5. Re-check this file, `privacy.html`, and the store listing against the exact
   release artifact.

## Change control

Every dependency, permission, authentication, advertising, network, telemetry,
or storage change must update this file and `privacy.html`. Complete the Play
form from the uploaded AAB rather than this draft alone.
