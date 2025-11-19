import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = { id: string; title: string; price: number; qty: number }

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  subtotal: number
  qty: number
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

  const add: CartState['add'] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { ...item, qty }]
    })
  }

  const setQty: CartState['setQty'] = (id, qty) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i)))
  }

  const remove: CartState['remove'] = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear: CartState['clear'] = () => setItems([])

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

  const value: CartState = { items, add, setQty, remove, clear, subtotal, qty }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider = CartProviderBase
