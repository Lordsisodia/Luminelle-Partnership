/**
 * Meta Conversions API (CAPI) integration
 * Sends server-side events to Meta for better attribution and deduplication
 *
 * This complements the browser pixel (metapixel.ts) by:
 * 1. Sending events with correct numeric ID format
 * 2. Providing deduplication with Shopify's browser events
 * 3. Working around Shopify's shopify_GB_XXX_XXX format limitation
 */

import { captureEvent } from './posthog'

type CAPIEventName =
  | 'Purchase'
  | 'AddToCart'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'Search'
  | 'AddToWishlist'
  | 'AddPaymentInfo'
  | 'Subscribe'
  | 'StartTrial'
  | 'CompleteRegistration'
  | 'Contact'
  | 'FindLocation'
  | 'Schedule'

interface CAPIEvent {
  event_name: CAPIEventName
  event_time: number
  event_id: string
  user_data: {
    client_ip_address?: string
    client_user_agent?: string
    fbp?: string
    fbc?: string
    em?: string[] // Hashed emails
    ph?: string[] // Hashed phone numbers
  }
  custom_data: Record<string, unknown>
  action_source: 'website'
  event_source_url: string
}

interface BaseCAPIParams {
  contentIds?: string[]
  contentType?: 'product' | 'product_group'
  value?: number
  currency?: string
  numItems?: number
  customerEmail?: string
  customerPhone?: string
  searchString?: string
  status?: boolean
  contents?: Array<{
    id: string
    quantity: number
    item_price?: number
  }>
}

interface PurchaseParams extends BaseCAPIParams {
  orderId: string
  value: number
  currency: string
  contentIds: string[]
  numItems: number
}

// Generate unique event ID for deduplication
function generateEventId(eventName: string, identifier: string): string {
  return `${eventName.toLowerCase()}_${identifier}_${Date.now()}`
}

// Simple hash function for PII (SHA-256 would be better but this is client-side)
async function hashString(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Get Facebook browser ID (fbp) from cookie
function getFbp(): string | undefined {
  const match = document.cookie.match(/_fbp=([^;]+)/)
  return match ? match[1] : undefined
}

// Get Facebook click ID (fbc) from cookie or URL
function getFbc(): string | undefined {
  // Check cookie first
  const cookieMatch = document.cookie.match(/_fbc=([^;]+)/)
  if (cookieMatch) return cookieMatch[1]

  // Check URL for fbclid
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get('fbclid')
  if (fbclid) {
    return `fb.1.${Date.now()}.${fbclid}`
  }

  return undefined
}

/**
 * Send event to CAPI via backend proxy
 */
async function sendCAPIEvent(event: CAPIEvent): Promise<void> {
  const pixelId = (import.meta as any).env?.VITE_META_PIXEL_ID as string | undefined

  if (!pixelId) {
    console.debug('[CAPI] Missing pixel ID, skipping server-side event')
    return
  }

  try {
    const response = await fetch('/api/analytics/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pixelId,
        event,
      }),
    })

    if (!response.ok) {
      throw new Error(`CAPI request failed: ${response.status}`)
    }

    console.debug(`[CAPI] ${event.event_name} event sent successfully`, { eventId: event.event_id })

    // Track in PostHog
    captureEvent(`capi_${event.event_name.toLowerCase()}_sent`, {
      event_id: event.event_id,
      ...event.custom_data,
    })
  } catch (error) {
    console.error(`[CAPI] Failed to send ${event.event_name} event:`, error)
  }
}

/**
 * Build user data for CAPI events
 */
async function buildUserData(params: BaseCAPIParams): Promise<CAPIEvent['user_data']> {
  const hashedEmails: string[] = []
  const hashedPhones: string[] = []

  if (params.customerEmail) {
    try {
      hashedEmails.push(await hashString(params.customerEmail))
    } catch {
      // Ignore hash errors
    }
  }

  if (params.customerPhone) {
    try {
      hashedPhones.push(await hashString(params.customerPhone))
    } catch {
      // Ignore hash errors
    }
  }

  return {
    client_ip_address: undefined, // Will be set by server if proxied
    client_user_agent: navigator.userAgent,
    fbp: getFbp(),
    fbc: getFbc(),
    em: hashedEmails,
    ph: hashedPhones,
  }
}

/**
 * Send Purchase event via Conversions API
 */
export async function sendCAPIPurchase(params: PurchaseParams): Promise<void> {
  const eventId = generateEventId('purchase', params.orderId)
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      content_type: 'product',
      num_items: params.numItems,
      order_id: params.orderId,
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send AddToCart event via Conversions API
 */
export async function sendCAPIAddToCart(params: BaseCAPIParams): Promise<void> {
  const eventId = generateEventId('addtocart', params.contentIds?.[0] || 'unknown')
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'AddToCart',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      content_type: params.contentType || 'product',
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send ViewContent event via Conversions API
 */
export async function sendCAPIViewContent(params: BaseCAPIParams): Promise<void> {
  const eventId = generateEventId('viewcontent', params.contentIds?.[0] || 'unknown')
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      content_type: params.contentType || 'product',
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send InitiateCheckout event via Conversions API
 */
export async function sendCAPIInitiateCheckout(params: BaseCAPIParams): Promise<void> {
  const eventId = generateEventId('initiatecheckout', Date.now().toString())
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'InitiateCheckout',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      content_type: params.contentType || 'product',
      num_items: params.numItems,
      contents: params.contents,
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send Search event via Conversions API
 */
export async function sendCAPISearch(params: BaseCAPIParams & { searchString: string }): Promise<void> {
  const eventId = generateEventId('search', params.searchString)
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'Search',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      search_string: params.searchString,
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send AddPaymentInfo event via Conversions API
 */
export async function sendCAPIAddPaymentInfo(params: BaseCAPIParams): Promise<void> {
  const eventId = generateEventId('addpaymentinfo', params.contentIds?.[0] || 'unknown')
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'AddPaymentInfo',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      content_type: params.contentType || 'product',
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send CompleteRegistration event via Conversions API
 */
export async function sendCAPICompleteRegistration(params: BaseCAPIParams & { status?: boolean }): Promise<void> {
  const eventId = generateEventId('completeregistration', Date.now().toString())
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'CompleteRegistration',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {
      status: params.status,
    },
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Send Contact event via Conversions API
 */
export async function sendCAPIContact(params: BaseCAPIParams = {}): Promise<void> {
  const eventId = generateEventId('contact', Date.now().toString())
  const userData = await buildUserData(params)

  const event: CAPIEvent = {
    event_name: 'Contact',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: userData,
    custom_data: {},
    action_source: 'website',
    event_source_url: window.location.href,
  }

  await sendCAPIEvent(event)
}

/**
 * Track Purchase with both browser pixel and CAPI
 * Use this on order confirmation page for maximum coverage
 */
export async function trackPurchaseWithCAPI(params: PurchaseParams): Promise<void> {
  // Send browser event (will be deduplicated with Shopify's event)
  // This uses the browser pixel (metapixel.ts)
  const { trackPurchase } = await import('./metapixel')
  trackPurchase({
    content_ids: params.contentIds,
    value: params.value,
    currency: params.currency,
    num_items: params.numItems,
  })

  // Send server-side event with correct ID format
  await sendCAPIPurchase(params)
}

/**
 * Track AddToCart with both browser pixel and CAPI
 */
export async function trackAddToCartWithCAPI(params: BaseCAPIParams): Promise<void> {
  const { trackAddToCart } = await import('./metapixel')
  trackAddToCart({
    content_name: params.contentIds?.[0] || '',
    content_ids: params.contentIds || [],
    content_type: params.contentType || 'product',
    value: params.value || 0,
    currency: params.currency || 'GBP',
  })

  await sendCAPIAddToCart(params)
}

/**
 * Track ViewContent with both browser pixel and CAPI
 */
export async function trackViewContentWithCAPI(params: BaseCAPIParams): Promise<void> {
  const { trackViewContent } = await import('./metapixel')
  trackViewContent({
    content_name: params.contentIds?.[0] || '',
    content_ids: params.contentIds || [],
    content_type: params.contentType || 'product',
    value: params.value || 0,
    currency: params.currency || 'GBP',
  })

  await sendCAPIViewContent(params)
}

/**
 * Track InitiateCheckout with both browser pixel and CAPI
 */
export async function trackInitiateCheckoutWithCAPI(params: BaseCAPIParams): Promise<void> {
  const { trackInitiateCheckout } = await import('./metapixel')
  trackInitiateCheckout({
    content_ids: params.contentIds || [],
    value: params.value || 0,
    currency: params.currency || 'GBP',
    num_items: params.numItems || 0,
  })

  await sendCAPIInitiateCheckout(params)
}

/**
 * Track Search with both browser pixel and CAPI
 */
export async function trackSearchWithCAPI(params: BaseCAPIParams & { searchString: string }): Promise<void> {
  const { trackMetaEvent } = await import('./metapixel')
  trackMetaEvent('Search', { search_string: params.searchString }, 'search')

  await sendCAPISearch(params)
}

/**
 * Track CompleteRegistration with both browser pixel and CAPI
 */
export async function trackCompleteRegistrationWithCAPI(params: BaseCAPIParams & { status?: boolean } = {}): Promise<void> {
  const { trackMetaEvent } = await import('./metapixel')
  trackMetaEvent('CompleteRegistration', { status: params.status }, 'registration_complete')

  await sendCAPICompleteRegistration(params)
}

/**
 * Track Contact with both browser pixel and CAPI
 */
export async function trackContactWithCAPI(params: BaseCAPIParams = {}): Promise<void> {
  const { trackMetaEvent } = await import('./metapixel')
  trackMetaEvent('Contact', {}, 'contact')

  await sendCAPIContact(params)
}
