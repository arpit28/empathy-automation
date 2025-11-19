import { Page, Locator, expect } from '@playwright/test';

export class OptionsPage {
  readonly page: Page;

  // Locators
  readonly dashboardIncrease: Locator;
  readonly debriefIncrease: Locator;
  readonly powerpointIncrease: Locator;
  readonly workshopIncrease: Locator;
  readonly total: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Dashboard
    this.dashboardIncrease = page.getByRole('button', { name: 'increase' }).nth(0);

    // Optional Add-ons
    this.debriefIncrease = page.getByRole('button', { name: 'increase' }).nth(1);

    this.powerpointIncrease = page.getByRole('button', { name: 'increase' }).nth(2);

    this.workshopIncrease = page.getByRole('button', { name: 'increase' }).nth(3);
    
    // Summary total
    this.total = page.getByText('Total€');

    // Navigation
    this.nextButton = page.getByTestId('options-next-button');
  }

  async increaseDashboard() {
    await this.dashboardIncrease.click();
  }

  async increaseDebrief() {
    await this.debriefIncrease.click();
  }

  async increasePowerpoint() {
    await this.powerpointIncrease.click();
  }

  async increaseWorkshop() {
    await this.workshopIncrease.click();
  }

  async verifyTotalVisible() {
    await expect(this.total).toBeVisible();
  }

  async goNext() {
    await this.nextButton.click();
  }

  async completeOptionsSelection() {
    await this.increaseDashboard();
    await this.increaseDebrief();
    await this.increasePowerpoint();
    await this.increaseWorkshop();
    await this.verifyTotalVisible();
    await this.goNext();
  }
}
