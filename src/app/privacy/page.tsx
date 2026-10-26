import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, EyeOff, Server, HelpCircle, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | VidSnap by 360xLabs",
  description:
    "Privacy Policy for VidSnap operated by 360xLabs. Learn how we respect your privacy with zero personal logging and anonymous downloads.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#090d16]">
      <div className="ambient-glow" />
      <Navbar />

      <main className="relative z-10 flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-300">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>360xLabs Privacy Assurance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
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
          {/* Quick Highlight Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-6 border-b border-white/5">
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 flex items-center gap-3">
              <EyeOff className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">100% Anonymous</span>
                <span className="text-[11px] text-slate-400">No account required</span>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 flex items-center gap-3">
              <Lock className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">No Video Logging</span>
                <span className="text-[11px] text-slate-400">Files stream directly</span>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 flex items-center gap-3">
              <Server className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Zero Cloud Storage</span>
                <span className="text-[11px] text-slate-400">We do not store your media</span>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">01.</span>
              Introduction & Scope
            </h2>
            <p>
              Welcome to <strong>VidSnap</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;), operated and maintained by <strong>360xLabs</strong>. We respect your personal privacy and are committed to maintaining a secure, frictionless environment.
            </p>
            <p>
              This Privacy Policy details the types of information we may collect or process when you access VidSnap, how that information is handled, and the principles that govern our operations. By using our website, you agree to the practices outlined herein.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">02.</span>
              Information We Do NOT Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>
                <strong>No User Accounts or Passwords:</strong> VidSnap requires no sign-up, user registration, email, or credentials to download videos or view public content.
              </li>
              <li>
                <strong>No Download Archival:</strong> We do not keep copies of videos, audio files, or images processed through our platform. All data is transferred directly in transit and transient memory is immediately recycled.
              </li>
              <li>
                <strong>No Financial or Payment Data:</strong> VidSnap is a free service; we do not collect or request credit card or billing details.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">03.</span>
              Information We Process Temporarily
            </h2>
            <p>
              To execute your download requests, VidSnap receives the target URL submitted into our search input bar (e.g., a YouTube, TikTok, or Instagram post link). This link is used exclusively to fetch public metadata (title, formats, thumbnail, duration) via public network APIs or stream extractors.
            </p>
            <p>
              Standard server diagnostic records (such as generalized IP address, user-agent browser string, and timestamp) may be logged transiently for network health, DDoS mitigation, and rate limiting, and are routinely purged.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">04.</span>
              Cookies & Local Storage
            </h2>
            <p>
              VidSnap uses client-side LocalStorage exclusively for user convenience features, such as remembering your preferred interface language (e.g., English, Spanish, French) and theme settings. We do not use third-party invasive tracking cookies to monitor your browsing behavior across external websites.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">05.</span>
              Third-Party Content & Platforms
            </h2>
            <p>
              VidSnap operates as an independent conversion and downloading utility. When you download a media file, your browser establishes a direct or piped connection to the content delivery network (CDN) of the respective platform (such as YouTube, Instagram, or TikTok). Third-party platforms operate under their own independent terms and privacy statements.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">06.</span>
              Data Protection Rights (GDPR & CCPA)
            </h2>
            <p>
              Because we do not store personal profiles, identifying records, or user accounts, there is generally no personally identifiable information linked to your identity on our servers. However, regardless of your geographic location, you retain full rights regarding internet privacy, and you may contact us with any inquiries.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">07.</span>
              Contact & Inquiries
            </h2>
            <p>
              If you have any questions, security notices, or privacy inquiries regarding VidSnap, please contact the <strong>360xLabs</strong> team directly:
            </p>
            <div className="mt-3 inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>Official Email:</span>
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
