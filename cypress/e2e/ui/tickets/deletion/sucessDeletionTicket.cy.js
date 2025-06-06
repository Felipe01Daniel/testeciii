import { TicketPage } from '@pages/ticketPage.js';
describe('Exclusão de Ticket - Sucesso', () => {
  const ticketPage = new TicketPage();

  beforeEach(() => {
    cy.visit('/ticket.html');
  });

  it('Deve deletar um tick com sucesso', function () {
    ticketPage.selectStatusFilter('Closed');
  });
});