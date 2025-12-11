# Magic Cart Recovery — Technical Spec (Safe/Dark Build)
Date: 2025-12-11  
Scope: All code changes scoped to new files/paths; guarded by feature flags. No runtime impact until flags enabled.

## New flags (default OFF)
- Client: `VITE_CART_RECOVERY_ENABLED`, `VITE_CART_SHARE_ENABLED`
- Server: `CART_RECOVERY_ENABLED`, `CART_RECOVERY_CRON_ENABLED`
- Discount toggle: `CART_RECOVERY_DISCOUNT_ENABLED` (gate 10% second-touch offer)

## Proposed file layout (all new)
- `src/domains/shop/cart/recovery/`
  - `storeV2.ts`: Zustand store with persist + migrations (dark, unused).
  - `snapshot.ts`: serialize/deserialize cart snapshot, schema version.
  - `reconcile.ts`: diff local vs Shopify cart; outputs adjustments.
  - `token.ts`: HMAC signer/validator for restore tokens.
  - `queue.ts`: offline mutation queue shapes and retry helpers.
- `src/lib/recovery/`
  - `env.ts`: flag readers.
  - `resend.ts`: email sender wrapper (noop if flag off).
  - `jobs.ts`: types for recovery jobs (matches DB row).
- `api/storefront/cart/share.ts`: flagged endpoint (404 if disabled).
- `api/storefront/cart/restore.ts`: flagged endpoint (404 if disabled).
- `api/internal/recovery-cron.ts`: Vercel cron handler (noop if flag off).
- `emails/recovery/{touch1,touch2,touch3}.tsx`: Resend templates (dark).

## Store V2 sketch (dark)
```ts
// storeV2.ts (not wired to UI yet)
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CartLine = { variantId: string; title: string; price: number; qty: number; lineId?: string }
type State = {
  lines: CartLine[]
  checkoutUrl?: string
  shopifyCartId?: string | null
  buyerEmail?: string | null
  discounts: string[]
  lastUpdated: number
  version: 2
}

export const useCartStoreV2 = create<State>()(
  persist((set, get) => ({
    lines: [],
    discounts: [],
    lastUpdated: Date.now(),
    version: 2,
    // mutation helpers would go here (add, update, remove, clear, setEmail, setDiscount)
  }), {
    name: 'lumelle_cart_v2',
    version: 2,
    storage: createJSONStorage(() => localStorage),
    migrate: (persisted) => migrateFromLegacy(persisted),
  })
)
```

## Token signer/validator (HMAC)
```ts
// token.ts (dark utility)
import { createHmac, timingSafeEqual } from 'crypto'

const ALG = 'sha256'
type Payload = { cartId?: string; snapshotRef?: string; issuedAt: number; expiresAt: number; nonce: string; v: 1 }

export function sign(payload: Payload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac(ALG, secret).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verify(token: string, secret: string): Payload | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = createHmac(ALG, secret).update(body).digest('base64url')
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
  if (Date.now() > payload.expiresAt) return null
  return payload
}
```

## Restore/share API contracts (flagged)
- `POST /api/storefront/cart/share`
  - Input: `{ cartId?: string, snapshot?: CartSnapshot }`
  - Behavior: if flag off → 404; else store payload (Supabase or R2), return `{ restoreUrl, token }`.
- `POST /api/storefront/cart/restore`
  - Input: `{ token }`
  - Behavior: validate token → load payload → fetch/create Shopify cart → replay lines/discount/email → return `{ checkoutUrl, cartId }`.

## Cron job (Vercel /api/internal/recovery-cron)
- Runs every 5 minutes; exits immediately if `CART_RECOVERY_CRON_ENABLED` false.
- Select due jobs from Supabase table `cart_recovery_jobs` (status=pending, next_send_at <= now).
- Send via Resend template `touchN`; mark attempts, schedule next cadence; stop when max touches or on restore.
- Rate limit per email/cart/day; log events to `cart_recovery_events`.

## Supabase schema (draft; not applied)
```sql
-- cart_recovery_jobs
id uuid primary key default gen_random_uuid();
cart_id text;
email text;
restore_url text;
next_send_at timestamptz;
attempt int default 0;
status text default 'pending'; -- pending|sent|completed|canceled|failed
discount_sent boolean default false;
created_at timestamptz default now();
updated_at timestamptz default now();
-- cart_recovery_events
id uuid primary key default gen_random_uuid();
job_id uuid references cart_recovery_jobs(id);
event text; -- sent|failed|restored|canceled
meta jsonb;
created_at timestamptz default now();
```

## Email templates (Resend, dark)
- Touch 1 (1h): reminder + restore link + “Continue checkout”.
- Touch 2 (4h): add 10% discount code (flagged).
- Touch 3 (24h): last call; no new discount.

## Test checklist (unit only for now)
- Token sign/verify (valid, expired, tampered).
- Snapshot migrate legacy keys → v2 schema.
- Reconcile logic adjusts qty/price correctly and flags changes.
- Share/restore handlers return 404 when flag off.
- Cron handler no-ops when flag off; processes a queued job when on (mock Supabase/Resend).

## Rollout safety
- All entrypoints check flags.
- No existing provider/components touched; V2 store unused in UI.
- Migrations optional; DB absence handled gracefully (returns 501/404 when disabled).
