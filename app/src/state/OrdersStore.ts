export type OrderItem = { id: string; title: string; price: number; qty: number }
export type OrderEvent = { at: string; message: string }
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type Order = {
  id: string
  placedAt: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  events: OrderEvent[]
  tracking?: string
}

const KEY = 'lumelle_orders'

export const getOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export const saveOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders))
  } catch {
    /* ignore persist errors */
  }
}

export const addOrder = (order: Order) => {
  const orders = getOrders()
  orders.unshift(order)
  saveOrders(orders)
}
