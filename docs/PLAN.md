# batesav.com — plan, decisions and pathways

Written for whoever (human or AI) continues this project. Last updated 2026-10-05.

## Why this exists

Daniel asked (2026-10-05) for a website named **batesav.com**, in its own folder, reusing resources from batesai.org but **not** its look. Its purpose is to promote a new business he is considering:

- **Now (phase 1):** live sound with our own full PA, multitrack event recording (mixed and mastered), and broadcast audio: a dedicated broadcast mix for a client's livestream or Zoom, or an audio-only stream we run.
- **Target events:** churches and worship, conferences and corporate events, concerts and music, memorials and funerals. Anything that needs only sound, recording and/or audio broadcasting.
- **Later:** video recording and editing, video livestreaming, then full event production and broadcasting.

His answers to the setup questions: business voice is "we"; future services shown as "coming soon"; packages shown with starting prices (placeholders until he sets them); About keeps his church technical manager background and links his LinkedIn for references.

## Decisions

| Decision | Why |
|---|---|
| Astro static site, Astro as the only dependency | Same stack as batesai.org, but the AV site needs no React, Tailwind or Functions. Smaller install, and the Mac is short on disk |
| Own design ("Sanctuary Program"), not batesai.org's | 2026-10-05 Daniel: reuse resources, but do not make it look like batesai.org. Three design directions were drafted (warm editorial, stage/broadcast, signal flow) and judged; warm editorial won on trust for non-technical church buyers and distance from batesai.org. The first draft (batesai.org look, commit e05d1b3) is in git history |
| Contact = `help@batesai.org` | batesav.com has no mailbox. Daniel's standing instructions say to refer to help@batesai.org. Change it in `src/consts.ts` |
| No church name, budgets, people or vendor names on the site | Privacy. The page names only the role (church technical manager, Tri-Cities) and its general duties; Daniel approved that About text on 2026-10-05 |
| LinkedIn = `https://www.linkedin.com/in/danielalanbates` | Daniel wrote `linkedin.com/danielalanbates`; that form 404s, and profile URLs use `/in/`. LinkedIn blocks automated checks (HTTP 999), so confirm it opens his profile |
| Placeholder prices, three packages | Daniel chose "packages with starting prices" but has not set prices. Live Sound / Sound + Recording (recommended) / Sound, Recording + Broadcast. Change names, inclusions and prices in the `packages` array |
| AutoLyrics section removed | The site now sells event services; AutoLyrics is still named in the About text |
| No testimonials, client logos or years of experience | None were supplied, and inventing them would be dishonest. Add real ones when Daniel provides them |
| Region "Tri-Cities, Washington" | batesai.org already publishes Tri-Cities work. Edit `SITE.region` if he wants a wider service area |
| Not deployed, domain not bought | Buying the domain needs Daniel's payment details and his decision. Deploying would publish content he has not reviewed |

## Next steps (in order)

1. **Daniel reviews the copy and sets package prices** (`packages` in `src/pages/index.astro`). `npm run check` warns while any price is a placeholder.
2. **Register `batesav.com`** (about $10/yr). Cloudflare Registrar is simplest, since batesai.org is already on Cloudflare account `043cd08e1ceaf0a49db860f6519fdbbd`.
3. **Create the Pages project and deploy:**
   ```sh
   cd ~/Downloads/batesav-website
   npm run build && npm run check
   npx wrangler pages project create batesav --production-branch=main   # first time only
   npx wrangler pages deploy dist --project-name=batesav --branch=main
   ```
   Then in the Cloudflare dashboard, open Pages, choose batesav, then Custom domains, and add `batesav.com` and `www.batesav.com`.
4. **Email:** turn on Cloudflare Email Routing for batesav.com (free) to forward `hello@batesav.com` to Daniel's inbox. Then set `SITE.email` to it.
5. Optional: add Google Search Console verification and submit `https://batesav.com/sitemap.xml`.

## Alternative pathways

- **Contact form instead of mailto:** add a Cloudflare Pages Function (`functions/api/contact.js`) that sends mail through Email Routing or MailChannels, with Turnstile for spam. The batesai.org repo has Functions examples under `functions/`.
- **More pages:** split each service into `src/pages/services/<id>.astro`, add a portfolio or case studies once there are real projects with permission, and add a `/gear` page with an equipment list. Add every new page to `PAGES` in `src/pages/sitemap.xml.ts`.
- **Runner-up designs:** "House Lights Down" (dark stage, condensed type, on-air cues; most AV at a glance but loud for church buyers) and "Signal Path" (signal-flow diagram, jack rings; rigorous but closest to batesai.org). Either could replace the hero art or be used for a gear/portfolio page.
- **Booking:** embed a Calendly or Google Calendar appointment link in the contact section.
- **When video launches:** move the roadmap item into the services index (add an icon key and entry), add a package, and update `SITE.description`, the hero lede and `og.html`.
- **Event galleries:** once there are real recordings with client permission, add a listen/watch page with embedded audio.

## Verification done (2026-10-05)

- `astro build`: 2 pages plus robots and sitemap, built in about 0.6 s. `npm run check` passes.
- Headless Chrome via DevTools protocol at 320, 390, 820, 1024 and 1440 px, light and dark, with reduced motion, on the event-business build: `scrollWidth == innerWidth` at every size (no horizontal scroll), and the dark background applies.
- Two multi-agent reviews (contrast/a11y/code/layout, then copy honesty/a11y) with adversarial verification; confirmed findings fixed. Copy deliberately avoids invented clients, experience, turnaround times and prices.
- The verification harness lived in the session scratchpad, not this repo. To repeat it, serve `dist/` and screenshot with Chrome DevTools `Emulation.setDeviceMetricsOverride`. Plain `--window-size` headless screenshots are clipped below about 500 px wide and do not show mobile layout.

## Gotchas

- Copper `--accent` (#b5651d) is 3.7:1 on paper: fine for graphics, **fails as text**. `npm run check` fails if `color: var(--accent)` appears on a non-SVG rule.
- Astro scopes component styles. Markup injected with `set:html` (folio waves, service icon paths) does not get the scope attribute, so style it from `global.css` or with `:global()`.
- Headless Chrome `--screenshot` with `--headless=new` can hang after writing the file; kill it by its `--user-data-dir`.

- Do **not** build or run `wrangler pages deploy` inside Google Drive or iCloud. Both hang (see the batesai.org notes). Build in `~/Downloads/batesav-website`, then mirror to Drive.
- The Mac's free disk was **below 8 GB** during this work (7.0 GB). Check `df -h /` before `npm install`.
