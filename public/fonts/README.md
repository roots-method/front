# Fonts

Type is loaded from Google Fonts in each page's `<head>` — there are no font
files in this directory and no `@font-face` rules in `styles.css`.

- **Barlow** — headings and subheadings (`--font-heading`)
- **Nunito Sans** — body copy (`--font`)

Both stacks fall back to the system UI font, so the page stays readable before
the webfonts arrive. To change the pairing, edit the two custom properties at
the top of `styles.css` **and** the `fonts.googleapis.com` link in every page's
head — the two have to agree or the browser silently falls back.

Note: an earlier direction called for licensed **SK Concretica** with a
**Space Grotesk** fallback. Neither was ever wired up.
