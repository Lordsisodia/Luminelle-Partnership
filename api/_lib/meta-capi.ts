/**
 * Meta Conversions API (CAPI) server-side helper
 * Sends Purchase events from Shopify webhooks
 */

interface CAPIPurchasePayload {
  orderId: string
  value: number
  currency: string
  lineItems: Array<{
    id?: string
    variant_id?: string
    product_id?: string
    quantity?: number
    price?: string | number
  }>
  fbp?: string
  fbc?: string
  email?: string
  phone?: string
  clientIp?: string
  userAgent?: string
}

interface CAPIEvent {
  event_name: 'Purchase'
  event_time: number
  event_id: string
  user_data: {
    client_ip_address?: string
    client_user_agent?: string
    fbp?: string
    fbc?: string
    em?: string[]
    ph?: string[]
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

// Simple hash function for PII (SHA-256)
async function hashString(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Generate unique event ID for deduplication
function generateEventId(orderId: string): string {
  return `purchase_${orderId}_${Date.now()}`
}

// Extract numeric variant ID from Shopify GID
function extractVariantId(variantId: string | undefined): string | null {
  if (!variantId) return null
  // Handle gid://shopify/ProductVariant/123456789
  const match = variantId.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)
  if (match) return match[1]
  // If already numeric, return as-is
  if (/^\d+$/.test(variantId)) return variantId
  return null
}

/**
 * Send Purchase event to Meta CAPI from Shopify webhook
 */
export async function sendCAPIPurchaseFromWebhook(payload: CAPIPurchasePayload): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.debug('[CAPI Webhook] Missing pixel ID or access token, skipping')
    return
  }

  // Extract content IDs from line items
  const contentIds: string[] = []
  let numItems = 0

  for (const item of payload.lineItems) {
    const variantId = extractVariantId(item.variant_id?.toString())
    if (variantId) {
      contentIds.push(variantId)
      numItems += Number(item.quantity || 1)
    }
  }

  if (contentIds.length === 0) {
    console.warn('[CAPI Webhook] No valid content IDs found for order:', payload.orderId)
    return
  }

  // Hash customer data if available
  const hashedEmails: string[] = []
  const hashedPhones: string[] = []

  if (payload.email) {
    try {
      hashedEmails.push(await hashString(payload.email))
    } catch {
      // Ignore hash errors
    }
  }

  if (payload.phone) {
    try {
      hashedPhones.push(await hashString(payload.phone))
    } catch {
      // Ignore hash errors
    }
  }

  const event: CAPIEvent = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: generateEventId(payload.orderId),
    user_data: {
      client_ip_address: payload.clientIp,
      client_user_agent: payload.userAgent,
      fbp: payload.fbp,
      fbc: payload.fbc,
      em: hashedEmails,
      ph: hashedPhones,
    },
    custom_data: {
      value: payload.value,
      currency: payload.currency,
      content_ids: contentIds,
      content_type: 'product',
      num_items: numItems,
      order_id: payload.orderId,
    },
    action_source: 'website',
    event_source_url: 'https://lumellebeauty.co.uk/checkout',
  }

  const capiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`

  try {
    const response = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [event],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Meta API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('[CAPI Webhook] Purchase event sent successfully', {
      orderId: payload.orderId,
      eventId: event.event_id,
      result,
    })
  } catch (error) {
    console.error('[CAPI Webhook] Failed to send purchase event:', error)
    throw error
  }
}
