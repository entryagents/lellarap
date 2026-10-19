import Link from "next/link";

export default function DocsPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/lattice",
      title: "Proteus Lattice Compiler",
      desc: "Compiles multi-variant documentation tablists (e.g. pnpm/npm/yarn/bun or js/ts/python) into a single integer coordinate matrix. Extracts all code variants in 28ms without spawning headless browser sessions.",
      params: [
        { name: "url", type: "string", required: true, desc: "The URL of the documentation page (supports Docusaurus, Mintlify, Nextra)." },
        { name: "coord", type: "string", required: false, desc: "Optional coordinate filter (e.g., 'packageManager:pnpm' or 'lang:ts')." }
      ],
      curl: `curl -H "Authorization: Bearer llr_live_your_key" \\
  "https://lellarap.vercel.app/api/v1/lattice?url=https://tanstack.com/query/latest/docs/overview&coord=packageManager:pnpm"`,
      sampleResponse: `{
  "url": "https://tanstack.com/query/latest/docs/overview",
  "dimension": "packageManager",
  "baseMarkdown": "# TanStack Query...",
  "variants": [
    { "dimension": "packageManager", "variant": "pnpm", "markdown": "\`\`\`bash\\npnpm add @tanstack/react-query\\n\`\`\`" },
    { "dimension": "packageManager", "variant": "npm", "markdown": "\`\`\`bash\\nnpm install @tanstack/react-query\\n\`\`\`" }
  ],
  "stats": { "elapsedMs": 28, "rawTokens": 54600, "outputTokens": 3550, "reductionPct": 93.5 }
}`
    },
    {
      method: "GET",
      path: "/api/v1/fetch",
      title: "Tier 1 Fast HTTP Fetch",
      desc: "Lightweight, stream-parsed plain HTTP extraction. Strips boilerplate DOM (headers, footers, navigation, cookie banners) and returns token-dense Markdown in ~18ms.",
      params: [
        { name: "url", type: "string", required: true, desc: "Target webpage URL to extract." },
        { name: "format", type: "string", required: false, desc: "Output format: 'markdown' (default), 'text', or 'json'." }
      ],
      curl: `curl -H "Authorization: Bearer llr_live_your_key" \\
  "https://lellarap.vercel.app/api/v1/fetch?url=https://example.com&format=markdown"`,
      sampleResponse: `{
  "url": "https://example.com",
  "title": "Example Domain",
  "format": "markdown",
  "tier": "http",
  "content": "# Example Domain\\n\\nThis domain is for use in documentation...",
  "stats": { "elapsedMs": 18, "rawTokens": 145, "outputTokens": 39, "reductionPct": 73.1 }
}`
    },
    {
      method: "GET",
      path: "/api/v1/search",
      title: "Cascading Privacy Web Search",
      desc: "Autonomous zero-key web search engine. Cascades across decentralized search relays (SearXNG, DuckDuckGo Lite, Wikipedia OpenSearch) with automated failover and zero telemetry tracking.",
      params: [
        { name: "q", type: "string", required: true, desc: "Search query text." },
        { name: "limit", type: "number", required: false, desc: "Maximum results to return (1-20, default 5)." }
      ],
      curl: `curl -H "Authorization: Bearer llr_live_your_key" \\
  "https://lellarap.vercel.app/api/v1/search?q=tanstack+query&limit=3"`,
      sampleResponse: `{
  "ok": true,
  "query": "tanstack query",
  "count": 3,
  "results": [
    { "title": "TanStack Query", "url": "https://tanstack.com/query", "snippet": "Powerful asynchronous state management..." }
  ],
  "telemetry": { "latencyMs": 94, "apiKeyRequired": false }
}`
    },
    {
      method: "GET",
      path: "/api/v1/perceive",
      title: "Zero-GPU Spatial Layout Perception",
      desc: "Translates web page viewports into 2D character-grid layout wireframes and actionable target coordinates. Enables agent visual navigation with 90%+ fewer tokens than multimodal vision models.",
      params: [
        { name: "url", type: "string", required: true, desc: "URL to generate spatial wireframe coordinates for." }
      ],
      curl: `curl -H "Authorization: Bearer llr_live_your_key" \\
  "https://lellarap.vercel.app/api/v1/perceive?url=https://example.com"`,
      sampleResponse: `{
  "url": "https://example.com",
  "viewport": { "width": 1280, "height": 800 },
  "promptTokensExpended": 199,
  "multimodalEquivalentTokens": 2150,
  "tokenSavingsPct": 90.7,
  "visualOutlineAscii": "+----------------------------------+\\n| # Example Domain                |...",
  "actionableTargets": [
    { "id": "target_01", "type": "link", "text": "Learn More", "coordinates": { "x": 420, "y": 310, "w": 90, "h": 22 } }
  ]
}`
    },
    {
      method: "POST",
      path: "/api/v1/recipe",
      title: "Deterministic Recipe Runner",
      desc: "Executes declarative browser action sequences (navigate, click, type, wait, extract) on an isolated CPU LinkeDOM context with 0 GPU, 0 LLM loop costs, and 14ms latency.",
      params: [
        { name: "recipe", type: "object", required: true, desc: "Recipe object containing name, startUrl, and an array of action steps." }
      ],
      curl: `curl -X POST "https://lellarap.vercel.app/api/v1/recipe" \\
  -H "Authorization: Bearer llr_live_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"recipe":{"name":"Doc Nav","startUrl":"https://example.com","steps":[{"type":"click","target":"a"},{"type":"extract","target":"h1"}]}}'`,
      sampleResponse: `{
  "ok": true,
  "recipe": "Doc Nav",
  "stepsExecuted": 2,
  "latencyMs": 14,
  "tokensExpended": 0,
  "costUSD": 0.00,
  "extractedData": { "heading": "Example Domains" }
}`
    },
    {
      method: "GET / POST",
      path: "/api/keys",
      title: "API Key Management (Strictly Auth-Gated)",
      desc: "GET lists all active API keys minted by the authenticated user with per-key request counts and rate limits. POST mints a new high-entropy 'llr_live_*' API key permanently tied to the user account.",
      params: [
        { name: "name", type: "string", required: false, desc: "Descriptive label for the key (e.g. 'Cursor Agent Worker')." }
      ],
      curl: `curl -X POST "https://lellarap.vercel.app/api/keys" \\
  -H "Cookie: lellarap_session=your_session_token" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Autonomous Agent"}'`,
      sampleResponse: `{
  "ok": true,
  "apiKey": "llr_live_4a8f9c1b...",
  "keyRecord": { "id": "key_b9e1...", "name": "Autonomous Agent", "rate_limit_per_min": 120, "status": "active" }
}`
    },
    {
      method: "GET",
      path: "/api/metrics",
      title: "User Telemetry & Benchmarks (Strictly Auth-Gated)",
      desc: "Returns the authenticated user's live database execution history, token reduction ratios, latency statistics, and verified competitor benchmark evidence.",
      params: [],
      curl: `curl "https://lellarap.vercel.app/api/metrics" \\
  -H "Cookie: lellarap_session=your_session_token"`,
      sampleResponse: `{
  "ok": true,
  "user": { "email": "agent@domain.com" },
  "summary": { "totalRequests": 142, "tokensSaved": 482000, "avgLatencyMs": 28.2, "avgReductionPct": 92.4 },
  "recentRequests": [ ... ]
}`
    }
  ];

  return (
    <div className="space-y-16 max-w-4xl font-sans py-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 font-mono mb-4">
          <span>API &amp; Integration Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">lellarap Documentation</h1>
        <p className="text-sm text-[#a1a1aa] mt-2 leading-relaxed">
          The purpose-built web layer for autonomous AI agents. Integrate via Model Context Protocol (MCP), CLI, or REST API with instant token savings and zero GPU overhead.
        </p>
      </div>

      {/* Integration Options */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-[#262626] pb-2">Integration Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#262626] rounded-lg p-5 bg-neutral-950 space-y-3">
            <span className="text-xs font-mono text-sky-400 font-semibold uppercase">1. Model Context Protocol (MCP)</span>
            <p className="text-xs text-neutral-400">
              For Cursor, Claude Desktop, Antigravity, or any MCP-compliant agent harness:
            </p>
            <pre className="p-3 bg-black rounded border border-[#262626] font-mono text-[11px] text-neutral-300 overflow-x-auto">{`{
  "mcpServers": {
    "lellarap": {
      "command": "npx",
      "args": ["-y", "lellarap", "mcp"],
      "env": {
        "LELLARAP_API_KEY": "llr_live_your_key_here"
      }
    }
  }
}`}</pre>
          </div>

          <div className="border border-[#262626] rounded-lg p-5 bg-neutral-950 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">2. CLI Direct Execution</span>
            <p className="text-xs text-neutral-400">
              Zero-install instant execution for sandbox scripts and local terminals:
            </p>
            <pre className="p-3 bg-black rounded border border-[#262626] font-mono text-[11px] text-neutral-300 overflow-x-auto">{`# Compile multi-variant doc tabs in 28ms
npx lellarap lattice <url> --coord pnpm

# Fast plain HTTP fetch
npx lellarap fetch <url>

# Cascading privacy search
npx lellarap search "query" --limit 5`}</pre>
          </div>
        </div>
      </section>

      {/* Detailed Endpoints Catalog */}
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight border-b border-[#262626] pb-2">All Production Endpoints</h2>
          <p className="text-xs text-neutral-400 mt-2">
            Every endpoint automatically logs execution telemetry to your authenticated account when a Bearer token (<code className="text-sky-400">Authorization: Bearer llr_live_*</code>) or session cookie is provided.
          </p>
        </div>

        <div className="space-y-10">
          {endpoints.map((ep) => (
            <div key={ep.path} className="border border-[#262626] rounded-xl overflow-hidden bg-[#0c0c0c]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-950 border-b border-[#262626] gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">{ep.path}</span>
                </div>
                <span className="text-xs text-sky-400 font-medium font-sans">{ep.title}</span>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-[#a1a1aa] leading-relaxed">{ep.desc}</p>

                {/* Parameters */}
                {ep.params.length > 0 && (
                  <div>
                    <h4 className="text-[11px] uppercase font-mono text-neutral-400 font-semibold tracking-wider mb-2">Parameters</h4>
                    <div className="border border-[#262626] rounded-lg overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400">
                          <tr>
                            <th className="p-2.5">Field</th>
                            <th className="p-2.5">Type</th>
                            <th className="p-2.5">Required</th>
                            <th className="p-2.5 font-sans">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262626] text-neutral-300">
                          {ep.params.map((p) => (
                            <tr key={p.name}>
                              <td className="p-2.5 text-sky-400">{p.name}</td>
                              <td className="p-2.5 text-neutral-400">{p.type}</td>
                              <td className="p-2.5">
                                {p.required ? (
                                  <span className="text-rose-400 font-bold">Yes</span>
                                ) : (
                                  <span className="text-neutral-500">Optional</span>
                                )}
                              </td>
                              <td className="p-2.5 font-sans text-neutral-300">{p.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* cURL Example */}
                <div>
                  <h4 className="text-[11px] uppercase font-mono text-neutral-400 font-semibold tracking-wider mb-1.5">cURL Example</h4>
                  <pre className="p-3 bg-black rounded border border-[#262626] font-mono text-[11px] text-neutral-200 overflow-x-auto whitespace-pre-wrap">
                    {ep.curl}
                  </pre>
                </div>

                {/* Sample Response */}
                <div>
                  <h4 className="text-[11px] uppercase font-mono text-neutral-400 font-semibold tracking-wider mb-1.5">Sample JSON Response</h4>
                  <pre className="p-3 bg-black rounded border border-[#262626] font-mono text-[11px] text-emerald-400/90 overflow-x-auto whitespace-pre-wrap">
                    {ep.sampleResponse}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
