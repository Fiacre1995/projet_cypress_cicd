const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require('../../pages/LoginPage');

Given("I open the login page", () => {
  LoginPage.visit();
});

When("je rentre des identifiants valident", () => {
  cy.fixture("user").then((data) => {
    LoginPage.champUsername(data.validUser.username);
    LoginPage.champPassword(data.validUser.password);
    LoginPage.boutonConnexion();
  });
});

When("I enter user {string}", (userType) => {
  cy.fixture("user").then((users) => {
    const user = users[userType];
    //expect(user, `Utilisateur ${userType} non défini`).to.exist;
    LoginPage.champUsername(user.username);
    LoginPage.champPassword(user.password);
    LoginPage.boutonConnexion();
  });
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});

Then("I should see a login error message", () => {
  cy.get('.oxd-alert-content > .oxd-text')  // Remplace ce sélecteur par celui de ton application
    .should("be.visible")
    .and("contain", "Invalid credentials");
});