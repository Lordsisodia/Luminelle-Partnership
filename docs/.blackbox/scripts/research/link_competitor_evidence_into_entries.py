#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


def ensure_evidence_link(entry_text: str, evidence_rel: str) -> str:
    if evidence_rel in entry_text:
        return entry_text

    # Prefer adding to "Evidence / sources" section if present.
    marker = "## Evidence / sources"
    if marker in entry_text:
        parts = entry_text.split(marker, 1)
        head = parts[0] + marker + "\n\n"
        tail = parts[1].lstrip("\n")
        # Insert at top of evidence list
        insert = f"- Evidence extract: `{evidence_rel}`\n"
        return head + insert + tail

    # Fallback: append near end
    return entry_text.rstrip() + f"\n\n## Evidence extract\n\n- `{evidence_rel}`\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="Link competitor evidence notes into competitor entry files.")
    ap.add_argument(
        "--plan-id",
        required=True,
        help="Plan folder name (kept for backward compatibility; evidence links are written relative to entries dir).",
    )
    ap.add_argument("--entries-dir", required=True, help="competitors/entries directory")
    ap.add_argument("--evidence-dir", required=True, help="competitors/evidence directory")
    ap.add_argument("--limit", type=int, default=0, help="Only process first N evidence files (0=all)")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    evidence_dir = Path(args.evidence_dir)

    evidence_files = sorted(evidence_dir.glob("*.md"))
    if args.limit and args.limit > 0:
        evidence_files = evidence_files[: args.limit]

    updated = 0
    for ev in evidence_files:
        slug = ev.stem
        entry = entries_dir / f"{slug}.md"
        if not entry.exists():
            # allow mismatch if filename differs slightly; skip
            continue
        # Keep links stable and readable within the plan folder.
        # Entry: competitors/entries/<slug>.md
        # Evidence: competitors/evidence/<slug>.md
        evidence_rel = f"../evidence/{ev.name}"
        text = entry.read_text("utf-8", errors="replace")
        new_text = ensure_evidence_link(text, evidence_rel=evidence_rel)
        if new_text != text:
            entry.write_text(new_text, encoding="utf-8")
            updated += 1

    print(f"Linked evidence into {updated} competitor entry files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
