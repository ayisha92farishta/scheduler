const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });
  it("should book an interview", () => {
    
    //finds the add button 
    cy.get('[alt=Add]')
      //selects the first one
      .first()
      //clicks on it
      .click()

    //Find placeholder
    cy.get("[data-testid=student-name-input]")
      //type in the name
      .type("Lydia Miller-Jones")
    //selects the interviewer
    cy.get("[alt='Sylvia Palmer']").click()
    //clicks the save button
    cy.contains("Save").click()
    //shows the component
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
})