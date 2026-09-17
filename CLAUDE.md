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

Vercel, from the connected GitHub repository, serving `www.arkaflow.co`. No
build configuration is needed: Next.js is detected and the app is at the repo
root. The apex `arkaflow.co` sits on a Vercel A record and 308-redirects to
`www`.

**GitHub Pages is gone and should stay gone.** `.github/workflows/deploy.yml`
and the root `CNAME` file were both deleted at the cutover. It is worth knowing
what they did, because restoring either one breaks the site rather than adding a
fallback:

- The workflow uploaded `path: .`, the whole repo root, to Pages. That worked
  when the root was static HTML. The root is now Next.js source with no
  `index.html`, so a Pages deploy publishes a 404.
- The `CNAME` file is how a Pages site claims a custom domain, and GitHub only
  lets one Pages site hold a given domain. With Vercel already serving it, the
  file re-asserted a competing claim on every push.

The cutover went wrong once, and the failure is worth recognising: `www` briefly
carried **two** CNAME records, one to `roots-method.github.io` and one to
Vercel. Two CNAMEs at one name is invalid — a CNAME must be the only record at
its name — so resolvers picked between them and visitors landed on whichever
answered, both of which 404ed. If the site ever half-works depending on who is
asking, check for a duplicate record before looking at the app.

DNS that should exist, and nothing else:

- `www` CNAME to the project's `*.vercel-dns-*.com` target
- `arkaflow.co` A record to Vercel's anycast address

## The `legacy/` directory

The complete vanilla-JS site this app was ported from: 11 HTML pages, 16 scripts
and the original single `styles.css`. It is the reference for anything not yet
ported and the record of what a page used to do. It is **not** served — nothing
in the app imports from it.

**It is no longer tracked.** It was removed from the index with
`git rm -r --cached legacy/` and is listed in `.gitignore`, so it lives only on
whichever machine still has it. A fresh clone will not have it at all. That is
deliberate — it is a porting aid, not part of the deployed app — but it means:

- Do not tell someone to "look at `legacy/`" without checking they have it.
- Deleting it locally is the last copy on that machine. It survives in history
  up to the commit that untracked it, recoverable with
  `git show <commit>:legacy/<file>` or `git restore --source=<commit> legacy/`.

## Architecture

### Layout and shared chrome

`app/layout.tsx` is the shell: fonts, site-wide metadata, the Organization and
WebSite JSON-LD, then `<SiteHeader />`, the page, `<SiteFooter />`, and the two
overlays (`<PrivacyModal />`, `<CookieConsent />`) outside `.site-shell`.

The old build injected the header and footer with `innerHTML` from `header.js`
and `footer.js`, which forced a strict script order on every page. That whole
mechanism is gone — the components render on the server.

**The chrome navigates with plain `<a>`, not `next/link`.** Header links, footer
menu links, both brand marks and both CTA buttons are ordinary anchors, so every
menu click is a real document load. `next/link` was there first and worked, but
a soft transition swapped the page with no browser feedback of any kind — no
spinner, no tab throbber, nothing — and the site read as a single-page app
rather than a set of documents.

Know the cost before changing it back: an `<a>` does not prefetch, so the next
page starts downloading on click rather than on hover, and each navigation
re-downloads the shared chrome. Two things were checked and are fine — the
active-link highlight still resolves, because `usePathname()` is correct on a
fresh load just as it was on a transition; and dark mode does not flash, because
the inline script in `<head>` sets `data-theme` before first paint on every load.
That script is now load-bearing in a way it was not under client-side routing,
which never re-ran it.

**Page bodies still use `next/link`** — pillar cards, case and blog cards, CTA
panel buttons, the back links. Only the chrome was converted. If the whole site
should navigate the same way, those are the files left.

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

The logo is a mark only: a triad of three nodes joined by three tapered arcs, in
blue, khaki and grey. There is no drawn wordmark. Wherever the name appears
beside it, it is live text in Nunito Sans, in `--accent`.

The source is `public/assets/new-logo.svg` (with `new-logo.png`, the same
artwork at 3000px). **The site does not reference either file.** Everything it
uses is derived from them:

| File | Use |
|---|---|
| `arka-mark.svg` | Full colour. Anything roughly 64px and up; the CTA watermark. |
| `arka-mark-small.svg` | Small-size variant. Header, footer, SVG favicon. |
| `arka-mark-small-dark.svg` | The small variant with its blue node lifted, for header and footer in dark mode. |
| `arka-icon-32.png` | PNG favicon for browsers without SVG favicons. |
| `arka-apple-touch-icon.png` | 180px on an **opaque white tile** — iOS fills a transparent touch icon with black. |
| `arka-mark-512.png` | The `logo` in the Organization JSON-LD. |

Colours, sampled from both source files, which agree exactly: blue `#174896`,
khaki `#dbd5c4`, grey `#e5e5ec`. The small variant keeps the blue and deepens
khaki to `#bfb496` and grey to `#b3b3c8`.

**Why the source file is not used directly.** It is a Canva AI export and has
three faults for web use:

- **An opaque background.** Behind the mark is a 2000px RGB image with no alpha,
  near-white with faint noise. The CTA watermark flattens the logo to a black
  silhouette, so that background would render as a grey square; the header is
  translucent when scrolled, so it would show a white box.
- **Empty canvas.** The mark covers about 52 by 58 percent of a square canvas, so
  it would render tiny unless cropped.
- **Raster, and heavy.** Thirteen embedded PNGs plus provenance metadata, 345KB.

`arka-mark.svg` is a vector copy: its shapes were traced from an earlier export
of the same drawing and checked against `new-logo.svg` at 98.4 percent overlap
in the new colours, with exact circles for the nodes. It is about 3.6KB. If the
drawing itself ever changes, that check has to be redone; recolouring is not
enough.

**Why a small variant exists.** The khaki node is about 1.4:1 against the page
and the grey about 1.2:1, so at header height and favicon size they disappear
and the mark reads as a single blue dot. The small variant deepens only those
two, to 2:1, the lightest step where all three nodes survive at 16px. Logos are
exempt from WCAG contrast, so this is legibility, not compliance. Do not use the
small variant large or in print.

Where it appears:

- **Header** (`.brand__mark` + `.brand__name`) — the small mark at 30px beside
  "Arka" in Nunito Sans at 1.5em, cobalt. The mark is sized to about 1.8 times the
  name's cap height. The image's `alt` is empty because the link's `aria-label`
  already names it.
- **Footer** (`.site-footer__mark`) — the same pairing, mark at 32px.
- **Favicon** — `arka-mark-small.svg`, with the PNG fallback and touch icon, in
  `metadata.icons` in `app/layout.tsx`.
- **CTA watermark** — `arka-mark.svg`, flattened to a black ghost by
  `filter: saturate(0) brightness(0)` at 0.045 opacity, so its colours do not
  matter there.
- **Brochure** — none, by request.

The palette is unchanged by the logo. The site stays on cobalt `#0047ab`. The
mark's blue is its own `#174896`, a close neighbour rather than a match, and was
kept exactly as supplied.

Two rules for any SVG in this folder:

- **Keep the files transparent.** Anything that masks or silhouettes a logo reads
  its alpha; a full-canvas background turns it into a solid square.
- **No double hyphen inside an XML comment.** It is illegal there, makes the SVG
  malformed, and the browser shows a broken image instead of failing loudly.
  Writing a CSS token name with its leading dashes in a note is how that
  happened once.

Retired and unreferenced, left on disk: the cobalt asterisk
(`arkaflow-newlogo.svg`, `arkaflow-newlogo.png`, `arkaflow-logo-bg.svg`,
`new-logo-whitebg.png`, `light-logo-bg.png`) and `arka-wordmark.svg`, the
striped lowercase wordmark.

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

### Typography

**One family: Nunito Sans, for body and headings alike.** Barlow was the heading
face until it was dropped for consistency; nothing loads it any more, on the site
or in the brochure.

`--font` and `--font-heading` in `base.css` both point at the `next/font`
variable `--font-nunito`, with the quoted family name kept behind it as a
fallback. They are deliberately still two tokens: roughly fifty rules read
`--font-heading`, and keeping it separate means headings can take a different
face again by changing one line. The font is self-hosted by `next/font/google`
at weights 300 to 700, all of which headings use.

**Headings are tracked to -0.03em.** Nunito Sans is spaced for text sizes and
reads loose at heading sizes. The rule covers:

- every `h1` to `h6`, set in the `h1, h2, h3, h4, h5, h6` rule in `base.css`;
- display text in the heading face that is not a heading element, listed by
  class directly beneath it: the name beside the logo, stat and step numerals,
  and the large labels doing a heading's job.

Two exclusions, both deliberate. Small **uppercase labels** — eyebrows, pillar
labels, stage tags — keep their own spacing, several of them positive; tightening
small capitals crams them. And heading-face text **under about 20px** that is not
a heading, such as the 3 Cs line and the contact step numbers, stays at 0, where
negative tracking begins to cost legibility. When adding a display class, apply
the same test.

**The trap: descendants.** `base.css` resets `letter-spacing: 0` on *every*
element through `*`, on purpose, so tracking stays flat by default. The side
effect is that a heading's tracking never reaches the elements inside it: the
typed `{AI flow}`, an `<em>`, an `.accent` phrase would each sit at 0 while the
rest of the line is tightened. Before the change to Nunito Sans the hero's
`-0.02em` had exactly that bug. `:is(h1, h2, h3, h4, h5, h6) * { letter-spacing:
inherit; }` fixes it without removing the reset. Keep both rules together; a
per-rule `letter-spacing` on a heading class will also override the shared value,
which is why the hero's own `-0.02em` was deleted rather than updated.

A descendant inherits the heading's tracking as a *pixel* value, not in em, so a
span inside a heading set in a noticeably different size keeps the heading's
spacing rather than scaling its own. Nothing does that today.

**`public/fonts/` is still load-bearing — do not delete it.**
`public/assets/brochure.html` is a standalone print document that cannot use
`next/font`, so it declares its own `@font-face` against
`public/fonts/Nunito_Sans/`. Removing that folder silently drops the brochure to
Helvetica. `public/fonts/Barlow/` is no longer read by anything; it can go
whenever convenient.

### The brochure

`public/assets/brochure.html` is the editable source for
`public/assets/arka-technologies-brochure.pdf`: seven A4 pages, served at
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
  `scrollHeight` against `clientHeight` after adding anything. Every page should
  read zero.
- **The brochure carries no logo at all — only the "Arka Technologies"
  wordmark**, set as text on the cover and in the closing sign-off. The old
  asterisk was there twice and both were removed on request, before the current
  logo existed. If a logo goes back in, use `arka-mark.svg` (it is large here, so
  the full-colour file, not the small variant), and keep the file transparent —
  see the Logo section.
- **The contact lines are real links**, on the cover and the closing page.
  Chrome carries `href` into the exported PDF as a live annotation, so they are
  tappable in the file people are sent. Their colour is inherited, not set — a
  default link blue on the cobalt ground is close to invisible.

### Themes: light by default, dark on request

**Light is the default for every visitor, whatever their device prefers.** Dark
is opt-in through the "Dark mode" switch in the footer's legal row
(`components/ThemeToggle.tsx`), which sets `<html data-theme="dark">` and stores
`arka-theme` in localStorage. The site ran light-only for a long stretch (it came
from `palette-prototype`); dark mode was added back on top of the same tokens,
with a warm ground rather than the old navy.

How it hangs together:

- **No flash.** An inline script in `app/layout.tsx`'s `<head>` reads the stored
  choice and sets the attribute before first paint. It runs before React, so
  `<html>` carries `suppressHydrationWarning`. The storage key is written in two
  places, that script and `THEME_KEY` in `ThemeToggle.tsx`, and they must match.
- **The toggle** starts unpressed on the server, because the server cannot know
  the choice, and syncs to the attribute once mounted. It is a single toggle
  button with a fixed label and `aria-pressed`, not a label that flips between
  "Dark" and "Light". It follows changes made in other tabs.
- **Tokens do almost everything.** `:root[data-theme="dark"]` in `base.css`
  overrides only literal values. Anything written as `var(--n-*)` in `:root`
  (`--bg`, `--fg`, `--line`, `--muted` and most art tokens) flips by itself.
- **`styles/theme-dark.css`** holds the few things a token cannot reach, each
  because it paints a colour that does not come from CSS: the Carbon eyebrow
  icons (inverted), client logos (white silhouettes), the CTA watermark
  (inverted ghost), case-study diagrams (placed on a light card, since they are
  black line art), and the logo swap. It is last in the barrel so it wins.

The dark ground is `#1f1e1d`, a warm near-black. **The dark ramp was solved, not
picked:** each step is the warm grey whose contrast against `#1f1e1d` matches
the light step's contrast against `#fcfcfd`, to within 0.05. Hierarchy therefore
carries across exactly, and so does any contrast problem: a light-mode failure
comes out as the same failure in dark. To change a dark step, re-solve it against
the light step's ratio rather than nudging it by eye.

Cobalt cannot carry text on the dark ground (about 2:1), so in dark mode the
brand tint `#7aa5e8` becomes `--accent` (6.6:1) and cobalt becomes
`--accent-soft`; ochre and its tint swap the same way for `--data`. Primary
buttons need no rule: they fill with `--accent` and label with `--n-0`, which is
a dark step in this theme, so they read as light blue with a dark label (6.5:1).
The Products drawing's violet moves to its tints.

**The cookie banner is always the opposite of the page** (`--n-900`: ink on
light, near-white on dark), so its "Privacy Policy" link uses `--accent-soft`,
the accent's opposite half. With `--accent` it failed in both themes.

**The logo has a dark variant.** `arka-mark-small-dark.svg` lifts only the blue
node, to `#4884e3` (4.5:1 on `#1f1e1d`); the supplied blue is 1.9:1 there and the
mark reads as two nodes. Header and footer render both marks and
`theme-dark.css` shows one. Two tiny images toggled by the theme attribute cannot
disagree with the colours; swapping `src` in script would flash the wrong mark
before hydration.

The privacy policy states that theme preference is kept in localStorage. If the
key or what is stored ever changes, change that text too.

When adding anything that draws in a fixed colour — an `<img>` of line art, a
hardcoded `rgba()`, a mask — check it on the dark ground as well.

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
