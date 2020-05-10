
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<Element>
    typeDate(datePickerClass: string, date: Date)
      : Chainable<Element>
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

function typeDate(datePickerRef: string, date: Date): Cypress.Chainable {
  cy.get(datePickerRef).click()
    .get('.pagination-list > .has-addons')
    .get('select').each(($child, index) => {
      if(index == 0) {
        cy.wrap($child).select(String(date.getMonth() - 1));
      }
      else if (index == 1) {
        cy.wrap($child).select(String(date.getFullYear()));
      }
    })

  return cy.get('.datepicker-body > .datepicker-row > .is-selectable')
    .contains(String(date.getDate())).click()
}
Cypress.Commands.add("typeDate", typeDate)
