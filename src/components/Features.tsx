"use client";

import {
  Zap,
  Shield,
  Film,
  Music,
  CheckCircle2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Film,
      title: t("features.f1_title"),
      desc: t("features.f1_desc"),
      color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      icon: Sparkles,
      title: t("features.f2_title"),
      desc: t("features.f2_desc"),
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Music,
      title: t("features.f3_title"),
      desc: t("features.f3_desc"),
      color: "from-purple-500/20 to-pink-500/20 text-pink-400 border-pink-500/30",
    },
    {
      icon: Zap,
      title: t("features.f4_title"),
      desc: t("features.f4_desc"),
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
    {
      icon: Shield,
      title: t("features.f5_title"),
      desc: t("features.f5_desc"),
      color: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30",
    },
    {
      icon: Smartphone,
      title: t("features.f6_title"),
      desc: t("features.f6_desc"),
      color: "from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30",
    },
  ];

  return (
    <section className="relative py-20 border-t border-white/5 bg-[#0b101d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {t("features.tag")}
          </h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">
            {t("features.title")}
          </p>
          <p className="mt-3 text-sm text-slate-400">
            {t("features.subtitle")}
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
