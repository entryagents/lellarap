import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

export const metadata: Metadata = {
  title: "lellarap — The Web Layer for AI Agents",
  description: "The web layer for AI agents. Outperforming commercial web scrapers and cloud retrieval APIs. 100% Free with zero subscription fees. Proteus Lattice documentation compiler.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("lellarap_session")?.value;
    if (token && sql) {
      const rows = await sql`
        SELECT u.id, u.name, u.email 
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ${token} AND s.expires_at > CURRENT_TIMESTAMP;
      `;
      if (rows.length > 0) user = rows[0];
    }
  } catch (e) {}

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
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">Free API</span>
            </Link>

            <nav className="flex items-center gap-6 text-xs text-[#a1a1aa]">
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/metrics" className="hover:text-white transition-colors">Scraper Benchmark</Link>
              <Link href="/keys" className="hover:text-white transition-colors">API Keys</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{user.email}</span>
                  <Link href="/keys" className="px-3 py-1.5 rounded bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
                  <Link href="/signup" className="px-3 py-1.5 rounded bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
                    Sign Up
                  </Link>
                </div>
              )}
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
              <span>· Outperforming Commercial Scrapers and Web Extraction APIs.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/metrics" className="hover:text-white transition-colors">Telemetry</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/keys" className="hover:text-white transition-colors">Keys</Link>
              <span className="text-emerald-400 font-medium">100% Free · Zero Subscriptions</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
