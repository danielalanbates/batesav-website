# batesav.com — plan, decisions and pathways

Written for whoever (human or AI) continues this project. Last updated 2026-10-05.

## Why this exists

Daniel asked for a new website named **batesav.com**, in its own folder, reusing work from batesai.org. No brief was given beyond the name. **Assumption:** "AV" means audio-visual. Daniel is a church technical manager (live sound, video, lighting, ProPresenter, AV system planning and purchasing), so the site presents that as an AV services practice under Bates LLC. If that assumption is wrong, the content lives in `src/pages/index.astro` (arrays at the top) and `src/consts.ts`. The layout and design survive any rewrite.

## Decisions

| Decision | Why |
|---|---|
| Astro static site, Astro as the only dependency | Same stack as batesai.org, but the AV site needs no React, Tailwind or Functions. Smaller install, and the Mac is short on disk |
| Design from the 2026-09-22 batesai.org redesign | It is the newest BatesAI design. It is reused so the two sites read as siblings, with a red "tally light" accent in place of lime |
| Contact = `help@batesai.org` | batesav.com has no mailbox. Daniel's standing instructions say to refer to help@batesai.org. Change it in `src/consts.ts` |
| No church name, budgets, people or vendor names on the site | Privacy. The page says only "church technical manager in the Tri-Cities, Washington" |
| No testimonials, client logos, prices or years of experience | None were supplied, and inventing them would be dishonest. Add real ones when Daniel provides them |
| Region "Tri-Cities, Washington" | batesai.org already publishes Tri-Cities work. Edit `SITE.region` if he wants a wider service area |
| Not deployed, domain not bought | Buying the domain needs Daniel's payment details and his decision. Deploying would publish content he has not reviewed |

## Next steps (in order)

1. **Daniel reviews the copy**: services, the "About" text and the region.
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
- **Shared design package:** if batesai.org and batesav.com keep diverging and converging, extract `global.css` tokens into a small shared package or git submodule. That is not worth it for two sites today.
- **Booking:** embed a Calendly or Google Calendar appointment link in the contact section.
- **Different meaning of "AV":** if batesav is meant to be something else (for example a personal or family site), keep `Base.astro`, `global.css` and the build and deploy setup, and replace `index.astro`.

## Verification done (2026-10-05)

- `astro build`: 2 pages plus robots and sitemap, built in about 0.6 s. `npm run check` passes.
- Headless Chrome via DevTools protocol at 320, 390, 820 and 1440 px, light and dark: `scrollWidth == innerWidth` at every size (no horizontal scroll), and the dark background applies.
- The verification harness lived in the session scratchpad, not this repo. To repeat it, serve `dist/` and screenshot with Chrome DevTools `Emulation.setDeviceMetricsOverride`. Plain `--window-size` headless screenshots are clipped below about 500 px wide and do not show mobile layout.

## Gotchas

- Do **not** build or run `wrangler pages deploy` inside Google Drive or iCloud. Both hang (see the batesai.org notes). Build in `~/Downloads/batesav-website`, then mirror to Drive.
- The Mac's free disk was **below 8 GB** during this work (7.0 GB). Check `df -h /` before `npm install`.
