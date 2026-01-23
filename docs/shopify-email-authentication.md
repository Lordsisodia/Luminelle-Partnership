# Shopify Email Authentication (Lumelle Beauty)

**Domain:** `lumellebeauty.co.uk`
**Goal:** Authenticate email domain to prevent "sender email" warnings and improve deliverability.

## 1. CNAME Records (DKIM)
**Action Required:**
1.  Log in to the Shopify Admin.
2.  Go to **Settings > Notifications**.
3.  Click **"authenticate your domain"** (as seen in the screenshot).
4.  Shopify will generate 3-4 CNAME records.
5.  Copy these records.

**Add to DNS Provider:**
Log in to your DNS host (e.g., GoDaddy, Cloudflare, Namecheap) and add the CNAME records provided by Shopify.

## 2. DMARC Record
Your domain is currently missing a DMARC record.

**Action Required:**
Add the following **TXT Record** to your DNS settings:

*   **Type:** `TXT`
*   **Name:** `_dmarc`
*   **Value:** `v=DMARC1; p=none;`

> **Note:** `p=none` is "monitoring mode". It allows you to collect data without blocking emails. You can change this to `p=quarantine` or `p=reject` later if needed, but `p=none` satisfies Shopify's requirement.
