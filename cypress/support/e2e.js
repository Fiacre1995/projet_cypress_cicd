import './commands'
require('cypress-xpath');

beforeEach(() => {
  Cypress.config('defaultCommandTimeout', 10000);
  Cypress.config('pageLoadTimeout', 10000);
});