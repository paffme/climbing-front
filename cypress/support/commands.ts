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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<Element>

    // dellInputText: typeof dellInputText
  }

}

function login(email: string, password: string): Cypress.Chainable {
  cy.visit('/login')

  cy.get('.email')
  .type('{del}{selectall}{backspace}').type("admin@test.com")
  return cy.get('.password')
  .type('{del}{selectall}{backspace}').type("admin@test.com")
  .type('{enter}')
}
Cypress.Commands.add("login", login)


// function dellInputText(): Cypress.cy {
//   cy.type('{del}{selectall}{backspace}');
//
//   return cy;
// }
// Cypress.Commands.add("dellInputText", dellInputText);

