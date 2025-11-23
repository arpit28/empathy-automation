// tests/e2e-registration.spec.ts
import { test, expect } from '@playwright/test';
import { CompanyDetailsPage } from './pages/companyDetailsPage';
import { VerifyPage } from './pages/verifyPage';
import { ObjectivePage } from './pages/objectivePage';
import { OptionsPage } from './pages/optionsPage';
import { ConfirmationPage } from './pages/confirmationPage';
import { goodData } from './fixtures/testData';

test('E2E client registration happy path', async ({ page }) => {

  // --- PAGE 1: COMPANY DETAILS ---
  const company = new CompanyDetailsPage(page);
  await company.goto();

  await company.submitEmpty();
  await expect(company.requiredErrors).toHaveCount(5);

  await company.fillAndContinue({
    companyName: goodData.company,
    primaryContact: goodData.contact,
    email: goodData.email,
    brandName: goodData.brand,
    productCategory: goodData.Product
  });

  
  // --- PAGE 2: VERIFY PAGE ---
  const verify = new VerifyPage(page);

  await verify.submitEmpty();
  await verify.expectRequiredError();

  await verify.enterCodeAndContinue('000000');

  // --- PAGE 3: OBJECTIVE PAGE ---
  const obj = new ObjectivePage(page);

  await obj.fillAndContinue({
    ireland: true,
    brand: goodData.noOfBrands,
    txt1: goodData.txt1,
    txt2: goodData.txt2,
    txt3: goodData.txt3
  });

  // --- PAGE 4: OPTIONS PAGE ---
  const opt = new OptionsPage(page);

  // Increase each add-on once
  await opt.increaseDashboard();
  await opt.verifyTotalVisible();
  const totalText = await opt.total.textContent();

  expect(totalText).toContain('€');
  expect(Number(totalText!.replace(/[^0-9]/g, ''))).toBeGreaterThanOrEqual(2150);

  await opt.goNext();

  // --- PAGE 5: CONFIRMATION PAGE ---
  const conf = new ConfirmationPage(page);

  await conf.verifySummaryContains({
    company: goodData.company,
    email: goodData.email,
  });

  await conf.submitAndVerify();
});
