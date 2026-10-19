"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to log in");
      }
      router.push("/keys");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 border border-[#262626] rounded-xl p-8 bg-neutral-950 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">Sign In</h1>
        <p className="text-xs text-[#a1a1aa]">
          Authenticate to manage your production API keys and inspect agent web telemetry.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded border border-red-500/30 bg-red-500/10 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-mono text-neutral-400">Email</label>
          <input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1.5 bg-black border border-[#333] rounded px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-neutral-400">Password</label>
          <input
            type="password"
            required
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1.5 bg-black border border-[#333] rounded px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Sign In"}
        </button>
      </form>

      <div className="text-center text-xs text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-white underline hover:no-underline font-medium">
          Create Account
        </Link>
      </div>
    </div>
  );
}
