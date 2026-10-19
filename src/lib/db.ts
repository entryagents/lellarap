import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const sql = connectionString ? neon(connectionString) : null;

// Initialize tables if needed
export async function initDb() {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        key_hash TEXT NOT NULL,
        key_prefix TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_used_at TIMESTAMP WITH TIME ZONE,
        request_count BIGINT DEFAULT 0,
        rate_limit_per_min INT DEFAULT 120,
        status TEXT DEFAULT 'active'
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS usage_telemetry (
        id BIGSERIAL PRIMARY KEY,
        api_key_id TEXT,
        endpoint TEXT NOT NULL,
        feature TEXT NOT NULL,
        latency_ms INT NOT NULL,
        raw_tokens INT NOT NULL,
        out_tokens INT NOT NULL,
        reduction_pct NUMERIC(5, 2) NOT NULL,
        cost_saved_usd NUMERIC(8, 4) NOT NULL,
        status_code INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (err) {
    console.error("Database initialization notice:", err);
  }
}
