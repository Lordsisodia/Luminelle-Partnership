#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
from dataclasses import dataclass
from pathlib import Path


def norm_name(s: str) -> str:
    s = (s or "").strip().lower()
    s = s.replace("_", " ")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def norm_domain(url: str) -> str:
    u = (url or "").strip().lower()
    u = re.sub(r"^https?://", "", u)
    u = u.split("/", 1)[0]
    u = re.sub(r"^www\.", "", u)
    return u


@dataclass(frozen=True)
class SnapshotRow:
    name: str
    url: str
    snapshot_file: str
    title: str
    description: str
    blocked: str
    platform: str
    bnpl: str
    reviews: str
    support: str
    subscriptions: str
    returns: str
    search_personalization: str
    tracking: str
    ux_keywords: str


def read_csv_dicts(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        return [{k: (v or "").strip() for k, v in row.items()} for row in r]


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Enrich a store list CSV (store/url/niche/etc) with automated snapshot signals from store-snapshots-summary.csv."
    )
    ap.add_argument("--stores-csv", required=True, help="Input store list CSV (must include `store` and `url`).")
    ap.add_argument("--snapshot-summary-csv", required=True, help="CSV from summarize_store_snapshots.py")
    ap.add_argument(
        "--snapshots-dir",
        required=False,
        default="",
        help="Directory that contains snapshot files referenced by snapshot_summary_csv (optional; used for snapshot_path).",
    )
    ap.add_argument("--out-csv", required=True, help="Write enriched CSV here.")
    args = ap.parse_args()

    stores_csv = Path(args.stores_csv)
    snapshot_summary_csv = Path(args.snapshot_summary_csv)
    snapshots_dir = Path(args.snapshots_dir) if args.snapshots_dir else None
    out_csv = Path(args.out_csv)

    store_rows = read_csv_dicts(stores_csv)
    snapshot_rows_raw = read_csv_dicts(snapshot_summary_csv)

    # Build snapshot indexes (name + domain).
    by_name: dict[str, SnapshotRow] = {}
    by_domain: dict[str, SnapshotRow] = {}

    required_snapshot_fields = {
        "name",
        "url",
        "snapshot_file",
        "title",
        "description",
        "blocked",
        "platform",
        "bnpl",
        "reviews",
        "support",
        "subscriptions",
        "returns",
        "search_personalization",
        "tracking",
        "ux_keywords",
    }
    missing_fields = sorted(required_snapshot_fields - set(snapshot_rows_raw[0].keys() if snapshot_rows_raw else []))
    if missing_fields:
        raise SystemExit(f"snapshot summary missing fields: {missing_fields}")

    for d in snapshot_rows_raw:
        sr = SnapshotRow(
            name=d.get("name", ""),
            url=d.get("url", ""),
            snapshot_file=d.get("snapshot_file", ""),
            title=d.get("title", ""),
            description=d.get("description", ""),
            blocked=d.get("blocked", ""),
            platform=d.get("platform", ""),
            bnpl=d.get("bnpl", ""),
            reviews=d.get("reviews", ""),
            support=d.get("support", ""),
            subscriptions=d.get("subscriptions", ""),
            returns=d.get("returns", ""),
            search_personalization=d.get("search_personalization", ""),
            tracking=d.get("tracking", ""),
            ux_keywords=d.get("ux_keywords", ""),
        )
        key = norm_name(sr.name)
        if key and key not in by_name:
            by_name[key] = sr
        dom = norm_domain(sr.url)
        if dom and dom not in by_domain:
            by_domain[dom] = sr

    enriched: list[dict[str, str]] = []
    matched_name = 0
    matched_domain = 0
    unmatched: list[str] = []

    for row in store_rows:
        store = row.get("store", "").strip()
        url = row.get("url", "").strip()
        if not store or not url:
            continue

        sr = by_name.get(norm_name(store))
        if sr:
            matched_name += 1
        else:
            sr = by_domain.get(norm_domain(url))
            if sr:
                matched_domain += 1
            else:
                unmatched.append(store)

        snapshot_path = ""
        if sr and sr.snapshot_file and snapshots_dir:
            snapshot_path = str((snapshots_dir / sr.snapshot_file).as_posix())

        enriched.append(
            {
                **row,
                "snapshot_file": (sr.snapshot_file if sr else ""),
                "snapshot_path": snapshot_path,
                "snapshot_title": (sr.title if sr else ""),
                "snapshot_description": (sr.description if sr else ""),
                "blocked": (sr.blocked if sr else ""),
                "platform": (sr.platform if sr else ""),
                "bnpl": (sr.bnpl if sr else ""),
                "reviews": (sr.reviews if sr else ""),
                "support": (sr.support if sr else ""),
                "subscriptions": (sr.subscriptions if sr else ""),
                "returns": (sr.returns if sr else ""),
                "search_personalization": (sr.search_personalization if sr else ""),
                "tracking": (sr.tracking if sr else ""),
                "ux_keywords": (sr.ux_keywords if sr else ""),
            }
        )

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(enriched[0].keys()) if enriched else []
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(enriched)

    print(f"Wrote: {out_csv}")
    print(f"Matched by name: {matched_name}")
    print(f"Matched by domain: {matched_domain}")
    print(f"Unmatched: {len(unmatched)}")
    if unmatched:
        print("Unmatched stores:")
        for s in unmatched:
            print(f"- {s}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

