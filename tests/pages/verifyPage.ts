// pages/verifyPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class VerifyPage {
  readonly page: Page;
  readonly code: Locator;
  readonly verifyBtn: Locator;
  readonly backBtn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;

    this.code      = page.getByRole('textbox', { name: 'Enter 6-digit code' });
    this.verifyBtn = page.getByTestId('verify-next-button');
    this.backBtn   = page.getByTestId('verify-back-button');

    // Angular Material mat-error for missing/invalid input
    this.error     = page.locator('mat-error');
  }

  async submitEmpty() {
    await this.verifyBtn.click();
  }

  async expectRequiredError() {
    await expect(this.error).toBeVisible();
  }

  async enterCodeAndContinue(codeValue = '123456') {
    await this.code.fill(codeValue);
    await this.verifyBtn.click();
  }
}
