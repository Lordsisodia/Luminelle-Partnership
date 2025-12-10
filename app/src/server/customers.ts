import { getPgPool } from "./db";

export async function ensureCustomersTable() {
  const pool = getPgPool();
  await pool.query(
    `CREATE TABLE IF NOT EXISTS "customers" (
      id text PRIMARY KEY,
      email text,
      first_name text,
      last_name text,
      full_name text,
      username text,
      phone text,
      avatar_url text,
      last_sign_in_at timestamptz,
      updated_at timestamptz,
      raw jsonb
    )`
  );
}

export async function upsertCustomer(_shop: string, payload: any) {
  await ensureCustomersTable();
  const pool = getPgPool();

  // Handle both Shopify (numeric) and Clerk (string) IDs
  const id = String(payload.id);

  await pool.query(
    `INSERT INTO "customers" (
      id, email, first_name, last_name, full_name, avatar_url, updated_at, raw
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (id) DO UPDATE SET
      email = excluded.email,
      first_name = excluded.first_name,
      last_name = excluded.last_name,
      full_name = excluded.full_name,
      avatar_url = excluded.avatar_url,
      updated_at = excluded.updated_at,
      raw = excluded.raw
    `,
    [
      id,
      payload.email,
      payload.first_name,
      payload.last_name,
      `${payload.first_name} ${payload.last_name}`.trim(),
      payload.avatar_url || payload.image_url, // Clerk uses image_url
      new Date().toISOString(),
      JSON.stringify(payload)
    ]
  );
}

export async function deleteCustomer(shop: string, id: number) {
  await ensureCustomersTable();
  const pool = getPgPool();
  await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND customer_id = $2', [shop, id]);
}

export async function redactCustomer(shop: string, emailOrId: { email?: string; id?: number }) {
  await ensureCustomersTable();
  const pool = getPgPool();
  if (emailOrId.id) {
    await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND customer_id = $2', [shop, emailOrId.id]);
    return;
  }
  if (emailOrId.email) {
    await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND email = $2', [shop, emailOrId.email]);
  }
}

