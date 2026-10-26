import fs from "fs";

async function testPinterest() {
  const pinUrl = "https://www.pinterest.com/pin/110549303358051759/";
  const res = await fetch(pinUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const html = await res.text();
  const match = html.match(/<script id=["']__PWS_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (match) {
    const data = JSON.parse(match[1]);
    console.log("Top-level keys in __PWS_DATA__:", Object.keys(data));
    // Search recursively for "v3.pinimg.com" or "videos"
    const str = JSON.stringify(data);
    const videoUrls = str.match(/https:\/\/[^"'\\]+?\.(?:mp4|m3u8)/g);
    console.log("Videos found inside __PWS_DATA__:", videoUrls ? [...new Set(videoUrls)] : "None");
    const titleMatch = str.match(/"title":"([^"]+)"/);
    console.log("Title found:", titleMatch ? titleMatch[1] : "None");
  }
}

testPinterest();
