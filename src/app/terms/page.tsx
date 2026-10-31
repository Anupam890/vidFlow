import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ShieldAlert, CheckCircle2, Scale, Mail, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service and DMCA compliance policy for VidSnap, operated by 360xLabs. Please review our fair-use and copyright guidelines.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 2026";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      <div className="ambient-glow" />
      <Navbar />

      <main className="relative z-10 flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-700">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-4 shadow-xs">
            <Scale className="h-4 w-4" />
            <span>360xLabs Legal Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-500">
            Last Updated: {lastUpdated} • Operated by{" "}
            <span className="text-slate-900 font-semibold">360xLabs</span> (
            <a
              href="mailto:360xlabs@gmail.com"
              className="text-emerald-600 hover:underline"
            >
              360xlabs@gmail.com
            </a>
            )
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl space-y-8 text-sm leading-relaxed">
          {/* Quick Notice Banner */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-start gap-3 shadow-xs">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              By accessing or using <strong>VidSnap</strong>, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the service immediately.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">01.</span>
              Service Description
            </h2>
            <p>
              <strong>VidSnap</strong> is an online utility platform engineered by <strong>360xLabs</strong> that facilitates the personal extraction, format conversion, and offline downloading of publicly accessible multimedia files from third-party networks (including YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest).
            </p>
            <p>
              VidSnap acts solely as a technical intermediary and protocol client. We do not host, store, index, or own any third-party multimedia content on our servers.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">02.</span>
              Acceptable Use & Personal Fair Use
            </h2>
            <p>
              VidSnap is intended exclusively for non-commercial personal backup, educational study, archival, and fair-use review of publicly accessible media. By using the service, you agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                Download, reproduce, or commercially distribute copyrighted content without authorization from the copyright holder.
              </li>
              <li>
                Bypass, disable, or tamper with digital rights management (DRM) or cryptographic security measures.
              </li>
              <li>
                Launch automated scrapers, denial-of-service floods, or overburden our public API infrastructure.
              </li>
              <li>
                Infringe upon any third-party copyrights, trademarks, or proprietary rights.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3" id="dmca">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">03.</span>
              DMCA & Copyright Compliance Policy
            </h2>
            <p>
              <strong>360xLabs</strong> complies with the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512) and international copyright legislation. We respect the intellectual property of creators worldwide.
            </p>
            <p>
              Because VidSnap does not host or store videos, takedown of original content must be directed to the platform hosting the master file (e.g., YouTube, TikTok, Meta). However, if you are a copyright owner and wish to request domain-level blocking or filtration of specific URLs on VidSnap, you may file a notice with our designated agent:
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <p className="font-semibold text-slate-900">DMCA Notice Requirements:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL(s) on VidSnap or target platform to be restricted.</li>
                <li>Your contact details (name, email address, physical address, and phone number).</li>
                <li>A statement of good-faith belief that the disputed use is unauthorized.</li>
                <li>A physical or electronic signature of the authorized copyright representative.</li>
              </ul>
              <div className="pt-2">
                <span className="text-slate-500">Submit DMCA requests directly to: </span>
                <a
                  href="mailto:360xlabs@gmail.com"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  360xlabs@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">04.</span>
              Third-Party Networks & Trademarks
            </h2>
            <p>
              All product names, logos, brands, trademarks, and registered trademarks displayed on VidSnap (such as YouTube, TikTok, Instagram, Twitter/X, Reddit, and Pinterest) are property of their respective owners. Their display does not imply any affiliation, sponsorship, or endorsement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">05.</span>
              Disclaimer of Warranties
            </h2>
            <p>
              VidSnap is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. 360xLabs does not guarantee uninterrupted operation, complete accuracy of third-party metadata, or compatibility with every future streaming format change.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 font-mono text-sm">06.</span>
              Contact Information
            </h2>
            <p>
              For legal inquiries, partnership requests, or questions regarding these Terms, contact:
            </p>
            <div className="mt-3 inline-flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 shadow-xs">
              <Mail className="h-4 w-4 text-emerald-600" />
              <span>Legal Dept:</span>
              <a
                href="mailto:360xlabs@gmail.com"
                className="text-emerald-700 hover:underline font-mono font-bold"
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
