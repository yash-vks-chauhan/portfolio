// Milestone 1: the shell. Theme survives reload with no flash; nav and tab bar work at 390 px; focus rings show;
// the command bar and source sheet open and close by keyboard; the "Email copied" toast appears.
import { test, expect, type Page } from '@playwright/test';

/** Presses ⌘K until the command bar opens (its listener attaches in an effect just after hydration). */
async function openCommandBar(page: Page) {
  const dialog = page.getByRole('dialog', { name: 'Search the site' });
  await expect(async () => {
    if (!(await dialog.isVisible())) await page.keyboard.press('ControlOrMeta+k');
    await expect(dialog).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 5_000 });
  return dialog;
}

/** Waits until the named islands have hydrated (Astro drops the ssr attribute). */
async function hydrated(page: Page, ...names: string[]) {
  for (const name of names) {
    await page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' });
  }
}

test.describe('theme', () => {
  test('a chosen theme survives reload without a flash of the other one', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'the switch lives in the desktop nav');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await hydrated(page, 'ThemeSwitch');
    await page.getByRole('button', { name: 'Dark appearance' }).first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    // Record the body colour at the earliest moment the parser reaches <body>, before any island runs.
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        (window as unknown as { __firstBg: string }).__firstBg = getComputedStyle(document.body).backgroundColor;
      });
    });
    await page.reload();
    const firstBg = await page.evaluate(() => (window as unknown as { __firstBg: string }).__firstBg);
    expect(firstBg).toBe('rgb(0, 0, 0)');
    await expect(page.getByRole('button', { name: 'Dark appearance' }).first()).toHaveAttribute('aria-pressed', 'true');
  });

  test('without a choice the page follows the OS setting', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('navigation', () => {
  test('desktop shows the nav capsule; phones show the header and the tab bar', async ({ page }, info) => {
    await page.goto('/');
    const capsule = page.getByRole('navigation', { name: 'Main' });
    const tabs = page.getByRole('navigation', { name: 'Tabs' });
    if (info.project.name === 'desktop') {
      await expect(capsule).toBeVisible();
      await expect(tabs).toBeHidden();
    } else {
      await expect(capsule).toBeHidden();
      await expect(tabs).toBeVisible();
      await expect(tabs.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
      await expect(page.getByRole('link', { name: 'Ask my portfolio' })).toBeVisible();
      const box = await tabs.boundingBox();
      expect(box && box.y + box.height).toBeLessThanOrEqual(844 - 15);
    }
  });

  test('every focusable control shows a focus ring', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      const ring = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return 'none';
        const s = getComputedStyle(el);
        return `${s.outlineStyle} ${s.outlineWidth}`;
      });
      expect(ring, `focus ring on tab stop ${i + 1}`).toMatch(/^(solid|auto) [1-9]/);
    }
  });
});

test.describe('command bar', () => {
  test('⌘K opens it, it filters, Esc closes it', async ({ page }) => {
    await page.goto('/');
    await hydrated(page, 'Shell');
    const dialog = await openCommandBar(page);
    await page.keyboard.type('gridee');
    await expect(dialog.getByRole('option', { name: /Gridee/ })).toBeVisible();
    await expect(dialog.getByRole('option', { name: /GlassBox/ })).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('"Copy email" copies and shows the toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await hydrated(page, 'Shell');
    await openCommandBar(page);
    await page.keyboard.type('copy email');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status').filter({ hasText: 'Email copied' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('yash.vks.chauhan@gmail.com');
  });
});

test.describe('source sheet', () => {
  test('a source marker opens the sheet by keyboard; Esc closes it and focus returns', async ({ page }) => {
    await page.goto('/');
    await hydrated(page, 'Shell');
    const marker = page.locator('[data-cite="glassbox-eval-v4"]').first();
    await marker.focus();
    await page.keyboard.press('Enter');
    const sheet = page.getByRole('dialog', { name: 'glassbox-eval-v4 report' });
    await expect(sheet).toBeVisible();
    await expect(sheet).toContainText('checked 2 Oct 2026');
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    await expect(marker).toBeFocused();
  });
});
