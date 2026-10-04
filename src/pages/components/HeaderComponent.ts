import { Locator, Page } from '@playwright/test';

/** Header + burger menu shared by every authenticated page. */
export class HeaderComponent {
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly allItemsLink: Locator;
  private readonly resetLink: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  readonly title: Locator;

  constructor(private readonly page: Page) {
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.resetLink = page.locator('[data-test="reset-sidebar-link"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.title = page.locator('[data-test="title"]');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetLink.click();
  }

  async goToAllItems(): Promise<void> {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  /** 0 when the badge is not rendered (empty cart). */
  async getCartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number((await this.cartBadge.textContent())?.trim() ?? 0);
  }

  async getTitle(): Promise<string> {
    return ((await this.title.textContent()) ?? '').trim();
  }
}
