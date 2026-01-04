export type CookieConsentStatus = 'accepted' | 'declined'

const CONSENT_KEY = 'lumelle_cookie_consent_v1'
const ANON_KEY = 'lumelle_anon_id'
const SESSION_KEY = 'lumelle_session_id'
const CONSENT_EVENT = 'lumelle:cookie-consent-changed'

export const getCookieConsentStatus = (): CookieConsentStatus | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    return raw === 'accepted' || raw === 'declined' ? raw : null
  } catch {
    return null
  }
}

export const hasTrackingConsent = (): boolean => {
  return getCookieConsentStatus() === 'accepted'
}

export const setCookieConsentStatus = (status: CookieConsentStatus) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_KEY, status)
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }))
  } catch {
    // ignore
  }
}

export const clearCookieConsentStatus = () => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CONSENT_KEY)
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
  } catch {
    // ignore
  }
}

const clearCookie = (key: string) => {
  try {
    document.cookie = `${key}=;path=/;SameSite=Lax;Max-Age=0`
  } catch {
    // ignore
  }
}

export const clearLumelleTrackingIds = () => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(ANON_KEY)
    window.localStorage.removeItem(SESSION_KEY)
    window.localStorage.removeItem(`${SESSION_KEY}_ts`)
  } catch {
    // ignore
  }

  clearCookie(ANON_KEY)

  try {
    const w = window as unknown as { __lumelleIdentity?: Record<string, unknown> }
    if (w.__lumelleIdentity) {
      delete w.__lumelleIdentity[ANON_KEY]
      delete w.__lumelleIdentity[SESSION_KEY]
      delete w.__lumelleIdentity[`${SESSION_KEY}_ts`]
    }
  } catch {
    // ignore
  }
}

export const COOKIE_CONSENT_EVENT = CONSENT_EVENT
