# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Next.js 16 (App Router) + React 19 + TypeScript. No CSS framework.

```bash
npm install
npm run dev
```

`npm run build` runs the production build and typecheck; run it before pushing —
Vercel runs the same thing and a type error fails the deploy.

**The npm cache on this machine has root-owned entries** and installs fail with
`EACCES` on `~/.npm/_cacache`. Fix it once with
`sudo chown -R $(id -u):$(id -g) ~/.npm`, or pass `--cache <dir>` to npm.

## Deployment

Vercel, from the connected GitHub repository. No build configuration is needed —
Next.js is detected, and the app is at the repo root. Custom domain
`www.arkaflow.co` (the `CNAME` file at the root is a leftover from GitHub Pages
and is not what Vercel reads).

`.github/workflows/deploy.yml` still deploys the *old* static site to GitHub
Pages on every push to `main`. That workflow and this app both claim the same
domain — **the cutover is a deliberate step, not something a merge should do by
accident.** Delete or disable the workflow at the same time the domain moves to
Vercel.

## The `legacy/` directory

The complete vanilla-JS site this app was ported from: 11 HTML pages, 16 scripts
and the original single `styles.css`. It is the reference for anything not yet
ported and the record of what a page used to do. It is **not** served — nothing
in the app imports from it, and it should be deleted once the port is signed off.

## Architecture

### Layout and shared chrome

`app/layout.tsx` is the shell: fonts, site-wide metadata, the Organization and
WebSite JSON-LD, then `<SiteHeader />`, the page, `<SiteFooter />`, and the two
overlays (`<PrivacyModal />`, `<CookieConsent />`) outside `.site-shell`.

The old build injected the header and footer with `innerHTML` from `header.js`
and `footer.js`, which forced a strict script order on every page. That whole
mechanism is gone — the components render on the server.

### Menu data

`lib/site.ts` holds `SITE_MENU_ITEMS` and everything else the chrome needs
(contact email, booking URL, social links). Both header and footer render
straight from it.

Hrefs are now **route paths** (`/software`), not filenames. An entry may carry
`noActive: true`: Support and Contact both point at `/contact`, and without the
flag both would light up as the current page at once. Anything else sharing a
destination needs the same treatment.

`isActive()` resolves the active entry from `usePathname()`, with two aliases
kept from the old build: `/case-study` maps to `/results`, and anything under
`/blog/` maps to `/blog`.

`SiteHeader` drops the `/` entry — the brand mark is the link home — so the bar
reads Software, Products, Support, About, Contact. The footer keeps Home and
lists all six. Case Work, Our Flow and Blog are currently **not linked** from
either; those routes are still built and still in the sitemap. Restoring one is
a matter of adding its entry back.

### URLs and redirects

Routes dropped their `.html`: `/software.html` → `/software`. `next.config.ts`
issues permanent redirects for every old path, including `/blog/:slug.html`, so
indexed links keep resolving.

The one exception is case studies. They stay at `/case-study?slug=<slug>`
rather than moving to `/case-study/<slug>`, because that is what is indexed and
what the sitemap has always pointed at. The cost is that the route is
server-rendered per request rather than statically generated — metadata is still
built on the server, so crawlers are unaffected. Moving to a path segment later
is a route rename plus a redirect.

### Logo

`assets/arkaflow-newlogo.svg` is the mark: the asterisk, now in `#0047ab`,
cobalt.

**The brand is cobalt end to end, and the gold is gone.** The mark was gold
(`#c97a0a`) for a long time, and the argument for it was that it was the one
colour on the page that could only be the logo. That argument died when the mark
left the header: once the bar was a cobalt wordmark alone, gold survived only in
a 16px favicon, where it read as a leftover rather than a signature. Do not
reintroduce it as "the logo colour" — there is no longer a place on the site it
would agree with.

The three surfaces the mark still touches, and how each gets its colour — they
do **not** move together, which is the trap:

- **Favicon** — the only one that reads this file's fill. Recolouring the SVG
  changes the favicon and nothing else.
- **Footer** (`.site-footer__logo`) — a CSS mask painting `--accent` at opacity
  0.25, so it reads blue-grey. The file's own fill never reaches it. It is
  masked rather than an `<img>` precisely so it can be coloured; dimming a gold
  `<img>` gives pale ochre, not blue-grey.
- **CTA watermark** — `filter: saturate(0) brightness(0)` at opacity 0.045, so
  it is a black ghost whatever the file says.

**The header and footer no longer show a lockup.** The bar is `.brand__name`
alone in `--accent`; `.brand__mark` and the hover spin are gone from the CSS —
do not write a rule for a class nothing emits. The header wordmark takes
`--accent` rather than `--fg` on purpose: it is the only brand element left in
the bar, so it carries the identity colour itself.

`--data` ochre (`#8c5810`) is still reserved for numbers, and is now unrelated
to anything in the logo.

Flat, not a gradient: at favicon size a gradient averages to a flat colour
anyway, it cannot be driven by `currentColor` or a CSS mask if theming ever
returns, and one-colour reproduction needs a flat version regardless.

**The file must stay transparent.** The footer mark is a CSS mask, and a mask
reads the image's *alpha*: give the SVG a full-canvas background rect and the
whole 32×32 box becomes opaque, so it paints as a solid cobalt square instead of
the asterisk. The same edit turns the CTA watermark into a black square and
flattens the favicon. A backgrounded variant belongs in its own file —
`assets/arkaflow-logo-bg.svg` is that file — never in this one. To check: draw
it to a canvas and measure opaque pixels; the mark is about 26% coverage, a
broken one reads 100%.

The mask URL lives in `styles/footer.css` and points at
`/assets/arkaflow-newlogo.svg` — root-absolute, because the stylesheet is bundled
to `/_next/static/css/` and a relative path would resolve from there. The old
build hung a `?v=` on it to defeat caching; if the mark is ever recoloured in
place, rename the file instead.

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

### Home page and the Software page

`app/page.tsx` is the umbrella: hero, the three solution pillars, Industries
served, testimonials, Trusted by, CTA.

The hero is one centred column (`.hero--centered`) over `.hero-cells`
(`assets/art/hero-cubes.svg`), a field of squares behind it at 0.6 opacity —
cells dim and brighten on staggered cycles, and a highlight sweeps across. It
is masked with a radial gradient so it fades out behind the copy; the artwork
*also* leaves the middle empty, because the mask alone still lets faint edges
sit under the headline.

Three things in that file are load-bearing:

- **`stroke-opacity` is set on the parent group, never on the rects.** It is an
  inherited property, which is what lets the shine layer be a `<use>` of the
  same geometry at a brighter value rather than a second copy of 257 rects.
  Setting it per-rect makes the `<use>` unable to override it and doubles the
  DOM to fix.
- **The sweep is SMIL (`<animate>` on a gradient), not a CSS mask.** CSS
  masking of an SVG `<g>` is uneven across browsers, and when it fails the
  shine layer renders at full strength permanently rather than degrading
  quietly. The cost is that `prefers-reduced-motion` cannot pause it, so the
  reduced-motion rule hides the layer instead.
- **No double hyphen in that file's comment**, the same trap as the logo: it is
  illegal inside an XML comment and silently breaks the file. Writing a token
  name with its leading dashes is exactly how that happened once.

`assets/art/hero-nodes.svg` and its `.hero-nodes*` rules are kept but no longer
referenced — it was the hero until the cell grid replaced it, and nothing else
supplies that look if it is wanted back.

Its headline runs the braced word through a typewriter loop
(`components/TypeCycle.tsx`). Two details there
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

`app/software/page.tsx` holds what used to be the rest of the home page — The Problems,
How We Work, the four-stage process, Why Arka, Built on, CTA — under its own
two-column hero carrying the illustration that used to sit on home. Those sections live in exactly one place now; do not copy
them back onto the home page.

### Decorative SVG art

The three big drawings — the home hero's cell grid, the About orbits, the Our
Flow fan — live in `public/assets/art/*.svg` and are inlined by the
`<InlineSvg>` server component, which reads the file and writes its markup into
the page.

**They are inlined, not `<img src>`, and that is not incidental.** Each one
paints with `currentColor` so it picks up `--accent` from the page, and each is
animated by rules in `styles/` (`.hero-nodes__pulse`, `.flow-art__line`,
`.about-art__orbit`…). Inside an `<img>`, `currentColor` resolves against the
SVG's own root and comes out black, and a stylesheet cannot reach into a
referenced document, so none of the animations would run. Swapping to `<img>`
silently breaks both.

The old build fetched these in the browser (`svg-inline.js`). Reading them on
the server removes that request waterfall and puts the art in the HTML, so it
survives with JS off. `InlineSvg` adds `.is-loaded` itself; the
`.about-art:not(.is-loaded)` height reservation therefore never applies in
practice, but it is harmless and left in place. Do not constrain the loaded
wrapper with `aspect-ratio`/`max-height` — that clips the art.

Small repeated icons stay out of this. The FAQ chevrons and the nav chevron are
CSS masks over `assets/icons-ai-ibm/chevron--right.svg`, rotated per state,
which costs no extra request.

### The Products page

`app/products/page.tsx` is the Arka ONE page. Its hero is two columns: the headline
names the three Cs and `.threec` lists them under it, with
`assets/art/products-grid.svg` beside it.

`.threec` deliberately does **not** use `TypeCycle`. Typing through words
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

`TypeCycle` reserves the field width by default, which is right for the home
hero (centred, with a closing brace after the word). Where the caret would be the
last thing on a line, that reservation strands it to the right of the text —
pass `reserve={false}` there. Only the home page uses it now.

Its `words` prop must come from module scope, not an inline array literal: a
fresh array each render is a new effect dependency, and the typing restarts.

Two more things on the page are worth knowing:

- The three product blocks reuse `.solution-pillars` / `.pillar` from the home
  page, so the site states its "three things" one way everywhere. The third has
  no destination yet and is a plain `div` rather than an `<a>`, carrying
  `.pillar--soon` and a `.pillar__badge`.
- "How we work" uses `.process-split`, the sticky split-scroll: the steps column
  scrolls while the right half is a full-height screen pinned to the viewport,
  and `components/ProcessSplit.tsx` swaps the panel to match the step in view.
  Steps and panels are paired **by array index**, so the old
  `data-step="N"` / `data-panel="N"` drift is no longer possible — but the two
  arrays still have to be the same length and in the same order. Below 860px there is nothing to be sticky against, so CSS shows every
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

Only `/products` uses it.

Headline emphasis: `.accent` draws an absolutely positioned underline anchored
to the element's box, so on a phrase that wraps it lands under the last line
only. Use `.accent--alt` (colour, no underline) for anything multi-line.

### Cache busting

**There is none to do, and the `?v=N` ritual is gone.** Next fingerprints the
CSS and JS it bundles, and the `?v=` query strings were stripped from every
`url()` in `styles/` during the port. Do not reintroduce them — a hand-managed
version number that has to be bumped in a dozen files is exactly the failure the
old build kept hitting.

Files served straight out of `public/` (the SVG art, icons, client logos) are
the one place without a content hash. They are effectively immutable; if one is
ever recoloured in place, rename it rather than adding a query string.

### Blog

Three layers, deliberately different from the case studies:

- `lib/blog-posts.ts` — `BLOG_POSTS` + `BLOG_POST_ORDER` (newest first). **Card
  metadata only**, no body content.
- `app/blog/page.tsx` renders the index grid from that data, reusing the
  `.case-featured` / `.case-card` shells.
- `content/blog/<slug>.json` holds each post's prose: a summary, the byline
  fields, and an ordered list of `{heading, html}` sections.
  `app/blog/[slug]/page.tsx` statically generates one page per slug from it and
  reads the content on the server, so crawlers get real HTML.

**The prose is HTML, not JSX, on purpose.** These are long editorial bodies with
inline `<em>`, `<strong>` and links in nearly every paragraph; transcribing them
into JSX would risk a silent typo per paragraph for no structural gain. The
page shell, the section nav and the metadata are React — only the prose is
content.

**A section's heading goes into the HTML string, not alongside it as a JSX
child.** `.case-article__section p + p` and `.check-list + p` are sibling
selectors, so wrapping the prose in an element to hold `dangerouslySetInnerHTML`
would change what they match. The whole section body is set as innerHTML for
exactly that reason.

**Adding a post:** create `content/blog/<slug>.json`, add the slug to
`BLOG_POST_ORDER` and its metadata to `BLOG_POSTS`, then add the URL to
`public/llms.txt`. `app/sitemap.ts` and the index's `ItemList` JSON-LD both
generate from the data, so neither needs touching.

### Case studies data layer

All case study content lives in `lib/case-studies.ts` as two exports:
`CASE_STUDIES` (keyed object) and `CASE_STUDY_ORDER` (slugs, controlling display
order). `app/results/page.tsx` renders the grid from it; `app/case-study/page.tsx`
renders one study, reading `?slug=` from `searchParams`.

Diagram paths inside the data are root-absolute into `public/` — the old file
stored them relative to the site root, which no longer resolves from a bundled
route.

### Stylesheets

The original single 5,788-line `styles.css` was split into 24 files under
`styles/`, one per area (`nav.css`, `hero.css`, `cards.css`, `footer.css`,
`process-split.css`…). Class names are untouched — still BEM, still exactly what
the old markup used — so the components read the same as the HTML they replaced.

**`styles/index.css` imports all 24 in the original file's order, and
`app/layout.tsx` imports only that.** The order is load-bearing: the old file
relied on later sections overriding earlier ones. Importing a stylesheet
directly from the component that uses it would let route-level bundling
reshuffle the cascade and change the design. Moving one out of the barrel is
safe only for a file nothing else overrides — check first.

`url()` paths are root-absolute (`/assets/...`). They must be: the bundled CSS
is served from `/_next/static/css/`, so a relative path resolves from there.

`--font` and `--font-heading` in `base.css` point at the `next/font` variables
(`--font-nunito`, `--font-barlow`) with the quoted family names kept behind them
as a fallback. The site's fonts are self-hosted by `next/font/google`, which
does not read `public/fonts/`.

**`public/fonts/` is still load-bearing, though — do not delete it.**
`public/assets/brochure.html` is a standalone print document that cannot use
`next/font`, so it declares its own `@font-face` rules against those `.ttf`
files. Removing them silently drops the brochure back to Helvetica.

### The brochure

`public/assets/brochure.html` is the editable source for
`public/assets/Arka-Brochure-1.pdf`: seven A4 pages, served at
`/assets/brochure.html`. To export, open it in Chrome, Cmd+P, A4, margins
"None", and tick **Background graphics** — without that every tinted panel and
both brand pages print white. **The PDF does not regenerate itself; it is stale
until someone exports it.**

It is deliberately standalone — no React, no `styles/`. Its palette is copied
from `base.css` and its fonts are `@font-face` rules over `public/fonts/`. That
duplication is the point: pinning a print document to the site stylesheet means
every CSS change silently reflows a document nobody re-checks. If the tokens
move, move these to match.

Its copy duplicates the site's, and nothing keeps them in sync — after a copy
change on Home, Software or Products, the brochure has to be updated by hand.

Two things to know before editing:

- **Pages are a fixed 297mm with `overflow: hidden`.** Content that grows past
  that is silently clipped rather than pushed to a new page, so check
  `scrollHeight` against `clientHeight` after adding anything. The cover and
  closing pages report an overflow that is *not* content: their watermark bleeds
  past the edge on purpose.
- **The logo is masked, not an `<img>`.** `.page-mark` and `.lockup__mark` paint
  white through `arkaflow-newlogo.svg`'s alpha, which is what puts a light mark
  on the cobalt ground. It read as an `<img>` with `mix-blend-mode: multiply`
  for a while, to work around that file having picked up an opaque background —
  see the logo section above. Keeping it a mask means a background creeping back
  into that file shows up immediately as a solid square.

### Palette (light only)

**There is no theme system.** No theme toggle, no `[data-theme="dark"]` rules,
no `arka-theme` storage key. This came from `palette-prototype`, which existed
to try the light-only direction; the React port inherited it.

The palette is three families plus one neutral ramp, all at the top of
`styles/base.css`:

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

`components/ContactForm.tsx` submits to `formsubmit.co` over AJAX — no backend,
and the endpoint is hardcoded there. The honeypot field (`name="_gotcha"`) is
what filters spam; keep it.

The form is `noValidate` so the browser's own messages appear only after a
submit attempt, not while typing.

## Key conventions

- **Adding a page:** create `app/<route>/page.tsx`, export a `metadata` object
  with a title, description and `alternates.canonical`, add the route to
  `SITE_MENU_ITEMS` in `lib/site.ts` if it belongs in the nav, and add it to
  `app/sitemap.ts`.
- **Adding a case study:** add the slug to `CASE_STUDY_ORDER` and the object to
  `CASE_STUDIES` in `lib/case-studies.ts`. Nothing else needs changing — the
  grid, the detail page and the sitemap all read from there.
- **Client components:** only the pieces that genuinely need the browser carry
  `"use client"` — the header (scroll + menu state), footer (active link),
  `TypeCycle`, `ProcessSplit`, `CaseNav`, `Faq`, `ContactForm`, `PrivacyModal`
  and `CookieConsent`. Everything else renders on the server. Adding
  `"use client"` to a page to fix one interaction sends the whole page's markup
  to the browser as JS; lift the interactive part into its own component
  instead.
- **The CTA panel is one component** (`components/CtaPanel.tsx`) with props for
  the eyebrow, heading, steps, primary label, secondary button and watermark.
  It was copy-pasted into six pages before; do not paste a seventh.
- Service names must stay consistent between `/software` and `/our-flow`:
  ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.
  Nothing enforces it.
