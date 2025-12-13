import { verifyWebhook } from "./_verify.js";
import { upsertShopCustomer } from "../../_lib/shopCustomers.js";
import { isProcessed, markProcessed } from "../../_lib/webhooks.js";
import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string;
  if (deliveryId && (await isProcessed(deliveryId))) return res.status(200).send('OK')
  // The original instruction had a typo: `as stringf (!shop)`. Correcting to ` as string; if (!shop)`
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string;
  if (!shop) return res.status(400).send("Missing shop");
  await upsertShopCustomer(shop, body);
  if (deliveryId) await markProcessed(deliveryId)
  return res.status(200).send("OK");
}
