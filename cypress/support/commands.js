// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");

  cy.get('[data-test="username"]')
    .should("be.visible")
    .type(username);

  cy.get('[data-test="password"]')
    .should("be.visible")
    .type(password, { log: false });

  cy.get('[data-test="login-button"]').click();

  cy.url().should("include", "/inventory.html");

  cy.get('[data-test="inventory-container"]')
    .should("be.visible");
});

Cypress.Commands.add("addProductToCart", (productName) => {
  cy.get(`[data-test="add-to-cart-${productName}"]`)
    .should("be.visible")
    .click();
});

Cypress.Commands.add("removeProductFromCart", (productName) => {
  cy.get(`[data-test="remove-${productName}"]`)
    .should("be.visible")
    .click();
});

Cypress.Commands.add("openCart", () => {
  cy.get('[data-test="shopping-cart-link"]').click();
  cy.url().should("include", "/cart.html");
});
