async function testTikTok() {
  const url = "https://www.tiktok.com/@scout2015/video/6718335390845095173";
  console.log("Calling TikWM API for:", url);
  const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  const json = await res.json();
  console.log("TikWM API code:", json.code);
  if (json.data) {
    console.log("Video URL:", json.data.play);
    console.log("Audio URL:", json.data.music);

    const vRes = await fetch(json.data.play, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    console.log("Video Stream fetch status:", vRes.status, "content-type:", vRes.headers.get("content-type"), "content-length:", vRes.headers.get("content-length"));

    const aRes = await fetch(json.data.music, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    console.log("Audio Stream fetch status:", aRes.status, "content-type:", aRes.headers.get("content-type"), "content-length:", aRes.headers.get("content-length"));
  }
}

testTikTok();
