describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.pause()
    //navigate to "Tuesday" and clicks on it
    cy.get("li").contains('Tuesday').click();
  })
});