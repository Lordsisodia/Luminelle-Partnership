import { hasTrackingConsent } from '@/lib/cookieConsent'

const ANON_KEY = 'lumelle_anon_id'
const SESSION_KEY = 'lumelle_session_id'
const SESSION_TTL_MS = 30 * 60 * 1000

const uuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `anon_${Math.random().toString(36).slice(2, 10)}`
}

const safeLocalStorageGet = (key: string) => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const safeLocalStorageSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

const safeCookieGet = (key: string) => {
  try {
    return document.cookie.match(new RegExp(`${key}=([^;]+)`))?.[1] ?? null
  } catch {
    return null
  }
}

const safeCookieSet = (key: string, value: string) => {
  try {
    document.cookie = `${key}=${value};path=/;SameSite=Lax;Max-Age=31536000`
    return true
  } catch {
    return false
  }
}

const getMemoryStore = () => {
  const w = window as unknown as { __lumelleIdentity?: Record<string, unknown> }
  if (!w.__lumelleIdentity) w.__lumelleIdentity = {}
  return w.__lumelleIdentity
}

export function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return 'server'

  const canPersist = hasTrackingConsent()
  const memory = getMemoryStore()
  const persisted = canPersist ? safeLocalStorageGet(ANON_KEY) || safeCookieGet(ANON_KEY) : null
  const existing = (persisted || (memory[ANON_KEY] as string | undefined)) ?? null
  const val = existing || uuid()

  // Best-effort writes: never let attribution prevent checkout.
  if (canPersist) {
    safeLocalStorageSet(ANON_KEY, val)
    safeCookieSet(ANON_KEY, val)
  }
  memory[ANON_KEY] = val

  return val
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  const canPersist = hasTrackingConsent()
  const memory = getMemoryStore()
  const stored = ((canPersist ? safeLocalStorageGet(SESSION_KEY) : null) || (memory[SESSION_KEY] as string | undefined)) ?? null
  const ts = Number((canPersist ? safeLocalStorageGet(`${SESSION_KEY}_ts`) : null) || (memory[`${SESSION_KEY}_ts`] as string | undefined) || 0)
  const now = Date.now()
  if (stored && now - ts < SESSION_TTL_MS) {
    return stored
  }
  const val = uuid()
  if (canPersist) {
    safeLocalStorageSet(SESSION_KEY, val)
    safeLocalStorageSet(`${SESSION_KEY}_ts`, String(now))
  }
  memory[SESSION_KEY] = val
  memory[`${SESSION_KEY}_ts`] = String(now)
  return val
}
