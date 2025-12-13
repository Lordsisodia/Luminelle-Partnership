import { getSessionByShop } from "./db.js";

export async function handlePing() {
  return { ok: true, service: "lumelle-core" } as const;
}

export async function handleSyncForShop(shop: string) {
  const session = await getSessionByShop(shop);
  return {
    ok: true,
    shop,
    hasSession: Boolean(session),
  } as const;
}

export async function handleAppUninstalled(shop: string) {
  // Place domain-specific cleanup here (e.g., delete mappings/settings)
  // For now, we just acknowledge.
  return { ok: true, shop } as const;
}
