import { getPgPool } from "../../_lib/db.js";
import { mapShopOrderRowToAdminOrder } from "./_map.js";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const id = (url.searchParams.get('id') || '').trim()
  if (!id) return new Response('Missing id', { status: 400 })
  const numeric = Number(id)
  if (!Number.isFinite(numeric)) return new Response('Invalid id', { status: 400 })

  const pool = getPgPool();
  const { rows } = await pool.query(
    'SELECT order_id,name,email,currency,total,financial_status,processed_at,created_at,line_items,raw FROM "ShopOrders" WHERE order_id = $1 LIMIT 1',
    [Math.trunc(numeric)],
  );
  if (!rows || rows.length === 0) return new Response('Not found', { status: 404 })

  const order = mapShopOrderRowToAdminOrder(rows[0]);
  return new Response(JSON.stringify({ order }), { headers: { "content-type": "application/json" } });
}

