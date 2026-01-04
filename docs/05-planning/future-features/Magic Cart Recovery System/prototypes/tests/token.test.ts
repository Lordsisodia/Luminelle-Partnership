import { signRestoreToken, verifyRestoreToken } from '../token'

const secret = 'test-secret'

describe('token', () => {
  it('round-trips a valid payload', () => {
    const token = signRestoreToken({ cartId: 'c1', issuedAt: Date.now(), expiresAt: Date.now() + 1000, nonce: 'n', v: 1 }, secret)
    const payload = verifyRestoreToken(token, secret)
    expect(payload?.cartId).toBe('c1')
  })

  it('rejects expired token', () => {
    const token = signRestoreToken({ cartId: 'c1', issuedAt: Date.now() - 2000, expiresAt: Date.now() - 1000, nonce: 'n', v: 1 }, secret)
    expect(verifyRestoreToken(token, secret)).toBeNull()
  })

  it('rejects tampered token', () => {
    const token = signRestoreToken({ cartId: 'c1', issuedAt: Date.now(), expiresAt: Date.now() + 1000, nonce: 'n', v: 1 }, secret)
    const [body] = token.split('.')
    const tampered = `${body}.bad`
    expect(verifyRestoreToken(tampered, secret)).toBeNull()
  })
})
