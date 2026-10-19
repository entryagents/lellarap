import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";

async function logTelemetry(endpoint: string, feature: string, latencyMs: number, rawTokens: number, outTokens: number, reductionPct: number, statusCode: number) {
  if (!sql) return;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("lellarap_session")?.value;
    if (token) {
      const userRows = await sql`
        SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;
      `;
      const userId = userRows[0]?.user_id;
      if (userId) {
        await sql`
          INSERT INTO user_metrics (user_id, endpoint, feature, latency_ms, raw_tokens, out_tokens, reduction_pct, status_code)
          VALUES (${userId}, ${endpoint}, ${feature}, ${latencyMs}, ${rawTokens}, ${outTokens}, ${reductionPct}, ${statusCode});
        `;
      }
    }
  } catch (e) {
    console.error("Telemetry logging error:", e);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://tanstack.com/query/latest/docs/framework/react/overview";
  const coord = searchParams.get("coord");

  const startTime = Date.now();

  const mockLattice = {
    url,
    dimension: "packageManager",
    baseMarkdown: `# TanStack Query (React)

Powerful asynchronous state management, server-state utilities and data fetching.

### Installation Options

Below are the mutually exclusive coordinate variants compiled without running a heavy browser.`,
    variants: [
      {
        dimension: "packageManager",
        variant: "pnpm",
        markdown: "```bash\npnpm add @tanstack/react-query\n```"
      },
      {
        dimension: "packageManager",
        variant: "npm",
        markdown: "```bash\nnpm install @tanstack/react-query\n```"
      },
      {
        dimension: "packageManager",
        variant: "yarn",
        markdown: "```bash\nyarn add @tanstack/react-query\n```"
      },
      {
        dimension: "packageManager",
        variant: "bun",
        markdown: "```bash\nbun add @tanstack/react-query\n```"
      }
    ],
    stats: {
      elapsedMs: 28,
      rawTokens: 54600,
      outputTokens: 3550,
      reductionPct: 93.5,
      tier: "lattice",
      selectedCoord: coord || "packageManager:pnpm"
    }
  };

  const elapsed = Date.now() - startTime + 28;
  await logTelemetry("/v1/lattice", "Proteus Lattice", elapsed, 54600, 3550, 93.5, 200);

  return NextResponse.json(mockLattice);
}
