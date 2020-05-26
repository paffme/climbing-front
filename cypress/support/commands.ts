declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<Element>

    writeDate(datePickerRef: string, date: Date): Chainable<Element>

    typeDate(datePickerRef: string, date: Date): Chainable<Element>
  }
}

Cypress.Commands.add("login", (email: string,
                               password: string): Cypress.Chainable => {
  cy.visit("login");

  cy.get(".email > input").clear().type(email);
  return cy.get(".password > input").clear().type(password).type("{enter}");
});

Cypress.Commands.add("writeDate", (datePickerRef: string,
                                   date: Date): Cypress.Chainable => {
  return cy.get(datePickerRef +
    " > .dropdown > .dropdown-trigger > .control > input").clear()
    .type(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear())
    .type("{esc}");
});

Cypress.Commands.add("typeDate", (datePickerRef: string,
                                  date: Date): Cypress.Chainable => {
  cy.get(datePickerRef).click();
  cy.get(".datepicker > .dropdown >" +
    " .dropdown-menu:visible > .dropdown-content > .dropdown-item > :nth-child(1) >" +
    " :nth-child(1) > .pagination > .pagination-list > .field >" +
    " :nth-child(1) > .select > select")
    .select(String(date.getMonth()));
  cy.get(".datepicker:visible > .dropdown >" +
    " .dropdown-menu:visible > .dropdown-content > .dropdown-item > :nth-child(1) >" +
    " :nth-child(1) > .pagination > .pagination-list > .field >" +
    " :nth-child(2) > .select > select")
    .select(String(date.getFullYear()));

  return cy.get(".datepicker > .dropdown > .dropdown-menu:visible >" +
    " .dropdown-content > .dropdown-item > :nth-child(1) > :nth-child(2) >" +
    " .datepicker-table >.datepicker-body > .datepicker-row > .is-selectable")
    .contains(String(date.getDate())).click();
});
