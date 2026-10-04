#!/usr/bin/env node
// Open Graph images and the touch icon, rendered from the built site (run `npm run build` first):
//   public/og/<page>.png   1200 × 630, the top of each page in light mode with motion off
//   public/apple-touch-icon.png   180 × 180, the YC mark
// Commit the results; pages reference them through Base.astro's ogImage.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preferInter } from './fonts.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'public', 'og');
fs.mkdirSync(outDir, { recursive: true });

const PAGES = {
  default: '/',
  work: '/work',
  research: '/research',
  about: '/about',
  glassbox: '/work/glassbox',
  pulse: '/work/pulse',
  gridee: '/work/gridee',
  'ems-research': '/work/ems-research',
  autoscaler: '/work/autoscaler',
  kalakraft: '/work/kalakraft',
  'ct-denoising': '/work/ct-denoising',
};

const port = 4331;
const base = `http://localhost:${port}`;
const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], { cwd: root, stdio: 'ignore', detached: true });
const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
};
for (let i = 0; i < 120; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 250));
}

const executablePath = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const browser = await chromium.launch({ executablePath });
try {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date('2026-10-04T15:34:00Z'));
  await preferInter(page);
  for (const [name, route] of Object.entries(PAGES)) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, `${name}.png`) });
    console.log('og', name);
  }

  // The touch icon: the YC squircle, drawn with the site's font (librsvg would substitute one).
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  const font = fs.readFileSync(path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2')).toString('base64');
  await icon.setContent(`<!doctype html><style>@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${font})}
    html,body{margin:0}body{width:180px;height:180px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#3a3a3c,#0b0b0c);
    color:#fff;font:700 68px/1 Inter,sans-serif;letter-spacing:-0.01em}</style><body>YC</body>`);
  await icon.evaluate(() => document.fonts.ready);
  await icon.screenshot({ path: path.join(root, 'public', 'apple-touch-icon.png') });
  console.log('icon apple-touch-icon');
} finally {
  await browser.close();
  stopServer();
}
