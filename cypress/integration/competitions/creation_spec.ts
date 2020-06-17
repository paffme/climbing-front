import "../../support";
import { RequestPaffme } from "../../support/request";
import { Competition } from "../../support/models";


describe("Test for Creation of Competition", () => {
  const email: string = "admindams@test.com";
  const password: string = "admindams@test.com";

  let defaultCompetition: Competition = new Competition(
    "test",
    new Date(),
    new Date(),
    true,
    new Date(),
    "bouldering",
    "Avenue des Champs-Élysées",
    "Paris",
    "75000",
    ["all"],
    ["all"],
    "minimum 10 char",
    "0123456789"
  );

  before(() => {
    const res: any = RequestPaffme.createUserReq({
      email: email,
      password: password,
      lastName: "toto",
      firstName: "toto",
      sex: "male",
      club: "FFME",
      birthYear: new Date().getFullYear() - 18
    });

    defaultCompetition.setDefaultDate();
  });

  beforeEach(() => {
    cy.login(email, password);
    cy.wait(200);
  });

  it("Must enter the create competition view", () => {
    cy.visit("");

    cy.get(".create-competition").click();

    cy.url().should("equal",
      Cypress.config().baseUrl + "competitions/create");
  });

  it("Must create a competition", () => {

    cy.visit("competitions/create");

    cy.fulFillCompetitionFields(defaultCompetition);
    cy.get(".create-competition").click();

    cy.url().should(($url) => {
      console.log("Cypress.config().baseUrl=" + Cypress.config().baseUrl);

      expect($url.replace(Cypress.config().baseUrl as string, ""))
        .match(new RegExp("competitions/\\d+"));
    });
  });

  it("Must not create a competition when empty field", () => {

    cy.visit("competitions/create");

    cy.fulFillCompetitionFields(defaultCompetition);

    const listInput: Array<string[]> = [
      [defaultCompetition.name, ".name > input"],
      [defaultCompetition.street, ".street > input"],
      [defaultCompetition.city, ".city > input"],
      [defaultCompetition.postalCode, ".postal-code > input"],
      [defaultCompetition.description, ".description > textarea"],
      [defaultCompetition.agenda, ".agenda > textarea"]
    ];
    listInput.forEach((input) => {
      cy.get(input[1]).clear();
      cy.get(".create-competition").click();
      cy.wait(200);

      cy.url().should("equal", Cypress.config().baseUrl +
        "competitions/create");

      cy.get(input[1]).type(input[0]);
    });

    cy.selectCategory(".category-female", "all");
    cy.selectCategory(".category-male", "all");

    cy.get(".create-competition").click();
    cy.wait(200);

    cy.url().should("equal", Cypress.config().baseUrl +
      "competitions/create");
  });

  it("Must return to the previous page", () => {
    cy.url().then(($url) => {
      cy.visit("competitions/create");
      cy.get(".is-flex > .button").click();

      cy.url().should("equal", $url);
    });
  });

  it("Must go to the competitions page", () => {
    cy.visit("competitions/create");
    cy.get(".is-primary > .nuxt-link-active").click();

    cy.url().should("equal", Cypress.config().baseUrl +
      "competitions");
  });
});
