import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { shopifyEnabled } from '@/lib/shopify/shopify'
import {
  cartCreate,
  cartFetch,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  cartBuyerIdentityUpdate,
  cartAttributesUpdate,
  cartDiscountCodesUpdate,
  type ShopifyCart,
} from '@/lib/shopify/shopifyCart'

export type CartItem = { id: string; title: string; price: number; qty: number; lineId?: string }

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  subtotal: number
  qty: number
  checkoutUrl?: string
  setEmail?: (email: string) => void
  setAttributes?: (attrs: Record<string, string>) => Promise<void>
  applyDiscount?: (code: string) => void
}

const CartCtx = createContext<CartState | null>(null)

const CartProviderBase: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('lumelle_cart')
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
    if (!shopifyEnabled) return null
    return localStorage.getItem('lumelle_shopify_cart_id')
  })
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>(undefined)

  const useServerCart = (import.meta.env.VITE_USE_SERVER_CART as any) === '1'
  const checkoutProxyEnabled = (import.meta.env.VITE_SHOPIFY_CHECKOUT_PROXY as any) === '1'

  const maybeProxyCheckoutUrl = (url: string): string => {
    if (!checkoutProxyEnabled) return url
    if (typeof window === 'undefined') return url
    try {
      const u = new URL(url)
      // Shopify checkout URLs can be /cart/c/... or /checkouts/... depending on version/flow.
      if (u.pathname.startsWith('/cart/c/') || u.pathname.startsWith('/checkouts/')) {
        return `${window.location.origin}${u.pathname}${u.search}${u.hash}`
      }
    } catch {
      // ignore invalid URLs
    }
    return url
  }

  const serverCart = {
    create: async (merchandiseId?: string, quantity = 1) => {
      const res = await fetch('/api/storefront/cart/create', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ merchandiseId, quantity }),
      })
      const json = await res.json()
      return mapServerCart(json.cart)
    },
    add: async (cartId: string, merchandiseId: string, quantity: number) => {
      const res = await fetch('/api/storefront/cart/add-lines', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cartId, merchandiseId, quantity }),
      })
      const json = await res.json()
      return mapServerCart(json.cart)
    },
    update: async (cartId: string, lineId: string, quantity: number) => {
      const res = await fetch('/api/storefront/cart/update-line', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cartId, lineId, quantity }),
      })
      const json = await res.json()
      return mapServerCart(json.cart)
    },
    remove: async (cartId: string, lineIds: string[]) => {
      const res = await fetch('/api/storefront/cart/remove-lines', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cartId, lineIds }),
      })
      const json = await res.json()
      return mapServerCart(json.cart)
    },
    fetch: async (cartId: string) => {
      const res = await fetch(`/api/storefront/cart/fetch?id=${encodeURIComponent(cartId)}`)
      const json = await res.json()
      return mapServerCart(json.cart)
    },
  }

  // hydrate from Shopify if configured and we have a cart id
  useEffect(() => {
    if (!shopifyEnabled || !shopifyCartId) return
      ; (useServerCart ? serverCart.fetch(shopifyCartId) : cartFetch(shopifyCartId))
        .then((cart) => {
          applyShopifyCart(cart)
        })
        .catch(() => {
          // if fetch fails, reset cart
          setShopifyCartId(null)
          setItems([])
          setCheckoutUrl(undefined)
          localStorage.removeItem('lumelle_shopify_cart_id')
        })
  }, [])

  const applyShopifyCart = (cart: ShopifyCart) => {
    setShopifyCartId(cart.id)
    setCheckoutUrl(cart.checkoutUrl ? maybeProxyCheckoutUrl(cart.checkoutUrl) : undefined)
    const mapped: CartItem[] = cart.lines.map((l) => ({
      id: l.merchandise.id,
      title: `${l.merchandise.product.title} – ${l.merchandise.title}`,
      price: Number(l.merchandise.price.amount),
      qty: l.quantity,
      lineId: l.id,
    }))
    setItems(mapped)
    localStorage.setItem('lumelle_shopify_cart_id', cart.id)
  }

  const setEmail: CartState['setEmail'] = (email) => {
    if (!shopifyEnabled || !shopifyCartId) return
    const run = async () => {
      if (useServerCart) {
        await fetch('/api/storefront/cart/set-buyer-identity', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ cartId: shopifyCartId, email }),
        }).then((r) => r.json()).then((j) => applyShopifyCart(mapServerCart(j.cart)))
      } else {
        const cart = await cartBuyerIdentityUpdate(shopifyCartId, email)
        applyShopifyCart(cart)
      }
    }
    run().catch(() => undefined)
  }

  const setAttributes: CartState['setAttributes'] = async (attrs) => {
    if (!shopifyEnabled || !shopifyCartId) return
    const pairs = Object.entries(attrs)
      .filter(([, v]) => typeof v === 'string' && v)
      .map(([key, value]) => ({ key, value }))
    if (pairs.length === 0) return
    try {
      if (useServerCart) {
        const res = await fetch('/api/storefront/cart/attributes-update', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ cartId: shopifyCartId, attributes: pairs }),
        })
        const j = await res.json()
        applyShopifyCart(mapServerCart(j.cart))
        return
      }

      const cart = await cartAttributesUpdate(shopifyCartId, pairs)
      applyShopifyCart(cart)
    } catch {
      // best-effort only (should never block checkout)
    }
  }

  const applyDiscount: CartState['applyDiscount'] = (code) => {
    if (!shopifyEnabled || !shopifyCartId || !code) return
    const run = async () => {
      if (useServerCart) {
        const res = await fetch('/api/storefront/cart/discount-codes-update', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ cartId: shopifyCartId, codes: [code] }),
        })
        const j = await res.json()
        applyShopifyCart(mapServerCart(j.cart))
      } else {
        const cart = await cartDiscountCodesUpdate(shopifyCartId, [code])
        applyShopifyCart(cart)
      }
    }
    run().catch(() => undefined)
  }

  // If a user unlocks a welcome reward before they have a cart,
  // we persist a pending discount code and apply it once the cart exists.
  useEffect(() => {
    if (!shopifyEnabled || !shopifyCartId) return
    let pending: string | null = null
    try {
      pending = localStorage.getItem('lumelle_pending_discount_code')
    } catch {
      pending = null
    }
    if (!pending) return
    try {
      localStorage.removeItem('lumelle_pending_discount_code')
    } catch {
      // ignore
    }
    applyDiscount?.(pending)
  }, [shopifyCartId])

  const add = async (item: Omit<CartItem, 'qty'>, qty?: number) => {
    const quantity = qty ?? 1
    if (shopifyEnabled) {
      const run = async () => {
        let currentCartId = shopifyCartId

        if (!currentCartId) {
          const cart = useServerCart ? await serverCart.create(item.id, quantity) : await cartCreate(item.id, quantity)
          applyShopifyCart(cart)
          return
        }

        const existingLine = items.find((i) => i.id === item.id)
        const nextQty = (existingLine?.qty ?? 0) + quantity
        const cart = existingLine?.lineId
          ? (useServerCart ? await serverCart.update(currentCartId, existingLine.lineId, nextQty) : await cartLinesUpdate(currentCartId, existingLine.lineId, nextQty))
          : (useServerCart ? await serverCart.add(currentCartId, item.id, quantity) : await cartLinesAdd(currentCartId, item.id, quantity))
        applyShopifyCart(cart)
      }
      run().catch((err) => console.error('Shopify add failed', err))
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id)
        if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + quantity } : i))
        return [...prev, { ...item, qty: quantity }]
      })
    }
  }

  const setQty: CartState['setQty'] = (id, qty) => {
    if (shopifyEnabled && shopifyCartId) {
      const line = items.find((i) => i.id === id)
      if (!line?.lineId) return
        ; (useServerCart ? serverCart.update(shopifyCartId, line.lineId, Math.max(0, qty)) : cartLinesUpdate(shopifyCartId, line.lineId, Math.max(0, qty)))
          .then(applyShopifyCart)
          .catch((err) => console.error('Shopify setQty failed', err))
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i)))
  }

  const remove: CartState['remove'] = (id) => {
    if (shopifyEnabled && shopifyCartId) {
      const line = items.find((i) => i.id === id)
      if (!line?.lineId) return
        ; (useServerCart ? serverCart.remove(shopifyCartId, [line.lineId]) : cartLinesRemove(shopifyCartId, [line.lineId]))
          .then(applyShopifyCart)
          .catch((err) => console.error('Shopify remove failed', err))
      return
    }
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clear: CartState['clear'] = () => {
    if (shopifyEnabled) {
      setShopifyCartId(null)
      localStorage.removeItem('lumelle_shopify_cart_id')
    }
    setItems([])
    setCheckoutUrl(undefined)
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const qty = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  useEffect(() => {
    try {
      const serialized = JSON.stringify(items)
      localStorage.setItem('lumelle_cart', serialized)
    } catch {
      /* ignore */
    }
  }, [items])

  const value: CartState = { items, add, setQty, remove, clear, subtotal, qty, checkoutUrl, setEmail, applyDiscount, setAttributes }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider = CartProviderBase

function mapServerCart(raw: any): ShopifyCart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    lines: (raw.lines?.edges || []).map((e: any) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      merchandise: {
        id: e.node.merchandise.id,
        title: e.node.merchandise.title,
        product: { title: e.node.merchandise.product.title },
        price: { amount: e.node.merchandise.price.amount, currencyCode: e.node.merchandise.price.currencyCode },
      },
    })),
  }
}
