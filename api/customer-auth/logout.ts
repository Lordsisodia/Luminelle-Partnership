import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', ['cust_at=; Path=/; Max-Age=0', 'cust_rt=; Path=/; Max-Age=0'])
  res.setHeader('Location', '/account/orders')
  return res.status(302).send('')
}
