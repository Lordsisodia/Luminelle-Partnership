# POC notes — jonyw4/vendure-advanced-shipping (shipping packages + dimensions model)

Repo: `jonyw4/vendure-advanced-shipping` (MIT)  
URL: https://github.com/jonyw4/vendure-advanced-shipping  

Goal (1 day): extract a reusable **shipping packaging model** (boxes + dimensions + unit conversion) that can inform
Lumelle’s shipping adapter design, even if we never adopt Vendure.

---

## High-signal primitives in this repo

### 1) Product dimension inputs (custom fields)
This plugin expects per-product shipping dimensions and units as custom fields:
- `weight` (float)
- `length` (float)
- `height` (float)
- `width` (float)
- `massUnit` (string enum: `g|kg|lb|oz`)
- `distanceUnit` (string enum: `cm|ft|in`)

Pointer:
- `packages/core/src/config/customFields/Product.ts`

### 2) Package/box model (admin-managed)
`PackageEntity` is the “box” definition:
- `name: string`
- `massUnit: MassUnit`
- `distanceUnit: DistanceUnit`
- `width/height/length: number`
- `weight: number` (tare weight of the box)
- `enabled: boolean`
- `volume(distanceUnit?)` computes volume and converts dimensions via `convert-units`

Pointer:
- `packages/core/src/entities/package.entity.ts`

### 3) Order → packages mapping (persisted)
`ShippingPackagesEntity` stores a per-order packaging result:
- `order: Order` (1:1)
- `packages: Package[] | null` (stored as `simple-json`)
  - includes package dimensions/weight + `productsWeight` + `totalWeight`

Pointer:
- `packages/core/src/entities/shipping-packages.entity.ts`

### 4) Packaging algorithm (volume-first heuristic)
This is not “true” bin packing; it’s a fast heuristic:

Input computation:
- For each order line, load `Product.customFields`, convert to target units, compute:
  - `itemVolume = h*w*l`
  - `totalVolume += itemVolume`
  - `totalWeight += weight`

Pointers:
- `packages/core/src/services/shipping-packages.service.ts` (`getItemsVolumeAndWeight`)

Choose one package:
- filter enabled packages where `package.volume() > itemsVolume`
- choose the smallest such package (min volume)
- compute `totalWeight = package.weight + converted(productsWeight)`

Pointers:
- `packages/core/src/services/shipping-packages.service.ts` (`getPackageForShipping`)

Choose many packages:
- loop while `itemsVolume > 0`
  - if some package has volume > remaining volume: pick the smallest that fits
  - else: pick the largest package (when remaining volume exceeds all packages)
  - subtract chosen package volume from remaining volume
- distribute product weight evenly across chosen packages (average)
- compute totalWeight per package

Pointers:
- `packages/core/src/services/shipping-packages.service.ts` (`getPackagesForShipping`)

---

## What we can reuse in Lumelle (platform design)

### Minimal ShippingQuote schema (proposal)
**Input**
- `items[]`: `{ sku|variant_id, quantity, weight?, dims?, mass_unit?, distance_unit? }`
- `destination`: `{ country, postal_code, region?, city? }`
- `currency`: string
- `requested_services?`: `{ carrier?, service_level? }[]`

**Output**
- `packages[]`: `{ name, dims, tare_weight, products_weight, total_weight, units }`
- `notes[]`: strings (missing dims, unit conversions, fallbacks)

### 3 example payloads (for POC evidence)
1) Small parcel: 1–2 items, dimensions present, single package expected.
2) Large order: volume exceeds any one box; algorithm yields multiple boxes.
3) Missing dims: at least one item missing dims → output contains `notes[]` and a fallback behavior is defined.

---

## Risks / caveats

- Algorithm is volume-based; it does not handle orientation/fragility/real packing constraints.
- The implementation exits early if a product is missing dims (break vs continue) — we should define a clearer fallback.
- Still valuable as a **starter shape**: dimensions + units + packaging output model + admin management pattern.

