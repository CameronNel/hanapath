package io.github.cameronnel.hanapath;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.FormError;
import com.google.android.ump.UserMessagingPlatform;

@CapacitorPlugin(name = "HanaPathAds")
public class HanaPathAdsPlugin extends Plugin {
    private static final String TAG = "HanaPathAds";
    private static final String PREFS_NAME = "hanapath_ads";
    private static final String PREF_LAST_SHOWN_AT = "last_interstitial_shown_at";
    private static final long AD_MAX_AGE_MS = 55L * 60L * 1000L;
    private static final String GOOGLE_TEST_INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";

    private SharedPreferences preferences;
    private ConsentInformation consentInformation;
    private InterstitialAd interstitialAd;
    private long interstitialLoadedAt = 0L;
    private long sessionStartedAt = 0L;
    private boolean mobileAdsInitializationStarted = false;
    private boolean mobileAdsInitialized = false;
    private boolean interstitialLoading = false;

    @Override
    public void load() {
        super.load();
        preferences = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        sessionStartedAt = System.currentTimeMillis();

        if (!adsEnabledForThisBuild()) {
            Log.i(TAG, "Production ads are not configured; native interstitials remain disabled.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            // Source/debug builds intentionally use Google's dedicated test ad
            // unit. If no production AdMob identifiers are configured, there is
            // no publisher account or consent message to query, so exercise the
            // cadence with test ads without pretending production consent exists.
            if (BuildConfig.DEBUG && !BuildConfig.ADMOB_CONFIGURED) {
                initializeMobileAds();
                return;
            }
            initializeConsentAndAds();
        });
    }

    private boolean adsEnabledForThisBuild() {
        return BuildConfig.DEBUG || BuildConfig.ADMOB_CONFIGURED;
    }

    private String interstitialUnitId() {
        if (BuildConfig.DEBUG) return GOOGLE_TEST_INTERSTITIAL_ID;
        return BuildConfig.ADMOB_INTERSTITIAL_ID == null ? "" : BuildConfig.ADMOB_INTERSTITIAL_ID.trim();
    }

    private void initializeConsentAndAds() {
        consentInformation = UserMessagingPlatform.getConsentInformation(getContext());
        ConsentRequestParameters params = new ConsentRequestParameters.Builder().build();
        consentInformation.requestConsentInfoUpdate(
            getActivity(),
            params,
            () -> {
                UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                    getActivity(),
                    formError -> {
                        if (formError != null) {
                            Log.w(TAG, "Consent form dismissed with error: " + formError.getMessage());
                        }
                        if (consentInformation.canRequestAds()) initializeMobileAds();
                    }
                );
                if (consentInformation.canRequestAds()) initializeMobileAds();
            },
            requestConsentError -> {
                Log.w(TAG, "Consent information update failed: " + requestConsentError.getMessage());
                // A prior valid consent state may still permit requests even if
                // this launch's refresh fails (for example, transient network).
                if (consentInformation.canRequestAds()) initializeMobileAds();
            }
        );
    }

    private synchronized void initializeMobileAds() {
        if (!adsEnabledForThisBuild() || mobileAdsInitializationStarted) return;
        if (!BuildConfig.DEBUG && (consentInformation == null || !consentInformation.canRequestAds())) return;
        mobileAdsInitializationStarted = true;
        MobileAds.initialize(getContext(), initializationStatus -> {
            mobileAdsInitialized = true;
            loadInterstitial();
        });
    }

    private void loadInterstitial() {
        getActivity().runOnUiThread(() -> {
            if (!mobileAdsInitialized || interstitialLoading || interstitialAd != null) return;
            String unitId = interstitialUnitId();
            if (unitId.isEmpty()) return;

            interstitialLoading = true;
            InterstitialAd.load(
                getContext(),
                unitId,
                new AdRequest.Builder().build(),
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd ad) {
                        interstitialLoading = false;
                        interstitialAd = ad;
                        interstitialLoadedAt = System.currentTimeMillis();
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        interstitialLoading = false;
                        interstitialAd = null;
                        interstitialLoadedAt = 0L;
                        Log.w(TAG, "Interstitial preload failed: " + loadAdError.getMessage());
                    }
                }
            );
        });
    }

    private long lastShownAt() {
        return preferences == null ? 0L : preferences.getLong(PREF_LAST_SHOWN_AT, 0L);
    }

    private JSObject status(boolean shown, String reason, long now) {
        JSObject ret = new JSObject();
        long lastShown = lastShownAt();
        ret.put("shown", shown);
        ret.put("reason", reason);
        ret.put("cooldownMs", AdCadence.COOLDOWN_MS);
        ret.put("lastShownAt", lastShown);
        ret.put("sessionStartedAt", sessionStartedAt);
        ret.put("eligibleAt", AdCadence.eligibleAt(sessionStartedAt, lastShown));
        ret.put("remainingMs", AdCadence.remainingMs(sessionStartedAt, lastShown, now));
        ret.put("configured", BuildConfig.ADMOB_CONFIGURED);
        ret.put("testAds", BuildConfig.DEBUG);
        ret.put("ready", interstitialAd != null);
        ret.put("privacyOptionsRequired", consentInformation != null
            && consentInformation.getPrivacyOptionsRequirementStatus()
                == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED);
        return ret;
    }

    @PluginMethod
    public void lessonCompleted(PluginCall call) {
        final long now = System.currentTimeMillis();
        if (!adsEnabledForThisBuild()) {
            call.resolve(status(false, "not-configured", now));
            return;
        }

        if (!AdCadence.isEligible(sessionStartedAt, lastShownAt(), now)) {
            call.resolve(status(false, "cooldown", now));
            return;
        }

        getActivity().runOnUiThread(() -> {
            long showNow = System.currentTimeMillis();
            if (!AdCadence.isEligible(sessionStartedAt, lastShownAt(), showNow)) {
                call.resolve(status(false, "cooldown", showNow));
                return;
            }

            if (interstitialAd != null && showNow - interstitialLoadedAt > AD_MAX_AGE_MS) {
                interstitialAd = null;
                interstitialLoadedAt = 0L;
            }

            if (interstitialAd == null) {
                loadInterstitial();
                call.resolve(status(false, mobileAdsInitialized ? "not-ready" : "ads-not-initialized", showNow));
                return;
            }

            final InterstitialAd ad = interstitialAd;
            interstitialAd = null;
            interstitialLoadedAt = 0L;
            ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override
                public void onAdShowedFullScreenContent() {
                    long shownAt = System.currentTimeMillis();
                    preferences.edit().putLong(PREF_LAST_SHOWN_AT, shownAt).apply();
                }

                @Override
                public void onAdDismissedFullScreenContent() {
                    loadInterstitial();
                }

                @Override
                public void onAdFailedToShowFullScreenContent(@NonNull AdError adError) {
                    Log.w(TAG, "Interstitial failed to show: " + adError.getMessage());
                    // Do not advance the cooldown. The next completed lesson may
                    // try again once a fresh ad is ready.
                    loadInterstitial();
                }
            });

            try {
                ad.show(getActivity());
                call.resolve(status(true, "shown", showNow));
            } catch (RuntimeException error) {
                Log.w(TAG, "Interstitial show threw", error);
                loadInterstitial();
                call.resolve(status(false, "show-error", showNow));
            }
        });
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        call.resolve(status(false, "status", System.currentTimeMillis()));
    }

    @PluginMethod
    public void showPrivacyOptions(PluginCall call) {
        if (consentInformation == null) {
            call.reject("Privacy options are unavailable before consent initialization", "CONSENT_NOT_READY");
            return;
        }
        getActivity().runOnUiThread(() -> UserMessagingPlatform.showPrivacyOptionsForm(
            getActivity(),
            (FormError formError) -> {
                if (formError != null) {
                    call.reject(formError.getMessage(), "PRIVACY_OPTIONS_FAILED");
                    return;
                }
                if (consentInformation.canRequestAds()) initializeMobileAds();
                call.resolve();
            }
        ));
    }
}
