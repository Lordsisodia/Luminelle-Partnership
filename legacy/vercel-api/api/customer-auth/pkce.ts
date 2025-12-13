import { createHash, randomBytes } from 'crypto'

export function generateVerifier(): string {
  return base64url(randomBytes(32))
}

export function challengeFromVerifier(verifier: string): string {
  return base64url(createHash('sha256').update(verifier).digest())
}

export function base64url(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function randomState(): string {
  return base64url(randomBytes(16))
}

