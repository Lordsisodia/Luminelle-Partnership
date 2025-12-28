// Lightweight local cart shim to keep the app running without Shopify API traffic.
// Methods mirror the previous interface but operate on a simple in-memory object.

export type ShopifyCartLineInput = { merchandiseId: string; quantity: number }

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  lines: {
    id: string
    quantity: number
    merchandise: { id: string; title: string; product: { title: string }; price: { amount: string; currencyCode: string } }
  }[]
}

const memoryCarts = new Map<string, ShopifyCart>()

const createEmptyCart = (): ShopifyCart => {
  const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)
  return { id, checkoutUrl: `/checkout/${id}`, lines: [] }
}

const getCart = (id?: string | null): ShopifyCart => {
  if (id && memoryCarts.has(id)) return memoryCarts.get(id)!
  const cart = createEmptyCart()
  memoryCarts.set(cart.id, cart)
  return cart
}

export const cartCreate = async () => {
  const cart = createEmptyCart()
  memoryCarts.set(cart.id, cart)
  return { cart }
}

export const cartFetch = async (id: string) => ({ cart: getCart(id) })

export const cartLinesAdd = async (id: string, lines: ShopifyCartLineInput[]) => {
  const cart = getCart(id)
  lines.forEach((line) => {
    const existing = cart.lines.find((l) => l.merchandise.id === line.merchandiseId)
    if (existing) {
      existing.quantity += line.quantity
    } else {
      cart.lines.push({
        id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
        quantity: line.quantity,
        merchandise: {
          id: line.merchandiseId,
          title: 'Item',
          product: { title: 'Item' },
          price: { amount: '0', currencyCode: 'USD' },
        },
      })
    }
  })
  return { cart }
}

export const cartLinesUpdate = async (id: string, lines: ShopifyCartLineInput[]) => {
  const cart = getCart(id)
  lines.forEach((line) => {
    const existing = cart.lines.find((l) => l.merchandise.id === line.merchandiseId)
    if (existing) existing.quantity = line.quantity
  })
  return { cart }
}

export const cartLinesRemove = async (id: string, lineIds: string[]) => {
  const cart = getCart(id)
  cart.lines = cart.lines.filter((l) => !lineIds.includes(l.id))
  return { cart }
}

export const cartBuyerIdentityUpdate = async (id: string, _identity: unknown) => ({ cart: getCart(id) })
export const cartAttributesUpdate = async (id: string, _attrs: Record<string, string>) => ({ cart: getCart(id) })
export const cartDiscountCodesUpdate = async (id: string, _codes: string[]) => ({ cart: getCart(id) })

// Flag used elsewhere
export const shopifyEnabled = false
