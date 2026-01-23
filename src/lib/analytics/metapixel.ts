/**
 * Meta (Facebook) Pixel integration
 * Tracks e-commerce events for ad attribution and retargeting
 */

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
 * Format content ID to match Shopify's Facebook Catalog format:
 * shopify_{COUNTRY}_{PRODUCT_ID}_{VARIANT_ID}
 * Defaults to GB for country.
 */
export function formatShopifyContentId(productId: string | null, variantId: string | null): string {
  if (!variantId) return ''

  const cleanId = (id: string) => id.replace(/gid:\/\/shopify\/(Product|ProductVariant)\//, '')
  const vId = cleanId(variantId)

  if (productId) {
    const pId = cleanId(productId)
    return `shopify_GB_${pId}_${vId}`
  }

  return vId
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
  const { captureEvent } = require('./posthog')
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
  const { captureEvent } = require('./posthog')
  captureEvent(`meta_custom_${eventName}`, {
    ...(props || {}),
    source: 'metapixel',
  })
}
