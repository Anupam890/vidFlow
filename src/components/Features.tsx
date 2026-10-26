import {
  Zap,
  Shield,
  Film,
  Music,
  CheckCircle2,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Film,
      title: "Crystal Clear 4K & Full HD",
      desc: "Save videos in their highest available resolutions—from 720p HD up to 4K 60fps—with synchronized audio remuxing.",
      color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      icon: Sparkles,
      title: "100% Watermark-Free",
      desc: "Download TikTok videos and Instagram Reels cleanly without distracting logos or overlays for smooth offline viewing.",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Music,
      title: "Studio-Quality MP3 Extraction",
      desc: "Extract background music, podcasts, and sound clips directly in 320kbps MP3 format with one single click.",
      color: "from-purple-500/20 to-pink-500/20 text-pink-400 border-pink-500/30",
    },
    {
      icon: Zap,
      title: "Lightning Chunked Streaming",
      desc: "No waiting for slow server caching. Streams are piped directly in real-time, delivering peak download speeds.",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
    {
      icon: Shield,
      title: "Private & Secure by Design",
      desc: "No user accounts, no passwords, and zero tracking logs. Your downloads are processed securely and privately.",
      color: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30",
    },
    {
      icon: Smartphone,
      title: "Works Across All Devices",
      desc: "Fully responsive in any web browser—iPhone, iPad, Android, macOS, Windows, and Linux without any software install.",
      color: "from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30",
    },
  ];

  return (
    <section className="relative py-20 border-t border-white/5 bg-[#0b101d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Why Choose vidFlow
          </h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">
            Engineered for Speed, Quality & Simplicity
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Everything you need in a modern video downloader, without popups or shady downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-slate-900/90 hover:-translate-y-1"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-tr ${feat.color} mb-5`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
