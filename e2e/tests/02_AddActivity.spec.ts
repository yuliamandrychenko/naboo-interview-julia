import { test, expect } from '@playwright/test'


test('addActivity', async ({ page }) => {
  await page.goto('/my-activities');
  //await page.waitForLoadState('networkidle');
  
  // Click add activity button
  await page.getByRole('button', { name: 'Ajouter une activité' }).click();
  
  // Wait for navigation to the add form page
  //await page.waitForURL('**/activities/create', { timeout: 10000 });
  //await page.waitForLoadState('networkidle');
  await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
  await expect(page.getByText('Description *')).toBeVisible();
  await expect(page.getByText('Localisation *')).toBeVisible()
  await expect(page.getByText('Prix *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();
  
  // Verify we're on the add activity form by checking for the form fields
  await expect(page.getByText('Nom de l\'activité')).toBeVisible();
  await page.waitForTimeout(500);
  
  // Fill form fields
  await page.getByRole('textbox', { name: 'Nom de l\'activité' }).fill('Test activity');
  await page.getByRole('textbox', { name: 'Description' }).fill('test activity description');
  
  // Fill the city field
  await page.getByPlaceholder('Rouen').fill('Paris');
  
  // Wait for the API response
  await page.waitForResponse(
    response => response.url().includes('geo.api.gouv.fr/communes') && response.status() === 200,
    { timeout: 10000 }
  );
  
  // Wait for dropdown to render and select using keyboard
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Rouen').press('ArrowDown');
  await page.getByPlaceholder('Rouen').press('Enter');
  await page.getByRole('spinbutton', { name: 'Prix' }).fill('100');
  //await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Valider' }).click();

  // Wait for navigation back to my activities page
  await page.waitForURL('/my-activities', { timeout: 10000 });
  
  // Verify the activity was created
  await expect(page.getByText('Test activity').first()).toBeVisible({ timeout: 10000 });
})


