import { bytesToBase64, bytesToBase64Url, bytesToHex, utf8ToBytes } from './encoding'

export function randomBytes(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return bytes
}

export function randomHex(lengthBytes: number) {
  return bytesToHex(randomBytes(lengthBytes))
}

export function randomBase64Url(lengthBytes: number) {
  return bytesToBase64Url(randomBytes(lengthBytes))
}

export async function sha256(data: string | Uint8Array) {
  const bytes = typeof data === 'string' ? utf8ToBytes(data) : data
  return crypto.subtle.digest('SHA-256', bytes as unknown as BufferSource)
}

export async function sha256Base64Url(data: string | Uint8Array) {
  const digest = await sha256(data)
  return bytesToBase64Url(new Uint8Array(digest))
}

export async function hmacSha256(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    utf8ToBytes(secret) as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return crypto.subtle.sign('HMAC', key, utf8ToBytes(message) as unknown as BufferSource)
}

export async function hmacSha256Hex(secret: string, message: string) {
  return bytesToHex(await hmacSha256(secret, message))
}

export async function hmacSha256Base64(secret: string, message: string) {
  return bytesToBase64(new Uint8Array(await hmacSha256(secret, message)))
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
