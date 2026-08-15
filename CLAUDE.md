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

GitHub Actions (`.github/workflows/`) auto-deploys the entire root directory to GitHub Pages on every push to `main`. Custom domain: `www.arkaflow.co` (set via `CNAME`). No build step — what's in the repo is what gets served.

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

`window.SITE_ACTIVE_PAGE()` (in `site-menu.js`) resolves which menu item renders active, and both `header.js` and `footer.js` call it. It matches `window.location.pathname`'s last segment against `item.href` in `SITE_MENU_ITEMS`, with two aliases: `case-study.html` maps to `results.html`, and anything under `/blog/` maps to `blog.html`.

**Case Work is currently hidden from navigation.** `results.html` and `case-study.html` are still live, still deployed, and still in `sitemap.xml` — they're just not linked from the header, footer, or any page CTA. The `case-study.html` → `results.html` alias is deliberately kept so the section works if restored. To bring it back, re-add `{ href: "results.html", label: "Case Work" }` to `SITE_MENU_ITEMS`.

### Link paths in injected components

`header.js` and `footer.js` emit **root-absolute** hrefs (`/our-flow.html`, `/assets/...`). This is required because blog posts live in the `/blog/` subdirectory — relative hrefs would resolve to `/blog/our-flow.html` there. `SITE_MENU_ITEMS` stores bare filenames; the components prefix `/` when rendering. This means the site must be served from a domain root (it is, via `CNAME`), so serve locally from the repo root, not a subpath.

### Blog

Split across two layers, deliberately different from the case studies:

- `blog-posts.js` — `window.BLOG_POSTS` + `window.BLOG_POST_ORDER` (newest first). **Card metadata only**, no body content.
- `blog.js` renders the index grid on `blog.html` from that data, reusing the `.case-featured` / `.case-card` shells.
- Each post is a **static file** at `blog/<slug>.html` with its prose inline in the HTML — unlike case studies, post bodies are not client-rendered, so crawlers get real content and each post carries its own title, description, canonical, OG tags, and `BlogPosting` JSON-LD.

Post pages reuse the case-study article shell (`.case-article`, `.case-article__wrap`, `.cs-nav`) plus a small `.post-*` layer at the end of `styles.css` for prose links, bold/italic, and the featured-card kicker.

**Adding a post:** create `blog/<slug>.html` (copy an existing one), add the slug to `BLOG_POST_ORDER` and its metadata object to `BLOG_POSTS`, then add the URL to `sitemap.xml`, `llms.txt`, and the `ItemList` JSON-LD in `blog.html`.

### Case studies data layer

All case study content lives in `case-studies.js` as two globals:
- `window.CASE_STUDIES` — keyed object of case study data
- `window.CASE_STUDY_ORDER` — array of slugs controlling display order

`results.html` uses `case-work.js` to render the grid from this data. `case-study.html` uses `case-study.js` to render a single study, reading `?slug=` from the URL query string.

### Theme system

Only `"light"` and `"dark"` are valid theme values. `"system"` preference and anything unrecognised both resolve to `"dark"`. Stored in `localStorage` under the key `arka-theme`. The public API is `window.ArkaTheme.bind()` and `window.ArkaTheme.apply(pref)`.

### Contact form

Submits to `formsubmit.co` via AJAX (no backend). The endpoint is hardcoded in `contact-form.js`. Includes a honeypot field (`name="_gotcha"`) for spam filtering.

## Key conventions

- **Adding a page:** create the HTML file, add an entry to `window.SITE_MENU_ITEMS` in `site-menu.js`, and include the standard script block at the bottom of `<body>`.
- **Adding a case study:** add the slug to `CASE_STUDY_ORDER` and the full object to `CASE_STUDIES` in `case-studies.js`. No other files need changing.
- **`verify-icons.html` / `verify-icons-ai.html`** are developer utility pages for checking icon assets — not part of the public site.
- Service names must stay consistent between `index.html` and `our-flow.html`: ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.
