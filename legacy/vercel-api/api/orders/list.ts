import { getPgPool } from "../_lib/db.js";
import { mapShopOrderRowToOrder } from "./_map.js";

export default async function handler(_req: Request) {
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT * FROM "ShopOrders" ORDER BY processed_at DESC NULLS LAST, created_at DESC NULLS LAST LIMIT 50');
  const orders = rows.map(mapShopOrderRowToOrder);
  return new Response(JSON.stringify(orders), { headers: { "content-type": "application/json" } });
}
