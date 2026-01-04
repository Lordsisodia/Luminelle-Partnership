export type ClerkGetTokenFn = (options?: { template?: string }) => Promise<string | null>

export const CLERK_SUPABASE_JWT_TEMPLATE = (() => {
  const raw = String(import.meta.env.VITE_CLERK_SUPABASE_JWT_TEMPLATE ?? 'supabase').trim()
  return raw || 'supabase'
})()

export async function getClerkSupabaseToken(getToken: ClerkGetTokenFn) {
  const template = CLERK_SUPABASE_JWT_TEMPLATE
  const templated = await getToken({ template }).catch(() => null)
  if (templated) return { token: templated, template, source: 'template' as const }
  const fallback = await getToken().catch(() => null)
  return { token: fallback, template, source: 'default' as const }
}

