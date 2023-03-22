import FilterRegion from "./filter-region"

const _EMPTY_CB = () => {}

describe("<FilterRegion />", () => {
  const DEFAULT_TEXT = /filter by region/i

  it("renders", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)
  })

  it("should show correct number of menu items", () => {
    const options = ["Africa", "Asia"]
    cy.mount(<FilterRegion options={options} onSelectRegion={_EMPTY_CB} />)

    // NOTE: includes the default item
    cy.get("[data-cy=menu] > li").should("have.length", options.length + 1)
  })

  it("should show correct text if NO value selected", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=button]").invoke("text").should("match", DEFAULT_TEXT)
  })

  it("should show correct text if value selected", () => {
    const options = ["Africa", "Asia", "Americas"]
    const pickedIndex = 1
    const pickedOption = options[pickedIndex]
    const pickedIndexInCss = pickedIndex + 1 + 1
    cy.mount(<FilterRegion options={options} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=button]").click()
    // Make sure menu is shown
    cy.get("[data-cy=menu]").should("be.visible")
    // Make sure the picked menu item is correct
    cy.get(`[data-cy=menu] > li:nth-child(${pickedIndexInCss})`)
      .invoke("text")
      .should("equal", pickedOption)
    cy.get(`[data-cy=menu] > li:nth-child(${pickedIndexInCss})`).click()

    cy.get("[data-cy=button]").invoke("text").should("equal", pickedOption)
  })

  it("should NOT show menu initially", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=menu]").should("not.be.visible")
  })

  it("should show menu when button is clicked", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=menu]").should("not.be.visible")
    cy.get("[data-cy=button]").click()

    cy.get("[data-cy=menu]").should("be.visible")
  })

  it("should hide a shown menu when button is clicked", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=menu]").should("not.be.visible")
    cy.get("[data-cy=button]").click()
    cy.get("[data-cy=menu]").should("be.visible")
    cy.get("[data-cy=button]").click()

    cy.get("[data-cy=menu]").should("not.be.visible")
  })

  it("should hide a shown menu when clicked outside menu", () => {
    cy.mount(<FilterRegion options={[]} onSelectRegion={_EMPTY_CB} />)

    cy.get("[data-cy=menu]").should("not.be.visible")
    cy.get("[data-cy=button]").click()
    cy.get("[data-cy=menu]").should("be.visible")
    cy.get("body").click()

    cy.get("[data-cy=menu]").should("not.be.visible")
  })

  it("should invoke `onSelectRegion` prop with correct value", () => {
    const options = ["Africa", "Asia", "Americas"]
    const pickedIndex = 1
    const pickedOption = options[pickedIndex]
    const pickedIndexInCss = pickedIndex + 1 + 1
    const onSelectRegion = cy.spy().as("onSelectRegionSpy")
    cy.mount(<FilterRegion options={options} onSelectRegion={onSelectRegion} />)

    cy.get("[data-cy=button]").click()
    // Make sure menu is shown
    cy.get("[data-cy=menu]").should("be.visible")
    // Make sure the picked menu item is correct
    cy.get(`[data-cy=menu] > li:nth-child(${pickedIndexInCss})`)
      .invoke("text")
      .should("equal", pickedOption)
    cy.get(`[data-cy=menu] > li:nth-child(${pickedIndexInCss})`).click()

    cy.get("[data-cy=button]").should("have.text", pickedOption)
  })
})
