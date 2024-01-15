// steps.js
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("que o usuario esta na pagina inicial", () => {
  // Implemente a lógica para visitar a página inicial
  cy.visit('/');
  failOnStatusCode: false,
  cy.wait(6000)
  cy.get('.lgpd_button > .button').click();
});

When("o usuário busca e adiciona o produto {string} ao carrinho", (fixtureName) => {
  cy.fixture('produtos.json').then((produtos) => {
    // Use find para procurar o produto pelo nome
    const produto = produtos.produtos.find((p) => p.name === fixtureName);

    if (!produto) {
      throw new Error(`Produto com o nome ${fixtureName} não encontrado na fixture.`);
    }

    // Agora, você pode acessar a propriedade name do produto encontrado
    cy.get('.input').type(produto.name).type('{enter}');
    cy.get('.list-product-card').contains(produto.name).click();
    cy.wait(2000)
    cy.get('.product-infos > commons-button > .button').should('exist').dblclick();
    cy.wait(2000)
  });
});
Then("I should see the {string} in the cart", () => {
  cy.get('.header__action--item__total-items').click()
});
And("the {string} is logged", (userName) => {

  // Adicione uma verificação inicial para verificar se o usuário já está logado
  cy.get('.header__action--item__initials').then((avatar) => {
    if (avatar.length > 0) {
      // O usuário já está logado, não é necessário fazer login novamente
      cy.log('Usuário já está logado');
      return;
    }

    // Se o avatar não foi encontrado, faça o login
    cy.fixture('user.json').then((userData) => {
      const user = userData.user.find((p) => p.name === userName);

      if (!user) {
        throw new Error(`User with name ${userName} not found in fixture.`);
      }

      cy.visit('/', { failOnStatusCode: false });
      cy.get('.header__action > :nth-child(1)').click();
      cy.get('[_ngcontent-serverapp-c40=""][type="email"] > .commons-input > #email').type(user.email);
      cy.get('.commons-input > #password').type(user.password);
      cy.get(':nth-child(6) > commons-button > .button').click();

      // Adicione uma verificação para garantir que o login foi bem-sucedido
      cy.url().should('not.include', 'login'); // Ou ajuste conforme a URL de sucesso

      // Verifique se o elemento de avatar ou algum outro indicador de login está presente
      cy.get('.header__action--item__initials').should('exist');
    });
  });
});





