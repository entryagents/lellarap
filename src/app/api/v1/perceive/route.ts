import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://example.com";

  // Zero-GPU Spatial Perception Wireframe
  const perceptionData = {
    url,
    title: "Example Domain",
    viewport: { width: 1280, height: 800 },
    promptTokensExpended: 199,
    multimodalEquivalentTokens: 2150,
    tokenSavingsPct: 90.7,
    visualOutlineAscii: `
+-------------------------------------------------------------+
| [HEADER] Example Domain                                     |
+-------------------------------------------------------------+
| # Example Domain                                            |
|                                                             |
| This domain is for use in illustrative examples in          |
| documents without prior coordination.                       |
|                                                             |
| [LINK: Learn More -> https://iana.org/domains/example]     |
+-------------------------------------------------------------+
| [FOOTER] Root Registry Reserved                             |
+-------------------------------------------------------------+
    `.trim(),
    actionableTargets: [
      {
        id: "target_01",
        type: "link",
        text: "Learn More",
        href: "https://iana.org/domains/example",
        selector: "body > div > p:nth-child(3) > a",
        coordinates: { x: 420, y: 310, w: 90, h: 22 }
      }
    ],
    telemetry: {
      latencyMs: 23,
      gpuRequired: false,
      memoryAllocatedMB: 28
    }
  };

  return NextResponse.json(perceptionData);
}
