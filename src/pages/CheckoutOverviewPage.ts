import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../helpers/price.helper';

export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';

  constructor(page: Page) {
    super(page);
  }

  async getItemNames(): Promise<string[]> {
    return (await this.testId('inventory-item-name').allTextContents()).map((t) => t.trim());
  }

  async getSubtotal(): Promise<number> {
    return parsePrice(await this.text(this.testId('subtotal-label')));
  }

  async getTax(): Promise<number> {
    return parsePrice(await this.text(this.testId('tax-label')));
  }

  async getTotal(): Promise<number> {
    return parsePrice(await this.text(this.testId('total-label')));
  }

  async finish(): Promise<void> {
    await this.testId('finish').click();
  }

  async cancel(): Promise<void> {
    await this.testId('cancel').click();
  }
}
