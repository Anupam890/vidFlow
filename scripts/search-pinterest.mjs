async function searchHtml() {
  const r = await fetch("https://www.pinterest.com/pin/110549303358051759/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
  });
  const t = await r.text();
  console.log("HTML length:", t.length);

  // Look for video URLs (escaping backslashes in JSON)
  const unescaped = t.replace(/\\u002F/g, "/").replace(/\\\//g, "/");

  const mp4s = unescaped.match(/https?:\/\/[^\s"'<>]+?\.mp4[^\s"'<>]*/gi);
  console.log("mp4s count:", mp4s ? mp4s.length : 0);
  if (mp4s) {
    const unique = [...new Set(mp4s)];
    console.log("Sample mp4s:", unique.slice(0, 5));
  }

  const m3u8s = unescaped.match(/https?:\/\/[^\s"'<>]+?\.m3u8[^\s"'<>]*/gi);
  console.log("m3u8s count:", m3u8s ? m3u8s.length : 0);
  if (m3u8s) {
    const unique = [...new Set(m3u8s)];
    console.log("Sample m3u8s:", unique.slice(0, 5));
  }

  const pinimgs = unescaped.match(/https?:\/\/i\.pinimg\.com\/[^\s"'<>]+/gi);
  console.log("pinimgs count:", pinimgs ? pinimgs.length : 0);
  if (pinimgs) {
    const unique = [...new Set(pinimgs)];
    console.log("Sample pinimgs:", unique.slice(0, 3));
  }

  // Look for JSON-LD script or redux / relay store
  const jsonLd = unescaped.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  console.log("JSON-LD scripts found:", jsonLd ? jsonLd.length : 0);
  if (jsonLd) {
    for (const j of jsonLd) {
      console.log("JSON-LD snippet:", j.slice(0, 200));
    }
  }

  const titleMatch = unescaped.match(/<title>([^<]+)<\/title>/i);
  console.log("Title tag:", titleMatch ? titleMatch[1] : "none");
}

searchHtml().catch(console.error);
