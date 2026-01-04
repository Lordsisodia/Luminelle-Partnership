import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const clientCache = new Map<string, SupabaseClient>()

const buildClient = (authToken?: string): SupabaseClient =>
  createClient(supabaseUrl!, supabaseAnonKey!, {
    // Separate storage keys to avoid GoTrue instance collisions in the browser.
    auth: {
      persistSession: false,
      storageKey: authToken ? 'sb-lumelle-auth-token' : 'sb-lumelle-auth-anon',
    },
    global: authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined,
  })

export const createSupabaseClient = (authToken?: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return null
  const cacheKey = authToken ? `token:${authToken}` : 'anon'
  const existing = clientCache.get(cacheKey)
  if (existing) return existing
  const next = buildClient(authToken)
  clientCache.set(cacheKey, next)
  return next
}

// Singleton base client to reuse across the app.
export const supabase = createSupabaseClient()

export const isSupabaseConfigured = Boolean(supabase)
