import '../support'

describe('My First Test', () => {
  it('Login to the application', () => {
    cy.login('admin@test.com', 'admin@test.com')

    cy.url().should('equal', Cypress.config().baseUrl)
  })
})
