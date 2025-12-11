import { signRestoreToken } from '../token'

describe('shareHandler missing fields', () => {
  it('400 when missing cartId and snapshot', async () => {
    process.env.CART_RECOVERY_ENABLED = '1'
    process.env.CART_RECOVERY_SECRET = 's'
    const { shareHandler } = await import('../api-share')
    const res = await shareHandler(new Request('http://x', { method: 'POST', body: JSON.stringify({}) }))
    expect(res.status).toBe(400)
  })
})

describe('restoreHandler invalid token', () => {
  it('401 when token invalid', async () => {
    process.env.CART_RECOVERY_ENABLED = '1'
    process.env.CART_RECOVERY_SECRET = 's'
    const { restoreHandler } = await import('../api-restore')
    const res = await restoreHandler(new Request('http://x', { method: 'POST', body: JSON.stringify({ token: 'bad' }) }))
    expect(res.status).toBe(401)
  })

  it('200 when token valid', async () => {
    process.env.CART_RECOVERY_ENABLED = '1'
    process.env.CART_RECOVERY_SECRET = 's'
    const token = signRestoreToken({ cartId: 'c1', issuedAt: Date.now(), expiresAt: Date.now() + 1000, nonce: 'n', v: 1 }, 's')
    const { restoreHandler } = await import('../api-restore')
    const res = await restoreHandler(new Request('http://x', { method: 'POST', body: JSON.stringify({ token }) }))
    expect(res.status).toBe(200)
  })
})
