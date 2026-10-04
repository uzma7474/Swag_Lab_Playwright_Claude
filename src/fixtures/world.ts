import { IWorldOptions, World, setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import {
  CartPage,
  CheckoutCompletePage,
  CheckoutInformationPage,
  CheckoutOverviewPage,
  InventoryPage,
  LoginPage,
  ProductDetailsPage,
} from '../pages';
import { config } from '../utils/config';

setDefaultTimeout(60 * 1000);

/**
 * Per-scenario World: owns the browser context/page and lazily builds page objects.
 * Steps only talk to `this.xxxPage`, never to raw Playwright selectors.
 */
export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  /** Scratch space for sharing values between steps of one scenario. */
  readonly scenarioData = new Map<string, unknown>();

  private _login?: LoginPage;
  private _inventory?: InventoryPage;
  private _details?: ProductDetailsPage;
  private _cart?: CartPage;
  private _info?: CheckoutInformationPage;
  private _overview?: CheckoutOverviewPage;
  private _complete?: CheckoutCompletePage;

  readonly baseUrl = config.baseUrl;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get loginPage(): LoginPage { return (this._login ??= new LoginPage(this.page)); }
  get inventoryPage(): InventoryPage { return (this._inventory ??= new InventoryPage(this.page)); }
  get productDetailsPage(): ProductDetailsPage { return (this._details ??= new ProductDetailsPage(this.page)); }
  get cartPage(): CartPage { return (this._cart ??= new CartPage(this.page)); }
  get checkoutInfoPage(): CheckoutInformationPage { return (this._info ??= new CheckoutInformationPage(this.page)); }
  get checkoutOverviewPage(): CheckoutOverviewPage { return (this._overview ??= new CheckoutOverviewPage(this.page)); }
  get checkoutCompletePage(): CheckoutCompletePage { return (this._complete ??= new CheckoutCompletePage(this.page)); }
}

setWorldConstructor(CustomWorld);
