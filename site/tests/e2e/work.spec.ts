// Milestone 4: Selected work. Cards lead to their case studies, the Research folder is a real toggle, the GlassBox
// screenshot tilts only with motion and a fine pointer, and on phones the More-work rows swipe for Code and Demo.
import { test, expect, type Page } from '@playwright/test';

const hydrated = (page: Page, name: string) =>
  page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });

const work = (page: Page) => page.locator('#work');

test('each card leads to its case study', async ({ page }, info) => {
  await page.goto('/#work');
  await expect(work(page).getByRole('heading', { level: 2, name: 'Built, shipped, measured.' })).toBeVisible();
  await expect(work(page).getByRole('link', { name: 'View case study' })).toHaveAttribute('href', '/work/glassbox');
  await expect(work(page).getByRole('link', { name: 'Pulse', exact: true })).toHaveAttribute('href', '/work/pulse');
  await expect(work(page).getByRole('link', { name: 'Gridee', exact: true })).toHaveAttribute('href', '/work/gridee');
  if (info.project.name === 'desktop') {
    await expect(work(page).getByRole('link', { name: 'All work (08)' })).toHaveAttribute('href', '/work');
    await expect(work(page).getByRole('link', { name: 'Drift and equity in emergency medical services.' })).toHaveAttribute('href', '/research');
    await expect(work(page).getByRole('link', { name: /^Live demo/ })).toHaveAttribute('target', '_blank');
    for (const [name, href] of [
      ['Autoscaler', '/work/autoscaler'],
      ['Kalakraft', '/work/kalakraft'],
      ['CT denoising U-Net', '/work/ct-denoising'],
    ]) {
      await expect(work(page).locator('.more-list a.more-row', { hasText: name })).toHaveAttribute('href', href);
    }
  } else {
    // Phones: the Research card, the stack chips and the demo link drop away, as drawn.
    await expect(work(page).locator('.card-research')).toBeHidden();
    await expect(work(page).getByRole('link', { name: /^Live demo/ })).toBeHidden();
  }
});

test('the whole Pulse card is its link', async ({ page }) => {
  await page.goto('/#work');
  const result = work(page).locator('.card-pulse .pulse-result');
  await result.scrollIntoViewIfNeeded();
  const box = (await result.boundingBox())!;
  // The demo area, away from the title, still hits the title's stretched link.
  const hit = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('a')?.getAttribute('href'), [box.x + box.width / 2, box.y + box.height / 2]);
  expect(hit).toBe('/work/pulse');
});

test('the Research folder opens and closes', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'the Research card is desktop-only, as drawn');
  await page.goto('/#work');
  const folder = page.getByRole('button', { name: /research folder/ });
  await folder.scrollIntoViewIfNeeded();
  await hydrated(page, 'ResearchFolder');
  await expect(folder).toHaveAttribute('aria-expanded', 'false');
  await folder.click();
  await expect(folder).toHaveAttribute('aria-expanded', 'true');
  await expect(folder).toHaveAccessibleName('Close the research folder');
  await page.keyboard.press('Enter');
  await expect(folder).toHaveAttribute('aria-expanded', 'false');
});

async function tiltAfterHover(page: Page) {
  const shot = work(page).locator('.glassbox-shot');
  await shot.scrollIntoViewIfNeeded();
  await hydrated(page, 'TiltedCard');
  const box = (await shot.boundingBox())!;
  await page.mouse.move(box.x + 40, box.y + 40);
  await page.mouse.move(box.x + 60, box.y + 50, { steps: 4 });
  await page.waitForTimeout(500);
  return shot.locator('figure > div').first().evaluate((el) => getComputedStyle(el).transform);
}

test('the GlassBox screenshot tilts under the pointer', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'tilt needs a fine pointer');
  await page.goto('/#work');
  expect(await tiltAfterHover(page)).not.toBe('none');
});

test('under reduced motion the GlassBox screenshot stays put', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'tilt needs a fine pointer');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#work');
  expect(await tiltAfterHover(page)).toBe('none');
});

test('phones: More-work rows swipe for Code and Demo, and a tap opens the project', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'swipe rows are the phone layout');
  await page.goto('/#work');
  const row = page.getByRole('group', { name: 'Kalakraft' });
  await row.scrollIntoViewIfNeeded();
  await hydrated(page, 'MoreWorkSwipe');

  // Keyboard users reveal the actions with the row's toggle.
  const toggle = row.getByRole('button', { name: '2 actions' });
  await toggle.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(row.getByRole('button', { name: 'Demo' })).toBeVisible();
  await expect(row.getByRole('button', { name: 'Code' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  // A drag to the left opens the drawer.
  const box = (await row.boundingBox())!;
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width - 30, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 230, y, { steps: 12 });
  await page.mouse.up();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(row.getByRole('button', { name: 'Demo' })).toBeVisible();

  // A tap on a closed row opens its project page.
  const autoscaler = page.getByRole('group', { name: 'Autoscaler' });
  const a = (await autoscaler.boundingBox())!;
  await page.mouse.click(a.x + 120, a.y + a.height / 2);
  await expect(page).toHaveURL(/\/work\/autoscaler$/);
});
