export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vidsnap.com";
export const SITE_NAME = "VidSnap";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Schema.org WebSite JSON-LD
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free online video and audio downloader for YouTube, TikTok, Instagram, Twitter, Reddit, and Pinterest. Save in 4K, 1080p, or 320kbps MP3.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?url={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Schema.org WebApplication / SoftwareApplication JSON-LD
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Windows, macOS, Linux, iOS, Android)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    description:
      "High speed online video downloader. Download watermark-free videos and audio in 4K, 1080p HD, and 320kbps MP3 format from social media platforms.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "14820",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "100% Watermark-Free TikTok Downloads",
      "YouTube 4K, 1080p HD Video & 320kbps MP3 Audio",
      "Instagram Reels & Video Saver",
      "Twitter / X Video & GIF Downloader",
      "Reddit Video with Synchronized Audio",
      "Pinterest Video & Pin Downloader",
      "Direct browser downloads without registration",
    ],
  };
}

/**
 * Schema.org Organization JSON-LD
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [],
  };
}

/**
 * Schema.org FAQPage JSON-LD
 */
export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

