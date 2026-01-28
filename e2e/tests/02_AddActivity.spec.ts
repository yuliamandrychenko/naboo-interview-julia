import { test, expect } from '@playwright/test'

test('addActivitySmoke', async ({ page }) => {
     await page.goto('/my-activities');
   //verification if connected 
   await page.waitForLoadState('networkidle');
    // add activity test page navigation
    await page.getByRole('link', { name: 'Mes activités' }).click();
    await expect(page.getByRole ('heading', { name: 'Mes activités' })).toBeVisible();
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).toBeVisible();
    // verification of field elements presence
    await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
    await expect(page.getByText('Description *')).toBeVisible();
    await expect(page.getByText('Localisation *')).toBeVisible()
    await expect(page.getByText('Prix *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();
    
    // go to initial state + verification back button
    await page.goBack();
    await page.waitForURL('/my-activities');
  })

  test('addActivity', async ({ page }) => {
     await page.goto('/my-activities');
   
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('link', { name: 'Mes activités' }).click();
    await expect(page.getByRole('heading', { name: 'Mes activités' })).toBeVisible();

    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    
    // Wait for URL to change or form to appear
    //await page.goto('/activities/create');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the add activity form by checking for the form fields
    await expect(page.getByText('Nom de l\'activité')).toBeVisible();
    
    // Fill form fields
    await page.getByRole('textbox', { name: 'Nom de l\'activité' }).fill('Test activity');
    await page.getByRole('textbox', { name: 'Description' }).fill('test activity description');
    
    // Fill the city field using keyboard only
    await page.getByRole('searchbox', { name: 'Localisation' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('searchbox', { name: 'Localisation' }).fill('paris');
    await page.getByRole('searchbox', { name: 'Localisation' }).press('ArrowDown');
    await page.getByRole('searchbox', { name: 'Localisation' }).press('Enter');
    
    // Small wait to ensure selection is processed
    await page.waitForTimeout(200);
    
    const priceInput = page.getByRole('spinbutton', { name: 'Prix' });
    await priceInput.waitFor({ state: 'visible', timeout: 5000 });
    await priceInput.fill('100');
    //await page.waitForTimeout(200);
    await page.getByRole('button', { name: 'Valider' }).click();

  
    await page.goto('/my-activities');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    //await page.waitForURL('/disover', { timeout: 10000 });
    // Verify the activity was created
    await page.getByRole('link', { name: 'Découvrez des activités' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Test activity').first()).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(200);
    // go to initial state + verification back button
    await page.waitForURL('/my-activities');
  
    
  })


