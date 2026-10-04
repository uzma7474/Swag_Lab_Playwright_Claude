import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { parsePrice } from '../helpers/price.helper';
import { toSlug } from '../helpers/string.helper';

export type SortOption =
  | 'Name (A to Z)'
  | 'Name (Z to A)'
  | 'Price (low to high)'
  | 'Price (high to low)';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly header: HeaderComponent;

  private readonly items: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.items = this.testId('inventory-item');
    this.itemNames = this.testId('inventory-item-name');
    this.itemPrices = this.testId('inventory-item-price');
    this.sortDropdown = this.testId('product-sort-container');
  }

  async isLoaded(): Promise<boolean> {
    return this.testId('inventory-list').isVisible();
  }

  async getProductCount(): Promise<number> {
    return this.items.count();
  }

  async getProductNames(): Promise<string[]> {
    return (await this.itemNames.allTextContents()).map((t) => t.trim());
  }

  async getProductPrices(): Promise<number[]> {
    return (await this.itemPrices.allTextContents()).map(parsePrice);
  }

  async getProductPrice(name: string): Promise<number> {
    const card = this.items.filter({ hasText: name });
    return parsePrice(await this.text(card.locator('[data-test="inventory-item-price"]')));
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async addToCart(productName: string): Promise<void> {
    await this.testId(`add-to-cart-${toSlug(productName)}`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.testId(`remove-${toSlug(productName)}`).click();
  }

  async isRemoveButtonVisible(productName: string): Promise<boolean> {
    return this.testId(`remove-${toSlug(productName)}`).isVisible();
  }

  async isAddButtonVisible(productName: string): Promise<boolean> {
    return this.testId(`add-to-cart-${toSlug(productName)}`).isVisible();
  }

  async openProduct(productName: string): Promise<void> {
    await this.itemNames.filter({ hasText: productName }).first().click();
  }
}
