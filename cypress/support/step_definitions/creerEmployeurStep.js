const { Given, When, Then, And } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const PimPage = require('../../pages/PimPage');

Given("je me connecte avec un compte valide {string}", (userType) => {
  cy.generateEmployeurFixture();      // Permet de charger le fichier employe.json par Faker
  cy.fixture("user").then((users) => {
    const user = users[userType];
    LoginPage.visit();
    LoginPage.login(user.username, user.password);
    DashboardPage.verifierMot("Dashboard");
  });
});

When("J'accede à la page PIM", () => {
  cy.get(':nth-child(2) > .oxd-main-menu-item').click();
  DashboardPage.verifierMot("PIM");
});

When("je remplir le formulaire remplir et je valide", () => {
   cy.fixture("employe").then((data) => {
    cy.get('.orangehrm-header-container > .oxd-button').click();
    PimPage.creerEmployeur(data.firstName, data.lastName, data.username, data.password, data.password);
  
  });
});

When("je valide un formulaire vide", () => {
  cy.get('.orangehrm-header-container > .oxd-button').click();
  PimPage.boutonSave();
});

Then("je suis rediriger vers la page Information Employe", () => {
  cy.url({ timeout: 10000 }).should("include", "/viewPersonalDetails");
});

Then("je reste sur la page du formulaire avec des messages d'erreur", () => {
  cy.url({ timeout: 10000 }).should("include", "/addEmployee");
});