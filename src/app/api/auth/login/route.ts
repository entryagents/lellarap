import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/crypto";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
    }

    if (!sql) {
      return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 500 });
    }

    const rows = await sql`
      SELECT id, name, email, password_hash, salt FROM users WHERE email = ${email.toLowerCase()};
    `;

    if (rows.length === 0) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const user = rows[0];
    const valid = verifyPassword(password, user.password_hash, user.salt);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await sql`
      INSERT INTO sessions (id, user_id, token, expires_at)
      VALUES (${`sess_${crypto.randomBytes(8).toString("hex")}`}, ${user.id}, ${token}, ${expiresAt});
    `;

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });

    res.cookies.set("lellarap_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to log in" }, { status: 500 });
  }
}
