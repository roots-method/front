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
<script src="header.js"></script>      <!-- reads SITE_MENU_ITEMS, injects nav -->
<script src="nav.js"></script>         <!-- binds mobile toggle after header injects DOM -->
<script src="footer.js"></script>      <!-- reads SITE_MENU_ITEMS, injects footer -->
<!-- page-specific scripts last -->
```

All scripts are at the bottom of `<body>`. (On `main` there is also a
`theme-init.js` in `<head>`; this branch has no theme system, so it is gone.)

### Navigation active state

`window.SITE_ACTIVE_PAGE()` (in `site-menu.js`) resolves which menu item renders active, and both `header.js` and `footer.js` call it. It matches `window.location.pathname`'s last segment against `item.href` in `SITE_MENU_ITEMS`, with two aliases: `case-study.html` maps to `results.html`, and anything under `/blog/` maps to `blog.html`.

### Logo

`assets/arkaflow-newlogo.svg` is the mark: the asterisk, drawn in `#0b2545`,
ink navy.
It is used by the header lockup (`.brand__mark` beside `.brand__name`), the
footer, the favicon and the CTA watermark, so recolouring the file moves all
four at once.

The colour is chosen against the **button**, not just the background. Every
plausible candidate clears the 3:1 contrast floor easily, so legibility does not
decide it; what decides it is that the mark must not read as the same blue as
the primary CTA. `#0b2545` is 15.0:1 on the page and 1.82:1 away from the button
cobalt — near enough to belong to the family, far enough that the mark anchors
and the button acts. A lighter cobalt like `#233b7a` sits only 1.26:1 from the
button and the two blur into one another.

Flat, not a gradient, on purpose: at favicon size a gradient averages to a flat
colour anyway, it cannot be driven by `currentColor` or a CSS mask if theming
ever returns, and one-colour reproduction needs a flat version regardless.

**That reference carries a `?v=` like the scripts do.** Image assets had no
cache key, so recolouring the file left returning visitors on the old ochre
mark. Bump it with everything else.

**Do not put a double hyphen in that file's comment.** `--` is illegal inside an
XML comment; it makes the SVG malformed and the browser renders a broken-image
icon rather than failing loudly. Writing `(--accent)` in a note there is exactly
how that happened once.

`assets/arka-wordmark.svg` is the striped lowercase wordmark — lowercase "arka"
cut from eight horizontal bands, on the IBM construction. It is **not currently
referenced anywhere**; it was briefly the header mark and was reverted. Kept
because it works as a secondary device. Two things in it are deliberate: the `a`
is double-storey (a single-storey one is indistinguishable from an `o` with the
curves gone — the first version read "orko"), and `k` spans all eight bands
while `a` and `r` take the bottom five. It stops being legible below about 24px,
where the gaps fall under one physical pixel.

### Menu data

`window.SITE_MENU_ITEMS` in `site-menu.js` is the whole nav. Both `header.js`
and `footer.js` render straight from it — there is no dropdown, and the three
solutions sit directly in the bar.

An entry may carry `noActive: true`. Support and Contact both point at
`contact.html`, and without the flag both would light up as the current page at
once; the flag keeps that to one. Anything else that ends up sharing a
destination needs the same treatment.

`header.js` drops the `index.html` entry — the brand mark is the link home — so
the bar reads Software, Products, Support, About, Contact. The footer keeps
Home and lists all six.

There was a Solution mega-menu here until the nav was flattened; `megamenu.js`,
`window.SITE_SOLUTIONS` and the `.megamenu*` layer went with it. The home page's
three pillars are now the only place that copy lives.

### Link paths in injected components

`header.js` and `footer.js` emit **root-absolute** hrefs (`/our-flow.html`, `/assets/...`). This is required because blog posts live in the `/blog/` subdirectory — relative hrefs would resolve to `/blog/our-flow.html` there. `SITE_MENU_ITEMS` stores bare filenames; the components prefix `/` when rendering. This means the site must be served from a domain root (it is, via `CNAME`), so serve locally from the repo root, not a subpath.

### Home page and the Software page

`index.html` is the umbrella: hero, the three solution pillars, Industries
served, testimonials, Trusted by, CTA.

The hero is one centred column (`.hero--centered`) over `.hero-nodes`, an
inline-SVG node network that drifts behind it at 0.6 opacity — nodes breathe,
and a short dash travels along each edge. It is masked with a radial gradient
so it fades out behind the copy; without that the edges cut through the
headline. The node coordinates deliberately avoid the middle band for the same
reason.

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
  word. Without it a screen reader re-reads the headline on every keystroke.

The pillars (`.solution-pillars` / `.pillar`) are **static markup**, and since the mega-menu was removed they are the only
place that copy lives. The nav labels in `SITE_MENU_ITEMS` need to keep agreeing
with them; nothing enforces it.

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
paints with `currentColor` so it picks up `--accent` from the page, and each is
animated by rules in `styles.css` (`.hero-nodes__pulse`,
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
which costs no extra request.

### The Products page

`products.html` is the Arka ONE page. Its hero is two columns: the headline
names the three Cs and `.threec` lists them under it, with
`assets/art/products-grid.svg` beside it.

`.threec` deliberately does **not** use `type-cycle.js`. Typing through words
this long left the headline showing a mid-word fragment most of the time, and
one loop ran about 11 seconds. All three words now stay readable and the only
motion is the accent walking between them — no reflow, nothing incomplete. The
stagger uses `:nth-of-type(3)` / `(5)` because the separators are spans too.

That drawing is the one place the cobalt/ochre system does not hold. It is drawn
from a supplied reference in a **violet** family, kept in `--viz-*` variables so
it still flips with the theme (violet is unreadable on ink at full saturation).
Those variables exist only for this drawing — do not reach for them elsewhere or
the site gains a third accent by accident.

Two traps inside that SVG:

- Each diamond is **two nested groups**: the inner one carries `translate()` and
  `rotate(45)` as an attribute, the outer one is what CSS animates. A CSS
  `transform` on the same element replaces the attribute, collapsing every
  diamond onto the origin, unrotated.
- The ring nodes alternate with their centre dots, so the stagger uses
  `:nth-child(3)` / `(5)`. `:nth-of-type` counts every `circle` in the group,
  dots included, and matches nothing.

`type-cycle.js` reserves the field width by default, which is right for the home
hero (centred, with a closing brace after the word). Where the caret would be the
last thing on a line, that reservation strands it to the right of the text —
pass `data-type-cycle-reserve="none"` there. Only the home page uses the script
now.

Two more things on the page are worth knowing:

- The three product blocks reuse `.solution-pillars` / `.pillar` from the home
  page, so the site states its "three things" one way everywhere. The third has
  no destination yet and is a plain `div` rather than an `<a>`, carrying
  `.pillar--soon` and a `.pillar__badge`.
- "How we work" uses `.process-split`, the sticky split-scroll: the steps column
  scrolls while the right half is a full-height screen pinned to the viewport,
  and `process-split.js` swaps the panel to match the step in view. It pairs
  `.process-split__step[data-step="N"]` with
  `.process-visual__panel[data-panel="N"]` — the numbers must match or nothing
  swaps. Below 860px there is nothing to be sticky against, so CSS shows every
  panel in order after the steps instead of one that would swap off-screen.

  Three details there are load-bearing:

  - **The screen bleeds to the browser edge** with a negative `margin-right` of
    `--bleed`, computed from `--maxw` and `--shell-gutter`. That variable exists
    so `.site-shell` and this calculation cannot drift apart; change the gutter
    in one place only.
  - **`.process-split` uses `overflow-x: clip`, never `hidden`.** `hidden` would
    make it a scroll container and the sticky child would stop sticking. `clip`
    also allows `overflow-y` to stay visible, which `hidden` does not.
  - **Each step is `min-height: 78vh`.** The pinned screen needs scroll runway;
    with short copy and no minimum, all three stages fly past in one flick.

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
grep -rl '?v=' --include='*.html' . | xargs sed -i '' 's/?v=31"/?v=32"/g'
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

### Palette (PROTOTYPE BRANCH — light only)

**This branch has no theme system.** `theme.js`, `theme-init.js`, the header
toggle and every `[data-theme="dark"]` rule are gone, along with the
`arka-theme` localStorage key and `window.ArkaTheme`. `main` still has all of
it; this branch exists to see the light-only direction.

The palette is three families plus one neutral ramp, all at the top of
`styles.css`:

- **cobalt** `#0047ab` — identity and wayfinding: eyebrows, links, borders,
  buttons, ticks.
- **tint** `#7aa5e8` — cobalt's quiet half: soft fills, hover washes.
- **ochre** `#8c5810` — evidence, **numbers only**. Keeping it off labels and
  controls is what preserves the hierarchy.
- **`--n-0` … `--n-900`** — the neutral ramp. Near-white to near-black in one
  hue, even steps.

**Reach for a ramp step; do not invent a grey.** That rule is the whole point of
this branch. Before it, every hairline and muted label was a hand-rolled
`rgba(18, 33, 58, 0.14)`, which is why adding one colour always meant inventing
four more — the thing that made the palette feel inextensible was never the
theme, it was the missing ramp.

The semantic tokens (`--bg`, `--fg`, `--line`, `--muted`…) are what the rest of
the stylesheet reads. They now point at ramp steps, so re-pointing that one
block moves the whole site.

The background is `--n-25` (`#fcfcfd`), not `#ffffff`, on purpose: pure white is
the most common background on the web and reads as a default rather than a
choice. `--n-0` stays available for anything that needs to sit above the page.

The Products composition's violet is the one deliberate exception, and it is
still confined to `--viz-*`.

**Primary buttons** rest at cobalt, so hover can no longer signal by turning
cobalt the way it used to. Instead `.btn--primary::after` is an overlay ring in
`--accent-soft` that wipes in left to right on hover and focus. It is an overlay
rather than the button's own border because a real border cannot be revealed
along one axis; `clip-path: inset(0 100% 0 0)` animating to `0` does exactly
that, and reverses itself when the pointer leaves. `inset: -1px` sits it over
the 1px transparent ring `.btn` already reserves, so nothing shifts. Ghost
buttons are untouched — the tint is too light on a pale surface to read as a
border, and their cobalt hover already works.

### Contact form

Submits to `formsubmit.co` via AJAX (no backend). The endpoint is hardcoded in `contact-form.js`. Includes a honeypot field (`name="_gotcha"`) for spam filtering.

## Key conventions

- **Adding a page:** create the HTML file, add an entry to `window.SITE_MENU_ITEMS` in `site-menu.js`, and include the standard script block at the bottom of `<body>`.
- **Adding a case study:** add the slug to `CASE_STUDY_ORDER` and the full object to `CASE_STUDIES` in `case-studies.js`. No other files need changing.
- **`verify-icons.html` / `verify-icons-ai.html`** are developer utility pages for checking icon assets — not part of the public site.
- Service names must stay consistent between `index.html` and `our-flow.html`: ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.
