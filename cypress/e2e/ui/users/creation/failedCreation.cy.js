import { UserPage } from '@pages/userPage.js';

describe('Criação de Usuário - Falha', () => {
  const userPage = new UserPage();

  beforeEach(() => {
    cy.visit('/user.html');
    cy.fixture('users/invalidUser').as('invalidUser');
    cy.fixture('users/validUser').as('validUser');
  });

  it('Deve exibir erro ao tentar criar usuário com email inválido', function () {
    const { nome, email } = this.invalidUser;
    userPage.createUser(nome, email);
    userPage.validateEmailErrorMessage('Inclua um "@" no endereço de e-mail');
    userPage.searchUser(nome);
    userPage.validateUserExistence(nome, false);
  });


  //em desenvolvimento.....
  
  // it('Deve exibir erro ao tentar criar usuário sem preencher o email', function () {
  //   const { nome } = this.validUser;
  //   userPage.createUser(nome, '');
  //   userPage.validateEmailErrorMessage('Inclua um "@" no endereço de e-mail');
  //   userPage.searchUser(nome);
  //   userPage.validateUserExistence(nome, false);
  // });

  // it('Deve exibir erro ao tentar criar usuário sem preencher o nome', function () {
  //   const { email } = this.validUser;
  //   userPage.createUser('', email);
  //   userPage.validateEmailErrorMessage('Inclua um "@" no endereço de e-mail');
  //   userPage.searchUser(email);
  //   userPage.validateUserExistence(email, false);
  // });

  // it('Não deve permitir criar usuário usando um nome já existente', function () {
  //   const { nome, email } = this.validUser;

  //   userPage.createUser(nome, email);
  //   userPage.searchUser(nome);
  //   userPage.validateUserExistence(nome, true);

  //   userPage.createUser(nome, email);
  //   userPage.searchUser(nome);
  //   userPage.validateUserExistence(nome, true);
    
  // });

  // it('Não deve permitir criar usuário usando um email já existente', function () {
  //   const { nome, email } = this.validUser;

  //   userPage.createUser(nome, email);
  //   userPage.searchUser(nome);
  //   userPage.validateUserExistence(nome, true);

  //   userPage.createUser('OutroNome', email);
  //   userPage.searchUser(nome);
  //   userPage.validateUserExistence(nome, false);
  // });

});
