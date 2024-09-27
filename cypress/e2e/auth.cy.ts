import { environment } from "../../src/environments/environment";
import { AuthResponse, IUser } from "../../src/app/modules/core/models/auth.model";

const apiUrl = environment.apiUrl + "/auth";

const mockLoggedIn: (access: boolean) => AuthResponse = (access) => ({
  message: access ? "PERMIT" : "DISMISSED",
  code: access ? "PERMIT" : "DISMISSED",
});

const mockUser: IUser = {
  login: "test",
  email: "test@example.pl",
};

describe("Auth module", () => {
  it("login page user should be able to sign in and when success redirect to play page", () => {
    // should display error when login is incorrect
    cy.intercept("GET", apiUrl + "/logged-in", {
      statusCode: 200,
      body: mockLoggedIn(false),
    });
    cy.visit("");
    cy.get("mat-icon:contains('person')").click();
    // should display login page
    cy.get("span:contains('Login')").click();
    cy.contains("Sign in");

    cy.intercept("POST", apiUrl + "/login", {
      statusCode: 401,
    });
    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type("example@wp.pl");
    cy.get("button:contains('Sign in')").click();
    cy.contains("Something Went Wrong");

    // should redirect to play page when login is correct
    cy.intercept("POST", apiUrl + "/login", {
      statusCode: 200,
      body: mockUser,
    });
    cy.intercept("GET", apiUrl + "/logged-in", {
      statusCode: 200,
      body: mockLoggedIn(true),
    });

    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type("example@wp.pl");
    cy.get("button:contains('Sign in')").click();
    cy.contains("Play the lottery");
  });

  it("register page user should be able to register and then redirect to login page", () => {
    // should display error when login is incorrect
    cy.intercept("GET", apiUrl + "/logged-in", {
      statusCode: 200,
      body: mockLoggedIn(false),
    });
    cy.visit("");
    cy.get("mat-icon:contains('person')").click();

    // should display login page
    cy.get("span:contains('Register')").click();
    cy.contains("Sign up");

    cy.intercept("POST", apiUrl + "/register", {
      statusCode: 401,
    });
    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type("example@wp.pl");
    cy.get("input").eq(2).type("example@wp.pl");
    cy.get("input").eq(3).type("example@wp.pl");
    cy.get("button:contains('Sign up')").click();
    cy.contains("Something Went Wrong");

    // should redirect to login page when register is correct
    cy.intercept("POST", apiUrl + "/register", {
      statusCode: 200,
    });
    cy.get("input").eq(0).clear().type("test");
    cy.get("input").eq(1).clear().type("example@wp.pl");
    cy.get("input").eq(2).clear().type("12345678");
    cy.get("input").eq(3).clear().type("12345678");
    cy.get("button:contains('Sign up')").click();
    cy.contains("Sign in");
  });
  it("the user should be automatically logged in and when he logs out he will be redirected to the home page", () => {
    // should be able to visit play page
    cy.intercept("GET", apiUrl + "/auto-login", {
      statusCode: 200,
      body: mockUser,
    });
    cy.intercept("GET", apiUrl + "/logged-in", {
      statusCode: 200,
      body: mockLoggedIn(true),
    });
    cy.visit("");
    cy.get("nav button:contains('Play')").click();

    // should log out and redirect to home page
    cy.intercept("GET", apiUrl + "/logout", {
      statusCode: 200,
    });
    cy.get("mat-icon:contains('person')").click();
    cy.get("span:contains('Logout')").click();
    cy.contains("Welcome to AngularLotto");
  });
});
