// pages/confirmationPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly submitRequest: Locator;
  readonly successText: Locator;

  constructor(page: Page) {
    this.page = page;

    // The final confirmation submit button on this page
    this.submitRequest = page.getByTestId('confirm-submit-button');

    // Success banner/text at the end
    this.successText   = page.getByText('Thank you!');
  }

  async verifySummaryContains(data: { company: string; email: string }) {
    await expect(this.page.locator(`text=${data.company}`)).toBeVisible();
    const emailLocator = this.page.getByLabel('5Confirm').getByText(data.email);
    await expect(emailLocator).toBeVisible({ timeout: 50000 });

  }

  async submitAndVerify() {
    await this.submitRequest.click();
    await expect(this.successText).toBeVisible({ timeout: 50000 });
  }
}
