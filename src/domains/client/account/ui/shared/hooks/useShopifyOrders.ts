import type { Order } from '../components/OrderCard'

interface UseShopifyOrdersOptions {
  customerAccessToken?: string
}

interface ShopifyOrdersResponse {
  orders: Order[]
  error?: string
}

interface ShopifyOrder {
  id: string
  orderNumber: number
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string
  currentTotalPrice: {
    amount: string
    currencyCode: string
  }
  lineItems: {
    edges: Array<{
      node: {
        id: string
        title: string
        quantity: number
        variant?: {
          price: string
          image?: {
            url: string
            altText?: string
          }
        }
      }
    }>
  }
}

/**
 * Fetch orders from Shopify Customer Account API
 * @param customerAccessToken - Shopify customer access token
 * @returns Orders with error state
 */
export async function fetchShopifyOrders(
  customerAccessToken?: string
): Promise<ShopifyOrdersResponse> {
  if (!customerAccessToken) {
    return { orders: [] }
  }

  const query = `
    query customerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 50) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              currentTotalPrice {
                amount
                currencyCode
              }
              lineItems(first: 10) {
                edges {
                  node {
                    id
                    title
                    quantity
                    variant {
                      price
                      image {
                        url
                        altText
                      }
                    }
                  }
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
        variables: { customerAccessToken },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      return { orders: [], error: data.errors[0].message }
    }

    // Transform Shopify response to our format
    const orders: Order[] = data.data?.customer?.orders?.edges?.map((edge: { node: ShopifyOrder }) => {
      const order = edge.node
      return {
        id: order.id,
        orderNumber: order.orderNumber.toString(),
        processedAt: order.processedAt,
        financialStatus: order.financialStatus,
        fulfillmentStatus: order.fulfillmentStatus || 'unfulfilled',
        currentTotalPrice: {
          amount: parseFloat(order.currentTotalPrice.amount),
          currencyCode: order.currentTotalPrice.currencyCode,
        },
        lineItems: {
          nodes: order.lineItems.edges.map((edge) => edge.node),
        },
      }
    }) || []

    return { orders }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return {
      orders: [],
      error: error instanceof Error ? error.message : 'Failed to fetch orders',
    }
  }
}
