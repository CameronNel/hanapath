(function () {
  "use strict";

  const CONFIG = Object.freeze({
    webClientId: String(window.HANAPATH_AUTH_CONFIG?.webClientId || "").trim(),
    sessionEndpoint: String(window.HANAPATH_AUTH_CONFIG?.sessionEndpoint || "").trim(),
  });

  function isNative() {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  }

  function secureSessionEndpoint() {
    if (!CONFIG.sessionEndpoint) return false;
    try {
      const url = new URL(CONFIG.sessionEndpoint, window.location.href);
      return url.protocol === "https:" || ["localhost", "127.0.0.1"].includes(url.hostname);
    } catch {
      return false;
    }
  }

  function nativePlugin() {
    return window.Capacitor?.Plugins?.GoogleSignIn || null;
  }

  function capability() {
    if (!secureSessionEndpoint()) {
      return { ready: false, code: "missing-session-endpoint", message: "Google sign-in needs the owner’s secure session service." };
    }
    if (!window.crypto?.randomUUID && !window.crypto?.getRandomValues) {
      return { ready: false, code: "secure-random-unavailable", message: "Google sign-in needs a secure browser context." };
    }
    if (isNative()) {
      if (!nativePlugin()?.signIn) {
        return { ready: false, code: "native-plugin-unavailable", message: "Google sign-in is not available in this app build." };
      }
      return { ready: true, platform: "android" };
    }
    if (!CONFIG.webClientId) {
      return { ready: false, code: "missing-web-client-id", message: "Google sign-in needs the owner’s web OAuth client ID." };
    }
    if (!window.HANAPATH_GOOGLE_WEB_AUTH?.renderButton) {
      return { ready: false, code: "web-adapter-unavailable", message: "Google sign-in is unavailable in this browser." };
    }
    return { ready: true, platform: "web" };
  }

  function nonce() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(24);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  async function exchangeCredential(credential, requestNonce, platform) {
    if (!credential) throw new Error("Google did not return an ID token.");
    const response = await fetch(CONFIG.sessionEndpoint, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-HanaPath-Auth": "google" },
      body: JSON.stringify({ credential, nonce: requestNonce, platform }),
    });
    if (!response.ok) throw new Error("The sign-in service could not verify this Google account.");
    const payload = await response.json().catch(() => ({}));
    window.dispatchEvent(new CustomEvent("hanapath:auth-changed", { detail: { signedIn: true, user: payload.user || null } }));
    return payload;
  }

  function statusLine(container, message, tone = "") {
    const line = container.querySelector("[data-google-auth-status]");
    if (!line) return;
    line.textContent = message;
    line.dataset.tone = tone;
  }

  function render(container, options = {}) {
    if (!container) return;
    const available = capability();
    container.innerHTML = `
      <div class="google-auth-button-slot" data-google-auth-button></div>
      <p class="google-auth-status" data-google-auth-status role="status" aria-live="polite"></p>
      <p class="google-auth-note">Optional account access only. Learning progress remains on this device and is not synced.</p>`;
    const slot = container.querySelector("[data-google-auth-button]");
    statusLine(container, available.ready ? "" : available.message, available.ready ? "" : "muted");

    if (!available.ready) {
      slot.innerHTML = '<button class="google-signin-disabled" type="button" disabled aria-disabled="true"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      return;
    }

    const requestNonce = nonce();
    const complete = async (credential) => {
      statusLine(container, "Verifying securely…");
      try {
        const session = await exchangeCredential(credential, requestNonce, available.platform);
        statusLine(container, "Signed in with Google.", "success");
        options.onSuccess?.(session);
      } catch (error) {
        statusLine(container, error?.message || "Google sign-in could not be completed.", "error");
        options.onError?.(error);
      }
    };

    if (available.platform === "android") {
      slot.innerHTML = '<button class="google-signin-native" type="button"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      slot.querySelector("button")?.addEventListener("click", async () => {
        statusLine(container, "Opening Google…");
        try {
          const result = await nativePlugin().signIn();
          if (!result?.nonce) throw new Error("Google sign-in did not return its request nonce.");
          statusLine(container, "Verifying securely…");
          const session = await exchangeCredential(result?.idToken, result.nonce, available.platform);
          statusLine(container, "Signed in with Google.", "success");
          options.onSuccess?.(session);
        } catch (error) {
          statusLine(container, error?.message || "Google sign-in was cancelled.", "error");
        }
      });
      return;
    }

    window.HANAPATH_GOOGLE_WEB_AUTH.renderButton(slot, {
      clientId: CONFIG.webClientId,
      nonce: requestNonce,
      onCredential: complete,
      onError: (error) => statusLine(container, error?.message || "Google sign-in is unavailable.", "error"),
    });
  }

  window.HANAPATH_GOOGLE_AUTH = Object.freeze({ capability, render });
}());
