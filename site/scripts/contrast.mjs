#!/usr/bin/env node
// Contrast on glass (IMPLEMENTATION.md §7: "text contrast as in the spec, including on glass"). axe can't judge text
// over translucent, blurred surfaces, so this measures it: for every text run inside a glass surface on the first
// screen (home and a case study; 1440 and 390 px; light and dark), it captures the run with and without its text,
// takes the pixels within 2 px of the glyphs as the background, and checks the 5th-percentile contrast against WCAG AA
// (4.5:1; 3:1 for large text). Run after `npm run build`.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { preferInter } from './fonts.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = 4333;
const base = `http://localhost:${port}`;
const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], {
  cwd: root,
  stdio: 'ignore',
  detached: true,
});
const stop = () => {
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
const lum = ([r, g, b]) => {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [Math.max(a, b), Math.min(a, b)];
  return (hi + 0.05) / (lo + 0.05);
};
const browser = await chromium.launch({
  executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined,
});
const results = [];
for (const [w, h] of [
  [1440, 900],
  [390, 844],
])
  for (const scheme of ['light', 'dark'])
    for (const route of ['/', '/work/glassbox']) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        colorScheme: scheme,
        reducedMotion: 'reduce',
      });
      const page = await ctx.newPage();
      await preferInter(page);
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Text runs inside glass surfaces that are on the first screen.
      const items = await page.evaluate(() => {
        const out = [];
        const glass = document.querySelectorAll(
          '.glass-regular, .glass-thin, .glass-strong, .nav-capsule, .tab-bar, .live-chip, [class*="glass"]',
        );
        for (const g of glass)
          for (const el of g.querySelectorAll('*')) {
            if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4 || r.bottom > innerHeight || r.top < 0 || r.right > innerWidth) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
            // Skip runs whose descendants draw text in another colour (the brand link's white "YC" badge).
            if (
              [...el.querySelectorAll('*')].some((c) => c.textContent.trim() && getComputedStyle(c).color !== cs.color)
            )
              continue;
            // Resolve any CSS colour (oklab, color-mix) to sRGB through a canvas.
            const cv = document.createElement('canvas');
            cv.width = cv.height = 1;
            const cx = cv.getContext('2d', { willReadFrequently: true });
            cx.clearRect(0, 0, 1, 1);
            cx.fillStyle = cs.color;
            cx.fillRect(0, 0, 1, 1);
            const px = cx.getImageData(0, 0, 1, 1).data;
            const m = [px[0], px[1], px[2], px[3] / 255];
            out.push({
              id: out.length,
              text: el.textContent.trim().slice(0, 28),
              color: m,
              size: parseFloat(cs.fontSize),
              weight: Number(cs.fontWeight),
              rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            });
            el.dataset.ctId = String(out.length - 1);
          }
        return out;
      });
      for (const it of items) {
        const clip = {
          x: Math.max(0, it.rect.x),
          y: Math.max(0, it.rect.y),
          width: Math.min(it.rect.width, w - it.rect.x),
          height: Math.min(it.rect.height, h - it.rect.y),
        };
        const shown = await page.screenshot({ clip });
        await page.evaluate((id) => {
          const el = document.querySelector(`[data-ct-id="${id}"]`);
          el.style.setProperty('color', 'transparent', 'important');
          el.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
        }, it.id);
        const hidden = await page.screenshot({ clip });
        await page.evaluate((id) => {
          const el = document.querySelector(`[data-ct-id="${id}"]`);
          el.style.removeProperty('color');
          el.style.removeProperty('-webkit-text-fill-color');
        }, it.id);
        const A = await sharp(shown).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        const B = await sharp(hidden).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        const W = A.info.width,
          H = A.info.height;
        // Glyph mask: pixels the text changes. Background sampled within 2 px of a glyph, where the text isn't.
        const glyph = new Uint8Array(W * H);
        for (let i = 0; i < W * H; i++) {
          let d = 0;
          for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(A.data[i * 3 + c] - B.data[i * 3 + c]));
          glyph[i] = d > 24 ? 1 : 0;
        }
        const near = [];
        for (let y = 0; y < H; y++)
          for (let x = 0; x < W; x++) {
            const i = y * W + x;
            if (glyph[i]) continue;
            let close = false;
            for (let dy = -2; dy <= 2 && !close; dy++)
              for (let dx = -2; dx <= 2 && !close; dx++) {
                const xx = x + dx,
                  yy = y + dy;
                if (xx >= 0 && yy >= 0 && xx < W && yy < H && glyph[yy * W + xx]) close = true;
              }
            if (close) near.push(i);
          }
        if (near.length < 10) continue;
        const [tr, tg, tb, ta = 1] = it.color;
        const ratios = near
          .map((i) => {
            const bg = [B.data[i * 3], B.data[i * 3 + 1], B.data[i * 3 + 2]];
            const fg = [tr * ta + bg[0] * (1 - ta), tg * ta + bg[1] * (1 - ta), tb * ta + bg[2] * (1 - ta)];
            return ratio(lum(fg), lum(bg));
          })
          .sort((a, b) => a - b);
        const worst = ratios[Math.floor(ratios.length * 0.05)];
        const large = it.size >= 24 || (it.size >= 18.66 && it.weight >= 700);
        results.push({
          where: `${w} ${scheme} ${route}`,
          text: it.text,
          size: it.size,
          color: it.color.join(','),
          worst: +worst.toFixed(2),
          need: large ? 3 : 4.5,
        });
      }
      await ctx.close();
    }
await browser.close();
stop();
const fails = results.filter((r) => r.worst < r.need);
console.log(`${results.length} text runs on glass checked; ${fails.length} below AA`);
for (const f of fails) console.log('  ', JSON.stringify(f));
const lowest = [...results].sort((a, b) => a.worst / a.need - b.worst / b.need).slice(0, 5);
console.log('closest to the line:');
for (const r of lowest) console.log('  ', JSON.stringify(r));
process.exit(fails.length ? 1 : 0);
