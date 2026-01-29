import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';


test('logout', async ({ page }) => {
  await page.goto('/profil');
  await page.waitForLoadState('networkidle');
  //verification if connected 
    await page.locator('svg').first().click();;
    await expect(page.getByRole('link', { name: 'Déconnection' })).toBeVisible()
  //deconnexion process
    await page.getByRole('link', { name: 'Déconnection' }).click();
  //verification if deconnected
    await page.waitForLoadState('networkidle');
    await page.locator('svg').first().click();
    await expect(page.getByRole('link', { name: 'Connection' })).toBeVisible();
    await page.waitForLoadState('networkidle');
});
/*test.afterAll(async () => {
  console.log('🧹 Cleanup Mongo après les tests...');

  try {
    // Try multiple possible commands
    const commands = [
      // Try with mongosh
      `docker exec mongo mongosh naboo --eval "db.activities.deleteMany({ name: 'Test activity' })"`,
      // Try with older mongo client
      `docker exec mongo mongo naboo --eval "db.activities.deleteMany({ name: 'Test activity' })"`,
      // Try with mongodb container name
      `docker exec mongodb mongosh naboo --eval "db.activities.deleteMany({ name: 'Test activity' })"`,
      // Try with naboo-mongodb container name
      `docker exec naboo-mongodb mongosh naboo --eval "db.activities.deleteMany({ name: 'Test activity' })"`,
    ];

    let success = false;
    for (const cmd of commands) {
      try {
        console.log(`Trying: ${cmd}`);
        execSync(cmd, { stdio: 'pipe' });
        console.log('✅ Cleanup completed');
        success = true;
        break;
      } catch (e) {
        // Continue to next command
        continue;
      }
    }

    if (!success) {
      console.warn('⚠️ All cleanup attempts failed. Listing docker containers:');
      try {
        execSync('docker ps --format "{{.Names}}"', { stdio: 'inherit' });
      } catch (e) {
        console.warn('Could not list containers');
      }
    }
  } catch (error) {
    console.warn('⚠️ Cleanup error:', error.message);
  }
});
*/