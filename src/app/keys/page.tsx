"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface KeyRecord {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string;
  request_count: number;
  rate_limit_per_min: number;
  status: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<KeyRecord[]>([]);
  const [keyName, setKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    try {
      const res = await fetch("/api/keys");
      const data = await res.json();
      if (data.keys) setKeys(data.keys);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: keyName || "Autonomous Agent" }),
      });
      const data = await res.json();
      if (data.apiKey) {
        setGeneratedKey(data.apiKey);
        setKeyName("");
        fetchKeys();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">API Keys</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          lellarap is 100% free with no subscriptions. Generate keys to authenticate your agent fleet against our production endpoints.
        </p>
      </div>

      {/* Key Creation Form */}
      <div className="border border-[#262626] rounded-lg p-6 bg-neutral-950 space-y-4">
        <h2 className="text-sm font-semibold text-white">Generate Production Key</h2>
        <form onSubmit={handleCreateKey} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Agent name (e.g. Cursor Background Worker)"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="flex-1 bg-black border border-[#333] rounded px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Key (Free)"}
          </button>
        </form>

        {generatedKey && (
          <div className="p-4 rounded border border-emerald-500/30 bg-emerald-500/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400">Key Created Successfully</span>
              <button
                onClick={() => navigator.clipboard.writeText(generatedKey)}
                className="text-xs text-white underline hover:no-underline font-mono"
              >
                Copy
              </button>
            </div>
            <div className="font-mono text-xs text-white bg-black/60 p-2 rounded border border-[#262626] break-all select-all">
              {generatedKey}
            </div>
            <p className="text-[11px] text-neutral-400">
              Save this key now. It provides 120 req/min with zero charges or credit card requirements.
            </p>
          </div>
        )}
      </div>

      {/* Existing Keys Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Active Keys</h2>
        <div className="border border-[#262626] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-[#262626] text-neutral-400 font-mono">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Key Prefix</th>
                <th className="p-3">Rate Limit</th>
                <th className="p-3">Requests Served</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-neutral-300 font-mono">
              {keys.map((k) => (
                <tr key={k.id}>
                  <td className="p-3 font-sans font-medium text-white">{k.name}</td>
                  <td className="p-3 text-sky-400">{k.key_prefix}...</td>
                  <td className="p-3">{k.rate_limit_per_min} req/min</td>
                  <td className="p-3 font-semibold text-emerald-400">{Number(k.request_count || 0).toLocaleString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {k.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
