/**
 * vidFlow Comprehensive Test Suite
 * Tests all frontend routes, API extract endpoint, and streaming download pipeline.
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3001";

const TEST_VIDEO = "https://www.youtube.com/watch?v=aqz-KE-bpKQ";

async function runTests() {
  console.log(`\n======================================================`);
  console.log(`🚀 STARTING VIDFLOW COMPREHENSIVE TEST SUITE`);
  console.log(`🎯 Testing Server Target: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${details ? `-> ${details}` : ""}`);
      failed++;
    }
  }

  // --- SECTION 1: FRONTEND PAGES TESTS ---
  console.log(`📁 1. Testing Frontend Pages & Platform Hubs...`);

  const pagesToTest = [
    { path: "/", expectedText: "vidFlow" },
    { path: "/youtube", expectedText: "YouTube" },
    { path: "/tiktok", expectedText: "TikTok" },
    { path: "/instagram", expectedText: "Instagram" },
    { path: "/twitter", expectedText: "Twitter" },
    { path: "/reddit", expectedText: "Reddit" },
    { path: "/pinterest", expectedText: "Pinterest" },
  ];

  for (const page of pagesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${page.path}`);
      const text = await res.text();
      assert(
        res.status === 200 && text.includes(page.expectedText),
        `Page: ${page.path} (HTTP 200 & content verified)`
      );
    } catch (e) {
      assert(false, `Page: ${page.path}`, e.message);
    }
  }

  // --- SECTION 2: API EXTRACT ROUTE TESTS ---
  console.log(`\n⚙️ 2. Testing /api/extract Media Extraction Engine...`);

  // Test 2.1: Invalid input check
  try {
    const badRes = await fetch(`${BASE_URL}/api/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "not-a-valid-url" }),
    });
    const badJson = await badRes.json();
    assert(
      badRes.status === 400 && badJson.error,
      "Validation: Rejects invalid URL format with HTTP 400"
    );
  } catch (e) {
    assert(false, "Validation: Rejects invalid URL format", e.message);
  }

  // Test 2.2: Real video extraction
  let extractedData = null;
  try {
    console.log(`     Parsing live test video (${TEST_VIDEO})...`);
    const extractRes = await fetch(`${BASE_URL}/api/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: TEST_VIDEO }),
    });

    const json = await extractRes.json();
    assert(
      extractRes.status === 200 && json.success === true,
      "API Extract: Returns HTTP 200 with success: true"
    );

    assert(
      typeof json.data?.title === "string" && json.data.title.length > 0,
      `API Extract: Video title extracted -> "${json.data?.title?.slice(0, 45)}..."`
    );

    assert(
      typeof json.data?.thumbnail === "string" && json.data.thumbnail.startsWith("http"),
      "API Extract: High-definition thumbnail URL found"
    );

    assert(
      Array.isArray(json.data?.videos) && json.data.videos.length > 0,
      `API Extract: ${json.data?.videos?.length} video formats parsed (resolutions: ${json.data?.videos?.map(v => v.quality).slice(0, 4).join(", ")})`
    );

    assert(
      Array.isArray(json.data?.audios) && json.data.audios.length > 0,
      `API Extract: ${json.data?.audios?.length} audio bitrate streams identified`
    );

    extractedData = json.data;
  } catch (e) {
    assert(false, "API Extract: Real video extraction", e.message);
  }

  // --- SECTION 3: API DOWNLOAD STREAMING TESTS ---
  console.log(`\n📥 3. Testing /api/download Stream Piping & Chunked Delivery...`);

  // Test 3.1: Missing URL parameter
  try {
    const noUrlRes = await fetch(`${BASE_URL}/api/download`);
    assert(
      noUrlRes.status === 400,
      "Streaming: Rejects missing URL parameter with HTTP 400"
    );
  } catch (e) {
    assert(false, "Streaming: Rejects missing URL parameter", e.message);
  }

  // Test 3.2: Direct Video Stream
  try {
    console.log("     Initiating chunked video stream pipe...");
    const videoStreamUrl = `${BASE_URL}/api/download?url=${encodeURIComponent(TEST_VIDEO)}&title=TestVideo&ext=mp4`;
    const vRes = await fetch(videoStreamUrl);

    assert(
      vRes.status === 200,
      "Video Stream: HTTP 200 stream connected"
    );

    const vContentType = vRes.headers.get("content-type");
    assert(
      vContentType && vContentType.includes("video/mp4"),
      `Video Stream: Content-Type is valid (${vContentType})`
    );

    const vDisp = vRes.headers.get("content-disposition");
    assert(
      vDisp && vDisp.includes("attachment") && vDisp.includes("TestVideo.mp4"),
      `Video Stream: Content-Disposition attachment header set (${vDisp})`
    );

    // Read the first stream chunk to ensure data is flowing
    const reader = vRes.body.getReader();
    const { value, done } = await reader.read();
    assert(
      !done && value && value.length > 0,
      `Video Stream: Chunk received successfully (${value?.length} bytes read)`
    );
    reader.cancel(); // Terminate cleanly
  } catch (e) {
    assert(false, "Video Stream: Chunked delivery", e.message);
  }

  // Test 3.3: Audio MP3 Stream
  try {
    console.log("     Initiating live MP3 audio stream conversion...");
    const audioStreamUrl = `${BASE_URL}/api/download?url=${encodeURIComponent(TEST_VIDEO)}&audio=true&title=TestAudio`;
    const aRes = await fetch(audioStreamUrl);

    assert(
      aRes.status === 200,
      "Audio Stream: HTTP 200 audio pipe connected"
    );

    const aContentType = aRes.headers.get("content-type");
    assert(
      aContentType && aContentType.includes("audio/mpeg"),
      `Audio Stream: Content-Type is audio/mpeg (${aContentType})`
    );

    const aDisp = aRes.headers.get("content-disposition");
    assert(
      aDisp && aDisp.includes("attachment") && aDisp.includes("TestAudio.mp3"),
      `Audio Stream: Content-Disposition attachment header set (${aDisp})`
    );

    const aReader = aRes.body.getReader();
    const { value: aValue, done: aDone } = await aReader.read();
    assert(
      !aDone && aValue && aValue.length > 0,
      `Audio Stream: First audio chunk received (${aValue?.length} bytes read)`
    );
    aReader.cancel();
  } catch (e) {
    assert(false, "Audio Stream: MP3 chunked delivery", e.message);
  }

  // --- SUMMARY ---
  console.log(`\n======================================================`);
  console.log(`📊 TEST SUITE SUMMARY`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total:  ${passed + failed}`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!\n");
    process.exit(0);
  }
}

runTests();
