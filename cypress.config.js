const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {},
  },
})
