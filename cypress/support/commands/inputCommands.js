Cypress.Commands.add('input', (selector, value) => {
  cy.get(selector)
    .should('exist')
    .should('be.visible')
    .clear()
    .type(value, { delay: 80 }) // simula digitação humana
    .trigger('input')
    .trigger('change')
    .blur();
});