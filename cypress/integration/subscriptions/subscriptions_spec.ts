import '../../support'

describe('Test for Subscriptions page features', () => {
  const sex: boolean = true
  const email: string = 'cypress@hill.com'
  const firstName: string = 'Cypress'
  const lastName: string = 'Hill'
  const club: string = 'CH'
  const birthDay: Date = new Date(2000, 4, 20)
  const password: string = 'cyphill'

  function completeSub(
    sex: boolean,
    email: string,
    firstName: string,
    lastName: string,
    club: string,
    birthDay: Date,
    password: string
  ) {
    if (sex) cy.get('.b-radio-male > .check').click()
    else cy.get('.b-radio-female > .check').click()
    cy.get('.email')
      .type(email)
      .get('.first-name')
      .type(firstName)
      .get('.last-name')
      .type(lastName)
      .get('.club')
      .type(club)
      .typeDate('.birth-date', birthDay)
      .get('.password')
      .type(password)
      .get('.conf-password')
      .type(password)
  }

  function clearInput() {
    completeSub(
      true,
      '{selectall}{del}',
      '{selectall}{del}',
      '{selectall}{del}',
      '{selectall}{del}',
      new Date(),
      '{selectall}{del}'
    )
  }

  beforeEach(() => {
    cy.visit('/subscriptions')
  })

  it('Must return to login when i already have an account', () => {
    cy.get('#subscriptions').click()
    cy.url().should('equal', Cypress.config().baseUrl + 'login')
  })

  it('Must create a new user', () => {
    clearInput()

    completeSub(sex, email, firstName, lastName, club, birthDay, password)
    cy.get('.button').click()

    cy.url().should(
      'equal',
      Cypress.config().baseUrl + 'login?fromSubscription=true'
    )
  })

  it('Must not create a new user when input missing', () => {
    clearInput()
    completeSub(sex, email, firstName, lastName, club, birthDay, password)

    const listInput: Array<string[]> = [
      [email, '.email'],
      [firstName, '.first-name'],
      [lastName, '.last-name'],
      [club, '.club'],
      [password, '.password'],
      [password, '.conf-password']
    ]

    listInput.forEach((input) => {
      cy.get(input[1]).type('{selectall}{del}')
      cy.get('.button').click()
      cy.url().should('equal', Cypress.config().baseUrl + 'subscriptions')

      cy.get(input[1]).type(input[0])
    })
  })

  it('Must not create a new user when pswd validation != pswd', () => {
    // clearInput()

    // completeSub(sex, email, firstName, lastName, club, birthDay, password)

    cy.get('.conf-password').type('grrr')
    cy.get('.button').click()
    cy.url().should('equal', Cypress.config().baseUrl + 'subscriptions')

    cy.get('.help').contains('Les mots de passe doivent être similaires')
  })

  it('Must not create a new user with the same email', () => {
    // seedUsers();
    clearInput()

    completeSub(sex, email, firstName, lastName, club, birthDay, password)
    completeSub(false, email, "e", "e", "e", birthDay, password)
})
