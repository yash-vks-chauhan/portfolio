#!/usr/bin/env node
// Screenshots of the built site (run `npm run build` first) at 1440 and 390 px, light and dark, into shots/.
// Like the design's own shots: Chromium at 1x, reduced motion (the still hero frame, final numbers) and the
// clock fixed at 9:04 PM in Chennai, as the live chip reads in the mocks.
//   npm run shots                       every page
//   npm run shots -- home glassbox      just these pages
//   npm run shots -- --motion           with animations (hero WebGL, counters), for a quick look
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'shots');
fs.mkdirSync(out, { recursive: true });

export const PAGES = {
  home: '/',
  work: '/work',
  glassbox: '/work/glassbox',
  pulse: '/work/pulse',
  gridee: '/work/gridee',
  'ems-research': '/work/ems-research',
  autoscaler: '/work/autoscaler',
  kalakraft: '/work/kalakraft',
  'ct-denoising': '/work/ct-denoising',
  research: '/research',
  about: '/about',
  '404': '/this-page-does-not-exist',
};
const SIZES = [
  { w: 1440, h: 900 },
  { w: 390, h: 844 },
];
const THEMES = ['light', 'dark'];

const args = process.argv.slice(2);
const motion = args.includes('--motion');
const chosen = args.filter((a) => !a.startsWith('--'));
const pages = chosen.length ? chosen : Object.keys(PAGES);
const port = Number(process.env.PORT || 4329);
const base = `http://localhost:${port}`;

async function waitFor(url, ms = 30_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const r = await fetch(url);
      if (r.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server at ${url} didn't start`);
}

const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], { cwd: root, stdio: 'ignore', detached: true });
const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
};
try {
  await waitFor(base);
  const executablePath = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch({ executablePath });
  for (const name of pages) {
    const route = PAGES[name];
    if (!route) {
      console.warn(`unknown page "${name}"`);
      continue;
    }
    for (const { w, h } of SIZES) {
      for (const theme of THEMES) {
        const ctx = await browser.newContext({
          viewport: { width: w, height: h },
          deviceScaleFactor: 1,
          colorScheme: theme,
          reducedMotion: motion ? 'no-preference' : 'reduce',
        });
        const page = await ctx.newPage();
        // 15:34 UTC is 9:04 PM in Chennai.
        await page.clock.setFixedTime(new Date('2026-10-04T15:34:00Z'));
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(motion ? 1500 : 400);
        const stem = `${name}-${w}-${theme}`;
        await page.screenshot({ path: path.join(out, `${stem}-first.png`) });
        await page.screenshot({ path: path.join(out, `${stem}-full.png`), fullPage: true });
        console.log('shot', stem);
        await ctx.close();
      }
    }
  }
  await browser.close();
} finally {
  stopServer();
}
