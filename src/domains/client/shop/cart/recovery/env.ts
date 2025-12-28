// Feature flags and secrets for cart recovery (all default off).
//
// IMPORTANT: This file may be imported into the browser bundle. Direct `process.env.*` reads
// can crash at runtime in the browser if `process` isn't defined. Guard access so these
// exports degrade safely (false/empty) when bundled.
const serverEnv: Record<string, string | undefined> =
  typeof process !== 'undefined' && process.env ? (process.env as Record<string, string | undefined>) : {}

export const CART_RECOVERY_ENABLED = serverEnv.CART_RECOVERY_ENABLED === '1'
export const CART_RECOVERY_CRON_ENABLED = serverEnv.CART_RECOVERY_CRON_ENABLED === '1'
export const CART_RECOVERY_DISCOUNT_ENABLED = serverEnv.CART_RECOVERY_DISCOUNT_ENABLED === '1'
export const CART_RECOVERY_SECRET = serverEnv.CART_RECOVERY_SECRET ?? ''

// Client-side flags (when bundled)
const parseClientFlag = (value: unknown) => {
  if (value == null) return false
  if (typeof value === 'boolean') return value
  if (typeof value !== 'string') return Boolean(value)
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  return false
}

export const CART_RECOVERY_ENABLED_CLIENT = parseClientFlag(import.meta?.env?.VITE_CART_RECOVERY_ENABLED)
export const CART_SHARE_ENABLED_CLIENT = parseClientFlag(import.meta?.env?.VITE_CART_SHARE_ENABLED)
