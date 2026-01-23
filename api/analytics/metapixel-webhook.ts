/**
 * Meta Pixel webhook endpoint
 * Receives purchase events from Shopify's Meta Pixel integration
 *
 * Shopify → Meta Pixel → Your Backend → Database
 *
 * This allows you to track ad-attributed purchases in your own system
 */

import { createRouteHandlerClient } from '@supabase/auth-helpers-remix'
import { headers } from 'react-router'

export async function handler(req: Request): Promise<Response> {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Verify webhook signature (optional but recommended)
    // For now we'll skip signature verification for simplicity
    // In production, you should verify the X-Hub-Signature header

    const body = await req.json() as MetaPixelWebhookPayload

    // Extract the event type and data
    const { event_type, data, timestamp } = body

    // Only process purchase events (most important)
    if (event_type !== 'Purchase') {
      return new Response(JSON.stringify({ received: true, processed: false }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Extract purchase data
    const purchaseEvent = data as PurchaseEventData

    // Store in Supabase (or your database)
    const supabase = createRouteHandlerClient({ headers })

    const { error } = await supabase
      .from('meta_pixel_events')
      .insert({
        event_type: 'purchase',
        event_id: purchaseEvent.event_id,
        pixel_id: purchaseEvent.pixel_id,
        content_ids: purchaseEvent.content_ids,
        value: purchaseEvent.value,
        currency: purchaseEvent.currency,
        num_items: purchaseEvent.num_items,
        timestamp: new Date(timestamp).toISOString(),
        raw_data: purchaseEvent,
      })

    if (error) {
      console.error('Meta Pixel webhook: Failed to insert', error)
      return new Response('Failed to process', { status: 500 })
    }

    console.log('Meta Pixel webhook: Purchase event stored', {
      event_id: purchaseEvent.event_id,
      value: purchaseEvent.value,
      currency: purchaseEvent.currency,
    })

    return new Response(JSON.stringify({ received: true, processed: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error('Meta Pixel webhook error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

interface MetaPixelWebhookPayload {
  event_type: string
  data: unknown
  timestamp: number
}

interface PurchaseEventData {
  event_id: string
  pixel_id: string
  content_ids: string[]
  value: number
  currency: string
  num_items: number
  // Meta-specific fields
  fb_pixel_id?: string
  fbclid?: string
  fbc?: string // Facebook click ID
  fbp?: string // Facebook browser ID
}
