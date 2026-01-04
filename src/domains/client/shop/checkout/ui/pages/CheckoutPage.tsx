import { useEffect } from 'react'
import { useCart } from '@client/shop/cart/providers/CartContext'
import TemporarilyUnavailablePage from '@/ui/pages/TemporarilyUnavailablePage'

const CheckoutPage = () => {
  const { checkoutUrl, checkoutStart, checkoutCapabilities } = useCart()

  useEffect(() => {
    if (!checkoutUrl) return
    window.location.href = checkoutUrl
  }, [checkoutUrl])

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
