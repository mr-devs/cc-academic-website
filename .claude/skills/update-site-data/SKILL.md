---
name: update-site-data
description: Updates the data/*.json content files that drive the academic website — working papers, published papers, news items, talks, software, ongoing projects, teaching, and the profile/bio. Use when adding a preprint or paper, converting a working paper to published, or adding/editing news, talk, software, project, teaching, or profile entries.
argument-hint: [url | bibtex | free-form description of the update]
---

# Update Site Data

Manage all website content updates. Every page section is rendered from a JSON file under `data/`; this skill routes any content change to the right file and workflow.

## Input

$ARGUMENTS

If no input is provided or the content type is unclear, ask the user (with AskUserQuestion) which kind of update this is before proceeding.

## Ground truth: the code, not this skill

This site may have been redesigned since this skill was written. Before any edit:

1. Read the target `data/*.json` file to see the schema actually in use.
2. If a field's purpose is unclear, read the JS module that renders it (find it by grepping `js/` for the data filename or container id).
3. [references/schemas.md](references/schemas.md) documents the schemas as last recorded — if the live data/renderer has diverged from it, **trust the code**, follow the live schema, and offer to update schemas.md to match.

## Routing

| Request | Action |
| --- | --- |
| New preprint / working paper | Follow [references/add-working-paper.md](references/add-working-paper.md) |
| Working paper got published | Follow [references/convert-to-published.md](references/convert-to-published.md) |
| News item / announcement | Follow [references/add-news-item.md](references/add-news-item.md) |
| Talk, software, ongoing project, teaching entry, profile/bio change, or a direct edit (fixing a typo, updating a URL) | Handle inline — see below |

Read the routed reference file before acting; do not work from memory of its contents.

## Inline workflow (simple files and direct edits)

1. Read the relevant schema and example in [references/schemas.md](references/schemas.md).
2. Read the target `data/*.json` file (this is the ground truth — see above).
3. Gather any missing required fields from the user (AskUserQuestion for structured choices, plain questions otherwise).
4. Draft the entry and show it to the user for approval before writing.
5. Insert newest-first (top of the array, or top of the matching year group) unless the file is ordered otherwise.
6. Write the file.

## Conventions (all workflows)

- **Match the file's existing JSON indentation and key order** — read before writing.
- All local paths use a `./` prefix, e.g. `./docs/publications/...`.
- New entries go newest-first.
- Always show drafted entries/changes to the user before writing.
- After adding a working paper or converting one to published, offer to also add a matching news item (and a talks entry if a talk was mentioned) in the same session.
- Validate any file you touched: `python3 -m json.tool data/<file>.json`.

## After editing

Run `/preview-site` (or remind the user to preview locally) — the site renders these files client-side, so a malformed entry silently hides its entire section.
