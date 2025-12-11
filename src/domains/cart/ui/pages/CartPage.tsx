import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useCart } from '@cart/providers/CartContext'
import { setNoIndex } from '@/lib/seo'

const FREE_SHIP_THRESHOLD = 40
const STANDARD_SHIPPING = 3.95

const EmptyCartState = () => (
  <div className="rounded-2xl border border-brand-blush/60 bg-white p-6 text-center text-brand-cocoa/70">
    <p>Your cart is empty.</p>
    <RouterLink to="/product/lumelle-shower-cap" className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-cocoa px-6 py-2.5 text-sm font-semibold text-white">
      Browse the shop
    </RouterLink>
  </div>
)

export const CartPage = () => {
  const { items, subtotal, setQty, remove, checkoutUrl, applyDiscount } = useCart()
  useEffect(() => setNoIndex(), [])
  const [promo, setPromo] = useState('')
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING
  const total = subtotal + shipping
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100))

  return (
    <MarketingLayout navItems={[]} subtitle="Cart">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl gap-8 px-4 py-12 md:grid md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-4 text-sm text-brand-cocoa">
              {remainingForFreeShip > 0 ? (
                <p>£{remainingForFreeShip.toFixed(2)} away from free UK shipping.</p>
              ) : (
                <p>You’ve unlocked free UK shipping!</p>
              )}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-blush/40">
                <div className="h-full bg-brand-peach transition-[width]" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {items.length === 0 ? (
              <EmptyCartState />
            ) : (
              <div className="space-y-3">
                {items.map((item: any) => (
                  <article key={item.id} className="grid grid-cols-[80px_1fr_auto] gap-4 rounded-2xl border border-brand-blush/60 bg-white p-4 shadow-sm">
                    <img
                      src="/uploads/luminele/product-feature-05.jpg"
                      alt={item.title}
                      className="h-20 w-20 rounded-xl border border-brand-blush/40 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="text-sm text-brand-cocoa">
                      <p className="font-semibold">{item.title}</p>
                      <p className="flex items-center gap-2 text-brand-cocoa/70">
                        <span className="line-through text-brand-cocoa/50">£19.99</span>
                        <span className="font-semibold text-brand-cocoa">£{item.price.toFixed(2)}</span>
                        <span>each</span>
                      </p>
                      <button className="mt-2 text-[11px] uppercase tracking-[0.25em] text-brand-cocoa/60" onClick={() => remove(item.id)}>
                        Remove
                      </button>
                    </div>
                    <div className="justify-self-end">
                      <div className="inline-flex items-center gap-2">
                        <button className="h-8 w-8 rounded-full border border-brand-blush/60" onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}>−</button>
                        <span className="w-6 text-center text-brand-cocoa">{item.qty}</span>
                        <button className="h-8 w-8 rounded-full border border-brand-blush/60" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <div className="mt-2 text-right text-sm font-semibold">£{(item.qty * item.price).toFixed(2)}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="mt-8 space-y-4 md:mt-0">
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Order summary</p>
              <div className="mt-4 space-y-3 text-sm text-brand-cocoa">
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
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 rounded-xl border border-brand-blush/60 px-3 py-2 text-sm"
                  />
                  <button
                    className="rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa"
                    onClick={() => applyDiscount?.(promo)}
                    disabled={!promo}
                  >
                    Apply
                  </button>
                </div>
              </div>
              {items.length > 0 && checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  data-checkout-url
                  className="mt-5 block rounded-full bg-brand-cocoa px-5 py-3 text-center text-sm font-semibold text-white hover:-translate-y-0.5 transition"
                >
                  Continue to checkout
                </a>
              ) : (
                <RouterLink
                  to="/checkout"
                  className={`mt-5 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white ${items.length === 0 ? 'bg-brand-cocoa/40 cursor-not-allowed' : 'bg-brand-cocoa hover:-translate-y-0.5 transition'}`}
                >
                  Proceed to checkout
                </RouterLink>
              )}
              <p className="mt-3 text-center text-xs text-brand-cocoa/60">
                Need help? <RouterLink to="/returns" className="underline">View returns</RouterLink> or <RouterLink to="/account/orders" className="underline">track an order</RouterLink>.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-brand-cocoa/80">
              <p className="text-sm font-semibold">Secure checkout</p>
              <p className="text-xs text-brand-cocoa/60">256-bit SSL. Apple Pay, Shop Pay, and major cards accepted.</p>
            </div>
          </aside>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default CartPage
