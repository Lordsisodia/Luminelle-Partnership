import { useEffect } from 'react'
import { useCart } from '@client/shop/cart/providers/CartContext'
import TemporarilyUnavailablePage from '@/ui/pages/TemporarilyUnavailablePage'

const CheckoutPage = () => {
  const { checkoutUrl } = useCart()

  useEffect(() => {
    if (!checkoutUrl) return
    window.location.href = checkoutUrl
  }, [checkoutUrl])

  if (checkoutUrl) return null

  return (
    <TemporarilyUnavailablePage
      subtitle="Checkout"
      title="Checkout isn’t available yet"
      description={
        <>
          This storefront is still wiring up a production checkout flow. For now, head back to your cart and we’ll keep
          everything saved.
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
