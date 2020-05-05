declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<Element>
  }
}

function login(email: string, password: string): Cypress.Chainable {
  cy.visit('/login')

  cy.get('.email')
  .type('{selectall}{del}').type(email)
  return cy.get('.password')
  .type('{selectall}{del}').type(password)
  .type('{enter}')
}
Cypress.Commands.add("login", login)
