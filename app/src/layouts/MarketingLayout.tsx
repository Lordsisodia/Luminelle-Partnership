import type { ReactNode } from 'react'
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
  const handleNavClick = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-brand-cocoa">
      <header className="sticky top-0 z-50 border-b border-brand-blush/40 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 py-4 md:flex-row md:justify-between md:gap-6">
            <RouterLink
              to="/"
              className="flex flex-col items-center gap-1 text-center md:flex-row md:items-center md:gap-2 md:text-left"
            >
              <span className="font-heading text-2xl font-semibold uppercase tracking-[0.24em] text-brand-cocoa md:text-xl">
                Lumelle
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-cocoa/60 md:hidden">
                Creator Program
              </span>
              <span className="hidden text-sm font-medium text-brand-cocoa/70 md:inline">
                Creator Program
              </span>
            </RouterLink>
            <div className="hidden items-center gap-6 md:flex">
              <nav className="flex items-center gap-4">
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
              {onPrimaryAction ? (
                <button
                  onClick={onPrimaryAction}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90"
                >
                  {primaryLabel}
                </button>
              ) : null}
            </div>
          </div>
          <nav className="flex w-full items-center justify-center gap-3 overflow-x-auto pb-4 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeId === item.id
                    ? 'bg-brand-peach/30 text-brand-cocoa shadow-soft'
                    : 'bg-white/80 text-brand-cocoa/70 hover:text-brand-cocoa'
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
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
