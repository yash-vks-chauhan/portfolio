// Milestone 7: the work index. The filter counts read 8 · 3 · 3 · 2 · 1 · 1 and filter the list (and the featured
// cards), by pointer or keyboard; the choice lives in the URL; every row leads to its page.
import { test, expect, type Page } from '@playwright/test';

const hydrated = (page: Page) => page.waitForSelector('astro-island[component-url*="/WorkFilter."]:not([ssr])', { state: 'attached' });
const filter = (page: Page) => page.getByRole('radiogroup', { name: 'Filter projects' });
const rows = (page: Page) => page.locator('.work-list > li:visible');

test('the filter counts match the projects', async ({ page }) => {
  await page.goto('/work');
  await hydrated(page);
  await expect(filter(page).getByRole('radio')).toHaveText(['All 8', 'AI systems 3', 'Full-stack 3', 'Research 2', 'Mobile 1', 'Experiments 1']);
  await expect(filter(page).getByRole('radio', { name: 'All 8' })).toHaveAttribute('aria-checked', 'true');
  await expect(rows(page)).toHaveCount(8);
});

test('choosing a category filters the list and the featured cards, and keeps it in the URL', async ({ page }) => {
  await page.goto('/work');
  await hydrated(page);
  await filter(page).getByRole('radio', { name: 'Mobile 1' }).click();
  await expect(filter(page).getByRole('radio', { name: 'Mobile 1' })).toHaveAttribute('aria-checked', 'true');
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toContainText('Gridee');
  await expect(page.locator('.work-featured')).toBeHidden();
  await expect(page).toHaveURL(/\/work\?filter=mobile$/);
  await expect(page.locator('#work-list').getByText('Showing 1 project: Mobile')).toBeAttached();

  await filter(page).getByRole('radio', { name: 'AI systems 3' }).click();
  await expect(rows(page)).toHaveCount(3);
  await expect(page.locator('.work-feature:visible')).toHaveCount(2);

  await filter(page).getByRole('radio', { name: 'All 8' }).click();
  await expect(rows(page)).toHaveCount(8);
  await expect(page).toHaveURL(/\/work$/);
});

test('the filter works from the keyboard', async ({ page }) => {
  await page.goto('/work');
  await hydrated(page);
  await filter(page).getByRole('radio', { name: 'All 8' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(filter(page).getByRole('radio', { name: 'AI systems 3' })).toHaveAttribute('aria-checked', 'true');
  await expect(filter(page).getByRole('radio', { name: 'AI systems 3' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(filter(page).getByRole('radio', { name: 'Experiments 1' })).toHaveAttribute('aria-checked', 'true');
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toContainText('CT denoising U-Net');
});

test('a filtered link opens filtered', async ({ page }) => {
  await page.goto('/work?filter=research');
  await hydrated(page);
  await expect(filter(page).getByRole('radio', { name: 'Research 2' })).toHaveAttribute('aria-checked', 'true');
  await expect(rows(page)).toHaveCount(2);
  await expect(rows(page).nth(0)).toContainText('EMS operational drift');
  await expect(rows(page).nth(1)).toContainText('First-author manuscript');
});

test('every row leads to its page, and phones never scroll sideways', async ({ page }, info) => {
  await page.goto('/work');
  const hrefs = await page.locator('.work-list a').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(hrefs).toEqual([
    '/work/glassbox',
    '/work/pulse',
    '/work/gridee',
    '/work/ems-research',
    '/research#ieee-manuscript',
    '/work/autoscaler',
    '/work/kalakraft',
    '/work/ct-denoising',
  ]);
  if (info.project.name === 'phone') {
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }
});
