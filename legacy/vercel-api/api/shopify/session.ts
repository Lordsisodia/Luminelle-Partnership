import { getPgPool } from "../_lib/db.js";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  if (!shop) return new Response(JSON.stringify({ installed: false }), { headers: { "content-type": "application/json" } });
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT 1 FROM "Session" WHERE id = $1 LIMIT 1', [
    `offline_${shop}`,
  ]);
  return new Response(JSON.stringify({ installed: rows.length > 0 }), {
    headers: { "content-type": "application/json" },
  });
}
