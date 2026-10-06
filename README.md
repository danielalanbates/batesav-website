# Bates AV — batesav.com

Mock-up website for **Bates AV**, a new live sound, event recording and broadcast audio business in the Tri-Cities, Washington, founded by Daniel Bates (Bates LLC). It starts with sound only (live sound, multitrack recordings, broadcast mixes and audio-only streams) and plans to grow into video, livestreaming and full event production.

- Sister site: [batesai.org](https://batesai.org)
- Contact: [help@batesai.org](mailto:help@batesai.org)

## Status (2026-10-05)

| Item | State |
|---|---|
| Site source | Mock-up. Astro 5, static output, one page plus a 404 page |
| Package prices | **Placeholders** (`$—`). Set `from` in the `packages` array in `src/pages/index.astro`. `npm run check` warns until all are set |
| Local build | Passes (`npm run build && npm run check`) |
| Visual check | 320 / 390 / 820 / 1024 / 1440 px, light and dark, no horizontal overflow |
| Domain `batesav.com` | **Not registered** (registry WHOIS: no match on 2026-10-05) |
| Hosting | Not deployed. Cloudflare Pages config is ready (`wrangler.toml`, project `batesav`) |
| Email at batesav.com | None yet. The contact address is `help@batesai.org`, set in `src/consts.ts` |

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run check      # sanity-checks dist/
```

Build outside cloud-synced folders. Builds inside iCloud or Google Drive hang or run about 100x slower. The working copy is `~/Downloads/batesav-website`, and Google Drive `My Drive/Code/batesav-website` is the synced source copy.

## Layout

| Path | What it is |
|---|---|
| `src/consts.ts` | Site name, tagline, contact email, region, LinkedIn and other links. **Edit contact details here** |
| `src/layouts/Base.astro` | `<head>`, SEO/OG/JSON-LD, masthead, footer, and the shared `<symbol id="wave">` ornament |
| `src/styles/global.css` | Design tokens (light and dark), type, buttons, kickers, folios. Token rules are at the top of the file |
| `src/pages/index.astro` | Home page. Services, event types, packages (prices), steps and the roadmap are arrays at the top |
| `src/pages/404.astro` | Not-found page |
| `src/pages/robots.txt.ts`, `sitemap.xml.ts` | Generated at build. Add new pages to `PAGES` in the sitemap |
| `public/_headers` | Cloudflare Pages security and cache headers |
| `assets-src/og.html` | Source for `public/og.png` (1200×630). Re-render with headless Chrome: `--headless=new --window-size=1200,630 --virtual-time-budget=6000 --screenshot=public/og.png file://$PWD/assets-src/og.html` |
| `scripts/check-dist.mjs` | Post-build check: required files, anchors, unique ids, canonicals, no batesai.org logo or fonts, copper never used as text; warns about placeholder prices |
| `docs/PLAN.md` | Decisions, next steps and alternative pathways for whoever continues this |

## Design

"Sanctuary Program" (2026-10-05): the page reads like a well-made printed service program, so it feels calm and trustworthy to pastors and church administrators. It is deliberately **not** the batesai.org look.

| Element | Bates AV |
|---|---|
| Type | Fraunces (serif display, italic kickers and numerals) + Source Sans 3 (body). No monospace |
| Colour | Warm linen paper, espresso ink, hymnal teal (`--primary`), copper ornaments (`--accent`, graphics only; copper text uses `--accent-text`). Dark mode is warm walnut with cream text |
| Motifs | One hand-drawn sound-wave path reused everywhere; small-caps folios on hairlines ("1 · Services"); italic numerals; dotted leaders; one full-width teal band with wave edges |
| Art | CSS/SVG line art only: stage arch with screen, mic and speaker arcs; service and roadmap icons. No photos |
| Mark | Teal seal with a Fraunces "B" (outlined path) and copper speaker arcs: `public/favicon.svg`, `apple-touch-icon.png` |

Motion (wave draw-in, arc pulse, level bars) runs only under `prefers-reduced-motion: no-preference`.

## What was reused from batesai.org

Source: [danielalanbates/website](https://github.com/danielalanbates/website). Only infrastructure and content patterns were reused, not the look:

- **Astro scaffold**: static output and the `site` config. The `robots.txt` and `sitemap.xml` endpoints are generalized to read `site`.
- **Cloudflare Pages deploy flow**: `_headers`, plus `wrangler pages deploy` from a non-synced copy.
- **SEO plumbing**: skip link, canonical/OG/Twitter tags, JSON-LD.

Not reused: batesai.org's design (fonts, palette, cards, terminal card, pill nav), React, Tailwind, Stripe, the D1 database, auth/membership Functions and the product catalog.

## License

Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
PolyForm Noncommercial 1.0.0 with a 10% commercial-revenue rider. See [LICENSE](LICENSE). Commercial licences: help@batesai.org.
