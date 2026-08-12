# Google Play Data Safety — draft answers (accounts, sync, ads, and subscription)

> Revised 2026-08-12 for the Android build with AdMob interstitials and an
> optional monthly Google Play ad-free subscription. Re-check
> the uploaded AAB, current SDK disclosures, and current Play Console wording at
> submission. This is an evidence draft, not a substitute for the actual form.

## Measured product behaviour

- Google sign-in is optional. Firebase Authentication processes the Google
  account identifier, email, display name, profile image, and authentication
  tokens needed to create and maintain the HanaPath account.
- Cloud Firestore stores one authenticated, user-owned progress backup with
  learning progress, answers, scores, review schedules, exam history, and
  settings. Security Rules limit access to the matching Firebase user ID.
- Google Play Billing 9.1.0 supplies one auto-renewing subscription,
  `hanapath_ad_free_monthly`. It removes Android ads while active and does not
  unlock learning content. The app queries Play for product, purchase, pending,
  acknowledgement, and current entitlement state; HanaPath never receives a
  payment-card number or other payment method details.
- The Android app uses Google AdMob interstitial advertising only after a newly
  completed lesson and no more often than once every five minutes. The hosted
  website/PWA remains ad-free.
- Learning progress remains in on-device `localStorage` (`hanapath-v1`) for
  offline use and is synced to Firestore only after optional sign-in. Android
  device-transfer extraction remains excluded.
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
  signature-level receiver permission in the merged manifest. The reviewed
  `com.android.vending.BILLING` permission supports only the optional ad-free
  subscription. Microphone and unrelated permissions remain blocked by CI.
- Browser/PWA Transcript practice is outside the Android declaration: its
  speech-recognition provider boundary is disclosed in-app and in the privacy
  policy, while the Android AAB has no microphone permission.

Official sources to re-check at submission:

- <https://developers.google.com/admob/android/privacy/play-data-disclosure>
- <https://developers.google.com/admob/android/privacy>
- <https://developer.android.com/google/play/billing/integrate>
- <https://developers.google.com/ml-kit/android-data-disclosure>

## Questionnaire draft

| Play Console question | Draft answer | Reason |
|---|---|---|
| Does your app collect or share any required user data types? | **Yes — collects and shares** | Google Mobile Ads 25.4.0 automatically collects and shares listed data for ads, analytics, and fraud prevention; ML Kit also performs its documented SDK collection. |
| Is collected data encrypted in transit? | **Yes** | Google's Mobile Ads disclosure specifies TLS; ML Kit specifies encrypted transport for its documented SDK data. |
| Can users request deletion? | **Yes — in app** | Settings → Account → Delete account deletes the Firestore backup, Firebase Authentication account, and local progress after confirmation. |

Data types to validate against the exact uploaded dependency graph and current
Play taxonomy:

| Likely Play data type | Purpose | Handling |
|---|---|---|
| Approximate location | Advertising, analytics, fraud prevention | AdMob collects IP address, which Google says may estimate general location; collected/shared; TLS |
| App interactions | Advertising, analytics, fraud prevention; ML Kit diagnostics | AdMob collects launch/tap/video interaction information; ML Kit records documented feature/model events |
| Diagnostics / app performance | Advertising, analytics, fraud prevention; SDK diagnostics | AdMob collects SDK/app performance information; ML Kit collects documented performance/error metrics |
| Device or other IDs | Advertising, analytics, fraud prevention; SDK diagnostics | AdMob collects advertising ID, app set ID, and applicable account-related identifiers; ML Kit may collect per-installation identifiers |
| Name | Account management | Optional Google sign-in may provide the learner's display name to Firebase Authentication. |
| Email address | Account management | Optional Google sign-in provides the account email to Firebase Authentication. |
| User IDs | Account management, app functionality | Firebase Authentication assigns a user ID used to secure the learner's Firestore backup. |
| App interactions / other user-generated content | App functionality | Signed-in progress backup includes lesson/exam activity, answers, scores, and learning settings. |
| Purchase history | App functionality | Google Play returns the subscription product and ownership/status needed to suppress ads. It remains device-side and is not trusted from Firestore. Validate the Console answer against the exact Play Billing SDK disclosure and uploaded AAB. |

Do **not** select payment-card information, precise location, contacts,
photos/files, or handwriting-stroke content unless the final AAB changes the
facts. Names, email, user IDs, typed answers, and lesson progress are part of
the optional account/sync flow and must be declared using Play's current
optional-collection and deletion wording. Review
Play's current **Purchase history** wording carefully because the client does
receive subscription ownership/status, even though there is no HanaPath
backend. Advertising must not be omitted merely because HanaPath itself does
not operate the ad servers.

## Related declarations

| Declaration | Draft answer |
|---|---|
| Privacy policy URL | `https://cameronnel.github.io/hanapath/privacy.html` (owner-confirmed) |
| Account deletion URL | `https://cameronnel.github.io/hanapath/privacy.html#account-deletion` (instructions plus in-app/web deletion path) |
| Ads | **Yes — contains Google AdMob interstitial ads in the Android app** |
| App access | No login required; all learning paths and handwriting remain available without an account; Google sign-in enables progress sync |
| Target audience | Not directed at children; select only `18 and over` for worldwide distribution; do not opt into Families or add an advertising age gate |
| Financial features | One optional US$2/month auto-renewing Google Play subscription removes ads; every learning feature remains free |

## Release blockers specific to ads and subscriptions

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
6. Create and activate subscription `hanapath_ad_free_monthly` with monthly
   base plan `monthly`, US$2.00 base price, worldwide regional conversion, no
   trial, and the appropriate digital-service tax classification.
7. Store the Play licence public key as protected environment variable
   `HANAPATH_PLAY_BILLING_PUBLIC_KEY`, then test purchase, cancellation,
   pending completion, acknowledgement, restore, grace period, account hold,
   expiry, refund/revocation, second device, and subscription management.

## Change control

Every dependency, permission, authentication, advertising, network, telemetry,
or storage change must update this file and `privacy.html`. Complete the Play
form from the uploaded AAB rather than this draft alone.
