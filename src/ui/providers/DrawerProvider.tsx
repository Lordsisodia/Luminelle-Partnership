import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { UserRound, ArrowRight } from 'lucide-react'
import { useCart } from '@cart/providers/CartContext'
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

  const FREE_SHIP_THRESHOLD = 40
  const cartQty = qty
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100))
  const DRAWER_WIDTH = 320

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
            className="fixed inset-y-0 right-0 z-50 overflow-y-auto border-l border-semantic-legacy-brand-blush/60 bg-white shadow-2xl transition-transform duration-300"
            style={{ width: DRAWER_WIDTH, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            ref={drawerRef}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
              <div>
                <div id="drawer-title" className="font-heading text-lg uppercase tracking-[0.24em] text-semantic-text-primary">Lumelle</div>
                {subtitle ? (
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">{subtitle}</div>
                ) : null}
              </div>
              <button aria-label="Close" onClick={() => { setMenuOpen(false); track('nav_close') }} className="rounded-full border border-semantic-legacy-brand-blush/60 p-2">✕</button>
            </div>
            <div className="px-4 pt-3" role="tablist" aria-label="Navigation sections">
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
                  Cart
                </button>
              </div>
            </div>

            {activeTab === 'menu' ? (
              <div className="pb-24">
                <nav className="px-2 py-2">
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
                    The Curler Set
                  </RouterLink>
                  <div className="mt-1 rounded-xl">
                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/50">More</div>
                    <RouterLink to="/creators" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/creators' }) }}>Creators</RouterLink>
                    <RouterLink to="/brand" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/brand' }) }}>Brand story</RouterLink>
                    <RouterLink to="/blog" className="block h-12 rounded-xl px-3 text-sm font-medium text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/40 leading-[48px]" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/blog' }) }}>Blog</RouterLink>
                  </div>
                </nav>

                <div className="my-4 h-px bg-semantic-legacy-brand-blush/60" />

                {cartQty > 0 ? (
                  <div className="px-4">
                    <button onClick={() => { setActiveTab('cart'); track('nav_tab_switch', { tab: 'cart', via: 'summary_pill' }) }} className="flex w-full items-center justify-between rounded-xl border border-semantic-legacy-brand-blush/60 px-4 py-3 text-sm text-semantic-text-primary/80 hover:bg-semantic-legacy-brand-blush/30">
                      <span>Cart • {cartQty} item{cartQty === 1 ? '' : 's'}</span>
                      <span className="font-semibold text-semantic-text-primary">£{subtotal.toFixed(2)}</span>
                    </button>
                  </div>
                ) : null}
                <div className="my-4 h-px bg-semantic-legacy-brand-blush/60" />

                <div className="px-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Profile</p>
                  <RouterLink
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-between rounded-2xl bg-semantic-accent-cta px-4 py-3 text-left text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 hover:shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <UserRound className="h-5 w-5" />
                      <span className="leading-tight">
                        Account & orders
                        <span className="block text-[12px] font-medium text-semantic-text-primary/80">Sign in to view history</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5" />
                  </RouterLink>
                </div>

                <div className="my-4 h-px bg-semantic-legacy-brand-blush/60" />
              </div>
            ) : (
              <div className="pb-28">
                <div className="px-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Cart ({cartQty})</p>
                    <button className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-1 text-xs text-semantic-text-primary/70" onClick={() => setActiveTab('menu')}>Continue shopping</button>
                  </div>
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
                        <div key={it.id} className="mb-4 grid grid-cols-[64px_1fr_auto] items-center gap-3 last:mb-0">
                          <img src="/uploads/luminele/product-feature-05.webp" alt={it.title} className="h-16 w-16 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover" />
                          <div className="text-sm text-semantic-text-primary">
                            <div className="font-medium">{it.title}</div>
                            <div className="mt-1 text-xs text-semantic-text-primary/70">£{it.price.toFixed(2)} each</div>
                            <button className="mt-1 text-[11px] uppercase tracking-wide text-semantic-text-primary/60" onClick={() => remove(it.id)}>Remove</button>
                          </div>
                          <div className="justify-self-end">
                            <div className="inline-flex items-center gap-2">
                              <button aria-label="Decrease quantity" className="h-8 w-8 rounded-full border border-semantic-legacy-brand-blush/60 text-sm" onClick={() => setQty(it.id, Math.max(0, it.qty - 1))}>−</button>
                              <span className="w-5 text-center text-semantic-text-primary">{it.qty}</span>
                              <button aria-label="Increase quantity" className="h-8 w-8 rounded-full border border-semantic-legacy-brand-blush/60 text-sm" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    <div className="mt-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-semantic-legacy-brand-blush/40">
                        <div className="h-full bg-semantic-accent-cta transition-[width]" style={{ width: `${freeShipProgress}%` }} />
                      </div>
                      <div className="mt-1 text-center text-xs text-semantic-text-primary/70">
                        {remainingForFreeShip > 0 ? `£${remainingForFreeShip.toFixed(2)} away from free shipping` : 'You’ve unlocked free shipping!'}
                      </div>
                    </div>

                    <details className="mt-3">
                      <summary className="mx-auto w-max cursor-pointer select-none rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1 text-[11px] text-semantic-text-primary/80">Fast shipping • Easy returns • Secure checkout</summary>
                      <div className="mt-2 text-center text-[11px] text-semantic-text-primary/70">Orders ship within 24 hours. Free returns within 30 days. 256‑bit SSL secured checkout.</div>
                    </details>
                  </div>
                </div>

                <div className="sticky bottom-0 z-10 mt-4 border-t border-semantic-legacy-brand-blush/60 bg-white/95 px-4 py-3 backdrop-blur">
                  <div className="mb-2 flex items-center justify-between text-sm text-semantic-text-primary">
                    <span>Subtotal</span>
                    <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button disabled={cartQty === 0} className="flex-1 rounded-full bg-semantic-accent-cta px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft disabled:opacity-50" onClick={() => { track('begin_checkout'); setMenuOpen(false); window.location.href = '/checkout' }}>Checkout</button>
                    <RouterLink to="/cart" onClick={() => { setMenuOpen(false); track('nav_link_click', { to: '/cart', source: 'cart_footer' }) }} className="flex-1 rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-center text-sm font-semibold text-semantic-text-primary">View cart</RouterLink>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </>
      ) : null}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
