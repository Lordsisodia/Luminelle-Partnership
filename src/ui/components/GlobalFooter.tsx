import { Link as RouterLink } from 'react-router-dom'
import { Instagram, Music2 } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { INSTAGRAM_URL, TIKTOK_URL } from '@/config/constants'

type GlobalFooterProps = {
  supportEmail: string
}

export function GlobalFooter({ supportEmail }: GlobalFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = newsletterEmail.trim()
    if (!email) return

    setNewsletterStatus('loading')
    setNewsletterMessage(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed (${res.status})`)
      }

      const data = (await res.json().catch(() => null)) as { created?: boolean } | null
      setNewsletterStatus('success')
      setNewsletterMessage(data?.created ? 'Thanks — you’re on the list.' : 'You’re already on the list.')
      setNewsletterEmail('')
    } catch {
      setNewsletterStatus('error')
      setNewsletterMessage('Couldn’t subscribe right now. Please try again.')
    }
  }

  const socials = [
    { label: 'Instagram', href: INSTAGRAM_URL, icon: Instagram },
    { label: 'TikTok', href: TIKTOK_URL, icon: Music2 },
  ]

  return (
    <footer
      className="border-t border-semantic-legacy-brand-blush/30 bg-semantic-legacy-brand-blush/20 text-semantic-text-primary"
      data-sticky-buy-target
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>
          <p className="max-w-sm text-sm text-semantic-text-primary/75">
            Creator-grade shower caps that keep silk presses, curls, and braids flawless on camera.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-semantic-text-primary shadow-soft ring-1 ring-semantic-accent-cta/50">
            Made in UK • 30-day returns
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/70">Explore</p>
          <div className="grid grid-cols-1 gap-2 text-sm text-semantic-text-primary/80">
            <RouterLink
              to="/terms"
              className="transition hover:text-semantic-text-primary hover:underline underline-offset-4"
            >
              Terms &amp; Conditions
            </RouterLink>
            <RouterLink
              to="/privacy"
              className="transition hover:text-semantic-text-primary hover:underline underline-offset-4"
            >
              Privacy Policy
            </RouterLink>
            <RouterLink
              to="/creators"
              className="transition hover:text-semantic-text-primary hover:underline underline-offset-4"
            >
              Creators
            </RouterLink>
            <a
              href={`mailto:${supportEmail}`}
              className="transition hover:text-semantic-text-primary hover:underline underline-offset-4"
            >
              {supportEmail}
            </a>
          </div>
        </div>

        <div className="space-y-4 md:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/70">Stay in the loop</p>
          <div className="flex flex-col gap-3 md:items-end">
            <form
              onSubmit={handleNewsletterSubmit}
              aria-label="Newsletter signup"
              className="w-full max-w-sm md:max-w-xs"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-semantic-accent-cta/70 bg-white/85 px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm font-semibold text-semantic-text-primary outline-none placeholder:text-semantic-text-primary/50"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-1.5 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {newsletterStatus === 'loading' ? 'Joining…' : 'Join'}
                  <span aria-hidden>→</span>
                </button>
              </div>
              {newsletterMessage ? (
                <p
                  className={`mt-2 text-xs ${newsletterStatus === 'error' ? 'text-red-600' : 'text-semantic-text-primary/70'}`}
                  aria-live="polite"
                >
                  {newsletterMessage}
                </p>
              ) : null}
            </form>
            <div className="flex items-center gap-3 text-sm text-semantic-text-primary/80">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-semantic-accent-cta/50 bg-white/85 text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/20 hover:text-semantic-text-primary shadow-soft"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default GlobalFooter
