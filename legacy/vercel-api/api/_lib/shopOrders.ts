import { getPgPool } from './db.js'

export async function ensureShopOrdersTable() {
  const pool = getPgPool()
  await pool.query(
    `CREATE TABLE IF NOT EXISTS "ShopOrders" (
      shop text NOT NULL,
      order_id bigint NOT NULL,
      name text,
      email text,
      currency text,
      subtotal numeric,
      total numeric,
      financial_status text,
      fulfillment_status text,
      processed_at timestamptz,
      created_at timestamptz,
      updated_at timestamptz,
      line_items jsonb,
      raw jsonb,
      PRIMARY KEY (shop, order_id)
    )`,
  )
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

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

export async function upsertShopOrder(shop: string, payload: any) {
  await ensureShopOrdersTable()
  const pool = getPgPool()

  const orderId = toBigIntId(payload?.id ?? payload?.order_id)
  if (!orderId) throw new Error('Invalid order id')

  const subtotal =
    toNumber(payload?.subtotal_price ?? payload?.subtotal ?? payload?.subtotal_price_set?.shop_money?.amount) ?? null
  const total =
    toNumber(payload?.total_price ?? payload?.total ?? payload?.total_price_set?.shop_money?.amount) ?? null

  const lineItems = payload?.line_items ?? payload?.lineItems ?? null

  await pool.query(
    `INSERT INTO "ShopOrders" (
      shop, order_id, name, email, currency, subtotal, total, financial_status, fulfillment_status, processed_at, created_at, updated_at, line_items, raw
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    ON CONFLICT (shop, order_id) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      currency = excluded.currency,
      subtotal = excluded.subtotal,
      total = excluded.total,
      financial_status = excluded.financial_status,
      fulfillment_status = excluded.fulfillment_status,
      processed_at = excluded.processed_at,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at,
      line_items = excluded.line_items,
      raw = excluded.raw`,
    [
      shop,
      orderId.toString(),
      payload?.name ?? null,
      payload?.email ?? null,
      payload?.currency ?? payload?.currencyCode ?? payload?.currency_code ?? null,
      subtotal,
      total,
      payload?.financial_status ?? payload?.financialStatus ?? null,
      payload?.fulfillment_status ?? payload?.fulfillmentStatus ?? null,
      payload?.processed_at ?? payload?.processedAt ?? null,
      payload?.created_at ?? payload?.createdAt ?? null,
      payload?.updated_at ?? payload?.updatedAt ?? null,
      lineItems ? JSON.stringify(lineItems) : null,
      JSON.stringify(payload ?? {}),
    ],
  )
}

