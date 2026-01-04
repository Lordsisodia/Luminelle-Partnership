import { env } from '@/utils/env'

export type VolumeDiscountTier = {
  minQty: number
  badge: string
  code: string
}

// Provider-independent key (resolved by commerce adapter boundary).
// Key scheme: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/key-mapping-spec-v1.md`
export const SHOWER_CAP_VARIANT_KEY = 'variant.lumelle-shower-cap.default'

const normalizeDiscountCode = (code: string): string => code.trim().toUpperCase()

// Public discount codes (configured in Shopify admin).
// Defaults are used if env vars are not set.
const SHOWER_CAP_QTY2_CODE = normalizeDiscountCode(env('SHOWER_CAP_DISCOUNT_CODE_QTY2') || 'CAP2SAVE10')
const SHOWER_CAP_QTY4_CODE = normalizeDiscountCode(env('SHOWER_CAP_DISCOUNT_CODE_QTY4') || 'CAP4SAVE15')

export const SHOWER_CAP_TIERS: VolumeDiscountTier[] = [
  { minQty: 4, badge: 'Save 15%', code: SHOWER_CAP_QTY4_CODE },
  { minQty: 2, badge: 'Save 10%', code: SHOWER_CAP_QTY2_CODE },
]

export const getVolumeDiscountTierForVariant = (
  variantKey: string,
  qty: number,
): VolumeDiscountTier | null => {
  if (variantKey !== SHOWER_CAP_VARIANT_KEY) return null
  const safeQty = Number.isFinite(qty) ? qty : 0
  return SHOWER_CAP_TIERS.find((tier) => safeQty >= tier.minQty) ?? null
}

export const getVolumeDiscountCodes = (): Set<string> => new Set(SHOWER_CAP_TIERS.map((t) => t.code))
