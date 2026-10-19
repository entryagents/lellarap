import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("lellarap_session")?.value;

    if (!token || !sql) {
      return NextResponse.json({ ok: false, user: null });
    }

    const rows = await sql`
      SELECT u.id, u.name, u.email 
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${token} AND s.expires_at > CURRENT_TIMESTAMP;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ ok: false, user: null });
    }

    return NextResponse.json({ ok: true, user: rows[0] });
  } catch (err: any) {
    return NextResponse.json({ ok: false, user: null });
  }
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lellarap_session")?.value;
  if (token && sql) {
    try {
      await sql`DELETE FROM sessions WHERE token = ${token};`;
    } catch (e) {}
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("lellarap_session");
  return res;
}
