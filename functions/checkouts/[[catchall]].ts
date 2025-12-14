import type { PagesFunction } from '../_lib/types'

import { proxyShopifyCheckout } from '../_lib/shopifyCheckoutProxy'

export const onRequest: PagesFunction = (context) => proxyShopifyCheckout(context as any)
