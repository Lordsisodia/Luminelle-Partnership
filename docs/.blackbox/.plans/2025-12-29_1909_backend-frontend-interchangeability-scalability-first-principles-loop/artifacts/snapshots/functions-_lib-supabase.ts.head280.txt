import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Env } from './types'

type Cached = { key: string; client: SupabaseClient }
let cached: Cached | null = null

export function getSupabase(env: Env) {
  const url = env.SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  const cacheKey = `${url}::${key.slice(0, 8)}`
  if (cached && cached.key === cacheKey) return cached.client
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  cached = { key: cacheKey, client }
  return client
}

