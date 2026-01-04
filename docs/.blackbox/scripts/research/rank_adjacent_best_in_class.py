#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


def safe_inline(s: str) -> str:
    return (s or "").replace("|", " / ").strip()


def has_val(row: dict[str, str], key: str) -> bool:
    return bool((row.get(key) or "").strip())


def contains(row: dict[str, str], key: str, needle: str) -> bool:
    return needle.lower() in (row.get(key) or "").lower()


def evidence_path(row: dict[str, str]) -> str:
    return (row.get("snapshot_path") or "").strip() or (row.get("url") or "").strip()


@dataclass(frozen=True)
class ScoredRow:
    score: int
    store: str
    niche: str
    row: dict[str, str]
    rationale: str


def score_row(r: dict[str, str]) -> tuple[int, str]:
    """
    Heuristic scoring:
    - rewards presence of high-leverage conversion tooling signals on the homepage snapshot
    - penalizes blocked/missing evidence

    This is intended as triage, not a definitive “best store” judgment.
    """
    score = 0
    reasons: list[str] = []

    if has_val(r, "snapshot_file"):
        score += 1
        reasons.append("snapshot_ok")
    else:
        score -= 1
        reasons.append("no_snapshot")

    if has_val(r, "blocked"):
        score -= 3
        reasons.append("blocked_or_defended")

    if has_val(r, "reviews"):
        score += 2
        reasons.append("reviews")

    if has_val(r, "search_personalization"):
        score += 2
        reasons.append("search/personalization")

    if has_val(r, "returns"):
        score += 1
        reasons.append("returns")

    if has_val(r, "bnpl"):
        score += 1
        reasons.append("bnpl")

    if has_val(r, "subscriptions"):
        score += 1
        reasons.append("subscriptions")

    if has_val(r, "support"):
        score += 1
        reasons.append("support")

    if contains(r, "platform", "shopify"):
        score += 1
        reasons.append("shopify")

    if has_val(r, "ux_keywords"):
        score += 1
        reasons.append("ux_keywords")

    return score, ", ".join(reasons) if reasons else "—"


def main() -> int:
    ap = argparse.ArgumentParser(description="Rank adjacent best-in-class stores from an enriched CSV (heuristic).")
    ap.add_argument("--input-csv", required=True, help="Enriched CSV with snapshot signals.")
    ap.add_argument("--out-top-csv", required=True, help="Write ranked CSV here.")
    ap.add_argument("--out-md", required=True, help="Write markdown summary here.")
    ap.add_argument("--top-n", type=int, default=15, help="Overall top N to include in markdown.")
    ap.add_argument("--per-niche", type=int, default=3, help="Top N per niche to include in markdown.")
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_top_csv = Path(args.out_top_csv)
    out_md = Path(args.out_md)

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    scored: list[ScoredRow] = []
    for r in rows:
        store = (r.get("store") or "").strip()
        niche = (r.get("niche") or "").strip() or "Other"
        score, rationale = score_row(r)
        scored.append(ScoredRow(score=score, store=store, niche=niche, row=r, rationale=rationale))

    scored_sorted = sorted(scored, key=lambda s: (-s.score, s.niche.lower(), s.store.lower()))

    # CSV: full ranking
    out_top_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "rank",
        "score",
        "store",
        "url",
        "niche",
        "rationale",
        "snapshot_path",
        "blocked",
        "platform",
        "bnpl",
        "reviews",
        "returns",
        "search_personalization",
        "subscriptions",
        "support",
        "ux_keywords",
    ]
    with out_top_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for i, s in enumerate(scored_sorted, start=1):
            r = s.row
            w.writerow(
                {
                    "rank": str(i),
                    "score": str(s.score),
                    "store": s.store,
                    "url": (r.get("url") or "").strip(),
                    "niche": s.niche,
                    "rationale": s.rationale,
                    "snapshot_path": evidence_path(r),
                    "blocked": (r.get("blocked") or "").strip(),
                    "platform": (r.get("platform") or "").strip(),
                    "bnpl": (r.get("bnpl") or "").strip(),
                    "reviews": (r.get("reviews") or "").strip(),
                    "returns": (r.get("returns") or "").strip(),
                    "search_personalization": (r.get("search_personalization") or "").strip(),
                    "subscriptions": (r.get("subscriptions") or "").strip(),
                    "support": (r.get("support") or "").strip(),
                    "ux_keywords": (r.get("ux_keywords") or "").strip(),
                }
            )

    # Markdown: top overall + per-niche
    now = datetime.now(timezone.utc)
    now_stamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    today = now.strftime("%Y-%m-%d")

    by_niche: dict[str, list[ScoredRow]] = defaultdict(list)
    for s in scored_sorted:
        by_niche[s.niche].append(s)

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append(f"last_reviewed: {today}")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append("# Adjacent Best-in-Class — Heuristic Top Picks")
    lines.append("")
    lines.append("This is a **triage ranking** generated from homepage snapshot signals.")
    lines.append("Use it to decide what to manual-audit next (PDP/cart/checkout), not as a final “best store” verdict.")
    lines.append("")
    lines.append("Sources:")
    lines.append(f"- `{input_csv.as_posix()}`")
    lines.append(f"- Generated at: `{now_stamp}`")
    lines.append("")
    lines.append("## Top overall")
    lines.append("")
    lines.append("| rank | store | niche | score | why | evidence |")
    lines.append("|---:|---|---|---:|---|---|")
    for i, s in enumerate(scored_sorted[: max(1, args.top_n)], start=1):
        r = s.row
        why = safe_inline(s.rationale)
        ev = evidence_path(r)
        lines.append(f"| {i} | {safe_inline(s.store)} | {safe_inline(s.niche)} | {s.score} | {why} | `{ev}` |")
    lines.append("")

    lines.append("## Top per niche")
    lines.append("")
    niches = sorted(by_niche.keys(), key=lambda n: (-len(by_niche[n]), n.lower()))
    for niche in niches:
        lines.append(f"### {safe_inline(niche)}")
        lines.append("")
        lines.append("| rank | store | score | why | evidence |")
        lines.append("|---:|---|---:|---|---|")
        for i, s in enumerate(by_niche[niche][: max(1, args.per_niche)], start=1):
            r = s.row
            lines.append(
                f"| {i} | {safe_inline(s.store)} | {s.score} | {safe_inline(s.rationale)} | `{evidence_path(r)}` |"
            )
        lines.append("")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote: {out_top_csv}")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

