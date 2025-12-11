# Repo Cleanup Guide (to avoid mixing unrelated changes)

1) Snapshot current state
- `git status -sb` to review tracked/untracked files.
- Optional: `git diff --stat` to see scope.

2) Stash or commit unrelated deletions/changes
- If you want to keep them: `git add -A` those specific paths, then `git commit -m "chore: keep client feedback assets"` (or stash with `git stash push -m "feedback files"`).
- If you want to drop them: `git checkout -- <path>` for tracked files, or `rm -rf <path>` then `git checkout -- <path>` for deletions, or `git clean -fd <path>` for untracked items (be careful).

3) Stage only the SEO/Perf work
- Suggested paths to add: `app/index.html`, `app/src/**/*`, `docs/**/*`, `public/feeds/merchant-free.tsv`, `scripts/run-psi.sh`, `app/.gitignore`.
- Use `git add <file>` selectively; avoid `git add -A` until unrelated changes are handled.

4) Validate before commit
- `npm run build` (workspace app) if feasible.
- Optional: `npm run lint` (may still flag pre-existing issues).

5) Commit
- `git commit -m "feat: seo + perf improvements and merchant feed"`

6) Post-cleanup
- Re-run `git status` to ensure only expected changes remain.
- If stashed, reapply unrelated changes later with `git stash pop` in a separate branch.
