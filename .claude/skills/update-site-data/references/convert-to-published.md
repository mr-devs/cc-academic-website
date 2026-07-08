# Convert a Working Paper to Published

Convert an existing working paper to a published paper. See [schemas.md](schemas.md) for the `data/working_papers.json` and `data/publications.json` schemas and the directory naming convention (`0_LastName_ShortTitle/` → `YEAR_LastName_ShortTitle/`) — and remember to check the live JSON files first, since the schemas may have evolved.

The input can be:

1. **URL** (DOI/journal link) — fetch publication metadata
2. **BibTeX entry** — parse directly, all publication info available
3. **Free-form text** — extract what's provided, ask for missing info

## Steps

### Step 1: Detect Input Type

- If input starts with `http` or contains `doi.org`, journal domains → treat as URL
- If input contains `@article{`, `@inproceedings{`, etc. → treat as BibTeX
- Otherwise → treat as free-form text

### Step 2: Gather Publication Information

**If URL:**

1. Use WebFetch to scrape the publication page
2. Extract: title, authors, journal/venue name, year, DOI, volume, issue, pages
3. If any required fields are missing, ask the user

**If BibTeX:**

1. Parse the BibTeX entry
2. Extract all fields: title, authors, journal, year, volume, number, pages, DOI/URL
3. Use the BibTeX directly for updating cite.bib

**If Free-form:**

1. Extract any provided information
2. Use AskUserQuestion to gather missing required fields:
   - Journal/venue name (required)
   - Publication year (required)
   - DOI URL (required)

### Step 3: Match to Existing Working Paper

1. Read `data/working_papers.json`
2. Match by title similarity (case-insensitive, ignore punctuation differences)
3. If no match found or multiple matches, use AskUserQuestion to let user select which working paper to convert

### Step 4: Rename Directory

Rename from `0_LastName_ShortTitle/` to `YEAR_LastName_ShortTitle/`:

```bash
mv docs/publications/0_LastName_ShortTitle docs/publications/YEAR_LastName_ShortTitle
```

Also rename the PDF inside if its filename contains the `0_` prefix, so `pdfPath` stays consistent.

### Step 5: Update BibTeX File

Update `cite.bib` with publication information.

**For journal articles, use @article:**

```bibtex
@article{AuthorYearKeyword,
  author = {Last1, First1 and Last2, First2 and Last3, First3},
  title = {Full Paper Title},
  journal = {Journal Name},
  volume = {X},
  number = {Y},
  pages = {1--10},
  year = {YYYY},
  url = {https://doi.org/XX.XXXX/XXXXXXXX}
}
```

**For conference papers, use @inproceedings:**

Mandatory fields:

- `author` - The name(s) of the paper's author(s)
- `title` - The specific title of the paper
- `booktitle` - The title of the conference proceedings (e.g., "Proceedings of the 2026 International Conference on Robotics")
- `year` - The year the proceedings were published or the conference took place

```bibtex
@inproceedings{AuthorYearKeyword,
  author = {Last1, First1 and Last2, First2},
  title = {Full Paper Title},
  booktitle = {Proceedings of the Conference Name},
  year = {YYYY},
  pages = {1--10},
  url = {https://doi.org/XX.XXXX/XXXXXXXX}
}
```

Write to: `docs/publications/YEAR_LastName_ShortTitle/cite.bib`

### Step 6: Update Data Files

Show the drafted changes to the user for approval before writing.

**Remove from working_papers.json:**

1. Read `data/working_papers.json`
2. Remove the matching entry
3. Write the updated JSON back

**Add to publications.json:**

1. Read `data/publications.json` (match its actual schema and indentation)
2. Add new entry at the appropriate position (sorted by year, newest first)
3. Use the published-paper schema from [schemas.md](schemas.md), with `pdfPath`/`bibPath` pointing at the renamed `YEAR_LastName_ShortTitle/` directory
4. Write the updated JSON back
5. Validate both files: `python3 -m json.tool data/working_papers.json data/publications.json`

### Step 7: Provide Summary to User

Provide a clear summary with:

**Completed:**

- Entry removed from `data/working_papers.json`
- Entry added to `data/publications.json`
- Directory renamed: `0_LastName_ShortTitle/` → `YEAR_LastName_ShortTitle/`
- BibTeX file updated with publication details

**Manual steps needed:**

1. **Update PDF**: Replace the preprint PDF with the published version at:
   `docs/publications/YEAR_LastName_ShortTitle/[filename].pdf`
2. **Verify BibTeX**: Review `cite.bib` and add any missing fields (volume, pages, etc.)
3. **Verify DOI**: Test that the DOI link works correctly
4. **Preview**: Run `/preview-site` to verify the paper appears correctly in the publications section

**Publication details:**

- Title: [paper title]
- Authors: [authors]
- Journal: [journal/venue name]
- Year: [year]
- DOI: [DOI URL]

Then offer to add a matching `Publication` news item (see [add-news-item.md](add-news-item.md)).
