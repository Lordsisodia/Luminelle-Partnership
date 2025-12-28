import { useMemo, useState, type FormEvent } from 'react'

type NewsletterModalProps = {
  headline: string
  body: string
  placeholder: string
  consent: string
  ctaLabel: string
  success?: string
  triggerText?: string
}

const isValidEmail = (email: string) => {
  if (!email) return false
  if (email.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function NewsletterModal({
  headline,
  body,
  placeholder,
  consent,
  ctaLabel,
  success,
  triggerText,
}: NewsletterModalProps) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const source = useMemo(() => {
    try {
      return `newsletter-modal:${window.location.pathname}`
    } catch {
      return 'newsletter-modal'
    }
  }, [])

  const canSubmit = isValidEmail(email)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      if (!res.ok) {
        const message = (await res.text().catch(() => '')) || 'Unable to subscribe — please try again.'
        throw new Error(message)
      }

      setSubmitted(true)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to subscribe — please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Modal</div>
      <div className="mt-2 text-lg font-semibold text-semantic-text-primary">{headline}</div>
      <p className="mt-1 text-sm text-semantic-text-primary/75">{body}</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
          Email
          <input
            className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            disabled={submitted}
          />
        </label>

        {error ? <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div> : null}
        {!error && submitted && success ? (
          <div className="rounded-xl bg-green-50 px-3 py-2 text-xs text-green-800">{success}</div>
        ) : null}

        <div className="text-xs text-semantic-text-primary/60">{consent}</div>

        <button
          type="submit"
          disabled={submitted || submitting || !canSubmit}
          className="w-full rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Joining…' : submitted ? 'Joined' : ctaLabel}
        </button>
      </form>
      {triggerText ? <div className="mt-1 text-[11px] text-semantic-text-primary/50">{triggerText}</div> : null}
    </div>
  )
}

export default NewsletterModal
