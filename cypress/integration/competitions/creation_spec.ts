import '../../support'


describe('Test for Creation of Competition', () => {
  const email: string = 'admin@test.com'
  const password: string = 'admin@test.com'

  before(() => {


    // cy.visit("/")
  })

  after(() => {

  })

  it('Must enter the create competition view', () => {
    // cy.server()

    cy.route('POST', 'https://paffme.hdaroit.fr/api/v1/users/token',{
      'email': email,
      'password': password
    }).as('login')

    cy.wait('@login')

    cy.get(".page_header > div > .button > :nth-child(1)").click()

    cy.url().should('equal',
      Cypress.config().baseUrl + 'competitions/create')
  })

  it('Must enter the create competition view', () => {
    // cy.visit('')
    cy.visit('competitions/create')

    // cy.url().should('equal',
    //   Cypress.config().baseUrl + 'competitions/create')
  })
})
