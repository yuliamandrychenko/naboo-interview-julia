import { chromium } from '@playwright/test'

async function globalSetup() {
  console.log('🔐 Global login start');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let retries = 0;
  const maxRetries = 5;
  
  // Retry logic to wait for server to be ready
  while (retries < maxRetries) {
    try {
      console.log(`🔄 Attempt ${retries + 1}/${maxRetries} to connect to http://localhost:3001...`);
      await page.goto('http://localhost:3001/', { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      console.log('✅ Connected to server');
      break;
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        console.log(`⏳ Waiting for server to start... (${retries}/${maxRetries})`);
        await page.waitForTimeout(3000);
      } else {
        throw new Error(`Could not connect to http://localhost:3001 after ${maxRetries} attempts. Make sure the frontend server is running.`);
      }
    }
  }
  
  // Wait for the header to be visible
  await page.locator('[data-testid="header"]').waitFor({ state: 'visible', timeout: 10000 });
  
  console.log('✅ Page loaded, opening user menu...');
  
  // Click on the user icon to open menu
  await page.locator('svg').first().click();
  await page.waitForTimeout(500);
  
  console.log('✅ Menu opened, clicking Connection link...');
  
  // Click Connection link
  await page.getByRole('link', { name: 'Connection' }).click();
  
  console.log('✅ On signin page, filling credentials...');
  
  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('user1@test.fr');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('user1');
  await page.getByRole('button', { name: 'Valider' }).click();
  
  console.log('✅ Submitted login, waiting for redirect...');
  
  // Wait for successful login redirect
  await page.getByRole('link', { name: 'Mes activités' }).waitFor({ state: 'visible', timeout: 30000 });

  console.log('✅ Login successful, saving session...');

  // Save the authenticated session
  await context.storageState({
    path: 'storageState.json',
  });
  
  await browser.close();
  console.log('✅ Global login done');
}

export default globalSetup;