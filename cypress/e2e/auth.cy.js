
describe("Authentication", () => {
  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.visit("/");
  });

  it("logs in with valid credentials", function () {
    const { username, password } = this.users.validUser;

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password, { log: false });
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

  it("shows an error for invalid credentials", function () {
    const { username, password } = this.users.invalidUser;

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password, { log: false });
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match");
  });

  it("prevents a locked-out user from logging in", function () {
    const { username, password } = this.users.lockedUser;

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password, { log: false });
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "locked out");
  });

  it("requires a username", () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("contain.text", "Username is required");
  });

  it("requires a password", function () {
    cy.get('[data-test="username"]')
      .type(this.users.validUser.username);

    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("contain.text", "Password is required");
  });

  it("logs out successfully", function () {
    const { username, password } = this.users.validUser;

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password, { log: false });
    cy.get('[data-test="login-button"]').click();

    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get('[data-test="login-button"]').should("be.visible");
  });
});