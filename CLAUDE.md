# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build tooling. Serve the root directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Open via `http://localhost:8080` — file:// URLs break some scripts due to CORS/origin checks.

## Deployment

GitHub Actions (`.github/workflows/`) auto-deploys the entire root directory to GitHub Pages on every push to `main`. Custom domain: `www.dheesystems.com` (set via `CNAME`). No build step — what's in the repo is what gets served.

## Architecture

### Component injection pattern

There is no framework. Shared UI (header, footer) is injected via JavaScript into placeholder elements:

```html
<header class="nav" data-component="site-header"></header>
<footer class="site-footer" data-component="site-footer"></footer>
```

`header.js` and `footer.js` query for `[data-component]` and write innerHTML. **Script load order on every page is strict:**

```html
<script src="site-menu.js"></script>   <!-- must be first: sets window.SITE_MENU_ITEMS -->
<script src="theme.js"></script>
<script src="header.js"></script>      <!-- reads SITE_MENU_ITEMS, injects nav -->
<script src="nav.js"></script>         <!-- binds mobile toggle after header injects DOM -->
<script src="footer.js"></script>      <!-- reads SITE_MENU_ITEMS, injects footer -->
<!-- page-specific scripts last -->
```

`theme-init.js` is a `<script>` in `<head>` (before CSS) to prevent flash of unstyled theme. All other scripts are at the bottom of `<body>`.

### Navigation active state

Active nav link is determined by matching `window.location.pathname`'s last segment against `item.href` in `SITE_MENU_ITEMS`. `case-study.html` is treated as an alias for `results.html` so the Case Work nav item stays active on individual case study pages.

### Case studies data layer

All case study content lives in `case-studies.js` as two globals:
- `window.CASE_STUDIES` — keyed object of case study data
- `window.CASE_STUDY_ORDER` — array of slugs controlling display order

`results.html` uses `case-work.js` to render the grid from this data. `case-study.html` uses `case-study.js` to render a single study, reading `?slug=` from the URL query string.

### Theme system

Only `"light"` and `"dark"` are valid theme values. `"system"` preference and anything unrecognised both resolve to `"light"`. Stored in `localStorage` under the key `dheesystems-theme`. The public API is `window.DheeSystemsTheme.bind()` and `window.DheeSystemsTheme.apply(pref)`.

### Contact form

Submits to `formsubmit.co` via AJAX (no backend). The endpoint is hardcoded in `contact-form.js`. Includes a honeypot field (`name="_gotcha"`) for spam filtering.

## Key conventions

- **Adding a page:** create the HTML file, add an entry to `window.SITE_MENU_ITEMS` in `site-menu.js`, and include the standard script block at the bottom of `<body>`.
- **Adding a case study:** add the slug to `CASE_STUDY_ORDER` and the full object to `CASE_STUDIES` in `case-studies.js`. No other files need changing.
- **`verify-icons.html` / `verify-icons-ai.html`** are developer utility pages for checking icon assets — not part of the public site.
- Service names must stay consistent between `index.html` and `our-flow.html`: ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.
