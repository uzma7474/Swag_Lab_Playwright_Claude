import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

const bool = (v: string | undefined, def: boolean): boolean =>
  v === undefined || v === '' ? def : ['true', '1', 'yes'].includes(v.toLowerCase());

/** Central, typed access to environment configuration. */
export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  browser: (process.env.BROWSER || 'chromium') as BrowserName,
  headless: bool(process.env.HEADLESS, true),
  slowMo: Number(process.env.SLOW_MO || 0),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 15000),
  navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 30000),
  screenshotOnFailure: bool(process.env.SCREENSHOT_ON_FAILURE, true),
  video: bool(process.env.VIDEO, false),
  trace: bool(process.env.TRACE, false),
  logLevel: (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
  viewport: {
    width: Number(process.env.VIEWPORT_WIDTH || 1366),
    height: Number(process.env.VIEWPORT_HEIGHT || 768),
  },
  paths: {
    reports: path.resolve(process.cwd(), 'reports'),
    screenshots: path.resolve(process.cwd(), 'reports', 'screenshots'),
    videos: path.resolve(process.cwd(), 'reports', 'videos'),
    traces: path.resolve(process.cwd(), 'reports', 'traces'),
  },
} as const;
