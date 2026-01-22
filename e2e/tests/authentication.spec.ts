import { test, expect } from '@playwright/test'

test.describe('Init', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.naboo.app/')
  })

  test('should see header', async ({ page }) => {
    await expect(page.getByTestId(`header`)).toBeVisible()
  })
})
