# Academic Website Template

**A bare-bones academic website that [Claude Code](https://claude.com/claude-code) builds *with* you — and keeps updated *for* you.**

This template ships deliberately unstyled. Instead of fighting someone else's design, you show Claude Code a site you like (a link, a screenshot, a few notes) and it restyles the template to match. From then on, maintenance is a conversation: paste an arXiv link and your new preprint appears, formatted and in the right place. Deploys to GitHub Pages for free — no build step, no framework, no config.

## Features

- **Bare bones by design** — clean, semantic HTML/CSS/JS meant to be reshaped into *your* site, not a theme to work around.
- **Built from your references** — the included `/setup-site` [skill](https://agentskills.io/home) turns links, screenshots, or descriptions of sites you like into a design tailored to you.
- **Easy to update over time** — publications, news, talks, etc. each live in a `data/*.json` file; the page renders from them automatically. Update the file (or just tell Claude Code what changed) and the site follows.
- **No build step** — vanilla HTML/CSS/JS, deploys to GitHub Pages as-is.

## Quick start

**First, make this repository your own:**

1. **Get a copy of this repo**: sign in to [GitHub](https://github.com) (create a free account if needed), then on this repository's page click the green **"Use this template"** button (top right) → **"Create a new repository"**. Name it `<your-github-username>.github.io` (e.g., `janedoe.github.io`) — that exact name makes GitHub host your site at that address for free.
2. **Clone your copy** to your computer:

   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   ```

3. **Install Claude Code**: follow the [install instructions](https://code.claude.com/docs/en/overview), then launch it from inside your cloned folder:

   ```bash
   cd <your-username>.github.io
   claude
   ```

4. **Let Claude do the rest** — continue with the steps below. When you want your changes to go live, ask Claude to commit and push them.

**Then, inside Claude Code:**

1. Run **`/setup-site`** and give it links or screenshots of sites whose design you like, plus any notes. Claude will restyle the template to match, swap in your real name/bio/links, and verify the result.
2. Preview any time with **`/preview-site`**, or manually:

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

## Need a CV too?

The site links to your CV (see `data/profile.json`) — if you don't have one ready, check out [mrd-cv-template](https://github.com/mr-devs/mrd-cv-template), a simple LaTeX/Overleaf academic CV template, also powered by Claude Code. After it is built, drop the PDF into `docs/cv.pdf`.

## Found this useful?

If you use this template I would appreciate it if you let me know. You can contact me directly ([matthewdeverna.com](https://www.matthewdeverna.com)) or create an issue in this repository. Thanks!!
