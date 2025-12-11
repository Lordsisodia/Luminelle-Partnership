// Feature flags and secrets for cart recovery (all default off).
export const CART_RECOVERY_ENABLED = process.env.CART_RECOVERY_ENABLED === '1'
export const CART_RECOVERY_CRON_ENABLED = process.env.CART_RECOVERY_CRON_ENABLED === '1'
export const CART_RECOVERY_DISCOUNT_ENABLED = process.env.CART_RECOVERY_DISCOUNT_ENABLED === '1'
export const CART_RECOVERY_SECRET = process.env.CART_RECOVERY_SECRET || ''

// Client-side flags (when bundled)
export const CART_RECOVERY_ENABLED_CLIENT = Boolean(import.meta?.env?.VITE_CART_RECOVERY_ENABLED)
export const CART_SHARE_ENABLED_CLIENT = Boolean(import.meta?.env?.VITE_CART_SHARE_ENABLED)
