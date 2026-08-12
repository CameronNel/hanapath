package io.github.cameronnel.hanapath;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
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

import java.util.Collections;
import java.util.List;

@CapacitorPlugin(name = "HanaPathAds")
public class HanaPathAdsPlugin extends Plugin implements PurchasesUpdatedListener {
    private static final String TAG = "HanaPathAds";
    private static final String PREFS_NAME = "hanapath_ads";
    private static final String PREF_LAST_SHOWN_AT = "last_interstitial_shown_at";
    private static final String PREF_AD_FREE = "ad_free_subscription_active";
    private static final long AD_MAX_AGE_MS = 55L * 60L * 1000L;
    private static final String GOOGLE_TEST_INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";
    private static final String AD_FREE_PRODUCT_ID = "hanapath_ad_free_monthly";
    private static final String AD_FREE_BASE_PLAN_ID = "monthly";

    private SharedPreferences preferences;
    private ConsentInformation consentInformation;
    private InterstitialAd interstitialAd;
    private long interstitialLoadedAt = 0L;
    private long sessionStartedAt = 0L;
    private boolean mobileAdsInitializationStarted = false;
    private boolean mobileAdsInitialized = false;
    private boolean interstitialLoading = false;
    private BillingClient billingClient;
    private ProductDetails subscriptionProduct;
    private ProductDetails.SubscriptionOfferDetails subscriptionOffer;
    private PluginCall pendingPurchaseCall;
    private boolean subscriptionQueryInFlight = false;
    private boolean subscriptionPending = false;
    private boolean subscriptionResolved = false;

    private interface ReadyAction {
        void run();
    }

    @Override
    public void load() {
        super.load();
        preferences = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        sessionStartedAt = System.currentTimeMillis();

        billingClient = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(
                PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()
            )
            .build();

        if (!adsEnabledForThisBuild()) {
            Log.i(TAG, "Production ads are not configured; native interstitials remain disabled.");
        }

        refreshSubscriptionState(null, true);
    }

    @Override
    protected void handleOnResume() {
        super.handleOnResume();
        refreshSubscriptionState(null, false);
    }

    @Override
    protected void handleOnDestroy() {
        if (billingClient != null && billingClient.isReady()) billingClient.endConnection();
        billingClient = null;
        pendingPurchaseCall = null;
        super.handleOnDestroy();
    }

    private boolean adsEnabledForThisBuild() {
        return BuildConfig.DEBUG || BuildConfig.ADMOB_CONFIGURED;
    }

    private boolean adFree() {
        return preferences != null && preferences.getBoolean(PREF_AD_FREE, false);
    }

    private void setAdFree(boolean entitled) {
        if (preferences != null) preferences.edit().putBoolean(PREF_AD_FREE, entitled).apply();
        if (entitled) {
            interstitialAd = null;
            interstitialLoadedAt = 0L;
        }
        JSObject event = new JSObject();
        event.put("entitled", entitled);
        event.put("pending", subscriptionPending);
        event.put("resolved", subscriptionResolved);
        notifyListeners("subscriptionStatusChanged", event, true);
    }

    private boolean billingConfigured() {
        return BuildConfig.PLAY_BILLING_CONFIGURED
            && BuildConfig.PLAY_BILLING_PUBLIC_KEY != null
            && !BuildConfig.PLAY_BILLING_PUBLIC_KEY.trim().isEmpty();
    }

    private void withReadyBillingClient(PluginCall call, ReadyAction action) {
        if (billingClient == null) {
            if (call != null) call.reject("Play Billing bridge is unavailable", "BILLING_UNAVAILABLE");
            return;
        }
        if (billingClient.isReady()) {
            action.run();
            return;
        }
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult result) {
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    action.run();
                } else if (call != null) {
                    finishSubscriptionRefresh(false);
                    call.reject(result.getDebugMessage(), "BILLING_SETUP_" + result.getResponseCode());
                } else {
                    finishSubscriptionRefresh(false);
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // The next resume, status, restore, or purchase call reconnects.
                // Keep the last verified active entitlement rather than showing
                // ads to a subscriber during a transient Play Store outage.
            }
        });
    }

    private ProductDetails.SubscriptionOfferDetails chooseMonthlyOffer(ProductDetails details) {
        List<ProductDetails.SubscriptionOfferDetails> offers = details.getSubscriptionOfferDetails();
        if (offers == null) return null;
        for (ProductDetails.SubscriptionOfferDetails offer : offers) {
            if (!AD_FREE_BASE_PLAN_ID.equals(offer.getBasePlanId())) continue;
            if (offer.getOfferId() == null) return offer;
        }
        // The owner approved only the plain monthly base plan: no trial or
        // introductory offer may silently replace it in checkout.
        return null;
    }

    private JSObject productJson() {
        if (subscriptionProduct == null || subscriptionOffer == null) return null;
        List<ProductDetails.PricingPhase> phases = subscriptionOffer
            .getPricingPhases().getPricingPhaseList();
        ProductDetails.PricingPhase recurring = phases == null || phases.isEmpty()
            ? null : phases.get(phases.size() - 1);
        JSObject product = new JSObject();
        product.put("id", subscriptionProduct.getProductId());
        product.put("basePlanId", subscriptionOffer.getBasePlanId());
        product.put("title", subscriptionProduct.getName());
        product.put("description", subscriptionProduct.getDescription());
        product.put("price", recurring == null ? "" : recurring.getFormattedPrice());
        product.put("billingPeriod", recurring == null ? "P1M" : recurring.getBillingPeriod());
        return product;
    }

    private boolean verifies(Purchase purchase) {
        try {
            byte[] publicKey = Base64.decode(BuildConfig.PLAY_BILLING_PUBLIC_KEY, Base64.DEFAULT);
            byte[] signature = Base64.decode(purchase.getSignature(), Base64.DEFAULT);
            return PlayPurchaseVerifier.verify(publicKey, purchase.getOriginalJson(), signature);
        } catch (RuntimeException ignored) {
            return false;
        }
    }

    private boolean isVerifiedActiveSubscription(Purchase purchase) {
        return purchase.getProducts().contains(AD_FREE_PRODUCT_ID)
            && purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED
            && verifies(purchase);
    }

    private void querySubscriptionProduct(PluginCall call, ReadyAction after) {
        QueryProductDetailsParams.Product product = QueryProductDetailsParams.Product.newBuilder()
            .setProductId(AD_FREE_PRODUCT_ID)
            .setProductType(BillingClient.ProductType.SUBS)
            .build();
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(Collections.singletonList(product))
            .build();
        billingClient.queryProductDetailsAsync(params, (billingResult, queryResult) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                finishSubscriptionRefresh(false);
                if (call != null) call.reject(billingResult.getDebugMessage(), "PRODUCT_QUERY_" + billingResult.getResponseCode());
                return;
            }
            List<ProductDetails> products = queryResult.getProductDetailsList();
            subscriptionProduct = products == null || products.isEmpty() ? null : products.get(0);
            subscriptionOffer = subscriptionProduct == null ? null : chooseMonthlyOffer(subscriptionProduct);
            after.run();
        });
    }

    private void acknowledge(Purchase purchase, PluginCall call, JSObject result) {
        if (purchase.isAcknowledged()) {
            if (call != null) call.resolve(result);
            return;
        }
        AcknowledgePurchaseParams params = AcknowledgePurchaseParams.newBuilder()
            .setPurchaseToken(purchase.getPurchaseToken())
            .build();
        billingClient.acknowledgePurchase(params, billingResult -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                if (call != null) call.resolve(result);
            } else if (call != null) {
                call.reject(billingResult.getDebugMessage(), "ACKNOWLEDGE_" + billingResult.getResponseCode());
            }
        });
    }

    private void queryActiveSubscription(PluginCall call, boolean acknowledgePurchase, String successStatus) {
        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build();
        billingClient.queryPurchasesAsync(params, (billingResult, purchases) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                finishSubscriptionRefresh(false);
                if (call != null) call.reject(billingResult.getDebugMessage(), "PURCHASE_QUERY_" + billingResult.getResponseCode());
                return;
            }

            Purchase active = null;
            subscriptionPending = false;
            for (Purchase purchase : purchases) {
                if (!purchase.getProducts().contains(AD_FREE_PRODUCT_ID)) continue;
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) subscriptionPending = true;
                if (isVerifiedActiveSubscription(purchase)) {
                    active = purchase;
                    break;
                }
            }

            subscriptionResolved = true;
            setAdFree(active != null);
            finishSubscriptionRefresh(true);
            JSObject result = subscriptionStatus(successStatus);
            if (call == null) {
                if (active != null && acknowledgePurchase && !active.isAcknowledged()) acknowledge(active, null, result);
            } else if (active != null && acknowledgePurchase) {
                acknowledge(active, call, result);
            } else {
                call.resolve(result);
            }
        });
    }

    private void refreshSubscriptionState(PluginCall call, boolean initialLoad) {
        if (subscriptionQueryInFlight) {
            if (call != null) call.resolve(subscriptionStatus("refresh-in-progress"));
            return;
        }
        if (!billingConfigured()) {
            subscriptionResolved = true;
            finishSubscriptionRefresh(true);
            if (call != null) call.resolve(subscriptionStatus("not-configured"));
            return;
        }
        subscriptionQueryInFlight = true;
        withReadyBillingClient(call, () -> querySubscriptionProduct(call,
            () -> queryActiveSubscription(call, true, initialLoad ? "startup" : "refreshed")));
    }

    private void finishSubscriptionRefresh(boolean resolvedWithoutError) {
        subscriptionQueryInFlight = false;
        if (resolvedWithoutError) subscriptionResolved = true;
        if (!adFree()) startAdsAfterSubscriptionCheck();
    }

    private void startAdsAfterSubscriptionCheck() {
        if (!adsEnabledForThisBuild() || adFree()) return;
        if (mobileAdsInitializationStarted) {
            loadInterstitial();
            return;
        }
        getActivity().runOnUiThread(() -> {
            // Source/debug builds use Google's dedicated test inventory. A
            // production build still waits for UMP before any ad request.
            if (BuildConfig.DEBUG && !BuildConfig.ADMOB_CONFIGURED) initializeMobileAds();
            else initializeConsentAndAds();
        });
    }

    private JSObject subscriptionStatus(String reason) {
        JSObject result = new JSObject();
        result.put("status", reason);
        result.put("available", billingClient != null);
        result.put("configured", billingConfigured());
        result.put("resolved", subscriptionResolved);
        result.put("entitled", adFree());
        result.put("pending", subscriptionPending);
        result.put("productId", AD_FREE_PRODUCT_ID);
        result.put("basePlanId", AD_FREE_BASE_PLAN_ID);
        JSObject product = productJson();
        if (product != null) result.put("product", product);
        return result;
    }

    private String interstitialUnitId() {
        if (BuildConfig.DEBUG) return GOOGLE_TEST_INTERSTITIAL_ID;
        return BuildConfig.ADMOB_INTERSTITIAL_ID == null ? "" : BuildConfig.ADMOB_INTERSTITIAL_ID.trim();
    }

    private boolean isPrivacyOptionsRequired() {
        return consentInformation != null
            && consentInformation.getPrivacyOptionsRequirementStatus()
                == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED;
    }

    private void notifyPrivacyOptionsStatus() {
        JSObject ret = new JSObject();
        ret.put("required", isPrivacyOptionsRequired());
        notifyListeners("privacyOptionsStatusChanged", ret, true);
    }

    private void initializeConsentAndAds() {
        consentInformation = UserMessagingPlatform.getConsentInformation(getContext());
        ConsentRequestParameters params = new ConsentRequestParameters.Builder().build();
        consentInformation.requestConsentInfoUpdate(
            getActivity(),
            params,
            () -> {
                notifyPrivacyOptionsStatus();
                UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                    getActivity(),
                    formError -> {
                        if (formError != null) {
                            Log.w(TAG, "Consent form dismissed with error: " + formError.getMessage());
                        }
                        notifyPrivacyOptionsStatus();
                        if (consentInformation.canRequestAds()) initializeMobileAds();
                    }
                );
                if (consentInformation.canRequestAds()) initializeMobileAds();
            },
            requestConsentError -> {
                Log.w(TAG, "Consent information update failed: " + requestConsentError.getMessage());
                // A prior valid consent state may still permit requests even if
                // this launch's refresh fails (for example, transient network).
                notifyPrivacyOptionsStatus();
                if (consentInformation.canRequestAds()) initializeMobileAds();
            }
        );
    }

    private synchronized void initializeMobileAds() {
        if (!adsEnabledForThisBuild() || adFree() || mobileAdsInitializationStarted) return;
        if (!BuildConfig.DEBUG && (consentInformation == null || !consentInformation.canRequestAds())) return;
        mobileAdsInitializationStarted = true;
        MobileAds.initialize(getContext(), initializationStatus -> {
            mobileAdsInitialized = true;
            loadInterstitial();
        });
    }

    private void loadInterstitial() {
        getActivity().runOnUiThread(() -> {
            if (adFree() || !mobileAdsInitialized || interstitialLoading || interstitialAd != null) return;
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
        ret.put("privacyOptionsRequired", isPrivacyOptionsRequired());
        ret.put("adFree", adFree());
        ret.put("subscription", subscriptionStatus("status"));
        return ret;
    }

    @PluginMethod
    public void lessonCompleted(PluginCall call) {
        final long now = System.currentTimeMillis();
        if (adFree()) {
            call.resolve(status(false, "ad-free-subscription", now));
            return;
        }
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
    public void refreshSubscription(PluginCall call) {
        refreshSubscriptionState(call, false);
    }

    @PluginMethod
    public void purchaseAdFree(PluginCall call) {
        if (!billingConfigured()) {
            call.reject("The ad-free subscription is not configured in this build", "PRODUCT_UNCONFIGURED");
            return;
        }
        if (pendingPurchaseCall != null) {
            call.reject("A purchase flow is already active", "PURCHASE_IN_PROGRESS");
            return;
        }
        withReadyBillingClient(call, () -> querySubscriptionProduct(call, () -> {
            if (subscriptionProduct == null || subscriptionOffer == null) {
                call.reject("The monthly ad-free plan is unavailable from Google Play", "PRODUCT_UNAVAILABLE");
                return;
            }
            BillingFlowParams.ProductDetailsParams details = BillingFlowParams.ProductDetailsParams.newBuilder()
                .setProductDetails(subscriptionProduct)
                .setOfferToken(subscriptionOffer.getOfferToken())
                .build();
            BillingFlowParams params = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(Collections.singletonList(details))
                .build();
            pendingPurchaseCall = call;
            call.setKeepAlive(true);
            BillingResult launch = billingClient.launchBillingFlow(getActivity(), params);
            if (launch.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                pendingPurchaseCall = null;
                call.setKeepAlive(false);
                call.reject(launch.getDebugMessage(), "PURCHASE_LAUNCH_" + launch.getResponseCode());
            }
        }));
    }

    @PluginMethod
    public void restoreAdFree(PluginCall call) {
        if (!billingConfigured()) {
            call.resolve(subscriptionStatus("not-configured"));
            return;
        }
        withReadyBillingClient(call, () -> querySubscriptionProduct(call,
            () -> queryActiveSubscription(call, true, "success")));
    }

    @PluginMethod
    public void manageSubscription(PluginCall call) {
        Uri uri = Uri.parse(
            "https://play.google.com/store/account/subscriptions?sku="
                + AD_FREE_PRODUCT_ID + "&package=" + getContext().getPackageName()
        );
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            getContext().startActivity(intent);
            call.resolve();
        } catch (RuntimeException error) {
            call.reject("Google Play subscription management is unavailable", "MANAGE_UNAVAILABLE", error);
        }
    }

    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        PluginCall call = pendingPurchaseCall;
        if (call == null) {
            refreshSubscriptionState(null, false);
            return;
        }
        pendingPurchaseCall = null;
        call.setKeepAlive(false);

        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
            JSObject result = new JSObject();
            result.put("status", "cancelled");
            call.resolve(result);
            return;
        }
        if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK || purchases == null) {
            call.reject(billingResult.getDebugMessage(), "PURCHASE_UPDATE_" + billingResult.getResponseCode());
            return;
        }

        for (Purchase purchase : purchases) {
            if (!purchase.getProducts().contains(AD_FREE_PRODUCT_ID)) continue;
            if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                subscriptionPending = true;
                setAdFree(false);
                JSObject result = subscriptionStatus("pending");
                call.resolve(result);
                return;
            }
            if (isVerifiedActiveSubscription(purchase)) {
                subscriptionPending = false;
                subscriptionResolved = true;
                setAdFree(true);
                JSObject result = subscriptionStatus("success");
                acknowledge(purchase, call, result);
                return;
            }
        }
        call.reject("Google Play did not return a verified ad-free subscription", "PURCHASE_UNVERIFIED");
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
                notifyPrivacyOptionsStatus();
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
