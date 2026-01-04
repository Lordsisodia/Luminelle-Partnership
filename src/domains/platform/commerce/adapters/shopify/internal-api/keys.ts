// Opaque key encoding to avoid leaking raw Shopify GIDs above the adapter boundary.
// This is intentionally reversible inside the adapter layer only.

const base64UrlEncode = (value: string): string => {
  if (typeof btoa === 'function') {
    const b64 = btoa(value)
    return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buf = (globalThis as any).Buffer
  if (buf) return buf.from(value, 'utf8').toString('base64url')
  throw new Error('No base64 encoder available')
}

const base64UrlDecode = (value: string): string => {
  if (typeof atob === 'function') {
    const padded = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(value.length / 4) * 4, '=')
    return atob(padded)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buf = (globalThis as any).Buffer
  if (buf) return buf.from(value, 'base64url').toString('utf8')
  throw new Error('No base64 decoder available')
}

const encode = (prefix: string, raw: string) => `${prefix}.${base64UrlEncode(raw)}`
const decode = (prefix: string, key: string) => {
  const marker = `${prefix}.`
  if (!key.startsWith(marker)) throw new Error(`Invalid key prefix (expected ${prefix})`)
  return base64UrlDecode(key.slice(marker.length))
}

export const encodeVariantKey = (gid: string) => encode('variant', gid)
export const decodeVariantKey = (key: string) => decode('variant', key)

export const encodeCartKey = (gid: string) => encode('cart', gid)
export const decodeCartKey = (key: string) => decode('cart', key)

export const encodeCartLineKey = (gid: string) => encode('line', gid)
export const decodeCartLineKey = (key: string) => decode('line', key)

