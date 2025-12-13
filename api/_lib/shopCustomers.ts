import { getPgPool } from './db.js'

export async function ensureShopCustomersTable() {
  const pool = getPgPool()
  await pool.query(
    `CREATE TABLE IF NOT EXISTS "ShopCustomers" (
      shop text NOT NULL,
      customer_id bigint NOT NULL,
      email text,
      first_name text,
      last_name text,
      state text,
      marketing_opt_in boolean,
      tags jsonb,
      default_address jsonb,
      addresses jsonb,
      created_at timestamptz,
      updated_at timestamptz,
      raw jsonb,
      PRIMARY KEY (shop, customer_id)
    )`,
  )
}

function toTagArray(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String).map((t) => t.trim()).filter(Boolean)
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  return []
}

function toBigIntId(id: unknown): bigint | null {
  if (typeof id === 'number' && Number.isFinite(id)) return BigInt(Math.trunc(id))
  if (typeof id === 'bigint') return id
  if (typeof id === 'string' && id.trim()) {
    const numeric = id.match(/(\d+)\s*$/)?.[1] ?? id
    try {
      return BigInt(numeric)
    } catch {
      return null
    }
  }
  return null
}

export async function upsertShopCustomer(shop: string, payload: any) {
  await ensureShopCustomersTable()
  const pool = getPgPool()

  const customerId = toBigIntId(payload?.id)
  if (!customerId) throw new Error('Invalid customer id')

  const tags = toTagArray(payload?.tags)
  const acceptsMarketing = Boolean(payload?.accepts_marketing ?? payload?.marketing_opt_in)

  await pool.query(
    `INSERT INTO "ShopCustomers" (
      shop, customer_id, email, first_name, last_name, state, marketing_opt_in, tags, default_address, addresses, created_at, updated_at, raw
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    ON CONFLICT (shop, customer_id) DO UPDATE SET
      email = excluded.email,
      first_name = excluded.first_name,
      last_name = excluded.last_name,
      state = excluded.state,
      marketing_opt_in = excluded.marketing_opt_in,
      tags = excluded.tags,
      default_address = excluded.default_address,
      addresses = excluded.addresses,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at,
      raw = excluded.raw`,
    [
      shop,
      customerId.toString(),
      payload?.email ?? null,
      payload?.first_name ?? payload?.firstName ?? null,
      payload?.last_name ?? payload?.lastName ?? null,
      payload?.state ?? null,
      acceptsMarketing,
      JSON.stringify(tags),
      payload?.default_address ? JSON.stringify(payload.default_address) : null,
      payload?.addresses ? JSON.stringify(payload.addresses) : null,
      payload?.created_at ?? payload?.createdAt ?? null,
      payload?.updated_at ?? payload?.updatedAt ?? null,
      JSON.stringify(payload ?? {}),
    ],
  )
}

export async function deleteShopCustomer(shop: string, id: number) {
  await ensureShopCustomersTable()
  const pool = getPgPool()
  await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND customer_id = $2', [shop, id])
}

export async function redactShopCustomer(shop: string, emailOrId: { email?: string; id?: number }) {
  await ensureShopCustomersTable()
  const pool = getPgPool()
  if (emailOrId.id) {
    await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND customer_id = $2', [shop, emailOrId.id])
    return
  }
  if (emailOrId.email) {
    await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1 AND email = $2', [shop, emailOrId.email])
  }
}

