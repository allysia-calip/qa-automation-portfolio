
describe("Checkout", () => {

  beforeEach(() => {
    cy.fixture("users.json").then(({ validUser }) => {
      cy.login(validUser.username, validUser.password);
    });

    // cy.login() already lands on the inventory page.
    // Do not navigate to /inventory.html again.

    cy.addProductToCart("sauce-labs-backpack");
    cy.openCart();
    cy.get('[data-test="checkout"]').click();
  });

  it("requires customer information", () => {
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "First Name is required");
  });

  it("validates checkout form fields", () => {
    cy.fixture("checkout.json").then(({ customer }) => {
      cy.get('[data-test="firstName"]').type(customer.firstName);
      cy.get('[data-test="lastName"]').type(customer.lastName);
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="error"]')
        .should("be.visible")
        .and("contain.text", "Postal Code is required");
    });
  });

  it("reviews the order before completing checkout", () => {
    cy.fixture("checkout.json").then(({ customer, product }) => {
      cy.get('[data-test="firstName"]').type(customer.firstName);
      cy.get('[data-test="lastName"]').type(customer.lastName);
      cy.get('[data-test="postalCode"]').type(customer.postalCode);
      cy.get('[data-test="continue"]').click();

      cy.url().should("include", "/checkout-step-two.html");

      cy.get(".cart_item").should("have.length", 1);
      cy.get('[data-test="inventory-item-name"]')
        .should("have.text", product.name);

      cy.get('[data-test="subtotal-label"]')
        .should("contain.text", "29.99");

      cy.get('[data-test="tax-label"]').should("be.visible");
      cy.get('[data-test="total-label"]').should("be.visible");
    });
  });

  it("completes an order successfully", () => {
    cy.fixture("checkout.json").then(({ customer, product }) => {
      cy.get('[data-test="firstName"]').type(customer.firstName);
      cy.get('[data-test="lastName"]').type(customer.lastName);
      cy.get('[data-test="postalCode"]').type(customer.postalCode);
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="inventory-item-name"]')
        .should("have.text", product.name);

      cy.get('[data-test="finish"]').click();

      cy.url().should("include", "/checkout-complete.html");

      cy.get('[data-test="complete-header"]')
        .should("have.text", "Thank you for your order!");

      cy.get('[data-test="back-to-products"]')
        .should("be.visible")
        .click();

      cy.url().should("include", "/inventory.html");
    });
  });
});