import type { PagesFunction } from '../_lib/types'
import { json } from '../_lib/response'

export const onRequest: PagesFunction = async () => {
  return json({ ok: true, ts: new Date().toISOString() })
}

