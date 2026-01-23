#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import re
from dataclasses import dataclass
from pathlib import Path


BEGIN = "<!-- PRE-FLIGHT:BEGIN -->"
END = "<!-- PRE-FLIGHT:END -->"


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


def norm_key(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def split_list(s: str) -> list[str]:
    return [p.strip() for p in (s or "").split(",") if p.strip()]


@dataclass(frozen=True)
class Target:
    url: str
    label: str
    batch: str


def parse_targets_file(path: Path, batch: str) -> list[Target]:
    targets: list[Target] = []
    for raw in path.read_text("utf-8", errors="replace").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 2:
            continue
        url = parts[0].strip()
        label = " ".join(parts[1:]).strip()
        if not url.startswith(("http://", "https://")):
            continue
        targets.append(Target(url=url, label=label, batch=batch))
    return targets


def store_from_label(label: str) -> str:
    if "__" in label:
        return label.split("__", 1)[0].strip()
    parts = label.strip().split()
    if parts and parts[-1].lower() in KNOWN_STAGES and len(parts) >= 2:
        # Support labels like "<prefix> <Store Name> <stage>" where prefix is a
        # slug-ish run label (usually lowercase, hyphenated).
        if len(parts) >= 3 and parts[0] == parts[0].lower() and "-" in parts[0]:
            return " ".join(parts[1:-1]).strip()
        return " ".join(parts[:-1]).strip()
    return label.strip()


def stage_from_label(label: str) -> str:
    if "__" in label:
        return label.split("__", 1)[1].strip()
    parts = label.strip().split()
    if parts and parts[-1].lower() in KNOWN_STAGES and len(parts) >= 2:
        return parts[-1].strip()
    return ""


def read_rollup_csv(path: Path) -> dict[str, dict[str, list[str]]]:
    """
    Returns: store_key -> signal_key -> list[str]
    """
    out: dict[str, dict[str, list[str]]] = {}
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


def read_summary_csv(path: Path) -> dict[str, dict[str, int]]:
    """
    Returns: store_key -> {"pages": int, "blocked_pages": int}
    """
    out: dict[str, dict[str, int]] = {}
    with path.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            name = (row.get("name") or "").strip()
            if not name:
                continue
            store = store_from_label(name)
            out.setdefault(store, {"pages": 0, "blocked_pages": 0})
            out[store]["pages"] += 1
            if (row.get("blocked") or "").strip():
                out[store]["blocked_pages"] += 1
    return out


def build_store_index(
    rollups: list[tuple[str, Path]],
    summaries: list[tuple[str, Path]],
    targets_files: list[tuple[str, Path]],
) -> tuple[
    dict[str, set[str]],
    dict[str, dict[str, set[str]]],
    dict[str, dict[str, int]],
    dict[str, list[Target]],
]:
    """
    Returns:
      - norm_store -> set[store_key_seen]
      - store_key -> signal_key -> set[value]
      - store_key -> pages/blocked_pages
      - store_key -> list[Target]
    """
    norm_to_storekeys: dict[str, set[str]] = {}
    store_signals: dict[str, dict[str, set[str]]] = {}
    store_blocked: dict[str, dict[str, int]] = {}
    store_targets: dict[str, list[Target]] = {}

    for batch, path in rollups:
        data = read_rollup_csv(path)
        for store, sigs in data.items():
            norm_to_storekeys.setdefault(norm_key(store), set()).add(store)
            store_signals.setdefault(store, {k: set() for k in SIGNAL_KEYS})
            for k in SIGNAL_KEYS:
                store_signals[store][k].update(sigs.get(k, []))

    for batch, path in summaries:
        data = read_summary_csv(path)
        for store, counts in data.items():
            norm_to_storekeys.setdefault(norm_key(store), set()).add(store)
            store_blocked.setdefault(store, {"pages": 0, "blocked_pages": 0})
            store_blocked[store]["pages"] += counts.get("pages", 0)
            store_blocked[store]["blocked_pages"] += counts.get("blocked_pages", 0)

    for batch, path in targets_files:
        for t in parse_targets_file(path, batch=batch):
            store = store_from_label(t.label)
            norm_to_storekeys.setdefault(norm_key(store), set()).add(store)
            store_targets.setdefault(store, []).append(t)

    return norm_to_storekeys, store_signals, store_blocked, store_targets


def resolve_store_key(norm_to_storekeys: dict[str, set[str]], display_name: str) -> str | None:
    nk = norm_key(display_name)
    candidates = sorted(norm_to_storekeys.get(nk, []))
    if not candidates:
        return None
    # Prefer exact-case-ish matches if present
    for c in candidates:
        if norm_key(c) == nk:
            return c
    return candidates[0]


def format_preflight_section(
    *,
    display_name: str,
    store_key: str | None,
    batches: list[str],
    store_targets: dict[str, list[Target]],
    store_signals: dict[str, dict[str, set[str]]],
    store_blocked: dict[str, dict[str, int]],
    extra_notes: list[str],
) -> str:
    lines: list[str] = []
    lines.append("## Desk research preflight (auto)")
    lines.append("")
    lines.append(BEGIN)
    lines.append("")
    lines.append("This section is auto-generated from Black Box snapshot runs to make the manual audit faster.")
    lines.append("Treat it as triage (tooling + target URL list), not as UX truth.")
    lines.append("")
    lines.append("Sources:")
    for b in batches:
        lines.append(f"- {b}")
    lines.append("")

    if not store_key:
        lines.append("No snapshot data matched this store yet.")
        lines.append("")
        lines.append(END)
        return "\n".join(lines).rstrip() + "\n"

    # Bot defense summary
    counts = store_blocked.get(store_key, {"pages": 0, "blocked_pages": 0})
    pages = counts.get("pages", 0)
    blocked_pages = counts.get("blocked_pages", 0)
    if pages:
        blocked_pct = int(round((blocked_pages / max(1, pages)) * 100))
        lines.append(f"Bot defense (from HTML snapshots): {blocked_pages}/{pages} pages blocked (~{blocked_pct}%).")
    else:
        lines.append("Bot defense (from HTML snapshots): —")
    lines.append("")

    # Targets
    targets = store_targets.get(store_key, [])
    if targets:
        lines.append("Target URLs (use these to speed-run the funnel):")
        # Prefer most recent batches first
        def batch_sort_key(t: Target) -> tuple[int, str]:
            # batches are like "batch-01", "batch-02", ...
            m = re.search(r"(\\d+)", t.batch)
            n = int(m.group(1)) if m else 0
            return (-n, t.batch)

        for t in sorted(targets, key=lambda x: (batch_sort_key(x), stage_from_label(x.label), x.url)):
            stage = stage_from_label(t.label) or "page"
            lines.append(f"- {stage}: `{t.url}` ({t.batch})")
        lines.append("")

    # Signals
    sigs = store_signals.get(store_key, {k: set() for k in SIGNAL_KEYS})
    nonempty = {k: sorted(v) for k, v in sigs.items() if v}
    if nonempty:
        lines.append("Detected tooling / signals (union across snapshots):")
        for k in SIGNAL_KEYS:
            v = ", ".join(nonempty.get(k, []))
            if v:
                lines.append(f"- {k}: {v}")
        lines.append("")

    if extra_notes:
        lines.append("Audit notes:")
        for n in extra_notes:
            lines.append(f"- {n}")
        lines.append("")

    lines.append(END)
    return "\n".join(lines).rstrip() + "\n"


def upsert_preflight(doc_text: str, section_md: str) -> str:
    if BEGIN in doc_text and END in doc_text:
        # Replace existing generated block and keep the header "## Desk research..."
        pattern = re.compile(r"## Desk research preflight \(auto\)\n\n" + re.escape(BEGIN) + r".*?" + re.escape(END) + r"\n?", re.DOTALL)
        return pattern.sub(section_md, doc_text, count=1)

    # Insert before "## Quick verdict" (best anchor across templates).
    anchor = "## Quick verdict"
    if anchor in doc_text:
        return doc_text.replace(anchor, section_md + "\n" + anchor, 1)

    # Fallback: append
    return doc_text.rstrip() + "\n\n" + section_md


def main() -> int:
    ap = argparse.ArgumentParser(description="Inject auto-generated desk-research preflight notes into audit docs.")
    ap.add_argument("--audits-dir", required=True, help="Directory containing per-store audit md files.")
    ap.add_argument("--store-slug-map", required=True, help="JSON mapping display name -> slug (file stem).")
    ap.add_argument("--targets", action="append", default=[], help="Format: <batch>:<path>")
    ap.add_argument("--rollups", action="append", default=[], help="Format: <batch>:<path> (store rollup CSV)")
    ap.add_argument("--summaries", action="append", default=[], help="Format: <batch>:<path> (per-page summary CSV)")
    ap.add_argument("--write-priority-md", required=False, help="Optional: write a pre-audit priority markdown here.")
    args = ap.parse_args()

    audits_dir = Path(args.audits_dir)
    slug_map = json.loads(Path(args.store_slug_map).read_text("utf-8"))

    def parse_pairs(pairs: list[str]) -> list[tuple[str, Path]]:
        out: list[tuple[str, Path]] = []
        for x in pairs:
            if ":" not in x:
                raise SystemExit(f"Expected <batch>:<path>, got: {x}")
            b, p = x.split(":", 1)
            out.append((b.strip(), Path(p.strip())))
        return out

    targets_files = parse_pairs(args.targets)
    rollups = parse_pairs(args.rollups)
    summaries = parse_pairs(args.summaries)

    norm_to_storekeys, store_signals, store_blocked, store_targets = build_store_index(
        rollups=rollups,
        summaries=summaries,
        targets_files=targets_files,
    )

    batches_list = []
    for b, p in targets_files:
        batches_list.append(f"{b}: targets `{p}`")
    for b, p in rollups:
        batches_list.append(f"{b}: rollup `{p}`")
    for b, p in summaries:
        batches_list.append(f"{b}: summary `{p}`")

    # Write docs
    updated = 0
    for display_name, slug in slug_map.items():
        path = audits_dir / f"{slug}.md"
        if not path.exists():
            continue
        store_key = resolve_store_key(norm_to_storekeys, display_name)

        extra: list[str] = []
        counts = store_blocked.get(store_key or "", {"pages": 0, "blocked_pages": 0})
        if counts.get("pages", 0) and counts.get("blocked_pages", 0) >= max(1, counts["pages"] // 2):
            extra.append("High bot protection observed in snapshots — plan to do this audit fully manual and mark `blocked=true` if needed.")

        section = format_preflight_section(
            display_name=display_name,
            store_key=store_key,
            batches=batches_list,
            store_targets=store_targets,
            store_signals=store_signals,
            store_blocked=store_blocked,
            extra_notes=extra,
        )
        before = path.read_text("utf-8", errors="replace")
        after = upsert_preflight(before, section)
        if after != before:
            path.write_text(after, encoding="utf-8")
            updated += 1

    # Optional: priority report
    if args.write_priority_md:
        out_md = Path(args.write_priority_md)
        lines: list[str] = []
        lines.append("# Pre-audit Priority (reachability-first)")
        lines.append("")
        lines.append("This table is computed from the latest HTML snapshots. High blocked rates mean “manual-only”.")
        lines.append("")
        lines.append("| store | blocked_pages | pages | blocked_pct | recommendation |")
        lines.append("|---|---:|---:|---:|---|")
        rows = []
        for display_name, slug in slug_map.items():
            store_key = resolve_store_key(norm_to_storekeys, display_name) or display_name
            c = store_blocked.get(store_key, {"pages": 0, "blocked_pages": 0})
            pages = c.get("pages", 0)
            blocked_pages = c.get("blocked_pages", 0)
            pct = int(round((blocked_pages / max(1, pages)) * 100)) if pages else 0
            if pages == 0:
                rec = "no snapshot data"
            elif pct >= 50:
                rec = "manual-only (expect bot protection)"
            else:
                rec = "good candidate for next manual audit"
            rows.append((pct, display_name, blocked_pages, pages, rec))
        for pct, name, blocked_pages, pages, rec in sorted(rows, key=lambda x: (x[0], x[1].lower())):
            lines.append(f"| {name} | {blocked_pages} | {pages} | {pct}% | {rec} |")
        out_md.parent.mkdir(parents=True, exist_ok=True)
        out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote: {out_md}")

    print(f"Updated {updated} audit docs in {audits_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
