import type { PagesFunction } from '../../_lib/types'
import { getSupabase } from '../../_lib/supabase'
import { requireInternalAuth } from '../../_lib/internalAuth'
import { methodNotAllowed, text } from '../../_lib/response'

function toCsvRow(values: (string | number | null | undefined)[]) {
  return values
    .map((v) => {
      const s = v === null || v === undefined ? '' : String(v)
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
    })
    .join(',')
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return text('Unauthorized', { status: auth.status })

  const supabase = getSupabase(env)
  const { data, error } = await supabase
    .from('ShopCustomers')
    .select('shop,customer_id,email,first_name,last_name,state,marketing_opt_in,tags,default_address,created_at,updated_at')
    .order('updated_at', { ascending: false })
    .limit(5000)
  if (error) throw error

  const header = [
    'shop',
    'customer_id',
    'email',
    'first_name',
    'last_name',
    'state',
    'marketing_opt_in',
    'tags',
    'address1',
    'address2',
    'city',
    'province',
    'zip',
    'country',
    'created_at',
    'updated_at',
  ]

  const lines = [toCsvRow(header)]
  for (const r of data || []) {
    const addr: any = r.default_address || {}
    const tags = Array.isArray(r.tags) ? r.tags.join(';') : String(r.tags || '')
    lines.push(
      toCsvRow([
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
        r.created_at,
        r.updated_at,
      ]),
    )
  }

  const csv = lines.join('\n')
  const headers = new Headers({
    'content-type': 'text/csv; charset=utf-8',
    'content-disposition': 'attachment; filename="customers.csv"',
  })
  return new Response(csv, { headers })
}

