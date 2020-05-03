describe('My First Test', () => {
  it('Visits the web site "paffme.hdaroit.fr"', () => {
    //cy.visit('https://paffme.hdaroit.fr/login')
    cy.visit('http://localhost:8002/login')

    cy.get('.email')
      .type('{del}{selectall}{backspace}').type("admin@test.com");
    cy.get('.password')
      .type('{del}{selectall}{backspace}').type("admin@test.com");

    cy.contains('Se connecter').click();

    cy.url().should('equal', "http://localhost:8002/")
  })
})
