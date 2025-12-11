const ANON_KEY = 'lumelle_anon_id'
const SESSION_KEY = 'lumelle_session_id'
const SESSION_TTL_MS = 30 * 60 * 1000

const uuid = () => crypto.randomUUID()

export function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return 'server'
  const existing = localStorage.getItem(ANON_KEY) || document.cookie.match(/lumelle_anon_id=([^;]+)/)?.[1]
  const val = existing || uuid()
  localStorage.setItem(ANON_KEY, val)
  document.cookie = `${ANON_KEY}=${val};path=/;SameSite=Lax;Max-Age=31536000`
  return val
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server'
  const stored = localStorage.getItem(SESSION_KEY)
  const ts = Number(localStorage.getItem(`${SESSION_KEY}_ts`) || 0)
  const now = Date.now()
  if (stored && now - ts < SESSION_TTL_MS) {
    return stored
  }
  const val = uuid()
  localStorage.setItem(SESSION_KEY, val)
  localStorage.setItem(`${SESSION_KEY}_ts`, String(now))
  return val
}
