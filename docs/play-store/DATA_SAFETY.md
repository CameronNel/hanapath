# Google Play Data Safety — draft answers (premium handwriting)

> Revised 2026-07-20 for ML Kit Digital Ink and Google Play Billing. The owner
> must re-check the uploaded release and the current Play Console wording before
> submission. This document deliberately does not preserve the old "No data
> collected" answer: Google's own ML Kit disclosure says its SDK sends limited
> diagnostics and usage information off-device.

## Measured product behaviour

- HanaPath has no accounts, ads, developer-operated backend, analytics, or
  remote lesson content.
- Learning progress remains in on-device `localStorage` (`hanapath-v1`).
- Handwriting strokes and recognition candidates are processed on-device and
  are not sent to HanaPath or included in ML Kit's documented collection.
- `com.google.mlkit:digital-ink-recognition` downloads the Korean model and,
  according to Google's SDK disclosure, collects device/app information,
  per-installation identifiers, performance/API metrics, feature input/output
  sizes, events, errors, and configured language for diagnostics and usage
  analytics. Google says this data is encrypted in transit and not shared with
  third parties.
- Google Play Billing handles the optional one-time Handwriting Coach purchase.
  Google processes the store account and payment. HanaPath receives purchase
  state/signature/product metadata and may expose normal transaction records to
  the developer in Play Console; HanaPath has no billing server and never sees
  card details.
- Declared Android permissions are `android.permission.INTERNET` and
  `com.android.vending.BILLING`; the package audit and CI merged-manifest check
  reject other permissions.

Official source to re-check at submission:
<https://developers.google.com/ml-kit/android-data-disclosure>

## Questionnaire draft

| Play Console question | Draft answer | Reason |
|---|---|---|
| Does your app collect or share any required user data types? | **Yes — collects; does not share** | An included ML Kit SDK transmits limited diagnostics/usage data. SDK collection counts even though HanaPath's developer does not receive it. |
| Is collected data encrypted in transit? | **Yes** | Google's ML Kit disclosure specifies HTTPS. Play purchase traffic is handled by Google Play. |
| Can users request deletion? | **No developer-held account data exists** | Local learning data is removed by clearing app data/uninstalling. Google-account and Play purchase data are controlled through Google. Use the console's current exemption/answer wording. |

Data-type mapping to validate against the current form and the exact dependency
version before release:

| Likely Play data type | Purpose | Handling |
|---|---|---|
| Device or other IDs | Diagnostics, usage analytics | Collected by ML Kit; not shared; encrypted in transit; not needed for HanaPath advertising |
| App interactions | SDK feature/model events and configured language | Collected by ML Kit for diagnostics/usage analytics; not handwriting content |
| Diagnostics / app performance | Latency, input/output size, API configuration, errors | Collected by ML Kit; not shared; encrypted in transit |
| Purchase history | Deliver and restore the optional unlock | Processed through Google Play; declare only if the current form says Play Billing service-provider processing is in scope |

Do not select names, email, precise location, contacts, photos, files,
handwriting content, typed answers, advertising, or cross-app tracking unless a
release audit finds a new collection path.

## Related declarations

| Declaration | Draft answer |
|---|---|
| Privacy policy URL | `https://cameronnel.github.io/hanapath/privacy.html` (owner decision #8 still required) |
| Ads | **No ads** |
| App access | Core app needs no login; reviewers need a Play license-test account/product setup to test the paid unlock |
| Target audience | 13+ / not directed at children (owner decision #4 pending) |
| Financial features | App sells one non-consumable digital feature through Google Play; it does not provide financial services |

## Change control

Every dependency, permission, network, purchase, telemetry, or storage change
must update this file and `privacy.html`. Before production, inspect the merged
manifest and dependency graph, re-read every SDK's current data-disclosure page,
and complete the Play form from the uploaded AAB rather than this draft alone.
