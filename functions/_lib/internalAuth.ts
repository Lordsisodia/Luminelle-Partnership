import type { Env } from './types'

export function requireInternalAuth(request: Request, env: Env) {
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  const secret = env.INTERNAL_SHARED_SECRET
  if (!secret) {
    return { ok: false, status: 500, message: 'INTERNAL_SHARED_SECRET not set' } as const
  }
  if (!auth || !auth.startsWith('Bearer ')) {
    return { ok: false, status: 401, message: 'Missing bearer token' } as const
  }
  const token = auth.slice('Bearer '.length).trim()
  if (token !== secret) {
    return { ok: false, status: 401, message: 'Invalid token' } as const
  }
  return { ok: true } as const
}

