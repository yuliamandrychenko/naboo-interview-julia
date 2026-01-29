import { test, expect } from '@playwright/test'


  // UAT test
  test('ExplorerSmoke', async ({ page }) => {
    await page.goto('/explorer');
    await page.waitForLoadState('networkidle');
    // verification of explorer page elements
    await expect(page.getByRole('heading', { name: 'Trouvez une activité dans' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chamonix Lorem ipsum dolor' })).toBeVisible();
    
    // go to initial state + verification explorer button
    await page.getByRole('link', { name: 'Explorer' }).click();
    await page.waitForURL('/explorer');
    await page.goto('/');
  })

// Test Explorer Details
  test('ExplorerDetails', async ({ page }) => {
    await page.goto('/explorer');
    await page.waitForLoadState('networkidle');
    // verification of explorer page
    await expect(page.getByRole('heading', { name: 'Trouvez une activité dans' })).toBeVisible();

    // Click on Chamonix activity
    await page.getByRole('link', { name: 'Chamonix Lorem ipsum dolor' }).click();
    
    // Wait for the city page to load
   // await page.waitForURL('/explorer/Chamonix', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    // Use partial match for the heading since it includes the city name
    await expect(page.getByRole('heading', { name: /Activités pour la ville de/ })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Activité' })).toBeVisible();
    await expect(page.getByPlaceholder('Prix')).toBeVisible();
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Voir plus' })).toBeVisible();

    // Click on "Voir plus" to see activity details
    await page.getByRole('button', { name: 'Voir plus' }).click();
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Randonnée dans les Alpes' })).toContainText('Randonnée dans les Alpes');
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    await expect(page.getByText('Chamonix')).toBeVisible();
    await expect(page.getByText(/80€\/j/)).toBeVisible();
    await expect(page.getByText('Ajouté par John Doe')).toBeVisible();

    // Go back to explorer
    await page.goBack();
    await page.waitForURL('/explorer/Chamonix');
    await page.goBack();
    await page.waitForURL('/explorer');
    
  });

