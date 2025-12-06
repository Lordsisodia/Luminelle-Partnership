import { requireInternalAuth } from "../../app/src/server/internalAuth";
import { handlePing } from "../../app/src/server/shopifyCore";

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

