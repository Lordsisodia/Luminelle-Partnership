import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { shopifyEnabled } from '@platform/commerce/shopify/shopify'
import { MAX_CART_ITEM_QTY } from '@/config/constants'
import { getVolumeDiscountCodes, getVolumeDiscountTierForVariant, type VolumeDiscountTier } from '@client/shop/cart/logic/volumeDiscounts'
import {
  cartAttributesUpdate,
  cartBuyerIdentityUpdate,
  cartCreate,
  cartDiscountCodesUpdate,
  cartFetch,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  type ShopifyCart,
} from '@platform/commerce/shopify/shopifyCart'

export type CartItem = {
  id: string
  title: string
  price: number
  displayPrice?: number
  compareAt?: number
  displayCompareAt?: number
  qty: number
  lineId?: string
  image?: string
  rating?: number
  reviewsCount?: number
}

type CartState = {
  items: CartItem[]
  discountCode?: string | null
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => Promise<void>
  setQty: (id: string, qty: number) => Promise<void>
  remove: (id: string) => Promise<void>
  clear: () => Promise<void>
  subtotal: number
  qty: number
  checkoutUrl?: string
  setEmail?: (email: string) => Promise<void>
  setAttributes?: (attrs: Record<string, string>) => Promise<void>
  applyDiscount?: (code: string) => void
}

const STORAGE_KEY = 'lumelle_cart'
const DISCOUNT_KEY = 'lumelle_cart_discount_code'
const PENDING_DISCOUNT_KEY = 'lumelle_pending_discount_code'
const SHOPIFY_CART_ID_KEY = 'lumelle_shopify_cart_id'
const CartCtx = createContext<CartState | null>(null)

const persist = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* ignore */
  }
}

const persistDiscount = (code: string | null) => {
  try {
    if (!code) {
      localStorage.removeItem(DISCOUNT_KEY)
      return
    }
    localStorage.setItem(DISCOUNT_KEY, code)
  } catch {
    /* ignore */
  }
}

const persistShopifyCartId = (cartId: string | null) => {
  try {
    if (!cartId) {
      localStorage.removeItem(SHOPIFY_CART_ID_KEY)
      return
    }
    localStorage.setItem(SHOPIFY_CART_ID_KEY, cartId)
  } catch {
    /* ignore */
  }
}

const toNumber = (value: unknown): number => {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  return Number.isFinite(n) ? n : 0
}

const clampLineQty = (qty: number): number => {
  const n = Number.isFinite(qty) ? qty : 1
  return Math.max(1, Math.min(MAX_CART_ITEM_QTY, Math.floor(n)))
}

const mapShopifyCartToItems = (cart: ShopifyCart): CartItem[] => {
  return (cart.lines ?? []).map((line) => ({
    id: line.merchandise.id,
    lineId: line.id,
    title: line.merchandise.product.title,
    price: toNumber(line.merchandise.price.amount),
    compareAt: line.merchandise.compareAtPrice ? toNumber(line.merchandise.compareAtPrice.amount) : undefined,
    qty: clampLineQty(line.quantity),
    image: line.merchandise.product.featuredImage?.url ?? undefined,
  }))
}

const CartProviderBase: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : []
      return Array.isArray(parsed)
        ? parsed
            .filter((item) => item && typeof item === 'object' && 'id' in item)
            .map((item) => ({ ...item, qty: clampLineQty(toNumber((item as any).qty)) }))
        : []
    } catch {
      return []
    }
  })

  const [discountCode, setDiscountCode] = useState<string | null>(() => {
    try {
      const normalize = (code: unknown) => String(code ?? '').trim().toUpperCase()

      const raw = localStorage.getItem(DISCOUNT_KEY)
      if (raw) {
        try {
          localStorage.removeItem(PENDING_DISCOUNT_KEY)
        } catch {
          // ignore
        }
        return normalize(raw)
      }

      const pending = localStorage.getItem(PENDING_DISCOUNT_KEY)
      if (pending) {
        try {
          localStorage.removeItem(PENDING_DISCOUNT_KEY)
        } catch {
          // ignore
        }
        return normalize(pending)
      }

      return null
    } catch {
      return null
    }
  })

  const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem(SHOPIFY_CART_ID_KEY)
      return raw ? String(raw) : null
    } catch {
      return null
    }
  })
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>(undefined)

  const itemsRef = useRef<CartItem[]>(items)
  const discountCodeRef = useRef<string | null>(discountCode)
  const shopifyCartIdRef = useRef<string | null>(shopifyCartId)
  const shopifyQueueRef = useRef<Promise<void>>(Promise.resolve())
  const volumeDiscountCodes = useMemo(() => getVolumeDiscountCodes(), [])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    discountCodeRef.current = discountCode
  }, [discountCode])

  useEffect(() => {
    shopifyCartIdRef.current = shopifyCartId
  }, [shopifyCartId])

  useEffect(() => {
    persist(items)
  }, [items])

  useEffect(() => {
    persistDiscount(discountCode)
  }, [discountCode])

  useEffect(() => {
    persistShopifyCartId(shopifyCartId)
  }, [shopifyCartId])

  const enqueueShopify = useCallback((op: () => Promise<void>) => {
    shopifyQueueRef.current = shopifyQueueRef.current
      .then(op)
      .catch((err) => {
        console.error('Shopify cart sync failed:', err)
      })
    return shopifyQueueRef.current
  }, [])

  const setFromShopifyCart = useCallback((cart: ShopifyCart) => {
    setShopifyCartId(cart.id)
    setCheckoutUrl(cart.checkoutUrl)
    setItems(mapShopifyCartToItems(cart))
  }, [])

  const getDesiredVolumeDiscountTier = useCallback((nextItems: CartItem[]): VolumeDiscountTier | null => {
    let best: VolumeDiscountTier | null = null
    for (const item of nextItems) {
      const tier = getVolumeDiscountTierForVariant(item.id, item.qty)
      if (!tier) continue
      if (!best || tier.minQty > best.minQty) best = tier
    }
    return best
  }, [])

  const syncVolumeDiscountFromItems = useCallback(
    (nextItems: CartItem[]) => {
      const current = discountCodeRef.current ? discountCodeRef.current.toUpperCase() : null
      const currentIsVolume = current ? volumeDiscountCodes.has(current) : false

      const desiredTier = getDesiredVolumeDiscountTier(nextItems)
      const desired = desiredTier?.code ?? null
      const shouldManage = currentIsVolume || (!current && Boolean(desired))

      if (!shouldManage) return { managed: false as const, code: current }
      if (desired === current) return { managed: true as const, code: current }

      discountCodeRef.current = desired
      setDiscountCode(desired)
      return { managed: true as const, code: desired }
    },
    [getDesiredVolumeDiscountTier, volumeDiscountCodes]
  )

  const applyDiscountToCartIfNeeded = useCallback(
    async (cart: ShopifyCart): Promise<ShopifyCart> => {
      const code = discountCodeRef.current
      if (!code) return cart
      try {
        return await cartDiscountCodesUpdate(cart.id, [code])
      } catch (err) {
        console.warn('Failed to apply discount code to Shopify cart:', err)
        return cart
      }
    },
    []
  )

  const syncDiscountCodesForCart = useCallback(
    async (cart: ShopifyCart, managed: boolean, code: string | null): Promise<ShopifyCart> => {
      if (managed) {
        try {
          return await cartDiscountCodesUpdate(cart.id, code ? [code] : [])
        } catch (err) {
          console.warn('Failed to sync volume discount code to Shopify cart:', err)
          return cart
        }
      }

      return await applyDiscountToCartIfNeeded(cart)
    },
    [applyDiscountToCartIfNeeded]
  )

  const enforceShopifyLineQtyCap = useCallback(async (cart: ShopifyCart): Promise<ShopifyCart> => {
    let next = cart
    for (const line of next.lines ?? []) {
      if (line.quantity <= MAX_CART_ITEM_QTY) continue
      next = await cartLinesUpdate(next.id, line.id, MAX_CART_ITEM_QTY)
    }
    return next
  }, [])

  // Rehydrate Shopify checkoutUrl if a cart id exists, or create a cart from persisted items.
  useEffect(() => {
    if (!shopifyEnabled) return

    const existingCartId = shopifyCartIdRef.current
    const seedItems = itemsRef.current

    if (existingCartId) {
      enqueueShopify(async () => {
        let cart = await cartFetch(existingCartId)
        cart = await enforceShopifyLineQtyCap(cart)
        const { managed, code } = syncVolumeDiscountFromItems(mapShopifyCartToItems(cart))
        cart = await syncDiscountCodesForCart(cart, managed, code)
        setFromShopifyCart(cart)
      })
      return
    }

    if (!seedItems.length) return

    enqueueShopify(async () => {
      const first = seedItems[0]
      let cart = await cartCreate(first.id, clampLineQty(first.qty))
      for (const item of seedItems.slice(1)) {
        cart = await cartLinesAdd(cart.id, item.id, clampLineQty(item.qty))
      }
      cart = await enforceShopifyLineQtyCap(cart)
      const { managed, code } = syncVolumeDiscountFromItems(mapShopifyCartToItems(cart))
      cart = await syncDiscountCodesForCart(cart, managed, code)
      setFromShopifyCart(cart)
    })
  }, [enqueueShopify, enforceShopifyLineQtyCap, setFromShopifyCart, syncDiscountCodesForCart, syncVolumeDiscountFromItems])

  const add: CartState['add'] = async (item, qty = 1) => {
    const safeQty = clampLineQty(qty)
    const prev = itemsRef.current
    const existing = prev.find((p) => p.id === item.id)
    const nextQty = existing ? clampLineQty(existing.qty + safeQty) : safeQty
    if (existing && nextQty === existing.qty) return

    const nextItems = existing
      ? prev.map((p) => (p.id === item.id ? { ...p, qty: nextQty } : p))
      : [...prev, { ...item, qty: safeQty }]

    itemsRef.current = nextItems
    setItems(nextItems)
    const { managed, code } = syncVolumeDiscountFromItems(nextItems)

    if (!shopifyEnabled) return
    await enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      let cart: ShopifyCart
      if (!cartId) {
        cart = await cartCreate(item.id, nextQty)
        cart = await syncDiscountCodesForCart(cart, managed, code)
        setFromShopifyCart(cart)
        return
      }

      const localLineId = itemsRef.current.find((i) => i.id === item.id)?.lineId
      let lineId = localLineId
      if (!lineId) {
        const fetched = await cartFetch(cartId)
        lineId = fetched.lines.find((l) => l.merchandise.id === item.id)?.id
      }

      if (lineId) {
        cart = await cartLinesUpdate(cartId, lineId, nextQty)
      } else {
        cart = await cartLinesAdd(cartId, item.id, safeQty)
      }

      cart = await syncDiscountCodesForCart(cart, managed, code)
      setFromShopifyCart(cart)
    })
  }

  const setQty: CartState['setQty'] = async (id, qty) => {
    if (qty <= 0) return remove(id)
    const clampedQty = clampLineQty(qty)
    const prev = itemsRef.current
    const nextItems = prev.map((p) => (p.id === id ? { ...p, qty: clampedQty } : p))
    itemsRef.current = nextItems
    setItems(nextItems)
    const { managed, code } = syncVolumeDiscountFromItems(nextItems)

    if (!shopifyEnabled) return
    await enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      if (!cartId) return

      const localLineId = itemsRef.current.find((i) => i.id === id)?.lineId
      let lineId = localLineId
      if (!lineId) {
        const cart = await cartFetch(cartId)
        lineId = cart.lines.find((l) => l.merchandise.id === id)?.id
      }

      let cart: ShopifyCart
      if (lineId) {
        cart = await cartLinesUpdate(cartId, lineId, clampedQty)
      } else {
        cart = await cartLinesAdd(cartId, id, clampedQty)
      }
      cart = await syncDiscountCodesForCart(cart, managed, code)
      setFromShopifyCart(cart)
    })
  }

  const remove: CartState['remove'] = async (id) => {
    const prev = itemsRef.current
    const nextItems = prev.filter((p) => p.id !== id)
    itemsRef.current = nextItems
    setItems(nextItems)
    const { managed, code } = syncVolumeDiscountFromItems(nextItems)

    if (!shopifyEnabled) return
    await enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      if (!cartId) return

      const localLineId = itemsRef.current.find((i) => i.id === id)?.lineId
      let lineId = localLineId
      if (!lineId) {
        const cart = await cartFetch(cartId)
        lineId = cart.lines.find((l) => l.merchandise.id === id)?.id
      }
      if (!lineId) return

      let cart = await cartLinesRemove(cartId, [lineId])
      cart = await syncDiscountCodesForCart(cart, managed, code)
      setFromShopifyCart(cart)
    })
  }

  const clear: CartState['clear'] = async () => {
    setItems([])
    setCheckoutUrl(undefined)
    setShopifyCartId(null)
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.displayPrice ?? item.price) * item.qty, 0),
    [items]
  )
  const qty = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])

  const applyDiscount: CartState['applyDiscount'] = (code) => {
    const trimmed = (code ?? '').trim()
    if (!trimmed) {
      setDiscountCode(null)
      if (shopifyEnabled) {
        void enqueueShopify(async () => {
          const cartId = shopifyCartIdRef.current
          if (!cartId) return
          const cart = await cartDiscountCodesUpdate(cartId, [])
          setFromShopifyCart(cart)
        })
      }
      return
    }
    setDiscountCode(trimmed.toUpperCase())

    if (!shopifyEnabled) return
    void enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      if (!cartId) return
      const cart = await cartDiscountCodesUpdate(cartId, [trimmed.toUpperCase()])
      setFromShopifyCart(cart)
    })
  }

  const setEmail: CartState['setEmail'] = async (email) => {
    if (!shopifyEnabled) return
    await enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      if (!cartId) return
      const cart = await cartBuyerIdentityUpdate(cartId, email)
      setFromShopifyCart(cart)
    })
  }

  const setAttributes: CartState['setAttributes'] = async (attrs) => {
    if (!shopifyEnabled) return
    await enqueueShopify(async () => {
      const cartId = shopifyCartIdRef.current
      if (!cartId) return
      const cart = await cartAttributesUpdate(
        cartId,
        Object.entries(attrs).map(([key, value]) => ({ key, value })),
      )
      setFromShopifyCart(cart)
    })
  }

  const value: CartState = {
    items,
    discountCode,
    add,
    setQty,
    remove,
    clear,
    subtotal,
    qty,
    checkoutUrl,
    setEmail,
    setAttributes,
    applyDiscount,
  }

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const CartProvider = CartProviderBase
export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartProvider
