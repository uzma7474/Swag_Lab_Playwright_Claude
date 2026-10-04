import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';
import { getUser } from '../utils/users';

When('I login as {string}', async function (this: CustomWorld, userKey: string) {
  const user = getUser(userKey);
  await this.loginPage.login(user.username, user.password);
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('I should see the login error {string}', async function (this: CustomWorld, message: string) {
  expect(await this.loginPage.getErrorMessage()).toBe(message);
});

Then('the products page should list {int} products', async function (this: CustomWorld, count: number) {
  expect(await this.inventoryPage.getProductCount()).toBe(count);
});

When('I logout', async function (this: CustomWorld) {
  await this.inventoryPage.header.logout();
});

Then('I should be returned to the login page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(this.baseUrl + '/');
  expect(await this.loginPage.isLoginFormVisible()).toBe(true);
});

When('I open the inventory page directly without logging in', async function (this: CustomWorld) {
  await this.page.goto('/inventory.html');
});
