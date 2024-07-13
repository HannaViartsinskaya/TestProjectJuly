# E2E testing
In this suite you will find GitHub Actions:
- one workflow will be executed automatically if you will push something to the repo
- the 2nd one - you can trigger manually

For Reporting tool I used Mocha - Results you can find under the summary in executed Github Action

## Documentation

1. [Cypress](https://docs.cypress.io/api/table-of-contents)
2. [Gherkin](https://cucumber.io/docs/gherkin/reference)

## Running on GitHub Actions
1. Go to https://github.com/HannaViartsinskaya/TestTask/actions/workflows/manual_run.yml
2. Click on [Run workflow] button

## Running locally

1. Run `npm ci` in the `./` directory (`<root>/e2e`),
2. Run `npm run cy:run` to start E2E (Cypress) tests.
3. Run 'npm run generate:report' to generate reports.
