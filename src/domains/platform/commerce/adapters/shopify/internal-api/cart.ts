import type { CartDTO, CartLineDTO, CartPort } from '@platform/commerce/ports'
import { PortError } from '@platform/ports'
import { requestJson } from '@platform/http/internal-api/client'
import { resolveShopifyVariantGid, toVariantKey } from './keyRegistry'
import { decodeCartKey, decodeCartLineKey, encodeCartKey, encodeCartLineKey } from './keys'

type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title?: string
    product?: { title?: string } | null
    price?: { amount: string; currencyCode: string } | null
    compareAtPrice?: { amount: string; currencyCode: string } | null
  }
}

type ShopifyCart = {
  id: string
  checkoutUrl: string
  lines?: { edges?: Array<{ node: ShopifyCartLine }> } | null
}

const CART_KEY_STORAGE = 'lumelle_cart_key'

const getStoredCartKey = (): string | null => {
  try {
    return localStorage.getItem(CART_KEY_STORAGE)
  } catch {
    return null
  }
}

const setStoredCartKey = (key: string) => {
  try {
    localStorage.setItem(CART_KEY_STORAGE, key)
  } catch {
    // ignore
  }
}

const mapCart = (cart: ShopifyCart): CartDTO => {
  const linesRaw = (cart.lines?.edges ?? []).map((e) => e.node)
  const lines: CartLineDTO[] = linesRaw.map((line) => {
    const price = line.merchandise.price
    const amount = Number(price?.amount ?? 0)
    const currencyCode = price?.currencyCode ?? 'GBP'
    return {
      lineKey: encodeCartLineKey(line.id),
      variantKey: toVariantKey(line.merchandise.id),
      title: line.merchandise.product?.title ? `${line.merchandise.product.title} — ${line.merchandise.title ?? ''}`.trim() : line.merchandise.title ?? 'Item',
      productTitle: line.merchandise.product?.title ?? undefined,
      variantTitle: line.merchandise.title ?? undefined,
      qty: line.quantity,
      unitPrice: { amount, currencyCode },
      compareAt: line.merchandise.compareAtPrice
        ? { amount: Number(line.merchandise.compareAtPrice.amount), currencyCode: line.merchandise.compareAtPrice.currencyCode }
        : undefined,
    }
  })

  const currencyCode = lines[0]?.unitPrice.currencyCode ?? 'GBP'
  const subtotalAmount = lines.reduce((sum, l) => sum + l.unitPrice.amount * l.qty, 0)

  return {
    cartKey: encodeCartKey(cart.id),
    lines,
    subtotal: { amount: subtotalAmount, currencyCode },
    currencyCode,
    discountCodes: [],
  }
}

export const createShopifyCartPort = (): CartPort => {
  const ensureCartRawId = async (): Promise<string> => {
    const stored = getStoredCartKey()
    if (stored) return decodeCartKey(stored)

    const created = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/create`, { method: 'POST', body: {} })
    const nextKey = encodeCartKey(created.cart.id)
    setStoredCartKey(nextKey)
    return created.cart.id
  }

  const fetchCart = async (rawCartId: string): Promise<ShopifyCart> => {
    const data = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/fetch?id=${encodeURIComponent(rawCartId)}`)
    return data.cart
  }

  const updateStoredKey = (cart: ShopifyCart) => setStoredCartKey(encodeCartKey(cart.id))

  return {
    async getCart(): Promise<CartDTO> {
      const rawId = await ensureCartRawId()
      const cart = await fetchCart(rawId)
      updateStoredKey(cart)
      return mapCart(cart)
    },

    async syncFromDraft(draft) {
      if (!draft.lines.length) return await this.getCart()

      const first = draft.lines[0]
      const created = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/create`, {
        method: 'POST',
        body: { merchandiseId: resolveShopifyVariantGid(first.variantKey), quantity: first.qty },
      })
      let cart = created.cart

      for (const line of draft.lines.slice(1)) {
        const next = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/add-lines`, {
          method: 'POST',
          body: { cartId: cart.id, merchandiseId: resolveShopifyVariantGid(line.variantKey), quantity: line.qty },
        })
        cart = next.cart
      }

      if (draft.discountCode) {
        const next = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/discount-codes-update`, {
          method: 'POST',
          body: { cartId: cart.id, codes: [draft.discountCode] },
        })
        cart = next.cart
      }

      if (draft.attributes) {
        const attrs = Object.entries(draft.attributes).map(([key, value]) => ({ key, value }))
        const next = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/attributes-update`, {
          method: 'POST',
          body: { cartId: cart.id, attributes: attrs },
        })
        cart = next.cart
      }

      if (draft.buyerEmail) {
        const next = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/set-buyer-identity`, {
          method: 'POST',
          body: { cartId: cart.id, email: draft.buyerEmail },
        })
        cart = next.cart
      }

      updateStoredKey(cart)
      return mapCart(cart)
    },

    async addLine({ variantKey, qty }) {
      const stored = getStoredCartKey()
      if (!stored) {
        const created = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/create`, {
          method: 'POST',
          body: { merchandiseId: resolveShopifyVariantGid(variantKey), quantity: qty },
        })
        updateStoredKey(created.cart)
        return mapCart(created.cart)
      }

      const rawCartId = decodeCartKey(stored)
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/add-lines`, {
        method: 'POST',
        body: { cartId: rawCartId, merchandiseId: resolveShopifyVariantGid(variantKey), quantity: qty },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },

    async updateLine({ lineKey, qty }) {
      const stored = getStoredCartKey()
      if (!stored) throw new PortError('NOT_FOUND', 'No cart exists')
      const rawCartId = decodeCartKey(stored)
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/update-line`, {
        method: 'POST',
        body: { cartId: rawCartId, lineId: decodeCartLineKey(lineKey), quantity: qty },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },

    async removeLine({ lineKey }) {
      const stored = getStoredCartKey()
      if (!stored) throw new PortError('NOT_FOUND', 'No cart exists')
      const rawCartId = decodeCartKey(stored)
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/remove-lines`, {
        method: 'POST',
        body: { cartId: rawCartId, lineIds: [decodeCartLineKey(lineKey)] },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },

    async applyDiscount(code) {
      const rawCartId = await ensureCartRawId()
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/discount-codes-update`, {
        method: 'POST',
        body: { cartId: rawCartId, codes: code ? [code] : [] },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },

    async setBuyerIdentity({ email }) {
      const rawCartId = await ensureCartRawId()
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/set-buyer-identity`, {
        method: 'POST',
        body: { cartId: rawCartId, email },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },

    async setAttributes(attrs) {
      const rawCartId = await ensureCartRawId()
      const attributes = Object.entries(attrs).map(([key, value]) => ({ key, value }))
      const updated = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/attributes-update`, {
        method: 'POST',
        body: { cartId: rawCartId, attributes },
      })
      updateStoredKey(updated.cart)
      return mapCart(updated.cart)
    },
  }
}

export const __internalShopifyCartKeyStorage = {
  CART_KEY_STORAGE,
  getStoredCartKey,
  setStoredCartKey,
}
