import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { UserRound, ArrowRight } from 'lucide-react'
import { useSignIn } from '@clerk/clerk-react'
import { useCart } from '@cart/providers/CartContext'
import { useAuth } from '@auth/ui/providers/AuthContext'
import { DrawerContext } from './DrawerContext'

type DrawerProviderProps = PropsWithChildren<{
  subtitle?: string | null
}>

export const DrawerProvider = ({ children, subtitle = null }: DrawerProviderProps) => {
  const track = (event?: string, props?: Record<string, unknown>) => {
    void event
    void props
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState<'menu' | 'cart'>('menu')

  const { items, qty, subtotal, setQty, remove } = useCart()
  const { signedIn } = useAuth()
  const location = useLocation()
  const { isLoaded: signInLoaded, signIn } = useSignIn()
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

  const FREE_SHIP_THRESHOLD = 19.99
  const cartQty = qty
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100))
  const DRAWER_WIDTH = 320
  const viewersNow = useMemo(() => {
    const options = [87, 121, 205, 240, 310, 480]
    return options[Math.floor(Math.random() * options.length)]
  }, [])

  const savings = useMemo(() => {
    // Placeholder: in real setup use compare-at or discounts. For now show zero.
    return 0
  }, [])

  const upsellProducts = useMemo(
    () => [
      {
        id: 'shower-cap',
        title: 'Lumelle Shower Cap',
        price: 24.0,
        image: '/images/product.jpg',
        href: '/product/shower-cap',
      },
      {
        id: 'heatless-curler',
        title: 'Heatless Curler Set',
        price: 18.0,
        image: '/images/brand-lifestyle.jpg',
        href: '/product/satin-overnight-curler',
      },
      {
        id: 'bundle-luxe',
        title: 'Luxe Essentials Bundle',
        price: 39.0,
        image: '/images/brand-lifestyle-640.webp',
        href: '/product/luxe-essentials-bundle',
      },
    ],
    []
  )
  const [qtyOpen, setQtyOpen] = useState<string | null>(null)

  const discountForQty = (qty: number) => {
    if (qty >= 10) return 50
    if (qty >= 8) return 30
    if (qty >= 6) return 20
    if (qty >= 4) return 15
    if (qty >= 2) return 10
    return 0
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
    const original = document.documentElement.style.overflow
    if (menuOpen) document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = original
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
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
        setActiveTab((prev) => (prev === 'menu' ? 'cart' : 'menu'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [menuOpen])

  useEffect(() => {
    const onOpenCart = () => {
      setActiveTab('cart')
      setMenuOpen(true)
    }
    window.addEventListener('lumelle:open-cart', onOpenCart)
    return () => window.removeEventListener('lumelle:open-cart', onOpenCart)
  }, [])

  const drawerApi = useMemo(
    () => ({
      openCart: () => {
        setActiveTab('cart')
        setMenuOpen(true)
      },
      openMenu: () => {
        setActiveTab('menu')
        setMenuOpen(true)
      },
    }),
    []
  )

  return (
    <DrawerContext.Provider value={drawerApi}>
      {children}

      {menuOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => { setMenuOpen(false); track('nav_close') }} />
          <aside
            className="fixed inset-y-0 right-0 z-50 flex flex-col border-l border-semantic-legacy-brand-blush/60 bg-white shadow-2xl transition-transform duration-300"
            style={{ width: DRAWER_WIDTH, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            ref={drawerRef}
          >
            <div className="sticky top-0 z-10 border-b border-semantic-legacy-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <div role="tablist" aria-label="Navigation sections">
                  <div className="inline-grid grid-cols-2 rounded-full border border-semantic-legacy-brand-blush/60 p-0.5 text-sm font-semibold">
                    <button
                      role="tab"
                      aria-selected={activeTab === 'menu'}
                      className={`rounded-full px-4 py-1.5 transition ${activeTab === 'menu' ? 'bg-semantic-legacy-brand-blush/50 text-semantic-text-primary' : 'text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/30'}`}
                      onClick={() => { setActiveTab('menu'); track('nav_tab_switch', { tab: 'menu' }) }}
                    >
                      Menu
                    </button>
                    <button
                      role="tab"
                      aria-selected={activeTab === 'cart'}
                      className={`rounded-full px-4 py-1.5 transition ${activeTab === 'cart' ? 'bg-semantic-legacy-brand-blush/50 text-semantic-text-primary' : 'text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/30'}`}
                      onClick={() => { setActiveTab('cart'); track('nav_tab_switch', { tab: 'cart' }) }}
                    >
                      Cart {cartQty > 0 ? `(${cartQty})` : ''}
                    </button>
                  </div>
                </div>
                <button aria-label="Close" onClick={() => { setMenuOpen(false); track('nav_close') }} className="rounded-full border border-semantic-legacy-brand-blush/60 p-2">✕</button>
              </div>
            </div>

            <div className="flex-1">
            {activeTab === 'menu' ? (
              <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto pb-6">
                  <nav className="px-2 py-2">
                  <div className="rounded-xl">
                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/50">Products</div>
                    <RouterLink
                      to="/product/shower-cap"
                      className="block rounded-xl px-3 py-3 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40"
                      onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/product/shower-cap' }) }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="leading-tight">The Shower Cap</div>
                        <span className="ml-2 rounded-full bg-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-semantic-text-primary/70">
                          Best Seller
                        </span>
                      </div>
                    </RouterLink>
                    <RouterLink
                      to="/product/satin-overnight-curler"
                      className="mt-1 block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]"
                      onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/product/satin-overnight-curler' }) }}
                    >
                      Heatless Curler Set
                    </RouterLink>
                  </div>
                  <div className="mt-2 rounded-xl">
                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/50">More</div>
                    <RouterLink to="/creators" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/creators' }) }}>Creators</RouterLink>
                    <RouterLink to="/brand" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/brand' }) }}>Brand story</RouterLink>
                    <RouterLink to="/rewards" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/rewards' }) }}>Rewards</RouterLink>
                    <RouterLink to="/blog" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/blog' }) }}>Blog</RouterLink>
                  </div>
                </nav>

              </div>
                <div className="border-t border-semantic-legacy-brand-blush/60 bg-white/95 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Profile</p>
                  {signedIn ? (
                    <RouterLink
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center justify-between rounded-2xl bg-semantic-accent-cta px-4 py-3 text-left text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 hover:shadow-md"
                    >
                      <span className="flex items-center gap-2">
                        <UserRound className="h-5 w-5" />
                        <span className="leading-tight">
                          Account & orders
                          <span className="block text-[12px] font-medium text-semantic-text-primary/80">View history & manage details</span>
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </RouterLink>
                  ) : (
                    <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-soft">
                      <div className="flex items-center gap-2 text-sm font-semibold text-semantic-text-primary">
                        <UserRound className="h-5 w-5" />
                        <span className="leading-tight">
                          Sign in
                          <span className="block text-[12px] font-medium text-semantic-text-primary/70">
                            Track orders, save addresses, and earn rewards.
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
              <div className="h-full overflow-y-auto pb-4">
                <div className="px-4 pt-2">
                  <div className="mb-2 rounded-xl bg-semantic-legacy-brand-blush/30 px-3 py-2 text-xs text-semantic-text-primary/80">
                    {remainingForFreeShip > 0 ? `You are £${remainingForFreeShip.toFixed(2)} away from free shipping.` : 'You’ve unlocked free shipping!'}
                  </div>
                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-semantic-legacy-brand-blush/40">
                    <div className="h-full bg-semantic-accent-cta" style={{ width: `${freeShipProgress}%` }} />
                  </div>
                  <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 p-3">
                    {items.length === 0 ? (
                      <div className="rounded-xl border border-semantic-legacy-brand-blush/60 p-3 text-sm text-semantic-text-primary/70">Your cart is empty.</div>
                    ) : (
                      items.map((it) => (
                        <div key={it.id} className="relative mb-4 grid grid-cols-[80px_1fr] items-start gap-3 last:mb-0">
                          <img src="/uploads/luminele/product-feature-05.webp" alt={it.title} className="h-20 w-20 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover" />
                          <div className="text-sm text-semantic-text-primary pr-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="font-medium leading-tight">{it.title}</div>
                              <button
                                aria-label="Remove item"
                                className="mt-0.5 inline-flex h-6 w-6 items-center justify-center self-start text-semantic-text-primary/60 transition hover:text-semantic-text-primary"
                                onClick={() => remove(it.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                              </button>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-[11px] text-semantic-text-primary/70">
                              <span className="inline-flex items-center gap-1 text-amber-500" aria-label="Rating 4.8 out of 5">
                                {Array.from({ length: 5 }).map((_, idx) => {
                                  if (idx < 4) {
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
                                  const gradId = `star-grad-${it.id}`
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
                                          <stop offset="80%" stopColor="currentColor" />
                                          <stop offset="80%" stopColor="transparent" />
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
                              <span className="text-semantic-text-primary/70">103 reviews</span>
                            </div>
                            <div className="mt-3 flex items-start justify-between gap-3 relative" id={`qty-menu-${it.id}`}>
                              <div className="flex w-full flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => setQtyOpen(qtyOpen === it.id ? null : it.id)}
                                  className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft hover:bg-semantic-legacy-brand-blush/20"
                                >
                                  <span className="text-sm font-semibold">Qty: {it.qty}</span>
                                  {discountForQty(it.qty) > 0 ? (
                                    <span className="rounded-full bg-semantic-legacy-brand-blush/40 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary">
                                      Save {discountForQty(it.qty)}%
                                    </span>
                                  ) : null}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </button>
                                {qtyOpen === it.id ? (
                                  <div className="absolute z-30 mt-1 w-full max-w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.1)] overflow-hidden left-0">
                                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                                      <button
                                        key={n}
                                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${n === it.qty ? 'bg-semantic-legacy-brand-blush/30 font-semibold text-semantic-text-primary' : 'text-semantic-text-primary/80 hover:bg-semantic-legacy-brand-blush/20'}`}
                                        onClick={() => { setQty(it.id, n); setQtyOpen(null) }}
                                      >
                                        <span>{n}</span>
                                        {discountForQty(n) > 0 ? (
                                          <span className="rounded-full bg-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary">
                                            Save {discountForQty(n)}%
                                          </span>
                                        ) : (
                                          <span className="text-[11px] text-semantic-text-primary/60">—</span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                              <div className="text-right leading-tight">
                                <div className="text-sm font-semibold text-semantic-legacy-brand-cocoa">£{it.price.toFixed(2)}</div>
                                <div className="text-xs text-semantic-text-primary/50 line-through">£{(it.price * 1.3).toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>

                <div className="mt-4 px-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/70 font-sans">
                    {remainingForFreeShip > 0 ? 'You’re close to free shipping. Try these.' : 'Complete your routine'}
                  </p>
                  <div className="mt-2 space-y-3">
                    {upsellProducts.map((p) => (
                      <RouterLink
                        key={p.id}
                        to={p.href}
                        className="flex items-center gap-3 rounded-xl border border-semantic-legacy-brand-blush/60 p-3 shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                        onClick={() => { setActiveTab('menu'); setMenuOpen(false); track('cart_upsell_click', { id: p.id }) }}
                      >
                        <img src={p.image} alt={p.title} className="h-14 w-14 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover" loading="lazy" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-semantic-text-primary leading-tight">{p.title}</div>
                          <div className="text-xs text-semantic-text-primary/70">£{p.price.toFixed(2)}</div>
                        </div>
                        <span className="rounded-full bg-semantic-accent-cta px-3 py-1 text-xs font-semibold text-semantic-text-primary">Add</span>
                      </RouterLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </div>

            {activeTab === 'cart' ? (
              <div className="sticky bottom-0 z-20 space-y-2 border-t border-semantic-legacy-brand-blush/60 bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 rounded-md bg-semantic-legacy-brand-blush/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/70">
                  <span className="inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                  <span className="truncate">{viewersNow} people are checking out now</span>
                </div>
                <div className="flex items-center justify-between text-sm text-red-600/80">
                  <span>Total savings</span>
                  <span className="font-semibold text-red-700">£{savings.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-semantic-text-primary/80">
                  <span>Total</span>
                  <span className="font-semibold text-semantic-text-primary">£{subtotal.toFixed(2)}</span>
                </div>
                <button
                  className="mt-1 w-full rounded-full bg-semantic-legacy-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => track('cart_checkout')}
                >
                  Checkout
                </button>
              </div>
            ) : null}
          </aside>
        </>
      ) : null}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
