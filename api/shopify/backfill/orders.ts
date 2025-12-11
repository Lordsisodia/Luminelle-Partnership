import { requireInternalAuth } from "../../_lib/internalAuth";
import { getAdminToken, adminGraphQL } from "../_admin";
import { upsertOrder } from "../../_lib/orders";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) return new Response("Unauthorized", { status: 401 });
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  if (!shop) return new Response("Missing shop", { status: 400 });
  const token = await getAdminToken(shop);

  let cursor: string | null = null;
  let count = 0;
  for (;;) {
    const data = await adminGraphQL<any>(
      shop,
      token,
      `#graphql
      query Orders($first:Int!, $after:String) {
        orders(first: $first, after: $after, sortKey: UPDATED_AT) {
          pageInfo { hasNextPage endCursor }
          edges { node {
            id
            name
            email
            createdAt
            updatedAt
            processedAt
            currencyCode
            currentTotalPriceSet { shopMoney { amount currencyCode } }
            currentSubtotalPriceSet { shopMoney { amount currencyCode } }
            financialStatus
            fulfillmentStatus
            lineItems(first: 50) { edges { node { quantity title variant { id title price: priceSet { shopMoney { amount currencyCode } } } } } }
          } }
        }
      }
      `,
      { first: 50, after: cursor },
    );
    const edges = data.orders.edges as any[];
    for (const { node } of edges) {
      const id = Number(String(node.id).split("/").pop());
      const mapLineItems = (node.lineItems?.edges || []).map((e: any) => ({
        title: e.node.title,
        quantity: e.node.quantity,
        variant: {
          id: e.node.variant?.id,
          title: e.node.variant?.title,
          price: e.node.variant?.price?.shopMoney?.amount,
          currency: e.node.variant?.price?.shopMoney?.currencyCode,
        },
      }));
      await upsertOrder(shop, {
        id,
        name: node.name,
        email: node.email,
        currency: node.currencyCode,
        subtotal_price: node.currentSubtotalPriceSet?.shopMoney?.amount,
        total_price: node.currentTotalPriceSet?.shopMoney?.amount,
        financial_status: node.financialStatus,
        fulfillment_status: node.fulfillmentStatus,
        processed_at: node.processedAt,
        created_at: node.createdAt,
        updated_at: node.updatedAt,
        line_items: mapLineItems,
      });
      count++;
    }
    if (!data.orders.pageInfo.hasNextPage) break;
    cursor = data.orders.pageInfo.endCursor;
  }
  return new Response(JSON.stringify({ ok: true, count }), { headers: { "content-type": "application/json" } });
}

