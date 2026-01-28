import { test, expect } from '@playwright/test';


test('findMoreActivitiesSmoke', async ({ page }) => {
    await page.goto('/profil');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(200);
    // navigation to find more activities page
    await page.getByRole('link', { name: 'Découvrez des activités' }).click();
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(200);
    await expect(page.getByRole('button', { name: 'Ajouter une activité' })).toBeVisible()

    // verification of add activity page from this page
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Ajouter une activité' })).toBeVisible();
    await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
    await expect(page.getByText('Description *')).toBeVisible();
    await expect(page.getByText('Localisation *')).toBeVisible()
    await expect(page.getByText('Prix *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();

    // go to initial state
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await page.waitForURL('/discover');
    //await page.getByRole('link', { name: 'Candidator' }).click();

    
});