import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SUPPORT_EMAIL } from '@/config/constants'
import { useCart } from '@/state/CartContext'
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
  const track = (event?: string, props?: Record<string, unknown>) => {
    void event
    void props
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState<'menu' | 'cart'>('menu')
  const { items, qty, subtotal, setQty, remove } = useCart()
  const { signedIn, user, signIn } = useAuth()
  // --- V2 state: promo, cart ---

  const FREE_SHIP_THRESHOLD = 40
  const cartQty = qty
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100))
  const DRAWER_WIDTH = 320

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      const inTrigger = !!menuRef.current?.contains(target)
      const inDrawer = !!drawerRef.current?.contains(target)
      if (menuOpen && !inTrigger && !inDrawer) setMenuOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [menuOpen])

  // search removed (single product) – no recent searches to load

  // lock scroll when drawer open
  useEffect(() => {
    const original = document.documentElement.style.overflow
    if (menuOpen) document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = original
    }
  }, [menuOpen])

  // esc to close + basic focus trap in drawer
  useEffect(() => {
    if (!menuOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    // Move focus to the first focusable element inside the drawer
    const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusables && focusables[0]) {
      focusables[0].focus()
    }

    const onKey = (e: KeyboardEvent) => {
      if (!menuOpen) return
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key === 'Tab' && focusables && focusables.length) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // simple keyboard support for tabs
        setActiveTab((prev) => (prev === 'menu' ? 'cart' : 'menu'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [menuOpen])

  // search logic removed

  const drawerApi = {
    openCart: () => {
      setActiveTab('cart')
      setMenuOpen(true)
    },
    openMenu: () => {
      setActiveTab('menu')
      setMenuOpen(true)
    },
  }

  // rotating promo banner messages
  const promoMessages = [
    'Fast shipping over £40',
    '30-day Luxe guarantee',
    'Secure checkout + instant tracking',
    'Buy 2, save 10%'
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

      if (menuOpen) {
        setShowHeader(true)
      } else if (current < 12) {
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
  }, [menuOpen])

  return (
    <DrawerContext.Provider value={drawerApi}>
    <div className="relative min-h-screen overflow-x-hidden bg-white text-brand-cocoa">
      {/* Top announcement bar */}
      <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative flex h-10 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.26em] sm:text-xs">
            {promoMessages.map((msg, idx) => (
              <span
                key={msg}
                className={`absolute whitespace-nowrap transition-opacity duration-400 ${idx === activePromo ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={idx !== activePromo}
              >
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="relative z-10 transition-transform duration-300 will-change-transform"
        style={{ transform: menuOpen ? `translateX(-${DRAWER_WIDTH}px)` : 'translateX(0)' }}
      >
      <header
        className={`sticky top-0 z-50 border-b border-brand-blush/40 bg-white/95 backdrop-blur transition-transform duration-250 ease-out ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-center justify-between gap-4 py-4">
            <RouterLink
              to="/"
              className="flex flex-col items-start gap-1"
            >
              <span className="font-heading text-2xl font-semibold uppercase tracking-[0.24em] text-brand-cocoa md:text-xl">
                Lumelle
              </span>
              {subtitle ? (
                <>
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-cocoa/60 md:hidden">
                    {subtitle}
                  </span>
                  <span className="hidden text-sm font-medium text-brand-cocoa/70 md:inline">
                    {subtitle}
                  </span>
                </>
              ) : null}
            </RouterLink>
            <div className="flex items-center gap-2">
              {onPrimaryAction ? (
                <>
                  <button
                    onClick={onPrimaryAction}
                    type="button"
                    className="hidden items-center justify-center gap-2 rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90 md:inline-flex"
                  >
                    {primaryLabel}
                  </button>
                  <button
                    onClick={onPrimaryAction}
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-brand-peach/60 bg-white px-3 py-1.5 text-xs font-semibold text-brand-cocoa shadow-sm transition hover:bg-brand-blush/40 md:hidden"
                  >
                    {primaryLabel}
                  </button>
                </>
              ) : null}
              <div className="relative" ref={menuRef}>
                <button
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  onClick={() => { setActiveTab('menu'); setMenuOpen(true); track('nav_open') }}
                  className="inline-flex items-center justify-center rounded-full border border-brand-blush/60 bg-white p-2 text-brand-cocoa shadow-sm hover:bg-brand-blush/30"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
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
      {/* Global drawer/overlay mounted outside content so page can shift */}
      {menuOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => { setMenuOpen(false); track('nav_close') }} />
          <aside
            className="fixed inset-y-0 right-0 z-50 overflow-y-auto border-l border-brand-blush/60 bg-white shadow-2xl transition-transform duration-300"
            style={{ width: DRAWER_WIDTH, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            ref={drawerRef}
          >
            {/* Sticky header inside drawer */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
              <div>
                <div id="drawer-title" className="font-heading text-lg uppercase tracking-[0.24em] text-brand-cocoa">Lumelle</div>
                {subtitle ? (
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">{subtitle}</div>
                ) : null}
              </div>
              <button aria-label="Close" onClick={() => { setMenuOpen(false); track('nav_close') }} className="rounded-full border border-brand-blush/60 p-2">✕</button>
            </div>
            {/* Tabs: Menu | Cart */}
            <div className="px-4 pt-3" role="tablist" aria-label="Navigation sections">
              <div className="inline-grid grid-cols-2 rounded-full border border-brand-blush/60 p-0.5 text-sm font-semibold">
                  <button
                  role="tab"
                  aria-selected={activeTab === 'menu'}
                  className={`rounded-full px-4 py-1.5 transition ${activeTab === 'menu' ? 'bg-brand-blush/50 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                  onClick={() => { setActiveTab('menu'); track('nav_tab_switch', { tab: 'menu' }) }}
                >
                  Menu
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'cart'}
                  className={`rounded-full px-4 py-1.5 transition ${activeTab === 'cart' ? 'bg-brand-blush/50 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                  onClick={() => { setActiveTab('cart'); track('nav_tab_switch', { tab: 'cart' }) }}
                >
                  Cart
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'menu' ? (
              <div className="pb-24">{/* bottom padding so sticky cart in cart-tab doesn't overlap */}
                {/* Search intentionally omitted (single product) */}

                {/* Primary navigation */}
                <nav className="px-2 py-2">
                  <RouterLink to="/" className="block h-12 rounded-xl px-3 text-sm font-medium text-brand-cocoa hover:bg-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/' }) }}>Shop</RouterLink>
                  <RouterLink to="/product/shower-cap" className="block h-12 rounded-xl px-3 text-sm font-medium text-brand-cocoa hover:bg-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/product/shower-cap' }) }}>
                    Product <span className="ml-2 rounded-full bg-brand-blush/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-cocoa/70">Best seller</span>
                  </RouterLink>
                  {/* More group */}
                  <div className="mt-1 rounded-xl">
                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa/50">More</div>
                    <RouterLink to="/affiliates" className="block h-12 rounded-xl px-3 text-sm font-medium text-brand-cocoa hover:bg-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/affiliates' }) }}>Affiliates</RouterLink>
                    <RouterLink to="/brand" className="block h-12 rounded-xl px-3 text-sm font-medium text-brand-cocoa hover:bg-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/brand' }) }}>Brand story</RouterLink>
                    <RouterLink to="/blog" className="block h-12 rounded-xl px-3 text-sm font-medium text-brand-cocoa hover:bg-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/blog' }) }}>Blog</RouterLink>
                  </div>
                </nav>

                <div className="my-4 h-px bg-brand-blush/60" />

                {/* Cart summary pill */}
                {cartQty > 0 ? (
                  <div className="px-4">
                    <button onClick={() => { setActiveTab('cart'); track('nav_tab_switch', { tab: 'cart', via: 'summary_pill' }) }} className="flex w-full items-center justify-between rounded-xl border border-brand-blush/60 px-4 py-3 text-sm text-brand-cocoa/80 hover:bg-brand-blush/30">
                      <span>Cart • {cartQty} item{cartQty === 1 ? '' : 's'}</span>
                      <span className="font-semibold text-brand-cocoa">£{subtotal.toFixed(2)}</span>
                    </button>
                  </div>
                ) : null}
                <div className="my-4 h-px bg-brand-blush/60" />

                {/* Profile block */}
                <div className="px-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Profile</p>
                  {signedIn ? (
                    <RouterLink to="/account/orders" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-between rounded-2xl border border-brand-blush/60 px-4 py-3 text-left text-sm">
                      <span className="font-semibold text-brand-cocoa">Hi, {user?.firstName}</span>
                      <span className="text-brand-cocoa/60">Orders ▸</span>
                    </RouterLink>
                  ) : (
                    <button className="w-full rounded-2xl border border-brand-blush/60 px-4 py-3 text-left text-sm text-brand-cocoa/90" onClick={() => { track('profile_signin_click'); signIn('Jane') }}>
                      Sign in or create account
                    </button>
                  )}
                </div>

                <div className="my-4 h-px bg-brand-blush/60" />
                {/* Utility links omitted for a leaner nav */}
              </div>
            ) : (
              // Cart tab
              <div className="pb-28">
                <div className="px-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Cart ({cartQty})</p>
                    <button className="rounded-full border border-brand-blush/60 px-2 py-1 text-xs text-brand-cocoa/70" onClick={() => setActiveTab('menu')}>Continue shopping</button>
                  </div>
                  {/* Progress banner */}
                  <div className="mb-2 rounded-xl bg-brand-blush/30 px-3 py-2 text-xs text-brand-cocoa/80">
                    {remainingForFreeShip > 0 ? `You are £${remainingForFreeShip.toFixed(2)} away from free shipping.` : 'You’ve unlocked free shipping!'}
                  </div>
                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-brand-blush/40">
                    <div className="h-full bg-brand-peach" style={{ width: `${freeShipProgress}%` }} />
                  </div>
                  <div className="rounded-2xl border border-brand-blush/60 p-3">
                    {items.length === 0 ? (
                      <div className="rounded-xl border border-brand-blush/60 p-3 text-sm text-brand-cocoa/70">Your cart is empty.</div>
                    ) : (
                      items.map((it) => (
                        <div key={it.id} className="mb-4 grid grid-cols-[64px_1fr_auto] items-center gap-3 last:mb-0">
                          <img src="/uploads/luminele/product-feature-05.jpg" alt={it.title} className="h-16 w-16 rounded-lg border border-brand-blush/60 object-cover" />
                          <div className="text-sm text-brand-cocoa">
                            <div className="font-medium">{it.title}</div>
                            <div className="mt-1 text-xs text-brand-cocoa/70">£{it.price.toFixed(2)} each</div>
                            <button className="mt-1 text-[11px] uppercase tracking-wide text-brand-cocoa/60" onClick={() => remove(it.id)}>Remove</button>
                          </div>
                          <div className="justify-self-end">
                            <div className="inline-flex items-center gap-2">
                              <button aria-label="Decrease quantity" className="h-8 w-8 rounded-full border border-brand-blush/60 text-sm" onClick={() => setQty(it.id, Math.max(0, it.qty - 1))}>−</button>
                              <span className="w-5 text-center text-brand-cocoa">{it.qty}</span>
                              <button aria-label="Increase quantity" className="h-8 w-8 rounded-full border border-brand-blush/60 text-sm" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Free shipping progress */}
                    <div className="mt-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-blush/40">
                        <div className="h-full bg-brand-peach transition-[width]" style={{ width: `${freeShipProgress}%` }} />
                      </div>
                      <div className="mt-1 text-center text-xs text-brand-cocoa/70">
                        {remainingForFreeShip > 0 ? `£${remainingForFreeShip.toFixed(2)} away from free shipping` : 'You’ve unlocked free shipping!'}
                      </div>
                    </div>

                    {/* Reassurance pill */}
                    <details className="mt-3">
                      <summary className="mx-auto w-max cursor-pointer select-none rounded-full border border-brand-blush/60 px-3 py-1 text-[11px] text-brand-cocoa/80">Fast shipping • Easy returns • Secure checkout</summary>
                      <div className="mt-2 text-center text-[11px] text-brand-cocoa/70">Orders ship within 24 hours. Free returns within 30 days. 256‑bit SSL secured checkout.</div>
                    </details>
                  </div>
                </div>

                {/* Sticky cart footer */}
                <div className="sticky bottom-0 z-10 mt-4 border-t border-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
                  <div className="mb-2 flex items-center justify-between text-sm text-brand-cocoa">
                    <span>Subtotal</span>
                    <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button disabled={cartQty === 0} className="flex-1 rounded-full bg-brand-peach px-4 py-2 text-sm font-semibold text-brand-cocoa shadow-soft disabled:opacity-50" onClick={() => { track('begin_checkout'); setMenuOpen(false); window.location.href = '/checkout' }}>Checkout</button>
                    <RouterLink to="/cart" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/cart', source: 'cart_footer' }) }} className="flex-1 rounded-full border border-brand-blush/60 px-4 py-2 text-center text-sm font-semibold text-brand-cocoa">View cart</RouterLink>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </>
      ) : null}
    </div>
    </DrawerContext.Provider>
  )
}
