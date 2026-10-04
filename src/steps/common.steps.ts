import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';
import { getUser } from '../utils/users';

Given('I am on the Swag Labs login page', async function (this: CustomWorld) {
  await this.loginPage.open();
  expect(await this.loginPage.isLoginFormVisible()).toBe(true);
});

Given('I am logged in as {string}', async function (this: CustomWorld, userKey: string) {
  const user = getUser(userKey);
  await this.loginPage.open();
  await this.loginPage.login(user.username, user.password);
  await expect(this.page).toHaveURL(/inventory\.html/);
});

Then('the cart badge should show {int}', async function (this: CustomWorld, count: number) {
  await expect.poll(() => this.inventoryPage.header.getCartCount()).toBe(count);
});

Then('the cart badge should not be displayed', async function (this: CustomWorld) {
  await expect.poll(() => this.inventoryPage.header.getCartCount()).toBe(0);
});

When('I open the cart', async function (this: CustomWorld) {
  await this.inventoryPage.header.openCart();
  await expect(this.page).toHaveURL(/cart\.html/);
});

Then('I should land on the products page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/inventory\.html/);
  expect(await this.inventoryPage.header.getTitle()).toBe('Products');
});
