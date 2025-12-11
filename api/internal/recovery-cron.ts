import { CART_RECOVERY_CRON_ENABLED } from '@/domains/shop/cart/recovery/env'

export default async function handler(_req: Request) {
  if (!CART_RECOVERY_CRON_ENABLED) return new Response('cron disabled', { status: 204 })
  // TODO: hook into Supabase + Resend; for now, return not implemented.
  return new Response('not implemented', { status: 501 })
}
