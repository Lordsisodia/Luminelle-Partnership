import { requireInternalAuth } from "../_lib/internalAuth";
import { handleSyncForShop } from "../_lib/shopifyCore";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.message }), {
      status: auth.status,
      headers: { "content-type": "application/json" },
    });
  }
  const body = await req.json().catch(() => ({}));
  const shop: string | undefined = body.shop;
  if (!shop) {
    return new Response(JSON.stringify({ error: "Missing shop" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await handleSyncForShop(shop);
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}

