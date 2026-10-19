import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "lellarap — The Web for AI Agents. Outperforming Cloud Scrapers.",
  description: "Open-source, ultra-lightweight web layer for AI agents. 100% Free with zero cloud subscription fees. Proteus Lattice multi-variant documentation compiler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-black text-[#ededed] selection:bg-neutral-800">
        <header className="sticky top-0 z-50 border-b border-[#262626] bg-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-white">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 5H10V23H26V27H6V5ZM12 11H16V19H22V23H12V11Z" />
              </svg>
              <span>lellarap</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60 font-medium">Free Cloud</span>
            </Link>

            <nav className="flex items-center gap-6 text-xs text-[#a1a1aa]">
              <Link href="/features" className="hover:text-white transition-colors">4 New Features</Link>
              <Link href="/metrics" className="hover:text-white transition-colors">Cloud Metrics</Link>
              <Link href="/keys" className="hover:text-white transition-colors">API Keys</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="/keys" className="px-3 py-1.5 rounded bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
                Get Free API Key
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
          {children}
        </main>

        <footer className="border-t border-[#262626] bg-black text-xs text-[#71717a] py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">lellarap</span>
              <span>· Outperforming Cloud Browser Fleets and SaaS Scrapers.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/metrics" className="hover:text-white transition-colors">Telemetry</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/keys" className="hover:text-white transition-colors">Keys</Link>
              <a href="https://github.com/entryagents/lellarap" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <span className="text-emerald-400">100% Free · No Subscription</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
