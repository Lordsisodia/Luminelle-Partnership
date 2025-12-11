import { Pool } from "pg";

let _pool: Pool | null = null;

export function getPgPool() {
  if (_pool) return _pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  _pool = new Pool({ connectionString, max: 5, idleTimeoutMillis: 30_000 });
  return _pool;
}

export async function getSessionByShop(shop: string) {
  const pool = getPgPool();
  const { rows } = await pool.query(
    'SELECT * FROM "Session" WHERE shop = $1 LIMIT 1',
    [shop],
  );
  return rows[0] || null;
}

