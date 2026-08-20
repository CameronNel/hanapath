package io.github.cameronnel.hanapath;

import android.app.Activity;
import android.os.CancellationSignal;
import android.util.Base64;

import androidx.core.content.ContextCompat;
import androidx.credentials.ClearCredentialStateRequest;
import androidx.credentials.Credential;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.CustomCredential;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.ClearCredentialException;
import androidx.credentials.exceptions.GetCredentialCancellationException;
import androidx.credentials.exceptions.GetCredentialException;
import androidx.credentials.exceptions.GetCredentialInterruptedException;
import androidx.credentials.exceptions.GetCredentialProviderConfigurationException;
import androidx.credentials.exceptions.GetCredentialUnsupportedException;
import androidx.credentials.exceptions.NoCredentialException;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;

import java.security.SecureRandom;
import java.util.concurrent.Executor;

/**
 * Narrow native boundary for the explicit Sign in with Google button flow.
 *
 * This plugin never decodes or trusts an ID token and never creates an app
 * session. Its only successful sign-in result is the opaque ID token plus the
 * exact request nonce, which must be sent to an owner-operated verifier before
 * any account state is established.
 */
@CapacitorPlugin(name = "GoogleSignIn")
public class GoogleSignInPlugin extends Plugin {
    static final String CONFIGURATION_REQUIRED = "GOOGLE_SIGN_IN_CONFIGURATION_REQUIRED";
    static final String SIGN_IN_CANCELLED = "GOOGLE_SIGN_IN_CANCELLED";

    private static final int NONCE_BYTES = 32;

    private final Object operationLock = new Object();
    private CredentialManager credentialManager;
    private CancellationSignal activeSignInSignal;
    private CancellationSignal activeClearSignal;

    @Override
    public void load() {
        super.load();
        try {
            credentialManager = CredentialManager.create(getContext());
        } catch (RuntimeException exception) {
            credentialManager = null;
        }
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        String serverClientId = getConfiguredServerClientId();
        JSObject result = new JSObject();
        result.put("configured", isConfiguredServerClientId(serverClientId));
        result.put("available", credentialManager != null && getActivity() != null);
        call.resolve(result);
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        String serverClientId = getConfiguredServerClientId();
        if (!isConfiguredServerClientId(serverClientId)) {
            call.reject(
                "Google sign-in requires an owner-configured server OAuth client ID.",
                CONFIGURATION_REQUIRED
            );
            return;
        }

        Activity activity = getActivity();
        if (credentialManager == null || activity == null) {
            call.reject("Google sign-in is not available in the current activity.", "GOOGLE_SIGN_IN_UNAVAILABLE");
            return;
        }

        CancellationSignal signal = new CancellationSignal();
        synchronized (operationLock) {
            if (activeSignInSignal != null || activeClearSignal != null) {
                call.reject("A Google authentication operation is already in progress.", "GOOGLE_AUTH_IN_PROGRESS");
                return;
            }
            activeSignInSignal = signal;
        }

        String nonce = generateNonce();
        GetCredentialRequest request;
        try {
            GetSignInWithGoogleOption googleOption = new GetSignInWithGoogleOption.Builder(serverClientId)
                .setNonce(nonce)
                .build();
            request = new GetCredentialRequest.Builder()
                .addCredentialOption(googleOption)
                .build();
        } catch (RuntimeException exception) {
            finishSignIn(signal);
            call.reject(
                "Google sign-in requires a valid server OAuth client ID.",
                CONFIGURATION_REQUIRED,
                exception
            );
            return;
        }

        Executor executor = ContextCompat.getMainExecutor(activity);
        try {
            credentialManager.getCredentialAsync(
                activity,
                request,
                signal,
                executor,
                new CredentialManagerCallback<GetCredentialResponse, GetCredentialException>() {
                    @Override
                    public void onResult(GetCredentialResponse response) {
                        if (!finishSignIn(signal)) return;
                        resolveGoogleCredential(call, response, nonce);
                    }

                    @Override
                    public void onError(GetCredentialException exception) {
                        if (!finishSignIn(signal)) return;
                        rejectSignInError(call, exception);
                    }
                }
            );
        } catch (RuntimeException exception) {
            finishSignIn(signal);
            call.reject("Unable to start Google sign-in.", "GOOGLE_SIGN_IN_FAILED", exception);
        }
    }

    @PluginMethod
    public void signOut(PluginCall call) {
        if (credentialManager == null) {
            call.reject("Credential Manager is unavailable.", "GOOGLE_SIGN_OUT_UNAVAILABLE");
            return;
        }

        CancellationSignal signal = new CancellationSignal();
        synchronized (operationLock) {
            if (activeSignInSignal != null || activeClearSignal != null) {
                call.reject("A Google authentication operation is already in progress.", "GOOGLE_AUTH_IN_PROGRESS");
                return;
            }
            activeClearSignal = signal;
        }

        ClearCredentialStateRequest request = new ClearCredentialStateRequest(
            ClearCredentialStateRequest.TYPE_CLEAR_CREDENTIAL_STATE
        );
        Executor executor = ContextCompat.getMainExecutor(getContext());
        try {
            credentialManager.clearCredentialStateAsync(
                request,
                signal,
                executor,
                new CredentialManagerCallback<Void, ClearCredentialException>() {
                    @Override
                    public void onResult(Void ignored) {
                        if (!finishClear(signal)) return;
                        JSObject result = new JSObject();
                        result.put("cleared", true);
                        call.resolve(result);
                    }

                    @Override
                    public void onError(ClearCredentialException exception) {
                        if (!finishClear(signal)) return;
                        call.reject("Unable to clear Google credential state.", "GOOGLE_SIGN_OUT_FAILED", exception);
                    }
                }
            );
        } catch (RuntimeException exception) {
            finishClear(signal);
            call.reject("Unable to start credential-state clearing.", "GOOGLE_SIGN_OUT_FAILED", exception);
        }
    }

    @Override
    protected void handleOnDestroy() {
        synchronized (operationLock) {
            if (activeSignInSignal != null) {
                activeSignInSignal.cancel();
                activeSignInSignal = null;
            }
            if (activeClearSignal != null) {
                activeClearSignal.cancel();
                activeClearSignal = null;
            }
        }
        credentialManager = null;
        super.handleOnDestroy();
    }

    private void resolveGoogleCredential(PluginCall call, GetCredentialResponse response, String nonce) {
        Credential credential = response.getCredential();
        if (!(credential instanceof CustomCredential)) {
            call.reject("Credential Manager returned an unexpected credential.", "GOOGLE_SIGN_IN_INVALID_CREDENTIAL");
            return;
        }

        CustomCredential customCredential = (CustomCredential) credential;
        if (!GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL.equals(customCredential.getType())) {
            call.reject("Credential Manager returned an unexpected credential type.", "GOOGLE_SIGN_IN_INVALID_CREDENTIAL");
            return;
        }

        try {
            GoogleIdTokenCredential googleCredential = GoogleIdTokenCredential.createFrom(customCredential.getData());
            String idToken = googleCredential.getIdToken();
            if (idToken == null || idToken.trim().isEmpty()) {
                call.reject("Google sign-in returned an empty ID token.", "GOOGLE_SIGN_IN_INVALID_TOKEN");
                return;
            }

            JSObject result = new JSObject();
            result.put("idToken", idToken);
            result.put("nonce", nonce);
            call.resolve(result);
        } catch (Exception exception) {
            // googleid is implemented in Kotlin and its Java signature does not
            // declare GoogleIdTokenParsingException even though parsing can
            // fail with it at runtime.
            call.reject("Google sign-in returned an invalid ID token credential.", "GOOGLE_SIGN_IN_INVALID_TOKEN", exception);
        }
    }

    private void rejectSignInError(PluginCall call, GetCredentialException exception) {
        if (exception instanceof GetCredentialCancellationException) {
            call.reject("Google sign-in was cancelled.", SIGN_IN_CANCELLED, exception);
        } else if (exception instanceof NoCredentialException) {
            call.reject("No Google account is available for sign-in.", "GOOGLE_SIGN_IN_NO_CREDENTIAL", exception);
        } else if (exception instanceof GetCredentialProviderConfigurationException) {
            call.reject("Google Credential Manager is not configured on this device.", "GOOGLE_SIGN_IN_PROVIDER_CONFIGURATION", exception);
        } else if (exception instanceof GetCredentialUnsupportedException) {
            call.reject("Google Credential Manager is not supported on this device.", "GOOGLE_SIGN_IN_UNSUPPORTED", exception);
        } else if (exception instanceof GetCredentialInterruptedException) {
            call.reject("Google sign-in was interrupted. Please try again.", "GOOGLE_SIGN_IN_INTERRUPTED", exception);
        } else {
            call.reject("Google sign-in failed.", "GOOGLE_SIGN_IN_FAILED", exception);
        }
    }

    private String getConfiguredServerClientId() {
        String buildValue = normalizeServerClientId(BuildConfig.GOOGLE_SIGN_IN_SERVER_CLIENT_ID);
        if (isConfiguredServerClientId(buildValue)) return buildValue;
        int generatedId = getContext().getResources().getIdentifier(
            "default_web_client_id",
            "string",
            getContext().getPackageName()
        );
        if (generatedId != 0) {
            String generatedValue = normalizeServerClientId(getContext().getString(generatedId));
            if (isConfiguredServerClientId(generatedValue)) return generatedValue;
        }
        return normalizeServerClientId(getContext().getString(R.string.google_sign_in_server_client_id));
    }

    static boolean isConfiguredServerClientId(String value) {
        return !normalizeServerClientId(value).isEmpty();
    }

    static String normalizeServerClientId(String value) {
        return value == null ? "" : value.trim();
    }

    private static String generateNonce() {
        byte[] randomBytes = new byte[NONCE_BYTES];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.encodeToString(
            randomBytes,
            Base64.NO_WRAP | Base64.URL_SAFE | Base64.NO_PADDING
        );
    }

    private boolean finishSignIn(CancellationSignal signal) {
        synchronized (operationLock) {
            if (activeSignInSignal != signal) return false;
            activeSignInSignal = null;
            return true;
        }
    }

    private boolean finishClear(CancellationSignal signal) {
        synchronized (operationLock) {
            if (activeClearSignal != signal) return false;
            activeClearSignal = null;
            return true;
        }
    }
}
