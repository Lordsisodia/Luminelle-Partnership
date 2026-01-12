import { PortError } from '@platform/ports'

type JsonRequestInit = Omit<RequestInit, 'body'> & { body?: unknown }

const classifyError = (status: number, message: string) => {
  const msg = message.toLowerCase()
  if (status === 400) return { code: 'INVALID_INPUT' as const }
  if (status === 404) return { code: 'NOT_FOUND' as const }
  if (status === 429) return { code: 'RATE_LIMITED' as const }
  if (status >= 500) {
    if (msg.includes('missing') || msg.includes('not configured') || msg.includes('not set')) {
      return { code: 'NOT_CONFIGURED' as const }
    }
    return { code: 'UNAVAILABLE' as const }
  }
  return { code: 'UNKNOWN' as const }
}

export const requestJson = async <T>(path: string, init?: JsonRequestInit): Promise<T> => {
  const res = await fetch(path, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  })

  if (!res.ok) {
    const raw = await res.text().catch(() => '')
    const message = raw || `HTTP ${res.status} (${res.statusText})`
    const { code } = classifyError(res.status, message)
    throw new PortError(code, message, { details: { path, status: res.status } })
  }

  const contentType = res.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    // In development, API routes may not exist and return HTML/JavaScript
    // Silently handle this without console warnings
    throw new PortError(
      'NOT_CONFIGURED',
      `API endpoint not available: ${path}. Please ensure the backend is running.`,
      { details: { path, status: res.status, contentType } }
    )
  }

  return (await res.json()) as T
}

