describe('restoreHandler flagging (prototype)', () => {
  it('returns 404 when feature is disabled', async () => {
    process.env.CART_RECOVERY_ENABLED = '0'
    const { restoreHandler } = await import('../api-restore')
    const res = await restoreHandler(new Request('http://x', { method: 'POST', body: JSON.stringify({ token: 't' }) }))
    expect(res.status).toBe(404)
  })
})
