describe('Edição de Usuário - Sucesso', () => {
  beforeEach(() => {
    cy.visit('/user.html');
    cy.fixture('users/validUser').as('validUser');
    cy.fixture('users/editUser').as('editUser');
  });

  it('Deve editar um usuário com sucesso', function () {
    cy.editUserByName(
      this.validUser.nome,
      this.editUser.nome,
      this.editUser.email
    );
  });
});