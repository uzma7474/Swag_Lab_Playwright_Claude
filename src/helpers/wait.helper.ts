import { Locator, Page } from '@playwright/test';

/** Retries an async action until it succeeds or attempts are exhausted. */
export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 500): Promise<T> {
  let lastError: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts) await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastError;
}

export async function waitForVisible(locator: Locator, timeout?: number): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForUrlContains(page: Page, fragment: string, timeout?: number): Promise<void> {
  await page.waitForURL((url) => url.toString().includes(fragment), { timeout });
}
