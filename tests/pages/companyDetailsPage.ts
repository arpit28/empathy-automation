import { Page, Locator } from '@playwright/test';

export class CompanyDetailsPage {
  readonly page: Page;
  readonly companyName: Locator;
  readonly primaryContact: Locator;
  readonly email: Locator;
  readonly brandName: Locator;
  readonly productCategory: Locator;
  readonly continueBtn: Locator;
  readonly requiredErrors: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.companyName      = page.getByTestId('register-company-name-input');
    this.primaryContact   = page.getByTestId('register-primary-contact-input');
    this.email            = page.getByTestId('register-email-input');
    this.brandName        = page.getByTestId('register-brand-names-input');
    this.productCategory  = page.getByTestId('register-product-categories-input');

    // Button
    this.continueBtn      = page.getByTestId('register-next-button');

    // Generic error container (all REQUIRED errors share the same component)
    this.requiredErrors   = page.locator('mat-error'); 
  }

  async goto() {
    await this.page.goto('https://empathy-client-site.pages.dev/register');
  }

  async submitEmpty() {
    await this.continueBtn.click();
  }

  async fillAndContinue(data: {companyName: string; primaryContact: string; email: string; brandName: string; productCategory: string;}) {
    await this.companyName.fill(data.companyName);
    await this.primaryContact.fill(data.primaryContact);
    await this.email.fill(data.email);
    await this.brandName.fill(data.brandName);
    await this.productCategory.fill(data.productCategory);

    await this.continueBtn.click();
  }
}
