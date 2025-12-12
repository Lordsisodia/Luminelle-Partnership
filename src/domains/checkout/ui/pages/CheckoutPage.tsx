import { useMemo, useState, useEffect } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useCart } from '@cart/providers/CartContext'
import { addOrder, type Order } from '@account/state/OrdersStore'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { shopifyEnabled } from '@/lib/shopify/shopify'
import { setNoIndex } from '@/lib/seo'

const FREE_SHIP_THRESHOLD = 40
const STANDARD_SHIPPING = 3.95
const steps = ['Review']

const Stepper = ({ step }: { step: number }) => (
  <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
    {steps.map((label, idx) => (
      <div key={label} className="flex items-center gap-2">
        <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${idx <= step ? 'border-brand-cocoa bg-brand-cocoa text-white' : 'border-brand-blush/60 text-brand-cocoa/50'}`}>
          {idx + 1}
        </span>
        <span className={idx === step ? 'text-brand-cocoa' : 'text-brand-cocoa/50'}>{label}</span>
        {idx < steps.length - 1 ? <span className="text-brand-blush/60">─</span> : null}
      </div>
    ))}
  </div>
)

export const CheckoutPage = () => {
  const { items, subtotal, qty, clear, checkoutUrl, setEmail } = useCart()
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || qty === 0 ? 0 : STANDARD_SHIPPING
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping])
  const [emailOptIn] = useState(true)
  // const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const [placingOrder, setPlacingOrder] = useState(false)
  const disabled = qty === 0
  const { getToken } = useClerkAuth()
  const { user } = useUser()

  const placeOrder = async () => {
    if (disabled || placingOrder) return
    // If Shopify is configured and we have a checkout URL, send shopper to Shopify checkout
    if (shopifyEnabled && checkoutUrl && typeof window !== 'undefined') {
      try {
        window.location.href = checkoutUrl
        return
      } catch { }
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
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      await addOrder(order, token ?? undefined)
      clear()
      window.location.href = `/order/${order.id}/confirm`
    } finally {
      setPlacingOrder(false)
    }
  }

  useEffect(() => { setNoIndex() }, [])

  // Prefill Shopify cart with the signed-in user's email to avoid Shopify login prompt.
  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (email && setEmail) {
      setEmail(email)
    }
  }, [user, setEmail])

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const goBack = () => setStep((s) => Math.max(0, s - 1))

  const renderStepContent = () => {
    switch (step) {
      default:
        return (
          <div className="space-y-4 rounded-2xl border border-brand-blush/60 bg-white p-4 text-sm text-brand-cocoa">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Review</p>
            <p>Review your order summary, then continue to checkout to finish payment securely in Shopify.</p>
          </div>
        )
    }
  }

  return (
    <MarketingLayout navItems={[]} subtitle="Checkout">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl gap-8 px-4 py-8 md:grid md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div>
            <Stepper step={step} />
            {renderStepContent()}
          </div>
          <aside className="mt-10 space-y-4 md:mt-0">
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Order summary</div>
              <div className="mt-3 space-y-3">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-brand-blush/60 p-3 text-sm text-brand-cocoa/70">Your cart is empty.</div>
                ) : (
                  items.map((it) => (
                    <div key={it.id} className="flex items-center gap-3">
                      <img
                        src="/uploads/luminele/product-feature-05.webp"
                        alt=""
                        className="h-14 w-14 rounded-lg border border-brand-blush/60 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="flex-1 text-sm text-brand-cocoa">
                        <div className="font-medium">{it.title}</div>
                        <div className="text-brand-cocoa/70">Qty {it.qty}</div>
                        <div className="flex items-center gap-2 text-[11px] text-brand-cocoa/70">
                          <span className="line-through text-brand-cocoa/50">£19.99</span>
                          <span className="font-semibold text-brand-cocoa">£{it.price.toFixed(2)}</span>
                          <span>each</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">£{(it.price * it.qty).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 h-px bg-brand-blush/60" />
              <div className="mt-3 space-y-2 text-sm text-brand-cocoa">
                <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-semibold text-brand-cocoa"><span>Total</span><span>£{total.toFixed(2)}</span></div>
              </div>
              <p className="mt-4 text-[11px] text-brand-cocoa/60">Shipping, taxes, and discounts are calculated at checkout.</p>
            </div>

            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Continue to checkout</div>
              <p className="mt-2 text-sm text-brand-cocoa/75">Review your items and totals, then continue to Shopify to pay securely.</p>
              <button
                onClick={placeOrder}
                disabled={disabled || placingOrder}
                className="mt-4 w-full rounded-full bg-brand-peach px-5 py-3 text-sm font-semibold text-brand-cocoa shadow-soft disabled:opacity-50"
              >
                {placingOrder ? 'Redirecting…' : 'Continue to checkout'}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default CheckoutPage
