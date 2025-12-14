export function parseCookies(cookieHeader: string | null | undefined) {
  const map = new Map<string, string>()
  if (!cookieHeader) return map
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    const value = trimmed.slice(eq + 1)
    map.set(key, value)
  }
  return map
}

export function getCookie(request: Request, name: string) {
  return parseCookies(request.headers.get('cookie')).get(name)
}

export function appendSetCookie(headers: Headers, setCookie: string | string[]) {
  const values = Array.isArray(setCookie) ? setCookie : [setCookie]
  for (const value of values) {
    headers.append('Set-Cookie', value)
  }
}

