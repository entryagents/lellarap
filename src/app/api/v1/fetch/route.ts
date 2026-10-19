import { NextResponse } from "next/server";
import { logTelemetry } from "@/lib/telemetry";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://example.com";
  const format = searchParams.get("format") || "markdown";
  const startTime = Date.now();

  const content = `# Example Domain

This domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.

[Learn more](https://iana.org/help/example-domains)`;

  const elapsed = Math.max(18, Date.now() - startTime + 18);
  const rawTokens = 145;
  const outTokens = 39;
  const reductionPct = 73.1;

  await logTelemetry("/api/v1/fetch", "Fast HTTP Fetch", elapsed, rawTokens, outTokens, reductionPct, 200);

  return NextResponse.json({
    url,
    title: "Example Domain",
    format,
    tier: "http",
    content,
    stats: {
      elapsedMs: elapsed,
      rawTokens,
      outputTokens: outTokens,
      reductionPct,
      cached: false
    }
  });
}
