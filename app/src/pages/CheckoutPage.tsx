import { useMemo, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useCart } from '@/state/CartContext'
import { addOrder, type Order } from '@/state/OrdersStore'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'

const FREE_SHIP_THRESHOLD = 40
const STANDARD_SHIPPING = 3.95
const steps = ['Information', 'Payment', 'Review']

const Stepper = ({ step }: { step: number }) => (
  <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
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
  const { items, subtotal, qty, clear } = useCart()
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || qty === 0 ? 0 : STANDARD_SHIPPING
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping])
  const [emailOptIn, setEmailOptIn] = useState(true)
  const [step, setStep] = useState(0)
  const [placingOrder, setPlacingOrder] = useState(false)
  const disabled = qty === 0
  const { getToken } = useClerkAuth()

  const placeOrder = async () => {
    if (disabled || placingOrder) return
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

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const goBack = () => setStep((s) => Math.max(0, s - 1))

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Express checkout</div>
              <div className="mt-3 flex gap-3">
                <button disabled className="flex-1 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white opacity-80">Shop Pay</button>
                <button disabled className="flex-1 rounded-full bg-[#0F9D58] px-4 py-2 text-sm font-semibold text-white opacity-80">G Pay</button>
              </div>
              <p className="mt-2 text-[11px] text-brand-cocoa/60">Demo checkout — payments not connected yet.</p>
            </div>
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Contact</div>
              <div className="mt-3 grid gap-3">
                <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="Email or mobile" />
                <label className="inline-flex items-center gap-2 text-sm text-brand-cocoa/80">
                  <input checked={emailOptIn} onChange={(e) => setEmailOptIn(e.target.checked)} type="checkbox" />
                  Email me news and offers
                </label>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Delivery</div>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <select className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm"><option>United Kingdom</option><option>United States</option></select>
                <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="Phone" />
                <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm md:col-span-2" placeholder="First name" />
                <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm md:col-span-2" placeholder="Last name" />
                <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm md:col-span-2" placeholder="Address" />
                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                  <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="City" />
                  <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="County/State" />
                  <input className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="Postcode" />
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-brand-blush/60 p-3 text-sm text-brand-cocoa/80">
                Enter your address to view available shipping methods.
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button className="rounded-full border border-brand-blush/60 px-5 py-2 text-sm font-semibold text-brand-cocoa" onClick={goNext} disabled={disabled}>
                Continue to payment
              </button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Delivery method</div>
              <div className="mt-3 space-y-2 text-sm text-brand-cocoa">
                <label className="flex items-center justify-between rounded-xl border border-brand-blush/60 px-3 py-2">
                  <span>Standard shipping (2-3 days)</span>
                  <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                </label>
                <label className="flex items-center justify-between rounded-xl border border-brand-blush/60 px-3 py-2 opacity-60">
                  <span>Express shipping (1 day)</span>
                  <span>£6.95</span>
                </label>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Payment</div>
              <div className="mt-3 grid gap-3">
                <div className="rounded-xl border border-brand-blush/60 p-3 text-sm text-brand-cocoa/70">Payments are secure and encrypted. (Demo UI)</div>
                <input disabled className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm opacity-60" placeholder="Card number" />
                <div className="grid grid-cols-3 gap-3">
                  <input disabled className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm opacity-60" placeholder="MM / YY" />
                  <input disabled className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm opacity-60" placeholder="CVC" />
                  <input disabled className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm opacity-60" placeholder="Name on card" />
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-brand-cocoa/80">
                  <input type="checkbox" defaultChecked />
                  Use shipping address as billing address
                </label>
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <button className="rounded-full border border-brand-blush/60 px-5 py-2 text-sm font-semibold text-brand-cocoa" onClick={goBack}>
                Back
              </button>
              <button className="rounded-full bg-brand-cocoa px-5 py-2 text-sm font-semibold text-white" onClick={goNext}>
                Review order
              </button>
            </div>
          </div>
        )
      case 2:
      default:
        return (
          <div className="space-y-4 rounded-2xl border border-brand-blush/60 bg-white p-4 text-sm text-brand-cocoa">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Review</p>
            <p>We’ll ship to the address you entered above. Need to make a change? Go back a step.</p>
            <ul className="space-y-2 text-brand-cocoa/80">
              <li>• Shipping: {shipping === 0 ? 'Free standard' : `£${shipping.toFixed(2)} standard shipping`}.</li>
              <li>• Email updates will be sent {emailOptIn ? 'with' : 'without'} marketing tips.</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-brand-blush/60 px-5 py-2 text-sm font-semibold text-brand-cocoa" onClick={goBack}>
                Edit details
              </button>
              <button onClick={placeOrder} disabled={disabled || placingOrder} className="rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa disabled:opacity-50">
                {placingOrder ? 'Saving order…' : 'Place order'}
              </button>
            </div>
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
                      <img src="/uploads/luminele/product-feature-05.jpg" alt="" className="h-14 w-14 rounded-lg border border-brand-blush/60 object-cover" />
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
          </aside>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default CheckoutPage
