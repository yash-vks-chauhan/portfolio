// Milestone 8: phones. Every page fits 390 px without sideways scrolling, and the floating tab bar (Home, Work,
// About, Contact and the round Ask button) is on every page, marking where you are.
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/work', '/work/glassbox', '/work/pulse', '/work/gridee', '/work/ems-research', '/work/autoscaler', '/work/kalakraft', '/work/ct-denoising'];

test.describe('phones', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 500, 'phone layout only');

  for (const path of PAGES) {
    test(`${path} fits the screen and has the tab bar`, async ({ page }) => {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
      const tabs = page.getByRole('navigation', { name: 'Tabs' });
      await expect(tabs).toBeVisible();
      await expect(tabs.getByRole('link', { name: 'Ask my portfolio' })).toHaveAttribute('href', path === '/' ? '#ask' : '/#ask');
      const current = path === '/' ? 'Home' : 'Work';
      await expect(tabs.getByRole('link', { name: current })).toHaveAttribute('aria-current', 'page');
      // The page can scroll past the tab bar: the last line isn't hidden under it.
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      await page.waitForTimeout(100);
      const footerBottom = await page.locator('footer').last().evaluate((el) => {
        const text = [...el.querySelectorAll('span, a, li')].filter((n) => n.getClientRects().length > 0).at(-1);
        return text ? text.getBoundingClientRect().bottom : 0;
      });
      const barTop = await tabs.evaluate((el) => el.getBoundingClientRect().top);
      expect(footerBottom).toBeLessThanOrEqual(barTop);
    });
  }
});
