# Server Architecture Plan (API Layer)

**Goal:** Design a scalable, testable backend architecture for Vercel Serverless Functions that aligns with our Domain-Based Frontend.

## 1. The Core Philosophy: "Thin Controllers, Fat Services"
Vercel Functions (`api/**/*.ts`) are just entry points. They should **not** contain business logic.
*   **Controller (The Function):** Validates input -> Calls Service -> Returns JSON.
*   **Service (The Logic):** Database calls, Shopify API calls, Calculations, Emails.

## 2. Proposed Directory Structure (`api/`)

```text
api/
├── _lib/                     # 🔒 PRIVATE: Shared Server Utilities
│   ├── db.ts                 # Supabase Admin Client
│   ├── shopify.ts            # Shopify Admin Client
│   ├── auth.ts               # Auth Helpers (Verify Webhooks/JWT)
│   └── errors.ts             # Standard Error Classes
│
├── _services/                # 🧠 PRIVATE: Business Logic (The "Brain")
│   ├── OrderService.ts       # class OrderService { create(), sync() }
│   ├── CustomerService.ts
│   ├── ProductService.ts
│   └── EmailService.ts
│
├── admin/                    # 🌍 PUBLIC: Admin API Routes
│   ├── orders/
│   │   ├── index.ts          # GET /api/admin/orders
│   │   └── create.ts         # POST /api/admin/orders/create
│   └── products/
│       └── sync.ts           # POST /api/admin/products/sync
│
└── shopify/                  # 🌍 PUBLIC: Shopify Webhooks/App Proxy
    ├── webhooks/
    │   ├── orders-create.ts  # POST /api/shopify/webhooks/orders-create
    │   └── app-uninstalled.ts
    └── proxy/
        └── route.ts          # App Proxy Entry Point
```

## 3. The Pattern in Action

### A. The Service (Pure Logic)
Located in `api/_services/OrderService.ts`.
It doesn't know about `req` or `res`. It just takes arguments.

```typescript
import { supabase } from '../_lib/db';

export class OrderService {
  static async create(data: CreateOrderDTO) {
    // 1. Logic
    if (data.total < 0) throw new Error("Invalid total");

    // 2. DB Interaction
    const { data: order, error } = await supabase
      .from('orders')
      .insert(data)
      .selectSingle();

    if (error) throw error;
    return order;
  }
}
```

### B. The Controller (Vercel Function)
Located in `api/admin/orders/create.ts`.
It handles the HTTP layer.

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { OrderService } from '../../_services/OrderService';
import { apiHandler } from '../../_lib/api-handler'; // Wrapper for try/catch

export default apiHandler(async (req: VercelRequest, res: VercelResponse) => {
  // 1. Validate Input (Zod?)
  const body = req.body;

  // 2. Call Service
  const order = await OrderService.create(body);

  // 3. Return JSON
  return res.status(201).json(order);
});
```

## 4. Key Decisions

### A. Why `_underscore` folders?
Vercel treats every file in `api/` as a route *unless* it starts with `_`.
*   `api/_services/` -> **NOT** a route. Safe for logic.
*   `api/admin/orders.ts` -> **IS** a route (`/api/admin/orders`).

### B. Shared Types
We should share types between Frontend and Backend.
*   **Location:** `src/types/` (Frontend) or `api/_types/`?
*   **Decision:** Keep shared DTOs in `src/types/` (since frontend imports them). The API can import from `../../src/types` (relative path) or we can make a shared workspace package (overkill for now).
*   *Simpler Approach:* Define DTOs in `api/_lib/types.ts` and copy/paste if needed, OR allow `src` imports if build allows. (Vercel usually allows importing from root).

### C. Middleware
Vercel doesn't have "Middleware" like Express.
*   **Solution:** Higher-Order Functions.
*   Example: `withAuth(handler)`, `withShopifyVerify(handler)`.

## 5. Next Steps
1.  **Create Folders**: `api/_lib`, `api/_services`.
2.  **Move Code**: Move `src/server/*` into `api/_lib/` or `api/_services/`.
3.  **Refactor**: Convert one existing route to use the Service pattern.
