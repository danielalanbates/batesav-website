// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Single-page site for now; add each new page to PAGES.
import type { APIRoute } from 'astro';

const PAGES = [{ path: '/', priority: '1.0', changefreq: 'monthly' }];
const LASTMOD = '2026-10-05';

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map(
    (p) => `  <url>
    <loc>${new URL(p.path, site)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  ).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
