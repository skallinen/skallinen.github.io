import { test, expect } from '@playwright/test';

async function enter(page, who = 'demo-morgan') {
  await page.goto('/');
  await page.locator('#demo-user').selectOption(who);
  await page.getByRole('button', { name: 'Enter demo' }).click();
  await expect(page.locator('.day-group').first()).toContainText('Day 03');
}

test('mobile reading, checkmark, private 140-character thought and reverse chronological feed', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enter(page);
  expect(await page.locator('.day-heading h2').allTextContents()).toEqual(['Day 03 Today', expect.stringContaining('Day 02'), expect.stringContaining('Day 01')]);
  const first = page.locator('.reading-card').first();
  await first.getByRole('button', { name: 'Read the poem' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.reading-text')).not.toBeEmpty();
  await page.getByRole('button', { name: 'I’ve read this' }).click();
  await expect(first).toContainText('Read on the day');
  const textarea = first.locator('textarea');
  await textarea.fill('x'.repeat(141));
  await expect(first.getByRole('button', { name: 'Save thought' })).toBeDisabled();
  await textarea.fill('A small daily ritual. This one stayed with me.');
  await first.getByRole('button', { name: 'Save thought' }).click();
  await expect(page.locator('#toast')).toContainText('Thought saved');
  await expect(first).toContainText('Private until the reveal');
  await expect(first.locator('.tweet')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/mobile-feed.png', fullPage: true });
});

test('another participant cannot see today’s comment; yesterday unlocks when last reader withdraws', async ({ page }) => {
  await enter(page, 'demo-tess');
  await expect(page.locator('.reading-card').first().locator('.tweet')).toHaveCount(0);
  const yesterday = page.locator('.day-group').nth(1).locator('.reading-card').first();
  await expect(yesterday).toContainText('Waiting for this day’s reading group');
  await expect(yesterday.locator('.tweet')).toHaveCount(0);
  await yesterday.getByRole('button', { name: 'Not reading today' }).click();
  await expect(yesterday).toContainText('A thought waiting for the last reader.');
  await expect(yesterday).toContainText('1 on time');
  await page.screenshot({ path: 'test-results/desktop-feed.png', fullPage: true });
});
