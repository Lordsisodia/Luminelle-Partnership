import type { TrackPayload } from './types'

type QueueItem = { payload: TrackPayload; attempts: number }
const queue: QueueItem[] = []
let flushing = false

export function enqueueTrack(payload: TrackPayload) {
  queue.push({ payload, attempts: 0 })
  void flush()
}

async function flush() {
  if (flushing || queue.length === 0) return
  flushing = true
  const batch = queue.splice(0, queue.length)
  try {
    const res = await fetch('/api/experiment/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch.map((b) => b.payload)),
    })
    if (!res.ok) throw new Error(`track failed ${res.status}`)
  } catch (error) {
    console.warn('track flush failed; retrying batch', error)
    // requeue with backoff, drop after 3 tries
    const retry: QueueItem[] = []
    for (const item of batch) {
      if (item.attempts < 3) {
        retry.push({ ...item, attempts: item.attempts + 1 })
      }
    }
    if (retry.length) {
      setTimeout(() => {
        queue.unshift(...retry)
        void flush()
      }, 500 * (1 + retry[0].attempts))
    }
  } finally {
    flushing = false
  }
}
