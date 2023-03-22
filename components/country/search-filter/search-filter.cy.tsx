import SearchFilter from "./search-filter"

describe("<SearchFilter />", () => {
  it("renders", () => {
    const children = "Some stuff"
    cy.mount(<SearchFilter>{children}</SearchFilter>)

    cy.get("[data-cy=layout]").should("have.text", children)
  })
})
