const { Given, When, Then, And } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const PimPage = require('../../pages/PimPage');

Given("je me connecte avec un compte valide : {string} et {string}", (username, password) => {
  LoginPage.visit();
  LoginPage.login(username, password);
  DashboardPage.verifierMot("Dashboard");
});

When("J'accede à la page PIM", () => {
  cy.get(':nth-child(2) > .oxd-main-menu-item').click();
  DashboardPage.verifierMot("PIM");
});

When("je remplir le formulaire et je valide : {string} et {string}", (prenom, nom) => {
  cy.get('.orangehrm-header-container > .oxd-button').click();
  PimPage.creerEmployeur(prenom, nom)
});

When("je remplir le formulaire et je valide", () => {
  cy.get('.orangehrm-header-container > .oxd-button').click();
  PimPage.boutonSave();
  //cy.get('.--name-grouped-field > :nth-child(1) > .oxd-text').should("be.visible").and("contain", "Required");
});

Then("je suis rediriger vers la page Information Employe", () => {
  cy.url().should("include", "/viewPersonalDetails");
});