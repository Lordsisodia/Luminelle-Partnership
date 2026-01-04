import { getPgPool } from "../../_lib/db.js";
import { mapShopOrderRowToAdminOrder } from "./_map.js";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const q = (url.searchParams.get('q') || '').trim()
  const status = (url.searchParams.get('status') || '').trim().toLowerCase()
  const limitRaw = url.searchParams.get('limit')

  const limit = (() => {
    const parsed = Number(limitRaw)
    if (!Number.isFinite(parsed) || parsed <= 0) return 200
    return Math.max(1, Math.min(500, Math.floor(parsed)))
  })()

  const pool = getPgPool();

  const where: string[] = []
  const values: any[] = []

  if (q) {
    const escaped = q.replace(/[%_]/g, '').slice(0, 80)
    const like = `%${escaped}%`
    const numeric = Number(escaped)
    if (Number.isFinite(numeric)) {
      values.push(Math.trunc(numeric), like, like)
      where.push(`(order_id = $${values.length - 2} OR name ILIKE $${values.length - 1} OR email ILIKE $${values.length})`)
    } else {
      values.push(like, like)
      where.push(`(name ILIKE $${values.length - 1} OR email ILIKE $${values.length})`)
    }
  }

  if (status === 'paid') {
    values.push(['paid', 'partially_paid'])
    where.push(`financial_status = ANY($${values.length})`)
  }
  if (status === 'pending') {
    values.push(['pending', 'authorized'])
    where.push(`financial_status = ANY($${values.length})`)
  }
  if (status === 'refunded') {
    values.push(['refunded', 'partially_refunded'])
    where.push(`financial_status = ANY($${values.length})`)
  }
  if (status === 'cancelled') {
    values.push(['voided', 'cancelled'])
    where.push(`financial_status = ANY($${values.length})`)
  }

  values.push(limit)

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const limitParam = `$${values.length}`

  const { rows } = await pool.query(
    `SELECT order_id,name,email,currency,total,financial_status,processed_at,created_at,line_items,raw
     FROM "ShopOrders"
     ${whereSql}
     ORDER BY processed_at DESC NULLS LAST, created_at DESC NULLS LAST
     LIMIT ${limitParam}`,
    values,
  );

  const orders = rows.map(mapShopOrderRowToAdminOrder);
  return new Response(JSON.stringify({ orders }), { headers: { "content-type": "application/json" } });
}

