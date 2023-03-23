describe("Country listing", () => {
  it("can navigate to a country page", () => {
    cy.visit("/")

    cy.get("[class^=country-card_layout] a").then(($links) => {
      if ($links.length) {
        // pick a random link from the list
        const pickedLinkIndex = Math.floor(Math.random() * $links.length)
        const pickedLink = $links[pickedLinkIndex]
        const label = pickedLink.getAttribute("aria-label")
        const path = pickedLink.getAttribute("href")

        // click the picked link
        pickedLink.click()

        // assert
        cy.url().should("include", path)
        cy.get("h2[class*=title]").should("have.text", label)
      }
    })
  })
})

export {}
