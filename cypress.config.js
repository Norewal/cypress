const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    setupNodeEvents(on, config) {
      registerDataSession(on, config)
      return config
    },
  },
})
