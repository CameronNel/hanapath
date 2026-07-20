package io.github.cameronnel.hanapath;

import android.util.Base64;

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
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.util.Collections;
import java.util.List;

/**
 * Narrow Google Play Billing bridge for the single non-consumable
 * Handwriting Coach entitlement. It deliberately exposes no generic billing
 * surface to web content and never trusts a local entitlement boolean.
 */
@CapacitorPlugin(name = "PremiumWriting")
public class PremiumWritingPlugin extends Plugin implements PurchasesUpdatedListener {
    private BillingClient billingClient;
    private ProductDetails productDetails;
    private PluginCall pendingPurchaseCall;

    private interface ReadyAction {
        void run();
    }

    @Override
    public void load() {
        super.load();
        billingClient = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(
                PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()
            )
            .build();
    }

    @Override
    protected void handleOnDestroy() {
        if (billingClient != null && billingClient.isReady()) billingClient.endConnection();
        billingClient = null;
        pendingPurchaseCall = null;
        super.handleOnDestroy();
    }

    private String productId() {
        return getContext().getString(R.string.premium_writing_product_id).trim();
    }

    private String billingPublicKey() {
        return getContext().getString(R.string.play_billing_public_key).replaceAll("\\s", "");
    }

    private boolean isConfigured() {
        return !productId().isEmpty() && !billingPublicKey().isEmpty();
    }

    private void withReadyClient(PluginCall call, ReadyAction action) {
        if (billingClient == null) {
            call.reject("Play Billing bridge is unavailable", "BILLING_UNAVAILABLE");
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
                } else {
                    call.reject(result.getDebugMessage(), "BILLING_SETUP_" + result.getResponseCode());
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // A later foreground/status call retries setup. Never convert a
                // disconnection into a local entitlement decision.
            }
        });
    }

    private JSObject baseStatus() {
        JSObject result = new JSObject();
        result.put("available", true);
        result.put("configured", isConfigured());
        result.put("entitled", false);
        result.put("pending", false);
        return result;
    }

    private ProductDetails.OneTimePurchaseOfferDetails firstOffer(ProductDetails details) {
        List<ProductDetails.OneTimePurchaseOfferDetails> offers = details.getOneTimePurchaseOfferDetailsList();
        if (offers != null && !offers.isEmpty()) return offers.get(0);
        return details.getOneTimePurchaseOfferDetails();
    }

    private JSObject productJson(ProductDetails details) {
        ProductDetails.OneTimePurchaseOfferDetails offer = firstOffer(details);
        JSObject product = new JSObject();
        product.put("id", details.getProductId());
        product.put("title", details.getName());
        product.put("description", details.getDescription());
        product.put("price", offer == null ? "" : offer.getFormattedPrice());
        return product;
    }

    private void queryProduct(PluginCall call, ReadyAction after) {
        QueryProductDetailsParams.Product product = QueryProductDetailsParams.Product.newBuilder()
            .setProductId(productId())
            .setProductType(BillingClient.ProductType.INAPP)
            .build();
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(Collections.singletonList(product))
            .build();
        billingClient.queryProductDetailsAsync(params, (billingResult, queryResult) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                call.reject(billingResult.getDebugMessage(), "PRODUCT_QUERY_" + billingResult.getResponseCode());
                return;
            }
            List<ProductDetails> products = queryResult.getProductDetailsList();
            productDetails = products == null || products.isEmpty() ? null : products.get(0);
            after.run();
        });
    }

    static boolean verifySignature(String publicKey, String signedData, String signatureText) {
        if (publicKey == null || publicKey.isEmpty() || signedData == null || signatureText == null) return false;
        try {
            byte[] decodedKey = Base64.decode(publicKey, Base64.DEFAULT);
            PublicKey key = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decodedKey));
            Signature signature = Signature.getInstance("SHA1withRSA");
            signature.initVerify(key);
            signature.update(signedData.getBytes(StandardCharsets.UTF_8));
            return signature.verify(Base64.decode(signatureText, Base64.DEFAULT));
        } catch (Exception ignored) {
            return false;
        }
    }

    private boolean isVerifiedProductPurchase(Purchase purchase) {
        return purchase.getProducts().contains(productId())
            && verifySignature(billingPublicKey(), purchase.getOriginalJson(), purchase.getSignature());
    }

    private void acknowledgeThenResolve(Purchase purchase, PluginCall call, JSObject result) {
        if (purchase.isAcknowledged()) {
            call.resolve(result);
            return;
        }
        AcknowledgePurchaseParams params = AcknowledgePurchaseParams.newBuilder()
            .setPurchaseToken(purchase.getPurchaseToken())
            .build();
        billingClient.acknowledgePurchase(params, billingResult -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                call.resolve(result);
            } else {
                call.reject(billingResult.getDebugMessage(), "ACKNOWLEDGE_" + billingResult.getResponseCode());
            }
        });
    }

    private void queryOwnership(PluginCall call, JSObject status, boolean acknowledge) {
        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.INAPP)
            .build();
        billingClient.queryPurchasesAsync(params, (billingResult, purchases) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                call.reject(billingResult.getDebugMessage(), "PURCHASE_QUERY_" + billingResult.getResponseCode());
                return;
            }
            Purchase purchased = null;
            boolean pending = false;
            for (Purchase purchase : purchases) {
                if (!purchase.getProducts().contains(productId())) continue;
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) pending = true;
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED && isVerifiedProductPurchase(purchase)) {
                    purchased = purchase;
                    break;
                }
            }
            status.put("pending", pending);
            status.put("entitled", purchased != null);
            if (purchased != null && acknowledge) acknowledgeThenResolve(purchased, call, status);
            else call.resolve(status);
        });
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject status = baseStatus();
        if (!isConfigured()) {
            status.put("error", "product_unconfigured");
            call.resolve(status);
            return;
        }
        withReadyClient(call, () -> queryProduct(call, () -> {
            if (productDetails != null) status.put("product", productJson(productDetails));
            queryOwnership(call, status, true);
        }));
    }

    @PluginMethod
    public void restore(PluginCall call) {
        if (!isConfigured()) {
            JSObject result = new JSObject();
            result.put("status", "unavailable");
            result.put("error", "product_unconfigured");
            call.resolve(result);
            return;
        }
        withReadyClient(call, () -> {
            JSObject result = new JSObject();
            result.put("status", "success");
            queryOwnership(call, result, true);
        });
    }

    @PluginMethod
    public void purchase(PluginCall call) {
        if (!isConfigured()) {
            call.reject("Handwriting Coach product is not configured", "PRODUCT_UNCONFIGURED");
            return;
        }
        if (pendingPurchaseCall != null) {
            call.reject("A purchase flow is already active", "PURCHASE_IN_PROGRESS");
            return;
        }
        withReadyClient(call, () -> queryProduct(call, () -> {
            if (productDetails == null) {
                call.reject("Handwriting Coach is not available from Google Play", "PRODUCT_UNAVAILABLE");
                return;
            }
            BillingFlowParams.ProductDetailsParams.Builder details = BillingFlowParams.ProductDetailsParams.newBuilder()
                .setProductDetails(productDetails);
            ProductDetails.OneTimePurchaseOfferDetails offer = firstOffer(productDetails);
            if (offer != null && offer.getOfferToken() != null && !offer.getOfferToken().isEmpty()) {
                details.setOfferToken(offer.getOfferToken());
            }
            BillingFlowParams params = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(Collections.singletonList(details.build()))
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

    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        PluginCall call = pendingPurchaseCall;
        if (call == null) return;
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
            if (!purchase.getProducts().contains(productId())) continue;
            if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                JSObject result = new JSObject();
                result.put("status", "pending");
                call.resolve(result);
                return;
            }
            if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED && isVerifiedProductPurchase(purchase)) {
                JSObject result = new JSObject();
                result.put("status", "success");
                result.put("entitled", true);
                acknowledgeThenResolve(purchase, call, result);
                return;
            }
        }
        call.reject("Purchase did not contain a verified Handwriting Coach entitlement", "PURCHASE_UNVERIFIED");
    }
}
