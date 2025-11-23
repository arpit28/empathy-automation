import { test, expect } from '@playwright/test';
import { CompanyDetailsPage } from './pages/companyDetailsPage';
import { goodData } from './fixtures/testData';

test.describe('Company Details Page - Field Validations', () => {

  test.beforeEach(async ({ page }) => {
    const company = new CompanyDetailsPage(page);
    await company.goto();
  });

  test('Should show errors when submitting empty form', async ({ page }) => {
    const company = new CompanyDetailsPage(page);

    await company.submitEmpty();
    await expect(company.requiredErrors).toHaveCount(5);
  });

  test('Should show error for invalid email', async ({ page }) => {
    const company = new CompanyDetailsPage(page);

    await company.fillAndContinue({
      companyName: goodData.company,
      primaryContact: goodData.contact,
      email: 'invalid-email',
      brandName: goodData.brand,
      productCategory: goodData.Product
    });

    // Expect a validation error for email
    const emailError = page.locator('mat-error', { hasText: 'valid email' });
    await expect(emailError).toBeVisible();
  });

  test('Should show error for missing email', async ({ page }) => {
    const company = new CompanyDetailsPage(page);

    await company.fillAndContinue({
      companyName: goodData.company,
      primaryContact: goodData.contact,
      email: '', // missing
      brandName: goodData.brand,
      productCategory: goodData.Product
    });

    const emailError = page.locator('mat-error', { hasText: 'required' });
    await expect(emailError).toBeVisible();
  });

});
