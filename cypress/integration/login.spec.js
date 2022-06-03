describe("Login test", () => {
  it("Login to app", () => {
    cy.visit("/login");
    cy.contains("h1", "Login");
    cy.get('[type="email"]')
      .type("blyakher85@gmail.com")
      .should("have.value", "blyakher85@gmail.com");

    cy.get('[type="password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("button").contains("Login").click();

    cy.contains("Dashboars");
  });
});
