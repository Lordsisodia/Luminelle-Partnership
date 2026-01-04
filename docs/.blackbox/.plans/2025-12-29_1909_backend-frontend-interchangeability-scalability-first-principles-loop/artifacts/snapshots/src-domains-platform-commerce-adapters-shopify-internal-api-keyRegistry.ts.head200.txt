import type { VariantKey } from '@platform/ports'
import { PortError } from '@platform/ports'
import { decodeVariantKey, encodeVariantKey } from './keys'

// v1 stable keys (provider-independent) -> Shopify variant GIDs.
//
// This is intentionally kept behind the provider adapter boundary so UI/client
// code never needs to store or reason about Shopify identifiers.
//
// Evidence + naming scheme: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/key-mapping-spec-v1.md`
const SHOPIFY_VARIANT_GID_BY_STABLE_VARIANT_KEY = {
  'variant.lumelle-shower-cap.default': 'gid://shopify/ProductVariant/56829020504438',
  'variant.satin-overnight-curler.default': 'gid://shopify/ProductVariant/56852779696502',
} as const

const stableVariantKeyFromShopifyGid = (gid: string): VariantKey | null => {
  for (const [key, value] of Object.entries(SHOPIFY_VARIANT_GID_BY_STABLE_VARIANT_KEY)) {
    if (value === gid) return key as VariantKey
  }
  return null
}

const isLegacyShopifyGid = (value: string) => value.startsWith('gid://shopify/')
const looksLikeEncodedVariantKey = (key: string) => {
  if (!key.startsWith('variant.')) return false
  const rest = key.slice('variant.'.length)
  // v0 encoded keys are `variant.<base64url>`, which will never contain a dot.
  // v1 stable keys are `variant.<handle>.<variant>`, which always contain at least one dot.
  return rest.length > 0 && !rest.includes('.')
}

export const toVariantKey = (shopifyVariantGid: string): VariantKey => {
  return stableVariantKeyFromShopifyGid(shopifyVariantGid) ?? encodeVariantKey(shopifyVariantGid)
}

export const resolveShopifyVariantGid = (variantKey: VariantKey): string => {
  // Defensive support for legacy callers (older localStorage, etc.).
  // UI/client code should not produce these after PR7.
  if (isLegacyShopifyGid(variantKey)) return variantKey

  if (looksLikeEncodedVariantKey(variantKey)) return decodeVariantKey(variantKey)

  const gid = (SHOPIFY_VARIANT_GID_BY_STABLE_VARIANT_KEY as Record<string, string | undefined>)[variantKey]
  if (gid) return gid

  throw new PortError('NOT_FOUND', `No Shopify mapping found for variantKey: ${variantKey}`)
}

