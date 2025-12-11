import { requireInternalAuth } from "../_lib/internalAuth";
import { handlePing } from "../_lib/shopifyCore";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.message }), {
      status: auth.status,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await handlePing();
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}

