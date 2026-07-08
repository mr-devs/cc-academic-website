# Academic Website Template

A template for personal academic websites, designed to be built out and maintained with [Claude Code](https://claude.com/claude-code).

- **JSON-driven content** — publications, news, talks, etc. live in `data/*.json`; the HTML never needs editing to update content.
- **No build step** — vanilla HTML/CSS/JS, deploys to GitHub Pages as-is.
- **Claude Code skills included** — `.claude/skills/` ships with workflows that design the site from references you like and keep its content up to date (paste an arXiv URL, get a formatted entry).

## Quick start

1. **Use this template** (or clone it) and open the folder in Claude Code.
2. Run **`/setup-site`** and give it links or screenshots of sites whose design you like, plus any notes. Claude will restyle the template to match, swap in your real name/bio/links, and verify the result.
3. Preview any time with **`/preview-site`**, or manually:

   ```bash
   python3 -m http.server 8000
   # open http://127.0.0.1:8000/
   ```

   (Opening `index.html` directly via `file://` won't work — the site fetches its JSON over HTTP.)

## Updating content

Run **`/update-site-data`** and describe the change — for example:

- Paste an arXiv/OSF/SSRN URL or a BibTeX entry to add a working paper.
- "Our cascade paper was published in *Nature*" to convert a working paper to published (renames its `docs/publications/` directory, moves the JSON entry, updates the BibTeX).
- "Add a news item about my invited talk at X."

Or edit the `data/*.json` files by hand — schemas are documented in
[`.claude/skills/update-site-data/references/schemas.md`](.claude/skills/update-site-data/references/schemas.md).

**Example: moving a paper from "Working Paper" to "Published" by hand**

1. Move its entry from `data/working_papers.json` to the top of `data/publications.json`, adding `publication` (venue) and `year` fields.
2. Rename its directory `docs/publications/0_LastName_ShortTitle/` → `docs/publications/YYYY_LastName_ShortTitle/` and update the entry's `pdfPath`/`bibPath` to match.
3. Validate (`python3 -m json.tool data/publications.json`) and preview.

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. In the repo settings, enable **Pages** → deploy from the `main` branch, root folder.
3. Your site appears at `https://<username>.github.io/<repo>/` (or name the repo `<username>.github.io` to serve at the root).

## Project structure

```
index.html            # page skeleton; sections are filled from data/
css/styles.css        # minimal default styling (restyled by /setup-site)
js/                   # one renderer per section + shared utils.js
data/                 # all site content, one JSON file per section
docs/publications/    # one directory per paper: PDF + cite.bib
assets/images/        # headshot and other images
.claude/skills/       # setup-site, update-site-data, preview-site
CLAUDE.md             # conventions Claude Code follows in this repo
```
