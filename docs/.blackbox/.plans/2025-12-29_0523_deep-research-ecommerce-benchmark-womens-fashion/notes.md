# Notes / Revisions

- `.blackbox` workflow used:
  - Seed list maintained in `artifact-seeds/store-seeds.txt`
  - Snapshots created with:
    - `python3 docs/.blackbox/scripts/research/snapshot_urls.py --input <seeds> --out-dir <snapshots> --stable-names`
  - Automated scan created with:
    - `python3 docs/.blackbox/scripts/research/summarize_store_snapshots.py --seeds <seeds> --snapshots-dir <snapshots> --out-csv <csv> --out-md <md>`
- Some major retailers block bot snapshotting; treat “missing/blocked” as a signal to do manual browser audits for those.
