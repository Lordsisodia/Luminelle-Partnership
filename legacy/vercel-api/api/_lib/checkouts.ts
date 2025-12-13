import { getPgPool } from "./db.js";

export async function ensureCheckoutsTable() {
    const pool = getPgPool();
    await pool.query(
        `CREATE TABLE IF NOT EXISTS "checkouts" (
      id text PRIMARY KEY,
      "updatedAt" timestamptz,
      email text,
      items jsonb,
      "recoveryUrl" text,
      total numeric,
      raw jsonb
    )`
    );
}

export async function upsertCheckout(payload: any) {
    await ensureCheckoutsTable();
    const pool = getPgPool();

    const items = (payload.line_items || []).map((item: any) => ({
        id: String(item.variant_id || item.product_id),
        title: item.title,
        price: Number(item.price),
        qty: item.quantity
    }));

    const checkout = {
        id: String(payload.id),
        updatedAt: payload.updated_at,
        email: payload.email || payload.contact_email,
        items: JSON.stringify(items),
        recoveryUrl: payload.abandoned_checkout_url,
        total: Number(payload.total_price),
        raw: JSON.stringify(payload)
    };

    await pool.query(
        `INSERT INTO "checkouts" (
      id, "updatedAt", email, items, "recoveryUrl", total, raw
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      "updatedAt" = excluded."updatedAt",
      email = excluded.email,
      items = excluded.items,
      "recoveryUrl" = excluded."recoveryUrl",
      total = excluded.total,
      raw = excluded.raw
    `,
        [
            checkout.id,
            checkout.updatedAt,
            checkout.email,
            checkout.items,
            checkout.recoveryUrl,
            checkout.total,
            checkout.raw
        ]
    );
}
