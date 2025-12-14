const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

export function utf8ToBytes(value: string) {
  return textEncoder.encode(value)
}

export function bytesToUtf8(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  return textDecoder.decode(view)
}

export function bytesToBase64(bytes: Uint8Array) {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!)
  return btoa(binary)
}

export function base64ToBytes(base64: string) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export function base64UrlFromBase64(base64: string) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function base64FromBase64Url(base64url: string) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  if (pad) base64 += '='.repeat(4 - pad)
  return base64
}

export function bytesToBase64Url(bytes: Uint8Array) {
  return base64UrlFromBase64(bytesToBase64(bytes))
}

export function base64UrlToBytes(base64url: string) {
  return base64ToBytes(base64FromBase64Url(base64url))
}

export function bytesToHex(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let out = ''
  for (const b of view) out += b.toString(16).padStart(2, '0')
  return out
}

