import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: [
      // exclude the provided starting examples
      "cypress/e2e/1-getting-started/*",
      "cypress/e2e/2-advanced-examples/*",
    ],
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
