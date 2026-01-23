#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path


SIGNAL_KEYS = [
    "platform",
    "bnpl",
    "reviews",
    "support",
    "subscriptions",
    "returns",
    "search_personalization",
    "tracking",
    "ux_keywords",
]

# Common funnel page “stage” suffixes used in seed labels.
# Supports both legacy `<store>__<stage>` labels and the newer `<prefix> <store> <stage>` format.
KNOWN_STAGES = {
    "home",
    "homepage",
    "collection",
    "plp",
    "product",
    "pdp",
    "cart",
    "checkout",
    "sizing",
    "size",
    "size-guide",
    "shipping",
    "delivery",
    "returns",
    "exchanges",
    "support",
    "help",
    "faq",
    "contact",
}


def split_list(s: str) -> set[str]:
    parts = [p.strip() for p in (s or "").split(",")]
    return {p for p in parts if p}


def store_from_name(name: str) -> str:
    if "__" in (name or ""):
        return name.split("__", 1)[0].strip() or name.strip()
    parts = (name or "").strip().split()
    if parts and parts[-1].lower() in KNOWN_STAGES and len(parts) >= 2:
        # Support labels like "<prefix> <Store Name> <stage>" where prefix is
        # a slug-ish run label (usually lowercase, hyphenated).
        if len(parts) >= 3 and parts[0] == parts[0].lower() and "-" in parts[0]:
            return " ".join(parts[1:-1]).strip()
        return " ".join(parts[:-1]).strip()
    return (name or "").strip()


def stage_from_name(name: str) -> str:
    if "__" in (name or ""):
        return name.split("__", 1)[1].strip()
    parts = (name or "").strip().split()
    if parts and parts[-1].lower() in KNOWN_STAGES and len(parts) >= 2:
        return parts[-1].strip()
    return ""


@dataclass
class PageRow:
    name: str
    url: str
    snapshot_file: str
    title: str
    description: str
    signals: dict[str, set[str]]


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Group per-page snapshot signals into per-store rollups + a Markdown findings note."
    )
    ap.add_argument("--input-csv", required=True, help="Input CSV from summarize_store_snapshots.py")
    ap.add_argument("--out-md", required=True, help="Write findings markdown here")
    ap.add_argument("--out-rollup-csv", required=True, help="Write per-store rollup CSV here")
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_md = Path(args.out_md)
    out_rollup_csv = Path(args.out_rollup_csv)

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows_raw = list(reader)

    pages: list[PageRow] = []
    for r in rows_raw:
        signals = {k: split_list(r.get(k, "")) for k in SIGNAL_KEYS}
        pages.append(
            PageRow(
                name=r.get("name", "").strip(),
                url=r.get("url", "").strip(),
                snapshot_file=r.get("snapshot_file", "").strip(),
                title=r.get("title", "").strip(),
                description=r.get("description", "").strip(),
                signals=signals,
            )
        )

    stores: dict[str, list[PageRow]] = {}
    for p in pages:
        stores.setdefault(store_from_name(p.name), []).append(p)

    # Rollup CSV
    out_rollup_csv.parent.mkdir(parents=True, exist_ok=True)
    rollup_fields = ["store", "pages"] + SIGNAL_KEYS + ["urls"]
    with out_rollup_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=rollup_fields)
        w.writeheader()
        for store in sorted(stores.keys()):
            ps = stores[store]
            agg: dict[str, set[str]] = {k: set() for k in SIGNAL_KEYS}
            urls: list[str] = []
            for p in ps:
                urls.append(p.url)
                for k in SIGNAL_KEYS:
                    agg[k].update(p.signals.get(k, set()))
            w.writerow(
                {
                    "store": store,
                    "pages": str(len(ps)),
                    **{k: ", ".join(sorted(agg[k])) for k in SIGNAL_KEYS},
                    "urls": " | ".join(urls),
                }
            )

    # Markdown note
    lines: list[str] = []
    lines.append("# Batch Snapshot Findings (by store)")
    lines.append("")
    lines.append("This note groups automated HTML snapshot signals into store-level rollups.")
    lines.append("It is a *triage layer* (useful for patterns + tooling detection), not a substitute for manual funnel audits.")
    lines.append("")
    lines.append(f"- input: `{input_csv}`")
    lines.append(f"- rollup csv: `{out_rollup_csv}`")
    lines.append("")

    for store in sorted(stores.keys()):
        ps = sorted(stores[store], key=lambda p: p.name)
        lines.append(f"## {store}")
        lines.append("")

        agg: dict[str, set[str]] = {k: set() for k in SIGNAL_KEYS}
        for p in ps:
            for k in SIGNAL_KEYS:
                agg[k].update(p.signals.get(k, set()))

        lines.append("Signals (union across pages):")
        for k in SIGNAL_KEYS:
            v = ", ".join(sorted(agg[k]))
            lines.append(f"- {k}: {v or '—'}")
        lines.append("")

        lines.append("Pages captured:")
        for p in ps:
            stage = stage_from_name(p.name) or p.name
            title = p.title.strip() or "—"
            lines.append(f"- {stage}: `{p.url}` (title: {title})")
        lines.append("")

        # Highlight "stage-specific" signals where useful
        # e.g. BNPL only appearing on PDP
        for k in ["bnpl", "reviews", "returns", "search_personalization", "tracking"]:
            per_stage = {stage_from_name(p.name) or p.name: p.signals.get(k, set()) for p in ps}
            nonempty = {st: v for st, v in per_stage.items() if v}
            if len(nonempty) <= 1:
                continue
            lines.append(f"Stage differences — {k}:")
            for st in sorted(per_stage.keys()):
                v = ", ".join(sorted(per_stage[st])) or "—"
                lines.append(f"- {st}: {v}")
            lines.append("")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    print(f"Wrote: {out_rollup_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
