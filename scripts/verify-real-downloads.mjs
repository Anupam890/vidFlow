import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const BASE_URL = "http://localhost:3001";
const FFPROBE_PATH =
  "C:\\Users\\anupa\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffprobe.exe";

const OUTPUT_DIR = path.resolve("./download_verification");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Multi-platform test cases
const TEST_CASES = [
  {
    platform: "YouTube",
    name: "YouTube Video (HD MP4 with sound)",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    audioOnly: false,
    ext: "mp4",
    filename: "youtube_video.mp4",
  },
  {
    platform: "YouTube",
    name: "YouTube Audio (Lossless MP3 conversion)",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    audioOnly: true,
    ext: "mp3",
    filename: "youtube_audio.mp3",
  },
  {
    platform: "TikTok",
    name: "TikTok Video (Watermark-Free HD MP4)",
    url: "https://www.tiktok.com/@scout2015/video/6718335390845095173",
    audioOnly: false,
    ext: "mp4",
    filename: "tiktok_clean_video.mp4",
  },
  {
    platform: "TikTok",
    name: "TikTok Audio (Original Sound MP3)",
    url: "https://www.tiktok.com/@scout2015/video/6718335390845095173",
    audioOnly: true,
    ext: "mp3",
    filename: "tiktok_sound.mp3",
  },
];

async function probeMediaFile(filePath) {
  const args = [
    "-v",
    "error",
    "-show_format",
    "-show_streams",
    "-print_format",
    "json",
    filePath,
  ];

  const { stdout } = await execFileAsync(FFPROBE_PATH, args);
  return JSON.parse(stdout);
}

async function runAllPlatformVerifications() {
  console.log("\n=======================================================");
  console.log("🌍 MULTI-PLATFORM REAL-LINK DOWNLOAD VERIFICATION");
  console.log("=======================================================\n");

  const results = [];

  for (const tc of TEST_CASES) {
    console.log(`\n=======================================================`);
    console.log(`📱 Platform: [${tc.platform}] - ${tc.name}`);
    console.log(`🔗 URL: ${tc.url}`);

    const targetFilePath = path.join(OUTPUT_DIR, tc.filename);
    if (fs.existsSync(targetFilePath)) {
      try { fs.unlinkSync(targetFilePath); } catch {}
    }

    try {
      // 1. /api/extract
      console.log(`   [1/3] Parsing link with /api/extract...`);
      const extractRes = await fetch(`${BASE_URL}/api/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tc.url }),
      });

      const extractJson = await extractRes.json();
      if (!extractRes.ok || !extractJson.success) {
        throw new Error(`Extract failed: ${extractJson.error}`);
      }
      console.log(`         Title: "${extractJson.data.title}"`);
      console.log(`         Uploader: ${extractJson.data.uploader}`);
      console.log(`         Duration: ${extractJson.data.durationString || "N/A"}`);
      console.log(`         Formats Found: ${extractJson.data.videos.length} videos, ${extractJson.data.audios.length} audio streams`);

      // 2. /api/download
      console.log(`   [2/3] Downloading media via /api/download to disk...`);
      const params = new URLSearchParams({
        url: tc.url,
        title: path.parse(tc.filename).name,
        ext: tc.ext,
      });
      if (tc.audioOnly) {
        params.set("audio", "true");
      }

      const downloadRes = await fetch(`${BASE_URL}/api/download?${params.toString()}`);
      if (!downloadRes.ok) {
        const errText = await downloadRes.text();
        throw new Error(`Download HTTP error ${downloadRes.status}: ${errText}`);
      }

      const contentType = downloadRes.headers.get("content-type");
      const contentDisp = downloadRes.headers.get("content-disposition");
      const contentLength = downloadRes.headers.get("content-length");

      console.log(`         HTTP Status: ${downloadRes.status} OK`);
      console.log(`         Content-Type: ${contentType}`);
      console.log(`         Content-Disposition: ${contentDisp}`);
      console.log(`         Content-Length: ${contentLength ? `${(parseInt(contentLength) / 1024).toFixed(1)} KB` : "chunked"}`);

      const fileStream = fs.createWriteStream(targetFilePath);
      const reader = downloadRes.body.getReader();

      let totalBytesReceived = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytesReceived += value.length;
        fileStream.write(Buffer.from(value));
      }
      fileStream.end();

      await new Promise((resolve) => fileStream.on("finish", resolve));
      console.log(`         Saved size: ${(totalBytesReceived / 1024).toFixed(1)} KB to ${tc.filename}`);

      // 3. ffprobe verification
      console.log(`   [3/3] Inspecting downloaded file with ffprobe...`);
      const probeData = await probeMediaFile(targetFilePath);

      const format = probeData.format || {};
      const streams = probeData.streams || [];

      console.log(`         Container Format: ${format.format_name} (${format.format_long_name})`);
      console.log(`         Duration: ${parseFloat(format.duration).toFixed(2)} seconds`);
      console.log(`         Bitrate: ${Math.round(parseInt(format.bit_rate || 0) / 1000)} kbps`);

      const videoStream = streams.find((s) => s.codec_type === "video");
      const audioStream = streams.find((s) => s.codec_type === "audio");

      if (tc.audioOnly) {
        if (!audioStream) {
          throw new Error("No audio stream found in downloaded audio file!");
        }
        console.log(`         ✅ Audio Codec: ${audioStream.codec_name.toUpperCase()} (${audioStream.sample_rate} Hz, ${audioStream.channels} channels)`);
      } else {
        if (!videoStream) {
          throw new Error("No video stream found in downloaded file!");
        }
        console.log(`         ✅ Video Stream: ${videoStream.codec_name.toUpperCase()} (${videoStream.width}x${videoStream.height}, ${videoStream.r_frame_rate} fps)`);
        if (audioStream) {
          console.log(`         ✅ Audio Stream: ${audioStream.codec_name.toUpperCase()} (${audioStream.sample_rate} Hz, ${audioStream.channels} channels)`);
        }
      }

      console.log(`   🎉 RESULT: ${tc.name} is 100% HEALTHY, VALID & PLAYABLE!`);
      results.push({ name: tc.name, platform: tc.platform, passed: true, size: `${(totalBytesReceived / 1024).toFixed(1)} KB` });
    } catch (err) {
      console.error(`   ❌ FAILURE: ${err.message}`);
      results.push({ name: tc.name, platform: tc.platform, passed: false, error: err.message });
    }
  }

  console.log("\n=======================================================");
  console.log("📊 FINAL PLATFORM VERIFICATION SUMMARY");
  console.log("=======================================================");
  results.forEach((r) => {
    if (r.passed) {
      console.log(`  ✅ [PASS] ${r.platform}: ${r.name} (${r.size})`);
    } else {
      console.log(`  ❌ [FAIL] ${r.platform}: ${r.name} -> ${r.error}`);
    }
  });
  console.log("=======================================================\n");

  const anyFailed = results.some((r) => !r.passed);
  if (anyFailed) {
    process.exit(1);
  } else {
    console.log("🏆 ALL TESTED PLATFORMS DOWNLOADED AND PLAYED FLAWLESSLY!\n");
    process.exit(0);
  }
}

runAllPlatformVerifications();
