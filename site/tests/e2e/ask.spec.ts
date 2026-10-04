// Milestone 3: Ask my portfolio. The suggestions behave like the Components artboard (cited answers and one refusal),
// typed questions are matched or refused, and answer citations open the source sheet.
import { test, expect, type Page } from '@playwright/test';

async function ready(page: Page) {
  await page.goto('/#ask');
  await page.waitForSelector('astro-island[component-url*="/AskPanel."]:not([ssr])', { state: 'attached' });
  await page.waitForSelector('astro-island[component-url*="/Shell."]:not([ssr])', { state: 'attached' });
}

const panel = (page: Page) => page.locator('.ask-panel');
const lastTurn = (page: Page) => panel(page).locator('.ask-turn:visible').last();

async function askTyped(page: Page, q: string) {
  await page.getByRole('textbox', { name: 'Ask a question about Yash’s work' }).fill(q);
  await page.keyboard.press('Enter');
}

test('the panel opens with a cited answer and a refusal, as drawn', async ({ page }, info) => {
  await ready(page);
  const first = panel(page).locator('.ask-turn').first();
  await expect(first.locator('.ask-question')).toHaveText('How do you know GlassBox doesn’t hallucinate?');
  await expect(first.locator('.ask-bubble:visible')).toContainText('zero unsupported claims');
  if (info.project.name === 'desktop') {
    await expect(first.getByRole('button', { name: /Source 2: GlassBox architecture/ }).first()).toBeVisible();
    const second = panel(page).locator('.ask-turn').nth(1);
    await expect(second).toContainText('No source · refused');
    await expect(second).toContainText('Ask me in person.');
  } else {
    // Phones show one turn and no suggestion chips.
    await expect(panel(page).locator('.ask-turn:visible')).toHaveCount(1);
    await expect(panel(page).locator('.ask-suggestion').first()).toBeHidden();
  }
});

test('the suggestions give cited answers, and the film question is refused', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'suggestion chips are desktop-only, as drawn');
  await ready(page);
  await page.getByRole('button', { name: 'What did you build at Gridee?' }).click();
  await expect(lastTurn(page)).toContainText('8,000+ combined downloads', { timeout: 10_000 });
  await expect(lastTurn(page).locator('.ask-source-chip')).toContainText('Play Console + App Store Connect');
  await expect(page.getByRole('button', { name: 'What did you build at Gridee?' })).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: 'How does Pulse keep the LLM away from SQL?' }).click();
  await expect(lastTurn(page)).toContainText('never sees PII', { timeout: 10_000 });
  await expect(lastTurn(page).locator('.cite')).toHaveCount(1);

  await page.getByRole('button', { name: 'What’s your favourite film?' }).click();
  await expect(lastTurn(page)).toContainText('No source · refused', { timeout: 10_000 });
  await expect(lastTurn(page)).toContainText('Nothing I’ve published here answers that, so I won’t guess.');
  await expect(panel(page).locator('.ask-turn')).toHaveCount(2);
});

test('typed questions are matched or refused', async ({ page }) => {
  await ready(page);
  await askTyped(page, 'How do you know GlassBox doesn’t hallucinate?');
  await expect(lastTurn(page)).toContainText('a 95% interval of 0–2.1%', { timeout: 10_000 });
  await askTyped(page, 'Do you like cricket?');
  await expect(lastTurn(page)).toContainText('No source · refused', { timeout: 10_000 });
});

test('a citation in an answer opens its source sheet', async ({ page }) => {
  await ready(page);
  await askTyped(page, 'What did you build at Gridee?');
  const marker = lastTurn(page).locator('.cite').first();
  await expect(marker).toBeVisible({ timeout: 10_000 });
  await marker.click();
  await expect(page.getByRole('dialog', { name: 'Gridee downloads' })).toBeVisible();
  await page.keyboard.press('Escape');
});

test('under reduced motion the answer appears at once', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await ready(page);
  await askTyped(page, 'Is the Autoscaler finished?');
  await expect(lastTurn(page)).toContainText('labelled “In progress”', { timeout: 500 });
  await expect(page.locator('.ask-panel [role="status"][aria-busy]')).toHaveCount(0);
});
