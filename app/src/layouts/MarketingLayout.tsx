import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SUPPORT_EMAIL } from '@/config/constants'

export type NavItem = {
  id: string
  label: string
}

type MarketingLayoutProps = {
  children: ReactNode
  navItems: NavItem[]
  activeId?: string
  onPrimaryAction?: () => void
  primaryLabel?: string
}

export const MarketingLayout = ({
  children,
  navItems,
  activeId,
  onPrimaryAction,
  primaryLabel = 'Join WhatsApp',
}: MarketingLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-brand-cocoa">
      <header className="sticky top-0 z-50 border-b border-brand-blush/40 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <RouterLink to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-semibold uppercase tracking-[0.24em] text-brand-cocoa">
              Lumelle
            </span>
            <span className="hidden text-sm font-medium text-brand-cocoa/70 md:inline">
              Creator Program
            </span>
          </RouterLink>
          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden items-center gap-4 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    activeId === item.id
                      ? 'bg-brand-peach/20 text-brand-cocoa'
                      : 'text-brand-cocoa/70 hover:text-brand-cocoa'
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-peach/50 px-4 py-2 text-sm font-medium text-brand-cocoa shadow-sm transition-colors hover:border-brand-peach hover:bg-brand-peach/20 md:hidden"
            >
              Menu
              <span className="text-xs text-brand-cocoa/70">
                {isMenuOpen ? 'Close' : 'Open'}
              </span>
            </button>
            {onPrimaryAction ? (
              <button
                onClick={onPrimaryAction}
                type="button"
                className="hidden items-center justify-center gap-2 rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90 md:inline-flex"
              >
                {primaryLabel}
              </button>
            ) : null}
          </div>
        </div>
        {isMenuOpen ? (
          <div className="border-t border-brand-blush/40 bg-white md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-2xl px-4 py-3 text-left text-base font-medium transition-colors ${
                    activeId === item.id
                      ? 'bg-brand-peach/20 text-brand-cocoa'
                      : 'text-brand-cocoa/80 hover:bg-brand-peach/10'
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
              {onPrimaryAction ? (
                <button
                  onClick={onPrimaryAction}
                  type="button"
                  className="mt-2 w-full rounded-full bg-brand-peach px-4 py-3 text-base font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90"
                >
                  {primaryLabel}
                </button>
              ) : null}
            </nav>
          </div>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-brand-blush/40 bg-brand-blush/20">
        <div className="mx-auto flex flex-col gap-6 px-4 py-12 md:max-w-6xl md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-heading text-lg font-semibold uppercase tracking-[0.3em]">
              Lumelle
            </p>
            <p className="mt-2 max-w-sm text-sm text-brand-cocoa/70">
              Luxury creator community helping you earn more with every piece of
              content you share.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-brand-cocoa/70 md:items-end">
            <RouterLink to="/terms" className="hover:text-brand-cocoa">
              Terms &amp; Conditions
            </RouterLink>
            <RouterLink to="/privacy" className="hover:text-brand-cocoa">
              Privacy Policy
            </RouterLink>
            <RouterLink to="/brief" className="hover:text-brand-cocoa">
              Content Brief
            </RouterLink>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="hover:text-brand-cocoa"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
