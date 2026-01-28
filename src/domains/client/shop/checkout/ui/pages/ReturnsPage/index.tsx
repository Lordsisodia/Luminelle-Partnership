import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { ArrowRight, RotateCcw, CheckCircle } from 'lucide-react'

interface ReturnItem {
  title: string
  quantity: number
  price: string
  currency: string
  variantImage?: string
}

interface ShopifyOrderResponse {
  order?: {
    id: string
    orderNumber: number
    processedAt: string
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
          variant: {
            price: string
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

async function fetchShopifyOrderForReturns(
  orderNumber: string,
  email: string,
  customerAccessToken?: string
): Promise<{ order?: ShopifyOrderResponse['order']; error?: string }> {
  const query = `
    query orderLookup($orderNumber: String!, $email: String!) {
      order(number: $orderNumber, email: $email) {
        id
        orderNumber
        processedAt
        currentTotalPrice {
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
                price
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

    return { order }
  } catch (error) {
    console.error('Error fetching order for returns:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch order information',
    }
  }
}

const RETURN_REASONS = [
  'Wrong size / fit',
  'Changed my mind',
  'Damaged item',
  'Item not as described',
  'Ordered by mistake',
  'Other',
] as const

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [orderData, setOrderData] = useState<ShopifyOrderResponse['order']>()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [returnSubmitted, setReturnSubmitted] = useState(false)

  // Look up order when both fields are filled
  const handleLookupOrder = async () => {
    if (!orderNumber.trim() || !email.trim()) return

    setLoading(true)
    setOrderError(null)

    const customerAccessToken = localStorage.getItem('shopifyCustomerAccessToken')
    const result = await fetchShopifyOrderForReturns(orderNumber.trim(), email.trim(), customerAccessToken || undefined)

    if (result.error) {
      setOrderError(result.error)
    } else {
      setOrderData(result.order)
      // Pre-select all items
      setSelectedItems(new Set(result.order?.lineItems.edges.map((e) => e.node.id) || []))
    }

    setLoading(false)
  }

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate return request email
    const selectedItemsList = orderData?.lineItems.edges
      .filter((edge) => selectedItems.has(edge.node.id))
      .map((edge) => edge.node)

    const subject = `Return request${orderNumber.trim() ? ` — Order ${orderNumber.trim()}` : ''}`
    const items = selectedItemsList?.map((item) => `- ${item.title} (Qty: ${item.quantity})`).join('\n') || ''

    const lines = [
      'Hi Lumelle support,',
      '',
      'I would like to request a return.',
      '',
      `Order number: ${orderNumber.trim() || '(not sure)'}`,
      `Email used at checkout: ${email.trim() || '(not sure)'}`,
      '',
      items ? `Items to return:\n${items}` : '',
      reason.trim() ? `Reason: ${reason}` : '',
      details.trim() ? `Additional details: ${details}` : '',
      '',
      'Please let me know the next steps and return address/label instructions.',
      '',
      'Thank you,',
    ].filter(Boolean)

    const body = lines.join('\n')
    const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Open email client
    window.location.href = href

    setReturnSubmitted(true)
  }

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount))
  }

  return (
    <>
      <Seo
        title="Returns"
        description="Start a return or get help with an existing return request."
        url={toPublicUrl('/returns')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Returns">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Support</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Start a return</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              Need to send something back? Start here and we'll guide you through the return process. For the full policy, see{' '}
              <Link to="/terms#returns" className="underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>

            {!returnSubmitted ? (
              <>
                {/* Step 1: Find your order */}
                <div className="mt-8 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 pb-4 border-b border-semantic-legacy-brand-blush/30">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa text-xs font-bold text-white">
                      1
                    </div>
                    <h2 className="text-sm font-semibold text-semantic-text-primary">Find your order</h2>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                      Order number
                      <input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="e.g. #1234"
                        className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                        inputMode="text"
                        autoCapitalize="characters"
                      />
                    </label>

                    <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                      Email used at checkout
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                        inputMode="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                      />
                    </label>
                  </div>

                  {orderError && (
                    <p className="text-sm text-red-600">{orderError}</p>
                  )}

                  {orderData && !loading && (
                    <>
                      <p className="mt-2 text-xs text-semantic-text-primary/60">
                        Order found! Select the items you want to return below.
                      </p>
                    </>
                  )}
                </div>

                {/* Step 2: Select items */}
                {orderData && !loading && (
                  <div className="mt-6 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 pb-4 border-b border-semantic-legacy-brand-blush/30">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa text-xs font-bold text-white">
                        2
                      </div>
                      <h2 className="text-sm font-semibold text-semantic-text-primary">Select items to return</h2>
                    </div>

                    <div className="mt-4 space-y-3">
                      {orderData.lineItems.edges.map(({ node: item }) => (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${
                            selectedItems.has(item.id)
                              ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain/50'
                              : 'border-semantic-legacy-brand-blush/60 bg-white hover:bg-brand-porcelain/30'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => handleItemToggle(item.id)}
                            className="h-5 w-5 rounded border-semantic-legacy-brand-blush/60"
                          />
                          {item.variant.image && (
                            <img
                              src={item.variant.image.url}
                              alt={item.title}
                              className="h-16 w-16 shrink-0 rounded-xl border border-semantic-legacy-brand-blush/40 object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-semantic-text-primary">{item.title}</p>
                            <p className="text-xs text-semantic-text-primary/60">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-semantic-text-primary">
                            {formatPrice(item.variant.price, orderData.currentTotalPrice.currencyCode)}
                          </p>
                        </label>
                      ))}
                    </div>

                    {selectedItems.size === 0 && (
                      <p className="text-center text-sm text-semantic-text-primary/60 py-4">
                        Select at least one item to continue
                      </p>
                    )}
                  </div>
                )}

                {/* Step 3: Return reason */}
                {orderData && !loading && selectedItems.size > 0 && (
                  <div className="mt-6 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 pb-4 border-b border-semantic-legacy-brand-blush/30">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa text-xs font-bold text-white">
                        3
                      </div>
                      <h2 className="text-sm font-semibold text-semantic-text-primary">Return reason</h2>
                    </div>

                    <form onSubmit={handleSubmitReturn} className="mt-4 grid gap-4">
                      <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                        What's the reason?
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                          className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                        >
                          <option value="">Select a reason...</option>
                          {RETURN_REASONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                        Additional details (optional)
                        <textarea
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Describe any damage or issues with the items..."
                          className="min-h-[110px] rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                        />
                      </label>

                      <div className="mt-2 flex flex-wrap gap-3">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                        >
                          Submit return request
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderData(undefined)
                            setSelectedItems(new Set())
                          }}
                          className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                        >
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                          Start over
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Return submitted confirmation */}
                <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
                  <h2 className="mt-4 text-xl font-semibold text-green-800">Return request submitted!</h2>
                  <p className="mt-2 text-sm text-green-700">
                    We've received your return request and will get back to you within 24-48 hours with next steps and a return label if applicable.
                  </p>
                  <p className="mt-4 text-xs text-green-600">
                    Tip: Including your order number and selecting items helps us reply faster.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={WHATSAPP_SUPPORT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                    >
                      Message WhatsApp
                    </a>
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                    >
                      Email support
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* Support links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/order/track"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Track an order
              </Link>
              <a
                href={WHATSAPP_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Message on WhatsApp
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
