import { useEffect } from 'react'
import { useCart } from '@client/shop/cart/providers/CartContext'
import { trackInitiateCheckout, formatCartItemId } from '@/lib/analytics/metapixel'
import TemporarilyUnavailablePage from '@/ui/pages/TemporarilyUnavailablePage'

const CheckoutPage = () => {
  const { checkoutUrl, checkoutStart, checkoutCapabilities, items, subtotal } = useCart()

  useEffect(() => {
    if (!checkoutUrl) return

    // Track InitiateCheckout event before redirecting to Shopify checkout
    if (items.length > 0) {
      const contentIds = items.map((item) => formatCartItemId(item.id))

      trackInitiateCheckout({
        content_ids: contentIds,
        value: subtotal,
        currency: 'GBP',
        num_items: items.reduce((sum, item) => sum + item.qty, 0),
      })
    }

    // Small delay to ensure the pixel event fires before redirect
    const redirectTimer = setTimeout(() => {
      window.location.href = checkoutUrl
    }, 100)

    return () => clearTimeout(redirectTimer)
  }, [checkoutUrl, items, subtotal])

  if (checkoutUrl) return null

  const title = checkoutCapabilities?.providerLabel ? `${checkoutCapabilities.providerLabel} isn’t available yet` : 'Checkout isn’t available yet'
  const reason = checkoutStart?.mode === 'none' ? checkoutStart.reason : null

  return (
    <TemporarilyUnavailablePage
      subtitle="Checkout"
      title={title}
      description={
        <>
          {reason ? (
            <span>{reason}</span>
          ) : (
            <span>This storefront is still wiring up a production checkout flow. For now, head back to your cart and we’ll keep everything saved.</span>
          )}
        </>
      }
      actions={[
        { label: 'Back to cart', to: '/cart', variant: 'primary' },
        { label: 'Continue shopping', to: '/', variant: 'secondary' },
      ]}
    />
  )
}

export default CheckoutPage
