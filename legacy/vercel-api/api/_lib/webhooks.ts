import { getPgPool } from './db.js'

export async function ensureWebhookTable() {
  const pool = getPgPool()
  await pool.query(
    'CREATE TABLE IF NOT EXISTS "ShopWebhookDeliveries" (id text PRIMARY KEY, received_at timestamptz DEFAULT now())'
  )
}

export async function isProcessed(deliveryId: string) {
  await ensureWebhookTable()
  const pool = getPgPool()
  const { rows } = await pool.query('SELECT 1 FROM "ShopWebhookDeliveries" WHERE id=$1', [deliveryId])
  return rows.length > 0
}

export async function markProcessed(deliveryId: string) {
  await ensureWebhookTable()
  const pool = getPgPool()
  await pool.query('INSERT INTO "ShopWebhookDeliveries" (id) VALUES ($1) ON CONFLICT DO NOTHING', [deliveryId])
}
