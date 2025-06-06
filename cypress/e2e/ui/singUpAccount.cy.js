it('Deve registrar e exibir dados do novo usuário', () => {
  cy.registerRandomUser().then((user) => {
    cy.log(`Usuário registrado: ${user.email} | Senha: ${user.senha}`);
  });
});