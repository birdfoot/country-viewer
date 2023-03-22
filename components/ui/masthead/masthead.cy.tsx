import Masthead from "./masthead"

describe("<Masthead />", () => {
  const BRAND_TEXT = /where in the world\?/i
  const DARK_MODE_CLASSNAME = "dark-mode"

  it("renders", () => {
    cy.mount(<Masthead />)
  })

  it("should have the correct brand text", () => {
    cy.mount(<Masthead />)

    cy.get("[data-cy=brand]").invoke("text").should("match", BRAND_TEXT)
  })

  it("should be initialized to light mode", () => {
    cy.mount(<Masthead />)

    cy.get("[data-cy=layout]")
      .invoke("hasClass", DARK_MODE_CLASSNAME)
      .should("be.false")
  })

  it("should enable dark mode correctly", () => {
    cy.mount(<Masthead />)

    cy.get("[data-cy=toggle-mode]").click()

    cy.get("[data-cy=layout]")
      .invoke("hasClass", DARK_MODE_CLASSNAME)
      .should("be.true")
  })

  it("should toggle back to light mode correctly", () => {
    cy.mount(<Masthead />)

    cy.get("[data-cy=toggle-mode]").click()
    // we should be in dark mode
    cy.get("[data-cy=toggle-mode]").click()

    cy.get("[data-cy=layout]")
      .invoke("hasClass", DARK_MODE_CLASSNAME)
      .should("be.false")
  })
})
