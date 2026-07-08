# docs/publications/

One directory per paper, each containing the paper's PDF and a `cite.bib` file.

Naming convention:

- **Working papers (unpublished):** `0_LastName_ShortTitle/` — the `0` prefix means unpublished
- **Published papers:** `YYYY_LastName_ShortTitle/` — year prefix
- `ShortTitle` = first 2–3 significant title words, no spaces (e.g., `ImportantFinding`)

When a working paper is published, rename its directory from `0_...` to `YYYY_...`
and update the matching `pdfPath`/`bibPath` entries in `data/`. The
`/update-site-data` skill automates this.

The placeholder directories here contain `cite.bib` files only; drop each paper's
PDF into its directory using the filename referenced by `pdfPath` in `data/`.
