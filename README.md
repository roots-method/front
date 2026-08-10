# front

A website for roots method. Building sustainable, scalable products for next generation.

## Brand colour palette

Two colours, split by **role**. This is the rule that keeps the system working — a single
accent doing identity, wayfinding, emphasis and state all at once flattens the hierarchy.

| Role | Colour | Hex | Used for |
| --- | --- | --- | --- |
| **Identity / wayfinding** | Cobalt | `#0047ab` | Eyebrows, section labels, step numbers, links, rules, the emphasised phrase in headlines |
| **Evidence** | Ochre | `#8c5810` | Numbers only — metric values, stats, cost figures |
| Ink | Deep navy | `#0e1a2b` | Dark panels (cover, CTA) |
| Body text | Navy | `#12213a` | Headings and body copy |
| Paper | Bone | `#faf8f4` | Page background — deliberately not pure white |
| Surface | Warm grey | `#f2eee8` | Callouts, quote blocks |
| Muted | Slate | `#5f6f82` | Secondary and caption text |

### Tints for dark backgrounds

Cobalt and ochre are both too dark to read on the ink panels. Use these instead — this is
structural, not decorative:

| Base | On dark |
| --- | --- |
| Cobalt `#0047ab` | `#7aa5e8` |
| Ochre `#8c5810` | `#e3a84a` |

Supporting text on ink: `#eef2f8` (primary), `#c2d0e2` (secondary), `#8496ad` (tertiary).

### Rules

- **Warm means a number.** If ochre appears on a label, button, or link, the system has broken.
  Keeping it scoped to evidence is what lets a reader scan structure and proof independently.
- **Accent stays under roughly 10% of inked area.** Restraint is what makes it read as emphasis.
- **Never pure white paper.** Bone `#faf8f4` is what stops the layout feeling clinical.
- Every pair clears WCAG AA (4.5:1) in both themes. Ochre was darkened from `#9c6414`
  to `#8c5810` specifically because the lighter value measured 4.28:1 against the warm
  surface — passing on paper but failing on cards. Measured: cobalt 7.95 on paper / 7.30
  on surface; ochre 5.63 / 5.16. Dark theme is 5.94 or better throughout.

### Adoption status

| Surface | Palette | Notes |
| --- | --- | --- |
| Website (`styles.css`) | Cobalt + Ochre | Adopted, both themes |
| Brochure PDF | Cobalt + Ochre | Adopted — built before the ochre AA fix, so its evidence colour is the older `#9c6414`; regenerate to match |

The site tokens live in the `:root` and `[data-theme="dark"]` blocks at the top of
`styles.css`. `--data` is applied to exactly five classes — `.about-stats__value`,
`.cs-stat__value`, `.case-card__metric-value`, `.results-stats__value` and
`.problem-frame__cost`. Nothing else should use it.

### Known gotcha

The dev server (`python3 -m http.server`) sends no `Cache-Control` or `ETag`, so browsers
heuristically cache `styles.css` and `footer.js` and reuse them without revalidating.
If a change appears not to have applied, hard-reload (`Cmd+Shift+R`) before debugging it.

## Typography

IBM Plex Sans (400 / 500 / 600), loaded from Google Fonts.

- Headings `h1`, `h2` — weight 400
- Headings `h3` — weight 500
- Body — weight 400

Note that `font-weight: 700` is still used in places but is **not loaded** — browsers
synthesise a faux bold from 600. Either add `700` to the font URL or drop those rules to 600.

## Icons

`assets/icons-ai-ibm/` — 105 IBM Carbon icons. These are **fill-based with no strokes**, so
line weight cannot be reduced via `stroke-width`; use opacity, a muted colour, or download
the smaller Carbon size variants, which are redrawn thinner rather than scaled.

The older `assets/icons/` and `assets/icons-ai/` sets have been removed.
