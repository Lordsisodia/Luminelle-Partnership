/**
 * Meta (Facebook) Pixel integration
 * Tracks e-commerce events for ad attribution and retargeting
 *
 * IMPORTANT: Content ID format must match catalog exactly
 * - Catalog expects: just the variant ID (e.g., "56829020504438")
 * - Not: shopify_GB_XXX_XXX format (that causes mismatch errors)
 */
import { captureEvent } from './posthog'

type PixelEvent =
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'CustomEvent'

interface BaseEventProps {
  content_name?: string
  content_ids?: string[]
  content_type?: 'product' | 'product_group'
  value?: number
  currency?: string
}

interface PurchaseEventProps extends BaseEventProps {
  content_ids: string[]
  value: number
  currency: string
  num_items?: number
}

declare global {
  interface Window {
    fbq?: (action: string, event: PixelEvent | string, props?: BaseEventProps) => void
  }
}

let isInitialized = false

function getPixelId(): string | undefined {
  try {
    return (import.meta as any).env?.VITE_META_PIXEL_ID as string | undefined
  } catch {
    return undefined
  }
}

/**
 * Extract the numeric variant ID from various variant key formats.
 * Handles:
 * - Stable keys: variant.lumelle-shower-cap.default
 * - Encoded keys: variant.<base64>
 * - Legacy GIDs: gid://shopify/ProductVariant/56829020504438
 *
 * Returns the numeric variant ID (e.g., "56829020504438") or the original key if no number is found.
 */
export function extractVariantId(variantKey: string): string {
  // Handle legacy GID format: gid://shopify/ProductVariant/123456789
  const gidMatch = variantKey.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)
  if (gidMatch) return gidMatch[1]

  // Handle stable keys: variant.{handle}.{variant} - extract numeric suffix if present
  // e.g., variant.lumelle-shower-cap.default -> no numeric suffix
  // We'll need to look up the actual GID for stable keys
  if (variantKey.startsWith('variant.') && variantKey.includes('.')) {
    // For stable keys, we need to map to the actual Shopify variant ID
    // This is a fallback - ideally we'd use the product config mapping
    return variantKey // Return as-is for now, will be handled by caller
  }

  // Handle encoded keys: variant.<base64> - these need to be decoded
  // For now, return as-is since we can't decode without the key registry
  return variantKey
}

/**
 * Format content ID to match Meta Catalog format.
 *
 * IMPORTANT: Catalog expects just the numeric variant ID (e.g., "56829020504438")
 * NOT the shopify_GB_XXX_XXX format - that causes "content IDs not matching" errors
 *
 * Extracts the numeric variant ID from various formats:
 * - Legacy GID: gid://shopify/ProductVariant/56829020504438 -> 56829020504438
 * - Stable key: variant.lumelle-shower-cap.default -> looks up numeric ID
 * - Already numeric: 56829020504438 -> 56829020504438
 */
export function formatShopifyContentId(productId: string | null, variantId: string | null): string {
  if (!variantId) return ''

  // Handle legacy GID format: gid://shopify/ProductVariant/123456789
  const gidMatch = variantId.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)
  if (gidMatch) return gidMatch[1]

  // If it's already numeric, return as-is
  if (/^\d+$/.test(variantId)) {
    return variantId
  }

  // Map stable variant keys to their numeric Shopify variant IDs
  // These MUST match the shopifyVariantId in product-config.ts
  const STABLE_VARIANT_TO_NUMERIC_ID: Record<string, string> = {
    'variant.lumelle-shower-cap.default': '56829020504438',
    'variant.satin-overnight-curler.default': '56852779696502',
  }

  // Check if it's a stable key we have a mapping for
  if (STABLE_VARIANT_TO_NUMERIC_ID[variantId]) {
    return STABLE_VARIANT_TO_NUMERIC_ID[variantId]
  }

  // Fallback: return as-is (shouldn't happen in production)
  console.warn(`[Meta Pixel] Unable to extract numeric variant ID from: ${variantId}`)
  return variantId
}

/**
 * Format content ID for cart items using variant keys.
 * Returns just the numeric variant ID to match catalog format.
 */
export function formatCartItemId(variantKey: string): string {
  // Handle legacy GID format: gid://shopify/ProductVariant/123456789
  const gidMatch = variantKey.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)
  if (gidMatch) {
    return gidMatch[1]
  }

  // If already numeric, return as-is
  if (/^\d+$/.test(variantKey)) {
    return variantKey
  }

  // Map stable variant keys to their numeric Shopify variant IDs
  // These MUST match the shopifyVariantId in product-config.ts
  const STABLE_VARIANT_TO_NUMERIC_ID: Record<string, string> = {
    'variant.lumelle-shower-cap.default': '56829020504438',
    'variant.satin-overnight-curler.default': '56852779696502',
  }

  // Check if it's a stable key we have a mapping for
  if (STABLE_VARIANT_TO_NUMERIC_ID[variantKey]) {
    return STABLE_VARIANT_TO_NUMERIC_ID[variantKey]
  }

  // Fallback: log warning and return as-is
  console.warn(`[Meta Pixel] Unable to extract numeric cart item ID from: ${variantKey}`)
  return variantKey
}

/**
 * Initialize Meta Pixel with the provided ID
 * Call this once on app mount if you want client-side pixel
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return
  if (isInitialized) return

  const pixelId = getPixelId()
  if (!pixelId) {
    console.debug('Meta Pixel: No VITE_META_PIXEL_ID configured')
    return
  }

  // Load Facebook Pixel script
  // Load Facebook Pixel script
  ; ((f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) => {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  if (window.fbq) {
    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')
    isInitialized = true
    console.debug(`Meta Pixel: Initialized with ID ${pixelId}`)
  }
}

/**
 * Track a standard Meta Pixel event
 * Also sends a duplicate event to PostHog for your own analytics
 */
export function trackMetaEvent(
  event: PixelEvent,
  props?: BaseEventProps,
  posthogEventName?: string
): void {
  if (typeof window === 'undefined') return

  // Send to Meta Pixel (for ads)
  if (window.fbq) {
    window.fbq('track', event, props)
    console.debug(`Meta Pixel: ${event}`, props)
  }

  // Send to PostHog (for your analytics)
  const phEvent = posthogEventName || `meta_${event.toLowerCase()}`
  captureEvent(phEvent, {
    ...(props || {}),
    meta_pixel_event: event,
    source: 'metapixel',
  })
}

/**
 * Track product view
 */
export function trackViewContent(props: {
  content_name: string
  content_ids: string[]
  value: number
  currency: string
}): void {
  trackMetaEvent('ViewContent', props, 'product_view')
}

/**
 * Track add to cart
 */
export function trackAddToCart(props: {
  content_name: string
  content_ids: string[]
  value: number
  currency: string
}): void {
  trackMetaEvent('AddToCart', props, 'cart_add')
}

/**
 * Track checkout initiation
 */
export function trackInitiateCheckout(props: {
  content_ids: string[]
  value: number
  currency: string
  num_items: number
}): void {
  trackMetaEvent('InitiateCheckout', props, 'checkout_start')
}

/**
 * Track purchase completion
 * This is the most important event for ad optimization
 */
export function trackPurchase(props: PurchaseEventProps): void {
  trackMetaEvent('Purchase', props, 'order_complete')
}

/**
 * Track custom event
 */
export function trackCustomEvent(eventName: string, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return

  // Send to Meta Pixel
  if (window.fbq) {
    window.fbq('trackCustom', eventName, props)
    console.debug(`Meta Pixel: Custom - ${eventName}`, props)
  }

  // Send to PostHog
  captureEvent(`meta_custom_${eventName}`, {
    ...(props || {}),
    source: 'metapixel',
  })
}
