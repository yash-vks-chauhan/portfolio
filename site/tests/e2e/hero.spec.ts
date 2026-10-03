// Milestone 2: hero and widgets. Reduced motion shows the still frame (no WebGL, no rolling numbers); otherwise the
// background goes live; the widgets open their source sheets by keyboard.
import { test, expect, type Page } from '@playwright/test';

async function hydrated(page: Page, name: string) {
  await page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });
}

test('the headline is a real h1 with the whole sentence as its name', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'I build AI systems you can audit.' })).toBeVisible();
});

test('reduced motion: still hero frame, no WebGL, final numbers', async ({ page }) => {
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

test('with motion allowed the WebGL background mounts and the numbers roll to their values', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('#top canvas')).toHaveCount(1, { timeout: 10_000 });
  await expect(page.locator('html')).toHaveClass(/motion-ok/);
  // React Bits Counter stacks all ten digits per place, so check the swap and the accessible name, not the text.
  const tests = page.locator('a.widget[data-cite="glassbox-ci"]');
  await expect(tests.locator('.roll-static')).toHaveCount(0, { timeout: 5_000 });
  await expect(tests).toHaveAttribute('aria-label', /254 backend tests passing in CI/);
});

test('a widget opens its source sheet by keyboard, and Esc returns focus to it', async ({ page }) => {
  await page.goto('/');
  await hydrated(page, 'SourceSheet');
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
