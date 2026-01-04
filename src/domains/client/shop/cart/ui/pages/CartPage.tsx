import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { useCart } from '@client/shop/cart/providers/CartContext'
import { buildCheckoutAttributionAttributes, captureEvent, initPosthogOnce } from '@/lib/analytics/posthog'
import { FREE_SHIPPING_THRESHOLD_GBP, MAX_CART_ITEM_QTY } from '@/config/constants'

const STANDARD_SHIPPING = 3.95
const FALLBACK_ITEM_IMAGE = '/uploads/luminele/product-feature-05.webp'

const EmptyCartState = () => (
  <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 text-center text-semantic-text-primary/70">
    <p>Your cart is empty.</p>
    <RouterLink
      to="/product/lumelle-shower-cap"
      className="mt-4 inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-2.5 text-sm font-semibold text-white"
    >
      Browse the shop
    </RouterLink>
  </div>
)

export const CartPage = () => {
  const { items, subtotal, setQty, remove, checkoutUrl, checkoutCapabilities, checkoutStart, discountCode, applyDiscount, setAttributes } = useCart()
  const [promo, setPromo] = useState(discountCode ?? '')
  const [redirecting, setRedirecting] = useState(false)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_GBP || items.length === 0 ? 0 : STANDARD_SHIPPING
  const total = subtotal + shipping
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD_GBP - subtotal)
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_GBP) * 100))

  const beginCheckout = async (url: string) => {
    if (!url || redirecting) return
    setRedirecting(true)
    captureEvent('begin_checkout', { source: 'cart_page', href: url })
    try {
      await initPosthogOnce()
      const attrs = buildCheckoutAttributionAttributes()
      // Best-effort: don't block checkout forever if the provider is slow.
      await Promise.race([
        setAttributes?.(attrs),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ])
    } finally {
      window.location.href = url
    }
  }

  const checkoutLabel = checkoutCapabilities?.providerLabel ?? 'Secure checkout'
  const checkoutDisabledReason = checkoutStart?.mode === 'none' ? checkoutStart.reason : undefined

  return (
    <>
      <Seo title="Cart" description="Review your cart and continue to checkout." url={toPublicUrl('/cart')} type="website" />
      <MarketingLayout navItems={[]} subtitle="Cart">
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl gap-8 px-4 py-12 md:grid md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div className="space-y-4">
            <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/20 p-4 text-sm text-semantic-text-primary">
              {remainingForFreeShip > 0 ? (
                <p>£{remainingForFreeShip.toFixed(2)} away from free UK shipping.</p>
              ) : (
                <p>You’ve unlocked free UK shipping!</p>
              )}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-semantic-legacy-brand-blush/40">
                <div className="h-full bg-semantic-accent-cta transition-[width]" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {items.length === 0 ? (
              <EmptyCartState />
            ) : (
              <div className="space-y-3">
                {items.map((item) => {
                  const unitPrice = item.displayPrice ?? item.price
                  const compareAt = item.displayCompareAt ?? item.compareAt
                  const showCompareAt = typeof compareAt === 'number' && Number.isFinite(compareAt) && compareAt > unitPrice
                  const lineTotal = unitPrice * item.qty
                  const imageSrc = item.image ?? FALLBACK_ITEM_IMAGE

                  return (
                    <article
                      key={item.id}
                      className="grid grid-cols-[80px_1fr_auto] gap-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-sm"
                    >
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="h-20 w-20 rounded-xl border border-semantic-legacy-brand-blush/40 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="text-sm text-semantic-text-primary">
                      <p className="font-semibold">{item.title}</p>
                      <p className="flex items-center gap-2 text-semantic-text-primary/70">
                        {showCompareAt ? (
                          <span className="line-through text-semantic-text-primary/50">£{compareAt.toFixed(2)}</span>
                        ) : null}
                        <span className="font-semibold text-semantic-text-primary">£{unitPrice.toFixed(2)}</span>
                        <span>each</span>
                      </p>
                      <button className="mt-2 text-[11px] uppercase tracking-[0.25em] text-semantic-text-primary/60" onClick={() => remove(item.id)}>
                        Remove
                      </button>
                    </div>
                    <div className="justify-self-end">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${item.title}`}
                          className="h-8 w-8 rounded-full border border-semantic-legacy-brand-blush/60"
                          onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-semantic-text-primary">{item.qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${item.title}`}
                          className="h-8 w-8 rounded-full border border-semantic-legacy-brand-blush/60 disabled:opacity-50"
                          onClick={() => setQty(item.id, Math.min(MAX_CART_ITEM_QTY, item.qty + 1))}
                          disabled={item.qty >= MAX_CART_ITEM_QTY}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2 text-right text-sm font-semibold">£{lineTotal.toFixed(2)}</div>
                    </div>
                  </article>
                  )
                })}
              </div>
            )}
          </div>

          <aside className="mt-8 space-y-4 md:mt-0">
            <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Order summary</p>
              <div className="mt-4 space-y-3 text-sm text-semantic-text-primary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <div className="flex gap-2">
                  <label htmlFor="promo-code" className="sr-only">
                    Promo code
                  </label>
                  <input
                    id="promo-code"
                    name="promo-code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm"
                    inputMode="text"
                    autoCapitalize="characters"
                  />
                  <button
                    type="button"
                    className="rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary disabled:opacity-60"
                    onClick={() => applyDiscount?.(promo)}
                    disabled={!promo.trim()}
                  >
                    Apply
                  </button>
                </div>
                {discountCode ? (
                  <p className="text-xs text-semantic-text-primary/60">
                    Saved code: <span className="font-semibold">{discountCode}</span>. It will be applied when checkout is available.
                  </p>
                ) : null}
              </div>
              {items.length > 0 && checkoutUrl ? (
                <button
                  type="button"
                  data-checkout-url
                  onClick={() => void beginCheckout(checkoutUrl)}
                  disabled={redirecting}
                  className="mt-5 block w-full rounded-full bg-semantic-legacy-brand-cocoa px-5 py-3 text-center text-sm font-semibold text-white hover:-translate-y-0.5 transition disabled:opacity-60"
                >
                  {redirecting ? `Opening ${checkoutLabel.toLowerCase()}…` : checkoutLabel}
                </button>
              ) : items.length > 0 ? (
                <button
                  type="button"
                  disabled
                  className="mt-5 block w-full rounded-full bg-semantic-legacy-brand-cocoa/60 px-5 py-3 text-center text-sm font-semibold text-white opacity-80 cursor-not-allowed"
                >
                  {checkoutDisabledReason ? 'Checkout unavailable' : 'Preparing checkout…'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 block w-full rounded-full bg-semantic-legacy-brand-cocoa/40 px-5 py-3 text-center text-sm font-semibold text-white opacity-80 cursor-not-allowed"
                >
                  Proceed to checkout
                </button>
              )}
              <p className="mt-3 text-center text-xs text-semantic-text-primary/60">
                Need help? <RouterLink to="/returns" className="underline">View returns</RouterLink> or <RouterLink to="/order/track" className="underline">track an order</RouterLink>.
              </p>
            </div>
            {checkoutUrl ? (
              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 text-semantic-text-primary/80">
                <p className="text-sm font-semibold">{checkoutLabel}</p>
                <p className="text-xs text-semantic-text-primary/60">256-bit SSL. Major cards accepted.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 text-semantic-text-primary/80">
                <p className="text-sm font-semibold">Checkout status</p>
                <p className="text-xs text-semantic-text-primary/60">
                  {checkoutDisabledReason ? checkoutDisabledReason : 'Preparing a checkout session…'}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
      </MarketingLayout>
    </>
  )
}

export default CartPage
