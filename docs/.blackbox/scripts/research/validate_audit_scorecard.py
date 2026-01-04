#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Issue:
    row: int
    store: str
    field: str
    message: str


SCORE_FIELDS = [
    "discovery_score",
    "pdp_confidence_score",
    "cart_score",
    "checkout_score",
    "post_purchase_returns_score",
]


def parse_float(s: str) -> float | None:
    s = (s or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate a funnel audit scorecard CSV (0–5 scores, required fields).")
    ap.add_argument("--csv", required=True, help="Path to scorecard.csv")
    ap.add_argument("--strict", action="store_true", help="Fail on missing optional fields when scores are present.")
    args = ap.parse_args()

    p = Path(args.csv)
    if not p.exists():
        raise SystemExit(f"Not found: {p}")

    issues: list[Issue] = []
    with p.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        for req in ["store", "url", "device", *SCORE_FIELDS]:
            if req not in header:
                issues.append(Issue(row=0, store="", field=req, message="missing required column"))

        seen_keys: set[tuple[str, str]] = set()
        store_devices: dict[str, set[str]] = {}

        for i, r in enumerate(reader, start=2):  # header is row 1
            store = (r.get("store") or "").strip()
            url = (r.get("url") or "").strip()
            device = (r.get("device") or "").strip()
            if not store:
                issues.append(Issue(row=i, store=store, field="store", message="missing store name"))
            if not url or not url.startswith(("http://", "https://")):
                issues.append(Issue(row=i, store=store, field="url", message="missing or invalid url"))
            if device and device not in {"desktop", "mobile"}:
                issues.append(Issue(row=i, store=store, field="device", message="expected desktop|mobile"))
            blocked = (r.get("blocked") or "").strip().lower()
            if blocked and blocked not in {"yes", "no"}:
                issues.append(Issue(row=i, store=store, field="blocked", message="expected yes|no (or blank)"))

            if store and device:
                key = (store.lower(), device)
                if key in seen_keys:
                    issues.append(Issue(row=i, store=store, field="device", message="duplicate store+device row"))
                seen_keys.add(key)
                store_devices.setdefault(store, set()).add(device)

            any_score = False
            all_scores_present = True
            for sf in SCORE_FIELDS:
                v = parse_float(r.get(sf, ""))
                if v is None:
                    all_scores_present = False
                    continue
                any_score = True
                if v < 0 or v > 5:
                    issues.append(Issue(row=i, store=store, field=sf, message="score must be between 0 and 5"))

            # Weighted score is computed output; prefer leaving it blank in input scorecards.
            if (r.get("weighted_score") or "").strip():
                issues.append(Issue(row=i, store=store, field="weighted_score", message="should be blank (computed by scripts)"))

            if args.strict and any_score:
                for key in ["auditor", "session_id", "top_3_patterns", "top_3_pitfalls", "evidence_links"]:
                    if not (r.get(key) or "").strip():
                        issues.append(Issue(row=i, store=store, field=key, message="missing (strict mode)"))

            # If fully scored, ensure weighted_score can be computed by downstream script.
            if all_scores_present:
                if blocked == "yes":
                    issues.append(Issue(row=i, store=store, field="blocked", message="marked yes but row is fully scored"))
                if not (r.get("evidence_links") or "").strip():
                    issues.append(Issue(row=i, store=store, field="evidence_links", message="recommended when fully scored"))

        for s, devs in sorted(store_devices.items()):
            if devs != {"desktop", "mobile"}:
                missing = ", ".join(sorted({"desktop", "mobile"} - devs))
                issues.append(Issue(row=0, store=s, field="device", message=f"missing device row(s): {missing}"))

    if issues:
        print(f"Found {len(issues)} issues in {p}:\n")
        for iss in issues[:200]:
            loc = f"row {iss.row}" if iss.row else "header"
            store = f" [{iss.store}]" if iss.store else ""
            print(f"- {loc}{store}: {iss.field} — {iss.message}")
        if len(issues) > 200:
            print(f"\n(truncated, showing first 200 of {len(issues)})")
        return 1

    print(f"OK: {p} (no issues)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
