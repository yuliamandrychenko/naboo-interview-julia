import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.naboo.app/');

  await page.getByRole('button', { name: 'Our Destinations' }).click();
  await page.getByRole('link', { name: 'Baden-Württemberg' }).click();
  await page.getByTestId('widget-container').getByRole('button', { name: 'Close the widget without' }).click();
  await page.locator('[data-test-id="chat-widget-iframe"]').contentFrame().locator('[data-test-id="header-close-button"]').click();
  await expect(page.locator('h1')).toContainText('Baden-Württemberg');
  await expect(page.getByRole('heading', { name: 'Corporate retreat, team' })).toContainText('corporate activities in Baden-Württemberg');
});