import { test, expect } from '@playwright/test';


test('profile', async ({ page }) => {
    await page.goto('/profil');
    await page.waitForLoadState('networkidle');
//verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
// navigation to profile page
    await page.getByRole('link', { name: 'Profil' }).click();
    await page.waitForLoadState('networkidle');
// verification of profile page elements
    await expect(page.getByRole('heading', { name: 'Mon profil' })).toBeVisible();
    await expect(page.getByText('user1@test.fr')).toContainText('user1@test.fr');
    await expect(page.getByText('John')).toContainText('John');
    await expect(page.getByText('Doe')).toContainText('Doe');
// go to inital state
    await page.getByRole('link', { name: 'Candidator' }).click();

    
});