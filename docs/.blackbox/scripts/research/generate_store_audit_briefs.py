#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import re
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


def split_list(s: str) -> list[str]:
    return [p.strip() for p in (s or "").split(",") if p.strip()]


def norm_key(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


@dataclass(frozen=True)
class TargetUrl:
    raw_stage: str
    url: str


def parse_preflight_targets(audit_doc: Path) -> list[TargetUrl]:
    text = audit_doc.read_text("utf-8", errors="replace")
    if "## Desk research preflight (auto)" not in text:
        return []
    targets: list[TargetUrl] = []
    in_targets = False
    for line in text.splitlines():
        l = line.strip()
        if l.startswith("Target URLs"):
            in_targets = True
            continue
        if in_targets:
            if l.startswith("Detected tooling") or l.startswith("<!-- PRE-FLIGHT:END"):
                break
            m = re.match(r"^-\s*([^:]+):\s*`(https?://[^`]+)`", l)
            if m:
                targets.append(TargetUrl(raw_stage=m.group(1).strip(), url=m.group(2).strip()))
    return targets


def parse_preflight_blocked_pct(audit_doc: Path) -> int | None:
    text = audit_doc.read_text("utf-8", errors="replace")
    m = re.search(r"Bot defense \(from HTML snapshots\):\s+\d+/\d+\s+pages blocked\s+\(~(\d+)%\)\.", text)
    if not m:
        return None
    try:
        return int(m.group(1))
    except Exception:
        return None


def read_store_rollups_csv(path: Path) -> dict[str, dict[str, list[str]]]:
    """
    rollup_fields: store,pages,platform,bnpl,reviews,support,subscriptions,returns,search_personalization,tracking,ux_keywords,urls
    """
    out: dict[str, dict[str, list[str]]] = {}
    if not path.exists():
        return out
    with path.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            store = (row.get("store") or "").strip()
            if not store:
                continue
            out.setdefault(store, {})
            for k in SIGNAL_KEYS:
                out[store][k] = split_list(row.get(k, ""))
    return out


def merge_signals(*signal_dicts: dict[str, dict[str, list[str]]]) -> dict[str, dict[str, list[str]]]:
    merged: dict[str, dict[str, set[str]]] = {}
    for d in signal_dicts:
        for store, sigs in d.items():
            merged.setdefault(store, {k: set() for k in SIGNAL_KEYS})
            for k in SIGNAL_KEYS:
                merged[store][k].update(sigs.get(k, []))
    return {s: {k: sorted(v) for k, v in sigs.items()} for s, sigs in merged.items()}


def suggested_extras(signals: dict[str, list[str]]) -> list[str]:
    extras: list[str] = []
    bnpl = set(signals.get("bnpl", []))
    reviews = set(signals.get("reviews", []))
    returns = set(signals.get("returns", []))
    support = set(signals.get("support", []))
    search = set(signals.get("search_personalization", []))

    if bnpl:
        extras.append(f"Capture BNPL messaging placement (providers: {', '.join(sorted(bnpl))}).")
    if reviews:
        extras.append(f"Capture review module details (vendor signals: {', '.join(sorted(reviews))}).")
    if returns:
        extras.append(f"Capture returns portal UX (tooling signals: {', '.join(sorted(returns))}).")
    if support:
        extras.append(f"Capture help-center + chat escalation UX (tooling signals: {', '.join(sorted(support))}).")
    if search:
        extras.append(f"Capture search/autocomplete UX (signals: {', '.join(sorted(search))}).")

    # General prompts if no special tooling detected
    if not extras:
        extras.append("Capture any fit/size confidence mechanics beyond the baseline checklist (quiz, model measurements, fit notes).")
        extras.append("Capture any merchandising cross-sell mechanics (complete the set, shop the look).")
    return extras


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate per-store audit briefing notes from preflight + batch rollups.")
    ap.add_argument("--audits-dir", required=True, help="Directory containing per-store audit docs (*.md).")
    ap.add_argument("--store-slug-map", required=True, help="store-slug-map.json")
    ap.add_argument("--rollups", action="append", default=[], help="One or more store rollup CSV files (batch).")
    ap.add_argument("--out-dir", required=True, help="Output directory for briefs.")
    args = ap.parse_args()

    audits_dir = Path(args.audits_dir)
    slug_map = json.loads(Path(args.store_slug_map).read_text("utf-8"))
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rollups_merged = merge_signals(*[read_store_rollups_csv(Path(p)) for p in args.rollups])

    # Build a helper index: normalized store name -> store key in rollups
    norm_to_rollup_key: dict[str, str] = {}
    for store in rollups_merged.keys():
        norm_to_rollup_key[norm_key(store)] = store

    written = 0
    for display_name, slug in slug_map.items():
        audit_doc = audits_dir / f"{slug}.md"
        if not audit_doc.exists():
            continue
        blocked_pct = parse_preflight_blocked_pct(audit_doc)
        targets = parse_preflight_targets(audit_doc)

        rollup_key = norm_to_rollup_key.get(norm_key(display_name)) or norm_to_rollup_key.get(norm_key(slug)) or ""
        signals = rollups_merged.get(rollup_key, {k: [] for k in SIGNAL_KEYS})

        lines: list[str] = []
        lines.append(f"# Audit Brief — {display_name}")
        lines.append("")
        lines.append(f"- Store slug: `{slug}`")
        lines.append(f"- Audit doc: `{audit_doc}`")
        if blocked_pct is not None:
            lines.append(f"- Snapshot reachability signal: **{blocked_pct}% blocked**")
        else:
            lines.append("- Snapshot reachability signal: —")
        lines.append("")

        lines.append("## Target URLs (from preflight)")
        lines.append("")
        if not targets:
            lines.append("- No preflight targets found (run preflight injector first).")
        else:
            for t in targets:
                lines.append(f"- {t.raw_stage}: `{t.url}`")
        lines.append("")

        lines.append("## Detected tooling / signals (triage)")
        lines.append("")
        any_sig = any(signals.get(k) for k in SIGNAL_KEYS)
        if not any_sig:
            lines.append("- No rollup signals found (may be blocked/dynamic).")
        else:
            for k in SIGNAL_KEYS:
                v = ", ".join(signals.get(k, []))
                if v:
                    lines.append(f"- {k}: {v}")
        lines.append("")

        lines.append("## Suggested extra captures (beyond baseline checklist)")
        lines.append("")
        for ex in suggested_extras(signals):
            lines.append(f"- {ex}")
        lines.append("")

        if blocked_pct is not None and blocked_pct >= 50:
            lines.append("## Bot protection note")
            lines.append("")
            lines.append("This store appears heavily bot-protected in automated snapshots.")
            lines.append("Plan to perform the audit fully manual and follow:")
            lines.append("- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`")
            lines.append("")

        out_path = out_dir / f"{slug}.md"
        out_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
        written += 1

    print(f"Wrote {written} store brief(s) to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

