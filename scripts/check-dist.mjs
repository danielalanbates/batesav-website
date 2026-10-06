// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Post-build sanity check: required files exist, in-page anchors resolve,
// canonical tags point at batesav.com, ids are unique, nothing from the
// batesai.org source or its look (Manrope / IBM Plex Mono) leaked into the
// output, and copper is never used as a text color in the source.
// Run after `npm run build`:  npm run check
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const fail = [];
const need = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', 'favicon.svg', 'apple-touch-icon.png', 'og.png'];
for (const f of need) if (!existsSync(`dist/${f}`)) fail.push(`missing dist/${f}`);

const read = (f) => (existsSync(`dist/${f}`) ? readFileSync(`dist/${f}`, 'utf8') : '');
const home = read('index.html');
const homeIds = new Set([...home.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const page of ['index.html', '404.html']) {
  const html = read(page);
  if (!html) continue;
  const idList = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const ids = new Set(idList);
  if (ids.size !== idList.length) fail.push(`${page}: duplicate ids ${idList.filter((x, i) => idList.indexOf(x) !== i).join(', ')}`);
  // "#x" must exist on this page; "/#x" must exist on the home page.
  for (const [, slash, anchor] of html.matchAll(/href="(\/?)#([^"]+)"/g)) {
    if (!(slash ? homeIds : ids).has(anchor)) fail.push(`${page}: broken anchor ${slash}#${anchor}`);
  }
  for (const bad of ['batesai-logo', 'Lorem', 'Your name here', 'TODO', 'localhost', 'Manrope', 'IBM+Plex', 'IBM Plex']) {
    if (html.includes(bad)) fail.push(`${page}: unexpected text "${bad}"`);
  }
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canon || !canon[1].startsWith('https://batesav.com/')) fail.push(`${page}: canonical missing or not batesav.com`);
}

// --accent (copper) fails AA as text; text must use --accent-text. A rule may
// use it only when its selector targets SVG parts (stroke via currentColor).
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));
for (const f of walk('src').filter((f) => /\.(astro|css)$/.test(f))) {
  const css = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/(^|[\s;])color:\s*var\(--accent\)/.test(body)) continue;
    const parts = selector.split(',').map((x) => x.trim().split(/\s+/).pop());
    if (!parts.every((x) => /^(svg|path|use|circle|rect)\b/.test(x) || /(^|\.)(wave|icon)\b/.test(x))) {
      fail.push(`${f}: copper --accent used as text color in "${selector.trim()}" (use --accent-text)`);
    }
  }
}

// Package prices are placeholders until set in src/pages/index.astro.
const placeholders = (home.match(/data-placeholder-price/g) || []).length;
if (placeholders) console.warn(`check-dist: WARNING ${placeholders} package price(s) are still placeholders ("$—"). Set them before launch.`);

if (fail.length) {
  console.error(`check-dist: ${fail.length} problem(s)\n - ${fail.join('\n - ')}`);
  process.exit(1);
}
console.log(`check-dist: OK (${need.length} files, ${homeIds.size} ids on home, anchors and canonicals valid)`);
