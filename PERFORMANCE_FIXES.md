# VidSnap on Oracle Cloud Free Tier — Performance Analysis & Fixes

> Analysis only. Nothing in the repo has been changed. Every code block below is ready to paste when you decide to apply it.
>
> Note: `node_modules` is not installed yet, so the Next.js 16.4.3 docs bundled at `node_modules/next/dist/docs/` (see `AGENTS.md`) could not be checked. Verify the route-handler/streaming snippets against those docs before applying.

---

## Executive summary

The site is not slow because of Next.js or Oracle networking. It is slow because **the server does the heaviest possible work (full video download + FFmpeg transcode) synchronously, with no concurrency limit, on a 1 OCPU / 1 GB machine — and it does it twice per user.**

Three things dominate, in this order:

| # | Cause | Where | Impact |
|---|---|---|---|
| 1 | Every URL paste silently starts a full background download + mux ("preheat") | `src/app/api/extract/route.ts:37-46` | Doubles all work; pegs the single core on every paste |
| 2 | No concurrency limit on `yt-dlp` / `ffmpeg` | `src/lib/extractor.ts` | 3-4 users = machine unresponsive |
| 3 | Fake quality tiers force VP9/H.264 re-encodes that never needed to happen | `src/lib/extractor.ts:562-595`, `734-753` | Minutes of 100% CPU per download |

Secondary but real: whole videos buffered in RAM on a 1 GB box, temp files that are never deleted, downloads that send no bytes until the entire file is prepared, and a 35 KB translation bundle that makes every page client-rendered.

**If you only do three things:** move to an **Ampere A1** instance (4 OCPU / 24 GB, also Always Free), delete the preheat block, and add the concurrency limiter in §2.

---

## 0. The machine itself (biggest single win, zero code)

Oracle's Always Free tier gives you two different shapes. Check which one you are on:

```bash
curl -s -H "Authorization: Bearer Oracle" http://169.254.169.254/opc/v2/instance/ | grep -i shape
```

| Shape | CPU | RAM | Network | Verdict for this app |
|---|---|---|---|---|
| `VM.Standard.E2.1.Micro` (x86) | 1 OCPU | **1 GB** | 480 Mbps | Too small. FFmpeg + Node + yt-dlp will swap and stall. |
| `VM.Standard.A1.Flex` (Ampere ARM) | up to **4 OCPU** | up to **24 GB** | ~1 Gbps per OCPU | What you want. Also free. |

Ampere A1 is ARM64. Your stack is fine on ARM — `node:20-bookworm-slim` is multi-arch, and Debian's `ffmpeg` plus pip's `yt-dlp` both build/run on arm64. You only need to rebuild the image on the ARM host (or `docker buildx build --platform linux/arm64`).

Capacity for A1 is often unavailable in a given availability domain; retry across ADs or use a different home region.

**If you must stay on the 1 GB micro shape, add swap or it will OOM-kill the container mid-download:**

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.d/99-swap.conf && sudo sysctl --system
```

**Also check the OS firewall.** Oracle's Ubuntu/Oracle Linux images ship iptables rules that block everything except 22, *in addition to* the VCN Security List. A half-open port shows up as "the site is really slow" (browser retrying) rather than a clean error:

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## 1. Kill the "preheat" — highest-impact code change

`src/app/api/extract/route.ts:37-46` fires a full `prepareMediaFile()` on every single extract, fire-and-forget, with no await, no limit, and no way to cancel it. Paste a 4K YouTube link and the server immediately starts downloading hundreds of MB and running FFmpeg — while still trying to serve the JSON response and every other visitor.

It also runs for users who never click Download, and for bots hitting the endpoint.

**Replace the whole block:**

```ts
// src/app/api/extract/route.ts
    const data = await extractMediaInfo(trimmedUrl);

    // REMOVED: background "preheat" of the top format.
    // On a 1-4 core box this doubled CPU and bandwidth for every paste,
    // including pastes where the user never downloaded anything.

    return NextResponse.json({ success: true, data });
```

If you want to keep a preheat later, gate it on: the limiter from §2 being idle, `duration < 300s`, and a progressive (already-muxed) format only — never a `scale:` transcode.

---

## 2. Put a hard concurrency limit on every heavy job

Right now N simultaneous users spawn N `yt-dlp` processes and N `ffmpeg` processes. There is no backpressure, so the box degrades until everything times out — which is exactly the "very slow" symptom.

**New file — `src/lib/limiter.ts`:**

```ts
// Global semaphore for CPU/network-heavy media jobs.
// Tune MAX_CONCURRENT_JOBS to roughly the number of cores you have.

const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT_JOBS || 2);
const MAX_QUEUED = Number(process.env.MAX_QUEUED_JOBS || 8);

export class TooBusyError extends Error {
  constructor() {
    super("The server is handling too many downloads right now. Please retry in a few seconds.");
    this.name = "TooBusyError";
  }
}

let active = 0;
const waiting: Array<() => void> = [];

export function limiterStats() {
  return { active, queued: waiting.length, max: MAX_CONCURRENT };
}

export async function runLimited<T>(task: () => Promise<T>): Promise<T> {
  if (active >= MAX_CONCURRENT && waiting.length >= MAX_QUEUED) {
    throw new TooBusyError();
  }
  if (active >= MAX_CONCURRENT) {
    await new Promise<void>((resolve) => waiting.push(resolve));
  }

  active++;
  try {
    return await task();
  } finally {
    active--;
    waiting.shift()?.();
  }
}
```

**Wrap the two entry points.** In `src/app/api/extract/route.ts`:

```ts
import { runLimited, TooBusyError } from "@/lib/limiter";

// ...
    const data = await runLimited(() => extractMediaInfo(trimmedUrl));
```

and in the `catch`:

```ts
  } catch (err: any) {
    if (err instanceof TooBusyError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error("API /api/extract error:", err);
    // ...existing handling
  }
```

In `src/app/api/download/route.ts`:

```ts
import { runLimited, TooBusyError } from "@/lib/limiter";

// ...
    const { filePath, cleanup, size } = await runLimited(() =>
      prepareMediaFile(targetUrl, { formatId, audioOnly, ext: rawExt, quality: rawQuality })
    );
```

A clean "busy, retry in a moment" at 503 is far better UX than every request crawling.

Set `MAX_CONCURRENT_JOBS=1` on the 1 GB micro shape, `3` on a 4-OCPU Ampere.

---

## 3. Stop offering transcodes you cannot afford

`extractMediaInfo()` fabricates a full ladder (1080p/720p/480p/360p × mp4 **and webm**) even when the source has none of those, marking them `isTranscode: true` (`src/lib/extractor.ts:562-595`). Picking any of them forces a full server-side re-encode.

The WebM path is the worst — `libvpx-vp9 -crf 30` (`extractor.ts:742`) is roughly 10-50× slower than realtime on a free-tier core. A 3-minute clip can occupy the entire machine for 20+ minutes.

**Minimum fix — drop WebM transcodes entirely.** In the tier loop:

```ts
    const effectiveMaxRank = maxQualityRank > 0 ? maxQualityRank : 1080;
    for (const tier of standardTiers) {
      if (tier.rank > effectiveMaxRank) continue;

      // Only synthesise MP4 tiers. VP9/WebM re-encoding is far too expensive
      // for a shared single/quad-core box — it starves every other request.
      const key = `${tier.label}_mp4`;
      if (formatMap.has(key)) continue;

      const estBytes = baseRefSize > 0
        ? Math.round(baseRefSize * tier.ratio)
        : Math.round(((estimateBitrateByHeight(tier.rank) + 128) * 1000 / 8) * (duration || 180));

      formatMap.set(key, {
        id: `scale:${tier.rank}:mp4`,
        ext: "mp4",
        quality: tier.label,
        resolution: tier.res,
        filesize: estBytes,
        filesizeApprox: estBytes,
        hasAudio: true,
        hasVideo: true,
        qualityRank: tier.rank,
        isTranscode: true,
      });
    }
```

Do the same in `extractTikTokWithTikWM()` — remove the four `*:webm` entries from the `videos` array (`extractor.ts:300-312`, `325-336`, `349-360`, `373-384`).

**Then cap what remains.** Add near the top of `prepareMediaFile()`:

```ts
const MAX_TRANSCODE_HEIGHT = Number(process.env.MAX_TRANSCODE_HEIGHT || 720);
const MAX_TRANSCODE_SECONDS = Number(process.env.MAX_TRANSCODE_SECONDS || 600);

// inside prepareMediaFile, before any ffmpeg scale work:
if (options.formatId?.startsWith("scale:")) {
  const h = parseInt(options.formatId.split(":")[1]) || 720;
  const dur = getCachedMedia(targetUrl)?.duration || 0;
  if (h > MAX_TRANSCODE_HEIGHT || dur > MAX_TRANSCODE_SECONDS) {
    throw new Error(
      "This quality requires re-encoding, which is disabled for long or high-resolution videos. Please choose one of the native formats."
    );
  }
}
```

And make every FFmpeg call polite so a transcode cannot starve the web server — add these flags to each `ffmpeg` arg array:

```ts
// put right after "-y" in every ffmpeg invocation
"-threads", "1",
"-filter_threads", "1",
```

plus run FFmpeg at low priority. Simplest version — replace `execFileAsync("ffmpeg", args)` with a helper:

```ts
// src/lib/extractor.ts
const NICE = process.platform === "win32" ? null : "nice";

function runFfmpeg(args: string[]) {
  return NICE
    ? execFileAsync(NICE, ["-n", "15", "ffmpeg", ...args], { env: process.env })
    : execFileAsync("ffmpeg", args, { env: process.env });
}
```

---

## 4. Stop loading whole videos into RAM

`extractor.ts:695` and `extractor.ts:729`:

```ts
fs.writeFileSync(rawTempAudio, Buffer.from(await streamRes.arrayBuffer()));
```

`arrayBuffer()` materialises the entire video in Node's heap, then `Buffer.from` copies it again. A 150 MB TikTok download peaks near 300 MB of heap; on a 1 GB box with FFmpeg running alongside, that is an OOM kill — and under swap pressure everything on the machine stalls.

**Replace both with a streaming write:**

```ts
import { pipeline } from "stream/promises";
import { Readable } from "stream";

async function saveStreamToFile(res: Response, dest: string) {
  if (!res.body) throw new Error("Empty response body from media host.");
  await pipeline(Readable.fromWeb(res.body as any), fs.createWriteStream(dest));
}
```

Call sites become:

```ts
        if (streamRes.ok) {
          await saveStreamToFile(streamRes, rawTempAudio);
          // ...unchanged
        }
```

```ts
      if (streamRes.ok) {
        const rawVideo = path.join(tempDir, `${fileUid}_raw.mp4`);
        await saveStreamToFile(streamRes, rawVideo);
        // ...unchanged
      }
```

Also run Node with a heap ceiling so it fails fast instead of dragging the OS into swap. On the micro shape add to the container env / systemd unit:

```
NODE_OPTIONS=--max-old-space-size=512
```

---

## 5. Send the first byte immediately

`/api/download` awaits `prepareMediaFile()` — i.e. the **entire** download and mux finishes on the server before the browser receives a single byte. For a 1080p video that is a 30-120 s dead hang with a fake progress bar. This is probably what users describe as "very slow".

Two fixes, in order of effort.

**5a. Progressive formats need no server round-trip at all.** When the chosen format already has both audio and video (`acodec !== "none"`), pipe it straight through:

```ts
// src/app/api/download/route.ts — before calling prepareMediaFile
import { getCachedRawFormats } from "@/lib/extractor";

const cachedFormats = getCachedRawFormats(targetUrl) || [];
const progressive = cachedFormats.find(
  (f) =>
    f.format_id === formatId &&
    f.url?.startsWith("http") &&
    !f.url.includes(".m3u8") &&
    f.acodec && f.acodec !== "none" &&
    f.vcodec && f.vcodec !== "none"
);

if (progressive && !audioOnly) {
  const upstream = await fetch(progressive.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ...(req.headers.get("range") ? { Range: req.headers.get("range")! } : {}),
    },
    signal: req.signal,
  });

  if (upstream.ok || upstream.status === 206) {
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedUtf8Filename}`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
    });
    const len = upstream.headers.get("content-length");
    if (len) headers.set("Content-Length", len);
    const range = upstream.headers.get("content-range");
    if (range) headers.set("Content-Range", range);

    return new Response(upstream.body, { status: upstream.status, headers });
  }
}
```

Zero disk, zero FFmpeg, zero wait — and it forwards Range requests so resume works. Move the `contentType` computation above this block.

**5b. For real muxes, stream FFmpeg's stdout** instead of writing to disk first:

```ts
import { spawn } from "child_process";

function streamMux(videoUrl: string, audioUrl: string | undefined, signal: AbortSignal) {
  const args = ["-hide_banner", "-loglevel", "error", "-i", videoUrl];
  if (audioUrl) args.push("-i", audioUrl);
  args.push(
    "-c", "copy",
    "-movflags", "frag_keyframe+empty_moov+default_base_moof", // required for piped MP4
    "-f", "mp4",
    "pipe:1"
  );

  const proc = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "pipe"] });
  signal.addEventListener("abort", () => proc.kill("SIGKILL"));
  proc.stderr.on("data", (d) => console.warn("[ffmpeg]", d.toString().trim()));
  return proc.stdout;
}
```

Trade-off: a fragmented MP4 has no `Content-Length`, so the browser shows an indeterminate progress bar. Acceptable in exchange for an instant start; keep the disk path as the fallback for formats where you already know the size.

---

## 6. Clean up temp files (this one will eventually take the box down)

Every `cleanup` returned by `prepareMediaFile()` is `() => {}` — files in `os.tmpdir()/vidflow_files` are **never** deleted. The Always Free boot volume is 50 GB. A busy day fills it, and a full disk makes the OS, Docker and Next.js all crawl before anything errors cleanly.

**New file — `src/lib/tmpSweeper.ts`:**

```ts
import fs from "fs/promises";
import path from "path";
import os from "os";

const DIRS = [
  path.join(os.tmpdir(), "vidflow_files"),
  path.join(os.tmpdir(), "vidflow_cache"),
];

const MAX_AGE_MS = Number(process.env.TMP_MAX_AGE_MIN || 30) * 60_000;
const MAX_TOTAL_BYTES = Number(process.env.TMP_MAX_GB || 2) * 1024 ** 3;
const SWEEP_EVERY_MS = 5 * 60_000;

async function sweep() {
  for (const dir of DIRS) {
    let names: string[];
    try {
      names = await fs.readdir(dir);
    } catch {
      continue;
    }

    const entries: Array<{ file: string; mtime: number; size: number }> = [];
    const now = Date.now();

    for (const name of names) {
      const file = path.join(dir, name);
      try {
        const st = await fs.stat(file);
        if (!st.isFile()) continue;
        if (now - st.mtimeMs > MAX_AGE_MS) {
          await fs.unlink(file).catch(() => {});
          continue;
        }
        entries.push({ file, mtime: st.mtimeMs, size: st.size });
      } catch {}
    }

    // Size cap: evict oldest until under budget.
    let total = entries.reduce((n, e) => n + e.size, 0);
    entries.sort((a, b) => a.mtime - b.mtime);
    for (const e of entries) {
      if (total <= MAX_TOTAL_BYTES) break;
      await fs.unlink(e.file).catch(() => {});
      total -= e.size;
    }
  }
}

// Guard against duplicate timers across dev HMR / multiple imports.
const g = globalThis as any;
if (!g.__vidflowSweeper) {
  g.__vidflowSweeper = setInterval(() => { sweep().catch(() => {}); }, SWEEP_EVERY_MS);
  g.__vidflowSweeper.unref?.();
  sweep().catch(() => {});
}

export { sweep };
```

Import it once so it starts with the server — add to `src/lib/extractor.ts`:

```ts
import "./tmpSweeper";
```

Belt and braces at the OS level, since the container's `/tmp` is ephemeral but the host's may not be:

```bash
echo 'd /tmp/vidflow_files 0755 root root 1h' | sudo tee /etc/tmpfiles.d/vidflow.conf
```

---

## 7. Get the synchronous file I/O out of the request path

`getCachedMedia()` / `getCachedRawFormats()` call `fs.existsSync` + `fs.readFileSync` + `JSON.parse` on **every** request, and `getCachedRawFormats` re-reads and re-parses the file even when the entry is already in `memoryCache` (`extractor.ts:71-87`). On one core, each of those blocks the event loop for every other visitor.

Minimal fix — make the memory cache authoritative and read the file at most once per key:

```ts
export function getCachedRawFormats(url: string): any[] | null {
  const key = getCacheKey(url);
  const now = Date.now();

  const mem = memoryCache.get(key);
  if (mem && mem.expiresAt > now) return mem.rawFormats || null;
  if (mem) memoryCache.delete(key);

  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  try {
    const parsed: CachedItem = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
    if (parsed.expiresAt > now) {
      memoryCache.set(key, parsed);          // populate so the next hit is free
      return parsed.rawFormats || null;
    }
  } catch {}
  return null;
}
```

(Dropping `existsSync` in favour of catching the `readFileSync` throw halves the syscalls; apply the same shape to `getCachedMedia`.)

Also bound the map so it is not an unbounded leak in a long-running process:

```ts
const MAX_MEMORY_ENTRIES = 200;

export function setCachedMedia(url: string, data: ExtractedMedia, rawFormats?: any[]) {
  const key = getCacheKey(url);
  const item: CachedItem = { data, rawFormats, expiresAt: Date.now() + 30 * 60 * 1000 };

  if (memoryCache.size >= MAX_MEMORY_ENTRIES) {
    memoryCache.delete(memoryCache.keys().next().value as string);
  }
  memoryCache.set(key, item);
  // ...unchanged disk write
}
```

While you are in that file: the hardcoded `LOCAL_FFMPEG_DIR` at `extractor.ts:15` points at someone's Windows WinGet folder. On Linux it is dead weight (two `existsSync` calls per request via `getFfmpegLocationArgs()`). Guard it:

```ts
export const LOCAL_FFMPEG_DIR =
  process.platform === "win32"
    ? "C:\\Users\\anupa\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin"
    : "";
```

---

## 8. Rate-limit the public endpoints

A public downloader gets scraped within days of going live. Bots alone will flatten a free-tier box regardless of everything above. Cheapest effective version, in nginx (§10) rather than in Node:

```nginx
limit_req_zone $binary_remote_addr zone=extract:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=dl:10m rate=20r/m;
limit_conn_zone $binary_remote_addr zone=conn:10m;
```

applied per-location below.

---

## 9. Front end

**9a. The 35 KB translation file is a client component wrapping the entire app.** `LanguageProvider` (`src/context/LanguageContext.tsx`, 35 KB) is imported by `src/app/layout.tsx:51`, so every visitor downloads and parses all languages before anything is interactive, and the whole tree is client-rendered.

Quick win — memoize the context value, which currently allocates a new object on every render and re-renders every consumer:

```tsx
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => { /* ...unchanged localStorage load... */ }, []);

  const value = useMemo(() => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return {
      language,
      setLanguage,
      t: (key: string) => langDict[key] ?? TRANSLATIONS.en[key] ?? key,
      currentLangInfo:
        SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0],
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
```

Bigger win — split `TRANSLATIONS` into `src/i18n/en.ts`, `src/i18n/es.ts`, … and load non-English on demand:

```tsx
const [dict, setDict] = useState<Record<string, string>>(EN);

useEffect(() => {
  if (language === "en") { setDict(EN); return; }
  let cancelled = false;
  import(`@/i18n/${language}`)
    .then((m) => { if (!cancelled) setDict(m.default); })
    .catch(() => {});
  return () => { cancelled = true; };
}, [language]);
```

That takes the initial JS payload from ~35 KB of strings to ~4 KB.

**9b. `DownloadCard` buffers the whole video in browser memory.** `src/components/DownloadCard.tsx:207-244` accumulates every chunk into a `chunks[]` array, then builds a `Blob`. A 500 MB download needs ~1 GB of browser RAM and will crash a phone — and the file only reaches disk after the last byte.

Since the server already sends `Content-Disposition: attachment`, let the browser handle it natively:

```tsx
    // Let the browser stream straight to disk — no in-memory buffering,
    // works for multi-GB files, survives tab navigation, supports resume.
    triggerBrowserDownload(downloadEndpoint, expectedFilename);

    setDownloadState({
      id,
      filename: expectedFilename,
      quality: cleanResolution,
      ext: ext.toUpperCase(),
      status: "complete",
      progress: 100,
      message: "Download started — check your browser's downloads.",
      downloadUrl: downloadEndpoint,
    });
    setTimeout(() => { setDownloadingId(null); setDownloadState(null); }, 3500);
```

You lose the in-page percentage bar. Worth it. (`DownloadCard.tsx` is 38 KB of source in one client component — splitting the format table and the image/gallery branch into `next/dynamic` chunks is a further win once the above is done.)

---

## 10. Put nginx in front

Node serving TLS, compression and static files directly on one core is wasteful, and without `proxy_buffering off` a reverse proxy will buffer entire videos to disk before forwarding.

```nginx
limit_req_zone  $binary_remote_addr zone=extract:10m rate=10r/m;
limit_req_zone  $binary_remote_addr zone=dl:10m      rate=20r/m;
limit_conn_zone $binary_remote_addr zone=conn:10m;

upstream vidsnap { server 127.0.0.1:3000; keepalive 16; }

server {
  listen 443 ssl http2;
  server_name example.com;

  # ssl_certificate ... (certbot)

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;
  gzip_min_length 1024;

  # Immutable build assets — never hit Node twice for these.
  location /_next/static/ {
    proxy_pass http://vidsnap;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location /api/extract {
    limit_req zone=extract burst=5 nodelay;
    proxy_pass http://vidsnap;
    proxy_read_timeout 120s;
    include /etc/nginx/proxy_params;
  }

  location /api/download {
    limit_req  zone=dl burst=10 nodelay;
    limit_conn conn 3;
    proxy_pass http://vidsnap;

    # Critical: stream bytes through instead of buffering the whole video.
    proxy_buffering off;
    proxy_request_buffering off;
    proxy_read_timeout 1800s;
    proxy_send_timeout 1800s;
    include /etc/nginx/proxy_params;
  }

  location / {
    proxy_pass http://vidsnap;
    include /etc/nginx/proxy_params;
  }
}
```

**On Cloudflare:** putting the site behind the free plan for TLS and static caching is a clear win, but serving large video files through the Cloudflare proxy is restricted by their free-plan terms. Keep the app on a proxied (orange-cloud) hostname and point downloads at a DNS-only (grey-cloud) subdomain.

---

## Suggested order of work

| Step | Change | Effort | Expected effect |
|---|---|---|---|
| 1 | Move to Ampere A1 (§0) | 1 hour, no code | 4× CPU, 24× RAM |
| 2 | Delete the preheat (§1) | 2 minutes | Halves all server work |
| 3 | Add the limiter (§2) | 20 minutes | Site stays responsive under load |
| 4 | Drop WebM/VP9 tiers + cap transcodes (§3) | 30 minutes | Removes the worst CPU spikes |
| 5 | Stream instead of buffering (§4) | 20 minutes | No more OOM kills |
| 6 | Temp sweeper (§6) | 20 minutes | Prevents a full disk |
| 7 | Direct passthrough for progressive formats (§5a) | 1 hour | Download starts instantly |
| 8 | nginx + rate limits (§8, §10) | 1 hour | Absorbs bots, offloads TLS/gzip |
| 9 | Front-end payload + blob fix (§9) | 2 hours | Faster first load, no mobile crashes |

Steps 2-6 alone should change the experience from "very slow" to "normal" even on the 1 GB micro shape.

---

## Measuring, so you know which fix worked

```bash
# live CPU/RAM per process — watch what spikes when someone pastes a URL
docker stats

# is it swapping? (si/so columns non-zero = your real problem)
vmstat 2 10

# how full is the boot volume
df -h /

# how much is sitting in the temp dirs right now
du -sh /tmp/vidflow_files /tmp/vidflow_cache

# is it the server or the network? (TTFB vs total)
curl -o /dev/null -s -w 'dns:%{time_namelookup} connect:%{time_connect} ttfb:%{time_starttransfer} total:%{time_total}\n' https://your-domain/
```

A high `ttfb` with low `total-ttfb` means the server is the bottleneck (everything above). A low `ttfb` with a long tail means it is bandwidth — in which case §5a (serving files directly from the source CDN rather than through your VM) is the only fix that matters.

---

One non-technical note: a public, hosted downloader for third-party platforms has terms-of-service and content-liability questions attached to it. Worth getting a proper opinion on that before promoting the site publicly — not something to settle from an engineering review.
