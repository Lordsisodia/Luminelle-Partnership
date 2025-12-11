// Prototype Supabase client shim (not wired).
import type { RecoveryJob } from './jobs'

export async function fetchDueJobs(): Promise<RecoveryJob[]> {
  return []
}

export async function markAttempt(
  _id: string,
  _status: 'pending' | 'completed' | 'failed' | 'canceled',
  _nextSendAt?: string | null,
  _discountSent?: boolean,
) {
  return
}

export async function logEvent(_jobId: string, _event: string, _meta?: any) {
  return
}
