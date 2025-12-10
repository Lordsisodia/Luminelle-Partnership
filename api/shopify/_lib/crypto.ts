import { createHmac, timingSafeEqual } from "crypto";

export function signHmac(message: string, secret: string) {
  return createHmac("sha256", secret).update(message).digest("hex");
}

export function safeCompare(a: string, b: string) {
  const abuf = Buffer.from(a, "utf8");
  const bbuf = Buffer.from(b, "utf8");
  if (abuf.length !== bbuf.length) return false;
  return timingSafeEqual(abuf, bbuf);
}

export function buildMessageFromQuery(url: URL) {
  const params = Array.from(url.searchParams.entries())
    .filter(([k]) => k !== "hmac" && k !== "signature")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return params;
}

