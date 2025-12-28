import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartLine = { variantId: string; title: string; price: number; qty: number; lineId?: string }

export type CartState = {
  lines: CartLine[]
  checkoutUrl?: string
  shopifyCartId?: string | null
  buyerEmail?: string | null
  discounts: string[]
  lastUpdated: number
  version: 2
  add: (line: CartLine) => void
  setQty: (variantId: string, qty: number) => void
  remove: (variantId: string) => void
  clear: () => void
}

const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

function migrateFromLegacy(persisted: any): CartState {
  const now = Date.now()
  const legacyLines = Array.isArray(persisted) ? persisted : []
  const legacyCartId = typeof localStorage !== 'undefined' ? localStorage.getItem('lumelle_shopify_cart_id') : null
  const lines: CartLine[] = legacyLines.map((l: any) => ({
    variantId: l.id ?? l.variantId ?? '',
    title: l.title ?? '',
    price: Number(l.price ?? 0),
    qty: Number(l.qty ?? 0),
    lineId: l.lineId,
  }))
  return {
    lines,
    checkoutUrl: undefined,
    shopifyCartId: legacyCartId,
    buyerEmail: null,
    discounts: [],
    lastUpdated: now,
    version: 2,
    add: () => undefined,
    setQty: () => undefined,
    remove: () => undefined,
    clear: () => undefined,
  }
}

export const useCartStoreV2 = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      checkoutUrl: undefined,
      shopifyCartId: null,
      buyerEmail: null,
      discounts: [],
      lastUpdated: Date.now(),
      version: 2,
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.variantId === line.variantId)
          const lines = existing
            ? s.lines.map((l) => (l.variantId === line.variantId ? { ...l, qty: l.qty + line.qty } : l))
            : [...s.lines, line]
          return { lines, lastUpdated: Date.now() }
        }),
      setQty: (variantId, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.variantId === variantId ? { ...l, qty: Math.max(0, qty) } : l)),
          lastUpdated: Date.now(),
        })),
      remove: (variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId), lastUpdated: Date.now() })),
      clear: () => set({ lines: [], checkoutUrl: undefined, shopifyCartId: null, buyerEmail: null, discounts: [], lastUpdated: Date.now() }),
    }),
    {
      name: 'lumelle_cart_v2',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted, _version) => {
        if (persisted?.state?.version === 2 && Date.now() - (persisted.state.lastUpdated ?? 0) < TTL_MS) return persisted.state
        return migrateFromLegacy(persisted?.state ?? persisted)
      },
    },
  ),
)
