# Fonts

The app loads fonts through `next/font/google` in `app/layout.tsx`, which
self-hosts them in the production build. There are no font files or manual
`@font-face` rules in this directory.

- **DM Sans** — headings, hero copy, and subheadings (`--font-heading`)
- **Nunito Sans** — paragraphs and normal interface text (`--font`)

The CSS tokens live in `styles/base.css`. Update both the `next/font` setup and
the matching token when changing the pairing.
