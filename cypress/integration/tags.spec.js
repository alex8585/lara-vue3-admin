describe("Tags tests", () => {
  beforeEach(() => {
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

  it("index page", () => {
    cy.visit("/apptags");

    cy.contains(".q-table__title", "Tags");
    cy.contains(".q-table__bottom-item", "1-5 of ");
    cy.contains(".q-btn__content span", "Create");
    cy.contains(".q-icon", "edit");
    cy.contains(".q-icon", "delete");
  });

  it("create", () => {
    cy.visit("/apptags");

    cy.contains("Create").click();

    cy.get('[name="name"]').type("test-tag-name");
    cy.contains("Save").click();
    cy.get(".sortable:first-child").click();

    //    cy.contains("last_page").click();
    // cy.contains("td", "test-tag-name");

    cy.get("tr:last-child").should(($tr) => {
      expect($tr).to.contain("test-tag-name");
    });
  });

  it("edit", () => {
    cy.visit("/apptags");
    cy.contains("edit");
    cy.get("tr:first-child").contains("edit").click();

    cy.get('[name="name"]').clear().type("new-tag-name");
    cy.contains("Save").click();

    cy.get("tr:first-child").should(($tr) => {
      expect($tr).to.contain("new-tag-name");
    });
  });
  it("delete", () => {
    cy.visit("/apptags");
    cy.contains("delete");

    cy.get("tr:first-child").should("contain", "new-tag-name");

    // cy.get("tr:first-child").should(($tr) => {
    //   expect($tr).to.contain("new-tag-name");
    // });

    cy.get("tr:first-child").contains("delete").click();
    cy.get(".q-card__actions .q-btn:last-child").contains("Ok").click();

    cy.get(".q-card__actions .q-btn:last-child")
      .contains("Ok")
      .should("not.exist");

    cy.get("tr:first-child").should("not.contain", "new-tag-name");
    //cy.get("tr:first-child").should("not.have.text", "new-tag-name");
  });
});
