async function checkWithGooglebot() {
  const r = await fetch("https://www.pinterest.com/pin/110549303358051759/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  });
  const t = await r.text();
  console.log("Status:", r.status);
  console.log("Title match:", t.match(/<title>([^<]+)<\/title>/)?.[1]);
  const ogImg = t.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i)?.[1];
  console.log("og:image:", ogImg);
  const ogVideo = t.match(/<meta property=["']og:video["'] content=["']([^"']+)["']/i)?.[1];
  console.log("og:video:", ogVideo);
}
checkWithGooglebot();
