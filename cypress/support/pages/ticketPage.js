export class TicketPage {
  elements = {

    nameInput: () => cy.get('[for="name"]'),
    emailInput: () => cy.get('[for="email"]'),
    pswInput: () => cy.get('[for="psw"]'),
    modalButton: () => cy.get('button'),
    dropStatus: () => cy.get('div.filterContainer select'),
    cards: () => cy.get('.card'),
    visibleCards: () => cy.get('.card:visible'),
    cardStatusText: (card) =>
      Cypress.$(card)
        .find('div.lower')
        .contents()
        .filter(function () {
          return this.nodeType === Node.TEXT_NODE;
        })
        .text()
        .trim(),
  };

  selectStatusFilter(status) {
    cy.get('div.filterContainer select').select(status);
  }

  validateAllCardsHaveStatus(expectedStatus) {
    this.elements.dropStatus().select(expectedStatus);
    this.elements.visibleCards({ timeout: 5000 }).should((cards) => {
      if (!cards.length) {
        throw new Error('❌ Nenhum card visível encontrado para validar status.');
      }

      Cypress._.each(cards, (card, index) => {
        const status = this.elements.cardStatusText(card);
        if (status !== expectedStatus) {
          throw new Error(`❌ BUG: Card #${index + 1} tem status "${status}" diferente do esperado "${expectedStatus}".`);
        }
      });
    });

    this.elements.visibleCards().then((cards) => {
      cy.log(`✔️ Todos os ${cards.length} cards visíveis possuem status "${expectedStatus}".`);
    });
  }


}