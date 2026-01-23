#!/usr/bin/env python3
from __future__ import annotations

import argparse
import asyncio
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse


def slug_token(s: str) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "x"


def yyyymmdd() -> str:
    return datetime.now().strftime("%Y%m%d")


@dataclass(frozen=True)
class Viewport:
    width: int
    height: int


async def _best_effort_dismiss_banners(page) -> None:  # type: ignore[no-untyped-def]
    """
    Best-effort only; we avoid brittle, site-specific logic.
    Goal: remove obvious cookie/consent overlays that block the screenshot.
    """

    # Text buttons (cookie + common marketing modals).
    candidates = [
        "Accept all",
        "Accept All",
        "Accept",
        "I agree",
        "Agree",
        "OK",
        "Got it",
        "Allow all",
        "Continue",
        "No thanks",
        "No Thanks",
        "Not now",
        "Maybe later",
        "Close",
        "Dismiss",
    ]

    for label in candidates:
        try:
            loc = page.locator(f"button:has-text('{label}')").first
            if await loc.count() == 0:
                continue
            if await loc.is_visible():
                await loc.click(timeout=1500)
                await page.wait_for_timeout(500)
                return
        except Exception:  # noqa: BLE001
            continue

    # Generic close buttons (modal X / aria-label patterns).
    close_selectors = [
        "button[aria-label*='close' i]",
        "button[title*='close' i]",
        "button[aria-label='Close']",
        "button[aria-label='close']",
        "[role='dialog'] button[aria-label*='close' i]",
        "button:has-text('×')",
        "button:has-text('✕')",
        ".modal-close button",
        "button.modal-close",
        "button.close",
    ]
    for sel in close_selectors:
        try:
            loc = page.locator(sel).first
            if await loc.count() == 0:
                continue
            if await loc.is_visible():
                await loc.click(timeout=1500)
                await page.wait_for_timeout(500)
                return
        except Exception:  # noqa: BLE001
            continue

    # Last resort: Escape can close some dialogs without needing a selector.
    try:
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(300)
    except Exception:  # noqa: BLE001
        pass


async def _fill_first_visible(  # type: ignore[no-untyped-def]
    page,
    *,
    selectors: list[str],
    value: str,
    timeout_ms: int,
) -> bool:
    for sel in selectors:
        try:
            loc = page.locator(sel).first
            if await loc.count() == 0:
                continue
            if not await loc.is_visible():
                continue
            await loc.fill(value, timeout=timeout_ms)
            return True
        except Exception:  # noqa: BLE001
            continue
    return False


async def _select_first_visible(  # type: ignore[no-untyped-def]
    page,
    *,
    selectors: list[str],
    label: str,
    timeout_ms: int,
) -> bool:
    for sel in selectors:
        try:
            loc = page.locator(sel).first
            if await loc.count() == 0:
                continue
            if not await loc.is_visible():
                continue
            await loc.select_option(label=label, timeout=timeout_ms)
            return True
        except Exception:  # noqa: BLE001
            continue
    return False


async def _best_effort_reach_shipping_methods(page, *, timeout_ms: int) -> None:  # type: ignore[no-untyped-def]
    """
    Best-effort helper for Shopify-like checkouts:
    - Fill contact + address fields
    - Continue to "Shipping method"
    We do not attempt payment submission.
    """
    # Many Shopify checkouts have these exact name attributes.
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[email]"]',
            'input[type="email"]',
            'input[autocomplete="email"]',
        ],
        value="test@example.com",
        timeout_ms=timeout_ms,
    )

    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][first_name]"]',
            'input[autocomplete="shipping given-name"]',
            'input[autocomplete="given-name"]',
        ],
        value="Test",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][last_name]"]',
            'input[autocomplete="shipping family-name"]',
            'input[autocomplete="family-name"]',
        ],
        value="User",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][address1]"]',
            'input[autocomplete="shipping address-line1"]',
            'input[autocomplete="address-line1"]',
        ],
        value="123 Main St",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][address2]"]',
            'input[autocomplete="shipping address-line2"]',
            'input[autocomplete="address-line2"]',
        ],
        value="Apt 1",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][city]"]',
            'input[autocomplete="shipping address-level2"]',
            'input[autocomplete="address-level2"]',
        ],
        value="New York",
        timeout_ms=timeout_ms,
    )

    # Province/state can be a select or a free-text input depending on theme/region.
    await _select_first_visible(
        page,
        selectors=[
            'select[name="checkout[shipping_address][province]"]',
            'select[autocomplete="shipping address-level1"]',
        ],
        label="New York",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][province]"]',
            'input[autocomplete="shipping address-level1"]',
            'input[autocomplete="address-level1"]',
        ],
        value="NY",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][zip]"]',
            'input[autocomplete="shipping postal-code"]',
            'input[autocomplete="postal-code"]',
        ],
        value="10004",
        timeout_ms=timeout_ms,
    )
    await _fill_first_visible(
        page,
        selectors=[
            'input[name="checkout[shipping_address][phone]"]',
            'input[autocomplete="shipping tel"]',
            'input[autocomplete="tel"]',
        ],
        value="5555555555",
        timeout_ms=timeout_ms,
    )

    # Continue to shipping method.
    # Shopify classic: #continue_button; new: button with "Continue to shipping".
    try:
        btn = page.locator("#continue_button").first
        if await btn.count() and await btn.is_visible():
            await btn.click(timeout=timeout_ms)
        else:
            btn2 = page.locator("button:has-text('Continue to shipping')").first
            if await btn2.count() and await btn2.is_visible():
                await btn2.click(timeout=timeout_ms)
    except Exception:  # noqa: BLE001
        pass

    # If a bot challenge is presented (often from Shop Pay domain), it can block the view.
    # Best-effort: click "Skip" if present.
    try:
        # 1) Try on the main page
        skip = page.locator("button:has-text('Skip')").first
        if await skip.count() and await skip.is_visible():
            await skip.click(timeout=1500)
            await page.wait_for_timeout(800)

        # 2) Many challenges are embedded in iframes; iterate frames best-effort.
        for frame in page.frames:
            try:
                fskip = frame.locator("button:has-text('Skip')").first
                if await fskip.count() and await fskip.is_visible():
                    await fskip.click(timeout=1500)
                    await page.wait_for_timeout(800)
                    break
            except Exception:  # noqa: BLE001
                continue
    except Exception:  # noqa: BLE001
        pass

    # Wait for the shipping methods step to render.
    try:
        await page.wait_for_load_state("networkidle", timeout=10_000)
    except Exception:  # noqa: BLE001
        pass
    try:
        await page.wait_for_timeout(800)
        await page.locator("text=Shipping method").first.wait_for(timeout=10_000)
    except Exception:  # noqa: BLE001
        # Some checkouts use slightly different copy; best-effort only.
        pass


def _origin_from_url(url: str) -> str:
    """
    Extract scheme+host (and optional port) from a URL.
    Example: https://example.com/some/path -> https://example.com
    """
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc:
        raise ValueError(f"Invalid URL (missing scheme/host): {url}")
    return f"{parsed.scheme}://{parsed.netloc}"


async def _best_effort_add_to_cart_shopify(  # type: ignore[no-untyped-def]
    page,
    *,
    origin: str,
    variant_id: str,
    timeout_ms: int,
) -> None:
    """
    Best-effort Shopify add-to-cart for evidence screenshots.

    We avoid any payment/checkout actions; goal is simply to get a real cart state
    so cart UI patterns (threshold messaging, line-item controls) can be captured.
    """
    variant_id = re.sub(r"[^0-9]", "", (variant_id or "").strip())
    if not variant_id:
        return

    # Shopify supports multiple ways to create a cart state. Some stores block/override
    # one method but allow the other (or require a locale redirect).
    #
    # IMPORTANT: Some stores treat `/cart/<variant>:<qty>` as a checkout shortcut and
    # redirect to `/checkouts/...`, which can also wipe/replace the cart token. So we
    # only try the direct URL if `/cart/add?...` did not actually create a cart item.
    add_url = f"{origin}/cart/add?id={variant_id}&quantity=1"
    direct_url = f"{origin}/cart/{variant_id}:1"
    cart_url = f"{origin}/cart"
    cart_json_url = f"{origin}/cart.json"

    await page.goto(add_url, wait_until="domcontentloaded")
    try:
        await page.wait_for_load_state("networkidle", timeout=5000)
    except Exception:  # noqa: BLE001
        pass
    await _best_effort_dismiss_banners(page)
    await page.wait_for_timeout(600)

    should_try_direct = True
    try:
        resp = await page.request.get(cart_json_url)
        if resp.ok:
            payload = await resp.json()
            if isinstance(payload, dict) and int(payload.get("item_count") or 0) > 0:
                should_try_direct = False
    except Exception:  # noqa: BLE001
        # Best-effort only; if we can't read cart.json, keep going.
        pass

    # Fallback: POST /cart/add.js (some storefronts accept this more reliably than
    # a GET to /cart/add).
    if should_try_direct:
        try:
            await page.request.post(
                f"{origin}/cart/add.js",
                form={"id": variant_id, "quantity": "1"},
            )
            resp = await page.request.get(cart_json_url)
            if resp.ok:
                payload = await resp.json()
                if isinstance(payload, dict) and int(payload.get("item_count") or 0) > 0:
                    should_try_direct = False
        except Exception:  # noqa: BLE001
            pass

    # Fallback: direct cart URL format (often more reliable than /cart/add) — but only
    # if the /cart/add attempt did not yield an actual item.
    if should_try_direct:
        await page.goto(direct_url, wait_until="domcontentloaded")
        try:
            await page.wait_for_load_state("networkidle", timeout=5000)
        except Exception:  # noqa: BLE001
            pass
        await _best_effort_dismiss_banners(page)
        await page.wait_for_timeout(600)

    await page.goto(cart_url, wait_until="domcontentloaded")
    try:
        await page.wait_for_load_state("networkidle", timeout=5000)
    except Exception:  # noqa: BLE001
        pass
    await _best_effort_dismiss_banners(page)
    await page.wait_for_timeout(800)

    # If cart JSON says there are items but the UI still looks empty (common when
    # the cart is rendered client-side and hydration is slow), wait briefly for
    # typical cart tokens to appear.
    try:
        resp = await page.request.get(cart_json_url)
        if resp.ok:
            payload = await resp.json()
            if isinstance(payload, dict) and int(payload.get("item_count") or 0) > 0:
                await page.locator(
                    "text=/checkout/i, text=/your (bag|cart)/i, text=/subtotal/i"
                ).first.wait_for(timeout=5000)
    except Exception:  # noqa: BLE001
        pass


async def capture(
    *,
    url: str,
    out_path: Path,
    viewport: Viewport,
    user_agent: str,
    full_page: bool,
    timeout_ms: int,
    checkout_step: str,
    cart_step: str,
    cart_variant_id: str | None,
) -> None:
    try:
        from playwright.async_api import async_playwright  # type: ignore
    except Exception as e:  # noqa: BLE001
        raise SystemExit(
            "Missing Playwright. Install via:\n"
            "  python3 -m pip install --user playwright\n"
            "  python3 -m playwright install chromium\n"
            f"\nError: {e}"
        )

    out_path.parent.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": viewport.width, "height": viewport.height},
            user_agent=user_agent,
            device_scale_factor=1,
            locale="en-US",
        )
        page = await context.new_page()
        page.set_default_timeout(timeout_ms)

        await page.goto(url, wait_until="domcontentloaded")
        # Some sites never reach networkidle due to long-polling; keep it best-effort.
        try:
            await page.wait_for_load_state("networkidle", timeout=5000)
        except Exception:  # noqa: BLE001
            pass

        await _best_effort_dismiss_banners(page)
        await page.wait_for_timeout(800)

        if cart_step == "add-to-cart":
            # Use the post-redirect origin (some stores canonicalize away `www.`
            # or redirect to a localized domain), otherwise add-to-cart can land
            # in a different cookie jar and the cart remains empty.
            origin = _origin_from_url(page.url)
            await _best_effort_add_to_cart_shopify(
                page,
                origin=origin,
                variant_id=(cart_variant_id or ""),
                timeout_ms=timeout_ms,
            )

        if checkout_step == "delivery-estimate":
            await _best_effort_reach_shipping_methods(page, timeout_ms=timeout_ms)

        await page.screenshot(path=str(out_path), full_page=full_page)

        await context.close()
        await browser.close()


def main() -> int:
    ap = argparse.ArgumentParser(description="Capture a Tier‑A screenshot (Playwright) into a store evidence folder.")
    ap.add_argument("--store-slug", required=True, help="Store slug (matches evidence folder). Example: carbon38")
    ap.add_argument("--url", required=True, help="Target URL to screenshot.")
    ap.add_argument("--device", choices=["desktop", "mobile"], required=True, help="Device bucket for naming.")
    ap.add_argument("--stage", required=True, help="Stage token (homepage/plp/pdp/cart/checkout/post-purchase).")
    ap.add_argument("--feature", required=True, help="Feature token (e.g., shipping-threshold, express-buttons).")
    ap.add_argument("--evidence-dir", required=True, help="Base evidence dir containing <store-slug>/")
    ap.add_argument("--date", default=yyyymmdd(), help="Date stamp YYYYMMDD (default: today).")
    ap.add_argument("--full-page", action="store_true", help="Capture full-page screenshot (default: viewport only).")
    ap.add_argument("--timeout-ms", type=int, default=45_000, help="Navigation+action timeout in ms.")
    ap.add_argument(
        "--checkout-step",
        choices=["none", "delivery-estimate"],
        default="none",
        help="Optional: run a best-effort checkout interaction step before screenshot (Shopify checkout only).",
    )
    ap.add_argument(
        "--cart-step",
        choices=["none", "add-to-cart"],
        default="none",
        help="Optional: add a variant to cart then screenshot /cart (Shopify cart evidence only).",
    )
    ap.add_argument(
        "--cart-variant-id",
        default="",
        help="Shopify variant id to add to cart (required when --cart-step add-to-cart).",
    )
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing file if present.")
    args = ap.parse_args()

    store = slug_token(args.store_slug)
    device = slug_token(args.device)
    stage = slug_token(args.stage)
    feature = slug_token(args.feature)
    date = re.sub(r"[^0-9]", "", args.date or "")
    if len(date) != 8:
        raise SystemExit(f"Invalid --date (expected YYYYMMDD): {args.date}")

    if (args.cart_step or "none") == "add-to-cart" and not (args.cart_variant_id or "").strip():
        raise SystemExit("--cart-variant-id is required when --cart-step add-to-cart")

    evidence_dir = Path(args.evidence_dir)
    out_path = evidence_dir / store / f"{store}__{device}__{stage}__{feature}__{date}.png"
    if out_path.exists() and not args.overwrite:
        print(f"SKIP (exists): {out_path}")
        return 0

    # Conservative defaults: decent desktop and iPhone-ish mobile viewport.
    viewport = Viewport(width=1365, height=900) if device == "desktop" else Viewport(width=390, height=844)
    ua = (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36 lumelle-docs-tier-a"
        if device == "desktop"
        else "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
        "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 lumelle-docs-tier-a"
    )

    print(f"- url: {args.url}")
    print(f"- out: {out_path}")
    print(f"- viewport: {viewport.width}x{viewport.height}")
    print(f"- full_page: {bool(args.full_page)}")
    asyncio.run(
        capture(
            url=args.url,
            out_path=out_path,
            viewport=viewport,
            user_agent=ua,
            full_page=bool(args.full_page),
            timeout_ms=int(args.timeout_ms),
            checkout_step=(args.checkout_step or "none"),
            cart_step=(args.cart_step or "none"),
            cart_variant_id=(args.cart_variant_id or ""),
        )
    )
    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
