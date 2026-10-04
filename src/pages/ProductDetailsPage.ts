import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { parsePrice } from '../helpers/price.helper';

export class ProductDetailsPage extends BasePage {
  protected readonly path = '/inventory-item.html';
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async getName(): Promise<string> {
    return this.text(this.testId('inventory-item-name'));
  }

  async getPrice(): Promise<number> {
    return parsePrice(await this.text(this.testId('inventory-item-price')));
  }

  async addToCart(): Promise<void> {
    await this.testId('add-to-cart').click();
  }

  async remove(): Promise<void> {
    await this.testId('remove').click();
  }

  async backToProducts(): Promise<void> {
    await this.testId('back-to-products').click();
  }
}
