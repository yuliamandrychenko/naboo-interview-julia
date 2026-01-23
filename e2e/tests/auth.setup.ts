import { chromium } from '@playwright/test'

async function globalSetup() {
  console.log('🔐 Global login start');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3001/');
  await page.getByRole('link', { name: 'Connection' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user1@test.fr')
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('user1');
  await page.getByRole('button', { name: 'Valider' }).click();
  
  await page.getByRole('link', { name: 'Mes activités' }).waitFor();
  await page.locator('svg').first().click();
  await page.getByRole('link', { name: 'Déconnection' }).waitFor();
  await page.getByRole('heading', { name: 'Découvrez les dernières' }).waitFor();

  await context.storageState({
    path: 'storageState.json',
  });
  
  await browser.close();
  console.log('✅ Global login done');
}

export default globalSetup;