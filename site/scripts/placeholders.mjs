#!/usr/bin/env node
// Lists every [placeholder] still on the built site, page by page: visible text plus link targets (a link waiting
// for its URL renders disabled). Run after `npm run build`. `--strict` exits with an error while any are left, for
// the launch check "No [placeholder] left" (IMPLEMENTATION.md §7).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) {
  console.error('No dist/ folder: run `npm run build` first.');
  process.exit(2);
}

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p);
  }
})(dist);

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

// A placeholder is bracketed prose: "[Your role]", "[date checked]", "[Record count, once the PI agrees …]".
const PLACEHOLDER = /\[(?=[^\]]*[A-Za-z]{2})[^\][<>{}=:;|\\/]{2,160}\]/g;

const byPage = new Map();
const total = new Map();
for (const file of pages.sort()) {
  const html = fs.readFileSync(file, 'utf8');
  const text = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<template[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');
  const hrefs = [...html.matchAll(/\b(?:href|data-href|content)="([^"]*)"/g)].map((m) => decode(m[1]));
  const found = new Map();
  for (const s of [text, ...hrefs]) for (const m of s.matchAll(PLACEHOLDER)) found.set(m[0], (found.get(m[0]) ?? 0) + 1);
  if (found.size === 0) continue;
  const route = '/' + path.relative(dist, file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  byPage.set(route, found);
  for (const [k, n] of found) total.set(k, (total.get(k) ?? 0) + n);
}

// The source sheets render in the browser from src/content/sources.ts, so their fields (checked dates, links) are
// read from the file: one entry per source and field.
const sourceGaps = [];
const sourcesFile = fs.readFileSync(path.join(root, 'src/content/sources.ts'), 'utf8');
for (const block of sourcesFile.split(/\n  \{\n/).slice(1)) {
  const id = block.match(/\bid: '([^']+)'/)?.[1];
  if (!id) continue;
  for (const [, key, value] of block.matchAll(/(\w+):\s*'((?:[^'\\]|\\.)*)'/g)) {
    const gaps = [...value.matchAll(PLACEHOLDER)].map((m) => m[0]);
    if (gaps.length && !['note', 'notePhone', 'noteShort', 'chip'].includes(key)) sourceGaps.push(`${id}.${key}: ${[...new Set(gaps)].join(', ')}`);
  }
}

if (total.size === 0 && sourceGaps.length === 0) {
  console.log('No placeholders left on the built site.');
  process.exit(0);
}
for (const [route, found] of byPage) {
  console.log(`\n${route}`);
  for (const [k, n] of [...found].sort((a, b) => b[1] - a[1])) console.log(`  ${n > 1 ? `${n}×` : '  '} ${k}`);
}
if (sourceGaps.length) {
  console.log('\nSource sheets (src/content/sources.ts)');
  for (const line of sourceGaps) console.log(`     ${line}`);
}
const count = [...total.values()].reduce((a, b) => a + b, 0);
console.log(`\n${total.size} different placeholders on the pages (${count} in all, across ${byPage.size} pages), and ${sourceGaps.length} source fields to fill.`);
if (process.argv.includes('--strict')) process.exit(1);
