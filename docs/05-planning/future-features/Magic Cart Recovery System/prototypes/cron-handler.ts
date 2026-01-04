// Vercel cron prototype (dark). No-op unless enabled.
import { CART_RECOVERY_CRON_ENABLED } from './env.server'

export default async function handler(_req: Request): Promise<Response> {
  if (!CART_RECOVERY_CRON_ENABLED) return new Response('cron disabled', { status: 204 })
  // TODO: fetch due jobs from Supabase, send via Resend, update attempts/next_send_at.
  return new Response('not implemented', { status: 501 })
}
