import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase service env missing' })
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { public_id, handle } = req.body || {}
  if (!public_id) return res.status(400).json({ error: 'public_id required' })

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const query = supabase.from('cms_product_media').delete().eq('public_id', public_id)
  if (handle) query.eq('product_handle', handle)
  const { error } = await query
  if (error) return res.status(500).json({ error: error.message })

  // Optional: Cloudinary destroy could be added here (requires API secret) to clean up assets.

  return res.status(200).json({ ok: true })
}
