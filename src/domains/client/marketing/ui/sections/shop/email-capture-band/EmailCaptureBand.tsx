import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Lock } from 'lucide-react'

const DISCOUNT_CODE = 'LUMELLE10'
const EMAIL_CAPTURE_KEY = 'lumelle_email_capture'

export const EmailCaptureBand = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(EMAIL_CAPTURE_KEY)
      if (!existing) return
      setStatus('success')
      setMessage('You’re already on the list.')
    } catch {
      // ignore storage errors
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    try {
      setStatus('loading')
      setMessage(null)

      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'email-capture-band' }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed (${res.status})`)
      }

      const data = (await res.json().catch(() => null)) as { created?: boolean } | null

      localStorage.setItem(EMAIL_CAPTURE_KEY, '1')
      setStatus('success')
      setMessage(data?.created ? 'Thanks — you’re on the list.' : 'You’re already on the list.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Couldn’t subscribe right now. Please try again.')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="bg-semantic-legacy-brand-blush/20 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center md:px-6">
        <h3 className="font-heading text-2xl font-bold text-semantic-text-primary">Get 10% off your first order</h3>
        <p className="text-sm font-serif text-semantic-text-primary/80">
          Join for exclusive creator tutorials, drops, and early access.
        </p>

        {status === 'success' ? (
          <div className="w-full max-w-xl rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-5 text-left shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Welcome</p>
            <p className="mt-2 text-base font-semibold text-semantic-text-primary">You’re in.</p>
            {message ? <p className="mt-1 text-sm text-semantic-text-primary/70">{message}</p> : null}
            <p className="mt-2 text-sm text-semantic-text-primary/70">
              Use code <span className="font-semibold">{DISCOUNT_CODE}</span> at checkout.
            </p>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
        ) : (
          <form
            className="flex w-full max-w-xl flex-col items-stretch gap-2 sm:flex-row"
            aria-label="Newsletter signup"
            onSubmit={handleSubmit}
          >
            <div className="w-full text-left">
              <label
                htmlFor="landing-email"
                className="block text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60"
              >
                Email address
              </label>
              <input
                id="landing-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="mt-2 w-full rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-semantic-accent-cta disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="you@example.com"
              />
              {message ? (
                <p className={`mt-2 text-xs ${status === 'error' ? 'text-red-600' : 'text-semantic-text-primary/70'}`} aria-live="polite">
                  {message}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-2xl bg-semantic-legacy-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        <p className="flex items-center gap-2 text-xs text-semantic-text-primary/60">
          <Lock className="h-4 w-4" aria-hidden /> Secure signup. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
