import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase service env missing' })
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { product_handle, public_id, secure_url, alt = '', kind = 'image', sort_order = 0 } = req.body || {}
  if (!product_handle || !public_id || !secure_url) {
    return res.status(400).json({ error: 'product_handle, public_id, secure_url required' })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const { data, error } = await supabase
    .from('cms_product_media')
    .upsert({ product_handle, public_id, secure_url, alt, kind, sort_order }, { onConflict: 'public_id' })
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ media: data || [] })
}
