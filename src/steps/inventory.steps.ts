import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';
import { SortOption } from '../pages';
import { isSortedAscending, isSortedDescending } from '../helpers/string.helper';
import { readTestData } from '../utils/json-reader';

When('I add {string} to the cart', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.addToCart(product);
});

When('I remove {string} from the products page', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.removeFromCart(product);
});

When('I add the following products to the cart', async function (this: CustomWorld, table: DataTable) {
  const products = table.raw().flat().map((p) => p.trim());
  for (const product of products) {
    await this.inventoryPage.addToCart(product);
  }
  this.scenarioData.set('selectedProducts', products);
});

Then(
  'the {string} button should change to {string}',
  async function (this: CustomWorld, product: string, label: string) {
    if (label === 'Remove') expect(await this.inventoryPage.isRemoveButtonVisible(product)).toBe(true);
    else expect(await this.inventoryPage.isAddButtonVisible(product)).toBe(true);
  },
);

When('I sort products by {string}', async function (this: CustomWorld, option: string) {
  await this.inventoryPage.sortBy(option as SortOption);
});

Then('the products should be sorted by {string}', async function (this: CustomWorld, option: string) {
  switch (option) {
    case 'Name (A to Z)':
      expect(isSortedAscending(await this.inventoryPage.getProductNames())).toBe(true);
      break;
    case 'Name (Z to A)':
      expect(isSortedDescending(await this.inventoryPage.getProductNames())).toBe(true);
      break;
    case 'Price (low to high)':
      expect(isSortedAscending(await this.inventoryPage.getProductPrices())).toBe(true);
      break;
    case 'Price (high to low)':
      expect(isSortedDescending(await this.inventoryPage.getProductPrices())).toBe(true);
      break;
    default:
      throw new Error(`Unknown sort option: ${option}`);
  }
});

Then('every product should display its expected price', async function (this: CustomWorld) {
  const expected = readTestData<Record<string, number>>('products.json');
  for (const [name, price] of Object.entries(expected)) {
    expect(await this.inventoryPage.getProductPrice(name), `price of ${name}`).toBe(price);
  }
});

When('I open the details of {string}', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.openProduct(product);
});

Then(
  'the product details should show {string} priced at {float}',
  async function (this: CustomWorld, name: string, price: number) {
    expect(await this.productDetailsPage.getName()).toBe(name);
    expect(await this.productDetailsPage.getPrice()).toBe(price);
  },
);
