# Swag Labs – Playwright + TypeScript + Cucumber (BDD) Framework

Automation framework for <https://www.saucedemo.com> using the **Page Object Model**, built **test-first**
(Gherkin specifications are written before step definitions and page objects).

## Tech stack
Playwright · TypeScript · Cucumber-JS · dotenv · Faker · GitHub Actions

## Structure
```
├── cucumber.js                 # profiles: default | parallel | ci
├── .env.example                # BASE_URL, BROWSER, HEADLESS, TRACE, VIDEO ...
├── src
│   ├── features/               # 1. Gherkin specs (written FIRST – the tests drive the design)
│   ├── steps/                  # 2. Thin step definitions (no selectors, only page-object calls)
│   ├── pages/                  # 3. Page Objects (+ components/HeaderComponent)
│   ├── fixtures/               # 4. world.ts (per-scenario state + lazy page objects), browser.fixture.ts
│   ├── hooks/                  # 5. Before/After lifecycle, screenshots, traces, @loggedIn shortcut
│   ├── helpers/                # 6. logger, wait/retry, price, string, screenshot helpers
│   ├── utils/                  # config, json-reader, data-generator, user lookup
│   └── test-data/              # users.json, products.json, messages.json
└── reports/                    # HTML / JSON / JUnit reports, screenshots, traces
```

## Getting started
```bash
npm install                 # also installs the Playwright browser
cp .env.example .env        # optional, defaults already work
npm run test                # all scenarios
npm run test:smoke          # @smoke
npm run test:regression     # @regression
npm run test:negative       # @negative
npm run test:parallel       # WORKERS=4 by default
npm run test:headed         # watch it run
BROWSER=firefox npm test    # chromium | firefox | webkit
npm run test:dry            # validate every step is defined, without running
```
Reports: `reports/cucumber-report.html`, `cucumber-report.json`, `cucumber-junit.xml`.
Failed scenarios get a full-page screenshot attached to the report; set `TRACE=true` for Playwright traces
(`npx playwright show-trace reports/traces/<scenario>.zip`).

## Design rules
- **Features own the behaviour**; steps are one-liners that delegate to page objects.
- **Page objects never assert** business outcomes; they expose state (getters) and actions. Assertions live in steps.
- **Locators** use SauceDemo's stable `data-test` attributes.
- **Isolation**: every scenario gets a fresh browser context (no shared cookies / cart state).
- Tag `@loggedIn` on a feature/scenario to skip UI login in the Background.
- Add a new page → create class in `src/pages`, export in `index.ts`, add a lazy getter in `fixtures/world.ts`.
