Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
    cy.wait(500);
    cy.get('#g-recaptcha *> iframe')
      .then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find('.recaptcha-checkbox-border')
          .should('be.visible')
          .click();
      });
  });