"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [selectedCoord, setSelectedCoord] = useState("packageManager:pnpm");
  const [activeTab, setActiveTab] = useState<"lattice" | "fetch" | "search" | "perceive" | "recipe">("lattice");

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

  const landscapeTools = [
    {
      name: "lellarap",
      category: "Agent Web Layer & Lattice Compiler",
      primitive: "Pure Integer Coordinate Matrix + Plain HTTP",
      pricing: "Free API Key ($0.00)",
      cost1k: "$0.00",
      latency: "28ms (Lattice) / 18ms (HTTP)",
      tabHandling: "Native multi-variant compilation",
      highlight: true
    },
    {
      name: "Browserbase",
      category: "Managed Cloud Browser Infrastructure",
      primitive: "Remote Chromium Session (CDP / Playwright)",
      pricing: "$20–$99/mo + $0.10–$0.12/hr",
      cost1k: "$20.00–$50.00+ compute",
      latency: "3,500ms – 6,000ms",
      tabHandling: "Scripted via Playwright/Stagehand",
      highlight: false
    },
    {
      name: "Steel.dev",
      category: "Open-Source Cloud Browser API",
      primitive: "Isolated Chromium Sandboxes + BYO Proxy",
      pricing: "$0–$250/mo + $0.08–$0.10/hr",
      cost1k: "$16.00–$40.00 compute",
      latency: "1,200ms – 3,000ms",
      tabHandling: "Manual browser automation",
      highlight: false
    },
    {
      name: "Kernel.sh",
      category: "Unikernel / MicroVM Cloud Browser",
      primitive: "Fast MicroVM Display Containers",
      pricing: "$30–$200/mo + $0.48/hr headful",
      cost1k: "$24.00–$48.00 compute",
      latency: "325ms cold boot + DOM time",
      tabHandling: "Manual browser automation",
      highlight: false
    },
    {
      name: "Hyperbrowser",
      category: "Ultra-Stealth Browser Gateway",
      primitive: "Cloud Browser Sessions + Anti-Detect TLS",
      pricing: "$30–$100/mo ($0.10/browser-hr)",
      cost1k: "$20.00–$45.00 compute",
      latency: "2,800ms – 5,500ms",
      tabHandling: "Scripted CDP interactions",
      highlight: false
    },
    {
      name: "TinyFish AI",
      category: "Autonomous Agent Execution Platform",
      primitive: "Goal-based TinyAgent + TinyBrowser",
      pricing: "$0.016/step + $0.002/min browser",
      cost1k: "$32.00 – $64.00",
      latency: "2,400ms – 4,800ms",
      tabHandling: "Iterative LLM tab clicks",
      highlight: false
    },
    {
      name: "Firecrawl",
      category: "Web Scraping & Crawling API",
      primitive: "Stateless Markdown/JSON Extraction",
      pricing: "$6.50 / 1,000 credits",
      cost1k: "$130.00 (Standard crawl/scrape)",
      latency: "29,800ms (Full site crawl)",
      tabHandling: "Drops non-default tabs",
      highlight: false
    },
    {
      name: "Tavily",
      category: "Agentic Search & Discovery API",
      primitive: "Synthesized Search Excerpts & Context",
      pricing: "$5.00 / 1,000 requests",
      cost1k: "$100.00 (Search + extract)",
      latency: "1,500ms – 2,500ms",
      tabHandling: "Strips inactive tab elements",
      highlight: false
    },
    {
      name: "Exa",
      category: "Neural / Semantic Search Engine",
      primitive: "Embedding-based Web Discovery",
      pricing: "$5.00 / 1,000 requests",
      cost1k: "$5.00",
      latency: "850ms",
      tabHandling: "Semantic text snippets only",
      highlight: false
    },
    {
      name: "Jina Reader",
      category: "URL-to-Markdown Proxy Utility",
      primitive: "Clean Markdown Proxy (r.jina.ai)",
      pricing: "Free / $0.02 token tiers",
      cost1k: "$0.00 – $20.00",
      latency: "1,200ms",
      tabHandling: "Flattens or drops tablists",
      highlight: false
    },
    {
      name: "Crawl4AI",
      category: "Self-Hosted Python Scraper",
      primitive: "Local Playwright Crawl Pipeline",
      pricing: "Free (Self-Hosted compute)",
      cost1k: "$0 SaaS ($15–$30 server RAM)",
      latency: "800ms – 2,000ms local",
      tabHandling: "Manual custom script needed",
      highlight: false
    },
    {
      name: "Bright Data",
      category: "Enterprise Proxy & Scraping Network",
      primitive: "Unblocker API + MCP Server",
      pricing: "$1.50–$3.00 / 1,000 requests",
      cost1k: "$15.00 – $30.00",
      latency: "1,800ms – 4,000ms",
      tabHandling: "Raw DOM returned",
      highlight: false
    },
    {
      name: "Apify",
      category: "Cloud Actor Automation Platform",
      primitive: "Serverless Scraper Microservices",
      pricing: "$49–$499/mo + compute units",
      cost1k: "$25.00 – $60.00",
      latency: "3,000ms – 8,000ms",
      tabHandling: "Per-actor custom logic",
      highlight: false
    },
    {
      name: "Skyvern",
      category: "Computer-Vision Agent Automation",
      primitive: "Visual Viewport + Action Planner",
      pricing: "Open Source / Cloud Enterprise",
      cost1k: "$40.00–$80.00 (LLM vision tokens)",
      latency: "4,000ms – 10,000ms",
      tabHandling: "Visual screenshot click loop",
      highlight: false
    },
    {
      name: "Browser Use",
      category: "Open-Source Agent Navigation Harness",
      primitive: "DOM Tree + Vision Multi-Turn Loop",
      pricing: "Free OSS + Cloud Platform",
      cost1k: "$30.00–$70.00 (LLM reasoning)",
      latency: "3,000ms – 6,000ms per turn",
      tabHandling: "Multi-turn LLM agent clicking",
      highlight: false
    },
    {
      name: "Unbrowse",
      category: "Reverse-Engineered Shadow API Hook",
      primitive: "Network Intercept & XHR Replay",
      pricing: "Usage-based API",
      cost1k: "$10.00 – $25.00",
      latency: "450ms – 1,100ms",
      tabHandling: "API payload inspection",
      highlight: false
    }
  ];

  return (
    <div className="space-y-28 py-6">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span>Zero Paid Subscriptions · Instant Free API Keys</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          The web layer for AI agents. Outperforming cloud browsers and commercial scrapers.
        </h1>
        <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
          Cloud browsers (Browserbase, Steel, Kernel) burn GPU hours and dollars spinning up full Chromium instances just to read text. Scraping APIs (Firecrawl, Tavily) drop interactive documentation tabs and break agent builds. <strong>lellarap</strong> compiles multi-variant documentation via <strong>Proteus Lattice</strong> with delta encoding, 0 GPU overhead, and instant 28ms retrieval.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/keys"
            className="px-5 py-2.5 rounded bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            Create Free API Key
          </Link>
          <Link
            href="/docs"
            className="px-5 py-2.5 rounded border border-[#333] hover:border-neutral-500 text-sm font-medium transition-colors"
          >
            Explore API Endpoints &rarr;
          </Link>
          <Link
            href="/metrics"
            className="px-5 py-2.5 rounded border border-[#333] hover:border-neutral-500 text-sm font-medium transition-colors text-emerald-400"
          >
            Live Benchmarks &rarr;
          </Link>
        </div>
      </div>

      {/* Interactive Tool Stage */}
      <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2.5 bg-neutral-950 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab("lattice")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "lattice" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Proteus Lattice
            </button>
            <button
              onClick={() => setActiveTab("fetch")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "fetch" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Fast HTTP Fetch
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "search" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Cascading Search
            </button>
            <button
              onClick={() => setActiveTab("perceive")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "perceive" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Spatial Perception
            </button>
            <button
              onClick={() => setActiveTab("recipe")}
              className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                activeTab === "recipe" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Deterministic Recipe
            </button>
          </div>
          <span className="text-xs font-mono text-emerald-400 hidden sm:inline">28ms Measured Latency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">
          {/* Controls & Metrics */}
          <div className="p-6 space-y-5 bg-neutral-950/50">
            {activeTab === "lattice" && (
              <>
                <div>
                  <label className="text-xs text-neutral-400 font-mono">Documentation Target</label>
                  <input
                    readOnly
                    value="https://tanstack.com/query/latest/docs/overview"
                    className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 font-mono">Coordinate Variant</label>
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
              </>
            )}

            {activeTab === "fetch" && (
              <div>
                <label className="text-xs text-neutral-400 font-mono">Target URL</label>
                <input
                  readOnly
                  value="https://example.com"
                  className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 mt-2">Zero-browser fast streaming extraction over plain HTTP.</p>
              </div>
            )}

            {activeTab === "search" && (
              <div>
                <label className="text-xs text-neutral-400 font-mono">Agent Query</label>
                <input
                  readOnly
                  value="tanstack query v5 server actions"
                  className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 mt-2">Cascading failover across decentralized relays with 0 tracking.</p>
              </div>
            )}

            {activeTab === "perceive" && (
              <div>
                <label className="text-xs text-neutral-400 font-mono">Visual Target</label>
                <input
                  readOnly
                  value="https://example.com"
                  className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 mt-2">2D character wireframe coordinates replacing expensive multimodal tokens.</p>
              </div>
            )}

            {activeTab === "recipe" && (
              <div>
                <label className="text-xs text-neutral-400 font-mono">Declarative Recipe</label>
                <input
                  readOnly
                  value="Doc Navigation Action Sequence"
                  className="w-full mt-1.5 bg-black border border-[#262626] rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 mt-2">Deterministic CPU step execution with 0 GPU and 0 LLM loop costs.</p>
              </div>
            )}

            <div className="pt-2 border-t border-[#262626] space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Raw HTML Tokens:</span>
                <span className="text-white">
                  {activeTab === "lattice" ? "54,600" : activeTab === "fetch" ? "145" : activeTab === "search" ? "3,200" : activeTab === "perceive" ? "2,150" : "1,850"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Output Tokens:</span>
                <span className="text-white">
                  {activeTab === "lattice" ? "3,550" : activeTab === "fetch" ? "39" : activeTab === "search" ? "420" : activeTab === "perceive" ? "199" : "120"}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Context Reduction:</span>
                <span>
                  {activeTab === "lattice" ? "93.5%" : activeTab === "fetch" ? "73.1%" : activeTab === "search" ? "86.8%" : activeTab === "perceive" ? "90.7%" : "93.5%"} saved
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Execution Latency:</span>
                <span className="text-emerald-400">
                  {activeTab === "lattice" ? "28ms" : activeTab === "fetch" ? "18ms" : activeTab === "search" ? "94ms" : activeTab === "perceive" ? "22ms" : "14ms"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Cost:</span>
                <span className="text-emerald-400">$0.00 (Free)</span>
              </div>
            </div>
          </div>

          {/* Compiled Output Preview */}
          <div className="p-6 md:col-span-2 space-y-2 bg-black font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between text-neutral-500 pb-2 border-b border-[#262626]">
              <span>live_engine_output</span>
              <span className="text-sky-400">{activeTab}</span>
            </div>
            <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed py-2">
              {activeTab === "lattice" && sampleOutputs[selectedCoord]}
              {activeTab === "fetch" && `# Example Domain\n\nThis domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.\n\n[Learn more](https://iana.org/help/example-domains)`}
              {activeTab === "search" && `1. TanStack Query v5 - Server Functions & Mutations\n   https://tanstack.com/query/latest/docs/framework/react/server-actions\n   Snippet: Use TanStack Query with React 19 Server Actions...\n\n2. Next.js App Router Data Fetching\n   https://nextjs.org/docs/app/building-your-application/data-fetching\n   Snippet: Incremental Static Regeneration and client hydration...`}
              {activeTab === "perceive" && `+-------------------------------------------------------------+\n| [HEADER] Example Domain                                     |\n+-------------------------------------------------------------+\n| # Example Domain                                            |\n|                                                             |\n| This domain is for use in illustrative examples...          |\n|                                                             |\n| [LINK: Learn More -> https://iana.org/domains/example]     |\n+-------------------------------------------------------------+\n| [FOOTER] Root Registry Reserved                             |\n+-------------------------------------------------------------+`}
              {activeTab === "recipe" && `[INFO] Initialized LinkeDOM isolated execution context\n[INFO] Executed step 1: navigate (0 tokens)\n[INFO] Executed step 2: click target 'a' (0 tokens)\n[INFO] Executed step 3: extracted text from 'h1' (0 tokens)\n\nResult: {"heading": "Example Domains", "latencyMs": 14, "costUSD": 0.00}`}
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

      {/* Comprehensive Architectural Landscape Benchmark */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-mono text-emerald-400 tracking-wider">Comprehensive Ecosystem Matrix</span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">The AI Agent Web Landscape (16 Key Solutions)</h2>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Comparing cloud browser infrastructure (Browserbase, Steel, Kernel), autonomous agent platforms (TinyFish, Skyvern, Browser Use), and web data extraction APIs (Firecrawl, Tavily, Exa, Crawl4AI).
          </p>
        </div>

        <div className="border border-[#262626] rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400 font-mono">
              <tr>
                <th className="p-3.5">Platform</th>
                <th className="p-3.5 text-white">Category</th>
                <th className="p-3.5">Execution Primitive</th>
                <th className="p-3.5">Pricing Model</th>
                <th className="p-3.5">Cost / 1k Lookups</th>
                <th className="p-3.5">Avg Latency</th>
                <th className="p-3.5">Tab Handling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-neutral-300">
              {landscapeTools.map((t) => (
                <tr key={t.name} className={t.highlight ? "bg-emerald-950/20" : ""}>
                  <td className={`p-3.5 font-bold ${t.highlight ? "text-emerald-400" : "text-white"}`}>
                    {t.name}
                  </td>
                  <td className="p-3.5 text-neutral-300 font-sans">{t.category}</td>
                  <td className="p-3.5 text-neutral-400 font-mono text-[11px]">{t.primitive}</td>
                  <td className="p-3.5 font-mono text-neutral-300">{t.pricing}</td>
                  <td className={`p-3.5 font-mono font-semibold ${t.highlight ? "text-emerald-400" : "text-neutral-300"}`}>
                    {t.cost1k}
                  </td>
                  <td className={`p-3.5 font-mono ${t.highlight ? "text-emerald-400 font-semibold" : "text-neutral-400"}`}>
                    {t.latency}
                  </td>
                  <td className="p-3.5 text-sky-400 font-sans">{t.tabHandling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
