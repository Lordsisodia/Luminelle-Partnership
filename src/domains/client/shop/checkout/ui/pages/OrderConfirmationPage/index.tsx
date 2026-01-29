import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { CheckCircle, Package, Truck, Download } from 'lucide-react'

interface ShopifyOrderResponse {
  order?: {
    id: string
    orderNumber: number
    processedAt: string
    currentTotalPrice: {
      amount: string
      currencyCode: string
    }
    subtotalPrice: {
      amount: string
      currencyCode: string
    }
    totalShippingPrice: {
      amount: string
      currencyCode: string
    } | null
    lineItems: {
      edges: Array<{
        node: {
          id: string
          title: string
          quantity: number
          variant: {
            id: string
            price: string
            image?: {
              url: string
              altText?: string
            }
          }
        }
      }>
    }
  } | null
  error?: { message: string }
}

async function fetchShopifyOrderForConfirmation(
  orderId: string,
  customerAccessToken?: string
): Promise<{ order?: ShopifyOrderResponse['order']; error?: string }> {
  const query = `
    query customerOrder($customerAccessToken: String!, $orderId: ID!) {
      customer(customerAccessToken: $customerAccessToken) {
        order(id: $orderId) {
          id
          orderNumber
          processedAt
          currentTotalPrice {
            amount
            currencyCode
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          lineItems(first: 20) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
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
        variables: {
          customerAccessToken: customerAccessToken || '',
          orderId: `gid://shopify/Order/${orderId}`,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      return { error: data.errors[0].message }
    }

    const order = data.data?.customer?.order

    if (!order) {
      return { error: 'Order not found' }
    }

    return { order }
  } catch (error) {
    console.error('Error fetching order for confirmation:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch order details',
    }
  }
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState<ShopifyOrderResponse['order']>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true)
      setError(null)

      const customerAccessToken = localStorage.getItem('shopifyCustomerAccessToken')
      const result = await fetchShopifyOrderForConfirmation(orderId || '', customerAccessToken || undefined)

      if (result.error) {
        setError(result.error)
      } else {
        setOrder(result.order)

        // Track Purchase event with CAPI when order is loaded
        if (result.order) {
          const { sendCAPIPurchase } = await import('@/lib/analytics/capi')

          // Extract numeric variant IDs from variant GIDs
          // Format: gid://shopify/ProductVariant/56829020504438
          const contentIds = result.order.lineItems.edges
            .map(({ node }) => {
              const variantId = node.variant?.id
              if (!variantId) return null
              const match = variantId.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)
              return match ? match[1] : null
            })
            .filter((id): id is string => Boolean(id))

          // Calculate total items
          const numItems = result.order.lineItems.edges.reduce(
            (sum, { node }) => sum + node.quantity, 0
          )

          // Send CAPI Purchase event with correct numeric IDs
          await sendCAPIPurchase({
            orderId: result.order.orderNumber.toString(),
            value: parseFloat(result.order.currentTotalPrice.amount),
            currency: result.order.currentTotalPrice.currencyCode,
            contentIds: contentIds.length > 0 ? contentIds : ['56829020504438'], // Fallback to known ID
            numItems,
          })
        }
      }

      setLoading(false)
    }

    loadOrder()
  }, [orderId])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(t)
  }, [toast])

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount))
  }

  const reference = order ? order.orderNumber.toString() : (orderId || '').trim()

  const mailtoHref = useMemo(() => {
    const subject = `Order help${reference ? ` — ${reference}` : ''}`
    const lines = [
      'Hi Lumelle support,',
      '',
      'I need help with my order.',
      '',
      `Order reference: ${reference || '(not sure)'}`,
      '',
      'Thanks,',
    ]
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [reference])

  const handleDownloadReceipt = () => {
    if (!order) return

    // Generate a simple text receipt
    const receipt = `
LUMELLE ORDER RECEIPT
=====================
Order Number: ${order.orderNumber}
Date: ${new Date(order.processedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}
---------------------
ORDER SUMMARY
---------------------
${order.lineItems.edges.map(({ node: item }, index) => {
      return `${index + 1}. ${item.title}
   Qty: ${item.quantity}
   Price: ${formatPrice(item.variant.price, order.currentTotalPrice.currencyCode)}
`
}).join('')}
---------------------
SUBTOTAL: ${formatPrice(order.subtotalPrice.amount, order.subtotalPrice.currencyCode)}
${order.totalShippingPrice ? `SHIPPING: ${formatPrice(order.totalShippingPrice.amount, order.totalShippingPrice.currencyCode)}` : ''}
---------------------
TOTAL: ${formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
=====================
Thank you for shopping with Lumelle!
    `.trim()

    // Download as text file
    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lumelle-receipt-${order.orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setToast('Receipt downloaded')
  }

  return (
    <>
      <Seo
        title="Order confirmation"
        description="What happens next, plus quick links for tracking and returns."
        url={toPublicUrl(reference ? `/order/${reference}/confirm` : '/order/confirm')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Order">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-6">
            {/* Success header */}
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-semantic-text-primary">
                Thanks — we've got your order.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
                We'll send you a confirmation email with your order details and tracking information.
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="h-40 w-40 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/30 motion-safe:animate-pulse motion-reduce:animate-none" />
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                <Package className="mx-auto h-12 w-12 text-red-400" />
                <p className="mt-4 text-sm font-semibold text-red-800">Unable to load order details</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Order details */}
            {order && !loading && (
              <div className="mt-8 space-y-6">
                {/* Order reference card */}
                <div className="rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-semantic-text-primary/60">
                        Order reference
                      </p>
                      <p className="mt-2 font-mono text-[13px] text-semantic-text-primary">{reference}</p>
                      <p className="mt-1 text-xs text-semantic-text-primary/60">
                        Keep this handy when contacting support
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {toast && (
                        <span
                          className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary shadow-sm"
                          role="status"
                          aria-live="polite"
                        >
                          {toast}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleDownloadReceipt}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-5 py-2.5 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                      >
                        <Download className="h-4 w-4" />
                        Download receipt
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="rounded-3xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-semantic-text-primary">
                    Order summary
                  </h2>
                  <div className="mt-4 space-y-3">
                    {order.lineItems.edges.map(({ node: item }, index) => (
                      <div key={item.id} className="flex gap-3 border-b border-semantic-legacy-brand-blush/30 pb-3 last:border-0 last:pb-0">
                        <span className="text-xs text-semantic-text-primary/60">{index + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-semantic-text-primary">{item.title}</p>
                          <p className="text-xs text-semantic-text-primary/60">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-semantic-text-primary">
                          {formatPrice(item.variant.price, order.currentTotalPrice.currencyCode)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-semantic-legacy-brand-blush/40 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-semantic-text-primary/80">Total</span>
                      <span className="text-lg font-bold text-semantic-text-primary">
                        {formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next steps */}
                <div className="rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-semantic-text-primary">
                    Next steps
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-semantic-text-primary/75">
                    <li>
                      <span className="font-semibold text-semantic-text-primary">Check your inbox</span> for an order
                      confirmation email and a dispatch email with tracking.
                    </li>
                    <li>
                      <span className="font-semibold text-semantic-text-primary">Track an order</span> anytime from the
                      tracking page.
                    </li>
                    <li>
                      <span className="font-semibold text-semantic-text-primary">Need a return?</span> Start a return
                      request within 30 days.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link
                to="/order/track"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Track an order
              </Link>
              <Link
                to="/returns"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Start a return
              </Link>
            </div>

            {/* Support links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Message on WhatsApp
              </a>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Email support
              </a>
            </div>

            {/* Bottom navigation */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
              >
                Back to shop
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
              >
                View cart
              </Link>
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}
