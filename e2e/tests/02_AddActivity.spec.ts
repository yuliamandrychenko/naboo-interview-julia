import { test, expect } from '@playwright/test'


test('addActivity', async ({ page }) => {
  await page.goto('/activities/create');

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Wait for form to be visible
  await page.waitForSelector('form', { state: 'visible', timeout: 10000 });
  
  // Verify we're on the add activity form by checking for the form fields
  await expect(page.getByRole('textbox', { name: 'Nom de l\'activité' })).toBeVisible();
  
  // Fill form fields
  await page.getByRole('textbox', { name: 'Nom de l\'activité' }).fill('Test activity');
  await page.getByRole('textbox', { name: 'Description' }).fill('test activity description');
  
  // Fill the city field
  const cityInput = page.getByPlaceholder('Rouen');
  await cityInput.click();
  await cityInput.fill('Paris');
  
  // Wait for the API to respond with city data
  await page.waitForResponse(
    response => response.url().includes('geo.api.gouv.fr/communes') && response.status() === 200,
    { timeout: 10000 }
  );
  
  // Wait for dropdown to populate and select Paris
  await page.waitForTimeout(500);
  await page.getByText('Paris', { exact: true }).first().click();
  
  // Fill the price field using placeholder
  await page.getByPlaceholder('50').fill('100');
  
  await page.getByRole('button', { name: 'Valider' }).click();
  
  // Verify the activity was created
  await expect(page.getByText('Test activity').first()).toBeVisible({ timeout: 10000 });
})


