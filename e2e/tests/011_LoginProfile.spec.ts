import { test, expect } from '@playwright/test'

test.describe('Init', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/')
  })

  // Login test
  test('Connexion', async ({ page }) => {
    await expect(page.locator('path').nth(2)).toBeVisible()
    await page.locator('svg').first().click();
    await page.getByRole('link', { name: 'Connection' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('user1@test.fr')
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('user1');
    await page.getByRole('button', { name: 'Valider' }).click();
    // verifify the successful login by checking for a user-specific element
    await expect(page.getByRole('link', { name: 'Mes activités' })).toBeVisible()
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Découvrez les dernières' })).toBeVisible()
  })

test('profile', async ({ page }) => {
    //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
  })



  /*// Profile display test
  test('profile', async ({ page }) => {
    //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
    // navigation to profile page
    await page.getByRole('link', { name: 'Profil' }).click();
    // verification of profile page elements
    await expect(page.getByRole('link', { name: 'Profil' })).toBeVisible();
    await expect(page.getByText('user1@test.fr')).toContainText('user1@test.fr');
    await expect(page.getByText('John')).toContainText('John');
    await expect(page.getByText('Doe')).toContainText('Doe');
    // go to inital state
    await page.getByRole('link', { name: 'Candidator' }).click();
  })
*/
})
