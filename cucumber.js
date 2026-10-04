// Cucumber-JS configuration. Run a profile with: cucumber-js --profile <name>
const common = {
  requireModule: ['ts-node/register'],
  require: ['src/fixtures/**/*.ts', 'src/hooks/**/*.ts', 'src/steps/**/*.ts'],
  paths: ['src/features/**/*.feature'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/cucumber-junit.xml',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

module.exports = {
  default: { ...common },
  parallel: { ...common, parallel: Number(process.env.WORKERS || 4) },
  ci: { ...common, format: ['summary', 'html:reports/cucumber-report.html', 'json:reports/cucumber-report.json', 'junit:reports/cucumber-junit.xml'], retry: 1, parallel: Number(process.env.WORKERS || 2) },
};
