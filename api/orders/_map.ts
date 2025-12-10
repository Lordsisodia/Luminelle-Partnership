import { type Order } from "../../app/src/state/OrdersStore";

export function mapShopOrderRowToOrder(row: any): Order {
  const items = Array.isArray(row.line_items)
    ? row.line_items
    : typeof row.line_items === "string"
    ? (() => { try { return JSON.parse(row.line_items); } catch { return []; } })()
    : [];
  const raw = typeof row.raw === 'string' ? (()=>{ try { return JSON.parse(row.raw) } catch { return {} } })() : (row.raw || {})
  const events = [
    row.created_at ? { at: new Date(row.created_at).toISOString(), message: "Order placed" } : undefined,
    row.fulfillment_status ? { at: new Date(row.updated_at || row.created_at).toISOString(), message: `Fulfillment: ${row.fulfillment_status}` } : undefined,
  ].filter(Boolean) as Order["events"];
  let status: Order["status"] = "processing";
  if (row.fulfillment_status === "fulfilled") status = "delivered";
  else if (row.fulfillment_status && row.fulfillment_status !== "null") status = "shipped";
  // shipping address (best-effort)
  const ship = raw?.shipping_address || raw?.default_address || null
  const shipping = ship ? {
    name: [ship.first_name, ship.last_name].filter(Boolean).join(' ') || ship.name,
    address1: ship.address1,
    address2: ship.address2,
    city: ship.city,
    province: ship.province || ship.province_code,
    zip: ship.zip || ship.postal_code,
    country: ship.country || ship.country_code,
  } : undefined
  // tracking
  const trackingUrl = raw?.tracking_url || (raw?.fulfillments?.[0]?.tracking_url) || undefined
  return {
    id: String(row.order_id),
    placedAt: (row.processed_at || row.created_at || new Date()).toISOString(),
    status,
    items: items.map((it: any) => ({
      id: String(it.variant?.id || it.product_id || it.title),
      title: it.title || it.variant?.title || "Item",
      price: Number(it.variant?.price || it.price || 0),
      qty: Number(it.quantity || 1),
    })),
    subtotal: Number(row.subtotal || row.subtotal_price || 0),
    shipping: 0,
    total: Number(row.total || row.total_price || 0),
    events,
    // extended fields (not typed in Order but carried to UI)
    shippingAddress: shipping as any,
    trackingUrl: trackingUrl as any,
    fulfillmentStatus: row.fulfillment_status,
    financialStatus: row.financial_status,
  };
}
