import type { ExperimentConfig } from './types'

let cached: { data: ExperimentConfig[]; etag?: string; fetchedAt: number } | null = null
const CACHE_TTL = 5 * 60 * 1000

export async function fetchExperiments(): Promise<ExperimentConfig[]> {
  const now = Date.now()
  if (cached && now - cached.fetchedAt < CACHE_TTL) return cached.data

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (cached?.etag) headers['If-None-Match'] = cached.etag

  const res = await fetch('/api/experiment/config', { headers })
  if (res.status === 304 && cached) return cached.data
  if (!res.ok) throw new Error(`Experiment config fetch failed: ${res.status}`)

  const data = (await res.json()) as ExperimentConfig[]
  const etag = res.headers.get('etag') || undefined
  cached = { data, etag, fetchedAt: now }
  return data
}
