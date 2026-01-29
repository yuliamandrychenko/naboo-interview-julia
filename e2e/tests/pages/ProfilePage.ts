import { Page, expect } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('/profil');
    await this.page.waitForLoadState('networkidle');
  }

  async expectFavoriteActivityVisible(activityName: string) {
    await expect(
      this.page.getByText(activityName)
    ).toBeVisible();
  }
}
