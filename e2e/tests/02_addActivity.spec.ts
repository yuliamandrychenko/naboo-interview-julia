import { test, expect } from '@playwright/test'

test('addActivityUAT', async ({ page }) => {
     await page.goto('/my-activities');
   //verification if connected 
    await page.locator('svg').first().click();
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible();
    // add activity test page navigation
    await page.getByRole('link', { name: 'Mes activités' }).click();
    await expect(page.getByRole ('heading', { name: 'Mes activités' })).toBeVisible();
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).toBeVisible();
    // verification of field elements presence
    await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
    await expect(page.getByText('Description *')).toBeVisible();
    await expect(page.getByText('Localisation *')).toBeVisible()
    await expect(page.getByText('Prix *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();
    
    // go to inital state + verification back button
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await page.waitForURL('/discover');
    await page.getByRole('link', { name: 'Candidator' }).click();
  })

  test('addActivity', async ({ page }) => {
     await page.goto('/my-activities');
   //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
    // add activity test
    await page.getByRole('link', { name: 'Mes activités' }).click();
    await expect(page.getByRole ('heading', { name: 'Mes activités' })).toBeVisible()

    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Nom de l\'activité' }).click();
    await page.getByRole('textbox', { name: 'Nom de l\'activité' }).fill('Test activity');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('test description');
    //await page.getByRole('searchbox', { name: 'Localisation' }).click();
    await page.getByRole('searchbox', { name: 'Localisation' }).fill('paris');
    await page.getByRole('option', { name: 'Paris', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Prix' }).click();
    await page.getByRole('spinbutton', { name: 'Prix' }).fill('100');
    await page.getByRole('button', { name: 'Valider' }).click();
    
    // Wait for the form to close and the activity to appear in the list
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).not.toBeVisible();
    await expect(page.getByText('Test activity').first()).toBeVisible();
    
    // go to inital state
    await page.waitForURL('/my-activities');
    await page.getByRole('link', { name: 'Candidator' }).click();
    
    
  })


