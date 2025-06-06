import { faker } from '@faker-js/faker';

Cypress.Commands.add('registerRandomUser', () => {
  const nome = faker.person.fullName();
  const email = faker.internet.email();
  const senha = faker.internet.password({ length: 12 });

  cy.visit('/signUp.html');

  cy.get(SignUpPage.inputNome).type(nome);
  cy.get(SignUpPage.inputEmail).type(email);
  cy.get(SignUpPage.inputSenha).type(senha);
  cy.get(SignUpPage.btnRegistrar).click();

  // encapsula os dados usando cy.wrap()
  cy.wrap({ nome, email, senha });
});


import { LoginPage } from '@pages/LoginPage';
import { SignUpPage } from '@pages/SignUpPage';

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/login.html');
    // Aguarda carregamento da página
    cy.wait(500);
    cy.url().then((url) => {
        if (url.includes('/user.html') || Cypress.$(LoginPage.btnLogout).length) {
            cy.get(LoginPage.btnLogout).click();
            cy.wait(300);
        }
    });

    cy.get(LoginPage.inputEmail).type(email);
    cy.get(LoginPage.inputSenha).type(senha);
    cy.get(LoginPage.btnEntrar).should('be.enabled').click();
    cy.get(LoginPage.btnLogout).should('exist');
});

Cypress.Commands.add('logout', () => {
    cy.get('header button').contains('Logout').click();
});
