import { test, expect } from '@playwright/test'


test('addActivity', async ({ page }) => {
  await page.goto('/activities/create');

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Wait for form to be visible
  //await page.waitForSelector('form', { state: 'visible', timeout: 10000 });
  
  // Verify we're on the add activity form by checking for the form fields
  await expect(page.getByRole('textbox', { name: 'Nom de l\'activité' })).toBeVisible();
  
  // Fill form fields
  await page.getByRole('textbox', { name: 'Nom de l\'activité' }).fill('Test activity');
  await page.getByRole('textbox', { name: 'Description' }).fill('test activity description');
  
  // Fill the city field
  const cityInput = page.getByPlaceholder('Rouen');
  await cityInput.waitFor({ state: 'visible', timeout: 10000 });
  await cityInput.click();
  await cityInput.fill('Paris');
  
  // Wait for the API to respond with city data
  await page.waitForResponse(
    response => response.url().includes('geo.api.gouv.fr/communes') && response.status() === 200,
    { timeout: 10000 }
  );
  
  // Wait a bit for dropdown to render, then use keyboard to select
  await page.waitForTimeout(1000);
  await cityInput.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // Fill the price field using placeholder
  const priceInput = page.getByPlaceholder('50');
  await priceInput.waitFor({ state: 'visible', timeout: 10000 });
  await priceInput.fill('100');
  
  // Click submit button
  const submitButton = page.getByRole('button', { name: 'Valider' });
  await submitButton.waitFor({ state: 'visible', timeout: 10000 });
  await submitButton.click();
  
  // Wait a bit for the submission to process
  await page.waitForTimeout(2000);
  
  // Navigate to my activities page to verify
  await page.goto('/my-activities');
  await page.waitForLoadState('networkidle');
  
  // Verify the activity was created
  await expect(page.getByText('Test activity').first()).toBeVisible({ timeout: 10000 });
})


