#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


def parse_names_from_queue(md: str) -> list[str]:
    names: list[str] = []
    for line in md.splitlines():
        line = line.strip()
        if not line.startswith("## "):
            continue
        if ") " not in line:
            continue
        # "## 12) Shopify — score 31"
        after = line.split(") ", 1)[1]
        name = after.split(" — score", 1)[0].strip()
        if name:
            names.append(name)
    return names


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate competitor evidence extracts for a deepening queue.")
    ap.add_argument("--plan-id", required=True, help="Plan folder name.")
    ap.add_argument("--queue", required=True, help="Path to competitors/deepening-queue.md")
    ap.add_argument("--snapshots-dir", required=True, help="Homepage snapshots dir.")
    ap.add_argument("--variants-dir", required=True, help="Variants snapshots dir.")
    ap.add_argument("--out-dir", required=True, help="Output directory for evidence extracts.")
    ap.add_argument("--limit", type=int, default=25, help="How many competitors to process.")
    args = ap.parse_args()

    queue_path = Path(args.queue)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    names = parse_names_from_queue(queue_path.read_text("utf-8", errors="replace"))
    names = names[: args.limit]

    script = Path(__file__).resolve().parent / "extract_competitor_evidence.py"
    if not script.exists():
        raise SystemExit(f"Missing script: {script}")

    ok = 0
    for name in names:
        # Use the other script’s slugging by letting it decide output filename;
        # we pass an output path based on a simple slug (lowercase, spaces -> -).
        # It will still compute the correct snapshot slug internally.
        out_name = (
            name.lower()
            .replace("&", "and")
            .replace("/", "-")
            .replace("(", "")
            .replace(")", "")
            .replace(".", "")
        )
        out_name = "-".join(out_name.split())
        out_path = out_dir / f"{out_name}.md"

        cmd = [
            "python3",
            str(script),
            "--plan-id",
            args.plan_id,
            "--name",
            name,
            "--snapshots-dir",
            args.snapshots_dir,
            "--variants-dir",
            args.variants_dir,
            "--out",
            str(out_path),
        ]
        subprocess.run(cmd, check=True)
        ok += 1

    print(f"Generated {ok} evidence extracts in {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

