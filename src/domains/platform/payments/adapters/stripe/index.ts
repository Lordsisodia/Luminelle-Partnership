import { requestJson } from '@platform/http/internal-api/client'
import type { BeginPaymentInput, PaymentStart, PaymentsPort } from '@platform/payments/ports'
import { PortError } from '@platform/ports'

export type StripePaymentsAdapter = {
  payments: PaymentsPort
}

export const createStripePaymentsAdapter = (): StripePaymentsAdapter => {
  const payments: PaymentsPort = {
    getCapabilities() {
      return {
        mode: 'embedded',
        providerLabel: 'Payments (Stripe)',
        supportsApplePay: true,
        supportsGooglePay: true,
        supportsSavedMethods: true,
      }
    },

    async beginPayment(input: BeginPaymentInput): Promise<PaymentStart> {
      try {
        const data = await requestJson<{ mode: 'embedded'; clientSecret: string }>(`/api/payments/intent/create`, {
          method: 'POST',
          body: input,
        })

        return { mode: data.mode, clientSecret: data.clientSecret }
      } catch (err) {
        if (err instanceof PortError) throw err
        throw new PortError('UNAVAILABLE', 'Stripe payments request failed.', { cause: err })
      }
    },
  }

  return { payments }
}
