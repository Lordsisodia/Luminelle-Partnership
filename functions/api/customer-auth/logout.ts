import type { PagesFunction } from '../../_lib/types'
import { appendSetCookie } from '../../_lib/cookies'
import { methodNotAllowed } from '../../_lib/response'

export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])
  const headers = new Headers({ Location: '/account/orders' })
  appendSetCookie(headers, ['cust_at=; Path=/; Max-Age=0', 'cust_rt=; Path=/; Max-Age=0'])
  return new Response('', { status: 302, headers })
}

