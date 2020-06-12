import '../../support'

describe('Test for Login page features', () => {
  const email: string = 'admin@test.com'
  const password: string = 'admin@test.com'

  it('Must login to the application', () => {
    cy.login(email, password)

    cy.url().should('equal', Cypress.config().baseUrl)
    cy.getCookie('credentials').then((cookie) => {
      expect(cookie)
        .to.have.property('value')
        .to.contain('"email":"admin@test.com"')
    })
  })

  it('Must not login', () => {
    cy.login(email, 'this_is_a_bad_password')

    cy.url().should('equal', Cypress.config().baseUrl + 'login')
    cy.get('.media-content').contains('Identifiant / Mot de passe incorrecte')
  })

  it("Must steer to subscriptions page", () => {
    cy.get("#subscriptions").click();

    cy.url().should("equal", Cypress.config().baseUrl + "subscriptions");
  });
})
