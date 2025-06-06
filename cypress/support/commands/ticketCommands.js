Cypress.Commands.add('createTicket', (title, description) => {
  cy.visit('/tickets');
  cy.get('#title').type(title);
  cy.get('#description').type(description);
  cy.contains('Salvar').click();
});

Cypress.Commands.add('deleteTicket', (title) => {
  cy.visit('/tickets');
  cy.get('tr').contains(title).parent().contains('Excluir').click();
});