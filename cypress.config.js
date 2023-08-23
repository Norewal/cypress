const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    env: {
      users: {
        standard: {
          username: 'standard_user',
          password: 'secret_sauce',
        },
        lockedOut: {
          username: 'locked_out_user',
          password: 'secret_sauce',
        },
      },
    },
    setupNodeEvents(on, config) {
      registerDataSession(on, config)
      return config
    },
  },
})
