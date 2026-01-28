/**
 * Shopify Tracking API integration
 * Fetches order tracking information from Shopify
 */

interface ShopifyOrderResponse {
  order?: {
    id: string
    orderNumber: number
    processedAt: string
    fulfillmentStatus: string
    trackingUrl?: string
    trackingCompany?: string
    trackingNumber?: string
    successfulFulfillments: Array<{
      trackingInfo?: Array<{
        trackingNumber: string
        trackingUrl?: string
        company?: string
      }>
    }>
    lineItems: {
      edges: Array<{
        node: {
          title: string
          variant?: {
            image?: {
              url: string
            }
          }
        }
      }>
    }
  }
  error?: { message: string }
}

interface TrackingTimelineEvent {
  status: 'ordered' | 'processing' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered'
  title: string
  description: string
  date?: string
  completed: boolean
}

export async function fetchShopifyOrderForTracking(
  orderNumber: string,
  email: string,
  customerAccessToken?: string
): Promise<{ order?: ShopifyOrderResponse['order']; trackingEvents?: TrackingTimelineEvent[]; error?: string }> {
  const query = `
    query orderLookup($orderNumber: String!, $email: String!) {
      order(number: $orderNumber, email: $email) {
        id
        orderNumber
        processedAt
        fulfillmentStatus
        trackingUrl
        trackingCompany
        trackingNumber
        successfulFulfillments {
          trackingInfo {
            trackingNumber
            trackingUrl
            company
          }
        }
        lineItems(first: 1) {
          edges {
            node {
              title
              variant {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(import.meta.env.VITE_SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { orderNumber: parseInt(orderNumber), email },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      return { error: data.errors[0].message }
    }

    const order = data.data?.order

    if (!order) {
      return { error: 'Order not found. Please check your order number and email.' }
    }

    // Generate tracking timeline events
    const trackingEvents: TrackingTimelineEvent[] = [
      {
        status: 'ordered',
        title: 'Order placed',
        description: 'Your order has been confirmed',
        date: order.processedAt,
        completed: true,
      },
    ]

    // Add fulfillment events based on status
    if (order.fulfillmentStatus === 'fulfilled' || order.fulfillmentStatus === 'in_progress') {
      trackingEvents.push({
        status: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared',
        completed: order.fulfillmentStatus === 'fulfilled',
      })
    }

    if (order.fulfillmentStatus === 'fulfilled') {
      trackingEvents.push({
        status: 'picked_up',
        title: 'Picked up',
        description: 'Your order has been picked up by the carrier',
        completed: true,
      })

      trackingEvents.push({
        status: 'in_transit',
        title: 'In transit',
        description: 'Your package is on its way',
        completed: true,
      })

      // If tracking info is available, add delivered event (or estimate)
      if (order.successfulFulfillments?.[0]?.trackingInfo?.[0]) {
        trackingEvents.push({
          status: 'out_for_delivery',
          title: 'Out for delivery',
          description: 'Your package is out for delivery',
          completed: false, // We can't know this from basic tracking
        })
      }
    }

    return { order, trackingEvents }
  } catch (error) {
    console.error('Error fetching order for tracking:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch tracking information',
    }
  }
}
