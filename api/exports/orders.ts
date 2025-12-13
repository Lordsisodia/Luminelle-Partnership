import { getPgPool } from "../_lib/db.js";
import { requireInternalAuth } from "../_lib/internalAuth.js";

function toCsvRow(values: (string | number | null | undefined)[]) {
  return values
    .map((v) => {
      const s = v === null || v === undefined ? '' : String(v)
      if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
      return s
    })
    .join(',')
}

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req)
  if (!auth.ok) return new Response('Unauthorized', { status: auth.status })

  const pool = getPgPool()
  const { rows } = await pool.query(
    'SELECT order_id, name, email, currency, total, subtotal, financial_status, fulfillment_status, coalesce(processed_at, created_at) as date, raw FROM "ShopOrders" ORDER BY date DESC LIMIT 5000'
  )

  const header = [
    'order_id','name','email','currency','subtotal','total','financial_status','fulfillment_status','date','utm_source','utm_medium','utm_campaign','utm_content','utm_term'
  ]

  const lines = [toCsvRow(header)]
  for (const r of rows) {
    let attrs: Record<string,string> = {}
    try {
      const raw = typeof r.raw === 'string' ? JSON.parse(r.raw) : (r.raw || {})
      const notes = Array.isArray(raw.note_attributes) ? raw.note_attributes : []
      for (const n of notes) {
        if (n && typeof n.name === 'string' && typeof n.value === 'string') attrs[n.name] = n.value
      }
    } catch {}
    lines.push(toCsvRow([
      r.order_id,
      r.name,
      r.email,
      r.currency,
      r.subtotal,
      r.total,
      r.financial_status,
      r.fulfillment_status,
      r.date?.toISOString?.() || r.date,
      attrs.utm_source,
      attrs.utm_medium,
      attrs.utm_campaign,
      attrs.utm_content,
      attrs.utm_term,
    ]))
  }

  const body = lines.join('\n')
  const headers = new Headers({
    'content-type': 'text/csv; charset=utf-8',
    'content-disposition': 'attachment; filename="orders.csv"',
  })
  return new Response(body, { headers })
}
