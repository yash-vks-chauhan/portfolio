#!/usr/bin/env node
// Screenshots of the interactive open states (command bar, source sheet, toast; the Experience sheet on phones and
// the Dock under the pointer on desktop) for comparison with design/screenshots/components-open-states.jpg and the
// home artboards. Run after `npm run build`.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'shots', 'states');
fs.mkdirSync(out, { recursive: true });
const port = 4330;
const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], { cwd: root, stdio: 'ignore', detached: true });
const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
};
const base = `http://localhost:${port}`;
for (let i = 0; i < 120; i++) {
  try { if ((await fetch(base)).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 250));
}
const executablePath = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const browser = await chromium.launch({ executablePath });
const hydrated = (page, name) => page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' });
      await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
      const page = await ctx.newPage();
      await page.clock.setFixedTime(new Date('2026-10-04T15:34:00Z'));
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await hydrated(page, 'CommandBar');
      await hydrated(page, 'SourceSheet');
      await hydrated(page, 'Toaster');
      await page.keyboard.press('Control+k');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(out, `command-${w}-${scheme}.png`) });
      await page.keyboard.press('Escape');
      const marker = page.locator('[data-cite="glassbox-eval-v4"]').first();
      await marker.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(out, `sheet-${w}-${scheme}.png`) });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      await page.keyboard.press('Control+k');
      await page.keyboard.type('copy email');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(out, `toast-${w}-${scheme}.png`) });
      await page.waitForTimeout(2600);
      if (w < 768) {
        await page.locator('#about').scrollIntoViewIfNeeded();
        await hydrated(page, 'ExperienceSection');
        await page.locator('#about a.exp-row', { hasText: 'IIT Madras' }).click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(out, `experience-${w}-${scheme}.png`) });
        await page.keyboard.press('Escape');
      } else {
        // The Dock as drawn on the home artboard: the pointer over GitHub (motion on for this one).
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.goto(base + '/#contact', { waitUntil: 'networkidle' });
        const dock = page.getByRole('navigation', { name: 'Elsewhere' });
        await dock.scrollIntoViewIfNeeded();
        await hydrated(page, 'ContactDock');
        const gh = (await dock.getByRole('link', { name: 'GitHub' }).boundingBox());
        await page.mouse.move(gh.x + gh.width / 2, gh.y + gh.height / 2, { steps: 6 });
        await page.waitForTimeout(700);
        await page.screenshot({ path: path.join(out, `dock-${w}-${scheme}.png`) });
      }
      console.log('states', w, scheme);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  stopServer();
}
