import { getPgPool } from "../_lib/db";
import { requireInternalAuth } from "../_lib/internalAuth";

function toCsvRow(values: (string | number | null | undefined)[]) {
  return values
    .map((v) => {
      const s = v === null || v === undefined ? '' : String(v)
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
    })
    .join(',')
}

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req)
  if (!auth.ok) return new Response('Unauthorized', { status: auth.status })

  const pool = getPgPool()
  const { rows } = await pool.query(
    'SELECT shop, customer_id, email, first_name, last_name, state, marketing_opt_in, tags, default_address, created_at, updated_at FROM "ShopCustomers" ORDER BY updated_at DESC NULLS LAST LIMIT 5000'
  )

  const header = ['shop','customer_id','email','first_name','last_name','state','marketing_opt_in','tags','address1','address2','city','province','zip','country','created_at','updated_at']
  const lines = [toCsvRow(header)]
  for (const r of rows) {
    const addr = r.default_address || {}
    const tags = Array.isArray(r.tags) ? r.tags.join(';') : String(r.tags || '')
    lines.push(toCsvRow([
      r.shop,
      r.customer_id,
      r.email,
      r.first_name,
      r.last_name,
      r.state,
      r.marketing_opt_in ? 'true' : 'false',
      tags,
      addr.address1,
      addr.address2,
      addr.city,
      addr.province || addr.province_code,
      addr.zip || addr.postal_code,
      addr.country || addr.country_code,
      r.created_at?.toISOString?.() || r.created_at,
      r.updated_at?.toISOString?.() || r.updated_at,
    ]))
  }

  const csv = lines.join('\n')
  const headers = new Headers({
    'content-type': 'text/csv; charset=utf-8',
    'content-disposition': 'attachment; filename="customers.csv"',
  })
  return new Response(csv, { headers })
}

