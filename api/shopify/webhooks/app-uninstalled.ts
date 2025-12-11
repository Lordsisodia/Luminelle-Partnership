import { verifyWebhook } from "../_verify";
import { handleAppUninstalled } from "../../_lib/shopifyCore";

export default async function handler(req: Request) {
  const verified = await verifyWebhook(req);
  if (!verified) return new Response("Invalid HMAC", { status: 401 });
  const body = await req.json();
  const shop = body?.domain || body?.shop_domain || body?.shop;
  if (!shop) return new Response("Missing shop", { status: 400 });
  const data = await handleAppUninstalled(shop);
  return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });
}
