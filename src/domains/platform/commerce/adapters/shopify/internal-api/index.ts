import type { CatalogPort, CartPort, CheckoutPort } from '@platform/commerce/ports'
import { createShopifyCatalogPort } from './catalog'
import { createShopifyCartPort } from './cart'
import { createShopifyCheckoutPort } from './checkout'

export type ShopifyCommerceAdapter = {
  catalog: CatalogPort
  cart: CartPort
  checkout: CheckoutPort
}

export const createShopifyCommerceAdapter = (): ShopifyCommerceAdapter => {
  const cart = createShopifyCartPort()
  const checkout = createShopifyCheckoutPort()
  const catalog = createShopifyCatalogPort()

  return { catalog, cart, checkout }
}

