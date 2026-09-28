# Binary Droplet — Company Website

Static marketing site for **Binary Droplet**, a software engineering and consulting company.

## Stack

Vanilla HTML / CSS / JavaScript — no build tool, no framework, no dependencies beyond Google Fonts.

| File | Purpose |
|------|---------|
| `index.html` | Single-page site structure with all sections |
| `css/styles.css` | All styles, theme variables, animations |
| `js/translations.js` | `window.TRANSLATIONS` — all copy in 6 languages |
| `js/i18n.js` | Language detection, `applyLang()`, switcher logic |
| `js/main.js` | Theme toggle, navbar, mobile menu, scroll effects |
| `assets/` | Logos, loading GIFs, favicon |

## Sections

Home → Services → Technologies → AI → Industries → Why Us → Contact

## Theming

Two themes: **dark** (default) and **light**. The active theme is stored in `localStorage` under the key `bd-theme`. An inline `<script>` in `<head>` sets `data-theme` on `<html>` before first paint to prevent flash.

Logo assets per theme:

| Theme | Navbar / Footer | Loading GIF |
|-------|----------------|-------------|
| dark  | `logo_dark.png` | `logo_loading_dark.gif` |
| light | `logo_white.png` | `logo_loading_white.gif` |

## Internationalisation

Six languages supported: English (`en`), Greek (`el`), German (`de`), French (`fr`), Spanish (`es`), Russian (`ru`).

- All translatable strings live in `js/translations.js` as `window.TRANSLATIONS`.
- DOM elements carry a `data-i18n` attribute with a dot-notation key (e.g. `hero.title1`).
- `js/i18n.js` detects language on load (localStorage `bd-lang` → browser `navigator.language` → `en`), applies translations, and wires the language-switcher dropdown in the navbar.
- Switching language updates `localStorage`, the `lang` attribute on `<html>`, and all `[data-i18n]` elements instantly without a page reload.

## Colour Palette

### Dark theme

| Role | Name | Hex |
|------|------|-----|
| Background | Ink Black | `#0d1b2a` |
| Surface / cards | Prussian Blue | `#1b263b` |
| Borders | Dusk Blue | `#415a77` |
| Muted text | Lavender Grey | `#778da9` |
| Body text | Alabaster Grey | `#e0e1dd` |
| Accent / buttons | Lavender Grey | `#778da9` |

### Light theme

| Role | Name | Hex |
|------|------|-----|
| Background | Alabaster White | `#f7f8f5` |
| Surface / cards | Mist Grey | `#eaede8` |
| Borders | Lavender Grey | `#b8c4d1` |
| Muted text | Dusk Blue | `#5f7590` |
| Body text | Prussian Blue | `#1b263b` |
| Accent / buttons | Ink Blue | `#0d1b2a` |

## Running Locally

Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server
```

No build step required.

## Assets

All logo and animation assets are in `/assets/`. The favicon is `logo_transparent_bg.png`.
