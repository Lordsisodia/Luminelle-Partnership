import { createHmac, timingSafeEqual } from 'crypto'

const ALG = 'sha256'

export type RestorePayload = {
  cartId?: string
  snapshotRef?: string
  issuedAt: number
  expiresAt: number
  nonce: string
  v: 1
}

export function signRestoreToken(payload: RestorePayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac(ALG, secret).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifyRestoreToken(token: string, secret: string): RestorePayload | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  const expected = createHmac(ALG, secret).update(body).digest('base64url')
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  } catch {
    return null
  }

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as RestorePayload
  if (Date.now() > payload.expiresAt) return null
  if (payload.v !== 1) return null
  return payload
}

