import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { UserRound, Menu } from 'lucide-react'
import { SUPPORT_EMAIL } from '@/config/constants'
import { useAuth } from '@/state/AuthContext'
import { DrawerContext } from '@/state/DrawerContext'

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
  subtitle?: string | null
}

export const MarketingLayout = ({
  children,
  navItems: _navItems,
  activeId: _activeId,
  onPrimaryAction,
  primaryLabel = 'Join WhatsApp',
  subtitle = 'Creator Program',
}: MarketingLayoutProps) => {
  void _navItems
  void _activeId
  const { signedIn } = useAuth()
  const drawerApi = { openCart: () => {}, openMenu: () => {} }

  // rotating promo banner messages
  const promoMessages = [
    { label: 'Now £15 (was £19.99) — Shop now', href: '/product/shower-cap' },
    { label: '30-day money back guarantee' },
    { label: 'Buy 2, save 10% — Shop now', href: '/product/shower-cap' },
  ]
  const [activePromo, setActivePromo] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promoMessages.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [promoMessages.length])

  // hide header on scroll down, reveal on slight scroll up
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const last = lastScrollRef.current
      const delta = current - last

      if (current < 12) {
        setShowHeader(true)
      } else if (delta > 6) {
        setShowHeader(false)
      } else if (delta < -6) {
        setShowHeader(true)
      }

      lastScrollRef.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <DrawerContext.Provider value={drawerApi}>
    <div className="relative min-h-screen overflow-x-hidden bg-white text-brand-cocoa">
      {/* Top announcement bar */}
      <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative flex h-10 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.26em] sm:text-xs">
            {promoMessages.map((msg, idx) => (
              <span
                key={msg.label}
                className={`absolute whitespace-nowrap transition-opacity duration-400 ${idx === activePromo ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={idx !== activePromo}
              >
                {msg.href ? (
                  <RouterLink to={msg.href} className="underline decoration-brand-cocoa/50 underline-offset-4 hover:text-brand-cocoa/80">
                    {msg.label}
                  </RouterLink>
                ) : (
                  msg.label
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 border-b border-brand-blush/40 bg-white/95 backdrop-blur transition-transform duration-250 ease-out ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="relative flex items-center justify-center py-4">
            <div className="absolute left-0 flex items-center gap-2">
              <button
                aria-label="Menu"
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-cocoa transition hover:bg-brand-blush/20"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <RouterLink
              to="/"
              className="flex flex-col items-center justify-center gap-1 text-center"
            >
              <span className="font-heading text-2xl font-semibold uppercase tracking-[0.24em] text-brand-cocoa md:text-xl">
                Lumelle
              </span>
              {subtitle ? (
                <>
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-brand-cocoa/60 md:hidden">
                    {subtitle}
                  </span>
                  <span className="hidden text-sm font-medium text-brand-cocoa/70 md:inline">
                    {subtitle}
                  </span>
                </>
                ) : null}
            </RouterLink>

            <div className="absolute right-0 flex items-center justify-end gap-2">
              {onPrimaryAction ? (
                <button
                  onClick={onPrimaryAction}
                  type="button"
                  className="hidden items-center justify-center gap-2 rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90 md:inline-flex"
                >
                  {primaryLabel}
                </button>
              ) : null}

              <SignedOut>
                <RouterLink
                  to="/sign-in"
                  className="hidden rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa transition hover:bg-brand-blush/40 md:inline-flex"
                >
                  Sign in
                </RouterLink>
              </SignedOut>
              <SignedIn>
                <div className="hidden md:block">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'h-10 w-10',
                      },
                    }}
                  />
                </div>
              </SignedIn>

              <RouterLink
                to={signedIn ? '/account' : '/sign-in'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-cocoa transition hover:bg-brand-blush/20"
                aria-label={signedIn ? 'Account' : 'Sign in'}
              >
                <UserRound className="h-5 w-5" />
              </RouterLink>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-brand-blush/40 bg-brand-blush/20" data-sticky-buy-target>
        <div className="mx-auto flex flex-col gap-6 px-4 py-12 md:max-w-6xl md:flex-row md:items-start md:justify-between md:px-6">
          <div>
            <p className="font-heading text-lg font-semibold uppercase tracking-[0.3em]">
              Lumelle
            </p>
            <p className="mt-2 max-w-sm text-sm text-brand-cocoa/70">
              Creator-grade shower caps designed to keep every silk press, curls, and braids flawless on camera.
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
    </DrawerContext.Provider>
  )
}
