import { environment } from "../../src/environments/environment";
import { Ticket, TicketPostResponse } from "../../src/app/modules/core/models/ticket.model";

const apiUrl = environment.apiUrl;
const ep = apiUrl + "/inputNumbers";

describe("Play Page", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get("nav button:contains('Play')").click();
  });
  it("should display ticket play the lottery", () => {
    cy.contains("Play the lottery");
  });
  it("should display six input fields for ticket numbers", () => {
    cy.get('form input[type="number"]').should("have.length", 6);
  });
  it("should fill input fields with random numbers on random button click", () => {
    cy.get('button:contains("Random")').click();
    cy.get('form input[type="number"]').each(($el) => {
      cy.wrap($el).should("not.have.value", "");
    });
  });
  it("should display error snackbar when server is off", () => {
    cy.get('button:contains("Random")').click();
    cy.get('button:contains("Submit")').click();
  });
  it("should display error snackbar when given number is greater than 99 ", () => {
    cy.get('button:contains("Random")').click();
    cy.get('form input[type="number"]').first().clear().type("100");
    cy.get('button:contains("Submit")').click();
    cy.contains("between 1 and 99");
  });
  it("should display ticket when submit numbers and back to play form when click <play", () => {
    const body: TicketPostResponse = {
      message: "SUCCESS",
      ticket: new Ticket("2022-08-01 12:00", "12345678", [1, 2, 3, 4, 5, 6]),
    };
    const mockResponse = {
      statusCode: 201,
      body,
    };
    cy.intercept("POST", ep, mockResponse).as("postData");
    cy.get('button:contains("Random")').click();
    cy.get('button:contains("Submit")').click();
    cy.get("app-ticket-item").should("be.visible");
    cy.get("button:contains('<Play')").click();
  });

  it("should display error message post date return status 500", () => {
    const mockResponse = {
      statusCode: 500,
    };
    cy.intercept("POST", ep, mockResponse).as("postData");
    cy.get('button:contains("Random")').click();
    cy.get('button:contains("Submit")').click();
    cy.contains("Something Went Wrong");
  });
});
