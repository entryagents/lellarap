import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://example.com";
  const format = searchParams.get("format") || "markdown";

  // Tier 1 Fast Fetch
  return NextResponse.json({
    url,
    title: "Example Domain",
    format,
    tier: "http",
    content: `# Example Domain\n\nThis domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.\n\n[Learn more](https://iana.org/help/example-domains)`,
    stats: {
      elapsedMs: 38,
      rawTokens: 145,
      outputTokens: 39,
      reductionPct: 73.1,
      cached: false
    }
  });
}
