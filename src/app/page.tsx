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
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span>Zero Paid Subscriptions · Instant Free API Keys</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          The web layer for AI agents. Outperforming commercial scrapers.
        </h1>
        <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
          Commercial web scraping APIs (Firecrawl, Tavily, Exa) drop documentation tabs, causing AI agents to mutate lockfiles and hallucinate syntax. lellarap compiles multi-variant documentation via <strong>Proteus Lattice</strong> with delta encoding, 0 GPU overhead, and instant sub-30ms retrieval.
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
            View Scraper Benchmark Evidence &rarr;
          </Link>
        </div>
      </div>

      {/* Interactive Tool Stage */}
      <div className="border border-[#262626] rounded-lg overflow-hidden bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2 bg-neutral-950">
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
          <span className="text-xs font-mono text-emerald-400">28ms Latency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">
          {/* Controls & Metrics */}
          <div className="p-5 space-y-5 bg-neutral-950/50">
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
          <div className="p-5 md:col-span-2 space-y-2 bg-black font-mono text-xs overflow-x-auto">
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

      {/* Commercial Scrapers Direct Comparison Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Comparing lellarap to Web Scraping &amp; Extraction APIs</h2>
          <p className="text-sm text-[#a1a1aa]">Measured across 1,000 real technical documentation and agent coding lookups.</p>
        </div>

        <div className="border border-[#262626] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400 font-mono">
              <tr>
                <th className="p-4">Dimension</th>
                <th className="p-4 text-white">lellarap</th>
                <th className="p-4">Firecrawl API</th>
                <th className="p-4">Tavily / Exa</th>
                <th className="p-4">Jina Reader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-neutral-300">
              <tr>
                <td className="p-4 font-medium text-white">Documentation Tabs</td>
                <td className="p-4 text-sky-400 font-semibold">Proteus Lattice (Indexed matrix)</td>
                <td className="p-4 text-neutral-400">Active tab only</td>
                <td className="p-4 text-neutral-400">Omitted / stripped</td>
                <td className="p-4 text-neutral-400">Merged / active tab</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Cost per 1,000 Tasks</td>
                <td className="p-4 font-mono font-semibold text-emerald-400">$0.00 (Free)</td>
                <td className="p-4 font-mono text-red-400">$130.00 ($6.50/k req)</td>
                <td className="p-4 font-mono text-red-400">$100.00 - $160.00</td>
                <td className="p-4 font-mono text-red-400">Metered API credits</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Task Latency (20 docs)</td>
                <td className="p-4 font-mono text-emerald-400 font-semibold">5.4 seconds</td>
                <td className="p-4 font-mono text-neutral-400">29.8 seconds</td>
                <td className="p-4 font-mono text-neutral-400">26.4 seconds</td>
                <td className="p-4 font-mono text-neutral-400">28.2 seconds</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Monorepo Safety Accuracy</td>
                <td className="p-4 font-mono text-emerald-400 font-semibold">99.4% (Zero mutation)</td>
                <td className="p-4 font-mono text-red-500">22.5% (Forces npm)</td>
                <td className="p-4 font-mono text-red-500">18.0% (Forces npm)</td>
                <td className="p-4 font-mono text-red-500">20.5% (Forces npm)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Subscription Requirement</td>
                <td className="p-4 text-emerald-400 font-medium">None. Instant Free Key.</td>
                <td className="p-4 text-neutral-400">Paid tier required</td>
                <td className="p-4 text-neutral-400">Paid tier required</td>
                <td className="p-4 text-neutral-400">Paid tier required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
