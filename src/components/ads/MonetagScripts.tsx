"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ADS_CONFIG } from "@/config/ads";

export default function MonetagScripts() {
  // Register the Monetag service worker at /sw.js with root scope
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ADS_CONFIG.enabled &&
      ADS_CONFIG.pushNotifications.enabled &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register(ADS_CONFIG.pushNotifications.swPath, { scope: "/" })
        .then((reg) => {
          console.log("[Monetag] Service worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[Monetag] Service worker registration failed:", err);
        });
    }
  }, []);

  if (!ADS_CONFIG.enabled) return null;

  return (
    <>
      {/* 1. Monetag Site Verification Meta Tag (if configured) */}
      {ADS_CONFIG.monetagVerificationToken && (
        <meta
          name="monetag"
          content={ADS_CONFIG.monetagVerificationToken}
        />
      )}

      {/* 2. Monetag OnClick / Popunder (Zone 304353) */}
      {ADS_CONFIG.popunder.enabled && ADS_CONFIG.popunder.scriptUrl && (
        <Script
          id="monetag-popunder"
          src={ADS_CONFIG.popunder.scriptUrl}
          data-zone={ADS_CONFIG.popunder.zoneId}
          data-cfasync="false"
          strategy="afterInteractive"
        />
      )}

      {/* 3. Monetag Web Push Tag for Zone 12166520 */}
      {ADS_CONFIG.pushNotifications.enabled && ADS_CONFIG.pushNotifications.tagScriptUrl && (
        <Script
          id="monetag-push-tag"
          src={ADS_CONFIG.pushNotifications.tagScriptUrl}
          strategy="afterInteractive"
        />
      )}

      {/* 4. In-Page Push (Native Notification Widget) */}
      {ADS_CONFIG.inPagePushScriptUrl && (
        <Script
          id="monetag-in-page-push"
          src={ADS_CONFIG.inPagePushScriptUrl}
          strategy="afterInteractive"
        />
      )}

      {/* 5. Vignette (Interstitial banner on download click) */}
      {ADS_CONFIG.vignetteScriptUrl && (
        <Script
          id="monetag-vignette"
          src={ADS_CONFIG.vignetteScriptUrl}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
