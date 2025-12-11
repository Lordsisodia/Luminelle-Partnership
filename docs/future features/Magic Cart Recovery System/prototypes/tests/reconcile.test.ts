import { reconcile } from '../reconcile'

const shopifyLine = (id: string, qty: number, price = 10) => ({
  id: `line-${id}`,
  quantity: qty,
  merchandise: { id, title: `Size ${id}`, product: { title: 'Prod' }, price: { amount: price } },
})

describe('reconcile', () => {
  it('flags qty changes and price changes', () => {
    const local = [{ variantId: 'v1', title: 'Prod – Size v1', price: 9, qty: 1 }]
    const shopify = [shopifyLine('v1', 2, 11)]
    const res = reconcile(local, shopify as any)
    expect(res.adjustments.map((a) => a.reason).sort()).toEqual(['price_changed', 'qty_adjusted'])
    expect(res.lines[0].qty).toBe(2)
    expect(res.lines[0].price).toBe(11)
  })

  it('removes missing lines and adds new ones', () => {
    const local = [{ variantId: 'v1', title: 'Prod – Size v1', price: 10, qty: 1 }]
    const shopify = [shopifyLine('v2', 1, 10)]
    const res = reconcile(local, shopify as any)
    expect(res.adjustments.some((a) => a.reason === 'removed')).toBe(true)
    expect(res.lines.find((l) => l.variantId === 'v2')).toBeTruthy()
  })
})
