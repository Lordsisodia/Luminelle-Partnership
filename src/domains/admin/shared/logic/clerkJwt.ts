export type ClerkSupabaseJwtPayload = {
  app_metadata?: {
    roles?: unknown
  }
}

export function decodeClerkJwtPayload(token: string): ClerkSupabaseJwtPayload | null {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const json = atob(padded)
    return JSON.parse(json) as ClerkSupabaseJwtPayload
  } catch {
    return null
  }
}

export function normalizeJwtRoles(roles: unknown): string[] {
  if (!roles) return []
  if (Array.isArray(roles)) return roles.map(String).map((r) => r.trim()).filter(Boolean)
  if (typeof roles === 'string') return [roles.trim()].filter(Boolean)
  return []
}

export function hasAdminRole(roles: unknown): boolean {
  return normalizeJwtRoles(roles).includes('admin')
}

