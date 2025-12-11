import { getPgPool } from "../_lib/db";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365)
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT line_items FROM "ShopOrders" WHERE coalesce(processed_at, created_at) >= now() - ($1 || \" days\")::interval AND lower(coalesce(financial_status,\'\')) = \"refunded\" AND line_items IS NOT NULL', [days]);
  const map = new Map<string, { units: number; value: number }>();
  for (const r of rows) {
    let items: any[] = []
    try { items = Array.isArray(r.line_items) ? r.line_items : JSON.parse(r.line_items) } catch {}
    for (const it of items) {
      const key = String(it.title || it.variant?.title || 'Item')
      const qty = Number(it.quantity || 1)
      const price = Number((it.variant?.price?.shopMoney?.amount) ?? it.price ?? 0)
      const prev = map.get(key) || { units: 0, value: 0 }
      prev.units += qty
      prev.value += qty * price
      map.set(key, prev)
    }
  }
  const out = Array.from(map.entries()).map(([title, v]) => ({ title, units: v.units, value: v.value }))
  out.sort((a, b) => b.value - a.value)
  return new Response(JSON.stringify(out.slice(0, 10)), { headers: { 'content-type': 'application/json' } })
}

