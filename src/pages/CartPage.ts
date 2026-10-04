import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
import { toSlug } from '../helpers/string.helper';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';
  readonly header: HeaderComponent;

  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.cartItems = this.testId('inventory-item');
    this.checkoutButton = this.testId('checkout');
    this.continueShoppingButton = this.testId('continue-shopping');
  }

  async getItemNames(): Promise<string[]> {
    return (await this.testId('inventory-item-name').allTextContents()).map((t) => t.trim());
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItem(productName: string): Promise<void> {
    await this.testId(`remove-${toSlug(productName)}`).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
