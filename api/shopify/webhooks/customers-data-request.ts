import { verifyWebhook } from "./_verify";
import { redactCustomer } from "../../_lib/customers";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string
  const customer = body?.customer || {};
  if (shop && (customer.id || customer.email)) {
    await redactCustomer(shop, { id: customer.id ? Number(customer.id) : undefined, email: customer.email });
  }
  return res.status(200).send("OK");
}
