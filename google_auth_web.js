(function () {
  "use strict";

  const GIS_URL = "https://accounts.google.com/gsi/client";
  let loader = null;

  function loadGoogleIdentityServices() {
    if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id);
    if (loader) return loader;
    loader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = GIS_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => window.google?.accounts?.id
        ? resolve(window.google.accounts.id)
        : reject(new Error("Google Identity Services did not initialize."));
      script.onerror = () => reject(new Error("Google Identity Services could not be loaded."));
      document.head.appendChild(script);
    });
    return loader;
  }

  async function renderButton(container, options) {
    try {
      const identity = await loadGoogleIdentityServices();
      identity.initialize({
        client_id: options.clientId,
        nonce: options.nonce,
        callback: (response) => options.onCredential?.(response?.credential),
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
      });
      identity.renderButton(container, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
        width: Math.max(220, Math.min(360, container.clientWidth || 320)),
      });
    } catch (error) {
      options.onError?.(error);
    }
  }

  window.HANAPATH_GOOGLE_WEB_AUTH = Object.freeze({ renderButton });
}());
