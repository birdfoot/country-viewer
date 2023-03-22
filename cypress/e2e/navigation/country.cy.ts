describe("Country page", () => {
  const HOSTNAME = "http://localhost:3000"

  beforeEach(() => {
    cy.visit(`${HOSTNAME}/countries/DEU`)
  })

  it("can go back to country listing", () => {
    cy.get("[data-cy=country-back-link]").click()

    cy.url().should("equal", HOSTNAME + "/")
  })

  it("visit border country page", () => {
    cy.get("[data-cy=border-links] a").then(($links) => {
      const pickedLink = $links[0]
      const label = pickedLink.innerText
      const path = pickedLink.getAttribute("href")

      pickedLink.click()

      cy.url().should("include", path)
      cy.get("h2[class*=title]").should("have.text", label)
    })
  })
})

export {}
