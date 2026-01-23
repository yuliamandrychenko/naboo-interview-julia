import { test, expect } from '@playwright/test'

  test('addActivity', async ({ page }) => {
     await page.goto('/my-activities');
   //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
    
  })
