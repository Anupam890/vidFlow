import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const stepsDir = path.resolve("public/images/steps");
const tempDir = path.resolve("temp_steps_html");

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(stepsDir)) fs.mkdirSync(stepsDir, { recursive: true });

// Common CSS & Head template
const head = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Step Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              200: '#a7f3d0',
              300: '#6ee7b7',
              400: '#34d399',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 800px;
      height: 520px;
      overflow: hidden;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .browser-shadow {
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08), 0 0 1px 1px rgba(0,0,0,0.05);
    }
  </style>
</head>
<body class="p-6">
`;

const foot = `</body></html>`;

// 1. STEP 1: Copy Video Link
const htmlStep1 = `${head}
  <div class="w-full h-full bg-white rounded-2xl border border-slate-200/90 browser-shadow overflow-hidden flex flex-col">
    <!-- Window Header -->
    <div class="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="flex items-center gap-2 bg-white px-4 py-1 rounded-md text-xs font-medium text-slate-500 border border-slate-200 shadow-xs">
        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        <span>youtube.com/watch?v=travel_4k</span>
      </div>
      <div class="w-12"></div>
    </div>

    <!-- Content: Video Player with Share Modal -->
    <div class="flex-1 p-6 relative bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between text-white">
      <!-- Fake Video Player Thumbnail -->
      <div class="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"></div>
      
      <!-- Video Info -->
      <div class="relative z-10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-md">
            YT
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">4K Scenic Nature & Wildlife Video</h4>
            <p class="text-xs text-slate-400">Nature Explorers • 4.8M views</p>
          </div>
        </div>
        <div class="px-2.5 py-1 bg-red-600/90 text-[11px] font-bold rounded tracking-wide">
          4K UHD
        </div>
      </div>

      <!-- Share Popover Center Stage -->
      <div class="relative z-20 self-center w-full max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 shadow-2xl">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Share Video</span>
          <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            Ready to Copy
          </span>
        </div>

        <div class="flex items-center gap-2 bg-slate-950/80 border border-slate-700/90 rounded-xl p-2.5 pl-3">
          <span class="text-xs font-mono text-slate-300 truncate flex-1">https://youtu.be/travel_4k_scenic</span>
          <div class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/50 ring-2 ring-emerald-400/50">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Copy Link</span>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Works on YouTube, TikTok, Reels, Threads & X
          </span>
          <span class="text-emerald-400 font-bold">Step 1</span>
        </div>
      </div>

      <!-- Player Controls Bar -->
      <div class="relative z-10 w-full flex items-center gap-3 pt-3">
        <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-red-500 h-full w-2/5"></div>
        </div>
        <span class="text-[10px] text-slate-400 font-mono">03:42/08:15</span>
      </div>
    </div>
  </div>
${foot}`;

// 2. STEP 2: Open vidsnap.tech
const htmlStep2 = `${head}
  <div class="w-full h-full bg-white rounded-2xl border border-slate-200/90 browser-shadow overflow-hidden flex flex-col">
    <!-- Window Header -->
    <div class="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="flex items-center gap-2 bg-white px-5 py-1 rounded-md text-xs font-semibold text-emerald-700 border border-emerald-300 shadow-xs ring-2 ring-emerald-500/20">
        <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        <span>https://vidsnap.tech</span>
      </div>
      <div class="w-12"></div>
    </div>

    <!-- Website Top Header & Hero -->
    <div class="flex-1 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/70 p-6 flex flex-col justify-between">
      <!-- Navbar -->
      <div class="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md flex items-center justify-center text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
          </div>
          <span class="text-lg font-black tracking-tight text-slate-900">Vid<span class="text-emerald-600">Snap</span><span class="text-xs font-semibold text-emerald-500">.tech</span></span>
        </div>
        <!-- Nav Links -->
        <div class="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <span class="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">YouTube</span>
          <span>TikTok</span>
          <span>Instagram</span>
          <span>Threads</span>
          <span>Pinterest</span>
        </div>
      </div>

      <!-- Hero Headline Preview -->
      <div class="text-center my-auto py-2">
        <div class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 mb-3 shadow-xs">
          <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span>Fast, Free & Unlimited Online Downloader</span>
        </div>
        <h2 class="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
          Download Videos in <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Full HD & 4K</span>
        </h2>
        <p class="mt-2 text-xs text-slate-500 max-w-md mx-auto">
          Visit <strong>vidsnap.tech</strong> from any browser on mobile, tablet or PC — zero installation required.
        </p>
      </div>

      <!-- Browser Status Indicator -->
      <div class="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
        <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>No apps or extensions needed • 100% web-based</span>
        </div>
        <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 2</span>
      </div>
    </div>
  </div>
${foot}`;

// 3. STEP 3: Paste Your Link
const htmlStep3 = `${head}
  <div class="w-full h-full bg-white rounded-2xl border border-slate-200/90 browser-shadow overflow-hidden flex flex-col">
    <!-- Window Header -->
    <div class="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="text-xs font-semibold text-slate-600">vidsnap.tech — Input Link</div>
      <div class="w-12"></div>
    </div>

    <!-- Active Input Showcase -->
    <div class="flex-1 bg-gradient-to-b from-slate-50 to-white p-7 flex flex-col justify-between">
      <!-- Top hint -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">3</div>
          <span class="text-sm font-bold text-slate-800">Paste your video link into the box</span>
        </div>
        <span class="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Automatic Detection</span>
      </div>

      <!-- Search Bar with Link Pasted -->
      <div class="my-auto">
        <div class="relative rounded-2xl bg-white border-2 border-emerald-500 p-2.5 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-500/15 flex items-center gap-3">
          <!-- Search / Link Icon -->
          <div class="pl-2 text-emerald-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          </div>
          
          <!-- Pasted Link Text -->
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-slate-900 truncate font-mono">
              https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </div>
            <div class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>YouTube video detected • Ready to fetch</span>
            </div>
          </div>

          <!-- Paste button / Download button -->
          <button class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-emerald-600/30 flex items-center gap-2 hover:scale-[1.02] transition-transform">
            <span>Download</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>

        <!-- Quick Platform Badges -->
        <div class="mt-4 flex items-center justify-center gap-2">
          <span class="text-xs text-slate-400 font-medium mr-1">Supported:</span>
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">YouTube</span>
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">Instagram</span>
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">TikTok</span>
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">Threads</span>
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">Twitter/X</span>
        </div>
      </div>

      <div class="text-center text-xs text-slate-500 font-medium">
        Or simply click the <strong>📋 Paste</strong> button to grab straight from clipboard
      </div>
    </div>
  </div>
${foot}`;

// 4. STEP 4: Choose Format & Quality
const htmlStep4 = `${head}
  <div class="w-full h-full bg-white rounded-2xl border border-slate-200/90 browser-shadow overflow-hidden flex flex-col">
    <!-- Window Header -->
    <div class="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="text-xs font-semibold text-slate-600">vidsnap.tech — Quality Options</div>
      <div class="w-12"></div>
    </div>

    <!-- Format & Quality Table -->
    <div class="flex-1 bg-white p-5 flex flex-col justify-between overflow-hidden">
      <!-- Video Header -->
      <div class="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div class="w-16 h-11 rounded-lg bg-slate-800 flex items-center justify-center text-white relative overflow-hidden shadow-xs shrink-0">
          <div class="absolute inset-0 bg-gradient-to-tr from-purple-800 to-indigo-600 opacity-80"></div>
          <svg class="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-slate-900 truncate">4K Cinematic Video (Ultra HD 60FPS)</h4>
          <p class="text-[11px] text-slate-500">Duration: 04:18 • Format: MP4 / Audio MP3</p>
        </div>
        <!-- Format Toggle -->
        <div class="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
          <span class="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold shadow-xs">Video (MP4)</span>
          <span class="px-2.5 py-1 text-slate-600 text-xs font-semibold">Audio (MP3)</span>
        </div>
      </div>

      <!-- Quality Options Rows -->
      <div class="space-y-2 my-auto">
        <!-- 1080p FHD Row (Selected) -->
        <div class="flex items-center justify-between p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/10">
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[11px] font-bold">1080p</span>
            <span class="text-xs font-bold text-slate-900">Full HD Video</span>
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">Recommended</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono font-semibold text-slate-600">MP4</span>
            <button class="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Download</span>
            </button>
          </div>
        </div>

        <!-- 720p HD Row -->
        <div class="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50">
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px] font-bold">720p</span>
            <span class="text-xs font-semibold text-slate-800">HD Standard</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-slate-500">MP4</span>
            <button class="bg-slate-800 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs">
              Download
            </button>
          </div>
        </div>

        <!-- MP3 Audio Row -->
        <div class="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50">
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-[11px] font-bold">MP3</span>
            <span class="text-xs font-semibold text-slate-800">High Quality Audio (320kbps)</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-slate-500">Audio</span>
            <button class="bg-slate-800 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs">
              Download
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <span>No watermarks • Original video bitrate preserved</span>
        <span class="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 4</span>
      </div>
    </div>
  </div>
${foot}`;

// 5. STEP 5: Download and Save
const htmlStep5 = `${head}
  <div class="w-full h-full bg-white rounded-2xl border border-slate-200/90 browser-shadow overflow-hidden flex flex-col">
    <!-- Window Header -->
    <div class="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="text-xs font-semibold text-emerald-700 font-mono">vidsnap.tech — Download Complete</div>
      <div class="w-12"></div>
    </div>

    <!-- Active Download Card with Saved Status & Browser Tray -->
    <div class="flex-1 bg-gradient-to-b from-white to-slate-50/70 p-6 flex flex-col justify-between relative">
      <!-- Browser Download Bubble / Notification -->
      <div class="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center justify-between">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
          </div>
          <div>
            <div class="text-xs font-bold text-white flex items-center gap-2">
              <span>Nature_Exploration_1080p.mp4</span>
              <span class="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono">Saved</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">142 MB • Saved directly to your Downloads folder</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            100% Complete
          </span>
        </div>
      </div>

      <!-- Action State in Button -->
      <div class="bg-white border-2 border-emerald-500/70 rounded-2xl p-5 shadow-lg my-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <div class="text-sm font-bold text-slate-900">File Saved Successfully!</div>
            <div class="text-xs text-slate-500">No popups, no redirects — fast direct download</div>
          </div>
        </div>

        <button class="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          <span>Saved!</span>
        </button>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <span class="flex items-center gap-1.5 text-slate-600">
          <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
          Check your device's <strong>Downloads</strong> folder
        </span>
        <span class="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 5</span>
      </div>
    </div>
  </div>
${foot}`;

// Write HTML files
fs.writeFileSync(path.join(tempDir, "step-1.html"), htmlStep1);
fs.writeFileSync(path.join(tempDir, "step-2.html"), htmlStep2);
fs.writeFileSync(path.join(tempDir, "step-3.html"), htmlStep3);
fs.writeFileSync(path.join(tempDir, "step-4.html"), htmlStep4);
fs.writeFileSync(path.join(tempDir, "step-5.html"), htmlStep5);

console.log("HTML files generated successfully in temp_steps_html");

// Run Chrome headless for each step
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

for (let i = 1; i <= 5; i++) {
  const htmlFile = path.join(tempDir, `step-${i}.html`);
  const outFile = path.join(stepsDir, `step-${i}.png`);
  const fileUrl = `file:///${htmlFile.replace(/\\/g, "/")}`;
  const cmd = `"${chromePath}" --headless --disable-gpu --hide-scrollbars --window-size=800,520 "--screenshot=${outFile}" "${fileUrl}"`;
  console.log(`Generating step-${i}.png...`);
  execSync(cmd, { stdio: "inherit" });
}

console.log("All 5 step screenshots successfully generated!");
