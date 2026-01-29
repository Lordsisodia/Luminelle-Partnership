/**
 * Meta Conversions API (CAPI) integration
 * Sends server-side purchase events to Meta for better attribution and deduplication
 *
 * This complements the browser pixel (metapixel.ts) by:
 * 1. Sending Purchase events with correct numeric ID format
 * 2. Providing deduplication with Shopify's browser events
 * 3. Working around Shopify's shopify_GB_XXX_XXX format limitation
 */

import { captureEvent } from './posthog'

interface CAPIPurchaseEvent {
  event_name: 'Purchase'
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
  custom_data: {
    value: number
    currency: string
    content_ids: string[]
    content_type: 'product'
    num_items: number
    order_id: string
  }
  action_source: 'website'
  event_source_url: string
}

interface PurchaseParams {
  orderId: string
  value: number
  currency: string
  contentIds: string[]
  numItems: number
  customerEmail?: string
  customerPhone?: string
}

// Generate unique event ID for deduplication
function generateEventId(orderId: string): string {
  return `purchase_${orderId}_${Date.now()}`
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
 * Send Purchase event via Conversions API
 * This sends a server-side event that will deduplicate with Shopify's browser Purchase event
 */
export async function sendCAPIPurchase(params: PurchaseParams): Promise<void> {
  const pixelId = (import.meta as any).env?.VITE_META_PIXEL_ID as string | undefined
  const accessToken = (import.meta as any).env?.VITE_META_CAPI_TOKEN as string | undefined

  if (!pixelId || !accessToken) {
    console.debug('[CAPI] Missing pixel ID or access token, skipping server-side event')
    return
  }

  const eventId = generateEventId(params.orderId)

  // Hash customer data if available
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

  const event: CAPIPurchaseEvent = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: {
      client_ip_address: undefined, // Will be set by server if proxied
      client_user_agent: navigator.userAgent,
      fbp: getFbp(),
      fbc: getFbc(),
      em: hashedEmails,
      ph: hashedPhones,
    },
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

  try {
    // Send to your backend endpoint that will forward to Meta CAPI
    // This avoids exposing your access token in the browser
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

    console.debug('[CAPI] Purchase event sent successfully', { eventId, orderId: params.orderId })

    // Also track in PostHog
    captureEvent('capi_purchase_sent', {
      order_id: params.orderId,
      value: params.value,
      currency: params.currency,
      content_ids: params.contentIds,
      event_id: eventId,
    })
  } catch (error) {
    console.error('[CAPI] Failed to send purchase event:', error)
  }
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
