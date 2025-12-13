import { verifyWebhook } from "./_verify.js";
import { handleAppUninstalled } from "../../_lib/shopifyCore.js";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");

  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain || body?.shop) as string
  if (!shop) return res.status(400).send("Missing shop");

  const data = await handleAppUninstalled(shop);
  return res.status(200).json(data);
}
