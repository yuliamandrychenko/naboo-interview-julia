import { test, expect } from '@playwright/test';


test('profile', async ({ page }) => {
    await page.goto('/profil');
    //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
    // navigation to find more activities page
    await page.getByRole('link', { name: 'Découvrez des activités' }).click();
    
    // verification of profile page elements
    await expect(page.getByRole('heading', { name: 'Découvrez des activités' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ajouter une activité' })).toBeVisible()

    // verification of add activity page from this page
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).toBeVisible();
    await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
    await expect(page.getByText('Description *')).toBeVisible();
    await expect(page.getByText('Localisation *')).toBeVisible()
    await expect(page.getByText('Prix *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();

    // go to initial state
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await page.waitForURL('/discover');
    await page.getByRole('link', { name: 'Candidator' }).click();

    
});