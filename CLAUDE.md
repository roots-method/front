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
<script src="megamenu.js"></script>    <!-- binds the Solution dropdown, also post-inject -->
<script src="footer.js"></script>      <!-- reads SITE_MENU_ITEMS, injects footer -->
<!-- page-specific scripts last -->
```

`theme-init.js` is a `<script>` in `<head>` (before CSS) to prevent flash of unstyled theme. All other scripts are at the bottom of `<body>`.

### Navigation active state

`window.SITE_ACTIVE_PAGE()` (in `site-menu.js`) resolves which menu item renders active, and both `header.js` and `footer.js` call it. It matches `window.location.pathname`'s last segment against `item.href` in `SITE_MENU_ITEMS`, with two aliases: `case-study.html` maps to `results.html`, and anything under `/blog/` maps to `blog.html`.

### Solution mega-menu

`SITE_MENU_ITEMS` entries normally carry an `href`. The Solution entry instead
carries `menu: "solutions"` and no href — it is a dropdown trigger, not a link.
Its contents live in `window.SITE_SOLUTIONS` (also in `site-menu.js`): one entry
per solution with `label`, `href`, `icon` (a filename in
`assets/icons-ai-ibm/`), a one-line `summary` for the row, plus the `title`,
`description` and `cta` shown in the panel.

`header.js` renders it as a two-column panel — solution rows on the left, one
description panel per solution stacked in the same grid cell on the right.
`megamenu.js` swaps which panel is visible on hover/focus and owns the open
state. Below 860px the row list is hidden by CSS and the panels stack as an
accordion inside the burger menu, each labelled by `.megamenu__panel-kicker`.

`footer.js` has no dropdown, so it flattens the entry into its child links. They
are marked `noActive` because several currently share one destination and would
otherwise all light up as the active page.

Software points at `software.html` and Products at `products.html`. Support
still points at `contact.html` until it gets a page of its own — change `href`
in `SITE_SOLUTIONS` when it does.

Both `header.js` and `footer.js` refuse the active state to a solution whose
`href` is also a top-level menu entry's. Without that, every page a solution
merely borrows (the contact page, today) lights up two nav items at once.

**Case Work is currently hidden from navigation.** `results.html` and `case-study.html` are still live, still deployed, and still in `sitemap.xml` — they're just not linked from the header, footer, or any page CTA. The `case-study.html` → `results.html` alias is deliberately kept so the section works if restored. To bring it back, re-add `{ href: "results.html", label: "Case Work" }` to `SITE_MENU_ITEMS`.

### Link paths in injected components

`header.js` and `footer.js` emit **root-absolute** hrefs (`/our-flow.html`, `/assets/...`). This is required because blog posts live in the `/blog/` subdirectory — relative hrefs would resolve to `/blog/our-flow.html` there. `SITE_MENU_ITEMS` stores bare filenames; the components prefix `/` when rendering. This means the site must be served from a domain root (it is, via `CNAME`), so serve locally from the repo root, not a subpath.

### Home page and the Software page

`index.html` is the umbrella: hero, the three solution pillars, Industries
served, testimonials, Trusted by, CTA.

The hero is one centred column (`.hero--centered`) over `.hero-nodes`, an
inline-SVG node network that drifts behind it at 0.6 opacity — nodes breathe,
and a short dash travels along each edge. It is masked with a radial gradient
so it fades out behind the copy; without that the edges cut through the
headline, worst in light theme where the accent is a dark cobalt. The node
coordinates deliberately avoid the middle band for the same reason.

Its headline runs the braced word through a typewriter loop
(`type-cycle.js`, driven by `data-type-cycle` on the span). Two details there
are deliberate and easy to undo by accident:

- **The typed word's width is reserved, and measured rather than set in `ch`.**
  Centred text would slide sideways on every keystroke without a fixed width,
  and a `ch` is the width of `0` — wider than lowercase in most faces, which
  leaves a permanent gap before the closing brace. It measures after
  `document.fonts.ready` (the fallback face has different metrics) and re-measures
  on resize (the headline is `clamp()`-sized).
- **Backspacing stops at the prefix the next word shares.** `defacto` rewinds to
  `defa` and types forward into `default`, so the braces never sit empty.
- **The animated span is `aria-hidden`**, with a `.sr-only` sibling carrying the
  word. Without it a screen reader re-reads the headline on every keystroke. The pillars (`.solution-pillars` / `.pillar-card`)
mirror `SITE_SOLUTIONS` one-for-one but are **static markup**, not rendered from
it — crawlers need to read them. If you change the mega-menu copy, change these
too; nothing keeps them in sync.

`software.html` holds what used to be the rest of the home page — The Problems,
How We Work, the four-stage process, Why Arka, Built on, CTA — under its own
two-column hero carrying the illustration that used to sit on home. Those sections live in exactly one place now; do not copy
them back onto the home page.

### Decorative SVG art

The three big drawings — the home hero's node network, the About orbits, the Our
Flow fan — live in `assets/art/*.svg` and are pulled in at runtime by
`svg-inline.js`, which finds `<div data-svg="/assets/art/name.svg">` and injects
the file's markup into it.

**They are injected, not `<img src>`, and that is not incidental.** Each one
paints with `currentColor` so it follows `--accent` through the theme toggle,
and each is animated by rules in `styles.css` (`.hero-nodes__pulse`,
`.flow-art__line`, `.about-art__orbit`…). Inside an `<img>`, `currentColor`
resolves against the SVG's own root and comes out black, and a stylesheet cannot
reach into a referenced document, so none of the animations would run. Swapping
to `<img>` silently breaks both.

The wrappers reserve height only while the fetch is in flight
(`.about-art:not(.is-loaded)`); `svg-inline.js` adds `.is-loaded` on injection.
Do not constrain the loaded wrapper with `aspect-ratio`/`max-height` — that
clips the art.

Small repeated icons stay out of this. The FAQ chevrons and the nav chevron are
CSS masks over `assets/icons-ai-ibm/chevron--right.svg`, rotated per state,
which costs no extra request. The two theme-toggle icons stay inline in
`header.js` — they are ~200 bytes each, they live in JS rather than HTML, and
that file is cached once for the whole site.

### The Products page

`products.html` is the Arka ONE page. Two things on it are worth knowing:

- The three product blocks reuse `.solution-pillars` / `.pillar` from the home
  page, so the site states its "three things" one way everywhere. The third has
  no destination yet and is a plain `div` rather than an `<a>`, carrying
  `.pillar--soon` and a `.pillar__badge`.
- "How we work" uses `.process-split`, the sticky split-scroll: the steps column
  scrolls while the visual column stays pinned, and `process-split.js` swaps the
  panel to match the step in view. It pairs
  `.process-split__step[data-step="N"]` with
  `.process-visual__panel[data-panel="N"]` — the numbers must match or nothing
  swaps. Below 860px there is nothing to be sticky against, so CSS shows every
  panel in order after the steps instead of one that would swap off-screen.

`process-split.js` was `home.js`; the home page no longer has a `.process-split`
so the script was inert there.

Headline emphasis: `.accent` draws an absolutely positioned underline anchored
to the element's box, so on a phrase that wraps it lands under the last line
only. Use `.accent--alt` (colour, no underline) for anything multi-line.

### Cache busting

Every local `<script src>` and the stylesheet carry a `?v=N` query string, and
**all of them share one number**. Bump it in every HTML file whenever you edit
any CSS or JS:

```bash
grep -rl '?v=' --include='*.html' . | xargs sed -i '' 's/?v=23"/?v=24"/g'
```

This is not optional polish. `site-menu.js` and `header.js` carry the nav's data
and markup, so a stale copy silently serves the old menu — that is how the
Software link kept pointing at the contact page after it had its own page.

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
