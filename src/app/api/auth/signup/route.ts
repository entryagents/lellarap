import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/crypto";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Email and a password of at least 8 characters are required." },
        { status: 400 }
      );
    }

    const { hash, salt } = hashPassword(password);
    const userId = `usr_${crypto.randomBytes(8).toString("hex")}`;
    const username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_") + "_" + crypto.randomBytes(4).toString("hex");
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    if (sql) {
      const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()};`;
      if (existing.length > 0) {
        return NextResponse.json({ ok: false, error: "An account with this email already exists." }, { status: 409 });
      }

      await sql`
        INSERT INTO users (id, username, name, email, password_hash, salt)
        VALUES (${userId}, ${username}, ${name || "AI Engineer"}, ${email.toLowerCase()}, ${hash}, ${salt});
      `;

      await sql`
        INSERT INTO sessions (id, user_id, token, expires_at)
        VALUES (${`sess_${crypto.randomBytes(8).toString("hex")}`}, ${userId}, ${token}, ${expiresAt});
      `;
    }

    const res = NextResponse.json({
      ok: true,
      user: { id: userId, username, name: name || "AI Engineer", email: email.toLowerCase() },
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
    console.error("Signup error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to create account" }, { status: 500 });
  }
}
