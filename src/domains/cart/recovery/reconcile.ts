import type { CartLine } from './storeV2'

export type ShopifyCartLine = { id: string; quantity: number; merchandise: { id: string; title: string; product: { title: string }; price: { amount: number } } }

export type ReconcileResult = {
  lines: CartLine[]
  adjustments: { variantId: string; reason: 'qty_adjusted' | 'price_changed' | 'removed' }[]
}

export function reconcile(local: CartLine[], shopifyLines: ShopifyCartLine[]): ReconcileResult {
  const adjustments: ReconcileResult['adjustments'] = []
  const map = new Map(shopifyLines.map((l) => [l.merchandise.id, l]))
  const result: CartLine[] = []

  for (const line of local) {
    const sLine = map.get(line.variantId)
    if (!sLine) {
      adjustments.push({ variantId: line.variantId, reason: 'removed' })
      continue
    }
    const qty = sLine.quantity
    const price = Number(sLine.merchandise.price.amount)
    if (qty !== line.qty) adjustments.push({ variantId: line.variantId, reason: 'qty_adjusted' })
    if (price !== line.price) adjustments.push({ variantId: line.variantId, reason: 'price_changed' })
    result.push({ ...line, qty, price, lineId: sLine.id, title: `${sLine.merchandise.product.title} – ${sLine.merchandise.title}` })
  }

  for (const sLine of shopifyLines) {
    const exists = local.find((l) => l.variantId === sLine.merchandise.id)
    if (!exists) {
      result.push({
        variantId: sLine.merchandise.id,
        qty: sLine.quantity,
        price: Number(sLine.merchandise.price.amount),
        lineId: sLine.id,
        title: `${sLine.merchandise.product.title} – ${sLine.merchandise.title}`,
      })
    }
  }

  return { lines: result, adjustments }
}
