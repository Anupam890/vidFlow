"use client";

import { Copy, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      num: "01",
      icon: Copy,
      title: t("how.s1_title"),
      desc: t("how.s1_desc"),
    },
    {
      num: "02",
      icon: SlidersHorizontal,
      title: t("how.s2_title"),
      desc: t("how.s2_desc"),
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: t("how.s3_title"),
      desc: t("how.s3_desc"),
    },
  ];

  return (
    <section className="relative py-20 border-t border-white/5 bg-[#0b101d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {t("how.tag")}
          </h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">
            {t("how.title")}
          </p>
          <p className="mt-3 text-sm text-slate-400">
            {t("how.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative rounded-2xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
