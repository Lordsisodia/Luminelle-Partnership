import { useMemo, useState, useEffect } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useCart } from '@cart/providers/CartContext'
import { addOrder, type Order } from '@account/state/OrdersStore'
import { shopifyEnabled } from '@/lib/shopify/shopify'
import { setNoIndex } from '@/lib/seo'
import { buildCheckoutAttributionAttributes, captureEvent, initPosthogOnce } from '@/lib/analytics/posthog'
import { useUser } from '@clerk/clerk-react'
import { useAuth as useAppAuth } from '@auth/ui/providers/AuthContext'

const FREE_SHIP_THRESHOLD = 19.99
const STANDARD_SHIPPING = 3.95
export const CheckoutPage = () => {
  const { items, subtotal, qty, clear, checkoutUrl, setAttributes } = useCart()
  const { signedIn, signIn } = useAppAuth()
  const { isLoaded, isSignedIn, user } = useUser()
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || qty === 0 ? 0 : STANDARD_SHIPPING
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping])
  const [placingOrder, setPlacingOrder] = useState(false)
  const disabled = qty === 0

  const placeOrder = async () => {
    if (disabled || placingOrder) return
    // If Shopify is configured and we have a checkout URL, send shopper to Shopify checkout
    if (shopifyEnabled && checkoutUrl && typeof window !== 'undefined') {
      setPlacingOrder(true)
      try {
        captureEvent('begin_checkout', { source: 'checkout_page', href: checkoutUrl })
        await initPosthogOnce()
        const attrs = buildCheckoutAttributionAttributes()
        if (isLoaded && isSignedIn && user) {
          attrs.lumelle_user_id = user.id
          const email = user.primaryEmailAddress?.emailAddress
          if (email) attrs.lumelle_user_email = email
        }
        await Promise.race([
          setAttributes?.(attrs),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ])
        window.location.href = checkoutUrl
        return
      } catch {
        // fall through to local fallback below
        setPlacingOrder(false)
      }
    }
    setPlacingOrder(true)
    const order: Order = {
      id: `LUM-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      status: 'processing',
      items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
      subtotal,
      shipping,
      total,
      events: [
        { at: new Date().toISOString(), message: 'Order placed' },
        { at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), message: 'Processing at warehouse' },
      ],
    }
    try {
      await addOrder(order)
      clear()
      window.location.href = `/order/${order.id}/confirm`
    } finally {
      setPlacingOrder(false)
    }
  }

  useEffect(() => { setNoIndex() }, [])

  return (
    <MarketingLayout navItems={[]} subtitle="Checkout">
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 space-y-4">
          <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Order summary</div>
            <div className="mt-3 space-y-3">
              {items.length === 0 ? (
                <div className="rounded-xl border border-semantic-legacy-brand-blush/60 p-3 text-sm text-semantic-text-primary/70">Your cart is empty.</div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3">
                    <img
                      src="/uploads/luminele/product-feature-05.webp"
                      alt=""
                      className="h-14 w-14 rounded-lg border border-semantic-legacy-brand-blush/60 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex-1 text-sm text-semantic-text-primary">
                      <div className="font-medium">{it.title}</div>
                      <div className="text-semantic-text-primary/70">Qty {it.qty}</div>
                      <div className="flex items-center gap-2 text-[11px] text-semantic-text-primary/70">
                        <span className="line-through text-semantic-text-primary/50">£19.99</span>
                        <span className="font-semibold text-semantic-text-primary">£{it.price.toFixed(2)}</span>
                        <span>each</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">£{(it.price * it.qty).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 h-px bg-semantic-legacy-brand-blush/60" />
            <div className="mt-3 space-y-2 text-sm text-semantic-text-primary">
              <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-semantic-text-primary"><span>Total</span><span>£{total.toFixed(2)}</span></div>
            </div>
            <p className="mt-4 text-[11px] text-semantic-text-primary/60">Shipping, taxes, and discounts are calculated at checkout.</p>
          </div>

          <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Continue to checkout</div>
            {!signedIn ? (
              <div className="mt-3 rounded-xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/20 p-3 text-sm text-semantic-text-primary/80">
                <div className="font-semibold text-semantic-text-primary">Sign in for faster checkout</div>
                <div className="mt-1 text-semantic-text-primary/70">
                  Save addresses and payment methods so your next order is one tap.
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                  onClick={() => signIn()}
                >
                  Continue with Google
                </button>
              </div>
            ) : null}
            <button
              onClick={placeOrder}
              disabled={disabled || placingOrder}
              className="mt-4 w-full rounded-full bg-semantic-accent-cta px-5 py-3 text-sm font-semibold text-semantic-text-primary shadow-soft disabled:opacity-50"
            >
              {placingOrder ? 'Redirecting…' : 'Continue to checkout'}
            </button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default CheckoutPage
