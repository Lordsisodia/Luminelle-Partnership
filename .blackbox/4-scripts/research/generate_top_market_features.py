#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class FeatureRow:
    rank: int
    feature: str
    category: str
    target_user: str
    fastest_path: str
    thin_slice: str
    oss_accelerators: str
    competitor_proofs: str
    evidence_links: str
    source: str  # evidence-index | features-ranked


def norm_key(s: str) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    return s


def table_cell(s: str) -> str:
    s = (s or "").replace("\n", " ").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def parse_md_table_rows(md: str) -> list[list[str]]:
    """
    Extract markdown table rows as arrays of cells.
    Only supports pipe tables like:
    | a | b |
    |---|---|
    | 1 | 2 |
    """
    rows: list[list[str]] = []
    in_table = False
    for line in md.splitlines():
        if not line.strip():
            if in_table:
                break
            continue
        if line.strip().startswith("|") and line.strip().endswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not in_table:
                in_table = True
                continue  # header row
            # separator row
            if all(set(c) <= {"-", ":", " "} for c in cells):
                continue
            rows.append(cells)
        elif in_table:
            break
    return rows


def parse_evidence_index(path: Path) -> list[FeatureRow]:
    md = path.read_text("utf-8", errors="replace")
    rows = parse_md_table_rows(md)
    out: list[FeatureRow] = []

    # Expected headers:
    # Rank | Feature (short) | Target user | Best competitors (2–3) | Best OSS (1–2) | Fastest path | Evidence links
    for cells in rows:
        if len(cells) < 7:
            continue
        try:
            rank = int(re.sub(r"[^0-9]", "", cells[0]) or "0")
        except ValueError:
            continue
        if rank <= 0:
            continue
        out.append(
            FeatureRow(
                rank=rank,
                feature=cells[1],
                category="(see features-ranked)",
                target_user=cells[2],
                fastest_path=cells[5],
                thin_slice="(see features-ranked)",
                oss_accelerators=cells[4],
                competitor_proofs=cells[3],
                evidence_links=cells[6],
                source="evidence-index",
            )
        )
    return out


def parse_features_ranked(path: Path) -> list[FeatureRow]:
    md = path.read_text("utf-8", errors="replace")
    blocks = re.split(r"^###\s+", md, flags=re.MULTILINE)
    out: list[FeatureRow] = []

    for b in blocks[1:]:
        header, *rest = b.splitlines()
        body = "\n".join(rest).strip()

        m = re.match(r"(?P<num>[0-9]+)\)\s+(?P<name>.+)$", header.strip())
        if not m:
            continue

        rank = int(m.group("num"))
        feature = m.group("name").strip()

        def pick(pattern: str) -> str:
            mm = re.search(pattern, body, flags=re.MULTILINE)
            return (mm.group(1).strip() if mm else "")

        category = pick(r"^- Category:\s*(.+)$") or "TBD"
        target_user = pick(r"^- Target user:\s*(.+)$") or "TBD"
        fastest_path = pick(r"^- Fastest path:\s*(.+)$") or "TBD"
        thin_slice = pick(r"^- Thin slice \(1–3 days\):\s*(.+)$") or pick(r"^- Thin slice \(1-3 days\):\s*(.+)$")
        if not thin_slice:
            thin_slice = "TBD"

        # OSS accelerators: collect bullet list under "OSS accelerators"
        oss_lines: list[str] = []
        in_oss = False
        for line in body.splitlines():
            if line.strip().startswith("- OSS accelerators"):
                in_oss = True
                continue
            if in_oss:
                if line.strip().startswith("- ") and ("plans/" in line or "http" in line):
                    oss_lines.append(line.strip().removeprefix("- ").strip())
                    continue
                # stop at next section-like bullet
                if line.strip().startswith("- Competitors proving demand") or line.strip().startswith("Scores"):
                    break
        oss = "; ".join(oss_lines)

        comp_lines: list[str] = []
        in_comp = False
        for line in body.splitlines():
            if line.strip().startswith("- Competitors proving demand"):
                in_comp = True
                continue
            if in_comp:
                if line.strip().startswith("- ") and ("plans/" in line or "http" in line):
                    comp_lines.append(line.strip().removeprefix("- ").strip())
                    continue
                if line.strip().startswith("Scores"):
                    break
        competitors = "; ".join(comp_lines)

        # Evidence links are usually embedded in those lists; keep a condensed union.
        evidence_links = "; ".join([x for x in (oss_lines + comp_lines) if x])

        out.append(
            FeatureRow(
                rank=rank,
                feature=feature,
                category=category,
                target_user=target_user,
                fastest_path=fastest_path,
                thin_slice=thin_slice,
                oss_accelerators=oss or "(none listed)",
                competitor_proofs=competitors or "(none listed)",
                evidence_links=evidence_links or "(see section)",
                source="features-ranked",
            )
        )
    return out


def find_fuzzy_match(key: str, options: list[str]) -> str | None:
    """
    Try to match 'feature flags staged rollouts' with
    'feature flags staged rollouts per tenant' and vice versa.
    """
    if not key:
        return None
    best: tuple[int, str] | None = None
    for o in options:
        if not o:
            continue
        if key == o:
            return o
        if key in o or o in key:
            score = min(len(key), len(o))
            if best is None or score > best[0]:
                best = (score, o)
    return best[1] if best else None


def write_md(out_path: Path, rows: list[FeatureRow]) -> None:
    lines: list[str] = []
    lines.append("# Top 50 Market Features (Execution Map)")
    lines.append("")
    lines.append("Purpose: a deduped, build-ready list of the **top 50 features/primitives** we see in the market,")
    lines.append("mapped to: target user, fastest path, thin slice, OSS accelerators, and evidence links.")
    lines.append("")
    lines.append("How to use:")
    lines.append("- Start with ranks 1–10 and decide build vs integrate.")
    lines.append("- Use the OSS links to find “cool code” fast.")
    lines.append("- Use evidence links to audit claims without hunting.")
    lines.append("")
    lines.append("| Rank | Feature | Category | Target user | Fastest path | Thin slice (1–3 days) | OSS | Competitors | Evidence |")
    lines.append("|---:|---|---|---|---|---|---|---|---|")
    for r in rows:
        lines.append(
            "| "
            + " | ".join(
                [
                    str(r.rank),
                    table_cell(r.feature),
                    table_cell(r.category),
                    table_cell(r.target_user),
                    table_cell(r.fastest_path),
                    table_cell(r.thin_slice),
                    table_cell(r.oss_accelerators),
                    table_cell(r.competitor_proofs),
                    table_cell(r.evidence_links),
                ]
            )
            + " |"
        )
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_csv(out_path: Path, rows: list[FeatureRow]) -> None:
    with out_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(
            f,
            fieldnames=[
                "rank",
                "feature",
                "category",
                "target_user",
                "fastest_path",
                "thin_slice",
                "oss_accelerators",
                "competitor_proofs",
                "evidence_links",
                "source",
            ],
        )
        w.writeheader()
        for r in rows:
            w.writerow(
                {
                    "rank": r.rank,
                    "feature": r.feature,
                    "category": r.category,
                    "target_user": r.target_user,
                    "fastest_path": r.fastest_path,
                    "thin_slice": r.thin_slice,
                    "oss_accelerators": r.oss_accelerators,
                    "competitor_proofs": r.competitor_proofs,
                    "evidence_links": r.evidence_links,
                    "source": r.source,
                }
            )


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a deduped Top-N market feature execution map (MD + CSV).")
    ap.add_argument("--synth-plan", required=True, help="Synthesis plan directory (contains artifacts/*).")
    ap.add_argument("--out-md", required=True, help="Write markdown output here.")
    ap.add_argument("--out-csv", required=True, help="Write CSV output here.")
    ap.add_argument("--top", type=int, default=50, help="Top N rows to output.")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    evidence_index = synth / "artifacts" / "evidence-index.md"
    features_ranked = synth / "artifacts" / "features-ranked.md"

    if not evidence_index.exists():
        raise SystemExit(f"Missing: {evidence_index}")
    if not features_ranked.exists():
        raise SystemExit(f"Missing: {features_ranked}")

    ev = parse_evidence_index(evidence_index)
    fr = parse_features_ranked(features_ranked)

    # Merge by normalized feature name; evidence-index wins for top crosswalk ordering,
    # but we prefer features-ranked fields when available (category, thin slice, etc.).
    by_key: dict[str, FeatureRow] = {}
    for r in fr:
        by_key[norm_key(r.feature)] = r
    fr_keys = list(by_key.keys())

    merged: list[FeatureRow] = []
    used_keys: set[str] = set()

    for r in sorted(ev, key=lambda x: x.rank):
        k = norm_key(r.feature)
        used_keys.add(k)
        match = k if k in by_key else find_fuzzy_match(k, fr_keys)
        if match and match in by_key:
            # Mark both the evidence-index key and the matched features-ranked key as used.
            # This prevents duplicates when the feature names differ slightly.
            used_keys.add(match)
            fr_r = by_key[match]
            merged.append(
                FeatureRow(
                    rank=r.rank,
                    feature=fr_r.feature,
                    category=fr_r.category or r.category,
                    target_user=fr_r.target_user or r.target_user,
                    fastest_path=fr_r.fastest_path or r.fastest_path,
                    thin_slice=fr_r.thin_slice or r.thin_slice,
                    oss_accelerators=fr_r.oss_accelerators or r.oss_accelerators,
                    competitor_proofs=fr_r.competitor_proofs or r.competitor_proofs,
                    evidence_links=r.evidence_links or fr_r.evidence_links,
                    source="evidence-index+features-ranked",
                )
            )
        else:
            merged.append(r)

    # Fill remaining slots from features-ranked (by rank) while avoiding duplicates.
    fill: list[FeatureRow] = []
    for r in sorted(fr, key=lambda x: x.rank):
        k = norm_key(r.feature)
        if k in used_keys:
            continue
        # Also skip if this key is a fuzzy match of any used key (avoid near-duplicates).
        if find_fuzzy_match(k, list(used_keys)):
            continue
        fill.append(r)
        used_keys.add(k)
        if len(merged) + len(fill) >= args.top:
            break

    out_rows = (merged + fill)[: args.top]
    # Re-rank to 1..N for output stability
    out_rows = [
        FeatureRow(
            rank=i,
            feature=r.feature,
            category=r.category,
            target_user=r.target_user,
            fastest_path=r.fastest_path,
            thin_slice=r.thin_slice,
            oss_accelerators=r.oss_accelerators,
            competitor_proofs=r.competitor_proofs,
            evidence_links=r.evidence_links,
            source=r.source,
        )
        for i, r in enumerate(out_rows, 1)
    ]

    out_md = Path(args.out_md)
    out_csv = Path(args.out_csv)
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_csv.parent.mkdir(parents=True, exist_ok=True)
    write_md(out_md, out_rows)
    write_csv(out_csv, out_rows)
    print(f"Wrote: {out_md}")
    print(f"Wrote: {out_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
