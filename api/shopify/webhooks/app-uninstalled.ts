import { requireInternalAuth } from "../../../../app/src/server/internalAuth";
import { handleAppUninstalled } from "../../../../app/src/server/shopifyCore";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.message }), {
      status: auth.status,
      headers: { "content-type": "application/json" },
    });
  }
  const payload = await req.json().catch(() => ({} as any));
  const shop = (payload?.domain || payload?.shop_domain || payload?.shop) as
    | string
    | undefined;
  if (!shop) {
    return new Response(JSON.stringify({ error: "Missing shop domain" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await handleAppUninstalled(shop);
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}

