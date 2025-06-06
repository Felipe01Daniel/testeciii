import { UserPage } from '@pages/userPage.js';

describe('Busca de Usuário - Sucesso', () => {
  const userPage = new UserPage();

  beforeEach(() => {
    cy.visit('/user.html');
    cy.fixture('users/validUser').as('validUser');
  });

  it('Pesquisar e validar usuário existente', function () {
    const nomeUsuario = this.validUser.nome;
    userPage.searchUser(nomeUsuario);
    userPage.validateUserExistence(nomeUsuario, true);
  });
});