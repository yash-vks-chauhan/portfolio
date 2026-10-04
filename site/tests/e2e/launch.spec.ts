// Milestone 9: the launch checklist (IMPLEMENTATION.md §7) as tests: real controls with names, images, focus traps,
// the 404 page, structured data and the crawl files. axe runs in a11y.spec.ts and the JavaScript budget is
// `npm run budget`; reduced motion and Save-Data are in hero.spec.ts and work.spec.ts.
import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';

const routes = ['/', '/work', '/work/glassbox', '/work/pulse', '/work/gridee', '/work/ems-research', '/work/autoscaler', '/work/kalakraft', '/work/ct-denoising', '/research', '/about', '/no-such-page'];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.7) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

async function hydrated(page: Page, name: string) {
  await page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });
}

test.describe('controls', () => {
  for (const route of routes) {
    test(`${route}: every control is a real button or link, and has a name`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await scrollThrough(page);
      const problems = await page.evaluate(() => {
        const out: string[] = [];
        const show = (el: Element) => el.outerHTML.slice(0, 160);
        const native = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY'];
        const controlRoles = '[role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"], [role="option"], [role="tab"], [role="radio"], [onclick]';
        for (const el of document.querySelectorAll(controlRoles)) if (!native.includes(el.tagName)) out.push(`not a button or link: ${show(el)}`);
        // Only named scroll regions (so a keyboard can scroll them) may take focus without being a control.
        for (const el of document.querySelectorAll('[tabindex]:not([tabindex="-1"])')) {
          if (native.includes(el.tagName)) continue;
          if (el.getAttribute('role') === 'region' && (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby'))) continue;
          out.push(`focusable but not a control: ${show(el)}`);
        }
        for (const el of document.querySelectorAll('a[href], button')) {
          if (!el.getClientRects().length) continue;
          const name = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent?.trim() || el.getAttribute('title');
          if (!name) out.push(`no accessible name: ${show(el)}`);
        }
        return out;
      });
      expect(problems).toEqual([]);
    });
  }
});

test.describe('images', () => {
  for (const route of routes) {
    test(`${route}: AVIF or WebP with explicit sizes; lazy below the fold, never the largest one on screen`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('load');
      const atLoad = await page.evaluate(() =>
        [...document.images].map((img) => {
          const r = img.getBoundingClientRect();
          const w = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
          const h = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
          return {
            html: img.outerHTML.slice(0, 140),
            area: getComputedStyle(img).visibility === 'hidden' ? 0 : w * h,
            below: r.height > 0 && r.top >= innerHeight,
            loading: img.getAttribute('loading'),
            sized: Boolean(img.getAttribute('width') && img.getAttribute('height')),
          };
        }),
      );
      for (const img of atLoad) {
        expect(img.sized, `explicit width and height: ${img.html}`).toBe(true);
        if (img.below) expect(img.loading, `below the fold, so lazy: ${img.html}`).toBe('lazy');
      }
      // The largest image on the first screen is the LCP candidate: it must not wait for lazy loading.
      const largest = atLoad.reduce<(typeof atLoad)[number] | null>((best, img) => (img.area > (best?.area ?? 0) ? img : best), null);
      if (largest) expect(largest.loading, `largest image on screen: ${largest.html}`).not.toBe('lazy');

      await scrollThrough(page);
      const sources = await page.evaluate(async () => {
        const shown = [...document.images].filter((img) => img.getClientRects().length);
        // A lazy image that never comes near the screen (a carousel's last slides) never loads; don't wait for it.
        await Promise.all(shown.map((img) => Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, 1500))])));
        return shown.map((img) => img.currentSrc).filter(Boolean);
      });
      for (const src of sources) expect(src, 'served as AVIF, WebP or SVG').toMatch(/\.(avif|webp|svg)(\?.*)?$|^data:image\/(avif|webp|svg)/);
    });
  }
});

test.describe('dialogs', () => {
  test('the command bar and the source sheet keep focus inside until Esc', async ({ page }) => {
    await page.goto('/');
    await hydrated(page, 'Shell');
    await page.keyboard.press('Control+k');
    const command = page.getByRole('dialog');
    await expect(command).toBeVisible();
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(command).toBeHidden();

    const marker = page.locator('[data-cite="glassbox-eval-v4"]').first();
    await marker.focus();
    await page.keyboard.press('Enter');
    const sheet = page.getByRole('dialog', { name: 'glassbox-eval-v4 report' });
    await expect(sheet).toBeVisible();
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    await expect(marker).toBeFocused();
  });

  test('phones: the Experience sheet keeps focus inside until Esc, then returns it to the row', async ({ page }, info) => {
    test.skip(info.project.name !== 'phone', 'desktop shows the details beside the list');
    await page.goto('/');
    const row = page.locator('a.exp-row[href="/about#iitm"]');
    await row.scrollIntoViewIfNeeded();
    await hydrated(page, 'ExperienceSection');
    await row.focus();
    await page.keyboard.press('Enter');
    const sheet = page.getByRole('dialog', { name: 'IIT Madras' });
    await expect(sheet).toBeVisible();
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    await expect(row).toBeFocused();
  });
});

test.describe('404', () => {
  test('an unknown address gets the 404 page, with a way home, to the work and to search', async ({ page }) => {
    const res = await page.goto('/no-such-page');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    const main = page.locator('main');
    await expect(main.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    await expect(main.getByRole('link', { name: /work/i }).first()).toHaveAttribute('href', '/work');
    await hydrated(page, 'Shell');
    await main.getByRole('button', { name: /search/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});

test.describe('search engines and assistants', () => {
  test('every page has its own title, description, canonical address and preview image', async ({ page, request }) => {
    const seen = new Map<string, string>();
    for (const route of routes.filter((r) => r !== '/no-such-page')) {
      await page.goto(route);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      const image = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(description?.length, `${route} description`).toBeGreaterThan(50);
      expect(seen.has(title), `${route} title "${title}" is also used by ${seen.get(title)}`).toBe(false);
      seen.set(title, route);
      expect(new URL(canonical!).pathname).toBe(route);
      expect((await request.get(new URL(image!).pathname)).status(), `${route} preview image`).toBe(200);
    }
  });

  test('Home and About carry ProfilePage + Person JSON-LD with sameAs links', async ({ page }) => {
    for (const route of ['/', '/about']) {
      await page.goto(route);
      const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}');
      expect(data['@type']).toBe('ProfilePage');
      expect(data.mainEntity['@type']).toBe('Person');
      expect(data.mainEntity.name).toBe('Yash Chauhan');
      expect(data.mainEntity.sameAs.length).toBeGreaterThan(0);
      for (const url of data.mainEntity.sameAs) expect(url).toMatch(/^https:\/\//);
    }
  });

  test('robots.txt lets search engines and AI crawlers in, and points to the sitemap', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m);
    for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) expect(robots).toContain(`User-agent: ${bot}`);
    expect(robots).toMatch(/^Sitemap: https?:\/\/.+\/sitemap-index\.xml$/m);
  });

  test('the sitemap lists every page and leaves out the 404', async ({ request }) => {
    const index = await (await request.get('/sitemap-index.xml')).text();
    const sitemap = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    const urls = (await Promise.all(sitemap.map(async (p) => (await request.get(p)).text()))).join('\n');
    const pages = [...urls.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\.html$/, ''));
    for (const route of routes.filter((r) => r !== '/no-such-page')) expect(pages).toContain(route);
    expect(pages.some((p) => p.includes('404'))).toBe(false);
  });

  test('the résumé link works', async ({ request }) => {
    test.skip(!fs.existsSync('public/resume.pdf'), 'Blocked on Yash: add public/resume.pdf (a version without the phone number or the double-blind paper)');
    const res = await request.get('/resume.pdf');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });
});
