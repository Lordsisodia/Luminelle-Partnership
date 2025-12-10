import { jwtVerify } from "jose";

export async function verifySessionToken(token: string) {
    const secret = process.env.SHOPIFY_API_SECRET;
    if (!secret) {
        throw new Error("SHOPIFY_API_SECRET is not set");
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret),
            {
                algorithms: ["HS256"],
            }
        );
        return payload;
    } catch (error) {
        console.error("Session token verification failed:", error);
        return null;
    }
}
