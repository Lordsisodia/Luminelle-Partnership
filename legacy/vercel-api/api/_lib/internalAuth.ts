export function requireInternalAuth(req: Request) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  const secret = process.env.INTERNAL_SHARED_SECRET;
  if (!secret) {
    throw new Error("INTERNAL_SHARED_SECRET not set");
  }
  if (!auth || !auth.startsWith("Bearer ")) {
    return { ok: false, status: 401, message: "Missing bearer token" } as const;
  }
  const token = auth.slice("Bearer ".length).trim();
  if (token !== secret) {
    return { ok: false, status: 401, message: "Invalid token" } as const;
  }
  return { ok: true } as const;
}

