export type Address = {
  id: string
  label: string
  fullName: string
  line1: string
  city: string
  postal: string
  country: string
}

export type PaymentMethod = {
  id: string
  brand: string
  last4: string
  exp: string
}

const ADDRESS_KEY = 'lumelle_addresses'
const PAYMENT_KEY = 'lumelle_payments'

const safeParse = <T,>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

const persist = <T,>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

export const getAddresses = (): Address[] => safeParse<Address>(ADDRESS_KEY)
export const saveAddress = (addr: Address) => {
  const current = getAddresses()
  const existing = current.findIndex((a) => a.id === addr.id)
  if (existing >= 0) current[existing] = addr
  else current.unshift(addr)
  persist(ADDRESS_KEY, current)
}
export const deleteAddress = (id: string) => {
  const filtered = getAddresses().filter((a) => a.id !== id)
  persist(ADDRESS_KEY, filtered)
}

export const getPaymentMethods = (): PaymentMethod[] => safeParse<PaymentMethod>(PAYMENT_KEY)
export const savePaymentMethod = (method: PaymentMethod) => {
  const current = getPaymentMethods()
  const existing = current.findIndex((m) => m.id === method.id)
  if (existing >= 0) current[existing] = method
  else current.unshift(method)
  persist(PAYMENT_KEY, current)
}
export const deletePaymentMethod = (id: string) => {
  const filtered = getPaymentMethods().filter((m) => m.id !== id)
  persist(PAYMENT_KEY, filtered)
}
