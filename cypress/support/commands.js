import 'cypress-file-upload';
import { genererEmployeur } from '../../utils/fakerUtils';

Cypress.Commands.add('generateEmployeurFixture', () => {
  const employe = genererEmployeur();
  cy.writeFile('cypress/fixtures/employe.json', employe);
});

