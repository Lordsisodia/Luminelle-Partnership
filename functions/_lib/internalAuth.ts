import type { Env } from './types'

export function requireInternalAuth(request: Request, env: Env) {
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  // Backwards compatible: allow either INTERNAL_SHARED_SECRET (preferred) or ADMIN_SHARED_SECRET (legacy),
  // and allow either Authorization: Bearer <token> or x-admin-secret.
  const secret = env.INTERNAL_SHARED_SECRET || env.ADMIN_SHARED_SECRET
  if (!secret) {
    return { ok: false, status: 500, message: 'INTERNAL_SHARED_SECRET not set' } as const
  }
  const legacy = request.headers.get('x-admin-secret') || request.headers.get('X-Admin-Secret')

  const token = auth && auth.startsWith('Bearer ') ? auth.slice('Bearer '.length).trim() : legacy?.trim()
  if (!token) {
    return { ok: false, status: 401, message: 'Missing token' } as const
  }
  if (token !== secret) {
    return { ok: false, status: 401, message: 'Invalid token' } as const
  }
  return { ok: true } as const
}
