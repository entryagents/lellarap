import { sql } from "@/lib/db";
import { cookies, headers } from "next/headers";
import crypto from "crypto";

export async function logTelemetry(
  endpoint: string,
  feature: string,
  latencyMs: number,
  rawTokens: number,
  outTokens: number,
  reductionPct: number,
  statusCode: number
) {
  if (!sql) return;
  try {
    let userId: string | null = null;
    let apiKeyId: string | null = null;

    // 1. Check Bearer API key in Authorization header
    const headerList = await headers();
    const authHeader = headerList.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const rawKey = authHeader.replace("Bearer ", "").trim();
      const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

      const keyRows = await sql`
        SELECT id, user_id FROM lellarap_api_keys WHERE key_hash = ${keyHash} AND status = 'active';
      `;
      if (keyRows.length > 0) {
        apiKeyId = keyRows[0].id;
        userId = keyRows[0].user_id;

        // Bump request count on the key
        await sql`
          UPDATE lellarap_api_keys 
          SET request_count = request_count + 1, last_used_at = CURRENT_TIMESTAMP 
          WHERE id = ${apiKeyId};
        `;
      }
    }

    // 2. If no bearer token, check session cookie
    if (!userId) {
      const cookieStore = await cookies();
      const token = cookieStore.get("lellarap_session")?.value;
      if (token) {
        const sessionRows = await sql`
          SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;
        `;
        if (sessionRows.length > 0) {
          userId = sessionRows[0].user_id;
        }
      }
    }

    // Insert user metric if user authenticated
    if (userId) {
      await sql`
        INSERT INTO user_metrics (user_id, api_key_id, endpoint, feature, latency_ms, raw_tokens, out_tokens, reduction_pct, status_code)
        VALUES (${userId}, ${apiKeyId}, ${endpoint}, ${feature}, ${latencyMs}, ${rawTokens}, ${outTokens}, ${reductionPct}, ${statusCode});
      `;
    }
  } catch (e) {
    console.error("Telemetry logging error:", e);
  }
}
