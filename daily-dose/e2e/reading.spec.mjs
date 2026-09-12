import { test, expect } from '@playwright/test';

async function enter(page, who = 'demo-morgan') {
  await page.goto('/');
  await page.locator('#demo-user').selectOption(who);
  await page.getByRole('button', { name: 'Enter demo' }).click();
  await expect(page.locator('.day-group').first()).toContainText('Day 03');
}
test('mobile completion, draft rating, immediate personal reveal and reverse chronological feed', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await enter(page);
  expect(await page.locator('.day-heading h2').allTextContents()).toEqual(['Day 03 Today',expect.stringContaining('Day 02'),expect.stringContaining('Day 01')]);
  const card=page.locator('.reading-card').first();
  await card.getByRole('button',{name:'Read the poem'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.reading-text')).not.toBeEmpty();
  await page.getByRole('button',{name:'I’ve read this'}).click();
  await expect(card).toContainText('Read on the day');
  await expect(page.getByRole('button',{name:'Not reading today'})).toHaveCount(0);
  await expect(card.getByRole('button',{name:'Finish & reveal'})).toBeDisabled();
  await card.locator('textarea').fill('A small daily ritual. This one stayed with me.');
  await expect(card.getByRole('button',{name:'Finish & reveal'})).toBeDisabled();
  await card.getByRole('button',{name:'0 stars',exact:true}).click();
  await expect(card.locator('textarea')).toHaveValue('A small daily ritual. This one stayed with me.');
  await expect(card.locator('.tweet')).toHaveCount(0);
  await card.locator('textarea').fill('🙂'.repeat(141));
  await expect(card.getByRole('button',{name:'Finish & reveal'})).toBeDisabled();
  await card.locator('textarea').fill('A small daily ritual. This one stayed with me.');
  await card.getByRole('button',{name:'Finish & reveal'}).click();
  await expect(card.locator('.tweet')).toContainText('A small daily ritual.');
  await expect(card.locator('.rating-summary')).toContainText('0.0 / 5');
  await expect(card.getByRole('button',{name:'Save changes'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/mobile-personal-reveal.png',fullPage:true});
});

test('another participant sees no responses until their own submission, without waiting for the day or other people', async ({ page }) => {
  await enter(page,'demo-tess');
  const card=page.locator('.reading-card').first();
  await expect(card.locator('.tweet')).toHaveCount(0);
  await card.getByRole('button',{name:'Check off as read'}).click();
  await card.getByRole('button',{name:'5 stars',exact:true}).click();
  await card.locator('textarea').fill('Tess has finished too.');
  await expect(card.locator('.tweet')).toHaveCount(0);
  await card.getByRole('button',{name:'Finish & reveal'}).click();
  await expect(card.locator('.tweet')).toHaveCount(2);
  await expect(card).toContainText('A small daily ritual.');
  await expect(card.locator('.rating-summary')).toContainText('2.5 / 5');
  const yesterday=page.locator('.day-group').nth(1).locator('.reading-card').first();
  await expect(yesterday.locator('.tweet')).toHaveCount(0);
  await yesterday.getByRole('button',{name:'Check off as read'}).click();
  await yesterday.getByRole('button',{name:'3 stars',exact:true}).click();
  await yesterday.locator('textarea').fill('Catching up.');
  await yesterday.getByRole('button',{name:'Finish & reveal'}).click();
  await expect(yesterday).toContainText('A thought shared without waiting for anyone.');
  await expect(yesterday).toContainText('1 on time · 1 caught up');
});

test('ratings persist and clear as drafts; undo retracts submission, retains drafts and requires resubmission', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await enter(page,'demo-alex');
  const card=page.locator('.reading-card').first();
  await card.getByRole('button',{name:'Check off as read'}).click();
  await card.getByRole('button',{name:'0 stars',exact:true}).click();
  await enter(page,'demo-alex');
  await expect(card.locator('.rating-value')).toHaveText('0 / 5');
  await card.getByRole('button',{name:'Clear rating'}).click();
  await expect(card.locator('.rating-value')).toHaveText('Not rated');
  await card.getByRole('button',{name:'5 stars',exact:true}).click();
  await card.locator('textarea').fill('Alex finished.');
  await card.getByRole('button',{name:'Finish & reveal'}).click();
  await expect(card.locator('.tweet')).toHaveCount(3);
  page.once('dialog',dialog=>dialog.accept());
  await card.getByRole('button',{name:'Mark as unread'}).click();
  await expect(card.locator('.tweet')).toHaveCount(0);
  await expect(card.getByRole('button',{name:'Check off as read'})).toBeVisible();
  await enter(page,'demo-morgan');
  await expect(card.locator('.tweet')).toHaveCount(2);
  await enter(page,'demo-alex');
  await card.getByRole('button',{name:'Check off as read'}).click();
  await expect(card.locator('textarea')).toHaveValue('Alex finished.');
  await expect(card.locator('.rating-value')).toHaveText('5 / 5');
  await expect(card.locator('.tweet')).toHaveCount(0);
  await card.getByRole('button',{name:'Finish & reveal'}).click();
  await expect(card.locator('.tweet')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/mobile-unread-resubmit.png',fullPage:true});
});

test('accidental unsubmitted checkmark can be undone immediately',async({page})=>{
  await enter(page,'demo-alex');
  const card=page.locator('.reading-card').nth(1);
  await card.getByRole('button',{name:'Check off as read'}).click();
  await card.getByRole('button',{name:'Mark as unread'}).click();
  await expect(card.getByRole('button',{name:'Check off as read'})).toBeVisible();
  await expect(card.locator('.rating-control')).toHaveCount(0);
});
