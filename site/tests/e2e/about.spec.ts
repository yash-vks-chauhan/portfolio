// Milestone 5: Experience, Toolkit and Contact. Rows select into the detail sheet (desktop) or open a bottom sheet
// (phones); tools show where they were used; the email copies with a toast; the Dock is real links that magnify
// only with motion and a fine pointer.
import { test, expect, type Page } from '@playwright/test';

const exp = (page: Page) => page.locator('#about');

const hydrated = (page: Page, ...names: string[]) =>
  Promise.all(names.map((name) => page.waitForSelector(`astro-island[component-url*="/${name}."]:not([ssr])`, { state: 'attached' })));

test.describe('experience', () => {
  test('desktop: a row selects into the detail sheet, and its citation opens the source', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'the docked sheet is the desktop layout');
    await page.goto('/#about');
    await hydrated(page, 'ExperienceSection', 'Shell');
    const detail = page.getByRole('complementary', { name: /details$/ });
    await expect(exp(page).getByRole('link', { name: /^Gridee/ }).first()).toHaveAttribute('aria-current', 'true');
    await expect(detail).toHaveAccessibleName('Gridee details');
    await expect(detail).toContainText('Co-Founder & Founding Engineer · Jan 2026 – now');
    await expect(detail.getByRole('link', { name: 'Google Play' })).toHaveAttribute('target', '_blank');

    await exp(page).getByRole('link', { name: /^IIT Madras/ }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(detail).toHaveAccessibleName('IIT Madras details');
    await expect(detail).toContainText('Research Intern · Mar 2025 – Mar 2026');
    await expect(detail.getByRole('link', { name: 'Case study' })).toHaveAttribute('href', '/work/ems-research');

    await exp(page).getByRole('link', { name: /^Hindalco Industries/ }).click();
    await expect(detail).toContainText('Summer Intern, Electrical & Instrumentation · Jun – Jul 2025');
    await detail.getByRole('link', { name: /^Source 5: / }).click();
    await expect(page.getByRole('dialog', { name: 'Hindalco internship report' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('desktop: certifications link out to each credential', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'certifications are listed on desktop, as drawn');
    await page.goto('/#about');
    const aws = page.getByRole('link', { name: /AWS Certified Cloud Practitioner/ });
    await expect(aws).toHaveAttribute('href', /credly\.com/);
    await expect(aws).toHaveAttribute('target', '_blank');
    await expect(aws).toContainText('Valid to Jan 2029');
  });

  test('phones: a row opens a bottom sheet; Esc closes it and focus returns to the row', async ({ page }, info) => {
    test.skip(info.project.name !== 'phone', 'the bottom sheet is the phone layout');
    await page.goto('/#about');
    await hydrated(page, 'ExperienceSection', 'Shell');
    await expect(page.getByRole('link', { name: /AWS Certified/ })).toBeHidden();
    const row = exp(page).getByRole('link', { name: /^IIT Madras/ });
    await row.click();
    const sheet = page.getByRole('dialog', { name: 'IIT Madras' });
    await expect(sheet).toBeVisible();
    await expect(sheet).toContainText('100+ data-quality checks');

    // The sheet's citation opens the source sheet on top; closing that leaves the details open.
    await sheet.getByRole('link', { name: /^Source 4: / }).click();
    await expect(page.getByRole('dialog', { name: 'IIT Madras research internship' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'IIT Madras research internship' })).toHaveCount(0);
    await expect(sheet).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(sheet).toHaveCount(0);
    await expect(row).toBeFocused();
  });
});

test.describe('toolkit', () => {
  test('tools show where they were used', async ({ page }, info) => {
    await page.goto('/');
    const section = page.locator('section[aria-labelledby="toolkit-h"]');
    await section.scrollIntoViewIfNeeded();
    await hydrated(page, 'ToolkitGrid');
    const panel = page.locator('#used-in');
    await expect(section.getByRole('button', { name: 'Python' })).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.getByRole('link')).toHaveText(['GlassBox', 'Autoscaler', 'IIT Madras EMS', 'IEEE manuscript', 'CT denoising']);
    await expect(panel.getByRole('link', { name: 'IEEE manuscript' })).toHaveAttribute('href', '/research#ieee-manuscript');

    await section.getByRole('button', { name: 'Kotlin' }).click();
    await expect(section.getByRole('button', { name: 'Kotlin' })).toHaveAttribute('aria-pressed', 'true');
    await expect(section.getByRole('button', { name: 'Python' })).toHaveAttribute('aria-pressed', 'false');
    await expect(panel).toContainText(/used in 1 project$|Used in 1 project/);
    await expect(panel.getByRole('link')).toHaveText(['Gridee']);
    await expect(panel.getByRole('link', { name: 'Gridee' })).toHaveAttribute('href', '/work/gridee');

    const visible = section.getByRole('button').filter({ visible: true });
    if (info.project.name === 'phone') {
      // Eight tools on phones, in the drawn order.
      const names = await visible.evaluateAll((els) =>
        els
          .map((el) => ({ name: (el.querySelector('.gi-label:not(.max-md\\:hidden)') ?? el).textContent?.trim(), top: el.getBoundingClientRect().top, left: el.getBoundingClientRect().left }))
          .sort((a, b) => a.top - b.top || a.left - b.left)
          .map((x) => x.name),
      );
      expect(names).toEqual(['Python', 'TypeScript', 'FastAPI', 'Next.js', 'Kotlin', 'Postgres', 'Docker', 'AWS']);
    } else {
      await expect(visible).toHaveCount(12);
    }
  });
});

test.describe('contact', () => {
  test('Copy copies the email and shows the toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/#contact');
    await hydrated(page, 'Shell');
    await page.getByRole('button', { name: 'Copy email address' }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Email copied' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('yash.vks.chauhan@gmail.com');
  });

  test('the card links: email, résumé, GitHub and LinkedIn', async ({ page }, info) => {
    await page.goto('/#contact');
    const card = page.locator('.contact-card');
    await expect(card.getByRole('link', { name: 'yash.vks.chauhan@gmail.com' })).toHaveAttribute('href', 'mailto:yash.vks.chauhan@gmail.com');
    if (info.project.name === 'desktop') {
      await expect(card.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:yash.vks.chauhan@gmail.com');
      await expect(card.getByRole('link', { name: 'Résumé (PDF)' })).toHaveAttribute('href', '/resume.pdf');
      await expect(card.getByRole('link', { name: /github\.com\/yash-vks-chauhan/ })).toHaveAttribute('href', 'https://github.com/yash-vks-chauhan');
    } else {
      await expect(card.locator('.contact-tile')).toHaveText(['email', 'GitHub', 'LinkedIn', 'résumé']);
      await expect(page.getByRole('navigation', { name: 'Elsewhere' })).toBeHidden();
    }
  });

  test('the Dock is four links that magnify under the pointer', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'the Dock is desktop-only, as drawn');
    await page.goto('/#contact');
    const dock = page.getByRole('navigation', { name: 'Elsewhere' });
    await dock.scrollIntoViewIfNeeded();
    await hydrated(page, 'ContactDock');
    await expect(dock.getByRole('link')).toHaveCount(4);
    const github = dock.getByRole('link', { name: 'GitHub' });
    await expect(github).toHaveAttribute('href', 'https://github.com/yash-vks-chauhan');
    const box = (await github.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
    await expect.poll(async () => (await github.boundingBox())!.width).toBeGreaterThan(64);
    await expect(dock.getByText('GitHub', { exact: true })).toBeVisible();
    await page.mouse.move(0, 0);
    await expect.poll(async () => Math.round((await github.boundingBox())!.width)).toBe(54);
  });

  test('under reduced motion the Dock stays a plain row', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'the Dock is desktop-only, as drawn');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#contact');
    const dock = page.getByRole('navigation', { name: 'Elsewhere' });
    await dock.scrollIntoViewIfNeeded();
    await hydrated(page, 'ContactDock');
    const github = dock.getByRole('link', { name: 'GitHub' });
    const box = (await github.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
    await page.waitForTimeout(400);
    expect(Math.round((await github.boundingBox())!.width)).toBe(54);
  });
});
