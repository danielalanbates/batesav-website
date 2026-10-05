// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Post-build sanity check: required files exist, in-page anchors resolve,
// and nothing from the batesai.org source leaked into batesav.com output.
// Run after `npm run build`:  npm run check
import { existsSync, readFileSync } from 'node:fs';

const fail = [];
const need = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', 'favicon.svg', 'og.png'];
for (const f of need) if (!existsSync(`dist/${f}`)) fail.push(`missing dist/${f}`);

const html = existsSync('dist/index.html') ? readFileSync('dist/index.html', 'utf8') : '';
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, anchor] of html.matchAll(/href="\/?#([^"]+)"/g)) {
  if (!ids.has(anchor)) fail.push(`broken anchor #${anchor}`);
}
for (const bad of ['batesai-logo', 'Lorem', 'Your name here', 'TODO', 'localhost']) {
  if (html.includes(bad)) fail.push(`unexpected text in index.html: ${bad}`);
}
if (!html.includes('https://batesav.com/')) fail.push('canonical URL is not batesav.com');

if (fail.length) {
  console.error(`check-dist: ${fail.length} problem(s)\n - ${fail.join('\n - ')}`);
  process.exit(1);
}
console.log(`check-dist: OK (${need.length} files, ${ids.size} ids, anchors resolve)`);
