import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ShieldAlert, CheckCircle2, Scale, Mail, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VidSnap by 360xLabs",
  description:
    "Terms of Service and DMCA compliance policy for VidSnap, operated by 360xLabs. Please review our fair-use and copyright guidelines.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 2026";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#090d16]">
      <div className="ambient-glow" />
      <Navbar />

      <main className="relative z-10 flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-300">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <Scale className="h-4 w-4" />
            <span>360xLabs Legal Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-400">
            Last Updated: {lastUpdated} • Operated by{" "}
            <span className="text-white font-medium">360xLabs</span> (
            <a
              href="mailto:360xlabs@gmail.com"
              className="text-emerald-400 hover:underline"
            >
              360xlabs@gmail.com
            </a>
            )
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8 text-sm leading-relaxed">
          {/* Quick Notice Banner */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              By accessing or using <strong>VidSnap</strong>, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the service immediately.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">01.</span>
              Service Description
            </h2>
            <p>
              <strong>VidSnap</strong> is an online utility platform engineered by <strong>360xLabs</strong> that facilitates the personal extraction, format conversion, and offline downloading of publicly accessible multimedia files from third-party networks (including YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">02.</span>
              Permitted Use & Fair Use Policy
            </h2>
            <p>
              VidSnap is provided strictly for personal, non-commercial, educational, and backup archiving purposes under established fair use doctrine. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>
                Download only content that is publicly accessible or that you hold legitimate permissions or licenses to save.
              </li>
              <li>
                Refrain from using downloaded material for commercial redistribution, resale, unauthorized broadcast, or copyright infringement.
              </li>
              <li>
                Respect the intellectual property, privacy, and moral rights of content authors and original creators.
              </li>
              <li>
                Not deploy automated scrapers, denial-of-service scripts, or abusive rate-flooding against our infrastructure.
              </li>
            </ul>
          </section>

          {/* Section 3 (DMCA) */}
          <section className="space-y-3" id="dmca">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">03.</span>
              DMCA & Copyright Compliance Policy
            </h2>
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-4 space-y-2 text-xs">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-emerald-400" />
                No Media Hosting Statement
              </p>
              <p>
                VidSnap does not host, store, cache permanently, or distribute any copyrighted media files on its servers. All media streams are fetched directly from the respective public CDN nodes of the originating platforms. All trademarks, channel names, and audio-visual copyrights remain the exclusive property of their respective owners.
              </p>
            </div>
            <p>
              <strong>360xLabs</strong> respects the rights of copyright holders and complies with the Digital Millennium Copyright Act (DMCA). If you are a copyright owner or authorized representative and believe content is being processed in an infringing manner, you may contact our designated agent with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>The exact URL of the material on the host platform.</li>
              <li>Your contact information (name, address, email address).</li>
              <li>A statement of good faith belief that the disputed use is unauthorized.</li>
            </ul>
            <p className="text-xs text-slate-400">
              Send DMCA inquiries to:{" "}
              <a
                href="mailto:360xlabs@gmail.com?subject=DMCA%20Inquiry"
                className="text-emerald-400 underline font-mono"
              >
                360xlabs@gmail.com
              </a>
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">04.</span>
              Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 360XLABS DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, BUG-FREE, OR COMPATIBLE WITH ALL THIRD-PARTY SOCIAL PLATFORMS INDEFINITELY.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">05.</span>
              Limitation of Liability
            </h2>
            <p>
              IN NO EVENT SHALL 360XLABS, ITS AFFILIATES, OR DEVELOPERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SERVICE, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, DOWNLOAD INCOMPATIBILITIES, OR DISPUTES WITH THIRD-PARTY CONTENT PLATFORMS.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">06.</span>
              Changes to Terms
            </h2>
            <p>
              360xLabs reserves the right to modify or replace these Terms of Service at any time. Changes will become effective immediately upon posting to this URL. Your continued use of VidSnap following any updates constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">07.</span>
              Contact Us
            </h2>
            <p>
              For legal questions, feedback, or technical support, please reach out directly:
            </p>
            <div className="mt-3 inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>Contact:</span>
              <a
                href="mailto:360xlabs@gmail.com"
                className="text-white hover:underline font-mono"
              >
                360xlabs@gmail.com
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
