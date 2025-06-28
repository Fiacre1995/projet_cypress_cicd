
class DashboardPage {
  verifierMot(motRechercher) {
    cy.contains(motRechercher, { timeout: 10000 }).should('be.visible');
  }
}

module.exports = new DashboardPage();
