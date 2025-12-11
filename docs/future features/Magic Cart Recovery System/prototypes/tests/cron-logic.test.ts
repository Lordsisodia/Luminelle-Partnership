/**
 * Jest-style tests; kept in docs only. Mocks Supabase and Resend shims.
 */

jest.mock('../supabase-shim', () => ({
  fetchDueJobs: jest.fn(),
  markAttempt: jest.fn(),
  logEvent: jest.fn(),
}))

jest.mock('../resend-shim', () => ({
  sendEmail: jest.fn(),
}))

import { runCron } from '../cron-logic'
import { fetchDueJobs, markAttempt, logEvent } from '../supabase-shim'
import { sendEmail } from '../resend-shim'

describe('runCron', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    process.env.CART_RECOVERY_CRON_ENABLED = '1'
    process.env.CART_RECOVERY_DISCOUNT_ENABLED = '1'
  })

  it('returns disabled when flag off', async () => {
    process.env.CART_RECOVERY_CRON_ENABLED = '0'
    const res = await runCron()
    expect(res).toBe('disabled')
  })

  it('processes a due job and schedules next', async () => {
    ;(fetchDueJobs as jest.Mock).mockResolvedValue([
      {
        id: 'j1',
        email: 'a@b.com',
        restoreUrl: 'https://x',
        cartId: 'c1',
        nextSendAt: new Date().toISOString(),
        attempt: 0,
        status: 'pending',
        discountSent: false,
        createdAt: '',
        updatedAt: '',
      },
    ])
    const res = await runCron()
    expect(res).toBe('ok')
    expect(sendEmail).toHaveBeenCalledTimes(1)
    expect(markAttempt).toHaveBeenCalledWith(expect.any(String), 'pending', expect.any(String), true)
    expect(logEvent).toHaveBeenCalledWith('j1', 'sent', expect.any(Object))
  })

  it('marks failed on send error', async () => {
    ;(fetchDueJobs as jest.Mock).mockResolvedValue([
      {
        id: 'j1',
        email: 'a@b.com',
        restoreUrl: 'https://x',
        cartId: 'c1',
        nextSendAt: new Date().toISOString(),
        attempt: 4, // will exceed cadence
        status: 'pending',
        discountSent: false,
        createdAt: '',
        updatedAt: '',
      },
    ])
    ;(sendEmail as jest.Mock).mockRejectedValue(new Error('fail'))
    const res = await runCron()
    expect(res).toBe('ok')
    expect(logEvent).toHaveBeenCalledWith('j1', 'failed', expect.any(Object))
    expect(markAttempt).toHaveBeenCalledWith('j1', 'failed', null, false)
  })
})
