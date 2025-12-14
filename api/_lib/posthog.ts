type CaptureArgs = {
  distinctId: string
  event: string
  properties?: Record<string, unknown>
  timestamp?: string
}

function cleanHost(host: string) {
  return host.replace(/\/+$/, '')
}

function normalizeIngestHost(host: string) {
  const cleaned = cleanHost(host)
  const lower = cleaned.toLowerCase()
  // PostHog UI hosts are not the same as ingestion hosts.
  // For PostHog Cloud, map common UI hosts to their ingestion domains.
  if (lower === 'https://app.posthog.com' || lower === 'https://us.posthog.com') return 'https://us.i.posthog.com'
  if (lower === 'https://eu.posthog.com') return 'https://eu.i.posthog.com'
  return cleaned
}

export async function capturePosthogEvent({ distinctId, event, properties, timestamp }: CaptureArgs) {
  const apiKey = process.env.POSTHOG_API_KEY
  if (!apiKey) return

  const host = normalizeIngestHost(process.env.POSTHOG_HOST || 'https://us.i.posthog.com')
  const url = `${host}/i/v0/e/`

  const body = {
    api_key: apiKey,
    event,
    distinct_id: distinctId,
    properties: properties ?? {},
    ...(timestamp ? { timestamp } : {}),
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.warn('PostHog capture failed', res.status, text)
    }
  } catch (err) {
    console.warn('PostHog capture error', err)
  }
}
