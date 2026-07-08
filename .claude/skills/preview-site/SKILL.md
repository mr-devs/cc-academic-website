---
name: preview-site
description: Serves the academic website locally and verifies it renders correctly — all JSON data files parse and every section renders from its data. Use to preview the site, check changes after editing data or design files, or debug a section that isn't showing up.
---

# Preview the Site

Serve the site locally and verify it works. The site renders all content client-side from `data/*.json`, so a malformed JSON file **silently hides its entire section** — always validate the data files, not just the page load.

## Steps

### Step 1: Validate the data files

```bash
for f in data/*.json; do python3 -m json.tool "$f" > /dev/null && echo "OK $f" || echo "FAIL $f"; done
```

Fix any failures before continuing (a trailing comma is the usual culprit).

### Step 2: Serve

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Run in the background (pick another port if 8000 is busy). Tell the user the URL: `http://127.0.0.1:8000/`.

### Step 3: Verify the rendered page

If a headless browser is available (e.g., a Playwright-cached Chromium under `~/Library/Caches/ms-playwright/`), dump the rendered DOM and check that each section with data is populated and not `hidden`:

```bash
<chrome-headless-shell> --headless --disable-gpu --dump-dom --virtual-time-budget=3000 http://127.0.0.1:8000/
```

Otherwise, ask the user to open the URL and check the page (and the browser console for fetch errors).

### Step 4: Report

Tell the user the URL, what was verified, and any sections that failed to render (with the offending file). Leave the server running for them unless they say otherwise.

## Debugging a hidden section

1. Its JSON failed to parse → Step 1 catches this.
2. Its JSON is an empty array/object → the section hides by design.
3. The page was opened via `file://` instead of the local server → `fetch` fails; must use HTTP.
4. Renderer error → check the browser console; the JS module for each section lives in `js/`.
