// Shared job types (prototype).
export type RecoveryJobStatus = 'pending' | 'sent' | 'completed' | 'canceled' | 'failed'

export type RecoveryJob = {
  id: string
  cartId?: string
  email: string
  restoreUrl: string
  nextSendAt: string
  attempt: number
  status: RecoveryJobStatus
  discountSent: boolean
  createdAt: string
  updatedAt: string
}
