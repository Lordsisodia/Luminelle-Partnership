import { enqueue, markFailure, markSuccess, next } from '../queue'

describe('queue', () => {
  it('enqueues and pops', () => {
    let q: any[] = []
    q = enqueue(q, { op: 'add', variantId: 'v1', qty: 1 })
    expect(next(q)?.op).toBe('add')
    q = markSuccess(q)
    expect(q.length).toBe(0)
  })

  it('retries then drops after max attempts', () => {
    let q: any[] = []
    q = enqueue(q, { op: 'add', variantId: 'v1', qty: 1 })
    q = markFailure(q, 2) // attempt 1
    q = markFailure(q, 2) // attempt 2 -> drop
    expect(q.length).toBe(0)
  })
})
