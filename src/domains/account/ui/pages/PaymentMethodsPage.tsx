import { useEffect, useState } from 'react'
import { useAuth } from '@auth/ui/providers/AuthContext'
import { deletePaymentMethod, getPaymentMethods, savePaymentMethod, type PaymentMethod } from '@account/state/AccountStore'
import { setNoIndexNoFollow } from '@/lib/seo'
import { AccountLayout } from '@account/ui/layouts'
import { AccountNav } from '@account/ui/components'

const defaultForm: PaymentMethod = {
  id: '',
  brand: 'Visa',
  last4: '',
  exp: '',
}

export const PaymentMethodsPage = () => {
  const { signedIn, signIn } = useAuth()
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [form, setForm] = useState<PaymentMethod>(defaultForm)

  useEffect(() => {
    setNoIndexNoFollow()
    setMethods(getPaymentMethods())
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.last4 || form.last4.length !== 4) return
    const id = form.id || `card-${Date.now().toString(36)}`
    const payload = { ...form, id, last4: form.last4.slice(-4) }
    savePaymentMethod(payload)
    setMethods(getPaymentMethods())
    setForm(defaultForm)
  }

  const handleDelete = (id: string) => {
    deletePaymentMethod(id)
    setMethods(getPaymentMethods())
  }

  const updateField = (field: keyof PaymentMethod, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <AccountLayout sidebar={<AccountNav />} title="Payment methods" subtitle="Save cards for faster checkout.">
      {!signedIn ? (
        <div className="rounded-2xl border border-brand-blush/60 bg-white p-6">
          <p className="text-brand-cocoa/80">Sign in to save cards for faster checkout.</p>
          <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>
            Sign in
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Add card</p>
            <div className="mt-4 space-y-3 text-sm text-brand-cocoa">
              <select value={form.brand} onChange={(e) => updateField('brand', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2">
                <option>Visa</option>
                <option>Mastercard</option>
                <option>AmEx</option>
              </select>
              <input
                value={form.last4}
                onChange={(e) => updateField('last4', e.target.value.replace(/\\D/g, '').slice(-4))}
                className="w-full rounded-xl border border-brand-blush/60 px-3 py-2"
                placeholder="Last 4 digits"
                required
              />
              <input
                value={form.exp}
                onChange={(e) => updateField('exp', e.target.value)}
                className="w-full rounded-xl border border-brand-blush/60 px-3 py-2"
                placeholder="Expiry MM/YY"
                required
              />
            </div>
            <button className="mt-4 w-full rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white">Save card</button>
          </form>
          <div className="space-y-4">
            {methods.length === 0 ? (
              <div className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-brand-cocoa/70">No cards saved yet.</div>
            ) : (
              methods.map((card) => (
                <article key={card.id} className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-brand-cocoa">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold">
                        {card.brand} ending in {card.last4}
                      </p>
                      <p className="text-brand-cocoa/70">Exp {card.exp}</p>
                    </div>
                    <button className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/50" onClick={() => handleDelete(card.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}
    </AccountLayout>
  )
}

export default PaymentMethodsPage
