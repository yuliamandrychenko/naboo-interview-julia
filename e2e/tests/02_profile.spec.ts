import { test, expect } from '@playwright/test';

test.describe('Init', () => {
  test('init', async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });
});

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

    
});