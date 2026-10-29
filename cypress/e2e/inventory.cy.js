describe("Inventory", () => {
  beforeEach(() => {
    cy.fixture("users.json").then(({ validUser }) => {
      cy.login(validUser.username, validUser.password);
    });

    // Verify that login landed on the inventory page.
    cy.url().should("include", "/inventory.html");

    cy.get('[data-test="inventory-container"]')
      .should("be.visible");
  });

  it("displays the product inventory", () => {
    cy.get(".inventory_item").should("have.length", 6);

    cy.get(".inventory_item_name").should("be.visible");
    cy.get(".inventory_item_price").should("be.visible");
  });

  it("sorts products by name from A to Z", () => {
    cy.get('[data-test="product-sort-container"]').select("az");

    cy.get(".inventory_item_name").then(($names) => {
      const names = [...$names].map((element) =>
        element.innerText
      );

      expect(names).to.deep.equal([...names].sort());
    });
  });

  it("adds a product to the cart", () => {
    cy.addProductToCart("sauce-labs-backpack");

    cy.get('[data-test="shopping-cart-badge"]')
      .should("have.text", "1");

    cy.get('[data-test="remove-sauce-labs-backpack"]')
      .should("be.visible");
  });

  it("removes a product from the inventory page", () => {
    cy.addProductToCart("sauce-labs-backpack");
    cy.removeProductFromCart("sauce-labs-backpack");

    cy.get('[data-test="shopping-cart-badge"]')
      .should("not.exist");

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should("be.visible");
  });
});
