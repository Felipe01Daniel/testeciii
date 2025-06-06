import { UserPage } from '@pages/userPage.js';

describe('Criação de Usuário - Sucesso', () => {
  const userPage = new UserPage();

  beforeEach(() => {
    cy.visit('/user.html');
    cy.fixture('users/validUser').as('validUser');
  });

  it('Criar um novo usuário com sucesso', function () {
    const { nome, email } = this.validUser;

    userPage.createUser(nome, email);
    userPage.searchUser(nome);
    userPage.validateUserExistence(nome, true);
  });

});