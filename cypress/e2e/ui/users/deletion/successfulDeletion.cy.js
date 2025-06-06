describe('Exclusão de Usuário - Sucesso', () => {
  beforeEach(() => {
    cy.visit('/user.html');
    cy.fixture('users/validUser').as('validUser');
  });

  it('Deve deletar um usuário com sucesso', function () {
    cy.deleteUserByName(this.validUser.nome);
  });
});