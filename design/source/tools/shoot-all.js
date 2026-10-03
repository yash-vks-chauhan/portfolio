#!/usr/bin/env node
// Renders every prototype to ../../screenshots/ with Playwright (Chromium).
// usage: node tools/shoot-all.js            (after `npm install` and `npx playwright install chromium`)
// env:   PLAYWRIGHT_PATH=/path/to/node_modules/playwright  to use an existing install
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const PROTO = path.join(__dirname, '..', '..', 'prototype');
const OUT = path.join(__dirname, '..', '..', 'screenshots');

// file, output name, viewport width/height, full page, colour scheme
const SHOTS = [
  ['GlassHome.html', 'home-light', 1440, 900, true, 'light'],
  ['GlassHomeDark.html', 'home-dark', 1440, 900, true, 'dark'],
  ['GlassCase.html', 'case-study-light', 1440, 900, true, 'light'],
  ['GlassCaseDark.html', 'case-study-dark', 1440, 900, true, 'dark'],
  ['GlassWork.html', 'work-index', 1440, 900, true, 'light'],
  ['GlassMobileFirst.html', 'mobile-first-screen-light', 390, 844, false, 'light'],
  ['GlassMobileFirstDark.html', 'mobile-first-screen-dark', 390, 844, false, 'dark'],
  ['GlassMobile.html', 'mobile-home', 390, 844, true, 'light'],
  ['GlassMobileCaseDark.html', 'mobile-case-study-dark', 390, 844, true, 'dark'],
  ['GlassTokens.html', 'tokens', 1440, 900, true, 'light'],
  ['GlassComponents.html', 'components', 1440, 900, true, 'light'],
  ['GlassComponents-open.html', 'components-open-states', 1440, 900, true, 'light'],
  // first-screen previews for the README
  ['GlassHome.html', 'preview-home-light', 1440, 900, false, 'light'],
  ['GlassHomeDark.html', 'preview-home-dark', 1440, 900, false, 'dark'],
  ['GlassCase.html', 'preview-case-study', 1440, 900, false, 'light'],
];

(async () => {
  const browser = await chromium.launch();
  for (const [file, name, w, h, full, scheme] of SHOTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto('file://' + path.join(PROTO, file));
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, name + '.jpg'), fullPage: full, type: 'jpeg', quality: 72 });
    console.log('shot', name);
    await ctx.close();
  }
  await browser.close();
})();
