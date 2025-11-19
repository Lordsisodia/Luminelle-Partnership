import { useEffect, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth } from '@/state/AuthContext'
import type { Address } from '@/state/AccountStore'
import { deleteAddress, getAddresses, saveAddress } from '@/state/AccountStore'

const emptyForm: Address = {
  id: '',
  label: 'Home',
  fullName: '',
  line1: '',
  city: '',
  postal: '',
  country: 'United Kingdom',
}

export const AddressesPage = () => {
  const { signedIn, signIn } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [form, setForm] = useState<Address>(emptyForm)

  useEffect(() => {
    setAddresses(getAddresses())
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = form.id || `addr-${Date.now().toString(36)}`
    const payload = { ...form, id }
    saveAddress(payload)
    setAddresses(getAddresses())
    setForm(emptyForm)
  }

  const handleDelete = (id: string) => {
    deleteAddress(id)
    setAddresses(getAddresses())
  }

  const updateField = (field: keyof Address, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <MarketingLayout navItems={[]} subtitle="Addresses">
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
          <h1 className="font-heading text-2xl text-brand-cocoa">Saved addresses</h1>
          {!signedIn ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6">
              <p className="text-brand-cocoa/80">Sign in to add and manage your shipping info.</p>
              <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>
                Sign in
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Add address</p>
                <div className="mt-4 space-y-3 text-sm text-brand-cocoa">
                  <input value={form.label} onChange={(e) => updateField('label', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="Label (Home)" />
                  <input value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="Full name" required />
                  <input value={form.line1} onChange={(e) => updateField('line1', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="Address" required />
                  <input value={form.city} onChange={(e) => updateField('city', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="City" required />
                  <input value={form.postal} onChange={(e) => updateField('postal', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="Postcode" required />
                  <input value={form.country} onChange={(e) => updateField('country', e.target.value)} className="w-full rounded-xl border border-brand-blush/60 px-3 py-2" placeholder="Country" />
                </div>
                <button className="mt-4 w-full rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white">Save address</button>
              </form>

              <div className="space-y-4">
                {addresses.length === 0 ? (
                  <div className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-brand-cocoa/70">No addresses saved yet.</div>
                ) : (
                  addresses.map((addr) => (
                    <article key={addr.id} className="rounded-2xl border border-brand-blush/60 bg-white p-4 text-sm text-brand-cocoa">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{addr.label}</p>
                        <button className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/50" onClick={() => handleDelete(addr.id)}>
                          Delete
                        </button>
                      </div>
                      <p className="mt-2 text-brand-cocoa/80">{addr.fullName}</p>
                      <p className="text-brand-cocoa/70">{addr.line1}</p>
                      <p className="text-brand-cocoa/70">{addr.city}, {addr.postal}</p>
                      <p className="text-brand-cocoa/60">{addr.country}</p>
                    </article>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default AddressesPage
