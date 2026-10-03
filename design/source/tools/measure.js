#!/usr/bin/env node
// Prints a prototype's natural height (set it as the root min-height and the artboard h in pages.js / canvas.json)
// and anything that overflows the viewport width.
// usage: node tools/measure.js GlassHome.html [width]
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const [, , file, w = '1440'] = process.argv;
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: +w, height: 900 } })).newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', 'prototype', file));
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const root = document.body.firstElementChild;
    root.style.minHeight = '0px';
    const over = [];
    document.querySelectorAll('body *').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.right > document.documentElement.clientWidth + 1 && getComputedStyle(el).position !== 'absolute' && b.width > 0) over.push(el.tagName + ' ' + Math.round(b.right));
    });
    return { height: Math.ceil(root.getBoundingClientRect().height), scrollWidth: document.documentElement.scrollWidth, overflow: over.slice(0, 8) };
  });
  console.log(file, w, JSON.stringify(r));
  await browser.close();
})();
