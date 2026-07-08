# Academic Website Template

A JSON-driven personal academic website: vanilla HTML/CSS/JS, no build step, deployable to GitHub Pages as-is.

## Architecture (the one rule that matters)

**Content lives in `data/*.json`, never in HTML.** Each section of `index.html` is rendered client-side by a matching `js/*.js` module via the `Site.load` helper in `js/utils.js`. A section whose data file is missing, empty, or malformed hides itself silently.

| Section | Data file | Renderer |
| --- | --- | --- |
| About/profile | `data/profile.json` | `js/profile.js` |
| News | `data/news.json` | `js/news.js` |
| Publications | `data/publications.json` | `js/publications.js` |
| Working papers | `data/working_papers.json` | `js/working_papers.js` |
| Ongoing projects | `data/ongoing_projects.json` | `js/ongoing_projects.js` |
| Talks | `data/talks.json` | `js/talks.js` |
| Software | `data/software.json` | `js/software.js` |
| Teaching | `data/teaching.json` | `js/teaching.js` |

Schemas are documented in `.claude/skills/update-site-data/references/schemas.md`. If you change a schema or renderer, update that file in the same session.

## Conventions

- Entries in data files go newest-first; match each file's existing indentation.
- Local paths in data files use a `./` prefix (e.g., `./docs/publications/...`).
- Per-paper assets live in `docs/publications/0_LastName_ShortTitle/` (working papers) or `docs/publications/YYYY_LastName_ShortTitle/` (published), each with a `cite.bib` and the PDF.
- After editing any `data/*.json`, validate it: `python3 -m json.tool data/<file>.json`.

## Skills

- `/setup-site` — design/build the site from reference URLs, screenshots, or design notes (initial setup or redesign).
- `/update-site-data` — add/convert papers, news, talks, software, projects, teaching, or profile edits.
- `/preview-site` — validate data files, serve locally (`python3 -m http.server`), and verify sections render.

## Preview

`python3 -m http.server 8000` from the repo root, then open `http://127.0.0.1:8000/`. Opening `index.html` via `file://` will NOT work — `fetch` needs HTTP.
