describe("Categories tests", () => {
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
    cy.visit("/categories");
  });

  it("index page", () => {
    cy.contains(".q-table__title", "Categories");
    cy.contains(".q-table__bottom-item", "1-5 of ");
    cy.contains(".q-btn__content span", "Create");
    cy.contains(".q-icon", "edit");
    cy.contains(".q-icon", "delete");
  });

  it("create", () => {
    const name = "create-cat-name";
    cy.contains("Create").click();

    cy.get('[name="name"]').type(name);
    cy.contains("Save").click();
    // cy.contains("last_page").click();
    // cy.contains("td", "test-tag-name");
    cy.get(".sortable:first-child").click();
    cy.get("tr:last-child").should(($tr) => {
      expect($tr).to.contain(name);
    });
  });

  it("edit", () => {
    const name = "edit-cat-name";

    cy.contains("edit");
    cy.get("tr:first-child").contains("edit").click();

    cy.contains("Save");
    cy.get('[name="name"]').clear().type(name);
    cy.contains("Save").click();

    cy.get("tr:first-child").should(($tr) => {
      expect($tr).to.contain(name);
    });
  });

  it("delete", () => {
    const name = "edit-cat-name";

    cy.contains("delete");

    cy.get("tr:first-child").should("contain", name);

    // cy.get("tr:first-child").should(($tr) => {
    //   expect($tr).to.contain("new-tag-name");
    // });

    cy.get("tr:first-child").contains("delete").click();
    cy.get(".q-card__actions .q-btn:last-child").contains("Ok").click();

    cy.get(".q-card__actions .q-btn:last-child")
      .contains("Ok")
      .should("not.exist");

    cy.get("tr:first-child").should("not.contain", name);
    //cy.get("tr:first-child").should("not.have.text", "new-tag-name");
  });
});
