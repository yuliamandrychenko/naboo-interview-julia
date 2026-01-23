import { test, expect } from '@playwright/test'

test.describe('Init', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/')
  })

  test('Verification page displays correctly', async ({ page }) => {
    await expect(page.getByTestId(`header`)).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Accueil' })).toContainText('Accueil')
    await expect(page.getByRole('heading', { name: 'Découvrez les dernières' })).toContainText('Découvrez les dernières')
    await expect(page.getByRole('link', { name: 'Candidator' })).toContainText('Candidator')
    await expect(page.getByRole('link', { name: 'Découvrez des activités' })).toContainText('Découvrez des activités')
    await expect(page.getByRole('link', { name: 'Explorer' })).toContainText('Explorer')
    await expect (page.getByRole('button', { name: 'Voir plus' }).first()).toBeVisible()
    await expect(page.getByText('SPA Saint-MaloSaint-Malo120€/')).toBeVisible()
    await expect(page.locator('path').nth(2)).toBeVisible()

  })


  test('Voir plus', async ({ page }) => {
    await page.getByRole('button', { name: 'Voir plus' }).first().click()
  })

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
    
  })
})