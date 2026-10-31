export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Only activate in production with a live public domain
    if (siteUrl && siteUrl.startsWith("http") && !siteUrl.includes("localhost")) {
      const pingUrl = `${siteUrl.replace(/\/$/, "")}/api/health`;
      const INTERVAL_MS = 10 * 60 * 1000; // Every 10 minutes (Render sleeps at 15m)

      setInterval(async () => {
        try {
          await fetch(pingUrl, {
            headers: { "User-Agent": "VidSnap-KeepAlive/1.0" },
          });
        } catch {
          // Silent non-blocking error handling
        }
      }, INTERVAL_MS);
    }
  }
}

