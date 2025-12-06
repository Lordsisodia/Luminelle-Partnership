import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { shopifyEnabled } from '@/lib/shopify'
import { cartCreate, cartFetch, cartLinesAdd, cartLinesRemove, cartLinesUpdate, type ShopifyCart } from '@/lib/shopifyCart'

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

  // hydrate from Shopify if configured and we have a cart id
  useEffect(() => {
    if (!shopifyEnabled || !shopifyCartId) return
    cartFetch(shopifyCartId)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyShopifyCart = (cart: ShopifyCart) => {
    setShopifyCartId(cart.id)
    setCheckoutUrl(cart.checkoutUrl)
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

  const add: CartState['add'] = (item, qty = 1) => {
    if (shopifyEnabled) {
      const run = async () => {
        if (!shopifyCartId) {
          const cart = await cartCreate(item.id, qty)
          applyShopifyCart(cart)
          return
        }
        const existingLine = items.find((i) => i.id === item.id)
        const nextQty = (existingLine?.qty ?? 0) + qty
        const cart = existingLine?.lineId
          ? await cartLinesUpdate(shopifyCartId, existingLine.lineId, nextQty)
          : await cartLinesAdd(shopifyCartId, item.id, qty)
        applyShopifyCart(cart)
      }
      run().catch((err) => console.error('Shopify add failed', err))
      return
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { ...item, qty }]
    })
  }

  const setQty: CartState['setQty'] = (id, qty) => {
    if (shopifyEnabled && shopifyCartId) {
      const line = items.find((i) => i.id === id)
      if (!line?.lineId) return
      cartLinesUpdate(shopifyCartId, line.lineId, Math.max(0, qty))
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
      cartLinesRemove(shopifyCartId, [line.lineId])
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

  const value: CartState = { items, add, setQty, remove, clear, subtotal, qty, checkoutUrl }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider = CartProviderBase
