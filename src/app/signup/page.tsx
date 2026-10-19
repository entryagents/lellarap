"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sign up");
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
        <h1 className="text-2xl font-bold tracking-tight text-white">Create your account</h1>
        <p className="text-xs text-[#a1a1aa]">
          Get immediate access to free API keys, multi-variant documentation compilers, and telemetry.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded border border-red-500/30 bg-red-500/10 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-mono text-neutral-400">Full Name</label>
          <input
            type="text"
            required
            placeholder="Agent Operator"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1.5 bg-black border border-[#333] rounded px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-neutral-400">Work Email</label>
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
            minLength={8}
            placeholder="Minimum 8 characters (scrypt encrypted)"
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
          {loading ? "Creating account..." : "Sign Up (100% Free)"}
        </button>
      </form>

      <div className="text-center text-xs text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="text-white underline hover:no-underline font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
}
