/**
 * Monetag & Display Ads Configuration for vidsnap.tech
 */

export const ADS_CONFIG = {
  // Set to true to enable ads across the site, false to disable all ads
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS !== "false",

  // Shows visual dashed preview boxes where banner ads will appear.
  // Set to false in production if you only want live ads.
  showPlaceholders: true,

  // 1. Monetag Site Verification Token
  // If Monetag asks you to add a meta tag: <meta name="monetag" content="xxxx" />
  monetagVerificationToken: "",

  // 2. Monetag Web Push Service Worker (From your sw.js)
  pushNotifications: {
    enabled: true,
    swPath: "/sw.js",
    zoneId: 12166520,
    domain: "5gvci.com",
    tagScriptUrl: "https://5gvci.com/pfe/current/tag.min.js?z=12166520",
  },

  // 3. OnClick / Popunder (Zone 304353)
  popunder: {
    enabled: true,
    scriptUrl: "https://quge5.com/88/tag.min.js",
    zoneId: "304353",
  },

  // 4. In-Page Push (Banner) (Zone 12166629)
  inPagePush: {
    enabled: true,
    scriptUrl: "https://nap5k.com/tag.min.js",
    zoneId: "12166629",
  },

  // 5. Vignette Banner (Zone 12166633)
  vignette: {
    enabled: true,
    scriptUrl: "https://n6wxm.com/vignette.min.js",
    zoneId: "12166633",
  },

  // 6. Banner Zone IDs / Script URLs (For display banners)
  zones: {
    // Top banner directly below the search input (728x90 desktop / 300x250 mobile)
    topBanner: {
      zoneId: "",
      scriptUrl: "",
    },
    // Banner placed inside the download results card (300x250 or responsive)
    downloadCard: {
      zoneId: "",
      scriptUrl: "",
    },
    // Banner placed between HowItWorks and FAQs
    betweenSections: {
      zoneId: "",
      scriptUrl: "",
    },
    // Sticky bottom floating anchor bar (320x50 mobile / 728x90 desktop)
    stickyBottom: {
      zoneId: "",
      scriptUrl: "",
    },
  },
};
