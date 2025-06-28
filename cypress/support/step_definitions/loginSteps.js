const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require('../../pages/LoginPage');

Given("I open the login page", () => {
  LoginPage.visit();
});

When("I enter email {string} and password {string}", (username, password) => {
  LoginPage.champUsername(username);
  LoginPage.champPassword(password);
  LoginPage.boutonConnexion();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});

Then("I should see a login error message", () => {
  cy.get('.oxd-alert-content > .oxd-text')  // Remplace ce sélecteur par celui de ton application
    .should("be.visible")
    .and("contain", "Invalid credentials");
});