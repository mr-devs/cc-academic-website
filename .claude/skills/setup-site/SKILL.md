---
name: setup-site
description: Designs and builds the academic website from design references the user provides — reference URLs, pasted screenshots/images, or free-form design notes. Use for the initial setup of this template, a full redesign, or significant restyling. Restyles the existing JSON-driven template rather than generating a site from scratch.
argument-hint: [reference URL | pasted images | design notes]
---

# Set Up the Site

You are an expert frontend developer and UI/UX designer specializing in clean, modern, responsive websites for academics and researchers. Your task is to transform this template into the user's personal site, guided by design references they like.

## Input

$ARGUMENTS

The user may provide, in any combination:

- **Reference URLs** — sites whose design they want to emulate
- **Images/screenshots** — pasted or as file paths; read them with the Read tool
- **Free-form notes** — bullet points about colors, layout, vibe, features

If nothing was provided, ask for at least one reference or a description of the look they want before designing.

## Hard constraints (never violate)

1. **JSON-driven content.** All content renders from `data/*.json` files. Never hardcode publications, news, bio text, etc. into HTML. You may restructure *how* the JS renders the data, but the data must stay in `data/`.
2. **Schema sync.** If you change any `data/*.json` schema or `js/*.js` renderer, update `.claude/skills/update-site-data/references/schemas.md` to match in the same session.
3. **Responsive.** The site must work on mobile, tablet, and desktop. Test narrow viewports.
4. **Academic essentials.** Keep high readability, elegant typography, and prominent links to PDFs, Google Scholar, and institutional profiles.
5. **No build step.** Vanilla HTML/CSS/JS only, deployable to GitHub Pages as-is (unless the user explicitly asks for a framework).
6. **Graceful degradation.** Sections with missing/empty data files must hide, not error (preserve the `Site.load` pattern in `js/utils.js`).

## Process

### Step 1: Analyze the references

- For each URL: use WebFetch to study its structure and content hierarchy.
- For each image: read it and note layout, typography, spacing, palette, and distinctive elements.
- Distill a short design brief: palette (with hex values), type choices, layout (single vs. multi-page, sidebar vs. top-nav), density, and any signature elements.

### Step 2: Confirm the design direction

Use AskUserQuestion to resolve what the references don't settle — e.g., accent color, light/dark preference, single-page vs. multi-page, which sections to keep or drop (the template ships with: about, news, publications, working papers, projects, talks, software, teaching). Present your design brief and get sign-off before writing code.

### Step 3: Collect real profile content

Ask for the user's actual details to replace the placeholder data: name, title, affiliation, bio, links (Scholar, GitHub, CV, email), and a headshot image if they have one (save to `assets/images/`). Update `data/profile.json`. Offer to also replace the placeholder papers/news now or leave that for `/update-site-data` later.

### Step 4: Implement

- Read the `frontend-design` skill for aesthetic guidance before writing CSS.
- Restyle `css/styles.css` and restructure `index.html` / `js/*.js` as needed to realize the design brief.
- Dropping a section = remove its `<section>`, its `<script>` tag, and its nav link (keep the data file; it's harmless).
- Adding a section = new data file + new `js/` module following the `Site.load` pattern + section markup + schema documented in schemas.md.

### Step 5: Verify

Run `/preview-site` to serve the site and verify every section renders from its JSON, at desktop and mobile widths. Fix anything broken before finishing.

### Step 6: Hand off

End with a short recap:

1. What changed (design summary).
2. How to update content going forward: edit `data/*.json` directly or run `/update-site-data` (e.g., paste an arXiv URL to add a preprint).
3. How to preview locally (`/preview-site`) and deploy (push to GitHub, enable Pages).
