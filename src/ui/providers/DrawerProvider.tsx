import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PropsWithChildren } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import { useSignIn, useUser } from '@clerk/clerk-react'
import { useCart } from '@client/shop/cart/providers/CartContext'
import { useAuthContext as useAuth } from '@platform/auth/providers/AuthContext'
import { getVolumeDiscountTierForVariant } from '@client/shop/cart/logic/volumeDiscounts'
import { buildCheckoutAttributionAttributes, captureEvent, initPosthogOnce } from '@/lib/analytics/posthog'
import { FREE_SHIPPING_THRESHOLD_GBP, MAX_CART_ITEM_QTY } from '@/config/constants'
import { DrawerContext } from './DrawerContext'

type DrawerProviderProps = PropsWithChildren<Record<string, unknown>>

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const reviewMeta: Record<string, { rating: number; reviews: number }> = {
    'Lumelle Shower Cap': { rating: 4.8, reviews: 187 },
    'Satin Overnight Curler Set': { rating: 4.6, reviews: 92 },
    'Luxe Essentials Bundle': { rating: 4.9, reviews: 64 },
  }
  const track = (event?: string, props?: Record<string, unknown>) => {
    void event
    void props
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerMounted, setDrawerMounted] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState<'menu' | 'cart'>('menu')
  const closeTimerRef = useRef<number | null>(null)
  const SHOW_LOYALTY = false

  const clearCloseTimer = () => {
    if (closeTimerRef.current == null) return
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  const openDrawer = () => {
    clearCloseTimer()
    setDrawerMounted(true)
    // Next frame: transition from off-canvas → visible
    window.requestAnimationFrame(() => setMenuOpen(true))
  }

  const closeDrawer = () => {
    setMenuOpen(false)
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setDrawerMounted(false)
      closeTimerRef.current = null
    }, 300)
  }

  const getDrawerFocusableElements = useCallback(() => {
    const root = drawerRef.current
    if (!root) return []

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    )

    return nodes.filter((el) => {
      if (el.hasAttribute('disabled')) return false
      if (el.getAttribute('aria-disabled') === 'true') return false
      if (el.tabIndex < 0) return false

      const style = window.getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden') return false
      return el.getClientRects().length > 0
    })
  }, [])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  const { items, qty, setQty, remove, add, checkoutUrl, setAttributes } = useCart()
  const { signedIn } = useAuth()
  const location = useLocation()
  const { isLoaded: signInLoaded, signIn } = useSignIn()
  const { user } = useUser()
  const [signInSubmitting, setSignInSubmitting] = useState(false)
  const [signInError, setSignInError] = useState<string | null>(null)

  const redirectTo = useMemo(() => {
    const target = `${location.pathname}${location.search}${location.hash}` || '/'
    return target
  }, [location.hash, location.pathname, location.search])

  const extractClerkErrorMessage = (error: unknown) => {
    if (error && typeof error === 'object' && 'errors' in error) {
      const clerkErrors = (error as { errors?: Array<{ message: string }> }).errors
      if (clerkErrors && clerkErrors[0]?.message) return clerkErrors[0].message
    }
    if (error instanceof Error) return error.message
    return 'Something went wrong — please try again.'
  }

  const handleGoogleSignIn = async () => {
    if (!signInLoaded || !signIn) return
    if (signInSubmitting) return
    setSignInSubmitting(true)
    setSignInError(null)
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: redirectTo,
      })
    } catch (err) {
      const message = extractClerkErrorMessage(err)
      console.error('Google sign-in failed', err)
      setSignInError(message)
      setSignInSubmitting(false)
    }
  }

  const cartQty = qty
  const DRAWER_WIDTH = 320

  const [redirecting, setRedirecting] = useState(false)
  const beginCheckout = useCallback(async () => {
    if (!checkoutUrl || redirecting) return
    setRedirecting(true)
    captureEvent('begin_checkout', { source: 'drawer', href: checkoutUrl })
    try {
      await initPosthogOnce()
      const attrs = buildCheckoutAttributionAttributes()
      await Promise.race([
        setAttributes?.(attrs),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ])
    } finally {
      window.location.href = checkoutUrl
    }
  }, [checkoutUrl, redirecting, setAttributes])
  const loyaltyPoints = SHOW_LOYALTY
    ? useMemo(() => {
        const raw = user?.publicMetadata?.loyaltyPoints
        return typeof raw === 'number' ? raw : 0
      }, [user?.publicMetadata?.loyaltyPoints])
    : 0
  const nextTier = 500
  const loyaltyProgress = SHOW_LOYALTY ? Math.min(100, Math.round((loyaltyPoints / nextTier) * 100)) : 0

  const upsellProducts = useMemo(
    () => [
      {
        variantId: 'gid://shopify/ProductVariant/56829020504438',
        id: 'shower-cap',
        title: 'Lumelle Shower Cap',
        price: 14.99,
        image: '/uploads/luminele/product-feature-05.webp',
        href: '/product/lumelle-shower-cap',
      },
      {
        variantId: 'gid://shopify/ProductVariant/56852779696502',
        id: 'heatless-curler',
        title: 'Satin Overnight Curler Set',
        price: 16.99,
        image: '/uploads/curler/3.webp',
        href: '/product/satin-overnight-curler',
      },
    ],
    []
  )
  const cartIds = useMemo(() => new Set(items.map((i) => i.id)), [items])
  const filteredUpsells = useMemo(() => {
    return upsellProducts.filter((p) => !cartIds.has(p.variantId))
  }, [upsellProducts, cartIds])

  const renderUpsellCard = useCallback(
    (p: typeof upsellProducts[number]) => {
      return (
        <div
          key={p.id}
          className="relative flex items-center gap-3 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-soft"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-14 w-14 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-1 text-left pr-16">
            <div className="text-sm font-semibold text-semantic-text-primary leading-tight">{p.title}</div>
            <div className="mt-1 text-xs font-semibold text-semantic-text-primary">£{p.price.toFixed(2)}</div>
          </div>
          <button
            onClick={() => add({ id: p.variantId, title: p.title, price: p.price, image: p.image }, 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full border border-semantic-legacy-brand-cocoa px-3 py-1 text-xs font-semibold text-semantic-legacy-brand-cocoa hover:bg-semantic-legacy-brand-blush/30"
          >
            Add
          </button>
        </div>
      )
    },
    [add]
  )

  const getUnitPricing = useCallback(
    (item: { id: string; price: number; displayPrice?: number; compareAt?: number; displayCompareAt?: number }) => {
      const unitPrice = item.displayPrice ?? item.price
      const unitCompareAt = item.displayCompareAt ?? item.compareAt
      const hasCompareAt =
        typeof unitCompareAt === 'number' && Number.isFinite(unitCompareAt) && unitCompareAt > unitPrice
      return { unitPrice, unitCompareAt, hasCompareAt }
    },
    []
  )

  const displaySubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const { unitPrice } = getUnitPricing(item)
      return sum + unitPrice * item.qty
    }, 0)
  }, [getUnitPricing, items])

  const displayCompareAtTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const { unitPrice, unitCompareAt, hasCompareAt } = getUnitPricing(item)
      const compareAtForLine = hasCompareAt ? (unitCompareAt as number) : unitPrice
      return sum + compareAtForLine * item.qty
    }, 0)
  }, [getUnitPricing, items])

  const savings = useMemo(() => {
    return Math.max(0, displayCompareAtTotal - displaySubtotal)
  }, [displayCompareAtTotal, displaySubtotal])

  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD_GBP - displaySubtotal)
  const freeShipProgress = Math.min(100, Math.round((displaySubtotal / FREE_SHIPPING_THRESHOLD_GBP) * 100))
  const [qtyOpen, setQtyOpen] = useState<string | null>(null)

  const handleDrawerTabKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return

    const tabList = e.currentTarget
    const activeEl = document.activeElement as HTMLElement | null
    if (!activeEl || !tabList.contains(activeEl)) return

    const tabs = Array.from(tabList.querySelectorAll<HTMLElement>('[role="tab"]'))
    const currentIndex = tabs.findIndex((t) => t === activeEl)
    if (currentIndex === -1) return

    const direction = e.key === 'ArrowLeft' ? -1 : 1
    const next = tabs[(currentIndex + direction + tabs.length) % tabs.length]
    const nextTab = next.dataset.tab === 'cart' ? 'cart' : next.dataset.tab === 'menu' ? 'menu' : null
    if (!nextTab) return

    e.preventDefault()
    setActiveTab(nextTab)
    track('nav_tab_switch', { tab: nextTab, via: 'keyboard' })
    next.focus()
  }

  useEffect(() => {
    if (!qtyOpen) return
    const currentId = `qty-menu-${qtyOpen}`
    const onClick = (e: MouseEvent) => {
      const menu = document.getElementById(currentId)
      if (menu && !menu.contains(e.target as Node)) {
        setQtyOpen(null)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [qtyOpen])

  useEffect(() => {
    const root = document.documentElement
    const originalOverflow = root.style.overflow
    const originalPaddingRight = root.style.paddingRight

    if (drawerMounted) {
      // On platforms with persistent scrollbars, `overflow:hidden` removes the scrollbar and can
      // shift the layout horizontally. Compensate by adding padding equal to the scrollbar width.
      const scrollbarWidth = window.innerWidth - root.clientWidth
      root.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        const basePadding = originalPaddingRight?.trim() ? originalPaddingRight : '0px'
        root.style.paddingRight = `calc(${basePadding} + ${scrollbarWidth}px)`
      }
    }
    return () => {
      root.style.overflow = originalOverflow
      root.style.paddingRight = originalPaddingRight
    }
  }, [drawerMounted])

  useEffect(() => {
    if (!menuOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    getDrawerFocusableElements()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (!menuOpen) return
      if (e.key === 'Escape') {
        closeDrawer()
        return
      }
      if (e.key === 'Tab') {
        const focusables = getDrawerFocusableElements()
        if (!focusables.length) return

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
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [getDrawerFocusableElements, menuOpen])

  useEffect(() => {
    const onOpenCart = () => {
      setActiveTab('cart')
      openDrawer()
    }
    window.addEventListener('lumelle:open-cart', onOpenCart)
    return () => window.removeEventListener('lumelle:open-cart', onOpenCart)
  }, [])

  const drawerApi = useMemo(
    () => ({
      openCart: () => {
        setActiveTab('cart')
        openDrawer()
      },
      openMenu: () => {
        setActiveTab('menu')
        openDrawer()
      },
    }),
    []
  )

  return (
    <DrawerContext.Provider value={drawerApi}>
      {children}

      {drawerMounted ? (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => { closeDrawer(); track('nav_close') }}
          />
          <aside
            className="fixed inset-y-0 right-0 z-50 flex flex-col border-l border-semantic-legacy-brand-blush/60 bg-white shadow-2xl transition-transform duration-300"
            style={{ width: DRAWER_WIDTH, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            aria-hidden={menuOpen ? undefined : true}
            ref={drawerRef}
          >
            <h2 id="drawer-title" className="sr-only">
              Menu and cart
            </h2>
            <div className="sticky top-0 z-10 border-b border-semantic-legacy-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <div role="tablist" aria-label="Navigation sections" onKeyDown={handleDrawerTabKeyDown}>
                  <div className="inline-grid grid-cols-2 rounded-full border border-semantic-legacy-brand-blush/60 p-0.5 text-sm font-semibold">
                    <button
                      role="tab"
                      data-tab="menu"
                      aria-selected={activeTab === 'menu'}
                      aria-controls="drawer-panel-menu"
                      id="drawer-tab-menu"
                      tabIndex={activeTab === 'menu' ? 0 : -1}
                      type="button"
                      className={`rounded-full px-4 py-1.5 transition ${activeTab === 'menu' ? 'bg-semantic-legacy-brand-blush/50 text-semantic-text-primary' : 'text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/30'}`}
                      onClick={() => { setActiveTab('menu'); track('nav_tab_switch', { tab: 'menu' }) }}
                    >
                      Menu
                    </button>
                    <button
                      role="tab"
                      data-tab="cart"
                      aria-selected={activeTab === 'cart'}
                      aria-controls="drawer-panel-cart"
                      id="drawer-tab-cart"
                      tabIndex={activeTab === 'cart' ? 0 : -1}
                      type="button"
                      className={`rounded-full px-4 py-1.5 transition ${activeTab === 'cart' ? 'bg-semantic-legacy-brand-blush/50 text-semantic-text-primary' : 'text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/30'}`}
                      onClick={() => { setActiveTab('cart'); track('nav_tab_switch', { tab: 'cart' }) }}
                    >
                      Cart {cartQty > 0 ? `(${cartQty})` : ''}
                    </button>
                  </div>
                </div>
                <button aria-label="Close" onClick={() => { closeDrawer(); track('nav_close') }} className="rounded-full border border-semantic-legacy-brand-blush/60 p-2">✕</button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
            {activeTab === 'menu' ? (
              <div id="drawer-panel-menu" role="tabpanel" aria-labelledby="drawer-tab-menu" className="flex h-full flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-none pb-4">
                  <nav className="px-2 py-2">
                  <div className="rounded-xl">
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/50">Products</div>
                    <RouterLink
                      to="/product/shower-cap"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { closeDrawer(); track('nav_link_click', { to: '/product/shower-cap' }) }}
                    >
                      <div className="leading-tight">
                        <div>Lumelle Shower Cap</div>
                        <div className="text-xs font-medium text-semantic-text-primary/60 whitespace-nowrap">Satin-lined, steam-blocking</div>
                      </div>
                      <span className="ml-2 rounded-full bg-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-semantic-text-primary/70 whitespace-nowrap">
                        Best Seller
                      </span>
                    </RouterLink>
                    <RouterLink
                      to="/product/satin-overnight-curler"
                      className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { closeDrawer(); track('nav_link_click', { to: '/product/satin-overnight-curler' }) }}
                    >
                      <div className="leading-tight">
                        <div>Satin Overnight Heatless Curler Set</div>
                        <div className="text-xs font-medium text-semantic-text-primary/60">Crease-free curls while you sleep</div>
                      </div>
                    </RouterLink>
                  </div>
                  <div className="mt-2 rounded-xl">
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/50">More</div>
                    <RouterLink
                      to="/creators"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { closeDrawer(); track('nav_link_click', { to: '/creators' }) }}
                    >
                      <div className="flex flex-col leading-tight">
                        <span>Creators</span>
                        <span className="text-xs font-medium text-semantic-text-primary/60">Collabs, scripts, and payouts</span>
                      </div>
                      <span className="text-semantic-text-primary/60">›</span>
                    </RouterLink>
                    <RouterLink
                      to="/brand"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { closeDrawer(); track('nav_link_click', { to: '/brand' }) }}
                    >
                      <div className="flex flex-col leading-tight">
                        <span>Brand story</span>
                        <span className="text-xs font-medium text-semantic-text-primary/60">Origins, values, and build</span>
                      </div>
                      <span className="text-semantic-text-primary/60">›</span>
                    </RouterLink>
                    <RouterLink
                      to="/blog"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { closeDrawer(); track('nav_link_click', { to: '/blog' }) }}
                    >
                      <div className="flex flex-col leading-tight">
                        <span>Blog</span>
                        <span className="text-xs font-medium text-semantic-text-primary/60">Care tips, launches, routines</span>
                      </div>
                      <span className="text-semantic-text-primary/60">›</span>
                    </RouterLink>
                  </div>
                </nav>

              </div>
	                <div className="border-t border-semantic-legacy-brand-blush/60 bg-white/95 px-4 pb-[calc(1.2rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
	                  {signedIn ? (
	                    <div className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-soft">
	                      <div className="flex items-center gap-3">
	                        {user?.imageUrl ? (
	                          <img
	                            src={user.imageUrl}
	                            alt={user.fullName ? `${user.fullName} profile photo` : 'Profile photo'}
	                            className="h-10 w-10 rounded-full object-cover"
	                          />
	                        ) : (
	                          <div
	                            className="flex h-10 w-10 items-center justify-center rounded-full bg-semantic-legacy-brand-blush/40 text-sm font-semibold text-semantic-text-primary"
	                            aria-hidden
	                          >
	                            {(user?.firstName ?? user?.fullName ?? 'U').slice(0, 1).toUpperCase()}
	                          </div>
	                        )}
	                        <div className="flex-1 leading-tight">
	                          <div className="text-sm font-semibold text-semantic-text-primary">
	                            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
	                          </div>
                          <RouterLink
                            to="/account"
                            onClick={() => closeDrawer()}
                            className="text-[12px] font-medium text-semantic-text-primary/70 underline decoration-semantic-text-primary/40 underline-offset-4"
                          >
                            View account & orders
                          </RouterLink>
                        </div>
                      </div>
                      {SHOW_LOYALTY && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-semantic-text-primary/70">
                            <span>Points</span>
                            <span>{loyaltyPoints} pts</span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-semantic-legacy-brand-blush/40">
                            <div className="h-full rounded-full bg-semantic-accent-cta" style={{ width: `${loyaltyProgress}%` }} />
                          </div>
                          <div className="mt-1 text-[11px] text-semantic-text-primary/60">
                            {loyaltyPoints >= nextTier
                              ? 'You have rewards ready to redeem.'
                              : `${nextTier - loyaltyPoints} pts to next perk.`}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-soft">
                      <div className="flex items-center gap-2 text-sm font-semibold text-semantic-text-primary">
                        <UserRound className="h-5 w-5" />
                        <span className="leading-tight">
                          Sign in
                          <span className="block text-[12px] font-medium text-semantic-text-primary/70">
                            Track orders, save addresses, and check out faster.
                          </span>
                        </span>
                      </div>

                      {signInError ? (
                        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{signInError}</p>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => { void handleGoogleSignIn() }}
                        disabled={!signInLoaded || signInSubmitting}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 disabled:opacity-60"
                      >
                        <img
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                          alt=""
                          className="h-4 w-4"
                        />
                        {signInSubmitting ? 'Redirecting…' : 'Continue with Google'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div id="drawer-panel-cart" role="tabpanel" aria-labelledby="drawer-tab-cart" className="flex-1 min-h-0 overflow-y-auto overscroll-none pb-4">
                <div className="px-4 pt-2">
                  <div className="mb-2 rounded-xl bg-semantic-legacy-brand-blush/30 px-3 py-2 text-xs text-semantic-text-primary/80">
                    {remainingForFreeShip > 0 ? `You are £${remainingForFreeShip.toFixed(2)} away from free shipping.` : 'You’ve unlocked free shipping!'}
                  </div>
                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-semantic-legacy-brand-blush/40">
                    <div className="h-full bg-semantic-accent-cta" style={{ width: `${freeShipProgress}%` }} />
                  </div>
                  <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 p-3">
                    {items.length === 0 ? (
                      <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-5 text-center shadow-soft">
                        <p className="text-sm font-semibold text-semantic-text-primary">Your cart is empty.</p>
                        <p className="mt-1 text-xs text-semantic-text-primary/70">Add a bestseller to unlock free shipping faster.</p>
                      </div>
                    ) : (
                      items.map((it) => {
                        const displayTitle = it.title === 'Heatless Curler Set' ? 'Satin Overnight Curler Set' : it.title
                        return (
                          <div key={it.id} className="relative mb-4 grid grid-cols-[96px_1fr] items-start gap-3 last:mb-0">
                            <img src={it.image ?? '/uploads/luminele/product-feature-05.webp'} alt={displayTitle} className="h-24 w-24 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover" />
                            <div className="text-sm text-semantic-text-primary">
                              <div className="flex items-start gap-2">
                                <div className="flex-1 font-medium leading-tight">{displayTitle}</div>
                                <button
                                  aria-label="Remove item"
                                  className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-semantic-text-primary/60 transition hover:text-semantic-text-primary"
                                  onClick={() => remove(it.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                                </button>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-[11px] text-semantic-text-primary/70">
                                <span className="inline-flex items-center gap-1 text-amber-500" aria-label={`Rating ${reviewMeta[displayTitle]?.rating ?? it.rating ?? 4.8} out of 5`}>
                                  {Array.from({ length: 5 }).map((_, idx) => {
                                    const rating = reviewMeta[displayTitle]?.rating ?? it.rating ?? 4.8
                                    const fullStars = Math.floor(rating)
                                    const remainder = Math.max(0, Math.min(1, rating - fullStars))
                                    if (idx < fullStars) {
                                      return (
                                        <svg
                                          key={idx}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="12"
                                          height="12"
                                          fill="currentColor"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                        >
                                          <path d="M12 2.5l2.9 6.1 6.6.6-5 4.5 1.5 6.5L12 16.8 6 20.2l1.5-6.5-5-4.5 6.6-.6z" />
                                        </svg>
                                      )
                                    }
                                    const gradId = `star-grad-${it.id}-${idx}`
                                    return (
                                      <svg
                                        key={idx}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="12"
                                        height="12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      >
                                        <defs>
                                          <linearGradient id={gradId}>
                                            <stop offset={`${remainder * 100}%`} stopColor="currentColor" />
                                            <stop offset={`${remainder * 100}%`} stopColor="transparent" />
                                          </linearGradient>
                                        </defs>
                                        <path
                                          d="M12 2.5l2.9 6.1 6.6.6-5 4.5 1.5 6.5L12 16.8 6 20.2l1.5-6.5-5-4.5 6.6-.6z"
                                          fill={`url(#${gradId})`}
                                        />
                                      </svg>
                                    )
                                  })}
                                </span>
                                <span className="text-semantic-text-primary/70">{reviewMeta[displayTitle]?.reviews ?? it.reviewsCount ?? 103} reviews</span>
                              </div>
                              <div className="mt-3 flex items-start justify-between gap-3 relative" id={`qty-menu-${it.id}`}>
                                <div className="flex w-full flex-col gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setQtyOpen(qtyOpen === it.id ? null : it.id)}
                                    className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft hover:bg-semantic-legacy-brand-blush/20"
                                  >
                                    <span className="text-sm font-semibold">Qty: {it.qty}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                  </button>
                                  {qtyOpen === it.id ? (
                                    <div className="absolute z-30 mt-1 w-full max-w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.1)] overflow-hidden left-0">
                                      {Array.from({ length: MAX_CART_ITEM_QTY }, (_, i) => i + 1).map((n) => (
                                        <button
                                          key={n}
                                          className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${n === it.qty ? 'bg-semantic-legacy-brand-blush/30 font-semibold text-semantic-text-primary' : 'text-semantic-text-primary/80 hover:bg-semantic-legacy-brand-blush/20'}`}
                                          onClick={() => { setQty(it.id, n); setQtyOpen(null) }}
                                        >
                                          <span>{n}</span>
                                          {(() => {
                                            const tier = getVolumeDiscountTierForVariant(it.id, n)
                                            if (!tier) return null
                                            return (
                                              <span className="rounded-full bg-semantic-legacy-brand-blush/50 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary/70">
                                                {tier.badge}
                                              </span>
                                            )
                                          })()}
                                        </button>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="text-right leading-tight">
                                  {(() => {
                                    const { unitPrice, unitCompareAt, hasCompareAt } = getUnitPricing(it)
                                    return (
                                      <>
                                        <div className="text-sm font-semibold text-semantic-legacy-brand-cocoa">£{unitPrice.toFixed(2)}</div>
                                        {hasCompareAt ? (
                                          <div className="text-xs text-semantic-text-primary/50 line-through">£{(unitCompareAt as number).toFixed(2)}</div>
                                        ) : null}
                                      </>
                                    )
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}

                  </div>
                </div>

                <div className="mt-4 px-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/70 font-sans">
                    {remainingForFreeShip > 0 ? 'You’re close to free shipping. Try these.' : 'Complete your routine'}
                  </p>
                  {filteredUpsells.length > 0 ? (
                    <div className="mt-2 space-y-3">
                      {filteredUpsells.map((p) => renderUpsellCard(p))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            </div>

            {activeTab === 'cart' ? (
              <div className="sticky bottom-0 z-20 space-y-2 border-t border-semantic-legacy-brand-blush/60 bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 rounded-md bg-semantic-legacy-brand-blush/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-semantic-text-primary/70">
                  <span className="inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                  <span className="truncate">
                    {remainingForFreeShip > 0
                      ? `£${remainingForFreeShip.toFixed(2)} to free shipping`
                      : 'Free shipping unlocked'}
                  </span>
                </div>
                {savings > 0 ? (
                  <div className="flex items-center justify-between text-sm text-red-600/80">
                    <span>Total savings</span>
                    <span className="font-semibold text-red-700">£{savings.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between text-sm text-semantic-text-primary/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-semantic-text-primary">£{displaySubtotal.toFixed(2)}</span>
                </div>
                <button
                  className="mt-1 w-full rounded-full bg-semantic-legacy-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft transition disabled:cursor-not-allowed disabled:opacity-70 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md"
                  disabled={!checkoutUrl || redirecting || items.length === 0}
                  onClick={beginCheckout}
                >
                  {redirecting ? 'Redirecting…' : checkoutUrl ? 'Checkout' : 'Checkout coming soon'}
                </button>
                {!checkoutUrl && items.length > 0 ? (
                  <p className="text-center text-xs text-semantic-text-primary/60">
                    Checkout is being configured on this storefront.
                  </p>
                ) : null}
              </div>
            ) : null}
          </aside>
        </>
      ) : null}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
