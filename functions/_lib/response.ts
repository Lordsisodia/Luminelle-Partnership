type ResponseInitWithHeaders = ResponseInit & { headers?: HeadersInit }

const ensureVary = (headers: Headers, token: string) => {
  const existing = headers.get('Vary')
  if (!existing) {
    headers.set('Vary', token)
    return
  }
  const parts = existing
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.some((p) => p.toLowerCase() === token.toLowerCase())) return
  headers.set('Vary', [...parts, token].join(', '))
}

const applyNoStore = (headers: Headers) => {
  headers.set('Cache-Control', 'no-store')
}

const applyTenantPublic = (headers: Headers, ttlSeconds: number) => {
  const ttl = Number.isFinite(ttlSeconds) && ttlSeconds > 0 ? Math.floor(ttlSeconds) : 60
  headers.set('Cache-Control', `public, max-age=${ttl}, s-maxage=${ttl}`)
  ensureVary(headers, 'Host')
}

export function json(data: unknown, init?: ResponseInitWithHeaders) {
  const headers = new Headers(init?.headers)
  if (!headers.has('content-type')) headers.set('content-type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(data), { ...init, headers })
}

export function jsonNoStore(data: unknown, init?: ResponseInitWithHeaders) {
  const headers = new Headers(init?.headers)
  applyNoStore(headers)
  return json(data, { ...init, headers })
}

export function jsonTenantPublic(data: unknown, opts: { ttlSeconds: number; etag?: string }, init?: ResponseInitWithHeaders) {
  const headers = new Headers(init?.headers)
  applyTenantPublic(headers, opts.ttlSeconds)
  if (opts.etag) headers.set('ETag', opts.etag)
  return json(data, { ...init, headers })
}

export function notModifiedTenantPublic(opts: { ttlSeconds: number; etag: string }) {
  const headers = new Headers()
  applyTenantPublic(headers, opts.ttlSeconds)
  headers.set('ETag', opts.etag)
  return new Response('', { status: 304, headers })
}

export function text(body: string, init?: ResponseInitWithHeaders) {
  const headers = new Headers(init?.headers)
  if (!headers.has('content-type')) headers.set('content-type', 'text/plain; charset=utf-8')
  return new Response(body, { ...init, headers })
}

export function methodNotAllowed(allowed: string[]) {
  return text('Method Not Allowed', { status: 405, headers: { Allow: allowed.join(', ') } })
}
