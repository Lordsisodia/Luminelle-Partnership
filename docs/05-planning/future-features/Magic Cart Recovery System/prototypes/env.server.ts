// Server-side feature flag readers (prototype).
export const CART_RECOVERY_ENABLED = process.env.CART_RECOVERY_ENABLED === '1'
export const CART_RECOVERY_CRON_ENABLED = process.env.CART_RECOVERY_CRON_ENABLED === '1'
export const CART_RECOVERY_DISCOUNT_ENABLED = process.env.CART_RECOVERY_DISCOUNT_ENABLED === '1'
export const CART_RECOVERY_SECRET = process.env.CART_RECOVERY_SECRET || ''
