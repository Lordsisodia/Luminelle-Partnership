import type { Env } from './types'
import { getSupabase } from './supabase'

export async function getAdminToken(env: Env, shop: string) {
  const supabase = getSupabase(env)
  const { data, error } = await supabase.from('Session').select('accesstoken').eq('id', `offline_${shop}`).limit(1).maybeSingle()
  if (error) throw error
  const token = data?.accesstoken
  if (!token) throw new Error(`No admin token for ${shop}`)
  return token as string
}

export async function adminGraphQL<T>(
  env: Env,
  shop: string,
  token: string,
  query: string,
  variables?: Record<string, unknown>,
) {
  const version = env.SHOPIFY_API_VERSION || '2025-10'
  const res = await fetch(`https://${shop}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Admin GQL ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data as T
}

