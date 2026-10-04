import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';

  constructor(page: Page) {
    super(page);
  }

  async getHeader(): Promise<string> {
    return this.text(this.testId('complete-header'));
  }

  async getBody(): Promise<string> {
    return this.text(this.testId('complete-text'));
  }

  async backToProducts(): Promise<void> {
    await this.testId('back-to-products').click();
  }
}
