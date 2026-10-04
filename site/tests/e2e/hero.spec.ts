// Milestone 2: hero and widgets. Reduced motion and Save-Data show the still frame (no WebGL, no rolling numbers);
// otherwise the background goes live; the widgets open their source sheets by keyboard.
import { test, expect, type Page } from '@playwright/test';
import { pretendGpu } from '../support/gpu';

async function hydrated(page: Page, name: string) {
  await page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });
}

test('the headline is a real h1 with the whole sentence as its name', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'I build AI systems you can audit.' })).toBeVisible();
});

test('reduced motion: still hero frame, no WebGL, final numbers', async ({ page }) => {
  await pretendGpu(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(1500);
  await expect(page.locator('#top canvas')).toHaveCount(0);
  await expect(page.locator('#top .hero-still')).toBeVisible();
  const bg = await page.locator('#top .hero-still').evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/image-set|url\(/);
  await expect(page.locator('.widget-value').filter({ hasText: '254' })).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/motion-ok/);
});

test('Save-Data: still hero frame, no WebGL, final numbers', async ({ page }) => {
  await pretendGpu(page);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', { configurable: true, get: () => ({ saveData: true, effectiveType: '4g', addEventListener() {}, removeEventListener() {} }) });
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.waitForTimeout(1500);
  await expect(page.locator('#top canvas')).toHaveCount(0);
  await expect(page.locator('#top .hero-still')).toBeVisible();
  await expect(page.locator('.widget-value').filter({ hasText: '254' })).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/motion-ok/);
});

test('without a GPU (software WebGL) the hero keeps its still frame', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const software = await page.evaluate(() => {
    const gl = document.createElement('canvas').getContext('webgl');
    const info = gl?.getExtension('WEBGL_debug_renderer_info');
    return !gl || /swiftshader|llvmpipe|softpipe|software/i.test(String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER)));
  });
  test.skip(!software, 'this browser has a GPU');
  await page.waitForTimeout(1500);
  await expect(page.locator('#top canvas')).toHaveCount(0);
  await expect(page.locator('#top .hero-still')).toBeVisible();
});

test('with motion allowed the WebGL background mounts and the numbers roll to their values', async ({ page }) => {
  await pretendGpu(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('#top canvas')).toHaveCount(1, { timeout: 10_000 });
  await expect(page.locator('html')).toHaveClass(/motion-ok/);
  // React Bits Counter stacks all ten digits per place, so check the swap and the accessible name, not the text.
  const tests = page.locator('a.widget[data-cite="glassbox-ci"]');
  await expect(tests.locator('.roll-static')).toHaveCount(0, { timeout: 5_000 });
  await expect(tests).toHaveAttribute('aria-label', /254 backend tests passing in CI/);
});

test('if the scripts never arrive, the numbers still show (after 3 s)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // The inline head script still runs (motion allowed), but no island ever hydrates.
  await page.route(/\/_astro\/[^/]+\.js$/, (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/motion-ok/);
  const still = page.locator('a.widget[data-cite="glassbox-ci"] .roll-static');
  await expect(still).toBeHidden();
  await expect(still).toBeVisible({ timeout: 5_000 });
  await expect(still).toHaveText('254');
});

test('the WebGL background renders at most 1.5 device pixels per CSS pixel, and pauses off-screen', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await pretendGpu(page);
  // Count animation frames requested: the render loop asks for one per frame while it runs.
  await page.addInitScript(() => {
    const raf = window.requestAnimationFrame.bind(window);
    const w = window as Window & { __frames?: number };
    w.__frames = 0;
    window.requestAnimationFrame = (cb) => {
      w.__frames = (w.__frames ?? 0) + 1;
      return raf(cb);
    };
  });
  const framesIn = async (ms: number) => {
    const count = () => page.evaluate(() => (window as Window & { __frames?: number }).__frames ?? 0);
    const a = await count();
    await page.waitForTimeout(ms);
    return (await count()) - a;
  };
  await page.goto('/');
  const canvas = page.locator('#top canvas');
  await expect(canvas).toHaveCount(1, { timeout: 10_000 });
  const ratio = await canvas.evaluate((c: HTMLCanvasElement) => c.width / c.getBoundingClientRect().width);
  expect(ratio).toBeGreaterThan(1.4);
  expect(ratio).toBeLessThanOrEqual(1.5);
  expect(await framesIn(1000)).toBeGreaterThan(20);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(800);
  expect(await framesIn(1000)).toBeLessThan(5);
  await context.close();
});

test('a widget opens its source sheet by keyboard, and Esc returns focus to it', async ({ page }) => {
  await page.goto('/');
  await hydrated(page, 'Shell');
  const widget = page.locator('a.widget[data-cite="gridee-downloads"]');
  await expect(widget).toHaveAttribute('href', '#fn-1');
  await widget.focus();
  await page.keyboard.press('Enter');
  const sheet = page.getByRole('dialog', { name: 'Gridee downloads' });
  await expect(sheet).toBeVisible();
  await expect(sheet).toContainText('Source 1');
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(widget).toBeFocused();
});

test('widget numbers and footnotes agree', async ({ page }) => {
  await page.goto('/');
  for (const [i, id] of ['gridee-downloads', 'glassbox-eval-v4', 'glassbox-ci', 'iitm-internship'].entries()) {
    await expect(page.locator(`a.widget[data-cite="${id}"] .widget-badge`)).toHaveText(String(i + 1));
    await expect(page.locator(`#fn-${i + 1}`)).toBeAttached();
  }
});
