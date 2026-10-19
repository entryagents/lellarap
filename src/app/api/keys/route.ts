import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql, initDb } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  await initDb();
  if (sql) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("lellarap_session")?.value;
      let userRows: any[] = [];
      if (token) {
        userRows = await sql`
          SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;
        `;
      }
      const userId = userRows[0]?.user_id;

      const rows = userId
        ? await sql`SELECT id, name, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status FROM lellarap_api_keys WHERE user_id = ${userId} ORDER BY created_at DESC;`
        : await sql`SELECT id, name, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status FROM lellarap_api_keys ORDER BY created_at DESC LIMIT 20;`;

      return NextResponse.json({ keys: rows });
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }
  return NextResponse.json({ keys: [] });
}

export async function POST(req: Request) {
  await initDb();
  const body = await req.json().catch(() => ({}));
  const name = body.name || "Default Autonomous Agent";

  // Check user session
  let userId: string | null = null;
  if (sql) {
    const cookieStore = await cookies();
    const token = cookieStore.get("lellarap_session")?.value;
    if (token) {
      const userRows: any[] = await sql`SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;`;
      userId = userRows[0]?.user_id || null;
    }
  }

  // Generate high-entropy API key
  const randomPart = crypto.randomBytes(16).toString("hex");
  const rawKey = `llr_live_${randomPart}`;
  const keyPrefix = rawKey.substring(0, 12);
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
  const id = `key_${crypto.randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();

  const newKeyRecord = {
    id,
    user_id: userId,
    name,
    key_prefix: keyPrefix,
    key_hash: keyHash,
    created_at: now,
    last_used_at: now,
    request_count: 0,
    rate_limit_per_min: 120,
    status: "active",
  };

  if (sql) {
    try {
      await sql`
        INSERT INTO lellarap_api_keys (id, user_id, name, key_hash, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status)
        VALUES (${id}, ${userId}, ${name}, ${keyHash}, ${keyPrefix}, ${now}, ${now}, 0, 120, 'active');
      `;
    } catch (e) {
      console.error("DB insert error:", e);
    }
  }

  return NextResponse.json({
    ok: true,
    apiKey: rawKey,
    keyRecord: newKeyRecord,
    note: "This key is 100% free with no subscription required. Copy it now, it will not be displayed again.",
  });
}
