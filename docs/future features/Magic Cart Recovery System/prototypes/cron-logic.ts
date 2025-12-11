// Prototype cron logic (not imported). Illustrates flow with Supabase + Resend.
import { CART_RECOVERY_CRON_ENABLED, CART_RECOVERY_DISCOUNT_ENABLED } from './env.server'
import type { RecoveryJob } from './jobs'
import * as supabase from './supabase-shim'
import { sendEmail } from './resend-shim'

const cadenceMs = [1, 4, 24, 72, 120].map((h) => h * 60 * 60 * 1000)

function nextSendTime(attempt: number): string | null {
  if (attempt >= cadenceMs.length) return null
  return new Date(Date.now() + cadenceMs[attempt]).toISOString()
}

export async function runCron(): Promise<string> {
  if (!CART_RECOVERY_CRON_ENABLED) return 'disabled'
  const jobs = await supabase.fetchDueJobs()
  for (const job of jobs) {
    try {
      const discountEligible = CART_RECOVERY_DISCOUNT_ENABLED && job.attempt === 1
      const discountCode = discountEligible ? 'SAVE10' : undefined
      await sendEmail({
        to: job.email,
        subject: discountEligible ? 'Take 10% off—your cart is waiting' : 'Your cart is waiting',
        html: `<p>Resume checkout:</p><p><a href="${job.restoreUrl}">${job.restoreUrl}</a></p>${discountCode ? `<p>Code: ${discountCode}</p>` : ''}`,
      })
      const next = nextSendTime(job.attempt + 1)
      await supabase.markAttempt(job.id, next ? 'pending' : 'completed', next, discountEligible || job.discountSent)
      await supabase.logEvent(job.id, 'sent', { attempt: job.attempt, discount: discountEligible })
    } catch (err: any) {
      await supabase.logEvent(job.id, 'failed', { error: String(err) })
      const next = nextSendTime(job.attempt + 1)
      const status = next ? 'pending' : 'failed'
      await supabase.markAttempt(job.id, status, next, job.discountSent)
    }
  }
  return 'ok'
}
