describe('Login - Sucesso', () => {
  beforeEach(function () {
    cy.fixture('globalUser').as('globalUser');
  });

  it('Deve realizar login com email e senha válidos', function () {
    const { email, senha } = this.globalUser;
    cy.login(email, senha);
    // cy.logout();
  });
});