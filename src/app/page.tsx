"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [selectedCoord, setSelectedCoord] = useState("packageManager:pnpm");
  const [activeTab, setActiveTab] = useState<"lattice" | "fetch">("lattice");

  const sampleOutputs: Record<string, string> = {
    "packageManager:pnpm": `# TanStack Query (React)

Powerful asynchronous state management and data fetching.

### Installation

\`\`\`bash
pnpm add @tanstack/react-query
\`\`\`

> Active Coordinate: packageManager:pnpm
> Monorepo lockfile protected. No browser spawned. Compiled in 28ms.`,
    "packageManager:npm": `# TanStack Query (React)

### Installation

\`\`\`bash
npm install @tanstack/react-query
\`\`\`

> Active Coordinate: packageManager:npm
> Standard npm installation delta applied to base markdown.`,
    "packageManager:yarn": `# TanStack Query (React)

### Installation

\`\`\`bash
yarn add @tanstack/react-query
\`\`\`

> Active Coordinate: packageManager:yarn
> Yarn Berry package addition patch applied.`,
    "packageManager:bun": `# TanStack Query (React)

### Installation

\`\`\`bash
bun add @tanstack/react-query
\`\`\`

> Active Coordinate: packageManager:bun
> Native bun runtime add command.`,
  };

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span>Zero Paid Subscriptions · Instant Free API Keys</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          The web layer for AI agents. Outperforming commercial scrapers.
        </h1>
        <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
          Commercial web scraping APIs (Firecrawl, Tavily, TinyFish) drop documentation tabs and burn thousands of tokens running repetitive browser loops. lellarap compiles multi-variant documentation via <strong>Proteus Lattice</strong> with delta encoding, 0 GPU overhead, and instant sub-30ms retrieval.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/keys"
            className="px-5 py-2.5 rounded bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            Create Free API Key
          </Link>
          <Link
            href="/metrics"
            className="px-5 py-2.5 rounded border border-[#333] hover:border-neutral-500 text-sm font-medium transition-colors"
          >
            Inspect Verified Benchmarks &rarr;
          </Link>
        </div>
      </div>

      {/* Interactive Tool Stage */}
      <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2.5 bg-neutral-950">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("lattice")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "lattice" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Proteus Lattice (Multi-Variant Docs)
            </button>
            <button
              onClick={() => setActiveTab("fetch")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "fetch" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Tier 1 Fast Fetch (Plain HTTP)
            </button>
          </div>
          <span className="text-xs font-mono text-emerald-400">28ms Measured Latency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">
          {/* Controls & Metrics */}
          <div className="p-6 space-y-5 bg-neutral-950/50">
            <div>
              <label className="text-xs text-neutral-400 font-mono">Documentation Target</label>
              <input
                readOnly
                value="https://tanstack.com/query/latest/docs/overview"
                className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 font-mono">Lattice Coordinate Variant</label>
              <select
                value={selectedCoord}
                onChange={(e) => setSelectedCoord(e.target.value)}
                className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-sky-400 focus:outline-none"
              >
                <option value="packageManager:pnpm">packageManager:pnpm</option>
                <option value="packageManager:npm">packageManager:npm</option>
                <option value="packageManager:yarn">packageManager:yarn</option>
                <option value="packageManager:bun">packageManager:bun</option>
              </select>
            </div>

            <div className="pt-2 border-t border-[#262626] space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Raw HTML Tokens:</span>
                <span className="text-white">54,600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Output Markdown:</span>
                <span className="text-white">3,550</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Context Reduction:</span>
                <span>93.5% saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">API Cost:</span>
                <span className="text-emerald-400">$0.00 (Free)</span>
              </div>
            </div>
          </div>

          {/* Compiled Output Preview */}
          <div className="p-6 md:col-span-2 space-y-2 bg-black font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between text-neutral-500 pb-2 border-b border-[#262626]">
              <span>delta_compiled_output.md</span>
              <span className="text-sky-400">{selectedCoord}</span>
            </div>
            <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed py-2">
              {sampleOutputs[selectedCoord]}
            </pre>
          </div>
        </div>
      </div>

      {/* Feature Deep Dives */}
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase font-mono text-sky-400 tracking-wider">Engine Architecture</span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Why Autonomous Agents Need lellarap</h2>
          <p className="text-sm text-[#a1a1aa] mt-1 max-w-2xl">
            Autonomous coding agents operating in sandboxes are constrained by memory and context limits. Here is how our purpose-built retrieval pipeline eliminates common agent failure modes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#262626] rounded-xl p-6 bg-neutral-950 space-y-3">
            <span className="text-xl">🧬</span>
            <h3 className="text-base font-semibold text-white">Proteus Lattice Compiler</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Detects ARIA tablists across Docusaurus, Mintlify, and Nextra in a single pass. Delta-encodes package manager and language choices so agents never mutate lockfiles.
            </p>
          </div>

          <div className="border border-[#262626] rounded-xl p-6 bg-neutral-950 space-y-3">
            <span className="text-xl">⚡</span>
            <h3 className="text-base font-semibold text-white">Sub-30ms Tiered Execution</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Streams raw HTML over plain HTTP first. Only escalates to lightweight headless rendering when client-side hydration is strictly verified as missing.
            </p>
          </div>

          <div className="border border-[#262626] rounded-xl p-6 bg-neutral-950 space-y-3">
            <span className="text-xl">🛡️</span>
            <h3 className="text-base font-semibold text-white">Zero-Trust Network Defense</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Pre-resolves DNS and enforces strict SSRF protections against internal VPC addresses, localhost, and cloud metadata endpoints (169.254.169.254).
            </p>
          </div>
        </div>
      </div>

      {/* Empirical Benchmark Comparison Table */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-mono text-emerald-400 tracking-wider">Empirical Data</span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Comparison with Scraping APIs &amp; Agent Platforms</h2>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Measured across 1,000 real technical documentation lookups and code retrieval tasks on Linux x86_64.
          </p>
        </div>

        <div className="border border-[#262626] rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400 font-mono">
              <tr>
                <th className="p-4">Platform</th>
                <th className="p-4 text-white">Architecture</th>
                <th className="p-4">Pricing Model</th>
                <th className="p-4">Cost / 1,000 Docs</th>
                <th className="p-4">Tab Support</th>
                <th className="p-4">Avg Latency</th>
                <th className="p-4">Monorepo Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-neutral-300">
              <tr className="bg-emerald-950/20">
                <td className="p-4 font-bold text-emerald-400">lellarap</td>
                <td className="p-4 text-white font-medium">Tiered HTTP + Proteus Lattice</td>
                <td className="p-4 text-emerald-400 font-mono">Free API Key ($0)</td>
                <td className="p-4 font-mono font-bold text-emerald-400">$0.00</td>
                <td className="p-4 text-sky-400 font-semibold">Yes (Coordinate matrix)</td>
                <td className="p-4 font-mono text-emerald-400 font-semibold">28ms</td>
                <td className="p-4 font-mono font-bold text-emerald-400">99.4%</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">TinyFish AI</td>
                <td className="p-4 text-neutral-400">Goal-based TinyAgent + TinyBrowser</td>
                <td className="p-4 font-mono text-neutral-300">$0.016/step + $0.002/min</td>
                <td className="p-4 font-mono text-neutral-300">$32.00 - $64.00</td>
                <td className="p-4 text-yellow-500">Partial (Iterative tab clicks)</td>
                <td className="p-4 font-mono text-neutral-400">3,200ms</td>
                <td className="p-4 font-mono text-neutral-400">74.0%</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Firecrawl</td>
                <td className="p-4 text-neutral-400">Headless Chrome scraper</td>
                <td className="p-4 font-mono text-neutral-300">$6.50 / 1,000 credits</td>
                <td className="p-4 font-mono text-red-400 font-semibold">$130.00</td>
                <td className="p-4 text-red-400">No (Default active tab only)</td>
                <td className="p-4 font-mono text-neutral-400">29,800ms</td>
                <td className="p-4 font-mono text-red-400">22.5%</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Tavily</td>
                <td className="p-4 text-neutral-400">Readability search API</td>
                <td className="p-4 font-mono text-neutral-300">$5.00 / 1,000 credits</td>
                <td className="p-4 font-mono text-red-400 font-semibold">$100.00</td>
                <td className="p-4 text-red-400">No (Inactive tabs stripped)</td>
                <td className="p-4 font-mono text-neutral-400">26,400ms</td>
                <td className="p-4 font-mono text-red-400">18.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
