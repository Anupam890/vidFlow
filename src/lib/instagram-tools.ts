export interface InstagramTool {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  inputPlaceholder: string;
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  samples: { label: string; url: string }[];
}

export const INSTAGRAM_TOOLS: InstagramTool[] = [
  {
    id: "viewer",
    slug: "viewer",
    name: "Instagram Story & Profile Viewer",
    shortName: "Story Viewer",
    href: "/instagram/viewer",
    badge: "Anonymous & No Login",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    description: "Watch and download public Instagram stories, highlights, and profiles anonymously without an account.",
    heroTitle: "Instagram Viewer & Anonymous Story Saver",
    heroSubtitle:
      "Watch Instagram stories, highlights, and profiles anonymously without logging in. View, inspect, and download public stories before they disappear.",
    inputPlaceholder: "Enter Instagram username (e.g. @cristiano) or paste Story URL...",
    features: [
      {
        title: "100% Anonymous Viewing",
        desc: "The account owner will never know you watched their stories or inspected their profile.",
      },
      {
        title: "No Instagram Account Needed",
        desc: "Bypass the Instagram login barrier completely. Browse public stories directly from your browser.",
      },
      {
        title: "Download Disappearing Stories",
        desc: "Save active 24-hour stories and permanent story highlights in original video and photo quality.",
      },
    ],
    faqs: [
      {
        q: "Is using the Instagram Story Viewer truly anonymous?",
        a: "Yes. VidSnap fetches media directly on our servers without logging into your personal Instagram account. Your profile will never appear on the creator's seen list.",
      },
      {
        q: "Can I view stories from private Instagram profiles?",
        a: "No. For privacy and security reasons, stories from private accounts that require following approval cannot be accessed.",
      },
      {
        q: "How long do Instagram stories stay available?",
        a: "Instagram stories expire after 24 hours. However, once you download them via VidSnap, you keep the MP4 video or JPG photo permanently.",
      },
      {
        q: "Can I download stories as well as viewing them?",
        a: "Yes! You can preview stories directly in your browser and click Download to save the original file to your device.",
      },
    ],
    samples: [
      {
        label: "Public Profile (@instagram)",
        url: "https://www.instagram.com/instagram/",
      },
      {
        label: "Sample Story URL",
        url: "https://www.instagram.com/stories/instagram/",
      },
    ],
  },
  {
    id: "reels",
    slug: "reels",
    name: "Instagram Reels Downloader",
    shortName: "Reels",
    href: "/instagram/reels",
    badge: "1080p HD",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    description: "Download trending Instagram Reels videos in full 1080p HD MP4 with original sound and audio.",
    heroTitle: "Instagram Reels Downloader",
    heroSubtitle:
      "Save Instagram Reels in crystal clear 1080p MP4 quality with synchronized sound. Free, fast, and watermark-free.",
    inputPlaceholder: "Paste Instagram Reel URL (e.g. https://www.instagram.com/reel/...)...",
    features: [
      {
        title: "Crisp 1080p High Definition",
        desc: "Pulls the highest available bitrate stream directly from Instagram's content delivery network.",
      },
      {
        title: "No Watermark Added",
        desc: "Download clean, original video files with zero promotional overlays or stamps.",
      },
      {
        title: "Full Audio Sync",
        desc: "Original background tracks, voice-overs, and trending songs are kept perfectly in sync.",
      },
    ],
    faqs: [
      {
        q: "How do I download an Instagram Reel on mobile?",
        a: "Tap the Share icon on the Reel, select 'Copy Link', paste it into VidSnap, and hit Download.",
      },
      {
        q: "Does VidSnap compress the Reel's resolution?",
        a: "No, VidSnap grabs the highest resolution stream available directly from the source.",
      },
    ],
    samples: [
      {
        label: "Sample Reel Link",
        url: "https://www.instagram.com/reel/C3_a77aP9qN/",
      },
    ],
  },
  {
    id: "story",
    slug: "story",
    name: "Instagram Stories & Highlights Downloader",
    shortName: "Stories",
    href: "/instagram/story",
    badge: "Stories & Highlights",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Download 24-hour disappearing Instagram stories and profile highlights in original quality.",
    heroTitle: "Instagram Story & Highlights Downloader",
    heroSubtitle:
      "Save Instagram Stories and Highlights to your phone or computer before the 24-hour timer runs out.",
    inputPlaceholder: "Paste Instagram Story link or enter username (e.g. @username)...",
    features: [
      {
        title: "Save Before Expiration",
        desc: "Preserve ephemeral moments and daily stories permanently in original resolution.",
      },
      {
        title: "Highlight Reel Support",
        desc: "Download archived highlights from any public creator's profile page.",
      },
      {
        title: "Instant MP4 & JPEG Output",
        desc: "Video stories are saved as MP4, while photo stories are saved in high resolution JPEG.",
      },
    ],
    faqs: [
      {
        q: "How do I get a link to someone's story?",
        a: "Open the story on Instagram, tap the three dots or Share icon, and choose 'Copy Link'.",
      },
      {
        q: "Can I download multiple stories at once?",
        a: "Yes, you can download each story slide individually in its original format.",
      },
    ],
    samples: [
      {
        label: "Sample Story",
        url: "https://www.instagram.com/stories/instagram/",
      },
    ],
  },
  {
    id: "photo",
    slug: "photo",
    name: "Instagram Photo Downloader",
    shortName: "Photos",
    href: "/instagram/photo",
    badge: "Full Resolution",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Save Instagram photos, portraits, and post images in original, uncompressed resolution.",
    heroTitle: "Instagram Photo Downloader",
    heroSubtitle:
      "Download Instagram photos in original high resolution. Save portraits, landscapes, and album pictures with zero quality loss.",
    inputPlaceholder: "Paste Instagram Photo URL (e.g. https://www.instagram.com/p/...)...",
    features: [
      {
        title: "Uncompressed Image Quality",
        desc: "Fetches full-resolution master files up to 1080x1350 or 2048px from Instagram servers.",
      },
      {
        title: "Color Profile Preservation",
        desc: "Retains original sRGB / Display P3 color spaces and sharpness for crisp viewing.",
      },
      {
        title: "Direct One-Click Download",
        desc: "Save pictures straight to your device gallery or downloads folder instantly.",
      },
    ],
    faqs: [
      {
        q: "How do I download a photo from Instagram?",
        a: "Click the three dots on the photo post, tap 'Copy Link', paste into the box above, and download.",
      },
      {
        q: "Is the photo downloaded in high quality?",
        a: "Yes! We extract the maximum resolution version stored on Instagram CDN.",
      },
    ],
    samples: [
      {
        label: "Sample Photo Post",
        url: "https://www.instagram.com/p/C6Z1pQhLxYc/",
      },
    ],
  },
  {
    id: "video",
    slug: "video",
    name: "Instagram Video & IGTV Downloader",
    shortName: "Videos",
    href: "/instagram/video",
    badge: "Feed & IGTV",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Download Instagram feed videos, IGTV episodes, and long-form broadcasts in MP4.",
    heroTitle: "Instagram Video & IGTV Downloader",
    heroSubtitle:
      "Save long-form IGTV broadcasts and Instagram feed videos in high definition MP4 format with audio.",
    inputPlaceholder: "Paste Instagram Video or IGTV link...",
    features: [
      {
        title: "Long Video Support",
        desc: "Easily handles extended IGTV broadcasts and multi-minute feed video presentations.",
      },
      {
        title: "Crystal Clear Audio",
        desc: "Extracts stereo audio tracks without muffled distortion or clipping.",
      },
      {
        title: "High-Compatibility MP4",
        desc: "Compatible with all mobile players, Windows, macOS, Android, and iOS.",
      },
    ],
    faqs: [
      {
        q: "Can I download long IGTV videos?",
        a: "Yes, VidSnap supports videos of any duration, from short clips to full-length IGTV episodes.",
      },
    ],
    samples: [
      {
        label: "Sample Video Post",
        url: "https://www.instagram.com/p/C3_a77aP9qN/",
      },
    ],
  },
  {
    id: "carousel",
    slug: "carousel",
    name: "Instagram Carousel Downloader",
    shortName: "Carousels",
    href: "/instagram/carousel",
    badge: "Multi-Slide Post",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    description: "Download all photos and video slides from multi-slide Instagram carousel posts at once.",
    heroTitle: "Instagram Carousel & Album Downloader",
    heroSubtitle:
      "Save every slide from multi-image and mixed video carousel posts in high quality with a single link.",
    inputPlaceholder: "Paste Instagram Carousel link (e.g. https://www.instagram.com/p/...)...",
    features: [
      {
        title: "All Slides Extracted",
        desc: "Detects up to 10 or 20 slides in a single post and organizes them for easy downloading.",
      },
      {
        title: "Mixed Media Support",
        desc: "Seamlessly handles carousels containing both high-res photos and looping videos.",
      },
      {
        title: "Original Sequencing",
        desc: "Maintains the author's original slide sequence and caption information.",
      },
    ],
    faqs: [
      {
        q: "What is an Instagram carousel?",
        a: "A carousel is a post containing multiple swipeable photos or videos in a single gallery.",
      },
      {
        q: "Can I choose which slide to download?",
        a: "Yes, VidSnap presents all slides so you can download individual photos or all of them.",
      },
    ],
    samples: [
      {
        label: "Sample Carousel Link",
        url: "https://www.instagram.com/p/C6Z1pQhLxYc/",
      },
    ],
  },
  {
    id: "profile",
    slug: "profile",
    name: "Instagram Profile Picture (DP) Downloader",
    shortName: "Profile DP",
    href: "/instagram/profile",
    badge: "Full Size DP",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "View and download high-resolution Instagram profile pictures (HD DP) and avatars by username.",
    heroTitle: "Instagram Profile Picture (HD DP) Downloader",
    heroSubtitle:
      "Enlarge and download Instagram profile photos (DP) in full original resolution. Just enter the username or profile link.",
    inputPlaceholder: "Enter Instagram username (e.g. @zuck) or profile URL...",
    features: [
      {
        title: "Full HD Avatar Zoom",
        desc: "View the full-size 1080x1080 uncompressed avatar instead of the tiny circular crop.",
      },
      {
        title: "Simple Username Search",
        desc: "Type @username or paste the user profile URL to inspect and download instantly.",
      },
      {
        title: "Works on Public Profiles",
        desc: "Download high definition avatars from public Instagram influencers, brands, and creators.",
      },
    ],
    faqs: [
      {
        q: "How can I see someone's full Instagram profile picture?",
        a: "Enter their username (like @username) into VidSnap, and we will reveal the full-size uncropped HD photo.",
      },
      {
        q: "Is it safe to view profile pictures?",
        a: "Yes, 100% anonymous and safe. No login or authorization is needed.",
      },
    ],
    samples: [
      {
        label: "Sample Profile (@instagram)",
        url: "https://www.instagram.com/instagram/",
      },
    ],
  },
];

export function getInstagramToolBySlug(slug: string): InstagramTool {
  const normalized = (slug || "").toLowerCase().trim();
  const found = INSTAGRAM_TOOLS.find(
    (t) => t.slug.toLowerCase() === normalized || t.id.toLowerCase() === normalized
  );
  return found || INSTAGRAM_TOOLS[0];
}
