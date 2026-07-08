# Add a News Item

Add a news item to `data/news.json`. See [schemas.md](schemas.md) for the schema, the `htmltext` HTML conventions, and the per-type text patterns. If no details were provided, ask the user what to add. Check the live `data/news.json` first — match its actual structure and style.

## Types

Ask the user what type of update they would like to include, unless obvious or explicitly provided.
Here are the options:

- **Publication** — published paper
- **Preprint** — new preprint
- **Talk** — talk/poster/presentation
- **Award** — award, grant, fellowship, funding
- **Media** — media coverage
- **Tool** — released tool/package/dashboard
- **General** — everything else

### Requesting "update type" details

If you need the user to specify the "update type", ask them this question:

```markdown
Which of the below options are we adding today:
- **Publication** — published paper
- **Preprint** — new preprint
- **Talk** — talk/poster/presentation
- **Award** — award, grant, fellowship, funding
- **Media** — media coverage
- **Tool** — released tool/package/dashboard
- **General** — everything else
```

### Requesting the first draft of the "update text"

If you need the user to specify the "update text", ask them this question:

```markdown
What would you like the update to say?

Feel free to include links and emojis, I will make sure to convert everything into proper HTML.
```

Provide a few versions for them to choose from.
One of those versions should be an exact match, unless it is clear that the user is in a drafting phase.

## Process

1. Determine type (ask if unclear)
2. Draft the entry following the `htmltext` conventions and per-type patterns in [schemas.md](schemas.md); match the style of existing entries in the data file. Show the draft to the user for approval
3. Add to the **beginning** of the matching year's `items` array (create year if needed)
4. Write the JSON, matching the file's existing indentation, then validate: `python3 -m json.tool data/news.json`
