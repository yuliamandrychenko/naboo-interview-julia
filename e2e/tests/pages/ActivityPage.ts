import { Page, expect } from '@playwright/test';

export class ActivityPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('/activities');
    await this.page.waitForLoadState('networkidle');
  }

  async addFirstActivityToFavorites() {
    await this.page
      .getByRole('button', { name: 'Ajouter aux favoris' })
      .first()
      .click();
  }

  async expectActivityMarkedAsFavorite() {
    await expect(
      this.page.getByRole('button', { name: 'Retirer des favoris' }).first()
    ).toBeVisible();
  }
}
