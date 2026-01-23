import { test, expect } from '@playwright/test';

test('assert page has standard body text', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveText('Hello world!');
});
