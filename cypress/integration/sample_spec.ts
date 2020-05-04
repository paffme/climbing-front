import "../support"


describe('My First Test', () => {
  it('Login to the application', () => {
    cy.login("admin@test.com", "admin@test.com")
    //cy.get(".toto")

    //cy.get('.email').dellInputText().type("admin@test.com{enter}")
    // cy.get('.password')
    //   .type('{del}{selectall}{backspace}').type("admin@test.com")
    //   .type('{enter}');


    cy.url().should('equal', Cypress.config().baseUrl)
  })
})
