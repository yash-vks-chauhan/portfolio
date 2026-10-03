#!/usr/bin/env node
// Puts the site's screenshots (npm run shots) next to the design's (design/screenshots) and scores the difference.
//
// The design screenshots were rendered on a Mac with SF Pro. Where SF Pro isn't installed (CI, Linux), the site
// renders its Inter fallback, so text is a few per cent wider and pixel scores are noisy. For a fair pixel diff this
// script also renders the design prototypes (design/prototype) on this machine, with the same Inter, and scores the
// site against those. Outputs go to shots/compare/: a side-by-side (design | prototype here | site) per pair.
//   npm run compare                 all pairs
//   npm run compare -- home         pairs whose name starts with "home"
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const design = path.join(root, '..', 'design');
const shots = path.join(root, 'shots');
const outDir = path.join(shots, 'compare');
const protoDir = path.join(shots, 'proto');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(protoDir, { recursive: true });

// site shot ↔ design screenshot ↔ prototype (file, width, height, full page, scheme)
const PAIRS = [
  ['home-1440-light-first', 'preview-home-light', ['GlassHome.html', 1440, 900, false, 'light']],
  ['home-1440-dark-first', 'preview-home-dark', ['GlassHomeDark.html', 1440, 900, false, 'dark']],
  ['home-1440-light-full', 'home-light', ['GlassHome.html', 1440, 900, true, 'light']],
  ['home-1440-dark-full', 'home-dark', ['GlassHomeDark.html', 1440, 900, true, 'dark']],
  ['glassbox-1440-light-first', 'preview-case-study', ['GlassCase.html', 1440, 900, false, 'light']],
  ['glassbox-1440-light-full', 'case-study-light', ['GlassCase.html', 1440, 900, true, 'light']],
  ['glassbox-1440-dark-full', 'case-study-dark', ['GlassCaseDark.html', 1440, 900, true, 'dark']],
  ['work-1440-light-full', 'work-index', ['GlassWork.html', 1440, 900, true, 'light']],
  ['home-390-light-first', 'mobile-first-screen-light', ['GlassMobileFirst.html', 390, 844, false, 'light']],
  ['home-390-dark-first', 'mobile-first-screen-dark', ['GlassMobileFirstDark.html', 390, 844, false, 'dark']],
  ['home-390-light-full', 'mobile-home', ['GlassMobile.html', 390, 844, true, 'light']],
  ['glassbox-390-dark-full', 'mobile-case-study-dark', ['GlassMobileCaseDark.html', 390, 844, true, 'dark']],
];

const filter = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const pairs = PAIRS.filter(([site]) => !filter.length || filter.some((f) => site.startsWith(f)));

async function renderPrototypes() {
  const fontFile = path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2');
  const css = `@font-face{font-family:'Inter';font-weight:100 900;font-display:block;src:url(data:font/woff2;base64,${fs
    .readFileSync(fontFile)
    .toString('base64')}) format('woff2')}`;
  const executablePath = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch({ executablePath });
  for (const [, designName, [file, w, h, full, scheme]] of pairs) {
    const target = path.join(protoDir, `${designName}.png`);
    if (fs.existsSync(target)) continue;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.route('**/fonts.googleapis.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
    await page.goto('file://' + path.join(design, 'prototype', file));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: target, fullPage: full });
    await ctx.close();
  }
  await browser.close();
}

async function raw(file, width) {
  const img = sharp(file).removeAlpha();
  const meta = await img.metadata();
  const scaled = meta.width === width ? img : img.resize({ width });
  const { data, info } = await scaled.raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Mean absolute difference (0–255) over the overlapping height, plus per-band scores. */
function score(a, b, band = 500) {
  const h = Math.min(a.height, b.height);
  const w = Math.min(a.width, b.width);
  const bands = [];
  let total = 0;
  for (let y0 = 0; y0 < h; y0 += band) {
    let sum = 0;
    let n = 0;
    for (let y = y0; y < Math.min(h, y0 + band); y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * a.width + x) * 3;
        const j = (y * b.width + x) * 3;
        sum += (Math.abs(a.data[i] - b.data[j]) + Math.abs(a.data[i + 1] - b.data[j + 1]) + Math.abs(a.data[i + 2] - b.data[j + 2])) / 3;
        n++;
      }
    }
    bands.push(+(sum / n).toFixed(1));
    total += sum;
  }
  return { mean: +(total / (h * w)).toFixed(2), bands, heights: [a.height, b.height] };
}

await renderPrototypes();
const report = [];
for (const [siteName, designName] of pairs) {
  const siteFile = path.join(shots, `${siteName}.png`);
  const designFile = path.join(design, 'screenshots', `${designName}.jpg`);
  const protoFile = path.join(protoDir, `${designName}.png`);
  if (!fs.existsSync(siteFile)) {
    console.warn(`missing ${siteName}.png (run npm run shots)`);
    continue;
  }
  const width = (await sharp(designFile).metadata()).width;
  const [d, p, s] = await Promise.all([raw(designFile, width), raw(protoFile, width), raw(siteFile, width)]);
  const vsProto = score(s, p);
  const vsDesign = score(s, d);
  report.push({ pair: `${siteName} ↔ ${designName}`, vsPrototype: vsProto.mean, vsDesign: vsDesign.mean, heights: { site: s.height, design: d.height }, bands: vsProto.bands });
  // Side by side: design | prototype here | site.
  const gap = 16;
  const height = Math.max(d.height, p.height, s.height);
  const composite = sharp({ create: { width: width * 3 + gap * 2, height, channels: 3, background: '#888888' } }).composite([
    { input: designFile, left: 0, top: 0 },
    { input: await sharp(protoFile).removeAlpha().resize({ width }).png().toBuffer(), left: width + gap, top: 0 },
    { input: await sharp(siteFile).removeAlpha().resize({ width }).png().toBuffer(), left: (width + gap) * 2, top: 0 },
  ]);
  await composite.jpeg({ quality: 80 }).toFile(path.join(outDir, `${siteName}.jpg`));
}
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`${r.pair}\n  vs prototype (same fonts): ${r.vsPrototype}  vs design: ${r.vsDesign}  heights site/design: ${r.heights.site}/${r.heights.design}\n  bands: ${r.bands.join(' ')}`);
}
