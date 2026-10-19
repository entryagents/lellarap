import { betterAuth } from "better-auth";
import { sql } from "./db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://lellarap.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "lellarap-secret-production-auth-key-2026",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});
