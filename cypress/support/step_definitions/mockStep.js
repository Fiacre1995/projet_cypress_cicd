const { Given, When, Then, And } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const PimPage = require('../../pages/PimPage');


When("J'accede à la page PIM Mockée", () => {
  // Interception de l’API employées
  cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC',
      { 
        statusCode: 200,
        fixture: 'mock.json' 
      }
    ).as('getEmployees');

  cy.get(':nth-child(2) > .oxd-main-menu-item').click();
  DashboardPage.verifierMot("PIM");

   // Attend que la réponse mockée soit utilisée
  cy.wait('@getEmployees');
});

