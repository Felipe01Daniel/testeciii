import { UserPage } from '../pages/userPage.js';

Cypress.Commands.add('deleteUserByName', (name) => {
  const userPage = new UserPage();

  return cy.wait(500) // espera antes de iniciar
    .then(() => userPage.searchUser(name))
    .then(() => userPage.validateUserExistence(name, true))
    .then(() => userPage.deleteUser(name))
    .then(() => cy.wait(500)) // espera antes de buscar novamente
    .then(() => userPage.searchUser(name))
    .then(() => userPage.validateUserExistence(name, false));
});

Cypress.Commands.add('createUser', (name, email) => {
  const userPage = new UserPage();
  userPage.elements.addButton().click();
  userPage.elements.nameInput().type(name);
  userPage.elements.emailInput().type(email);
  userPage.elements.modalButton().click();
});

Cypress.Commands.add('editUserByName', (oldName, newName, newEmail) => {
  const userPage = new UserPage();

  return userPage.searchUser(oldName)
    .then(() => userPage.validateUserExistence(oldName, true))
    .then(() => userPage.editUser(oldName, newName, newEmail))
    .then(() => userPage.searchUser(newName))
    .then(() => userPage.validateUserExistence(newName, true))
    .then(() => userPage.validateUserExistence(oldName, false));
});