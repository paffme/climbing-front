import '../../support'


describe('Test for Creation of Competition', () => {
  const email: string = 'admindams@test.com'
  const password: string = 'admindams@test.com'

  class Competition {
    name: string = 'Test'
    startDate: Date
    endDate: Date
    openStatus: boolean = true
    welcomeDate: Date
    type: string = 'bouldering'
    street: string = 'Test'
    city: string = 'Test'
    postalCode: string = 'Test'
    description: string = 'Test'
    agenda: string = 'Test'

    constructor() {
      let date: Date = new Date()
      date.setDate(date.getDate() + 1)
      this.welcomeDate = new Date(date.getTime())

      date.setDate(date.getDate() + 1)
      this.startDate = new Date(date.getTime())

      date.setDate(date.getDate() + 1);
      this.endDate = new Date(date.getTime());
    }
  }

  beforeEach(() => {
    cy.login(email, password);
    cy.wait(200);
  });

  // it('Must enter the create competition view', () => {
  //   cy.visit("")
  //
  //   cy.get(".page_header > div > .button > :nth-child(1)").click()
  //
  //   cy.url().should('equal',
  //     Cypress.config().baseUrl + 'competitions/create')
  // })

  it("Must create a competition", () => {
    cy.visit("competitions/create");

    cy.url().should("equal",
      Cypress.config().baseUrl + "competitions/create");

    const compt: Competition = new Competition();

    cy.get(".name > input").clear().type(compt.name);
    cy.typeDate(".date-start", compt.startDate);
    cy.typeDate(".date-end", compt.endDate);
    cy.get(".status").click();
    cy.typeDate(".date-welcome", compt.welcomeDate);
    cy.get(".street > input").clear().type(compt.street);
    cy.get(".city > input").clear().type(compt.city);
    cy.get(".description > input").clear().type(compt.description);
    cy.get(".agenda > input").clear().type(compt.agenda);
    cy.get(".create-competition > input").click();
  });
})
