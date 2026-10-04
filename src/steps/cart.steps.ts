import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

Then('the cart should contain the following products', async function (this: CustomWorld, table: DataTable) {
  const expected = table.raw().flat().map((p) => p.trim());
  const actual = await this.cartPage.getItemNames();
  expect([...actual].sort()).toEqual([...expected].sort());
});

When('I remove {string} from the cart', async function (this: CustomWorld, product: string) {
  await this.cartPage.removeItem(product);
});

When('I continue shopping', async function (this: CustomWorld) {
  await this.cartPage.continueShopping();
});

Then('I should be on the cart page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/cart\.html/);
});
