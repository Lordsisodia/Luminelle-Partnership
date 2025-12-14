import { Link as RouterLink } from 'react-router-dom'
import { Instagram, Music2 } from 'lucide-react'

type GlobalFooterProps = {
  supportEmail: string
}

export function GlobalFooter({ supportEmail }: GlobalFooterProps) {
  const socials = [
    { label: 'Instagram', href: 'https://instagram.com/lumellebeauty', icon: Instagram },
    { label: 'TikTok', href: 'https://www.tiktok.com/@lumellebeauty', icon: Music2 },
  ]

  return (
    <footer className="border-t border-brand-blush/30 bg-brand-blush/20 text-brand-cocoa" data-sticky-buy-target>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>
          <p className="max-w-sm text-sm text-brand-cocoa/75">
            Creator-grade shower caps that keep silk presses, curls, and braids flawless on camera.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-cocoa shadow-soft ring-1 ring-brand-peach/50">
            Made in UK • 30-day returns
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-cocoa/70">Explore</p>
          <div className="grid grid-cols-1 gap-2 text-sm text-brand-cocoa/80">
            <RouterLink to="/terms" className="transition hover:text-brand-cocoa hover:underline underline-offset-4">Terms &amp; Conditions</RouterLink>
            <RouterLink to="/privacy" className="transition hover:text-brand-cocoa hover:underline underline-offset-4">Privacy Policy</RouterLink>
            <RouterLink to="/creators" className="transition hover:text-brand-cocoa hover:underline underline-offset-4">Creators</RouterLink>
            <a href={`mailto:${supportEmail}`} className="transition hover:text-brand-cocoa hover:underline underline-offset-4">{supportEmail}</a>
          </div>
        </div>

        <div className="space-y-4 md:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-cocoa/70">Stay in the loop</p>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="mailto:creators@lumellebeauty.co.uk?subject=Join%20Lumelle%20List"
              className="inline-flex items-center justify-between gap-3 rounded-full border border-brand-peach/70 bg-white/85 px-4 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            >
              Get style tips & launches
              <span className="text-brand-cocoa/70">→</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-brand-cocoa/80">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-peach/50 bg-white/85 text-brand-cocoa transition hover:-translate-y-0.5 hover:bg-brand-peach/20 hover:text-brand-cocoa shadow-soft"
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
