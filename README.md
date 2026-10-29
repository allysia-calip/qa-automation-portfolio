# Cypress E2E Automation — SauceDemo

A Cypress end-to-end automation suite demonstrating practical QA engineering skills through authentication, inventory, shopping cart, and checkout testing.

## Tech Stack
- Cypress
- JavaScript
- Mocha and Chai assertions
- GitHub Actions
- Node.js and npm

## Application Under Test

SauceDemo

## Test Coverage
| Module | Test Scenarios |
|---|---|
| Authentication | Valid login, invalid credentials, locked account, logout |
| Inventory | Product listing, sorting, add/remove products |
| Shopping Cart | Product details, item removal, continue shopping |
| Checkout | Required fields, order review, successful purchase |
| CI/CD | GitHub Actions, automated execution, failure artifacts |

## Getting Started
## Prerequisites
- Node.js LTS
- npm
- Git

## Installation
bash
git clone https://github.com/allysia-calip/qa-automation-portfolio.git
cd cypress-e2e-automation
npm ci

## Run tests
Open the Cypress Test Runner:

bash
npm run cy:open


Run all tests in headless mode:

bash
npm run cy:run


Run individual suites:

bash
npm run cy:auth
npm run cy:inventory
npm run cy:cart
npm run cy:checkout

## Project Structure

- cypress/e2e/ — automated test specifications
- cypress/fixtures/ — test data
- cypress/support/commands.js — reusable Cypress commands
- cypress.config.js — test configuration
- .github/workflows/ — CI workflow

## Quality Engineering Practices
- Reusable custom commands
- Fixture-driven test data
- Isolated test scenarios
- Assertions on application behavior
- Cypress session reuse
- CI execution and failure artifacts

## Test Results

Add verified test execution results and screenshots here after running the suite locally or in GitHub Actions.

## Scope and Limitations

This is a portfolio practice project targeting a publicly accessible demo application. Availability, test data, and application behavior may change. Results reflect the environment and execution date; passing tests do not guarantee complete application coverage.

## Author

Allysia Marie Calip — Software QA Engineer

LinkedIn: https://www.linkedin.com/in/allysia-marie-calip/