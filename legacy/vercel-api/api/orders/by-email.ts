import { getPgPool } from "../_lib/db.js";
import { mapShopOrderRowToOrder } from "./_map.js";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  if (!email) return new Response('Missing email', { status: 400 });
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT * FROM "ShopOrders" WHERE lower(email) = $1 ORDER BY processed_at DESC NULLS LAST, created_at DESC NULLS LAST LIMIT 50', [email]);
  const orders = rows.map(mapShopOrderRowToOrder);
  return new Response(JSON.stringify(orders), { headers: { 'content-type': 'application/json' } });
}
