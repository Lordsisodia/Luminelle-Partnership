describe('shareHandler flagging (prototype)', () => {
  it('returns 404 when feature is disabled', async () => {
    process.env.CART_RECOVERY_ENABLED = '0'
    const { shareHandler } = await import('../api-share')
    const res = await shareHandler(new Request('http://x', { method: 'POST', body: JSON.stringify({ cartId: 'c1' }) }))
    expect(res.status).toBe(404)
  })
})
