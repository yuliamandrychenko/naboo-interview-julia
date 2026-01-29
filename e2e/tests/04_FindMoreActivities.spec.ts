import { test, expect } from '@playwright/test';


test('findMoreActivitiesSmoke', async ({ page }) => {
    await page.goto('/discover');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(200);
    await expect(page.getByRole('button', { name: 'Ajouter une activité' })).toBeVisible()

    // verification of add activity page from this page
    await page.getByRole('button', { name: 'Ajouter une activité' }).click();
    await expect(page.getByText('Nom de l\'activité *')).toBeVisible();
    await expect(page.getByText('Description *')).toBeVisible();
    await expect(page.getByText('Localisation *')).toBeVisible()
    await expect(page.getByText('Prix *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();

    
});