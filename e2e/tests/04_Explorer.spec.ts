import { test, expect } from '@playwright/test'


  // UAT test
  test('ExplorerSmoke', async ({ page }) => {
    await page.goto('/explorer');
    await page.waitForLoadState('networkidle');
    // verification of explorer page elements
    await expect(page.getByRole('heading', { name: 'Trouvez une activité dans' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chamonix Lorem ipsum dolor' })).toBeVisible();
  })

// Test Explorer Details
  test('ExplorerDetails', async ({ page }) => {
    await page.goto('/explorer/Chamonix');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('textbox', { name: 'Activité' })).toBeVisible();
    //await expect(page.getByPlaceholder('Prix')).toBeVisible();
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    
    // Wait for activities to load and button to be ready
    const voirPlusButton = page.getByRole('button', { name: 'Voir plus' }).first();
    await voirPlusButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Click on "Voir plus" to see activity details
    await voirPlusButton.click();
    
    // Wait for navigation to activity details page
    //await page.waitForURL('**/activities/**', { timeout: 10000 });
    //await page.waitForLoadState('networkidle');
    
    // Verify activity details are visible
    await expect(page.getByRole('heading', { name: 'Randonnée dans les Alpes' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    await expect(page.getByText('Chamonix')).toBeVisible();
    await expect(page.getByText(/80€\/j/)).toBeVisible();
    await expect(page.getByText('Ajouté par John Doe')).toBeVisible({ timeout: 5000 });

    // Go back to explorer
    //await page.goBack();
    //await page.waitForURL('/explorer/Chamonix');
   // await page.goBack();
   // await page.waitForURL('/explorer');
    
  });

