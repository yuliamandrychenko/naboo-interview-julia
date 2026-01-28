import { test, expect } from '@playwright/test';

test('logout + Home page verification', async ({ page }) => {
  await page.goto('/profil');
  await page.waitForLoadState('networkidle');
  //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
  //deconnexion process
    await page.getByRole('link', { name: 'Déconnection' }).click();
    //await page.waitForURL('/');
  //verification if deconnected
    await page.waitForTimeout(500);
    await page.waitForLoadState('networkidle');
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Connection' })).toBeVisible();
    await page.waitForTimeout(200);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Accueil' })).toBeVisible();
     await expect(page.getByRole('heading', { name: 'Accueil' })).toContainText('Accueil')
    await expect(page.getByRole('heading', { name: 'Découvrez les dernières' })).toContainText('Découvrez les dernières')
    await expect(page.getByRole('link', { name: 'Candidator' })).toContainText('Candidator')
    await expect(page.getByRole('link', { name: 'Découvrez des activités' })).toContainText('Découvrez des activités')
    await expect(page.getByRole('link', { name: 'Explorer' })).toContainText('Explorer')
    await expect (page.getByRole('button', { name: 'Voir plus' }).first()).toBeVisible()
});