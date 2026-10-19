import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql, initDb } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  await initDb();
  if (!sql) {
    return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("lellarap_session")?.value;
  if (!token) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please sign in to view your API keys." }, { status: 401 });
  }

  const userRows = await sql`
    SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;
  `;
  if (userRows.length === 0) {
    return NextResponse.json({ ok: false, error: "Session expired. Please sign in again." }, { status: 401 });
  }

  const userId = userRows[0].user_id;
  const rows = await sql`
    SELECT id, name, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status 
    FROM lellarap_api_keys 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC;
  `;

  return NextResponse.json({ ok: true, keys: rows });
}

export async function POST(req: Request) {
  await initDb();
  if (!sql) {
    return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 500 });
  }

  // Strictly enforce user authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("lellarap_session")?.value;
  if (!token) {
    return NextResponse.json({ ok: false, error: "Unauthorized. You must be signed in to create an API key." }, { status: 401 });
  }

  const userRows = await sql`
    SELECT user_id FROM auth_sessions WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP;
  `;
  if (userRows.length === 0) {
    return NextResponse.json({ ok: false, error: "Session expired. Please sign in again." }, { status: 401 });
  }

  const userId = userRows[0].user_id;
  const body = await req.json().catch(() => ({}));
  const name = body.name || "Default Agent Worker";

  // Generate high-entropy API key
  const randomPart = crypto.randomBytes(16).toString("hex");
  const rawKey = `llr_live_${randomPart}`;
  const keyPrefix = rawKey.substring(0, 12);
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
  const id = `key_${crypto.randomBytes(8).toString("hex")}`;
  const now = new Date().toISOString();

  await sql`
    INSERT INTO lellarap_api_keys (id, user_id, name, key_hash, key_prefix, created_at, last_used_at, request_count, rate_limit_per_min, status)
    VALUES (${id}, ${userId}, ${name}, ${keyHash}, ${keyPrefix}, ${now}, ${now}, 0, 120, 'active');
  `;

  const newKeyRecord = {
    id,
    user_id: userId,
    name,
    key_prefix: keyPrefix,
    created_at: now,
    last_used_at: now,
    request_count: 0,
    rate_limit_per_min: 120,
    status: "active",
  };

  return NextResponse.json({
    ok: true,
    apiKey: rawKey,
    keyRecord: newKeyRecord,
    note: "Key created and permanently linked to your account. Copy it now, it will not be displayed again.",
  });
}
