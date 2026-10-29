
describe("Shopping Cart", () => {

beforeEach(() => {
  cy.fixture("users.json").then(({ validUser }) => {
    cy.login(validUser.username, validUser.password);
  });

  // cy.login() already lands on the inventory page.
  // Do not navigate to /inventory.html again.

  cy.addProductToCart("sauce-labs-backpack");
  cy.openCart();
});

  it("displays the selected product", () => {
    cy.get(".cart_item").should("have.length", 1);

    cy.get('[data-test="inventory-item-name"]')
      .should("have.text", "Sauce Labs Backpack");

    cy.get('[data-test="inventory-item-price"]')
      .should("have.text", "$29.99");
  });

  it("removes a product from the cart", () => {
    cy.removeProductFromCart("sauce-labs-backpack");

    cy.get(".cart_item").should("not.exist");
    cy.get('[data-test="shopping-cart-badge"]')
      .should("not.exist");
  });

  it("continues shopping and returns to inventory", () => {
    cy.get('[data-test="continue-shopping"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_item").should("have.length", 6);
  });

  it("continues to checkout with a selected product", () => {
    cy.get('[data-test="checkout"]').click();

    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').should("be.visible");
  });
});