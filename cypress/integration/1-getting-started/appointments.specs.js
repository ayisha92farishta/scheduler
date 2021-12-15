const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Appointments", () => {
  //function that will run before each individual tests
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
  });

  it("should edit an interview", () => {
     cy.get('[alt="Edit"]').first().click({force: true})
    
      //Find placeholder
    cy.get("[data-testid=student-name-input]")
    //clears input area
    .clear()
    //type in new name
    .type("James Bond")
    //selects new interviewer
    cy.get("[alt='Tori Malcolm']").click()
    //clicks the save button
    cy.contains("Save").click()
     //shows the component
     cy.contains(".appointment__card--show", "James Bond");
     cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    //finds and clicks on the delete button
    cy.get('[alt="Delete"]')
      .click({force: true})

    cy.pause()
    //clicks confirm
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
})