"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";
import DownloadCard from "@/components/DownloadCard";
import SupportedPlatforms from "@/components/SupportedPlatforms";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { ExtractedMedia } from "@/lib/types";

export default function Home() {
  const [extractedMedia, setExtractedMedia] = useState<ExtractedMedia | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      {/* Background ambient lighting */}
      <div className="ambient-glow" />

      {/* Main Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero Section with Search Input */}
        <HeroInput
          onExtractSuccess={(media) => {
            setExtractedMedia(media);
            // Smoothly scroll down to download results card
            setTimeout(() => {
              window.scrollTo({ top: 380, behavior: "smooth" });
            }, 100);
          }}
        />

        {/* Results Card if video extracted */}
        {extractedMedia && <DownloadCard media={extractedMedia} />}

        {/* Supported Platforms */}
        <SupportedPlatforms />

        {/* Core Features */}
        <Features />

        {/* How it Works Walkthrough */}
        <HowItWorks />

        {/* FAQs */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
