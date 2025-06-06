import { TicketPage } from '@pages/ticketPage.js';

describe('Validação de Filtro - Status Open', () => {
  const ticketPage = new TicketPage();

  beforeEach(() => {
    cy.visit('/ticket.html');
  });

  it('Deve filtrar os tickets pelo status Open com sucesso', () => {
    // Clicar no dropdown e selecionar Open
    ticketPage.validateAllCardsHaveStatus('Open');
  });

  it('Deve filtrar os tickets pelo status Closed com sucesso', () => {
    ticketPage.validateAllCardsHaveStatus('Closed');
  });

  it('Deve filtrar os tickets pelo status In Progress com sucesso', () => {
    ticketPage.validateAllCardsHaveStatus('In Progress');
  });

});

