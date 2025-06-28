
class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  champUsername(username) {
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username);
  }

  champPassword(password) {
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
  }

  boutonConnexion() {
    cy.get('.oxd-button').click();
  }

  login(username, password) {
    this.champUsername(username);
    this.champPassword(password);
    cy.get('.oxd-button').click();
  }
}

module.exports = new LoginPage();
