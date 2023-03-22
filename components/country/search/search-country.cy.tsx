import SearchCountry from "./search-country"

const _EMPTY_CB = () => {}

describe("<SearchCountry />", () => {
  const PLACEHOLDER_TEXT = /search for a country\.\.\./i

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchCountry onSearch={_EMPTY_CB} />)
  })

  it("should have correct placeholder text", () => {
    cy.mount(<SearchCountry onSearch={_EMPTY_CB} />)

    cy.get("[data-cy=input]")
      .invoke("attr", "placeholder")
      .should("match", PLACEHOLDER_TEXT)
  })

  it("should display input value", () => {
    const inputText = "hello"
    cy.mount(<SearchCountry onSearch={_EMPTY_CB} />)

    cy.get("[data-cy=input]").type(inputText)

    cy.get("[data-cy=input]").should("have.value", inputText)
  })

  it("should invoke `onSearch` prop with the correct value", () => {
    const onSearch = cy.spy().as("onSearchSpy")
    cy.mount(<SearchCountry onSearch={onSearch} />)

    cy.get("[data-cy=input]").type("hello")

    cy.get("@onSearchSpy").should("have.been.calledWith", "hello")
  })

  it("should NOT show Clear button if there is NO input", () => {
    cy.mount(<SearchCountry onSearch={_EMPTY_CB} />)

    cy.get("[data-cy=input]").clear()

    cy.get("[data-cy=clear]").should("not.be.visible")
  })

  it("should show Clear button if there IS input", () => {
    cy.mount(<SearchCountry onSearch={_EMPTY_CB} />)

    cy.get("[data-cy=input]").type("a")

    cy.get("[data-cy=clear]").should("be.visible")
  })
})
