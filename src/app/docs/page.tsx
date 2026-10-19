import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-12 max-w-4xl font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">lellarap Documentation</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          Complete guide for integrating lellarap across AI agent frameworks, Cursor, Claude Desktop, Antigravity, and cloud microVMs.
        </p>
      </div>

      {/* Quickstart */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Quickstart (CLI &amp; SDK)</h2>
        <p className="text-xs text-neutral-400">
          Run directly without permanent installation via npx or import the TypeScript SDK:
        </p>
        <div className="border border-[#262626] rounded bg-neutral-950 p-4 font-mono text-xs text-neutral-200 space-y-2">
          <div className="text-neutral-500"># Fetch documentation with Proteus Lattice compilation</div>
          <div>npx lellarap lattice https://tanstack.com/query/latest/docs/overview</div>
          <div className="pt-2 text-neutral-500"># Standard fast streaming HTTP fetch</div>
          <div>npx lellarap fetch https://example.com</div>
        </div>
      </section>

      {/* MCP Configuration */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Model Context Protocol (MCP)</h2>
        <p className="text-xs text-neutral-400">
          Expose lellarap tools directly into Cursor, Claude Desktop, or Antigravity:
        </p>
        <div className="border border-[#262626] rounded bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
          <pre>{`{
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
      </section>

      {/* REST API Endpoints */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Production Cloud Endpoints</h2>
        <div className="border border-[#262626] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400 font-mono">
              <tr>
                <th className="p-3">Method &amp; Path</th>
                <th className="p-3">Parameters</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-neutral-300 font-mono">
              <tr>
                <td className="p-3 text-sky-400">GET /api/v1/lattice</td>
                <td className="p-3 text-neutral-400">url, coord</td>
                <td className="p-3 font-sans">Compiles interactive documentation tabs into coordinate variants.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">GET /api/v1/fetch</td>
                <td className="p-3 text-neutral-400">url, format, tier</td>
                <td className="p-3 font-sans">Retrieves web pages as clean token-dense Markdown.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">POST /api/keys</td>
                <td className="p-3 text-neutral-400">name</td>
                <td className="p-3 font-sans">Generates a free production API key.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">GET /api/metrics</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">Returns global telemetry and cloud scraper economic comparisons.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
