import { Locator, Page, expect } from '@playwright/test';
import { logger } from '../helpers/logger';

/** Shared behaviour for every page object. Page objects expose intent, not Playwright calls. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /** Relative path (or fragment) that identifies this page in the URL. */
  protected abstract readonly path: string;

  async open(): Promise<void> {
    logger.info(`Navigating to ${this.path || '/'}`);
    await this.page.goto(this.path || '/');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async expectOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(this.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  protected testId(id: string): Locator {
    return this.page.locator(`[data-test="${id}"]`);
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async text(locator: Locator): Promise<string> {
    return ((await locator.textContent()) ?? '').trim();
  }
}
