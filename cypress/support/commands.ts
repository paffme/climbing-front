declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<Element>

    writeDate(datePickerRef: string, date: Date): Chainable<Element>

    typeDate(datePickerRef: string, date: Date): Chainable<Element>

    selectCategory(categoryRef: string, categoryName: string): Chainable<Element>

    // competition: Competition
    fulFillCompetitionFields(competition: any): Chainable<Element>
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

Cypress.Commands.add("selectCategory", (categoryRef: string,
                                        categoryName: string)
  : Cypress.Chainable => {

  return cy.get(categoryRef).within(($contain) => {
    if (categoryName === "all")
      return cy.wrap($contain).get(".field-body > .field > .block >" +
        " .select-all > .b-checkbox > .check").click();

    let numCategory = 1;
    switch (categoryName) {
      case "microbe":
        numCategory = 2;
        break;
      case "poussin":
        numCategory = 3;
        break;
      case "benjamin":
        numCategory = 4;
        break;
      case "minime":
        numCategory = 5;
        break;
      case "cadet":
        numCategory = 6;
        break;
      case "junior":
        numCategory = 7;
        break;
      case "senior":
        numCategory = 8;
        break;
      case "veteran":
        numCategory = 9;
        break;
      default:
        return cy;
    }

    return cy.wrap($contain).get(".field-body > .field > .block >" +
      " :nth-child(" + numCategory + ") > .check").click();
  });
});

// competition: Competition
Cypress.Commands.add("fulFillCompetitionFields", (competition: any)
  : Cypress.Chainable => {

  cy.get(".name > input").clear().type(competition.name);
  cy.typeDate(".date-start", competition.startDate);
  cy.typeDate(".date-end", competition.endDate);
  if (competition.openStatus) cy.get(".status").click();
  cy.typeDate(".date-welcome", competition.welcomeDate);
  cy.get(".street > input").clear().type(competition.street);
  cy.get(".city > input").clear().type(competition.city);
  cy.get(".postal-code > input").clear().type(competition.postalCode);
  let tab: string[] = competition.categoriesFemale as string[];
  tab.forEach((category) => {
    cy.selectCategory(".category-female", category);
  });
  tab = competition.categoriesMale as string[];
  tab.forEach((category) => {
    cy.selectCategory(".category-male", category);
  });
  cy.get(".description > textarea").clear().type(competition.description);
  cy.get(".agenda > textarea").clear().type(competition.agenda);

  return cy;
});
