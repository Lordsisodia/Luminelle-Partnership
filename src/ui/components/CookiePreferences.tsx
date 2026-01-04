import { useEffect, useState } from 'react'
import { clearLumelleTrackingIds, COOKIE_CONSENT_EVENT, getCookieConsentStatus, setCookieConsentStatus, type CookieConsentStatus } from '@/lib/cookieConsent'
import { initPosthogOnce } from '@/lib/analytics/posthog'

export const CookiePreferences = () => {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(() => getCookieConsentStatus())

  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<CookieConsentStatus | null>).detail ?? null
      setConsent(next)
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange)
  }, [])

  const accept = () => {
    setCookieConsentStatus('accepted')
    void initPosthogOnce()
  }

  const decline = () => {
    clearLumelleTrackingIds()
    setCookieConsentStatus('declined')
  }

  const resetIds = () => {
    clearLumelleTrackingIds()
  }

  return (
    <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-semantic-text-primary">Cookie preferences</p>
          <p className="mt-1 text-sm text-semantic-text-primary/70">
            {consent === 'accepted'
              ? 'Analytics is enabled.'
              : consent === 'declined'
                ? 'Analytics is disabled.'
                : 'Choose whether to allow optional analytics.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/70 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
          >
            Decline analytics
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            Accept analytics
          </button>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={resetIds}
          className="text-sm font-semibold text-semantic-text-primary/80 underline decoration-semantic-text-primary/40 underline-offset-4 hover:text-semantic-text-primary"
        >
          Reset tracking identifiers
        </button>
        <p className="mt-1 text-xs text-semantic-text-primary/60">
          This clears <span className="font-mono">lumelle_anon_id</span> from cookie + localStorage. If analytics is enabled, a new id will be created later.
        </p>
      </div>
    </div>
  )
}

export default CookiePreferences
