# Data File Schemas

Schemas and examples for every file under `data/`. Optional fields are marked; each file is rendered by the matching `js/*.js` module.

> **Note:** These schemas describe the template as shipped. If the site has been redesigned (via `/setup-site` or manually), the live `data/*.json` files and `js/*.js` renderers are the ground truth. When they diverge from this file, follow the code and update this file to match.

## data/profile.json — name, bio, links

Object. Rendered by `js/profile.js` (also sets the page title, nav name, and footer).

```json
{
  "name": "Dr. Jane Placeholder",
  "title": "Assistant Professor of Something Interesting",
  "affiliation": "University of Somewhere",
  "photoPath": "./assets/images/headshot.svg",
  "bio": [
    "First paragraph of the bio.",
    "Second paragraph of the bio."
  ],
  "links": [
    { "label": "Google Scholar", "url": "https://scholar.google.com/..." },
    { "label": "Email", "url": "mailto:jane@example.edu" }
  ]
}
```

- `bio` is an array of paragraphs.
- Optional: `photoPath` (omit to render without a photo).

## data/publications.json — published papers

Array, ordered by year (newest first). Rendered by `js/publications.js`.

```json
{
  "title": "A very important finding about an interesting phenomenon",
  "authors": "Jane Placeholder, Collaborator One, Collaborator Two",
  "publication": "Journal of Important Findings",
  "year": "2025",
  "url": "https://doi.org/10.0000/example.2025",
  "pdfPath": "./docs/publications/2025_Placeholder_ImportantFinding/2025_Placeholder_ImportantFinding.pdf",
  "bibPath": "./docs/publications/2025_Placeholder_ImportantFinding/cite.bib"
}
```

- `year` is a string. `url` is the canonical DOI/publisher link.
- Optional: `pdfPath`, `bibPath` (links only render when present).
- Shared-first-authorship is marked with `†` after author names.

## data/working_papers.json — preprints / under review

Array, newest first. Rendered by `js/working_papers.js`.

```json
{
  "title": "A new preprint that is currently under review",
  "authors": "Jane Placeholder, Collaborator Three",
  "url": "https://doi.org/10.48550/arXiv.0000.00000",
  "id": "modal_placeholder_preprint",
  "pdfPath": "./docs/publications/0_Placeholder_NewPreprint/0_Placeholder_NewPreprint.pdf",
  "bibPath": "./docs/publications/0_Placeholder_NewPreprint/cite.bib"
}
```

- `id` is a unique identifier: `modal_[lowercase_short_identifier]` (author name + key title word).
- Optional: `pdfPath`, `bibPath`, `publication` (status note, e.g. `"Under review at Journal X"`).

## data/news.json — news items

Array of year groups, newest year first; items within a year are newest first. Rendered by `js/news.js`.

```json
{
  "year": "2026",
  "items": [
    {
      "type": "Preprint",
      "htmltext": "New preprint: <a href='https://doi.org/...' target='_blank'>Paper Title</a>."
    }
  ]
}
```

- `type` is one of: `Publication`, `Preprint`, `Talk`, `Award`, `Media`, `Tool`, `General`.
- `htmltext` conventions: single-quoted HTML attributes; links as `<a href='URL' target='_blank'>`; `<em>` for venues; `<code>` for software names. 1–2 sentences, professional tone, emojis only for big milestones.
- Per-type patterns:
  - Publication: `Our paper <a>Title</a> was published in <em>Journal</em>.`
  - Preprint: just the linked title: `New preprint: <a>Title</a>.`
  - Talk: `Gave an invited talk at <a>Event</a>...` or `...accepted for a poster/talk at <a>Conf</a>.`
  - Award: `Honored to receive [award] from <a>Org</a>.`
  - Media: `<a>Outlet</a> covered our paper <a>Title</a>.`
  - Tool: `Created <a><code>name</code></a> — description.`

## data/talks.json — talks and presentations

Array, newest first. Rendered by `js/talks.js`.

```json
{
  "title": "A very important finding about an interesting phenomenon",
  "location": "Workshop on Interesting Things, University of Somewhere",
  "date": "2026",
  "link": "https://example.edu"
}
```

- `date` is a year string (a fuller date like `"March 2026"` also works).
- Optional: `link` (title renders as plain text without it).

## data/software.json — software and tools

Array. Rendered by `js/software.js`.

```json
{
  "title": "example-package",
  "description": "A Python package that does something useful from the command line.",
  "href": "https://github.com/username/example-package"
}
```

## data/ongoing_projects.json — ongoing projects

Array. Rendered by `js/ongoing_projects.js`.

```json
{
  "title": "A large ongoing research project",
  "description": "A multi-year effort to understand an important phenomenon."
}
```

## data/teaching.json — courses taught

Array, newest first. Rendered by `js/teaching.js`.

```json
{
  "title": "Introduction to Interesting Things",
  "role": "Instructor",
  "institution": "University of Somewhere",
  "term": "Spring 2026",
  "description": "An undergraduate introduction to the field."
}
```

- Optional: `description`.

## docs/publications/ directory convention

Each paper has a directory under `docs/publications/` containing its PDF and a `cite.bib`:

- **Working papers (unpublished):** `0_LastName_ShortTitle/` (the `0` prefix means unpublished)
- **Published papers:** `YYYY_LastName_ShortTitle/` (year prefix)
- `ShortTitle` = first 2–3 significant title words, no spaces (e.g., `ImportantFinding`)
