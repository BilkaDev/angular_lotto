describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("should change language to polish", () => {
    cy.get("button:contains('PL')").click();
    cy.contains("Witamy w");
  });
  it("should change theme to light mode", () => {
    cy.get('[aria-label="dark mode icon"]').click();
    cy.get("body").should("have.attr", "data-theme", "light");
  });
});
