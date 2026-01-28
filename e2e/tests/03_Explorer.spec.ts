import { test, expect } from '@playwright/test'


  // UAT test
  test('ExplorerSmoke', async ({ page }) => {
    await page.goto('/explorer');
    await page.waitForLoadState('networkidle');
    // verification of explorer page elements
    await expect(page.getByRole('heading', { name: 'Trouvez une activité dans' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chamonix Lorem ipsum dolor' })).toBeVisible();
    
    // go to inital state + verification explorer button
    await page.getByRole('link', { name: 'Explorer' }).click();
    await page.waitForURL('/explorer');
    await page.getByRole('link', { name: 'Candidator' }).click();
  })

// Test Explorer Details
  test('ExplorerDetails', async ({ page }) => {
    await page.goto('/explorer');
    await page.waitForLoadState('networkidle');
//verification if connected + in the explorer page
   // await page.locator('svg').first().click();;
   // await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Trouvez une activité dans' })).toBeVisible();

// Test Explorer Details
    await page.getByRole('link', { name: 'Chamonix Lorem ipsum dolor' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(200);
    await expect(page.getByRole('heading', { name: 'Activités pour la ville de' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Activité' })).toBeVisible();
    await expect(page.getByPlaceholder('Prix')).toBeVisible();
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Voir plus' })).toBeVisible();

// Voir Detail
    await page.getByRole('button', { name: 'Voir plus' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Randonnée dans les Alpes' })).toContainText('Randonnée dans les Alpes');
    await expect(page.getByRole('img', { name: 'random image of city' })).toBeVisible();
    await expect(page.getByText('Chamonix')).toBeVisible();
    await expect(page.getByText('Chamonix80€/jLorem ipsum')).toBeVisible();
    await expect(page.getByText('Ajouté par John Doe')).toBeVisible();

    // go to inital state
    //await page.getByRole('button').click();
     await page.goBack();
    await page.waitForURL('/explorer/Chamonix');
    await page.waitForLoadState('networkidle');
    await page.goBack();
    await page.waitForURL('/explorer');
    //await page.waitForLoadState('networkidle');
    //await page.getByRole('link', { name: 'Candidator' }).click();
    
});

