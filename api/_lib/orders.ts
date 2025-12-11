import { getPgPool } from "./db";

export async function ensureOrdersTable() {
  const pool = getPgPool();
  await pool.query(
    `CREATE TABLE IF NOT EXISTS "orders" (
      id text PRIMARY KEY,
      "placedAt" timestamptz,
      status text,
      items jsonb,
      subtotal numeric,
      shipping numeric,
      total numeric,
      events jsonb,
      tracking text,
      email text,
      raw jsonb
    )`
  );
}

export async function upsertOrder(payload: any) {
  await ensureOrdersTable();
  const pool = getPgPool();

  // Map Shopify status to internal OrderStatus
  let status = 'processing';
  if (payload.cancelled_at) status = 'cancelled';
  else if (payload.fulfillment_status === 'fulfilled') status = 'delivered'; // Simplified
  else if (payload.fulfillment_status === 'partial') status = 'shipped';

  // Map line items
  const items = (payload.line_items || []).map((item: any) => ({
    id: String(item.variant_id || item.product_id),
    title: item.title,
    price: Number(item.price),
    qty: item.quantity
  }));

  const order = {
    id: String(payload.id),
    placedAt: payload.created_at,
    status,
    items: JSON.stringify(items),
    subtotal: Number(payload.subtotal_price),
    shipping: Number(payload.total_shipping_price_set?.shop_money?.amount || 0),
    total: Number(payload.total_price),
    events: JSON.stringify([{ at: new Date().toISOString(), message: 'Order synced from Shopify' }]),
    tracking: payload.fulfillments?.[0]?.tracking_number || null,
    email: payload.email,
    raw: JSON.stringify(payload)
  };

  await pool.query(
    `INSERT INTO "orders" (
      id, "placedAt", status, items, subtotal, shipping, total, events, tracking, email, raw
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (id) DO UPDATE SET
      "placedAt" = excluded."placedAt",
      status = excluded.status,
      items = excluded.items,
      subtotal = excluded.subtotal,
      shipping = excluded.shipping,
      total = excluded.total,
      tracking = excluded.tracking,
      email = excluded.email,
      raw = excluded.raw
    `,
    [
      order.id,
      order.placedAt,
      order.status,
      order.items,
      order.subtotal,
      order.shipping,
      order.total,
      order.events,
      order.tracking,
      order.email,
      order.raw
    ]
  );
}

