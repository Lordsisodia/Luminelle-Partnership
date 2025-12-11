import { verifyWebhook } from "./_verify";
import { deleteCustomer } from "../../_lib/customers";
import { isProcessed, markProcessed } from "../../_lib/webhooks";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  const id = Number(body?.id);
  if (Number.isFinite(id)) await deleteCustomer(shop, id);
  if (deliveryId) await markProcessed(deliveryId)
  return res.status(200).send("OK");
}
