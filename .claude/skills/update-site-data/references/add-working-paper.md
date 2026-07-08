# Add a Working Paper

Add a new working paper (preprint) to the website. See [schemas.md](schemas.md) for the `data/working_papers.json` schema and the `docs/publications/` directory convention — and remember to check the live JSON file first, since the schema may have evolved.

The input can be:

1. **URL** (arXiv, OSF, SSRN, bioRxiv, etc.) — fetch and extract metadata
2. **BibTeX entry** — parse directly, no scraping needed
3. **Free-form text** — extract what's provided, ask for missing info

## Steps

### Step 1: Detect Input Type

- If input starts with `http` or contains `arxiv.org`, `osf.io`, `ssrn.com`, `biorxiv.org`, `medrxiv.org` → treat as URL
- If input contains `@article{`, `@misc{`, `@inproceedings{`, etc. → treat as BibTeX
- Otherwise → treat as free-form text

### Step 2: Gather Paper Information

**If URL:**

1. Use WebFetch to scrape the preprint page
2. Extract: title, authors, abstract (for reference), preprint ID/DOI, year
3. If any required fields are missing, ask the user

**If BibTeX:**

1. Parse the BibTeX entry
2. Extract: title, authors, year, URL (from `url`, `doi`, or `eprint` fields)
3. Use the BibTeX directly for the cite.bib file

**If Free-form:**

1. Extract any information provided (title, authors, URL)
2. Use AskUserQuestion to gather missing required fields:
   - Title (required)
   - Authors (required)
   - Preprint URL (required)

### Step 3: Generate Identifiers

1. Create directory name: `0_[FirstAuthorLastName]_[ShortTitle]`
   - ShortTitle: First 2-3 significant words from title, no spaces
2. Create the unique ID: `modal_[lowercase_short_identifier]`
   - Use author name + key word from title, e.g., `modal_smith_diffusion`

### Step 4: Create Directory Structure

```bash
mkdir -p docs/publications/0_LastName_ShortTitle/
```

### Step 5: Create/Save BibTeX File

- If BibTeX was provided: save it directly to `cite.bib`
- If scraped from URL: generate a BibTeX entry using this format

**BibTeX template for preprints (use this exact format):**

```bibtex
@misc{AuthorYearKeyword,
    title = {{Full Paper Title}},
    author = {Last1, First1 and Last2, First2 and Last3, First3},
    howpublished = {arXiv [Preprint]},
    year = {YYYY},
    url = {https://doi.org/10.48550/arXiv.XXXX.XXXXX}
}
```

**Important BibTeX notes:**

- Use double braces `{{...}}` around the title to preserve capitalization
- Always prefer the DOI URL format: `https://doi.org/10.48550/arXiv.XXXX.XXXXX`
- Use `howpublished = {arXiv [Preprint]}` for arXiv papers
- For other preprint servers, adjust howpublished accordingly (e.g., `OSF [Preprint]`, `SSRN [Preprint]`)

Write to: `docs/publications/0_LastName_ShortTitle/cite.bib`

### Step 6: Update working_papers.json

1. Read the current `data/working_papers.json` (match its actual schema and indentation)
2. Draft the new entry and show it to the user for approval
3. Add it at the beginning of the array and write the file
4. Validate: `python3 -m json.tool data/working_papers.json`

### Step 7: Provide Summary to User

Provide a clear summary with:

**Completed:**

- Entry added to `data/working_papers.json`
- Directory created: `docs/publications/0_LastName_ShortTitle/`
- BibTeX file created: `docs/publications/0_LastName_ShortTitle/cite.bib`

**Manual steps needed:**

1. **Download PDF**: Save the PDF to `docs/publications/0_LastName_ShortTitle/[filename].pdf`
   - Provide the exact path where the PDF should go
2. **Verify BibTeX**: Review and update `cite.bib` if needed
3. **Preview**: Run `/preview-site` to verify the paper appears correctly

**Paper details:**

- Title: [extracted title]
- Authors: [extracted authors]
- Link: [preprint URL]

Then offer to add a matching `Preprint` news item (see [add-news-item.md](add-news-item.md)).
