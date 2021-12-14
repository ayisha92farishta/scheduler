describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  // it("should navigate to Tuesday", () => {
  //   cy.visit("/");
  //   //cy.pause()
  //   // //navigate to "Tuesday" and clicks on it
  //   // cy.get("li").contains('Tuesday').click();
  //   // //checks background color for list item
  //   // cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)");

  //   //refactor to chain the above two commands into a single line
  //   cy.get('[classNames=]').click().should("have.css", "background-color", "rgb(242, 242, 242)");
  // })

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});