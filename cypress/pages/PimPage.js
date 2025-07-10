
class PimPage {

  verifierMot(motRechercher) {
    cy.contains(motRechercher, { timeout: 10000 }).should('be.visible');
  }

  cliquerSurBoutonAdd() {
    cy.get('.orangehrm-header-container > .oxd-button').click();
  }

  champFile() {
    cy.xpath("//input[@class='oxd-file-input']").attachFile('image1.jpg');
  }
  
  champPrenom(prenom) {
    cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').clear().type(prenom);
  }

  champNom(nom) {
    cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').clear().type(nom);
  }

  champUsername(username) {
    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username);
  }

  champPassword(password) {
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
  }

  champConfirmPassword(confirmPassword) {
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(confirmPassword);
  }

  boutonCocherDetailsLogin() {
    cy.get('.oxd-switch-input').click();
  }

  boutonSave() {
    cy.get('.oxd-button--secondary').click();
  }

  creerEmployeur(prenom, nom, username, password, confirmPassword) {
    this.champFile();
    this.champPrenom(prenom);
    this.champNom(nom);
    this.boutonCocherDetailsLogin();
    cy.url().should("include", "/addEmployee");
    this.champUsername(username);
    this.champPassword(password);
    this.champConfirmPassword(confirmPassword);
    cy.get('.oxd-button--secondary').click();
  }
}

module.exports = new PimPage();
