import { test, expect } from '@playwright/test';


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

    test('Voir plus', async ({ page }) => {
    await page.getByRole('button', { name: 'Voir plus' }).first().click()
  })

  })