import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/';

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.testId('username');
    this.passwordInput = this.testId('password');
    this.loginButton = this.testId('login-button');
    this.errorMessage = this.testId('error');
    this.logo = page.locator('.login_logo');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.loginButton.isVisible();
  }

  async getLogoText(): Promise<string> {
    return this.text(this.logo);
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.text(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
