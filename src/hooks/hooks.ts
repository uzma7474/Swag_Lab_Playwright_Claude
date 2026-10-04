import fs from 'fs';
import path from 'path';
import { After, AfterAll, AfterStep, Before, BeforeAll, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../fixtures/world';
import { closeBrowser, createContext, launchBrowser } from '../fixtures/browser.fixture';
import { config } from '../utils/config';
import { logger } from '../helpers/logger';
import { takeScreenshot } from '../helpers/screenshot.helper';

BeforeAll(async () => {
  fs.mkdirSync(config.paths.reports, { recursive: true });
  await launchBrowser();
});

AfterAll(async () => {
  await closeBrowser();
});

Before(async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  logger.info(`▶ Scenario: ${pickle.name}`);
  this.context = await createContext();
  this.page = await this.context.newPage();
});

/** Tag @loggedIn: start scenario already authenticated as standard_user. */
Before({ tags: '@loggedIn' }, async function (this: CustomWorld) {
  const { getUser } = await import('../utils/users');
  const user = getUser('standard_user');
  await this.loginPage.open();
  await this.loginPage.login(user.username, user.password);
});

AfterStep(async function (this: CustomWorld, { result }) {
  if (result.status === Status.FAILED) {
    logger.error('Step failed');
  }
});

After(async function (this: CustomWorld, { pickle, result }: ITestCaseHookParameter) {
  const failed = result?.status === Status.FAILED;

  if (failed && config.screenshotOnFailure && this.page) {
    const png = await takeScreenshot(this.page, pickle.name);
    this.attach(png, 'image/png');
  }

  if (config.trace) {
    fs.mkdirSync(config.paths.traces, { recursive: true });
    const tracePath = path.join(config.paths.traces, `${pickle.name.replace(/[^a-z0-9_-]+/gi, '_')}.zip`);
    await this.context.tracing.stop(failed ? { path: tracePath } : undefined);
  }

  await this.page?.close();
  await this.context?.close();
  logger.info(`■ ${failed ? 'FAILED' : 'Finished'}: ${pickle.name}`);
});
