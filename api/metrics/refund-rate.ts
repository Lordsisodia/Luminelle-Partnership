import { getPgPool } from "../../app/src/server/db";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365)
  const pool = getPgPool();
  const { rows: total } = await pool.query('SELECT count(*)::int as cnt FROM "ShopOrders" WHERE coalesce(processed_at, created_at) >= now() - ($1 || \" days\")::interval', [days]);
  const { rows: refunded } = await pool.query('SELECT count(*)::int as cnt FROM "ShopOrders" WHERE coalesce(processed_at, created_at) >= now() - ($1 || \" days\")::interval AND lower(coalesce(financial_status,\'\')) = \"refunded\"', [days]);
  const t = total[0]?.cnt || 0; const r = refunded[0]?.cnt || 0;
  return new Response(JSON.stringify({ last30: { total: t, refunded: r, rate: t ? r / t : 0 } }), { headers: { 'content-type': 'application/json' } });
}

