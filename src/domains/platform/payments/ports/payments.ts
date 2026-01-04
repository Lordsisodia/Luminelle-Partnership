import type { MoneyDTO } from '@platform/ports'

export type PaymentCapabilities = {
  mode: 'redirect' | 'embedded' | 'none'
  providerLabel?: string

  // Provider feature flags (extend as needed)
  supportsSavedMethods?: boolean
  supportsApplePay?: boolean
  supportsGooglePay?: boolean
}

export type BeginPaymentInput = {
  amount: MoneyDTO
  reference?: string
  metadata?: Record<string, string>
  // Non-PII tag for provider dashboards/logging. Must be stable and allowlisted server-side.
  source?: string
}

export type PaymentStart =
  | { mode: 'redirect'; url: string }
  | { mode: 'embedded'; clientSecret: string }
  | { mode: 'none'; reason: string }

export interface PaymentsPort {
  getCapabilities(): PaymentCapabilities
  beginPayment(input: BeginPaymentInput): Promise<PaymentStart>
}
