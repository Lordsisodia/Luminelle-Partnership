// Typecheck-only import to ensure new port contracts are included in the TS project graph.
// This file is intentionally not imported by runtime code.
import type { CatalogPort, CartPort, CheckoutPort } from '@platform/commerce'
import type { ContentPort } from '@platform/cms'
import type { PaymentsPort } from '@platform/payments'
import type { PortError, PortErrorCode } from '@platform/ports'

export type _ContractSanity = {
  catalog: CatalogPort
  cart: CartPort
  checkout: CheckoutPort
  content: ContentPort
  payments: PaymentsPort
  errors: { PortError: typeof PortError; code: PortErrorCode }
}
