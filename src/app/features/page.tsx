import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      num: "01",
      name: "Proteus Lattice",
      tagline: "Multi-variant documentation compiler with delta encoding",
      description: "Discovers interactive tablists across Docusaurus, Mintlify, and Nextra. Compiles mutually exclusive variants (pnpm vs npm, TypeScript vs JavaScript, v1 vs v2) into a delta-encoded coordinate matrix. Eliminates agent lockfile corruption and saves 42.5% to 75% prompt tokens.",
      endpoint: "GET /v1/lattice?url=...&coord=packageManager:pnpm",
      badge: "Novel",
    },
    {
      num: "02",
      name: "Zero-GPU Perception Wireframe",
      tagline: "Spatial ASCII layout & actionable target map for LLMs",
      description: "Generates semantic block hierarchies, button indexes, and ASCII wireframes without rendering pixels or launching GPU engines. Provides DeepSeek-V4.1-Flash and frontier models full spatial awareness for just 199 tokens (vs >2,000 for multimodal screenshots).",
      endpoint: "GET /v1/perceive?url=...",
      badge: "Flagship",
    },
    {
      num: "03",
      name: "Zero-Key Cascading Search",
      tagline: "Decentralized multi-provider agent web search",
      description: "Autonomous search engine that queries DuckDuckGo HTML, DuckDuckGo Lite, SearXNG, and Wikipedia OpenSearch without requiring paid commercial API subscriptions or credit cards. Guaranteed high reliability with automatic failover.",
      endpoint: "GET /v1/search?q=...",
      badge: "Free Infrastructure",
    },
    {
      num: "04",
      name: "Deterministic Action Recipes",
      tagline: "Zero-token DOM automation runner",
      description: "Declarative execution runner for multi-step browser tasks: navigate, click, type, wait, and extract. Executes multi-step workflows in <15ms inside LinkeDOM with zero LLM inference tokens wasted on intermediate browser steps.",
      endpoint: "POST /v1/recipe",
      badge: "Cost Killer",
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 font-mono mb-3">
          <span>Production Releases</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">4 New Flagship Features</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          Designed specifically for autonomous cloud coding agents. Non-generic, ultra-efficient, and 100% free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.num} className="border border-[#262626] rounded-lg p-6 bg-neutral-950 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-500">{f.num}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  {f.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">{f.name}</h2>
              <p className="text-xs text-sky-400 font-medium">{f.tagline}</p>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">{f.description}</p>
            </div>

            <div className="pt-4 border-t border-[#262626] font-mono text-[11px] text-neutral-400">
              <span className="text-neutral-500">API: </span>
              <span className="text-white">{f.endpoint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
