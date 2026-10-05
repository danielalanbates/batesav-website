// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Post-build sanity check: required files exist, in-page anchors resolve,
// canonical tags point at batesav.com, and nothing from the batesai.org
// source leaked into the output. Run after `npm run build`:  npm run check
import { existsSync, readFileSync } from 'node:fs';

const fail = [];
const need = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', 'favicon.svg', 'og.png'];
for (const f of need) if (!existsSync(`dist/${f}`)) fail.push(`missing dist/${f}`);

const read = (f) => (existsSync(`dist/${f}`) ? readFileSync(`dist/${f}`, 'utf8') : '');
const home = read('index.html');
const homeIds = new Set([...home.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const page of ['index.html', '404.html']) {
  const html = read(page);
  if (!html) continue;
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  // "#x" must exist on this page; "/#x" must exist on the home page.
  for (const [, slash, anchor] of html.matchAll(/href="(\/?)#([^"]+)"/g)) {
    if (!(slash ? homeIds : ids).has(anchor)) fail.push(`${page}: broken anchor ${slash}#${anchor}`);
  }
  for (const bad of ['batesai-logo', 'Lorem', 'Your name here', 'TODO', 'localhost']) {
    if (html.includes(bad)) fail.push(`${page}: unexpected text "${bad}"`);
  }
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canon || !canon[1].startsWith('https://batesav.com/')) fail.push(`${page}: canonical missing or not batesav.com`);
}

if (fail.length) {
  console.error(`check-dist: ${fail.length} problem(s)\n - ${fail.join('\n - ')}`);
  process.exit(1);
}
console.log(`check-dist: OK (${need.length} files, ${homeIds.size} ids on home, anchors and canonicals valid)`);
