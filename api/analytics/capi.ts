/**
 * Meta Conversions API (CAPI) proxy endpoint
 * Receives server-side events from the browser and forwards to Meta CAPI
 *
 * This keeps the access token server-side (secure) while allowing
 * the browser to trigger CAPI events with the correct ID format
 */

interface CAPIEvent {
  event_name: string
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
  custom_data: Record<string, unknown>
  action_source: string
  event_source_url: string
}

interface CAPIRequest {
  pixelId: string
  event: CAPIEvent
}

// Meta CAPI endpoint
const META_CAPI_URL = 'https://graph.facebook.com/v18.0'

export async function handler(req: Request): Promise<Response> {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Get server-side access token (never expose this to browser)
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    if (!accessToken) {
      console.error('[CAPI] Missing META_CAPI_ACCESS_TOKEN')
      return new Response(JSON.stringify({
        error: 'CAPI not configured',
        received: true,
        forwarded: false,
      }), {
        status: 200, // Return 200 so browser doesn't retry
        headers: { 'content-type': 'application/json' },
      })
    }

    const body = await req.json() as CAPIRequest
    const { pixelId, event } = body

    if (!pixelId || !event) {
      return new Response(JSON.stringify({ error: 'Missing pixelId or event' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Get client IP for user_data
    const clientIp = req.headers.get('x-forwarded-for') ||
                    req.headers.get('x-real-ip') ||
                    '127.0.0.1'

    // Build the event data with server-side IP
    const eventData = {
      ...event,
      user_data: {
        ...event.user_data,
        client_ip_address: clientIp.split(',')[0].trim(), // Use first IP if multiple
      },
    }

    // Send to Meta CAPI
    const capiUrl = `${META_CAPI_URL}/${pixelId}/events?access_token=${accessToken}`

    const response = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [eventData],
        // Optional: test_event_code for testing (remove in production)
        // test_event_code: 'TEST12345',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[CAPI] Meta API error:', {
        status: response.status,
        error: errorText,
        pixelId,
        eventName: event.event_name,
      })

      return new Response(JSON.stringify({
        received: true,
        forwarded: false,
        error: 'Meta API error',
      }), {
        status: 200, // Return 200 so browser doesn't retry
        headers: { 'content-type': 'application/json' },
      })
    }

    const result = await response.json()

    console.log('[CAPI] Event forwarded successfully', {
      pixelId,
      eventName: event.event_name,
      eventId: event.event_id,
      result,
    })

    return new Response(JSON.stringify({
      received: true,
      forwarded: true,
      event_id: event.event_id,
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })

  } catch (error) {
    console.error('[CAPI] Handler error:', error)
    return new Response(JSON.stringify({
      received: true,
      forwarded: false,
      error: 'Internal error',
    }), {
      status: 200, // Return 200 so browser doesn't retry
      headers: { 'content-type': 'application/json' },
    })
  }
}
