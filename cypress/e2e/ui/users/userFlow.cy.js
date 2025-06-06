import { UserPage } from '@pages/userPage.js';

describe('Fluxo Completo de Usuário', () => {
    const userPage = new UserPage();

    beforeEach(() => {
        cy.visit('/user.html');
    });

    it('Deve criar um novo usuário com sucesso', () => {
        cy.fixture('users/validUser').then(({ nome, email }) => {
            userPage.createUser(nome, email);
            userPage.searchUser(nome);
            userPage.validateUserExistence(nome, true);
        });
    });

    it('Deve editar o usuário criado', () => {
        cy.fixture('users/validUser').then(validUser => {
            cy.fixture('users/editUser').then(editUser => {
                cy.editUserByName(validUser.nome, editUser.nome, editUser.email);
                
            });
        });
    });

    it('Deve pesquisar e validar usuário existente', () => {
        cy.fixture('users/editUser').then(({ nome }) => {
            userPage.searchUser(nome);
            userPage.validateUserExistence(nome, true);
        });
    });

    it('Deve deletar o usuário', () => {
        cy.fixture('users/editUser').then(({ nome }) => {
            cy.deleteUserByName(nome);
        });
    });

    it('Deve pesquisar usuário inexistente', () => {
        cy.fixture('users/editUser').then(({ nome }) => {
            userPage.searchUser(nome);
            userPage.validateUserExistence(nome, false);
        });
    });
});