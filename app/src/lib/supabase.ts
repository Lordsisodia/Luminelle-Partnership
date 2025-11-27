import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const buildClient = (authToken?: string) =>
  createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: { persistSession: false },
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
  return buildClient(authToken)
}

export const supabase = createSupabaseClient()

export const isSupabaseConfigured = Boolean(supabase)
