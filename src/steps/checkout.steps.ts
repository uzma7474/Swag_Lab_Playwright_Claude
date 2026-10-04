import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';
import { DataGenerator } from '../utils/data-generator';
import { readTestData } from '../utils/json-reader';
import { round2, sum } from '../helpers/price.helper';

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage.checkout();
  await expect(this.page).toHaveURL(/checkout-step-one\.html/);
});

When('I enter valid checkout information', async function (this: CustomWorld) {
  await this.checkoutInfoPage.fillInformation(DataGenerator.checkoutInfo());
  await this.checkoutInfoPage.continue();
  await expect(this.page).toHaveURL(/checkout-step-two\.html/);
});

When(
  'I submit checkout information with first name {string}, last name {string} and postal code {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutInfoPage.fillInformation({ firstName, lastName, postalCode });
    await this.checkoutInfoPage.continue();
  },
);

Then('I should see the checkout error {string}', async function (this: CustomWorld, message: string) {
  expect(await this.checkoutInfoPage.getErrorMessage()).toBe(message);
});

When('I cancel the checkout information step', async function (this: CustomWorld) {
  await this.checkoutInfoPage.cancel();
});

Then('the order overview should list the selected products', async function (this: CustomWorld) {
  const selected = this.scenarioData.get('selectedProducts') as string[];
  const actual = await this.checkoutOverviewPage.getItemNames();
  expect([...actual].sort()).toEqual([...selected].sort());
});

Then('the order total should equal the item total plus tax', async function (this: CustomWorld) {
  const subtotal = await this.checkoutOverviewPage.getSubtotal();
  const tax = await this.checkoutOverviewPage.getTax();
  const total = await this.checkoutOverviewPage.getTotal();
  expect(total).toBe(round2(subtotal + tax));
});

Then('the item total should equal the sum of the selected product prices', async function (this: CustomWorld) {
  const catalogue = readTestData<Record<string, number>>('products.json');
  const selected = this.scenarioData.get('selectedProducts') as string[];
  const expected = sum(selected.map((p) => catalogue[p]));
  expect(await this.checkoutOverviewPage.getSubtotal()).toBe(expected);
});

When('I finish the order', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.finish();
  await expect(this.page).toHaveURL(/checkout-complete\.html/);
});

Then('I should see the order confirmation {string}', async function (this: CustomWorld, message: string) {
  expect(await this.checkoutCompletePage.getHeader()).toBe(message);
});
