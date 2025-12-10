import { getPgPool } from "../../app/src/server/db";
import { mapShopOrderRowToOrder } from "./_map";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT * FROM "ShopOrders" WHERE order_id = $1 LIMIT 1', [Number(id)]);
  if (rows.length === 0) return new Response("Not found", { status: 404 });
  const order = mapShopOrderRowToOrder(rows[0]);
  return new Response(JSON.stringify(order), { headers: { "content-type": "application/json" } });
}

