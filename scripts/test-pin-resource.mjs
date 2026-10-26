async function testPinResource() {
  const pinId = "110549303358051759";
  const dataParam = JSON.stringify({
    options: {
      id: pinId,
      field_set_key: "detailed"
    },
    context: {}
  });

  const url = `https://www.pinterest.com/resource/PinResource/get/?data=${encodeURIComponent(dataParam)}`;
  console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json, text/javascript, */*; q=0.01"
    }
  });

  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response length:", text.length);
  try {
    const json = JSON.parse(text);
    console.log("JSON response keys:", Object.keys(json));
    if (json.resource_response) {
      console.log("resource_response keys:", Object.keys(json.resource_response));
      const d = json.resource_response.data;
      if (d) {
        console.log("Pin Title:", d.title || d.grid_title);
        console.log("Is video:", !!d.videos);
        if (d.videos) {
          console.log("Videos object:", JSON.stringify(d.videos, null, 2));
        }
        if (d.images) {
          console.log("Images keys:", Object.keys(d.images));
        }
      }
    }
  } catch (e) {
    console.log("Not JSON, snippet:", text.slice(0, 300));
  }
}

testPinResource().catch(console.error);
