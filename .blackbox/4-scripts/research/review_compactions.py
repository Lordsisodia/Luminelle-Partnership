#!/usr/bin/env python3
"""
Review compactions for a long-running plan-local memory system.

This is intentionally simple and dependency-free:
- reads <plan>/context/compactions/compaction-*.md
- reports counts + sizes
- helps enforce the "review every 10 compactions (~100 steps)" cadence
- optionally writes a small status doc under <plan>/context/reviews/
"""

from __future__ import annotations

import argparse
import math
import sys
from dataclasses import dataclass
from pathlib import Path


MB = 1024 * 1024


@dataclass(frozen=True)
class CompactionInfo:
    path: Path
    bytes: int


def human_bytes(n: int) -> str:
    if n < 1024:
        return f"{n} B"
    if n < 1024 * 1024:
        return f"{n/1024:.1f} KB"
    return f"{n/MB:.2f} MB"


def list_compactions(plan: Path) -> list[CompactionInfo]:
    comp_dir = plan / "context" / "compactions"
    if not comp_dir.exists():
        return []
    items: list[CompactionInfo] = []
    for p in sorted(comp_dir.glob("compaction-*.md")):
        if p.name == "README.md":
            continue
        try:
            b = p.stat().st_size
        except OSError:
            b = 0
        items.append(CompactionInfo(path=p, bytes=b))
    return items


def expected_review_count(compactions: int) -> int:
    # review-0001 after compaction-0010, review-0002 after compaction-0020, etc.
    return compactions // 10


def review_file(plan: Path, idx: int) -> Path:
    return plan / "context" / "reviews" / f"review-{idx:04d}.md"


def ensure_review_scaffold(plan: Path, idx: int) -> None:
    p = review_file(plan, idx)
    if p.exists():
        return
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(
        "\n".join(
            [
                "---",
                "status: draft",
                f"review: {idx:04d}",
                "---",
                "",
                f"# Review {idx:04d} (10 compactions ≈100 steps)",
                "",
                "## ✅ What patterns improved the agent?",
                "",
                "- <prompt improvements>",
                "- <checklist improvements>",
                "- <stop conditions>",
                "",
                "## 🧠 What was actually durable/valuable?",
                "",
                "- <keep these>",
                "",
                "## 🗑️ What should be deleted or trimmed?",
                "",
                "- <delete these>",
                "",
                "## 🔁 What changes now (action items)",
                "",
                "1) <action>",
                "2) <action>",
                "",
            ]
        ),
        encoding="utf-8",
    )


def write_status(plan: Path, compactions: list[CompactionInfo], out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    total_bytes = sum(c.bytes for c in compactions)
    avg = (total_bytes / len(compactions)) if compactions else 0.0
    max_bytes = max((c.bytes for c in compactions), default=0)
    needed_reviews = expected_review_count(len(compactions))
    existing_reviews = sorted((plan / "context" / "reviews").glob("review-*.md"))

    lines: list[str] = []
    lines += [
        "---",
        "status: active",
        f"plan: {plan.as_posix()}",
        f"compactions: {len(compactions)}",
        f"total_bytes: {total_bytes}",
        "---",
        "",
        "# 🧾 Compaction Review Status",
        "",
        "## Summary",
        "",
        f"- Compactions: `{len(compactions)}`",
        f"- Total size: `{human_bytes(total_bytes)}`",
        f"- Avg compaction: `{human_bytes(int(avg))}`",
        f"- Max compaction: `{human_bytes(max_bytes)}`",
        f"- Reviews expected (every 10 compactions): `{needed_reviews}`",
        f"- Reviews present: `{len(existing_reviews)}`",
        "",
    ]

    # Whether a review is due
    due_idx = needed_reviews
    if due_idx > len(existing_reviews):
        lines += [
            "## 🔥 Review due",
            "",
            f"- Next review scaffold should exist: `{review_file(plan, due_idx).as_posix()}`",
            "- Action: read the last 10 compactions and fill the review, then prune/compact durable learnings into `context/context.md`.",
            "",
        ]
    else:
        lines += [
            "## ✅ Review cadence",
            "",
            "- No review is currently due based on compaction count.",
            "",
        ]

    lines += [
        "## Latest compactions",
        "",
    ]
    for c in compactions[-10:]:
        rel = c.path.relative_to(plan).as_posix()
        lines.append(f"- `{rel}` — `{human_bytes(c.bytes)}`")

    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--plan", required=True, help="Path to plan folder (docs/.blackbox/.plans/<run>).")
    ap.add_argument("--write", action="store_true", help="Write context/reviews/review-status.md.")
    ap.add_argument(
        "--create-missing-review-scaffolds",
        action="store_true",
        help="Create any missing review-XXXX.md scaffolds based on compaction count.",
    )
    args = ap.parse_args()

    plan = Path(args.plan)
    if not plan.exists():
        print(f"ERROR: plan not found: {plan}", file=sys.stderr)
        return 2

    compactions = list_compactions(plan)
    total_bytes = sum(c.bytes for c in compactions)
    print("✅ Compaction Review")
    print(f"- plan: {plan}")
    print(f"- compactions: {len(compactions)}")
    print(f"- total: {human_bytes(total_bytes)}")

    needed = expected_review_count(len(compactions))
    print(f"- reviews_expected: {needed}")

    if args.create_missing_review_scaffolds and needed > 0:
        for i in range(1, needed + 1):
            ensure_review_scaffold(plan, i)
        print(f"- review_scaffolds: ensured 1..{needed}")

    if args.write:
        out = plan / "context" / "reviews" / "review-status.md"
        write_status(plan, compactions, out)
        print(f"- wrote: {out}")

    # Light warnings (non-fatal) re: size expectations
    over_1mb = [c for c in compactions if c.bytes > MB]
    if over_1mb:
        print(f"WARN: {len(over_1mb)} compactions exceed 1MB (unexpected)")
        biggest = max(over_1mb, key=lambda x: x.bytes)
        print(f"- biggest: {biggest.path.name} ({human_bytes(biggest.bytes)})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

