import { verifyWebhook } from "./_verify";
import { getPgPool } from "../../../app/src/server/db";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string
  if (shop) {
    const pool = getPgPool();
    await pool.query('DELETE FROM "ShopCustomers" WHERE shop = $1', [shop]);
  }
  return res.status(200).send("OK");
}
