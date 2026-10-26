async function testPinterestLink(pinUrl) {
  console.log("Testing Pinterest:", pinUrl);
  try {
    const res = await fetch(pinUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const finalUrl = res.url;
    console.log("Resolved URL:", finalUrl);
    const html = await res.text();

    // Check for mp4
    const mp4Match = html.match(/https:\/\/(?:v1|v3)\.pinimg\.com\/videos\/[^\s"']+\.mp4/);
    // Check for m3u8
    const m3u8Match = html.match(/https:\/\/(?:v1|v3)\.pinimg\.com\/videos\/[^\s"']+\.m3u8/);
    // Check for og:image
    const imageMatch = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
    // Check for title
    const titleMatch = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);

    console.log("MP4 found:", mp4Match ? mp4Match[0] : "none");
    console.log("M3U8 found:", m3u8Match ? m3u8Match[0] : "none");
    console.log("Image found:", imageMatch ? imageMatch[1] : "none");
    console.log("Title found:", titleMatch ? titleMatch[1] : "none");

    if (m3u8Match && !mp4Match) {
      // Test conversion trick: replace /hls/ with /mc/720p/ and .m3u8 with .mp4
      const convertedMp4 = m3u8Match[0].replace(/\/hls\//, "/mc/720p/").replace(/\.m3u8$/, ".mp4");
      console.log("Converted MP4 candidate:", convertedMp4);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

testPinterestLink("https://www.pinterest.com/pin/110549303358051759/");
