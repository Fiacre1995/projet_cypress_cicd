
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

  boutonSave() {
    cy.get('.oxd-button--secondary').click();
  }

  creerEmployeur(prenom, nom) {
    this.champFile();
    this.champPrenom(prenom);
    this.champNom(nom);
    cy.get('.oxd-button--secondary').click();
  }
}

module.exports = new PimPage();
