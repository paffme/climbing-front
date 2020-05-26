declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<Element>
    typeDate(datePickerClass: string, date: Date): Chainable<Element>
  }
}

function login(email: string, password: string): Cypress.Chainable {
  cy.visit('/login')

  cy.get('.email').type('{selectall}{del}').type(email)
  return cy
    .get('.password')
    .type('{selectall}{del}')
    .type(password)
    .type('{enter}')
}
Cypress.Commands.add('login', login)

  // .field-body > :nth-child(1) > .datepicker > .dropdown > .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) > :nth-child(1) > .pagination > .pagination-list > .field > :nth-child(1) > .select > select

function typeDate(datePickerRef: string, date: Date): Cypress.Chainable {
  cy.get(datePickerRef).click()
    .get(".datepicker:visible > .dropdown >" +
      " .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) >" +
      " :nth-child(1) > .pagination > .pagination-list > .field >" +
      " :nth-child(1) > .select > select")
    .select(String(date.getMonth() - 1))
  cy.get(".datepicker:visible > .dropdown >" +
    " .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) >" +
    " :nth-child(1) > .pagination > .pagination-list > .field >" +
    " :nth-child(2) > .select > select")
    .select(String(date.getFullYear()));
  //   // .get('.field-body > :nth-child(1) > .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) > :nth-child(1) > .pagination > .pagination-list > .field')
  //   .each(($child, index) => {
  //   if(index == 0) {
  //     cy.wrap($child).get('.select > select').select();
  //   }
  //   else if (index == 1) {
  //     cy.wrap($child).select(String(date.getFullYear()));
  //   }
  // })
  return cy
  //
  // return cy.get('.datepicker-body > .datepicker-row > .is-selectable')
  //   .contains(String(date.getDate())).click()
}
Cypress.Commands.add('typeDate', typeDate)
