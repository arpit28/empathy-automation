// pages/objectivePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ObjectivePage {
  readonly page: Page;

  // Markets
  readonly ireland: Locator;
  readonly uk: Locator;

  // Inputs
  readonly brandInput: Locator;
  readonly distributionChosenMarket: Locator;
  readonly brandAmbition: Locator;
  readonly brandChallenge: Locator;

  // Navigation
  readonly continueBtn: Locator;

  // Errors
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;

    // Checkboxes
    this.ireland = page.getByRole('checkbox', { name: 'Ireland Market' });
    this.uk      = page.getByRole('checkbox', { name: 'UK Market' });

    // Inputs
    this.brandInput               = page.getByTestId('number-brands-enrolling-input');
    this.distributionChosenMarket = page.getByTestId('distribution-in-chosen-market-textarea');
    this.brandAmbition            = page.getByTestId('brand-ambition-textarea');
    this.brandChallenge           = page.getByTestId('brand-challenges-textarea');

    // Button
    this.continueBtn = page.getByTestId('objective-next-button');

    // Angular Material errors
    this.error = page.locator('mat-error');
  }

  async submitEmpty() {
    await this.continueBtn.click();
  }

  async expectRequiredErrors(count: number) {
    await expect(this.error).toHaveCount(count);
  }

  async fillAndContinue(data: {
    ireland?: boolean;
    uk?: boolean;
    brand: string;
    txt1: string;
    txt2: string;
    txt3: string;
  }) {
    if (data.ireland) await this.ireland.check();
    if (data.uk) await this.uk.check();

    await this.brandInput.fill(data.brand);
    await this.distributionChosenMarket.fill(data.txt1);
    await this.brandAmbition.fill(data.txt2);
    await this.brandChallenge.fill(data.txt3);

    await this.continueBtn.click();
  }
}
