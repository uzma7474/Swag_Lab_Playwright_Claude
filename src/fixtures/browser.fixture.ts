import fs from 'fs';
import { Browser, BrowserContext, chromium, firefox, webkit } from '@playwright/test';
import { config } from '../utils/config';
import { logger } from '../helpers/logger';

let browser: Browser | undefined;

/** One browser per worker process; one isolated context per scenario. */
export async function launchBrowser(): Promise<Browser> {
  if (browser) return browser;
  const launcher = { chromium, firefox, webkit }[config.browser];
  if (!launcher) throw new Error(`Unsupported BROWSER "${config.browser}"`);
  logger.info(`Launching ${config.browser} (headless=${config.headless})`);
  browser = await launcher.launch({ headless: config.headless, slowMo: config.slowMo });
  return browser;
}

export async function closeBrowser(): Promise<void> {
  await browser?.close();
  browser = undefined;
}

export async function createContext(): Promise<BrowserContext> {
  const b = await launchBrowser();
  if (config.video) fs.mkdirSync(config.paths.videos, { recursive: true });
  const context = await b.newContext({
    baseURL: config.baseUrl,
    viewport: config.viewport,
    ...(config.video ? { recordVideo: { dir: config.paths.videos } } : {}),
  });
  context.setDefaultTimeout(config.defaultTimeout);
  context.setDefaultNavigationTimeout(config.navigationTimeout);
  if (config.trace) await context.tracing.start({ screenshots: true, snapshots: true, sources: false });
  return context;
}
