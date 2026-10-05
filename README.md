# Bates AV — batesav.com

Website for **Bates AV**: live sound, livestream, lighting and ProPresenter help for churches and small venues, by Daniel Bates (Bates LLC).

- Sister site: [batesai.org](https://batesai.org)
- Contact: [help@batesai.org](mailto:help@batesai.org)

## Status (2026-10-05)

| Item | State |
|---|---|
| Site source | Done. Astro 5, static output, one page plus a 404 page |
| Local build | Passes (`npm run build && npm run check`) |
| Visual check | 320 / 390 / 820 / 1440 px, light and dark, no horizontal overflow |
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
| `src/consts.ts` | Site name, contact email, region and links. **Edit contact details here** |
| `src/layouts/Base.astro` | `<head>`, SEO/OG/JSON-LD, top nav, footer |
| `src/styles/global.css` | Design tokens (light and dark), buttons, tags, labels |
| `src/pages/index.astro` | Home page. Service, step and system lists are arrays at the top |
| `src/pages/404.astro` | Not-found page |
| `src/pages/robots.txt.ts`, `sitemap.xml.ts` | Generated at build. Add new pages to `PAGES` in the sitemap |
| `public/_headers` | Cloudflare Pages security and cache headers |
| `assets-src/og.svg` | Source for `public/og.png`. Re-render with `rsvg-convert -w 1200 -h 630 assets-src/og.svg -o public/og.png` |
| `scripts/check-dist.mjs` | Post-build check: required files, anchors, leftover batesai text |
| `docs/PLAN.md` | Decisions, next steps and alternative pathways for whoever continues this |

## What was reused from batesai.org

The source is [danielalanbates/website](https://github.com/danielalanbates/website), at commit `795954d9`, the 2026-09-22 homepage redesign. Reused pieces:

- **Design system** from the redesigned `src/pages/index.astro`: Manrope and IBM Plex Mono, paper/ink tokens with a dark mode, the hero with a tilted "log" card, the bordered card grid, the dark service panel, and the contact and footer pattern. The accent changes from BatesAI lime to a "tally light" red.
- **Astro scaffold**: static output and the `site` config. The `robots.txt` and `sitemap.xml` endpoints are generalized to read `site` instead of hard-coding the domain.
- **Cloudflare Pages deploy flow**: `_headers`, plus `wrangler pages deploy` from a non-synced copy.

Not reused: React, Tailwind, Stripe, the D1 database, auth/membership Functions and the product catalog. This site needs none of them, and leaving them out keeps `node_modules` at about 135 MB instead of about 200 MB.

## License

Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
PolyForm Noncommercial 1.0.0 with a 10% commercial-revenue rider. See [LICENSE](LICENSE). Commercial licences: help@batesai.org.
