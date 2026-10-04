import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '../utils/data-generator';

export class CheckoutInformationPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = this.testId('firstName');
    this.lastName = this.testId('lastName');
    this.postalCode = this.testId('postalCode');
    this.continueButton = this.testId('continue');
    this.cancelButton = this.testId('cancel');
    this.error = this.testId('error');
  }

  /** Empty strings are allowed so negative scenarios can leave fields blank. */
  async fillInformation(info: CheckoutInfo): Promise<void> {
    await this.fill(this.firstName, info.firstName);
    await this.fill(this.lastName, info.lastName);
    await this.fill(this.postalCode, info.postalCode);
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async getErrorMessage(): Promise<string> {
    await this.error.waitFor({ state: 'visible' });
    return this.text(this.error);
  }
}
