import { environment } from "../../src/environments/environment";

const apiUrl = environment.apiUrl;
const ep = "/api/v1/results/";

describe("Play Page", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get("nav button:contains('Results')").click();
  });
  it("should display check results", () => {
    cy.contains("Check results");
  });

  it("happy path step by step", () => {
    // fill input ticket id to long should display maxlength error
    cy.get("form input").type("123456781");
    cy.contains("Maximum number of characters: 8");

    // fill input ticket id to short should display minlength error
    cy.get("form input").clear().type("1234567");
    cy.contains("Minimum number of characters: 8");

    // should display error snackbar when the server is off
    cy.intercept("GET", apiUrl + ep + "12345678", { statusCode: 503 }).as("postData");

    cy.get("form input").clear().type("12345678");
    cy.get('button:contains("Submit")').click();
    cy.contains("Something Went Wrong:");

    // should display error snackbar if not found ticket.
    cy.fixture("results").then((json) => {
      cy.intercept("GET", "/api/v1/results/**", (req) => {
        const id = req.url.slice(req.url.lastIndexOf("/") + 1);
        const resultId = json.findIndex((item) => item.result.hash == id);
        if (resultId != -1) {
          req.reply(json[resultId]);
        } else {
          req.reply({
            statusCode: 404,
            body: {
              code: "TICKET_NOT_FOUND",
              status: "not found",
              messages: ["ticket not found"],
            },
          });
        }
      });
    });

    cy.get("form input").clear().type("notfound");
    cy.get('button:contains("Submit")').click();
    cy.contains("Given ticket doest not exist");

    // should display winner ticket
    cy.get("form input").clear().type("12345678");
    cy.get('button:contains("Submit")').click();
    cy.contains("Congratulations, you won!");

    // should display lost ticket
    cy.get("form input").clear().type("22345678");
    cy.get('button:contains("Submit")').click();
    cy.contains("No luck, try again!");

    // should display a wait message
    cy.get("form input").clear().type("32345678");
    cy.get('button:contains("Submit")').click();
    cy.contains("Results are being calculated, please come back later");
  });
});
