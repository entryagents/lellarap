import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql, initDb } from "@/lib/db";

// In-memory fallback if database is temporarily connecting
const memoryKeys: any[] = [
  {
    id: "key_prod_default_demo",
    name: "Autonomous Agent Fleet",
    key_prefix: "llr_live_8f3a",
    key_hash: "demo_hash",
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    request_count: 14209,
    rate_limit_per_min: 120,
    status: "active",
  },
];

export async function GET() {
  await initDb();
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, name, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status 
        FROM api_keys ORDER BY created_at DESC LIMIT 50;
      `;
      if (rows && rows.length > 0) {
        return NextResponse.json({ keys: rows });
      }
    } catch (e) {
      console.warn("DB query fallback:", e);
    }
  }
  return NextResponse.json({ keys: memoryKeys });
}

export async function POST(req: Request) {
  await initDb();
  const body = await req.json().catch(() => ({}));
  const name = body.name || "Default Coding Agent";

  // Generate production API key
  const randomPart = crypto.randomBytes(16).toString("hex");
  const rawKey = `llr_live_${randomPart}`;
  const keyPrefix = rawKey.substring(0, 12);
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
  const id = `key_${crypto.randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();

  const newKeyRecord = {
    id,
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
        INSERT INTO api_keys (id, name, key_hash, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status)
        VALUES (${id}, ${name}, ${keyHash}, ${keyPrefix}, ${now}, ${now}, 0, 120, 'active');
      `;
    } catch (e) {
      console.warn("DB insert error, using local state:", e);
      memoryKeys.unshift(newKeyRecord);
    }
  } else {
    memoryKeys.unshift(newKeyRecord);
  }

  return NextResponse.json({
    ok: true,
    apiKey: rawKey,
    keyRecord: newKeyRecord,
    note: "This key is 100% free with no subscription required. Copy it now, it will not be displayed again.",
  });
}
