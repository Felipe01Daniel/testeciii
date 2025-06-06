export class UserPage {
  elements = {
    searchInput: () => cy.get('div.filterContainer input[type="search"]'),
    addButton: () => cy.get('button#addButton'),
    nameInput: () => cy.get('input#name'),
    emailInput: () => cy.get('input#email'),
    modalButton: () => cy.get('button#modal-button'),
    userCard: () => cy.get('.card'),
    userName: () => cy.get('.card .upper'),
    userEmail: () => cy.get('.card .lower'),
    deleteButton: (card) => cy.wrap(card).find('[alt="delete button"]'),
    editButton: (card) => cy.wrap(card).find('[alt="edit button"]'),
    closeButton: () => cy.get('.close')
  }

  searchUser(name) {
    return this.elements.searchInput()
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .then(($input) => {
        $input.val(name.toLowerCase());
        $input.trigger('input');
        $input.trigger('change');
        $input.trigger('keyup');
      });
  }

  validateUserExistence(name, shouldExist) {
    cy.get('body').then($body => {
      const cards = $body.find('.card');
      const nameLower = name.toLowerCase();

      if (cards.length === 0) {
        if (shouldExist) {
          throw new Error(`❌ BUG: Esperava encontrar o usuário "${name}", mas nenhum card foi encontrado na página.`);
        }
        cy.log(`✔️ Passed. Nenhum card na tela e o usuário "${name}" não deveria existir.`);
        return;
      }

      const matchingCards = Cypress.$(cards).filter((_, el) => {
        const nomeNoCard = Cypress.$(el).find('.upper').text().trim().toLowerCase();
        return nomeNoCard === nameLower;
      });

      const quantidade = matchingCards.length;

      if (shouldExist) {
        if (quantidade === 1) {
          cy.log(`✔️ Passed. Usuário "${name}" encontrado corretamente.`);
        } else {
          throw new Error(
            quantidade === 0
              ? `❌ BUG: Esperava encontrar o usuário "${name}", mas ele não foi encontrado.`
              : `❌ BUG: Esperava encontrar 1 usuário "${name}", mas encontrei ${quantidade}.`
          );
        }
      } else {
        if (quantidade === 0) {
          cy.log(`✔️ Passed. Usuário "${name}" não está presente, conforme esperado.`);
        } else {
          throw new Error(`❌ BUG: Usuário "${name}" não deveria existir, mas foi encontrado ${quantidade} vezes.`);
        }
      }
    });
  }

  createUser(name, email) {
    this.elements.addButton().click();
    this.elements.nameInput().type(name);
    this.elements.emailInput().type(email);
    this.elements.modalButton().should('be.visible').click();
  }

  getUserCardByName(name) {
    const nameLower = name.toLowerCase();
    return this.elements.userCard()
      .filter((index, el) => {
        const nomeNoCard = Cypress.$(el).find('.upper').text().trim().toLowerCase();
        return nomeNoCard === nameLower;
      });
  }

  deleteUser(name) {
    return this.getUserCardByName(name).then(cards => {
      if (!cards.length) {
        throw new Error(`❌ Usuário "${name}" não encontrado para exclusão.`);
      }
      return this.elements.deleteButton(cards[0])
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true });
    });
  }

  editUser(oldName, newName, newEmail) {
    return this.getUserCardByName(oldName).then(cards => {
      if (!cards.length) {
        throw new Error(`❌ Usuário "${oldName}" não encontrado para edição.`);
      }
      // Garante visibilidade, scroll e clique forçado
      return this.elements.editButton(cards[0])
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .then(() => {
          // Depois que abrir o modal, preenche os inputs
          this.elements.nameInput().should('be.visible').clear().type(newName);
          this.elements.emailInput().clear().type(newEmail);
          this.elements.modalButton().click();
        });
    });
  }


  validateEmailErrorMessage(expectedMessage, timeout = 4000) {
    return this.elements.emailInput()
      .should('be.visible')
      .then(($input) => {
        const nativeValidationMessage = $input[0].validationMessage || '';

        if (typeof expectedMessage === 'string'
          ? nativeValidationMessage.includes(expectedMessage)
          : expectedMessage.test(nativeValidationMessage)) {
          cy.log('SUCESSO: Mensagem de validação encontrada via API nativa');
          cy.log(`Mensagem nativa: "${nativeValidationMessage}"`);
          return cy.wrap('native');
        }

        return cy.get('[data-testid="email-error"], .error-message, [role="alert"]', { timeout })
          .should('be.visible')
          .then(($error) => {
            const errorText = $error.text().replace(/\s+/g, ' ').trim();

            try {
              if (typeof expectedMessage === 'string') {
                expect(errorText).to.include(expectedMessage);
              } else {
                expect(errorText).to.match(expectedMessage);
              }
              cy.log('SUCESSO: Mensagem de validação encontrada na UI');
              cy.log(`Mensagem UI: "${errorText}"`);
              return cy.wrap('ui');
            } catch (error) {
              cy.log('ERRO: Falha na validação da mensagem de erro');
              cy.log(`Mensagem esperada: "${expectedMessage}"`);
              cy.log(`Mensagem nativa: "${nativeValidationMessage || 'Não encontrada'}"`);
              cy.log(`Mensagem UI: "${errorText || 'Não encontrada'}"`);
              throw error;
            }
          });
      })
      .then(() => {
        cy.wait(500);
        this.elements.closeButton()
          .should('be.visible')
          .click({ delay: 10000 });
      });
  }
}