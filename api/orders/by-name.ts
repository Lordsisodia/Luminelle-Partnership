import { getPgPool } from "../../app/src/server/db";
import { mapShopOrderRowToOrder } from "./_map";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const raw = (url.searchParams.get('name') || '').trim();
  if (!raw) return new Response('Missing name', { status: 400 });
  const name = raw.startsWith('#') ? raw : `#${raw}`;
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT * FROM "ShopOrders" WHERE name = $1 LIMIT 1', [name]);
  if (rows.length === 0) return new Response('Not found', { status: 404 });
  const order = mapShopOrderRowToOrder(rows[0]);
  return new Response(JSON.stringify(order), { headers: { 'content-type': 'application/json' } });
}

