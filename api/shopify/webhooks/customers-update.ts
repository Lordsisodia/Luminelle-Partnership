import { verifyWebhook } from "./_verify";
import { upsertCustomer } from "../../../app/src/server/customers";
import { isProcessed, markProcessed } from "../../../app/src/server/webhooks";
import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string;
  // The original instruction had a typo: `as stringf (!shop)`. Correcting to ` as string; if (!shop)`
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string;
  if (!shop) return res.status(400).send("Missing shop");
  await upsertCustomer(shop, body);
  if (deliveryId) await markProcessed(deliveryId)
  return res.status(200).send("OK");
}
