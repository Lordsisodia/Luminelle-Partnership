import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { clearLumelleTrackingIds, COOKIE_CONSENT_EVENT, getCookieConsentStatus, setCookieConsentStatus, type CookieConsentStatus } from '@/lib/cookieConsent'
import { initPosthogOnce } from '@/lib/analytics/posthog'

export const CookieConsentBanner = () => {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(() => getCookieConsentStatus())

  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<CookieConsentStatus | null>).detail ?? null
      setConsent(next)
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange)
  }, [])

  if (consent !== null) return null

  const accept = () => {
    setCookieConsentStatus('accepted')
    void initPosthogOnce()
  }

  const decline = () => {
    clearLumelleTrackingIds()
    setCookieConsentStatus('declined')
  }

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-semantic-text-primary">Cookies & analytics</p>
            <p className="mt-1 text-xs text-semantic-text-primary/70">
              We use cookies for core features (like cart) and optional analytics to improve the site. You can read more in our{' '}
              <RouterLink to="/privacy#cookies" className="underline underline-offset-4">
                Privacy Policy
              </RouterLink>.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={decline}
              className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/70 bg-white px-5 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={accept}
              className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CookieConsentBanner
