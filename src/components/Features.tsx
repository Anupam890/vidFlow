"use client";

import {
  Zap,
  Shield,
  Film,
  Music,
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
      color: "from-blue-500/10 to-cyan-500/10 text-cyan-700 border-cyan-200",
    },
    {
      icon: Sparkles,
      title: t("features.f2_title"),
      desc: t("features.f2_desc"),
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200",
    },
    {
      icon: Music,
      title: t("features.f3_title"),
      desc: t("features.f3_desc"),
      color: "from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200",
    },
    {
      icon: Zap,
      title: t("features.f4_title"),
      desc: t("features.f4_desc"),
      color: "from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-200",
    },
    {
      icon: Shield,
      title: t("features.f5_title"),
      desc: t("features.f5_desc"),
      color: "from-teal-500/10 to-emerald-500/10 text-teal-700 border-teal-200",
    },
    {
      icon: Smartphone,
      title: t("features.f6_title"),
      desc: t("features.f6_desc"),
      color: "from-indigo-500/10 to-violet-500/10 text-indigo-700 border-indigo-200",
    },
  ];

  return (
    <section className="relative py-20 border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            {t("features.tag")}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t("features.title")}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300"
              >
                <div
                  className={`inline-flex rounded-xl p-3 border bg-gradient-to-br ${f.color} mb-4 shadow-xs`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
