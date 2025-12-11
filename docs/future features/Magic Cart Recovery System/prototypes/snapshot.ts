// Prototype cart snapshot helpers (not wired).
import type { CartLine } from './storeV2'

export type CartSnapshotV1 = {
  v: 1
  lines: CartLine[]
  discounts: string[]
  buyerEmail?: string | null
  checkoutUrl?: string
  ts: number
}

export function toSnapshot(lines: CartLine[], discounts: string[], buyerEmail: string | null, checkoutUrl?: string): CartSnapshotV1 {
  return { v: 1, lines, discounts, buyerEmail, checkoutUrl, ts: Date.now() }
}

export function fromSnapshot(raw: any): CartSnapshotV1 | null {
  if (!raw || raw.v !== 1 || !Array.isArray(raw.lines)) return null
  return raw as CartSnapshotV1
}
