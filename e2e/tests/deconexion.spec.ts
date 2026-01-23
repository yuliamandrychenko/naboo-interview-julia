import { test, expect } from '@playwright/test';

test('logout', async ({ page }) => {
  //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
  //deconnexion process
    await page.getByRole('link', { name: 'Déconnection' }).click();
  //verification if deconnected
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Connection' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Accueil' })).toContainText('Accueil')

});