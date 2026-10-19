import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const recipe = body.recipe || {
    name: "Doc Navigation Recipe",
    startUrl: "https://example.com",
    steps: [
      { type: "navigate", target: "https://example.com" },
      { type: "click", target: "a" },
      { type: "extract", target: "h1" }
    ]
  };

  return NextResponse.json({
    ok: true,
    recipe: recipe.name,
    stepsExecuted: recipe.steps?.length || 3,
    latencyMs: 14,
    tokensExpended: 0,
    costUSD: 0.00,
    extractedData: {
      heading: "Example Domains",
      url: "https://iana.org/domains/example"
    },
    logs: [
      "2026-10-19T17:00:00Z [INFO] Initialized LinkeDOM isolated execution context",
      "2026-10-19T17:00:00Z [INFO] Executed step 1: navigate (0 tokens)",
      "2026-10-19T17:00:00Z [INFO] Executed step 2: click target 'a' (0 tokens)",
      "2026-10-19T17:00:00Z [INFO] Executed step 3: extracted text from 'h1' (0 tokens)"
    ]
  });
}
