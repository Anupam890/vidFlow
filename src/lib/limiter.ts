/**
 * Global semaphore for CPU and bandwidth heavy media jobs (yt-dlp, ffmpeg).
 *
 * Without this, every concurrent visitor spawns its own extractor and encoder
 * process, so a handful of users is enough to make the whole box unresponsive.
 * Queued work waits; past the queue limit callers get TooBusyError so the UI can
 * show a clean "retry in a moment" instead of every request crawling.
 *
 * Set MAX_CONCURRENT_JOBS to roughly the number of cores available.
 */

const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT_JOBS || 2);
const MAX_QUEUED = Number(process.env.MAX_QUEUED_JOBS || 8);

export class TooBusyError extends Error {
  constructor() {
    super(
      "The server is handling too many downloads right now. Please retry in a few seconds."
    );
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
