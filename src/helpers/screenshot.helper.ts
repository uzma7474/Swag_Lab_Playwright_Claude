import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { config } from '../utils/config';

export async function takeScreenshot(page: Page, name: string): Promise<Buffer> {
  fs.mkdirSync(config.paths.screenshots, { recursive: true });
  const safe = name.replace(/[^a-z0-9_-]+/gi, '_').slice(0, 100);
  const file = path.join(config.paths.screenshots, `${safe}_${Date.now()}.png`);
  return page.screenshot({ path: file, fullPage: true });
}
