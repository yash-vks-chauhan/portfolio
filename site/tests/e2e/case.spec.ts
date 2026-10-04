// Milestone 6: the case-study template. Every page renders with resolvable citations; "On this page" follows the
// reader; the preview carousel steps; phones keep the desktop-only sections behind disclosures; share and copy work.
import { test, expect, type Page } from '@playwright/test';

const PAGES = [
  ['/work/glassbox', 'GlassBox'],
  ['/work/pulse', 'Pulse'],
  ['/work/gridee', 'Gridee'],
  ['/work/ems-research', 'EMS operational drift'],
  ['/work/autoscaler', 'Autoscaler'],
  ['/work/kalakraft', 'Kalakraft'],
  ['/work/ct-denoising', 'CT denoising U-Net'],
] as const;

const hydrated = (page: Page, ...names: string[]) =>
  Promise.all(names.map((name) => page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' })));

for (const [path, name] of PAGES) {
  test(`${name}: renders, and every citation resolves to its numbered source`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name);
    const markers = await page.locator('main [data-cite]').evaluateAll((els) => els.map((el) => [el.getAttribute('data-cite'), el.getAttribute('data-n'), el.getAttribute('href')]));
    expect(markers.length).toBeGreaterThan(0);
    for (const [, n, href] of markers) {
      expect(href).toBe(`#fn-${n}`);
      await expect(page.locator(`#fn-${n}`)).toHaveCount(1);
    }
    // On phones nothing scrolls sideways (the stat strip and the carousel scroll inside themselves).
    if (info.project.name === 'phone') {
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    }
    expect(errors).toEqual([]);
  });
}

test('a citation opens its source sheet', async ({ page }) => {
  await page.goto('/work/glassbox');
  await hydrated(page, 'SourceSheet');
  await page.locator('.case-summary [data-cite]:visible').first().click();
  await expect(page.getByRole('dialog', { name: 'glassbox-eval-v4 report' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('"On this page" marks the section you are reading', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'the contents list is desktop-only, as drawn');
  await page.goto('/work/glassbox');
  const toc = page.getByRole('navigation', { name: 'On this page' });
  await expect(toc.getByRole('link', { name: 'Problem' })).toHaveAttribute('aria-current', 'true');
  await page.locator('#evaluation').evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect(toc.getByRole('link', { name: 'Evaluation' })).toHaveAttribute('aria-current', 'true');
  await expect(toc.getByRole('link', { name: 'Problem' })).not.toHaveAttribute('aria-current', 'true');
  await expect(toc).toContainText(/\d+ min read · 5 sources/);
});

test('the preview carousel steps through the screenshots', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'phones swipe the strip; the buttons are desktop-only');
  await page.goto('/work/glassbox#preview-h');
  await hydrated(page, 'PreviewCarousel');
  const prev = page.getByRole('button', { name: 'Previous screenshot' });
  const next = page.getByRole('button', { name: 'Next screenshot' });
  await expect(prev).toBeDisabled();
  await expect(next).toBeEnabled();
  await next.click();
  await expect(prev).toBeEnabled();
  await prev.click();
  await expect(prev).toBeDisabled();

  // Gridee's two screenshots fit side by side, so there is nothing to step through.
  await page.goto('/work/gridee#preview-h');
  await hydrated(page, 'PreviewCarousel');
  await expect(page.getByRole('button', { name: 'Next screenshot' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Previous screenshot' })).toBeDisabled();
});

test('phones: the drawn sections inline, the rest behind disclosures', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'the condensed layout is the phone layout');
  await page.goto('/work/glassbox');
  await expect(page.getByRole('heading', { name: 'How an answer is made' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeHidden();

  const more = page.locator('details', { hasText: '2 more decisions' });
  await more.locator('summary').click();
  await expect(more).toContainText('Small scikit-learn scorers, not an LLM judge');
  await expect(more).toContainText('Hash-chain the log per tenant; forbid DELETE');

  const ops = page.locator('details', { has: page.locator('summary', { hasText: 'Tests & ops' }) });
  await expect(ops.locator('.ops-value').first()).toBeHidden();
  await ops.locator('summary').click();
  await expect(ops.locator('.ops-value').first()).toHaveText(/254/);

  // The round back button leads to the work index.
  await expect(page.getByRole('link', { name: 'Back to work' })).toHaveAttribute('href', '/work');
});

test('share copies the link where there is no share sheet', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() => Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }));
  await page.goto('/work/pulse');
  await hydrated(page, 'Toaster');
  await page.getByRole('button', { name: /^Share this/ }).filter({ visible: true }).first().click();
  await expect(page.getByRole('status').filter({ hasText: 'Link copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/\/work\/pulse$/);
});

test('the Reproduce block copies its command', async ({ page, context }, info) => {
  test.skip(info.project.name !== 'desktop', 'the Reproduce block is desktop-only, as drawn');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/work/glassbox#evaluation');
  await hydrated(page, 'Toaster');
  await page.getByRole('button', { name: 'Copy the command' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Command copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('make eval');
});

test('a placeholder link is not clickable until it is filled in', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', '"Watch 90 s" is desktop-only, as drawn');
  await page.goto('/work/glassbox');
  const video = page.locator('.case-actions .is-pending', { hasText: 'Watch 90 s' });
  await expect(video).toHaveAttribute('aria-disabled', 'true');
  await expect(page.locator('.case-actions a', { hasText: 'Watch 90 s' })).toHaveCount(0);
});
