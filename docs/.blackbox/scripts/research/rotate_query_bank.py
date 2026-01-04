#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class Group:
    title: str
    lines_before: list[str]
    queries: list[str]


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"run_count": 0, "updated_at_utc": None}
    try:
        return json.loads(path.read_text("utf-8"))
    except Exception:  # noqa: BLE001
        return {"run_count": 0, "updated_at_utc": None}


def save_state(path: Path, state: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def rotate_list(items: list[str], offset: int) -> list[str]:
    if not items:
        return []
    off = offset % len(items)
    return items[off:] + items[:off]


def parse_query_bank(md: str) -> tuple[list[str], list[Group]]:
    """
    Parse query bank markdown:
    - Keeps a top preamble (before the first '## ')
    - Each '## <group>' collects '- <query>' bullet lines
    - Non-bullet lines inside a group are preserved as 'lines_before' for that group
      (this keeps short context text if present)
    """
    lines = md.splitlines()
    preamble: list[str] = []
    groups: list[Group] = []

    current: Group | None = None
    in_group = False

    for raw in lines:
        if raw.startswith("## "):
            in_group = True
            if current is not None:
                groups.append(current)
            title = raw.removeprefix("## ").strip() or "Ungrouped"
            current = Group(title=title, lines_before=[], queries=[])
            continue

        if not in_group:
            preamble.append(raw)
            continue

        assert current is not None
        stripped = raw.strip()
        if stripped.startswith("- "):
            q = stripped.removeprefix("- ").strip()
            if q:
                current.queries.append(q)
        else:
            current.lines_before.append(raw)

    if current is not None:
        groups.append(current)

    # If no groups were found, treat everything as a single group.
    if not groups:
        return preamble, [Group(title="Ungrouped", lines_before=[], queries=[l.strip()[2:] for l in lines if l.strip().startswith("- ")])]

    return preamble, groups


def render_query_bank(preamble: list[str], groups: list[Group], *, rotation_offset: int, max_per_group: int = 0) -> str:
    out: list[str] = []
    out.extend(preamble)
    if out and out[-1] != "":
        out.append("")

    for g in groups:
        out.append(f"## {g.title}")
        # Preserve any descriptive lines that were between the heading and the bullets.
        if g.lines_before:
            out.extend(g.lines_before)
        rotated = rotate_list(g.queries, rotation_offset)
        if max_per_group and max_per_group > 0:
            rotated = rotated[:max_per_group]
        for q in rotated:
            out.append(f"- {q}")
        out.append("")

    return "\n".join(out).rstrip() + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="Rotate a markdown query bank deterministically (stateful).")
    ap.add_argument("--in", dest="in_path", required=True, help="Input query bank markdown")
    ap.add_argument("--out", required=True, help="Output rotated query bank markdown")
    ap.add_argument("--state", required=True, help="Path to local state JSON (updated in place)")
    ap.add_argument(
        "--max-per-group",
        type=int,
        default=0,
        help="Optional: cap the rotated queries written per group (0 = all).",
    )
    ap.add_argument(
        "--dry-run",
        action="store_true",
        help="Do not update state (useful for previews).",
    )
    args = ap.parse_args()

    in_path = Path(args.in_path)
    out_path = Path(args.out)
    state_path = Path(args.state)

    state = load_state(state_path)
    run_count = int(state.get("run_count") or 0)
    rotation_offset = run_count

    md = in_path.read_text("utf-8", errors="replace")
    preamble, groups = parse_query_bank(md)

    rotated_md = render_query_bank(preamble, groups, rotation_offset=rotation_offset, max_per_group=args.max_per_group)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(rotated_md, encoding="utf-8")

    if not args.dry_run:
        state["run_count"] = run_count + 1
        state["updated_at_utc"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        save_state(state_path, state)

    print(f"Wrote rotated query bank: {out_path}")
    print(f"Rotation offset: {rotation_offset} (run_count was {run_count})")
    if not args.dry_run:
        print(f"State updated: {state_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

