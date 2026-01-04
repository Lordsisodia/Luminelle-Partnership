// Prototype offline mutation queue types/helpers.
import type { CartLine } from './storeV2'

export type Mutation =
  | { op: 'add'; variantId: string; qty: number }
  | { op: 'update'; variantId: string; qty: number }
  | { op: 'remove'; variantId: string }
  | { op: 'setEmail'; email: string }
  | { op: 'setDiscount'; code: string }

export type QueuedMutation = Mutation & { id: string; ts: number; attempts: number }

export function enqueue(queue: QueuedMutation[], mutation: Mutation): QueuedMutation[] {
  return [...queue, { ...mutation, id: crypto.randomUUID(), ts: Date.now(), attempts: 0 }]
}

export function next(queue: QueuedMutation[]): QueuedMutation | undefined {
  return queue[0]
}

export function markSuccess(queue: QueuedMutation[]): QueuedMutation[] {
  return queue.slice(1)
}

export function markFailure(queue: QueuedMutation[], maxAttempts = 5): QueuedMutation[] {
  if (queue.length === 0) return queue
  const [head, ...rest] = queue
  if (head.attempts + 1 >= maxAttempts) return rest
  return [{ ...head, attempts: head.attempts + 1, ts: Date.now() }, ...rest]
}

// NOTE: This file is a prototype; wiring retry/backoff and persistence would be done in app code.
